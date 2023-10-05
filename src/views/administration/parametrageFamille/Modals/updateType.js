import React from 'react';
//Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { remove, update } from 'api/type';
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

const UpdateTypeModal = ({ open, setOpen }) => {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };

    const { items, setItems, selectedItemTypeState, setSelectedItemTypeState, itemsP, setItemsP, isChange, setIsChange } =
        useContext(AppContext);
    const handleOpen = () => setOpen(true);
    const handleFClose = () => setOpen(false);
    //submitted modal update famille
    const handleSubmitType = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const familyType = formData.get('familyType');
        const label = formData.get('label');
        const selectedOption = event.target.familyType.options[event.target.familyType.selectedIndex];
        const selectedOptionValue = selectedOption.value;
        const selectedOptionText = selectedOption.text;
        const type = {
            libelle: label,
            familyType: {
                id: selectedOptionValue
            }
        };
        console.log(type);
        update(selectedItemTypeState.id, type).then((response) => {
            const updatedItemType = {
                id: response.id,
                libelle: response.libelle,
                familyType: {
                    id: response.familyType.id,
                    name: response.familyType.name
                }
            };
            const updatedItems = itemsP.map((item) => (item.id === updatedItemType.id ? updatedItemType : item));
            setIsChange(!isChange);
            setMessage('Type modifié avec succès');
            setTypeToast('success');
            setOpenToast(true);
            setOpen(false);
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
                        Modifier un type :
                    </Typography>

                    <form onSubmit={handleSubmitType}>
                        <TextField
                            id="label"
                            name="label"
                            variant="outlined"
                            style={{ width: '100%' }}
                            defaultValue={selectedItemTypeState?.libelle}
                        />
                        <Typography style={{ marginBottom: '10px' }} id="modal-modal-description" sx={{ mt: 2 }}>
                            Famille :
                        </Typography>
                        <FormControl fullWidth style={{ marginBottom: '20px' }}>
                            <select
                                style={{
                                    height: '40px',
                                    backgroundColor: 'lightgray',
                                    borderRadius: '5px',
                                    padding: '5px'
                                }}
                                name="familyType"
                                defaultValue={selectedItemTypeState?.familyType.id}
                            >
                                <option value="defaultOption" style={{ height: '40px' }}>
                                    Sélectionner une famille
                                </option>
                                {items.map((it) => (
                                    <option key={it.id} value={it.id}>
                                        {it.name}
                                    </option>
                                ))}
                            </select>
                            <FormHelperText>Selectionner une Famille</FormHelperText>
                        </FormControl>

                        <Button variant="outlined" onClick={() => setOpen(false)}>
                            Annuler
                        </Button>
                        <Button type="submit" variant="contained">
                            Enregistrer
                        </Button>
                    </form>
                </StyleModal>
            </Modal>
        </>
    );
};

export default UpdateTypeModal;
