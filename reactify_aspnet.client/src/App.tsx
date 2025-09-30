
import React from 'react';
import Router from './components/Router';
import { TagProvider } from './components/Pages/TagContext';




function App() {
    return (
        <TagProvider>
            <Router />
        </TagProvider>
    );
}

export default App;