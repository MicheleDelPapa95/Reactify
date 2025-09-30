import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import PersistentDrawer from './Layout/PersistentDrawer';
import Home from './Pages/Home';
import ProductList from './Pages/ProductList';
import AddProduct from './Pages/AddProduct';
import EditProduct from './Pages/EditProduct';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PersistentDrawer />,
        children: [
            { path: '', element: <Home /> },
            { path: 'products', element: <ProductList /> },
            { path: 'add', element: <AddProduct /> },
            { path: 'edit/:id', element: <EditProduct /> },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}