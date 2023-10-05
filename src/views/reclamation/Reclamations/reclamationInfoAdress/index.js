import React, { useEffect, useState, useContext } from 'react';
import Paper from '@mui/material/Paper';
import ToastyNotification from 'utils/toasty';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@mui/material';
import AppContext from 'layout/Context';
import { StyleModal, styleModal, styleModalx, useStyles } from 'utils/Modals/styleModals';
import { create, getContractById, getContratByNumPolice } from 'api/reclamation';
import { categoryClient, reclamationSources, typeClient } from 'utils/reclamations';
import { getAllByBranch } from 'api/famille';
import { getAllByFamille } from 'api/type';
import { CheckBox, Contrast } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function ReclamationInfoAdress() {
    const navigate = useNavigate();
    const { contrat, setContrat, reclamation, setReclamation, isChanged, setIsChanged } = useContext(AppContext);
    const classes = useStyles();
    const [famille, setFamille] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [type, setType] = useState([]);
    const [typetoast, setTypeToast] = useState('success');
    const [message, setMessage] = useState('Type ajouté avec succès');
    const handleToastClose = () => {
        setOpenToast(false);
    };
    useEffect(() => {
        const fetchData = async () => {
            const { data: familleByBranch } = await getAllByBranch('Electricite');
            setFamille(familleByBranch);
        };

        fetchData();
    }, []);

    function validerInputes() {
        if (
            reclamation.category == null ||
            reclamation.typeClient == '' ||
            reclamation.reclamationSource == null ||
            reclamation.type == null
        ) {
            setMessage('les champs * est obligatoire');
            setTypeToast('error');
            setOpenToast(true);
            return false;
        } else {
            return true;
        }
    }
    const handleClick = async () => {
        const form = document.getElementById('reclamationForm');
        if (form.checkValidity()) {
            if (contrat !== null && reclamation !== null) {
                const reclamationObj = {
                    clientFullName: reclamation.clientFullName != null ? reclamation.clientFullName : '',
                    telportable: reclamation.telportable != null ? reclamation.telportable : '',
                    category: reclamation.category,
                    typeClient: reclamation.typeClient,
                    reclamationSource: reclamation.reclamationSource,
                    priority: reclamation.priority === 'on' ? 1 : 0,
                    objectReclamation: reclamation.objectReclamation != null ? reclamation.objectReclamation : '',
                    adresseReclamation: contrat.address,

                    reclamationType: reclamation.category,

                    type: {
                        id: reclamation.type
                    },
                    familyType: {
                        id: reclamation.famille
                    },
                    branch: {
                        id: 1
                    },

                    observation: reclamation.observation,
                    active: true
                };
                console.log(reclamationObj);
                try {
                    create(reclamationObj);
                    setMessage('Reclamation bien ajoutée');
                    setTypeToast('success');
                    setOpenToast(true);
                    setIsChanged(!isChanged);
                    // Wait for 1 second before navigating to the next page
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    navigate('/parametrageReclamation/1');
                } catch (error) {
                    console.error('Error fetching personnel data:', error);
                }
            }
        } else {
            // Form is invalid, show validation errors
            setMessage('Merci de remplir tout les champs obligatoires (*)');
            setTypeToast('error');
            setOpenToast(true);
            form.reportValidity();
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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'famille') {
            getType(value);
        } else if (name === 'adresseReclamation') {
            // Add this condition to handle the specific field
            setContrat((prevContrat) => ({
                ...prevContrat,
                address: value
            }));
        }
        setReclamation((prevReclamation) => ({
            ...prevReclamation,
            [name]: value
        }));
    };

    const handleTextFieldClick = async () => {
        const { data: DataContrat } = await getContratByNumPolice(contrat.numPolice);
        setContrat(DataContrat);
    };
    const annuler = () => {
        navigate('/parametrageReclamation/1');
    };
    return (
        <>
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleToastClose} />

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <form id="reclamationForm">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Nom / Prénom:
                            </Typography>
                            <TextField
                                id="clientFullName"
                                value={reclamation.clientFullName}
                                name="clientFullName"
                                variant="outlined"
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Tel. Portable:
                            </Typography>
                            <TextField
                                id="telportable"
                                value={reclamation.telportable}
                                name="telportable"
                                variant="outlined"
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Catégorie Réclamation <span style={{ color: 'red' }}> *</span>
                            </Typography>
                            <FormControl fullWidth>
                                <Select id="category" name="category" required value={reclamation.category} onChange={handleInputChange}>
                                    {categoryClient.map((obj) => (
                                        <MenuItem key={obj.id} value={obj.label}>
                                            {obj.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Type du Client <span style={{ color: 'red' }}> *</span>
                            </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="typeClient"
                                    name="typeClient"
                                    required
                                    value={reclamation?.typeClient}
                                    onChange={handleInputChange}
                                >
                                    {typeClient.map((obj) => (
                                        <MenuItem key={obj.id} value={obj.label}>
                                            {obj.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Origine de réclamation <span style={{ color: 'red' }}> *</span>
                            </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="reclamationSource"
                                    name="reclamationSource"
                                    required
                                    value={reclamation?.reclamationSource}
                                    onChange={handleInputChange}
                                >
                                    {reclamationSources.map((obj) => (
                                        <MenuItem key={obj.id} value={obj.label}>
                                            {obj.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Objet de Réclamation <span style={{ color: 'red' }}> *</span>
                            </Typography>
                            <TextField
                                id="objectReclamation"
                                name="objectReclamation"
                                variant="outlined"
                                fullWidth
                                required
                                value={reclamation?.objectReclamation}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Famille <span style={{ color: 'red' }}> *</span>
                            </Typography>
                            <FormControl fullWidth>
                                <Select id="famille" name="famille" required value={reclamation.famille} onChange={handleInputChange}>
                                    {famille.map((obj) => (
                                        <MenuItem key={obj?.id} value={obj?.id}>
                                            {obj?.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Type <span style={{ color: 'red' }}> *</span>
                            </Typography>
                            <FormControl fullWidth>
                                <Select id="type" name="type" onChange={handleInputChange} required value={reclamation.type}>
                                    {type.map((obj) => (
                                        <MenuItem key={obj?.id} value={obj?.id}>
                                            {obj?.libelle}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Adresse de la Réclamation <span style={{ color: 'red' }}> *</span>
                            </Typography>
                            <TextField
                                id="adresseReclamation"
                                name="adresseReclamation"
                                value={contrat.address}
                                variant="outlined"
                                fullWidth
                                required
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Observations :
                            </Typography>
                            <TextField
                                id="observation"
                                value={reclamation.observation}
                                name="observation"
                                variant="outlined"
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Réclamation Urgente
                            </Typography>
                            <FormControl>
                                <Checkbox id="priority" name="priority" color="primary" onChange={handleInputChange} />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={3} sx={{ mt: 5 }} className={classes.gridContainer}>
                            <Button variant="outlined" className={classes.cancelButton} onClick={annuler}>
                                Annuler
                            </Button>
                            <Button type="button" variant="contained" className={classes.saveButton} onClick={handleClick}>
                                Enregistrer
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {/* {contrat && contrat.id} */}
            </Paper>
        </>
    );
}

export default ReclamationInfoAdress;
