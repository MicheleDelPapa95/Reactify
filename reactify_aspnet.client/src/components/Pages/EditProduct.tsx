import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Box,
    Typography
} from '@mui/material';
import axios from 'axios';

interface Product {
    id: number;
    title: string;
    isDeleted: boolean;
}

const EditProduct = () => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [title, setTitle] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        if (location.state?.product) {
            const p = location.state.product as Product;
            setProduct(p);
            setTitle(p.title);
            setIsDeleted(p.isDeleted);
        } else if (id) {
            axios.get(`/api/todos/${id}`)
                .then(res => {
                    const p = res.data;
                    setProduct(p);
                    setTitle(p.title);
                    setIsDeleted(p.isDeleted);
                })
                .catch(err => console.error('Errore nel recupero del prodotto:', err));
        }
    }, [location.state, id]);

    const handleUpdate = async () => {
        if (!product) return;

        const updatedProduct: Product = {
            ...product,
            title: title.trim(),
            isDeleted
        };

        try {
            const response = await axios.put(`/api/todos/${product.id}`, updatedProduct);
            console.log('Prodotto aggiornato:', response.data);
            navigate('/products');
        } catch (error) {
            console.error('Errore durante la modifica del prodotto:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                Modifica Prodotto
            </Typography>

            {product ? (
                <>
                    <TextField
                        label="Nome prodotto"
                        fullWidth
                        margin="normal"
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
                        label="Comprato"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="outlined" onClick={() => navigate('/products')}>
                            Annulla
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpdate}
                            disabled={title.trim() === ''}
                        >
                            Salva
                        </Button>
                    </Box>
                </>
            ) : (
                <Typography>Caricamento...</Typography>
            )}
        </Box>
    );
};

export default EditProduct;
