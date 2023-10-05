import React, { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import ToastyNotification from 'utils/toasty';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
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
import { useParams, useNavigate } from 'react-router-dom';
import AppContext from 'layout/Context';
import { getContratByNumPolice } from 'api/reclamation';
import { useStyles } from 'utils/Modals/styleModals';

function ClientInfo() {
    const { branchid } = useParams();
    const navigate = useNavigate();
    const { contrat, setContrat, isStep2, setIsStep2 } = useContext(AppContext);
    const classes = useStyles();
    const [message, setMessage] = useState(
        "Le contrat sélectionné n'existe pas. Veuillez choisir un autre contrat valide ou consulter la liste des contrats disponibles."
    );
    const [typetoast, setTypeToast] = useState('success');
    const [openToast, setOpenToast] = useState(false);
    const handleToastClose = () => {
        setOpenToast(false);
    };
    const [isValideContrat, setIsValideContrat] = useState(true);
    const handleTextFieldClick = async () => {
        try {
            const { data: DataContrat } = await getContratByNumPolice(contrat?.numPolice);
            setIsValideContrat(true);
            setContrat(DataContrat);
        } catch (error) {
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContrat((prevContrat) => ({
            ...prevContrat,
            [name]: value
        }));
    };

    const handleClick = () => {
        if (isValideContrat) {
            if (contrat !== null) {
                const updatedContrat = {
                    ...contrat,
                    phone: contrat?.phone,
                    email: contrat?.email
                };
                setContrat(updatedContrat);
                console.log(updatedContrat);
                setIsStep2('reclamation');
            }
        } else {
            setIsValideContrat(false);
            setTypeToast('error');
            setOpenToast(true);
        }
    };

    const annuler = () => {
        navigate('/parametrageReclamation/' + branchid);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <ToastyNotification
                type={typetoast}
                message={message}
                autoHideDuration={4000}
                isOpen={openToast}
                handleClose={handleToastClose}
            />
            <form>
                <Grid container spacing={2}>
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
                            onChange={handleInputChange}
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
                    <Grid item xs={12} sm={3}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Tel. Portable
                        </Typography>
                        <TextField
                            id="phone"
                            value={contrat?.phone}
                            name="phone"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Numéro Compteur
                        </Typography>
                        <TextField
                            disabled
                            id="refCompteur"
                            value={contrat?.refCompteur}
                            name="refCompteur"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Tel. Fixe
                        </Typography>
                        <TextField
                            id="fax"
                            value={contrat?.fax}
                            name="fax"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Adresse
                        </Typography>
                        <TextField
                            disabled
                            id="address"
                            value={contrat?.address}
                            name="address"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Email
                        </Typography>
                        <TextField
                            id="email"
                            value={contrat?.email}
                            name="email"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={handleInputChange}
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
                    <Grid item xs={12} sm={12} sx={{ mt: 5 }} className={classes.gridContainer}>
                        <Button variant="outlined" className={classes.cancelButton} onClick={annuler}>
                            Annuler
                        </Button>
                        <Button type="button" variant="contained" className={classes.saveButton} onClick={handleClick}>
                            Suivant
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default ClientInfo;
