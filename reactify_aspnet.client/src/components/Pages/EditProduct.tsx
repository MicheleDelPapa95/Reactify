import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Typography
} from '@mui/material';
import axios from 'axios';
import DeleteButton from '../ActionsButton/DeleteButton';
import styles from './EditProduct.module.css';
import { useTranslation } from 'react-i18next';

interface Product {
    id: number;
    title: string;
    isDeleted: boolean;
}

const EditProduct = () => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [product, setProduct] = useState<Product | null>(null);
    const [title, setTitle] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);
    const tag = location.state?.tag ?? '';

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
            navigate(`/${tag}`);
        } catch (error) {
            console.error('Errore durante la modifica del prodotto:', error);
        }
    };

    const handleDelete = async () => {
        if (!product) return;

        try {
            await axios.delete(`/api/todos/${product.id}`);
            navigate(`/${tag}`);
        } catch (error) {
            console.error('Errore durante l\'eliminazione del prodotto:', error);
        }
    };

    return (
        <div className={styles.container}>
            <Typography variant="h5" gutterBottom>
                {t('modifica_item')}
            </Typography>

            {product ? (
                <>
                    <TextField
                        label={t('modifica_label')}
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
                        label={t('comprato_label')}
                    />
                    <div className={styles.actions}>
                        <Button variant="outlined" onClick={() => navigate(`/${tag}`)}>
                            {t('button.annulla')}
                        </Button>
                        <div className={styles.rightButtons}>
                            <DeleteButton onClick={handleDelete} />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpdate}
                                disabled={title.trim() === ''}
                            >
                                {t('button.salva')}
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <Typography>Caricamento...</Typography>
            )}
        </div>
    );
};

export default EditProduct;
