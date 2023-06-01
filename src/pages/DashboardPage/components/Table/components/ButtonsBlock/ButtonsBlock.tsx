import React from 'react';
import { ButtonsWrapper } from './ButtonsBlock.styled';
import { IconButton } from '@mui/joy';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

interface ButtonsBlockProps {
  handleEdit: (row: any) => void;
  handleDelete: (row: any) => void;
  row: any;
}

export const ButtonsBlock: React.FC<ButtonsBlockProps> = ({ handleEdit, handleDelete, row }) => {
  return (
    <ButtonsWrapper>
      <IconButton variant="plain" onClick={() => handleEdit(row)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => handleDelete(row)} color="danger" variant="plain">
        <DeleteIcon />
      </IconButton>
    </ButtonsWrapper>
  );
};
