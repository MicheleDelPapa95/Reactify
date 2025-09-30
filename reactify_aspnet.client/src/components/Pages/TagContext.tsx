/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface TagItem {
    id: number;
    name: string;
}

interface TagContextType {
    tags: TagItem[];
    refreshTags: () => void;
}

const TagContext = createContext<TagContextType | undefined>(undefined);

export const useTagContext = () => {
    const context = useContext(TagContext);
    if (!context) throw new Error("useTagContext must be used within a TagProvider");
    return context;
};

export const TagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tags, setTags] = useState<TagItem[]>([]);

    const refreshTags = async () => {
        try {
            const response = await axios.get('/api/tag/tags');
            setTags(response.data);
        } catch (error) {
            console.error('Errore nel recupero dei tag:', error);
        }
    };

    useEffect(() => {
        refreshTags();
    }, []);

    return (
        <TagContext.Provider value={{ tags, refreshTags }}>
            {children}
        </TagContext.Provider>
    );
};