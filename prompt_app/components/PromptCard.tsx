import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { PromptData } from '../types/types'

interface PromptCardProps {
    prompt: PromptData;
}

function Prompt({prompt}:PromptCardProps) {
    return (
        <Grid size={12}>
            <Card>
                <CardContent>
                    <Typography variant='h6'>Prompt</Typography>
                    <Typography variant='h4'>{prompt.prompt}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Prompt;