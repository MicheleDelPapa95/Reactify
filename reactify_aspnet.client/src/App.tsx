import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import DeleteButton from './components/ActionsButton/DeleteButton.tsx';
import AddButton from './components/ActionsButton/AddButton.tsx';
//import EditButton from './components/ActionsButton/EditButton.tsx';

interface Product {
    id: number;
    title: string;
    isDeleted: boolean;
}

function App() {

    const [products, setProducts] = useState<Product[]>([]);

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
            <DeleteButton onClick={() => handleDelete(product.id)} />
            
        </li>
    );

    return (
        <div>
            <h2>Lista della spesa:</h2>
            <ul>{listItems}</ul>
            <div style={{ marginTop: '20px' }}>
                <AddButton onProductAdded={fetchProducts} />
            </div>
        </div>
        
    );
    
}

export default App;