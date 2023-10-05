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

import { useContext } from 'react';
import AppContext from 'layout/Context';
import { roles } from 'utils/renameRoles';
import { branches } from 'utils/branches';

import { Box, useStyles } from '@chakra-ui/react';
import { createFamille } from 'api/famille';
import { create } from 'api/materiel';
import { unite } from 'utils/Util';
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

const AddMaterielModal = ({ open, setOpen }) => {
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

        const unit = formData.get('unit');
        const name = formData.get('name');
        const branch = formData.get('branch');
        const isActive = formData.has('actif');
        console.log(isActive);
        const materiel = {
            name: name,
            unit: unit,
            branch: {
                id: branch
            },
            active: isActive
        };
        create(materiel)
            .then((response) => {
                setMessage('Materiél ajouté avec succès');
                setTypeToast('success');
                setOpenToast(true);
                setIsChange(!isChange);
            })
            .catch((error) => {
                setMessage("Erreur lors de l'ajout du materiel");
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
                    <Typography id="modal-modal-title" variant="h4" component="h2" mb={2} style={{ textAlign: 'center' }}>
                        Ajout une Materiel :
                    </Typography>

                    <form onSubmit={handleSubmitType}>
                        <FormControl fullWidth style={{ marginBottom: '20px', marginTop: '20px' }}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Branche *</FormLabel>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="branch">
                                <FormControlLabel value="1" control={<Radio />} label="Eléctricité" />
                                <FormControlLabel value="2" control={<Radio />} label="Eau Potable" />
                                <FormControlLabel value="3" control={<Radio />} label="Assainissement" />
                            </RadioGroup>
                        </FormControl>
                        <TextField id="label" placeholder="Nom du materiel *" name="name" variant="outlined" style={{ width: '100%' }} />
                        <Typography style={{ marginBottom: '10px' }} id="modal-modal-description" sx={{ mt: 2 }}>
                            Unité de mesure :
                        </Typography>
                        <FormControl fullWidth style={{ marginBottom: '20px' }}>
                            <select
                                style={{
                                    height: '40px',
                                    backgroundColor: 'lightgray',
                                    borderRadius: '5px',
                                    padding: '5px'
                                }}
                                name="unit"
                            >
                                <option value="someOption" style={{ height: '40px' }}>
                                    Some option
                                </option>
                                {unite.map((it) => (
                                    <option key={it.id} value={it.name}>
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

export default AddMaterielModal;
