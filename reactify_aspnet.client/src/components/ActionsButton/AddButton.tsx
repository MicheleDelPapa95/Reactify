import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import axios from 'axios';

interface Product {
    id: number;
    title: string;
    isDeleted: boolean;
}

type Props = {
    onProductAdded: () => void
};

export default function AddButton({ onProductAdded }: Props) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');


    const handleAdd = async () => {
        
        try {
            // Ottiengo tutti i prodotti
            const getResponse = await axios.get<Product[]>('/api/todos');
            const products = getResponse.data;

            // Calcola il nuovo ID
            const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
            const newId = maxId + 1;

            // Crea il nuovo prodotto
            const newProduct: Product = {
                id: newId,
                title: title.trim(),
                isDeleted: false
            };

            // Invia la richiesta POST
            const postResponse = await axios.post('/api/todos', newProduct);
            console.log('Prodotto aggiunto:', postResponse.data);

            setTitle('');
            setOpen(false);

            // Riaggiorna la lista
            onProductAdded();
        } catch (error) {
            console.error('Errore durante l\'aggiunta del prodotto:', error);
        }
    };


    return (
        <>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Aggiungi nuovo prodotto
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Aggiungi nuovo prodotto</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nome prodotto"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent:'space-between' }}>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Annulla
                    </Button>
                    <Button onClick={handleAdd} color="primary" disabled={title.trim()===''}>
                        Aggiungi
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
