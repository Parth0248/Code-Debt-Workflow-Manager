// Filters to select all, active, completed todos
import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import PendingActionsSharpIcon from '@mui/icons-material/PendingActionsSharp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Filters({ handleDoneClick, handlePendingClick, handleAllClick }) {

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab color='secondary' aria-label='KeyboardArrowDownIcon' onClick={handleAllClick}>
                <KeyboardArrowDownIcon fontSize='large' />
            </Fab> 
            <Fab color='success' aria-label='CheckCircleOutLine' onClick={handleDoneClick}>
                <CheckCircleOutlineSharpIcon fontSize='large' />
            </Fab>
            <Fab color='warning' aria-label='PendingActionsSharp' onClick={handlePendingClick}>
                <PendingActionsSharpIcon fontSize='large'/>
            </Fab>
        </Box>
    );
}
