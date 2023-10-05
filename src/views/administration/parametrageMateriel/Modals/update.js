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
import { makeStyles } from '@material-ui/core';
import { Box, useStyles } from '@chakra-ui/react';
import { createFamille } from 'api/famille';
import { create, update } from 'api/materiel';
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

const UpdateMaterielModal = ({ openUp, setOpenUp }) => {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };
    const { items, setItems, isChange, setIsChange, selected, setSelected } = useContext(AppContext);
    const handleOpen = () => setOpenUp(true);
    const handleClose = () => setOpenUp(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const id = parseInt(formData.get('id'));
        const unit = formData.get('unit');
        const name = formData.get('name');
        const branch = formData.get('branch');
        const isActive = formData.get('isActive') === 'on';
        const materiel = {
            name: name,
            unit: unit,
            branch: {
                id: branch
            },
            active: isActive
        };
        console.log(materiel);
        update(id, materiel).then((response) => {
            setIsChange(!isChange);
            setMessage('Materiel modifiée avec succès');
            setTypeToast('success');
            setOpenToast(true);
            handleClose();
        });
    };

    return (
        <>
            {' '}
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleToastClose} />
            <Modal
                sx={styleModalx}
                open={openUp}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyleModal width={'50%'} height={'50%'}>
                    <Typography id="modal-modal-title" variant="h4" component="h2" mb={2} style={{ textAlign: 'center' }}>
                        Modifier une Materiel :
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <input type="hidden" value={selected?.id} name="id" />
                        <FormControl fullWidth style={{ marginBottom: '20px', marginTop: '20px' }}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Branche *</FormLabel>
                            <RadioGroup
                                defaultValue={selected.branch?.id}
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="branch"
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Eléctricité" />
                                <FormControlLabel value="2" control={<Radio />} label="Eau Potable" />
                                <FormControlLabel value="3" control={<Radio />} label="Assainissement" />
                            </RadioGroup>
                        </FormControl>
                        <TextField
                            id="label"
                            placeholder="Nom du materiel *"
                            defaultValue={selected?.name}
                            name="name"
                            variant="outlined"
                            style={{ width: '100%' }}
                        />
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
                                defaultValue={selected.unit?.name} // Use the name of the unit as the default value
                            >
                                {unite.map((it) => (
                                    <option key={it.id} value={it.name}>
                                        {it.name}
                                    </option>
                                ))}
                            </select>
                            <FormHelperText>Selectionner une Famille</FormHelperText>
                        </FormControl>

                        <Grid container spacing={2} justifyContent="flex-end">
                            <Grid item>
                                <Button variant="outlined" onClick={handleClose}>
                                    Annuler
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained" disableElevation>
                                    Enregistrer
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </StyleModal>
            </Modal>
        </>
    );
};

export default UpdateMaterielModal;
