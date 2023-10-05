import React from 'react';
//Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { update } from 'api/famille';
import { StyleModal, styleModal, styleModals, styleModalx } from 'utils/Modals/styleModals';
//end Toastify
import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@mui/material';

import { useContext } from 'react';
import AppContext from 'layout/Context';
import ToastyNotification from 'utils/toasty';
import { useState } from 'react';

const UpdateFamilyModal = ({ open, setOpen }) => {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };

    const { items, setItems, isChange, setIsChange, editedItem, setEditedItem, idfamilleTypep, setFamilleType } = useContext(AppContext);
    const handleOpen = () => setOpen(true);
    const handleFClose = () => setOpen(false);
    //submitted modal update famille
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const branch = formData.get('branch');
        const label = formData.get('label');

        const famille = {
            code: 1,
            name: label,
            branch: {
                id: branch
            }
        };
        update(idfamilleTypep, famille)
            .then((response) => {
                const famille = {
                    id: idfamilleTypep, // add id of the updated item
                    name: response.name,
                    branch: {
                        id: response.branch.id
                    }
                };
                const updatedItems = items.map((item) => {
                    if (item.id === famille.id) {
                        return famille;
                    } else {
                        return item;
                    }
                });

                setItems(updatedItems);
                setIsChange(!isChange);
                handleFClose();
            })
            .then(() => {
                setMessage('Famille modifiée avec succès');
                setTypeToast('success');
                setOpenToast(true);
            });
    };

    return (
        <>
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleToastClose} />
            <Modal
                sx={styleModalx}
                open={open}
                onClose={handleFClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyleModal width={'50%'} height={'50%'}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Modifier une famille:
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth style={{ marginBottom: '20px', marginTop: '20px' }}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Branche *</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="branch"
                                defaultValue={editedItem?.branch?.id}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Eléctricité" />
                                <FormControlLabel value="2" control={<Radio />} label="Eau Potable" />
                                <FormControlLabel value="3" control={<Radio />} label="Assainissement" />
                            </RadioGroup>
                        </FormControl>

                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Libellé :
                        </Typography>
                        <TextField id="label" name="label" variant="outlined" style={{ width: '100%' }} defaultValue={editedItem?.name} />

                        <div style={{ marginTop: '20px' }}>
                            <Button variant="outlined" onClick={handleFClose} style={{ marginRight: '2%' }}>
                                Annuler
                            </Button>
                            <Button type="submit" variant="contained">
                                Enregistrer
                            </Button>
                        </div>
                    </form>
                </StyleModal>
            </Modal>
        </>
    );
};

export default UpdateFamilyModal;
