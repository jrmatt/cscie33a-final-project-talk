import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Grid, TextField, Button, Typography } from '@mui/material';
import { PromptData } from '../types/types';
import { getCSRFToken } from '../utils/csrf';

interface SaveResponseProps {
    audio: Blob;
    prompt: PromptData;
    responseURL: string;
}


function SaveResponse({audio, prompt, responseURL}: SaveResponseProps) {
    console.log(audio)
    const [newResponse, setNewResponse] = useState({
        identity: ''
    })
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewResponse((prevNewResponse) => ({...prevNewResponse, [name]: value}));
        setError(false)
        setSuccess(false);
        console.log(newResponse);
    }

    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('audio', audio);
        formData.append('prompt', prompt.id.toString());
        formData.append('identity', newResponse.identity);

        try {
            const response = await fetch(responseURL, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': getCSRFToken() || '',
                },
                credentials: 'include', // Critical for sending cookies
            });

            if (response.ok) {
                setSuccess(true);

            } else {
                throw new Error('Failed to save new response');
            }
        } catch (err) {
            setError(true);
            console.log(err.message);
            setSuccess(false);
        }
    }


    return (
        <Grid
            container spacing={3}
            size={12}
            sx={{
                flexDirection: 'column'
            }}
        >
            {!success && (
            <Grid>
                <Grid>
                    <audio controls>
                        <source src={URL.createObjectURL(audio)} type='audio/wav' />
                    </audio>
                </Grid>
                <Grid>
                <Typography variant='subtitle1'>Leave your name, or something about you, and save your response:</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth
                        id='identity'
                        name='identity'
                        value={newResponse.identity}
                        onChange={handleChange}
                        variant="outlined" 
                        label="tired engineering student, stamp collector, etc."
                    >
                    </TextField>
                    <Grid>
                        <Button type='submit'>Submit</Button>
                    </Grid>
                </form>
                </Grid>
            </Grid>
            )}
            {error && <Typography color='warning'>{error}</Typography>}
            {success && (
                <Grid>
                    <Typography color='primary'>Response saved successfully! Please note that all responses are subject to content moderation, and may be removed if deemed harmful.</Typography>
                    <Button variant='contained' size='large' href={`/collection/${prompt.id}`}>View Responses</Button>
                </Grid>
            )}
        </Grid>
    );
}

export default SaveResponse;