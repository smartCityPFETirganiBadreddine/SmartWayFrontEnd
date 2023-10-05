import React, { useContext, useState } from 'react';

import { Button, FormControl, FormHelperText, Select, Typography } from '@mui/material';
import { Modal, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AppContext from 'layout/Context';
import { createType } from 'api/type';

import { StyleModal, styleModal, styleModalx } from 'utils/Modals/styleModals';
import { branches } from 'utils/branches';
import { makeStyles } from '@material-ui/core';
import { Box, useStyles } from '@chakra-ui/react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastyNotification from 'utils/toasty';

const schema = yup.object().shape({
    teamName: yup.string().required(),
    branch: yup.number().required(),
    supervisor: yup.number().required(),
    departmentHead: yup.number().required(),
    members: yup.array().min(1).required(),
    vehicleNumber: yup.string().nullable(),
    specialist: yup.string().nullable()
});

const AddTypeModal = ({ open, setOpen }) => {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };

    const { items, setItems, isChange, setIsChange } = useContext(AppContext);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmitType = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const label = formData.get('label');
        const selectedOption = event.target.familyType.options[event.target.familyType.selectedIndex];
        const selectedOptionValue = selectedOption.value;

        const type = {
            libelle: label,
            familyType: {
                id: selectedOptionValue
            }
        };
        createType(type)
            .then((response) => {
                setMessage('Type ajouté avec succès');
                setTypeToast('success');
                setOpenToast(true);
                setIsChange(!isChange);
            })
            .catch((error) => {
                setMessage("Erreur lors de l'ajout du type");
                setTypeToast('error');
                setOpenToast(true);
            });
        handleClose();
    };

    return (
        <>
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleToastClose} />

            <Modal
                sx={styleModalx}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyleModal width={'50%'} height={'50%'}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Ajout un type :
                    </Typography>

                    <form onSubmit={handleSubmitType}>
                        <TextField id="label" name="label" variant="outlined" style={{ width: '100%' }} />
                        <Typography style={{ marginBottom: '10px' }} id="modal-modal-description" sx={{ mt: 2 }}>
                            familyTypes :
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
                            >
                                <option value="someOption" style={{ height: '40px' }}>
                                    Some option
                                </option>
                                {items.map((it) => (
                                    <option key={it.id} value={it.id}>
                                        {it.name}
                                    </option>
                                ))}
                            </select>
                            <FormHelperText>Selectionner une Famille</FormHelperText>
                        </FormControl>

                        <Button variant="outlined" onClick={handleClose}>
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

export default AddTypeModal;
