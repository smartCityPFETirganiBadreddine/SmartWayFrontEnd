import React, { useContext, useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AppContext from 'layout/Context';
import { remove, update } from 'api/famille';
//Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//end Toastify
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@mui/material';
import UpdateFamilyModal from '../Modals/updateFamily';
import ToastyNotification from 'utils/toasty';

//style modal
const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '15px',
    p: 4
};
const styleModalx = {
    backdropFilter: 'blur(5px)' // Add this line to make the background blurry
};
//end style modal
const Lists = ({ selectedItem, onListItemClick, onEditClick, isClicked }) => {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };
    const {
        items,
        setIdfamilleType,
        idfamilleType,
        deleted,
        setDeleted,
        setItems,
        editedItem,
        setEditedItem,
        idfamilleTypep,
        setFamilleType
    } = useContext(AppContext);

    const [openF, setOpenF] = useState(false);

    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        console.log('idfamilleType', idfamilleType);
        setFamilleType(idfamilleType);
    }, [selectedItem]);

    const handleDeleteClick = (index) => {
        const idToRemove = items[index].id;
        const updatedItems = items.filter((item) => item.id !== idToRemove);
        remove(idToRemove);
        setItems(updatedItems);
        setDeleted(true);

        setMessage('Famille bien supprimée');
        setTypeToast('success');
        setOpenToast(true);
    };

    //end submit modal update famille

    const handleEditClick = (index) => {
        setEditedItem(items[index]);
        setOpenF(true);
    };

    const filteredItems = items.filter((item) => item.name?.toLowerCase().includes(searchText.toLowerCase()));

    const renderRow = ({ index, style }) => {
        const handleClick = () => {
            onListItemClick(index);
            setIdfamilleType(filteredItems[index].id);
            if (selectedItem === index) {
                // Item is already selected, so hide the DoubleArrowIcon
                onListItemClick(null);
            }
        };

        const background = selectedItem === index ? 'transparent' : 'transparent';
        const borderRadius = selectedItem === index ? '10px' : '10px';
        const borderLeft = selectedItem === index ? '7px solid #3F51B5' : '1px solid #3F51B5';

        return (
            <>
                <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleToastClose} />
                {/* Modal edit famille */}
                <UpdateFamilyModal open={openF} setOpen={setOpenF} />

                <ListItem key={index} disablePadding sx={{ marginBottom: '10px' }}>
                    <ListItemButton
                        sx={{
                            border: '1px solid #E3F2FD',
                            borderRadius: borderRadius,
                            backgroundColor: background,
                            borderLeft: borderLeft,
                            marginTop: '20px',
                            '&:hover': {
                                backgroundColor: '#E3F2FD'
                            }
                        }}
                        style={style}
                        onClick={handleClick}
                    >
                        <ListItemText primary={filteredItems[index].name} sx={{ fontWeight: 'bold' }} />
                        {isClicked && selectedItem === index && (
                            <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
                                <Box sx={{ marginRight: '10px' }}>
                                    <EditIcon sx={{ color: '#2F69AB' }} onClick={() => handleEditClick(index)} />
                                </Box>
                                <Box>
                                    <DeleteForeverIcon sx={{ color: '#DB1313' }} onClick={() => handleDeleteClick(index)} />
                                </Box>
                            </Box>
                        )}
                        {!isClicked && selectedItem === index && (
                            <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
                                <DoubleArrowIcon sx={{ color: '#3F51B5', fontSize: '20px' }} />
                            </Box>
                        )}
                    </ListItemButton>
                </ListItem>
            </>
        );
    };

    const handleFClose = () => {
        setOpenF(false);
        setEditedItem(null);
    };

    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <TextField
                label="Rechercher par famille ..."
                variant="outlined"
                margin="normal"
                value={searchText}
                fullWidth={true}
                onChange={(e) => setSearchText(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <i className="fas fa-search"></i>
                        </InputAdornment>
                    )
                }}
            />
            <FixedSizeList height={440} width={'100%'} itemSize={60} itemCount={filteredItems.length}>
                {renderRow}
            </FixedSizeList>
        </Box>
    );
};

export default Lists;
