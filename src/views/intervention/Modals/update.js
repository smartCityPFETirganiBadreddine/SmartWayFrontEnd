import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
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
    Grid,
    InputAdornment,
    IconButton
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

import { useContext } from 'react';
import AppContext from 'layout/Context';
import { StyleModal, styleModal, styleModalx, useStyles } from 'utils/Modals/styleModals';
import ToastyNotification from 'utils/toasty';
import { categoryClient, reclamationSources, typeClient } from 'utils/reclamations';
import { getAllByFamille } from 'api/type';
import { useEffect } from 'react';
import { getAllByBranch } from 'api/famille';
import { getContratByNumPolice, update } from 'api/reclamation';
import { useParams } from 'react-router';

const UpdateReclamationModal = ({ open, setOpen, isClient, setIsUpdated, isUpdated, fetchPersonnelData }) => {
    const {
        selectedRow,
        setSelectedRow,
        contrat,
        setContrat,
        famille,
        setFamille,
        client,
        setClient,
        type,
        setType,
        isChanged,
        setIsChanged
    } = useContext(AppContext);

    const { branchid } = useParams();

    const classes = useStyles();
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('');
    const [typetoast, setTypeToast] = useState('success'); //

    const handleToastClose = () => {
        setOpenToast(false);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let reclamationObj = {};
    const handleClick = async () => {
        if (isValideContrat) {
            if (contrat !== null && selectedRow !== null) {
                console.log('testerrrrrrrrr-> contract :', contrat);
                console.log('testerrrrrrrrr-> reclamation :', selectedRow);

                if (isClient) {
                    reclamationObj = {
                        clientFullName: selectedRow.clientFullName,
                        telportable: selectedRow.telportable,
                        category: selectedRow.category,
                        typeClient: selectedRow.typeClient,
                        priority: selectedRow.priority,
                        objectReclamation: selectedRow.objectReclamation,
                        reclamationSource: selectedRow.reclamationSource,
                        adresseReclamation: selectedRow.adresseReclamation,

                        reclamationType: selectedRow.category,
                        clientInfo: {
                            id: contrat.id
                        },
                        type: {
                            id: selectedRow.type.id
                        },
                        familyType: {
                            id: selectedRow?.familyType?.id
                        },
                        branch: {
                            id: branchid
                        },

                        observation: selectedRow.observation,
                        active: true
                    };
                } else {
                    reclamationObj = {
                        clientFullName: selectedRow.clientFullName,
                        telportable: selectedRow.telportable,
                        category: selectedRow.category,
                        typeClient: selectedRow.typeClient,

                        priority: selectedRow.priority,
                        objectReclamation: selectedRow.objectReclamation,
                        reclamationSource: selectedRow.reclamationSource,
                        adresseReclamation: selectedRow.adresseReclamation,

                        reclamationType: selectedRow.category,

                        type: {
                            id: selectedRow.type.id
                        },
                        familyType: {
                            id: selectedRow?.familyType?.id
                        },
                        branch: {
                            id: branchid
                        },

                        observation: selectedRow.observation,
                        active: true
                    };
                }

                console.log('testerrrrrrrrr-> reclamationObj :', reclamationObj);
                try {
                    await update(selectedRow?.id, reclamationObj);
                    setMessage('Reclamation bien Modifier');
                    setTypeToast('success');
                    setOpenToast(true);
                    setOpen(false);
                    setIsChanged((isChanged) => !isChanged);
                } catch (error) {
                    console.error('Error fetching personnel data:', error);
                }
            }
        } else {
            setMessage(
                "Le contrat sélectionné n'existe pas. Veuillez choisir un autre contrat valide ou consulter la liste des contrats disponibles."
            );
            setIsValideContrat(false);
            setTypeToast('error');
            setOpenToast(true);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const { data: familleByBranch } = await getAllByBranch('Electricite');
            console.log('familleByBranch**', familleByBranch);
            setFamille(familleByBranch);
        };

        fetchData();
    }, []);

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
        const { name, value, checked } = e.target;

        if (name === 'priority') {
            const priorityValue = checked ? 1 : 0;
            setSelectedRow((prev) => ({
                ...prev,
                priority: priorityValue
            }));
        } else if (name === 'phone') {
            setSelectedRow((prev) => ({
                ...prev,
                phone: value
            }));
        } else if (name === 'category') {
            setSelectedRow((prev) => ({
                ...prev,
                category: value
            }));
        } else if (name === 'familyType') {
            getType(value);
        } else if (name === 'type') {
            setSelectedRow((prev) => ({
                ...prev,
                type: value ? { id: value } : null
            }));
        } else if (name === 'telportable') {
            setSelectedRow((prev) => ({
                ...prev,
                telportable: value
            }));
        } else if (name === 'reclamationSource') {
            setSelectedRow((prev) => ({
                ...prev,
                reclamationSource: value
            }));
        } else if (name === 'origineReclamation') {
            setSelectedRow((prev) => ({
                ...prev,
                origineReclamation: value
            }));
        } else if (name === 'objectReclamation') {
            setSelectedRow((prev) => ({
                ...prev,
                objectReclamation: value
            }));
        } else if (name === 'clientFullName') {
            setSelectedRow((prev) => ({
                ...prev,
                clientFullName: value
            }));
        } else if (name === 'adresseReclamation') {
            setSelectedRow((prev) => ({
                ...prev,
                adresseReclamation: value
            }));
        } else if (name === 'observation') {
            setSelectedRow((prev) => ({
                ...prev,
                observation: value
            }));
        } else if (name === 'clientFullName') {
            setSelectedRow((prev) => ({
                ...prev,
                clientFullName: value
            }));
        }
        if (name === 'typeClient') {
            setSelectedRow((prev) => ({
                ...prev,
                typeClient: value
            }));
        }
    };

    const handleFamilleChange = async (e) => {
        const { value } = e.target;

        setSelectedRow((prev) => ({
            ...prev,
            familyType: value ? { id: value } : null
        }));

        if (value) {
            const { data: types } = await getAllByFamille(value);
            setType(types);
        }
    };
    const [isValideContrat, setIsValideContrat] = useState(true);
    const handleTextFieldClick = async () => {
        try {
            const { data: DataContrat } = await getContratByNumPolice(contrat?.numPolice);
            setIsValideContrat(true);
            setContrat(DataContrat);
        } catch (error) {
            setMessage(
                "Le contrat sélectionné n'existe pas. Veuillez choisir un autre contrat valide ou consulter la liste des contrats disponibles."
            );
            setIsValideContrat(false);
            setContrat({});
            setTypeToast('error');
            setOpenToast(true);
            // Clear all TextField values
            setContrat((prevContrat) => ({
                ...prevContrat,
                numPolice: '',
                clientName: '',
                phone: '',
                refCompteur: '',
                fax: '',
                address: '',
                email: '',
                codeLocalite: '',
                numSecteur: '',
                numBloc: '',
                numOrdre: ''
            }));
        }
    };

    const handleInputContratChange = (e) => {
        const { name, value } = e.target;
        setContrat((prevContrat) => ({
            ...prevContrat,
            [name]: value
        }));
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
                <StyleModal height={'75%'}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        MODIFIER - Réclamation N°Réc: {selectedRow?.id}
                    </Typography>

                    <form>
                        <Grid container spacing={2}>
                            {/* {console.log('testerrrrrrrrr-> contract :', contrat)} */}
                            {isClient && (
                                <>
                                    <Grid item xs={12} sm={3}>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Numéro de contrat
                                        </Typography>
                                        <TextField
                                            id="numPolice"
                                            value={contrat?.numPolice}
                                            name="numPolice"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            onChange={handleInputContratChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleTextFieldClick}>
                                                            <SearchIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={9}>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Tournée
                                        </Typography>
                                        <Grid item container alignItems="center" spacing={1}>
                                            <Grid item>
                                                <TextField
                                                    disabled
                                                    id="codeLocalite"
                                                    value={contrat?.codeLocalite}
                                                    name="codeLocalite"
                                                    variant="outlined"
                                                    required
                                                    size="small"
                                                    style={{ width: 'auto' }}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography>/</Typography>
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    disabled
                                                    id="numSecteur"
                                                    value={contrat?.numSecteur}
                                                    name="numSecteur"
                                                    variant="outlined"
                                                    required
                                                    size="small"
                                                    style={{ width: 'auto' }}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography>/</Typography>
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    disabled
                                                    id="numBloc"
                                                    value={contrat?.numBloc}
                                                    name="numBloc"
                                                    variant="outlined"
                                                    required
                                                    size="small"
                                                    style={{ width: 'auto' }}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography>/</Typography>
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    disabled
                                                    id="numOrdre"
                                                    value={contrat?.numOrdre}
                                                    name="numOrdre"
                                                    variant="outlined"
                                                    required
                                                    size="small"
                                                    style={{ width: 'auto' }}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Nom / Prénom
                                        </Typography>

                                        <TextField
                                            disabled
                                            id="clientName"
                                            value={contrat?.clientName}
                                            name="clientName"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </>
                            )}
                            {!isClient && (
                                <>
                                    <Grid item xs={12} sm={3}>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Nom / Prénom:
                                        </Typography>

                                        <TextField
                                            id="clientFullName"
                                            value={selectedRow?.clientFullName}
                                            name="clientFullName"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12} sm={3}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Tel. Portable
                                </Typography>
                                <TextField
                                    id="telportable"
                                    value={selectedRow?.telportable}
                                    name="telportable"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Catégorie Réclamation *
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        id="category"
                                        name="category"
                                        required
                                        value={selectedRow?.category}
                                        onChange={handleInputChange}
                                    >
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
                                    Type du Client *
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        id="typeClient"
                                        name="typeClient"
                                        required
                                        value={selectedRow?.typeClient}
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
                                    Origine de réclamation *
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        id="reclamationSource"
                                        name="reclamationSource"
                                        required
                                        value={selectedRow?.reclamationSource}
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
                                    Objet de Réclamation
                                </Typography>
                                <TextField
                                    id="objectReclamation"
                                    name="objectReclamation"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={selectedRow?.objectReclamation}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Famille *
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        id="familyType"
                                        name="familyType"
                                        required
                                        disabled
                                        onChange={handleInputChange}
                                        onClick={handleFamilleChange}
                                        value={selectedRow?.familyType?.id}
                                    >
                                        {famille.map((obj) => (
                                            <MenuItem key={obj.id} value={obj.id}>
                                                {obj.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Type
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        disabled
                                        id="type"
                                        name="type"
                                        onChange={handleInputChange}
                                        required
                                        value={selectedRow?.type?.id}
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
                                    Adresse de la Réclamation *
                                </Typography>
                                <TextField
                                    id="adresseReclamation"
                                    name="adresseReclamation"
                                    value={selectedRow?.adresseReclamation}
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
                                    value={selectedRow?.observation}
                                    name="observation"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    inputProps={{ maxLength: 240 }}
                                    required
                                    onChange={handleInputChange}
                                    helperText={`${selectedRow?.observation?.length || 0} caractères sur un maximum de 240`}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Réclamation Urgente
                                </Typography>
                                <FormControl>
                                    <Checkbox
                                        id="priority"
                                        name="priority"
                                        color="primary"
                                        checked={selectedRow?.priority === 1}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={8} sx={{ mt: 5 }} className={classes.gridContainer}>
                                <Button variant="outlined" className={classes.cancelButton} onClick={handleClose}>
                                    Annuler
                                </Button>
                                <Button type="button" variant="contained" className={classes.saveButton} onClick={handleClick}>
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

export default UpdateReclamationModal;
