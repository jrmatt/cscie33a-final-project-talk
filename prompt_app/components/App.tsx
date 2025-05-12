import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PromptPage from './PromptPage';
import CollectionPage from './CollectionPage';
import { PromptData } from '../types/types';

const App = () => {

    const [prompts, setPrompts] = useState<PromptData[] | null>(null);
    const [prompt, setPrompt] = useState<PromptData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

const promptURL = '/api/prompts/'

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(promptURL);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setPrompts(jsonData);
            setPrompt(jsonData[0]);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    fetchData();
    }, []);

    console.log('Prompts:', prompts);
    console.log('Latest', prompt);
    console.log(origin)


    // Render loading state if data is still loading
    if (isLoading) {
        return <div></div>;
    }

    // Render error state if there was an error
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path ='/' element={<PromptPage prompt={prompt} prompts={prompts}/>} />
                 <Route path='/collection/:id' element={<CollectionPage />} />
           </Routes>
        </Router>
    );
}

export default App;