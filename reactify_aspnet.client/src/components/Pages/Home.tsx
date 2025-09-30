import { useState } from "react";
import {
    TextField,
    Button,
    Typography
} from '@mui/material';
import axios from 'axios';
import styles from './Home.module.css';
import { useTagContext } from './TagContext';

function Home() {
    const [tagName, setTagName] = useState("");

    const { refreshTags } = useTagContext();

    const handleAddTag = async () => {
        try {
            const trimmedTag = tagName.trim();

            const existingTagsResponse = await axios.get('/api/tag/tags');
            const existingTags = existingTagsResponse.data;
            console.log(existingTags)

            const tagExists = existingTags.some((tag: { name: string; }) =>
                tag.name.toLowerCase() === trimmedTag.toLowerCase()
            );

            if (tagExists) {
                alert(`Il tag "${trimmedTag}" esistente.`);
                return;
            }

            const newTag = { name: trimmedTag };
            const response = await axios.post('/api/tag/tags', newTag);
            console.log('Tag aggiunto:', response.data);
            refreshTags();
            setTagName("");
        } catch (error) {
            console.error('Errore durante l\'aggiunta del tag:', error);
        }
    };

    return (
        <div className={styles.container}>
            <Typography variant="h3" gutterBottom>
                Benvenuto nella Home!
            </Typography>
            <Typography variant="h5" gutterBottom>
                Vuoi aggiungere una nuova lista?
            </Typography>
            <TextField
                label="Nuovo tag"
                fullWidth
                margin="normal"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
            />
            <div className={styles.actions}>               
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTag}
                    disabled={tagName.trim() === ''}
                >
                    Salva
                </Button>
            </div>
        </div>   
    );
}

export default Home;

