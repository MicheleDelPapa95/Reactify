import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import PersistentDrawer from './Layout/PersistentDrawer';
import Home from './Pages/Home';
import ProductList from './Pages/ProductList';
import AddProduct from './Pages/AddProduct';
import EditProduct from './Pages/EditProduct';
import type { RouteObject } from 'react-router-dom';


interface MenuNode {
    id: string;
    parent: string | null;
    name_it: string;
    module: keyof typeof componentMap;
    path: string;
    dynamic?: boolean;
}


const menuNodes: MenuNode[] = [
    { id: "1", parent: null, name_it: "Home", module: "Home", path: ''},
    { id: "2", parent: null, name_it: "Prodotti", module: "ProductList", path: 'products' },
    { id: "3", parent: "2", name_it: "Aggiungi", module: "AddProduct", path: 'add' },
    { id: "4", parent: "2", name_it: "Modifica", module: "EditProduct", path: 'edit/:id', dynamic: true },
];


const componentMap = {
    Home,
    ProductList,
    AddProduct,
    EditProduct,
};


function buildTree(nodes: MenuNode[]): MenuNodeWithChildren[] {
    const map = new Map<string, MenuNodeWithChildren>();
    const tree: MenuNodeWithChildren[] = [];

    nodes.forEach(node => {
        map.set(node.id, { ...node, children: [] });
    });

    nodes.forEach(node => {
        if (node.parent && map.has(node.parent)) {
            map.get(node.parent)!.children.push(map.get(node.id)!);
        } else {
            tree.push(map.get(node.id)!);
        }
    });

    return tree;
}

interface MenuNodeWithChildren extends MenuNode {
    children: MenuNodeWithChildren[];
}

function generateRoutes(tree: MenuNodeWithChildren[]): RouteObject[] {
    return tree.map(node => {
        const Component = componentMap[node.module];

        return {
            path: node.path,
            element: <Component />,
            children: node.children.length > 0 ? generateRoutes(node.children) : [],
        };
    });
}

const menuTree = buildTree(menuNodes);

const router = createBrowserRouter([
    {
        path: '/',
        element: <PersistentDrawer />,
        children: generateRoutes(menuTree),
    },
]);


export default function Router() {
    return <RouterProvider router={router} />;
}