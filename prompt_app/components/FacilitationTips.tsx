import React from 'react';
import { Typography, Grid } from '@mui/material';

function FacilitationTips() {
    return (
        <Grid container spacing={2}>
            <Typography variant='h4'>Tips for Hosting a Conversation</Typography>
            <Typography>We recommend gathering friends for a circle dialogue to answer this prompt. A great time for this is over a meal! Here are some tips:</Typography>
            <ul>
                <li>Share the time - take turns, and allow others to finish speaking.</li>
                <li>Speak for yourself and about your own experiences.</li>
                <li>Record your responses one at a time, and then ask each other honest, curious follow-up questions.</li>
                <li>Listen generously - assume good intentions while recognizing that your words have an impact. </li>
            </ul>

        </Grid>
    )
}

export default FacilitationTips;