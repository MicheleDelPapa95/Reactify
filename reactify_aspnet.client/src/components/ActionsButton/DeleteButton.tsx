import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteButtonProps {
    onClick: () => void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
    return (
        <IconButton onClick={onClick} aria-label="delete" color="error">
            <DeleteIcon />
        </IconButton>
    );
};

export default DeleteButton;


