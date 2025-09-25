import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './DeleteButton.module.css';

interface DeleteButtonProps {
    onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleConfirm = () => {
        onClick();
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleOpen} aria-label="Elimina" color="error">
                <DeleteIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClose} className={styles.dialog}>
                <DialogTitle className={styles.dialogTitle}>Conferma Eliminazione</DialogTitle>
                <DialogContent>
                    <DialogContentText className={styles.dialogText}>
                        Sei sicuro di voler eliminare questo prodotto?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={styles.dialogActions}>
                    <Button onClick={handleClose} color="primary">
                        Annulla
                    </Button>
                    <Button onClick={handleConfirm} color="error" variant="contained">
                        Elimina
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteButton;


