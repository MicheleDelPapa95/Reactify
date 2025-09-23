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
    onProductAdded: (product: Product) => void;
};


export default function AddButton({ onProductAdded }: Props) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');


    const handleAdd = async () => {
        try {
            const newProduct = {
                title: title.trim(),
                isDeleted: false
            };

            const postResponse = await axios.post('/api/todos', newProduct);
            const addedProduct = postResponse.data;

            console.log('Prodotto aggiunto:', addedProduct);

            console.log('ID restituito dal server:', addedProduct.id);


            onProductAdded(addedProduct);

            setTitle('');
            setOpen(false);
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
