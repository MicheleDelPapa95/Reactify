import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import DeleteButton from './components/ActionsButton/DeleteButton.tsx';
import AddButton from './components/ActionsButton/AddButton.tsx';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import EditButton from './components/ActionsButton/EditButton.tsx';

interface Product {
    id: number;
    title: string;
    isDeleted: boolean;
}

function App() {

    const [products, setProducts] = useState<Product[]>([]);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setIsEditOpen(true);
    };


    const fetchProducts = () => {
        axios.get<Product[]>('/api/todos')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Errore nel recupero dei dati", error)
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
                backgroundColor: '#f9f9f9'
            }}
        >
            <div
                style={{
                    maxWidth: '500px',
                    width: '100%',
                    padding: '20px',
                    boxSizing: 'border-box',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Lista della spesa:</h2>
                <ul>{listItems}</ul>

                <div style={{ marginTop: '20px' }}>
                    <AddButton
                        onProductAdded={(newProduct) =>
                            setProducts(prev => [...prev, newProduct])
                        }
                    />
                </div>

                <EditButton
                    open={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    product={selectedProduct}
                    onProductUpdated={(updatedProduct) => {
                        setProducts(prev =>
                            prev.map(p =>
                                p.id === updatedProduct.id ? updatedProduct : p
                            )
                        );
                    }}
                />
            </div>
        </div>

        
    );
    
}

export default App;