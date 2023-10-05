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
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { create } from 'api/equipe';
import { useContext } from 'react';
import AppContext from 'layout/Context';
import { makeStyles } from '@material-ui/core';
import { StyleModal, styleModal, styleModalx, useStyles } from 'utils/Modals/styleModals';
import { toast } from 'react-toastify';
import ToastyNotification from 'utils/toasty';

const schema = yup.object().shape({
    teamName: yup.string().required(),
    branch: yup.number().required(),
    supervisor: yup.number().required(),
    departmentHead: yup.number().required(),
    members: yup.array().min(1).required(),
    vehicleNumber: yup.string().nullable(),
    specialite: yup.string().nullable()
});

const AddEquipeModal = ({ open, setOpensave, handleSave, setFetchData, fetchData }) => {
    const classes = useStyles();
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };
    const handleClosesave = () => setOpensave(false);
    const { members, superviseurs, chefDepartements } = useContext(AppContext);
    const [selectedBranchsave, setSelectedBranchsave] = useState('');
    const [selectedMemberssave, setSelectedMemberssave] = useState([]);
    const [selectedSuperviseursave, setSelectedSuperviseursave] = useState('');
    const [selectedChefDepartementsave, setSelectedChefDepartementsave] = useState('');
    const handleSuperviseurChangesave = (event) => {
        setSelectedSuperviseursave(event.target.value);
    };
    const handleBranchChangesave = (event) => {
        setSelectedBranchsave(event.target.value);
    };
    //clear inputes
    const { register, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const handleSubmitTypesave = (event) => {
        event.preventDefault();

        // Destructure form data
        const formData = new FormData(event.target);
        const { teamName, specialite, lastLocationDate, nvehicule } = Object.fromEntries(formData.entries());

        // Create new team object
        const newTeam = {
            teamName,
            specialite: specialite,
            lastLocationDate,
            branch: { id: selectedBranchsave },
            superviseur: { id: selectedSuperviseursave },
            chefEquipe: { id: selectedChefDepartementsave },
            members: selectedMemberssave.map((memberId) => ({ id: memberId })),
            nvehicule
        };

        // Save new team using API or other method
        console.log(newTeam);
        create(newTeam).then((response) => {
            setFetchData(!fetchData);
            setSelectedMemberssave([]); // Clear the selected members
            setSelectedSuperviseursave(''); // Clear the selected superviseur
            setSelectedChefDepartementsave(''); // Clear the selected chefDepartement
            setSelectedBranchsave(''); // Clear the selected branch

            setMessage('Equipe bien ajoutée');
            setTypeToast('success');
            setOpenToast(true);
            reset();
        });

        handleClosesave();
    };
    const handleChefDepartementChangesave = (event) => {
        setSelectedChefDepartementsave(event.target.value);
    };
    const handleMembersSaveChange = (event) => {
        // Get the selected member IDs from the event object
        const selectedMemberIds = event.target.value;

        // Update the selectedMemberssave state
        setSelectedMemberssave(selectedMemberIds);
    };
    function getMemberNameAdd(memberId) {
        const member = members.find((m) => m.id === memberId);
        return member ? `${member.firstName} ${member.lastName}` : '';
    }

    return (
        <>
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleToastClose} />

            <Modal
                sx={styleModalx}
                open={open}
                onClose={handleClosesave}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyleModal>
                    <Typography variant="h4" component="h2" className={classes.modalTitle}>
                        AJOUT EQUIPE :
                    </Typography>

                    <form onSubmit={handleSubmitTypesave}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Nom d'équipe *
                                </Typography>
                                <TextField id="teamName" name="teamName" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Spécialité de l'équipe
                                </Typography>
                                <TextField id="specialite" name="specialite" variant="outlined" fullWidth />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Branche *
                                </Typography>
                                <FormControl fullWidth>
                                    <InputLabel>Selectionner une branche</InputLabel>
                                    <Select
                                        id="branch"
                                        name="branch.id"
                                        value={selectedBranchsave}
                                        onChange={handleBranchChangesave}
                                        required
                                    >
                                        <MenuItem value={1}>Electricite</MenuItem>
                                        <MenuItem value={2}>Eau potable</MenuItem>
                                        <MenuItem value={3}>Assainissement</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Superviseur *
                                </Typography>
                                <FormControl fullWidth>
                                    <InputLabel>Selectionner un superviseur</InputLabel>
                                    <Select
                                        id="superviseur"
                                        name="superviseur.id"
                                        value={selectedSuperviseursave}
                                        onChange={handleSuperviseurChangesave}
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
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Chef de d'equipe *
                                </Typography>
                                <FormControl fullWidth>
                                    <InputLabel>Selectionner un chef de d'equipe</InputLabel>
                                    <Select
                                        id="chefEquipe"
                                        name="chefEquipe.id"
                                        value={selectedChefDepartementsave}
                                        onChange={handleChefDepartementChangesave}
                                        required
                                    >
                                        {chefDepartements.map((superviseur) => (
                                            <MenuItem key={superviseur.id} value={superviseur.id}>
                                                {superviseur.firstName} {superviseur.lastName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Membres *
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        multiple
                                        value={selectedMemberssave}
                                        onChange={handleMembersSaveChange}
                                        input={<OutlinedInput name="members" />}
                                        renderValue={(selected) => (
                                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                {selected.map((memberId) => (
                                                    <Chip key={memberId} label={getMemberNameAdd(memberId)} />
                                                ))}
                                            </div>
                                        )}
                                    >
                                        {members.map((member) => (
                                            <MenuItem key={member.id} value={member.id}>
                                                <Checkbox checked={selectedMemberssave.includes(member.id)} />
                                                <ListItemText primary={`${member.firstName} ${member.lastName}`} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    N° de véhicule
                                </Typography>
                                <TextField required id="nvehicule" type="number" name="nvehicule" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={5} sx={{ mt: 5 }} className={classes.gridContainer}>
                                <Button variant="outlined" className={classes.cancelButton} onClick={handleClosesave}>
                                    Annuler
                                </Button>
                                <Button type="submit" variant="contained" className={classes.saveButton}>
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

export default AddEquipeModal;
