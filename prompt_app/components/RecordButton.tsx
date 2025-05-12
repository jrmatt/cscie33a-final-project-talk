import React, { useState, useEffect, useRef } from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import CheckIcon from '@mui/icons-material/Check';
import SaveResponse from './SaveResponse';
import { PromptData } from '../types/types'

interface RecordButtonProps {
    prompt: PromptData;
}

function RecordButton({prompt}: RecordButtonProps) {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [recordingTime, setRecordingTime] = useState<number>(0);
    const recordingMaxDuration = 120;
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [doneRecording, setDoneRecording] = useState<boolean>(false);

    useEffect(() => {
        if (!audioStream) {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    setAudioStream(stream);
                    const recorder = new MediaRecorder(stream);
                    setMediaRecorder(recorder);

                    let audio: BlobPart[] = [];

                    recorder.ondataavailable = (event: BlobEvent) => {
                        if (event.data.size > 0) {
                            audio.push(event.data);
                        }
                    };

                    recorder.onstop = () => {
                        console.log('MediaRecorder stopped');
                        const b = new Blob(audio, { type: 'audio/wav' });
                        setAudioBlob(b);
                        console.log('audioBlob', b);
                    };

                })
                .catch((error) => {
                    console.error('Error accessing microphone', error);
                });
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [audioStream]);


    useEffect(() => {
        console.log('doneRecording changed:', doneRecording);
    }, [doneRecording]);


    // Start recording audio
    const startRecording = () => {
        if (!mediaRecorder) return;

        mediaRecorder.start();
        setIsRecording(true);
        setRecordingTime(0);
        setAudioBlob(null);

        timerRef.current = setInterval(() => {
            setRecordingTime((prevTime) => {
                if (prevTime >= recordingMaxDuration - 1) {
                    stopRecording();
                    return recordingMaxDuration;
                }
                return prevTime + 1;
            });
        }, 1000);
    };


    // Stop recording
    const stopRecording = () => {
        if (!mediaRecorder) return;

        mediaRecorder.stop();
        setIsRecording(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };


    const handleToggleRecording = () => {
		if (isRecording) {
			stopRecording();
		} else {
			startRecording();
		}
	};


    const approveRecording = () => {
        console.log('audioBlob at approval:', audioBlob);
        if (audioBlob) {
            setDoneRecording(true);
        } else {
            console.warn('Tried to approve without audioBlob!');
        }
    };


    // Format time in MM:SS format for display
	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
			.toString()
			.padStart(2, '0')}`;
	};

    return (
        <>
            {(!doneRecording) && (
                <Grid container spacing={2} sx={{ flexDirection: 'row' }}>
                    <Grid>
                        <IconButton aria-label='microphone' size='large' onClick={handleToggleRecording}>
                            {isRecording ? <StopIcon fontSize='large' /> : <MicIcon fontSize='large' />}
                        </IconButton>
                    </Grid>
    
                    {isRecording && (
                        <Grid container spacing={2} sx={{ flexDirection: 'column' }}>
                            <Typography variant='button'>Recording...</Typography>
                            <Typography variant='button'>Time: {formatTime(recordingTime)}</Typography>
                        </Grid>
                    )}
    
                    {audioBlob && (
                        <Grid container spacing={2} sx={{ flexDirection: 'row' }}>
                            <Grid>
                                <audio controls>
                                    <source src={URL.createObjectURL(audioBlob)} type='audio/wav' />
                                </audio>
                            </Grid>
                            <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant='button'>I'm happy with my recording!</Typography>
                                <IconButton onClick={approveRecording}>
                                    <CheckIcon color='success' />
                                </IconButton>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}
    
            {(doneRecording && audioBlob) && (
                    <SaveResponse audio={audioBlob} prompt={prompt} responseURL={'/api/response/'}/>
            )}
        </>
    );
}

export default RecordButton;