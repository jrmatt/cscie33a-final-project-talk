import React from 'react';
import { Grid } from '@mui/material';
import { PromptData } from '../types/types'
import PromptCard from './PromptCard';
import Toggle from './Toggle';
import CollectionsMenu from './CollectionsMenu';
import FacilitationTips from './FacilitationTips';

interface PromptPageProps {
    prompt: PromptData | null;
    prompts: PromptData[] | null;
}


function PromptPage({prompt, prompts}:PromptPageProps) {

    if (!prompt) {
        return <div>No prompt found.</div>;
    }
    
    return (
        <Grid 
            container spacing={2}
            sx={{
                justifyContent: 'start',
                margin: 4,
                flexDirection: 'column',
            }}
        >
            <CollectionsMenu prompts={prompts} />
            <Grid
                container spacing={4}
                sx={{
                    justifyContent: 'start',
                    margin: 4,
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Grid size={11}>
                    <PromptCard prompt={prompt}/>   
                </Grid>
                <Grid size={11}>
                    <Toggle prompt={prompt}/>
                </Grid>
                <Grid size={11}>
                    <FacilitationTips />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PromptPage;