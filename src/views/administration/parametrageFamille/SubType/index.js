import React, { useContext, useState, useEffect } from 'react';
import {
    Grid,
    Box,
    styled,
    Paper,
    ThemeProvider,
    createTheme,
    Modal,
    Typography,
    TextField,
    FormControl,
    FormHelperText,
    Button
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from 'layout/Context';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { remove, update } from 'api/type';
import CircleIcon from '@mui/icons-material/Circle';
import { ToastContainer } from 'react-toastify';
import UpdateTypeModal from '../Modals/updateType';
import ToastyNotification from 'utils/toasty';

const StyledPaper = styled(Paper)(({ theme, isSelected }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
    border: isSelected ? '2px solid #27AE60' : 'none',
    borderLeft: '5px solid #27AE60',
    position: 'relative'
}));

function SubType({ selectedItemType, onListItemClick, onEditClick, onDeleteClick, isClickedType }) {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };

    const { itemsType, idfamilleType, selectedItemTypeState, setSelectedItemTypeState, itemsP, setItemsP, setIsChange, isChange } =
        useContext(AppContext);

    const [open, setOpen] = useState(false);
    const [editedItem, setEditedItem] = useState(null);

    useEffect(() => {
        setItemsP(itemsType);
        setSelectedItemTypeState(selectedItemType);
    }, [selectedItemType, itemsType]);

    const handleItemClick = (item) => {
        setSelectedItemTypeState(item);
        onListItemClick(item);
    };

    const handleDeleteClick = (index) => {
        const idToRemove = itemsP[index].id;
        const updatedItems = itemsP.filter((item) => item.id !== idToRemove);
        remove(idToRemove);
        setItemsP(updatedItems);
        setMessage('Type bien supprimé');
        setTypeToast('success');
        setOpenToast(true);
    };

    const handleEditClick = (index) => {
        setEditedItem(itemsP[index]);
        setOpen(true);
    };

    return (
        <>
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleToastClose} />
            {/* Modal add type */}
            <UpdateTypeModal open={open} setOpen={setOpen} />

            <Grid container key={idfamilleType}>
                <ThemeProvider theme={createTheme({ palette: { mode: 'light' } })}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: 'background.default',
                                display: 'grid',
                                gridTemplateColumns: { md: '1fr 1fr' },
                                gap: 2
                            }}
                        >
                            {idfamilleType !== -1 ? (
                                itemsP.map(
                                    (item) =>
                                        item.familyType.id === idfamilleType && (
                                            <StyledPaper
                                                key={item.id}
                                                elevation={4}
                                                isSelected={item === selectedItemType}
                                                onClick={() => handleItemClick(item)}
                                                sx={{ borderLeft: '5px solid #27AE60' }}
                                            >
                                                {item.libelle}
                                                {isClickedType && item === selectedItemTypeState && (
                                                    <Box style={{ float: 'right' }}>
                                                        <EditIcon
                                                            sx={{ color: '#2F69AB', marginRight: '20px' }}
                                                            onClick={() => handleEditClick(itemsP.indexOf(item))}
                                                        />
                                                        <DeleteForeverIcon
                                                            sx={{ color: '#DB1313' }}
                                                            onClick={() => handleDeleteClick(itemsP.indexOf(item))}
                                                        />
                                                    </Box>
                                                )}
                                            </StyledPaper>
                                        )
                                )
                            ) : (
                                <StyledPaper
                                    key={1}
                                    elevation={4}
                                    sx={{
                                        borderLeft: '5px solid #27AE60',
                                        margin: '10px',
                                        marginTop: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Typography variant="body1" align="center">
                                        Il n'y a aucun type de cette famille pour le moment.
                                    </Typography>
                                </StyledPaper>
                            )}
                        </Box>
                        {selectedItemTypeState && (
                            <Box p={2} bgcolor="background.paper">
                                {selectedItemTypeState.content}
                            </Box>
                        )}
                    </Grid>
                </ThemeProvider>
            </Grid>
        </>
    );
}

export default SubType;
