
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import ProductList from './components/Pages/ProductList';
import PersistentDrawer from './components/Layout/PersistentDrawer';
import AddProduct from './components/Pages/AddProduct';
import EditProduct from './components/Pages/EditProduct';




function App() {
    return (
        <Router>
            <PersistentDrawer>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/add" element={<AddProduct />} />
                    <Route path="/edit/:id" element={<EditProduct />} />
                </Routes>
            </PersistentDrawer>
        </Router>
    );
}

export default App;