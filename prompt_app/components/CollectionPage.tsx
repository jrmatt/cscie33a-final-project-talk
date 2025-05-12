import  React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { ResponseData, PromptData } from '../types/types';
import PromptCard from './PromptCard'

interface CollectionPageProps {
    response: ResponseData | null;
    responses: ResponseData[] | null;
    prompt: PromptData;
}

function CollectionPage({response, responses}:CollectionPageProps) {

const { id } = useParams();
const [responseList, setResponseList] = useState<ResponseData[]>([]);
const [loading, setLoading] = useState(true);
const [prompt, setPrompt] = useState<PromptData>();

useEffect(() => {
    const fetchResponses = async () => {
      const response = await fetch(`/api/responses/${id}/`);
      const data = await response.json();
      setResponseList(data)
      setLoading(false)
    };
    fetchResponses();
  }, [id]);
  
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch(`/api/prompt/${id}/`);
        if (!response.ok) throw new Error('Fetch failed');
        const data = await response.json();
        console.log('Fetched prompt:', data);
        setPrompt(data);
      } catch (error) {
        console.error('Error fetching prompt:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [id]);

  console.log(responseList[0])
  
  if (loading || !prompt) return <div></div>;

  return (
    <Grid container spacing={4}
    sx={{
        flexDirection: 'column',
        alignItems: 'center',
        margin: 4,
    }}
    >
        <Grid size={10}>
            <PromptCard prompt={prompt} />
        </Grid>
        <Grid container spacing={6}
            sx={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '83%'
            }}
        >
            {responseList.map((response) => (
            <Card key={response.id} sx={{width: '100%'}}>
                    <CardContent>
                        <Grid container spacing={2}
                            sx={{
                                flexDirection: 'column',
                            }}
                        >
                            <Typography>{response.transcript}</Typography>
                            <audio controls>
                                <source src={`http://127.0.0.1:8000${response.audio}`} type='audio/wav' />
                            </audio>
                            <Typography variant='button' alignSelf='end'>{response.identity}</Typography>
                            <Grid container spacing={1}
                                sx={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    justifyContent: 'end',
                                }}
                            >
                                    <Typography>Expires at:</Typography>
                                    <Typography variant='button'>{new Date(response.expires_at).toLocaleString()}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent> 
                </Card>
            ))}
        </Grid>
    </Grid>
  );

};

export default CollectionPage;