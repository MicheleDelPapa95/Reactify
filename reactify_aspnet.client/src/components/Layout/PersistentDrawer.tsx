/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Drawer, List, ListItemText, Toolbar, Typography, Box, ListItemButton, ListItemIcon, Collapse } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Outlet } from 'react-router-dom';
import styles from './PersistentDrawer.module.css';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
        {
            props: ({ open }) => open,
            style: {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            },
        },
    ],
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


const MenuItem: React.FC<{ item: any }> = ({ item }) => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const hasChildren = item.children && item.children.length > 0;

    const handleClick = () => {
        if (hasChildren) {
            setOpen(!open);
            const path = item.path;
            navigate(path);
        } else {
            const path = item.path;
            navigate(path);
        }
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                    primary={item.text} sx={{ ml: 2 }}
                />
                {hasChildren ? (open ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItemButton>
            {hasChildren && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {item.children.map((child: any) => (
                            <MenuItem key={child.id} item={child} />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
}


const PersistentDrawer: React.FC = () => {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const menuNodes = [
        { id: '1', parent: null, text: 'Home', path: '/', icon: <HomeIcon /> },
        { id: '2', parent: null, text: 'Products', path: '/products', icon: <ShoppingCartIcon /> },
        { id: '3', parent: '2', text: 'Aggiungi', path: '/add', icon: <AddIcon /> },
    ];


    const buildMenuTree = (nodes: typeof menuNodes) => {
        const map = new Map<string, any>();
        const tree: any[] = [];

        nodes.forEach((node) => {
            map.set(node.id, { ...node, children: [] });
        });

        nodes.forEach((node) => {
            if (node.parent) {
                map.get(node.parent).children.push(map.get(node.id));
            } else {
                tree.push(map.get(node.id));
            }
        });

        return tree;
    };

    const menuTree = buildMenuTree(menuNodes);

    return (
        <Box className={styles.root}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2 }}
                        className={open ? styles.hide : ''}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Reactify
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuTree.map((item) => (
                        <MenuItem key={item.id} item={item} />
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Outlet />
            </Main>
        </Box>
    );
};

export default PersistentDrawer;

