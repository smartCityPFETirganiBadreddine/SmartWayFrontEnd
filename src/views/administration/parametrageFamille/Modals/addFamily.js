import React from 'react';
//Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { create } from 'api/personnel';
import { useContext } from 'react';
import AppContext from 'layout/Context';
import { roles } from 'utils/renameRoles';
import { branches } from 'utils/branches';
import { makeStyles } from '@material-ui/core';
import { Box, useStyles } from '@chakra-ui/react';
import { createFamille } from 'api/famille';
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

const AddFamilyModal = ({ open, setOpen }) => {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };
    const { isChange, setIsChange } = useContext(AppContext);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const branch = formData.get('branch');
        const label = formData.get('label');

        const famille = {
            name: label,
            branch: {
                id: branch
            }
        };
        createFamille(famille)
            .then((response) => {
                setIsChange(!isChange);

                setMessage('Famille ajouté avec succès');
                setTypeToast('success');
                setOpenToast(true);
            })
            .catch((error) => {
                setMessage("Erreur lors de l'ajout");
                setTypeToast('error');
                toast.error('Une erreur est survenue : ' + error.message);
            });
        handleClose();
    };

    return (
        <>
            {' '}
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
                        Ajout une famille :
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth style={{ marginBottom: '20px', marginTop: '20px' }}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Branche *</FormLabel>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="branch">
                                <FormControlLabel value="1" control={<Radio />} label="Eléctricité" />
                                <FormControlLabel value="2" control={<Radio />} label="Eau Potable" />
                                <FormControlLabel value="3" control={<Radio />} label="Assainissement" />
                            </RadioGroup>
                        </FormControl>

                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Libellé :
                        </Typography>
                        <TextField id="label" name="label" variant="outlined" style={{ width: '100%' }} />
                        <div style={{ marginTop: '20px' }}>
                            <Button variant="outlined" onClick={handleClose} style={{ marginRight: '2%' }}>
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

export default AddFamilyModal;
