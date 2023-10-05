import React from 'react';

import {
    Modal,
    Box,
    Typography,
    Button,
    Chip,
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    ListItemText,
    Grid
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { create, remove, update } from 'api/equipe';
import { useContext } from 'react';
import AppContext from 'layout/Context';
import { StyleModal, styleModal, styleModalx, useStyles } from 'utils/Modals/styleModals';
import ToastyNotification from 'utils/toasty';

const UpdateEquipeModal = ({ open, setOpen, setFetchData, fetchData }) => {
    const classes = useStyles();
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSuperviseurChange = (event) => {
        const selectedSuperviseurId = parseInt(event.target.value);

        setSelectedSuperviseur(selectedSuperviseurId);
        setSelectedPersonnel({
            ...selectedPersonnel,
            superviseur: { id: selectedSuperviseurId }
        });
    };
    const handleChefDepartementChange = (event) => {
        setSelectedChefDepartement(event.target.value);
    };
    const handleBranchChange = (event) => {
        setSelectedPersonnel((prv) => ({
            ...prv,
            branch: { id: parseInt(event.target.value) }
        }));
    };

    function handleMembersChange(event) {
        setSelectedMembers(event.target.value);
        console.log('handleMembersChange', event.target.value);
    }
    const {
        selectedPersonnel,
        setSelectedPersonnel,
        selectedChefDepartement,
        setSelectedChefDepartement,
        selectedMembers,
        setSelectedMembers,
        members,
        superviseurs,
        chefDepartements,
        membersToUpdate,
        setMembersToUpdate,
        selectedSuperviseur,
        setSelectedSuperviseur
    } = useContext(AppContext);
    const handleSubmitTypeupdate = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const teamName = formData.get('teamName');
        const specialite = formData.get('specialite');

        const lastLocationDate = formData.get('lastLocationDate');
        const nvehicule = formData.get('nvehicule');
        event.preventDefault();
        const updatedTeam = {
            teamName,
            specialite,

            lastLocationDate,
            branch: {
                id: selectedPersonnel.branch.id
            },
            superviseur: {
                id: selectedSuperviseur
            },
            chefEquipe: { id: selectedChefDepartement },
            members: selectedMembers.map((member) => ({ id: member })), //selectedPersonnel.members, //
            nvehicule
        };

        update(formData.get('id'), updatedTeam).then((response) => {
            setFetchData(!fetchData);
            setTimeout(() => {
                setMessage('Equipe bien Modifiée');

                setTypeToast('success');
                setOpenToast(true);
            }, 0);
        });
        // close the modal
        handleClose();
    };

    function getMemberName(memberId) {
        const member = membersToUpdate.find((m) => m.id === memberId);
        console.log('getMemberName', memberId, member);
        return member ? `${member.firstName} ${member.lastName}` : '';
    }

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
                <StyleModal>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        MODIFIER EQUIPE :
                    </Typography>

                    <form onSubmit={handleSubmitTypeupdate}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Nom d'équipe *
                                </Typography>
                                <input type="hidden" name="id" value={selectedPersonnel?.id} />
                                <TextField
                                    required
                                    id="teamName"
                                    name="teamName"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedPersonnel?.teamName}
                                    onChange={(e) =>
                                        setSelectedPersonnel({
                                            ...selectedPersonnel,
                                            teamName: e.target.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Spécialité de l'équipe
                                </Typography>
                                <TextField
                                    required
                                    id="specialite"
                                    name="specialite"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedPersonnel?.specialite}
                                    onChange={(e) =>
                                        setSelectedPersonnel({
                                            ...selectedPersonnel,
                                            specialite: e.target.value
                                        })
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Branche *
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        id="branch"
                                        name="branch.id"
                                        value={selectedPersonnel?.branch?.id}
                                        onChange={handleBranchChange}
                                        className={classes.radioGroup}
                                        required
                                    >
                                        <MenuItem value={1}>Electricite</MenuItem>
                                        <MenuItem value={2}>Eau potable</MenuItem>
                                        <MenuItem value={3}>Assainissement</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Superviseur *
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        id="superviseur"
                                        name="superviseur.id"
                                        value={selectedPersonnel?.superviseur?.id}
                                        onChange={handleSuperviseurChange}
                                        required
                                    >
                                        {superviseurs.map((superviseur) => (
                                            <MenuItem key={superviseur.id} value={superviseur.id}>
                                                {superviseur.firstName} {superviseur.lastName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Chef de d'equipe *
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        id="chefEquipe"
                                        name="chefEquipe.id"
                                        value={selectedChefDepartement}
                                        onChange={handleChefDepartementChange}
                                        required
                                    >
                                        {chefDepartements.map((chefDepartement) => (
                                            <MenuItem key={chefDepartement.id} value={chefDepartement.id}>
                                                {chefDepartement.firstName} {chefDepartement.lastName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Membres *
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        multiple
                                        value={selectedMembers}
                                        onChange={handleMembersChange}
                                        input={<OutlinedInput name="members" />}
                                        renderValue={(selected) => (
                                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                {selected.map((memberId) => (
                                                    <Chip key={memberId} label={getMemberName(memberId)} />
                                                ))}
                                            </div>
                                        )}
                                    >
                                        {membersToUpdate.map((member) => (
                                            <MenuItem key={member.id} value={member.id}>
                                                <Checkbox checked={selectedMembers.includes(member.id)} />
                                                <ListItemText primary={`${member.firstName} ${member.lastName}`} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    N° de véhicule
                                </Typography>
                                <TextField
                                    required
                                    id="nvehicule"
                                    name="nvehicule"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedPersonnel?.nvehicule}
                                    onChange={(e) =>
                                        setSelectedPersonnel({
                                            ...selectedPersonnel,
                                            nvehicule: e.target.value
                                        })
                                    }
                                />
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

export default UpdateEquipeModal;
