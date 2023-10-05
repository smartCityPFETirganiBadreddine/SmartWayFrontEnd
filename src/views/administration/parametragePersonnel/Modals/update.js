import React from 'react';
//Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import { update } from 'api/personnel';
import { useContext } from 'react';
import AppContext from 'layout/Context';
import { roles } from 'utils/renameRoles';
import { branches } from 'utils/branches';
import { makeStyles } from '@material-ui/core';
import { Box } from '@chakra-ui/react';
import { StyleModal, styleModal, styleModalx, useStyles } from 'utils/Modals/styleModals';
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

const UpdatePersonnelModal = ({ open, setOpen }) => {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };
    const handleProfileChange = (event) => {
        setSelectedProfile(event.target.value);
    };
    const handleBranchChange = (event) => {
        setSelectedPersonnel({
            ...selectedPersonnel,
            branch: { id: parseInt(event.target.value) }
        });
    };
    const { selectedPersonnel, setSelectedPersonnel, isChange, setIsChange } = useContext(AppContext);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //update
    async function handleSubmitType(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const roleName = formData.get('roles') ? formData.get('roles') : 'ROLE_ADMIN';

        const user = {
            userName: formData.get('userName'),
            email: formData.get('email'),
            enabled: formData.get('enabled') === 'on',
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phone: formData.get('phone'),
            branch: { id: parseInt(formData.get('branch')) },
            matricule: formData.get('matricule'),
            chargeDeTravaux: formData.get('chargeDeTravaux') === 'true',
            cin: formData.get('cin'),
            password: formData.get('password'),
            roles: [{ name: roleName }]
        };
        await update(formData.get('id'), user);

        setIsChange(!isChange);
        setMessage('Personnel modifié avec succès');
        setTypeToast('success');
        setOpenToast(true);

        handleClose();
    }
    //end update
    const classes = useStyles();
    const [selectedProfile, setSelectedProfile] = useState('option1');
    const [selectedBranch, setSelectedBranch] = useState('electricite');

    return (
        <>
            {' '}
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleToastClose} />
            {/*Modal*/}
            <Modal
                sx={styleModalx}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyleModal>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        MODIFIER PERSONNEL :
                    </Typography>

                    <form onSubmit={handleSubmitType}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Nom *
                                </Typography>
                                <input
                                    type="hidden"
                                    value={selectedPersonnel?.id}
                                    name="id"
                                    onChange={(e) =>
                                        setSelectedPersonnel({
                                            ...selectedPersonnel,
                                            id: e.target.value
                                        })
                                    }
                                />
                                <TextField
                                    id="firstName"
                                    name="firstName"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedPersonnel?.firstName}
                                    onChange={(e) =>
                                        setSelectedPersonnel({
                                            ...selectedPersonnel,
                                            firstName: e.target.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    CIN *
                                </Typography>
                                <TextField
                                    id="cin"
                                    name="cin"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedPersonnel?.cin}
                                    onChange={(e) =>
                                        setSelectedPersonnel({
                                            ...selectedPersonnel,
                                            cin: e.target.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Prénom *:
                                </Typography>
                                <TextField
                                    id="lastName"
                                    name="lastName"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedPersonnel?.lastName}
                                    onChange={(e) =>
                                        setSelectedPersonnel({
                                            ...selectedPersonnel,
                                            lastName: e.target.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Matricule *:
                                </Typography>
                                <TextField
                                    id="matricule"
                                    name="matricule"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedPersonnel?.matricule}
                                    onChange={(e) =>
                                        setSelectedPersonnel({
                                            ...selectedPersonnel,
                                            matricule: e.target.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Nom d'utilisateur :
                                </Typography>
                                <TextField
                                    id="userName"
                                    name="userName"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedPersonnel?.userName}
                                    onChange={(e) =>
                                        setSelectedPersonnel({
                                            ...selectedPersonnel,
                                            userName: e.target.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Tél *:
                                </Typography>
                                <TextField
                                    id="phone"
                                    name="phone"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedPersonnel?.phone}
                                    onChange={(e) =>
                                        setSelectedPersonnel({
                                            ...selectedPersonnel,
                                            phone: e.target.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Email *:
                                </Typography>
                                <TextField
                                    id="email"
                                    name="email"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedPersonnel?.email}
                                    onChange={(e) =>
                                        setSelectedPersonnel({
                                            ...selectedPersonnel,
                                            email: e.target.value
                                        })
                                    }
                                />
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
                                <TextField
                                    id="password"
                                    name="password"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) =>
                                        setSelectedPersonnel({
                                            ...selectedPersonnel,
                                            password: e.target.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Branche * :
                                </Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        aria-label="branche"
                                        name="branch"
                                        value={selectedPersonnel?.branch?.id}
                                        onChange={handleBranchChange}
                                        className={classes.radioGroup}
                                    >
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
                                <TextField
                                    id="passwordConfirmation"
                                    name="passwordConfirmation"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedPersonnel?.passwordConfirmation}
                                    onChange={(e) =>
                                        setSelectedPersonnel({
                                            ...selectedPersonnel,
                                            passwordConfirmation: e.target.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Actif * :
                                </Typography>

                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedPersonnel?.enabled}
                                                onChange={(e) =>
                                                    setSelectedPersonnel({
                                                        ...selectedPersonnel,
                                                        enabled: e.target.checked
                                                    })
                                                }
                                                id="enabled"
                                                name="enabled"
                                                color="primary"
                                            />
                                        }
                                        label="Actif"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button variant="outlined" onClick={handleClose} sx={{ mr: 2 }}>
                                Annuler
                            </Button>
                            <Button type="submit" variant="contained">
                                Enregistrer
                            </Button>
                        </Box>
                    </form>
                </StyleModal>
            </Modal>
        </>
    );
};

export default UpdatePersonnelModal;
