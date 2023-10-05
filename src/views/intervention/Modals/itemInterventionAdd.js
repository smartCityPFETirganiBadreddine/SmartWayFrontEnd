import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from '@mui/material';

import AppContext from 'layout/Context';
import { create } from 'api/materiel';
import ToastyNotification from 'utils/toasty';
import { StyleModal, styleModalx } from 'utils/Modals/styleModals';
import { getAllByBranch } from 'api/famille';
import { getAllByFamille } from 'api/type';
import { statusReclamation2, unite } from 'utils/Util';
import { getAllequipes, getByBranchId } from 'api/equipe';
import { useParams } from 'react-router';
import { createIntervention } from 'api/intervention';
import { toast } from 'react-toastify';
const schema = yup.object().shape({
    comment: yup.string().required(),
    status: yup.string().required(),
    familyType: yup.number().required()
});

const ItemInterventionAdd = ({ open, setOpen }) => {
    const [type, setType] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Intérvention ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const { selectedRow, idBranch, famille, setFamille, isInterventionChanged, setIsInterventionChanged } = useContext(AppContext);
    const [Equipe, setEquipe] = useState([]);
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const fetchEquipeData = async () => {
            try {
                const response = await getAllequipes();
                //const equipeData = response.data;
                setEquipe(response);
                console.log('response ****:', response);
            } catch (error) {
                console.error("Erreur lors de la récupération des données de l'équipe :", error);
            }
        };

        fetchEquipeData();
    }, []);

    const handleClose = () => setOpen(false);
    const [intervention, setIntervention] = useState({
        comment: '',
        familyType: '',
        status: '',
        type: '',
        priority: ''
    });
    const handleSubmitType = async (data) => {
        const { comment, status, familyType, type, priority, equipe } = data;
        const intervention = {
            comment: comment,
            reclamation: {
                id: selectedRow?.id
            },
            type: {
                id: type
            },
            team: {
                id: 1
            },
            familyType: {
                id: familyType
            },
            branch: {
                id: idBranch
            },
            active: priority,
            adresse: 'string'
        };
        //alert('intervention');
        console.log(intervention);

        try {
            const response = await createIntervention(intervention);
            setMessage('Intervention ajoutée avec succès');
            setTypeToast('success');
            setOpenToast(true);
            setOpen(false);
            setIsInterventionChanged(!isInterventionChanged);
        } catch (error) {
            setMessage("Erreur lors de l'ajout de l'intervention");
            setTypeToast('error');
            toast.error('Une erreur est survenue : ' + error.message);
        }

        handleClose();
    };

    const handleInputChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === 'familyType') {
            getType(value);
        }
        setIntervention({ ...intervention, [name]: value });
    };

    const handleFamilleChange = async (e) => {
        const { value } = e.target;

        if (value) {
            const { data: types } = await getAllByFamille(value);
            setType(types);
        }
    };
    const getType = async (id) => {
        try {
            const { data: DataContrat } = await getAllByFamille(id);
            setType(DataContrat);
            console.log(DataContrat);
        } catch (error) {
            console.error('Error fetching personnel data:', error);
        }
    };

    return (
        <>
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={() => setOpenToast(false)} />
            <Modal
                sx={styleModalx}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyleModal width={'50%'} height={'70%'}>
                    <Typography id="modal-modal-title" variant="h4" component="h2" mb={2} style={{ textAlign: 'center' }}>
                        Ajout Intervention pour le réclamation N° : {selectedRow?.id}
                    </Typography>

                    <form onSubmit={handleSubmit(handleSubmitType)}>
                        <FormControl fullWidth style={{ marginBottom: '20px' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12}>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Description * :
                                    </Typography>
                                    <TextField
                                        {...register('comment')}
                                        id="comment"
                                        name="comment"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        inputProps={{ maxLength: 240 }}
                                        required
                                        onChange={handleInputChange}
                                        helperText={`${intervention?.comment?.length || 0} caractères sur un maximum de 240`}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Famille *
                                    </Typography>
                                    <FormControl fullWidth>
                                        <Select
                                            {...register('familyType')}
                                            id="familyType"
                                            name="familyType"
                                            required
                                            onChange={handleInputChange}
                                            onClick={handleFamilleChange}
                                            // value={selectedRow?.familyType?.id}
                                        >
                                            {famille.map((obj) => (
                                                <MenuItem key={obj.id} value={obj.id}>
                                                    {obj.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Type
                                    </Typography>
                                    <FormControl fullWidth>
                                        <Select
                                            {...register('type')}
                                            id="type"
                                            name="type"
                                            onChange={handleInputChange}
                                            required
                                            //value={intervention?.type?.id}
                                        >
                                            {type.map((obj) => (
                                                <MenuItem key={obj.id} value={obj.id}>
                                                    {obj.libelle}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Equipe
                                    </Typography>
                                    <FormControl fullWidth>
                                        <Select
                                            {...register('equipe')}
                                            id="equipe"
                                            name="equipe"
                                            onChange={handleInputChange}

                                            //value={intervention?.type?.id}
                                        >
                                            {Equipe.map((obj) => (
                                                <MenuItem key={obj.id} value={obj.id}>
                                                    {obj.id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Status *
                                    </Typography>
                                    <FormControl fullWidth>
                                        <Select {...register('status')} id="status" name="status" required defaultValue="en cours">
                                            {statusReclamation2.map((obj) => (
                                                <MenuItem key={obj.id} value={obj.name}>
                                                    {obj.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Intérvention Urgente
                                    </Typography>
                                    <FormControl>
                                        <Checkbox
                                            {...register('priority')}
                                            id="priority"
                                            name="priority"
                                            color="primary"
                                            //checked={selectedRow?.priority === 1}
                                            onChange={handleInputChange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button variant="outlined" onClick={handleClose}>
                                        Annuler
                                    </Button>
                                    <Button type="submit" variant="contained">
                                        Enregistrer
                                    </Button>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </form>
                </StyleModal>
            </Modal>
        </>
    );
};

export default ItemInterventionAdd;
