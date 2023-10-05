import React from 'react';
//Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyleModal, styleModal, styleModals, styleModalx } from 'utils/Modals/styleModals';
//end Toastify
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Select,
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

const AddPersonnelModal = ({ open, setOpen }) => {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };

    const { dataPersonnel, isChange, setIsChange } = useContext(AppContext);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmitType = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const userName = formData.get('userName');
        const email = formData.get('email');
        const enabled = formData.get('enabled') === 'on';
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const phone = formData.get('phone');
        const branchId = parseInt(formData.get('branch'));
        const matricule = formData.get('matricule');
        const chargeDeTravaux = formData.get('chargeDeTravaux') === 'true';
        const cin = formData.get('cin');
        const password = formData.get('password');

        const roles = [
            {
                name: formData.get('roles')
            }
        ];

        const user = {
            userName,
            email,
            enabled,
            firstName,
            lastName,
            phone,
            branch: {
                id: branchId
            },
            matricule,
            chargeDeTravaux,
            cin,
            password,
            roles: roles
        };

        try {
            const message = await create(user);
            setMessage('Utilisateur ajouté avec succès');
            setTypeToast('success');
            setOpenToast(true);
            handleClose();
            setIsChange(!isChange);
        } catch (error) {
            setMessage("Erreur lors de l'ajout de l'utilisateur");
            setTypeToast('error');
            if (error.response && error.response.status === 400 && error.response.data.message === 'Error: Username is already taken!') {
                toast.error("Le nom d'utilisateur est déjà utilisé. Veuillez en choisir un autre.");
            } else {
                toast.error('Une erreur est survenue : ' + error.message);
            }
        }

        handleClose();
    };

    const [selectedProfile, setSelectedProfile] = useState('option1');
    const [selectedBranch, setSelectedBranch] = useState('electricite');
    const handleProfileChange = (event) => {
        setSelectedProfile(event.target.value);
    };
    const handleBranchChange = (event) => {
        setSelectedBranch(event.target.value);
    };
    const [enabled, setEnabled] = React.useState(false);

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
                <StyleModal>
                    <Typography variant="h4" component="h2">
                        AJOUT PERSONNEL :
                    </Typography>

                    <form onSubmit={handleSubmitType}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Nom *
                                </Typography>
                                <TextField id="firstName" name="firstName" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    CIN *
                                </Typography>
                                <TextField id="cin" name="cin" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Prénom *:
                                </Typography>
                                <TextField id="lastName" name="lastName" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Matricule *:
                                </Typography>
                                <TextField id="matricule" name="matricule" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Nom d'utilisateur :
                                </Typography>
                                <TextField id="userName" name="userName" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Tél *:
                                </Typography>
                                <TextField id="phone" name="phone" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Email *:
                                </Typography>
                                <TextField id="email" name="email" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ mt: 4 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Selectionner un Profile</InputLabel>
                                    <Select id="roles" name="roles" value={selectedProfile} onChange={handleProfileChange}>
                                        {roles.map((role) => (
                                            <MenuItem key={role.value} value={role.value}>
                                                {role.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Mot de passe * :
                                </Typography>
                                <TextField id="password" name="password" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Branche * :
                                </Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="branche" name="branch" value={selectedBranch} onChange={handleBranchChange}>
                                        {branches.map((branch) => (
                                            <FormControlLabel
                                                key={branch.id}
                                                value={branch.id.toString()}
                                                control={<Radio />}
                                                label={branch.label}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Confirmation du mot de passe :
                                </Typography>
                                <TextField id="passwordConfirmation" name="passwordConfirmation" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Actif * :
                                </Typography>

                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={enabled}
                                                onChange={(event) => setEnabled(event.target.checked)}
                                                id="enabled"
                                                name="enabled"
                                                color="primary"
                                            />
                                        }
                                        label="Actif"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={5} sx={{ mt: 5 }}>
                                <Button variant="outlined" onClick={handleClose}>
                                    Annuler
                                </Button>
                                <Button type="submit" variant="contained">
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

export default AddPersonnelModal;
