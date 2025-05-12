import React from 'react';
import { Grid, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import RecordResponse from './RecordResponse';
import { PromptData } from '../types/types'

interface ToggleProps {
    prompt: PromptData;
}

function Toggle({prompt}: ToggleProps) {
    const [recordMethod, setrecordMethod] = React.useState<string>('mic');
    const [isToggleVisible, setIsToggleVisible] = React.useState<boolean>(true);

    
/*     const handleHideToggle = () => {
        setIsToggleVisible(false);
    }; */

    const handlerecordMethod = (
        event: React.MouseEvent<HTMLElement>,
        newrecordMethod: string,
      ) => {
        setrecordMethod(newrecordMethod);
      };

    return (
                <Grid 
                    container spacing={2}
                    sx={{
                        flexDirection: 'column',
                        alignContent: 'left'
                    }}
                >
                    <Typography variant='h6'>Record your Response</Typography>
                    <Typography>Responses are anonymous by default, though you may add identifying details after recording. Responses expire after 3 weeks, and will no longer display. Responses cannot be deleted, so review your recording thoughtfully before submitting.</Typography>
                    <ToggleButtonGroup
                        value={recordMethod}
                        exclusive
                        onChange={handlerecordMethod}
                        aria-label='Platform'
                    
                    >
                        <ToggleButton value='qr'>QR</ToggleButton>
                        <ToggleButton value='mic'>Mic</ToggleButton>
                    </ToggleButtonGroup>
                    <RecordResponse recordMethod={recordMethod} prompt={prompt}/>
                </Grid>
    );
}


export default Toggle;