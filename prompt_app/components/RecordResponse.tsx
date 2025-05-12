import React from 'react';
import { Grid, Card, CardContent } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react'
import RecordButton from './RecordButton';
import { PromptData } from '../types/types'

interface RecordResponseProps {
    recordMethod: string;
    prompt: PromptData;
}

function RecordResponse({recordMethod, prompt}: RecordResponseProps) {

    const qrCode = (
        <QRCodeSVG
            id='qrCodeID'
            size={200} 
            value={'http://127.0.0.1:8000/'}
            level='L'
        />
    )

    if (recordMethod === 'mic') {
        return (
            <Card>
                <CardContent>    
                    <Grid 
                    container spacing={1}
                    sx={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    >
                    <RecordButton prompt={prompt}/>
                    </Grid>
                </CardContent>
            </Card>
        );
    } if (recordMethod === 'qr') {
        return (
            <Grid 
            container spacing={2}
            sx={{
                flexDirection: 'column'
            }}
            >
                <div>{qrCode}</div>
            </Grid>
        );
    }
  
}


export default RecordResponse;