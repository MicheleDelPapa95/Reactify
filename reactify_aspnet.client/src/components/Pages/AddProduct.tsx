import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AddProduct.module.css';
import { useLocation } from 'react-router-dom';


const AddProduct = () => {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const tag = location.state?.tag ?? '';


    const handleAdd = async () => {
        try {
            const newProduct = {
                title: title.trim(),
                isDeleted: false,
                tag: tag
            };

            const response = await axios.post('/api/todos', newProduct);
            console.log('Prodotto aggiunto:', response.data);
            navigate(`/${tag}`);
        } catch (error) {
            console.error('Errore durante l\'aggiunta del prodotto:', error);
        }
    };

    return (
        <div className={styles.container}>
            <Typography variant="h5" gutterBottom>
                Aggiungi nuovo prodotto
            </Typography>
            <TextField
                label="Nome prodotto"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
            />
            <div className={styles.actions}>
                <Button variant="outlined" onClick={() => navigate(`/${tag}`)}>
                    Annulla
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdd}
                    disabled={title.trim() === ''}
                >
                    Aggiungi
                </Button>
            </div>
        </div>
    );
};

export default AddProduct;