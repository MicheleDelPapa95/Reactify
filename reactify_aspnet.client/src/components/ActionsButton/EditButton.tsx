import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import axios from 'axios';

interface Product {
    id: number;
    title: string;
    isDeleted: boolean;
}

type Props = {
    open: boolean;
    onClose: () => void;
    product: Product | null;
    onProductUpdated: (updatedProduct: Product) => void;
};


export default function EditButton({ open, onClose, product, onProductUpdated }: Props) {
    const [title, setTitle] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setIsDeleted(product.isDeleted);
        }
    }, [product]);

    const handleUpdate = async () => {
        if (!product) return;

        const updatedProduct: Product = {
            ...product,
            title: title.trim(),
            isDeleted
        };

        try {
            const response = await axios.put(`/api/todos/${product.id}`, updatedProduct);
            const updated = response.data;

            onProductUpdated(updated);
            onClose();
        } catch (error) {
            console.error('Errore durante la modifica del prodotto:', error);
        }
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Modifica prodotto</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nome prodotto"
                    fullWidth
                    margin="dense"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isDeleted}
                            onChange={(e) => setIsDeleted(e.target.checked)}
                        />
                    }
                    label="Comaprato-Non comprato"
                />
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={onClose} color="secondary">Annulla</Button>
                <Button onClick={handleUpdate} color="primary" disabled={title.trim() === ''}>
                    Salva
                </Button>
            </DialogActions>
        </Dialog>
    );
}
