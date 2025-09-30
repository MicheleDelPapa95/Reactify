import { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteButton from '../ActionsButton/DeleteButton.tsx';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import styles from './ProductList.module.css';
import { useParams } from 'react-router-dom';

interface Product {
    id: number;
    title: string;
    isDeleted: boolean;
}

function ProductList() {

    const { tag } = useParams();

    const [products, setProducts] = useState<Product[]>([]);

    const navigate = useNavigate();

    const handleEditClick = (product: Product) => {
        navigate(`/edit/${product.id}`, { state: { product, tag: tag } })
    };


    const handleAddClick = () => {
        navigate('/add', { state: { tag: tag } });
    };

    const fetchProducts = () => {
        const endpoint = tag ? `/api/todos/tag/${tag}` : '/api/todos';

        axios.get<Product[]>(endpoint)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Errore nel recupero dei dati", error);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, [tag]);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/todos/${id}`);
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error('Errore durante l\'eliminazione del prodotto:', error);
        }
    };

    const listItems = products.map(product =>
        <li
            key={product.id}
            style={{
                color: product.isDeleted ? 'lightgray' : 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <span>{product.title}</span>
            <div style={{ display: 'flex', gap: '10px' }}>
                <IconButton onClick={() => handleEditClick(product)} aria-label="Modifica" disabled={product.isDeleted}>
                    <EditIcon />
                </IconButton>
                <DeleteButton onClick={() => handleDelete(product.id)} />
            </div>

        </li>
    );

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>{`Lista ${tag}:`}</h2>
                <ul>{listItems}</ul>

                <div className={styles.buttonContainer}>
                    <Button variant="contained" color="primary" onClick={handleAddClick}>
                        Aggiungi nuovo prodotto
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProductList;