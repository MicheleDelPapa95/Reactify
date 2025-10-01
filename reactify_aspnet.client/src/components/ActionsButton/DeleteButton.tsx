import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './DeleteButton.module.css';
import { useTranslation } from 'react-i18next';

interface DeleteButtonProps {
    onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {

    const { t } = useTranslation();

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
                <DialogTitle className={styles.dialogTitle}>{t('delete_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ marginTop: '10px' }}>
                        {t('delete_subtitle')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ padding: '20px', justifyContent: 'space-between' }}>
                    <Button onClick={handleClose} color="primary">
                        {t('button.annulla')}
                    </Button>
                    <Button onClick={handleConfirm} color="error" variant="contained">
                        {t('button.elimina')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteButton;


