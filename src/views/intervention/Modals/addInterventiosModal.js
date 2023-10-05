import React, { useState, useContext } from 'react';
import {
    Modal,
    Box,
    Typography,
    List,
    ListItem,
    Grid,
    FormControl,
    Select,
    MenuItem,
    Button,
    AccordionDetails,
    Divider
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router';

import { StyleModal, styleModalx } from 'utils/Modals/styleModals';
import ToastyNotification from 'utils/toasty';
import AppContext from 'layout/Context';
import { getBranchById, statusReclamation2 } from 'utils/Util';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ItemInterventionAdd from './itemInterventionAdd';
import { getAllequipes, getByBranchId } from 'api/equipe';
import { getAllByBranch } from 'api/famille';
import { getAllByReclamationId, getInterventionsByReclamationId } from 'api/intervention';
import { useEffect } from 'react';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0
    },
    '&:before': {
        display: 'none'
    }
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)'
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1)
    }
}));
/*  const obj = Object{
    
     "comment": "string",
        "planningDateTime": "2023-06-16T14:55:46.909Z",
        "pickupDateTime": "2023-06-16T14:55:46.909Z",
        "longitude": "string",
        "latitude": "string",
        "interventionDate": "2023-06-16T14:55:46.909Z",
        "reclamation": {
            "id":67
          },
        "type": {
          "id": 1
        },
        "familyType": {
          "id": 1
        },
        "branch": {
          "id": 1
        },
        "active": true,
        "adresse": "string"
      
}*/

const useStyles = makeStyles({
    listItem: {
        listStyleType: 'none',
        '&::before': {
            content: "'-'",
            marginRight: '8px'
        }
    },
    boldText: {
        fontWeight: 'bold'
    }
});

const AddInterventionsModal = ({ open, setOpen }) => {
    const { selectedRow, setIdBranch, famille, setFamille, isInterventionChanged, setIsInterventionChanged } = useContext(AppContext);
    const { branchid } = useParams();
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('');
    const [typetoast, setTypeToast] = useState('success');
    const classes = useStyles();
    const dateTime = new Date(selectedRow?.reclamationDate);
    const date = dateTime.toLocaleDateString('en-GB');
    const time = dateTime.toLocaleTimeString();
    const [interventionByReclamationId, setInterventionByReclamationId] = useState();
    const handleToastClose = () => {
        setOpenToast(false);
    };

    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const [interventions, setInterventions] = useState([]);

    const [Equipe, setEquipe] = useState([]);
    useEffect(() => {
        const fetchEquipeData = async () => {
            try {
                const response = await getAllequipes();
                const equipeData = response.data;
                setEquipe(equipeData);
                console.log('Equipe Data:', equipeData);
            } catch (error) {
                console.error("Erreur lors de la récupération des données de l'équipe :", error);
            }
        };

        fetchEquipeData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const intters = await getInterventionsByReclamationId(selectedRow?.id);
            setInterventionByReclamationId(intters);
            console.log('type of interventionByReclamationId', intters);
        };

        fetchData();
    }, [selectedRow, isInterventionChanged]);

    async function additem() {
        try {
            setOpenItemAdd(true);
            setIdBranch(branchid);

            const branch = await getBranchById(branchid);

            const { data: familleByBranch } = await getAllByBranch(branch);

            setFamille(familleByBranch);
            const { data: interventions } = await getAllByReclamationId(selectedRowId?.id);
            setInterventions(interventions);
            const { data: equipe } = await getByBranchId(branchid);
            setEquipe(equipe);
        } catch (error) {
            // Handle any errors that occurred during the API call
            console.error(error);
        }
    }

    const handleClose = () => setOpen(false);
    const [openItemAdd, setOpenItemAdd] = useState(false);

    return (
        <>
            <ItemInterventionAdd open={openItemAdd} setOpen={setOpenItemAdd} />
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
                        Voici les informations de la réclamation sélectionnée N° : {selectedRow?.id}
                        {selectedRow?.clientInfo ? ' (Le client : ' + selectedRow.clientInfo.clientName + ')' : ' (Sans Contrats) '}
                    </Typography>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <List>
                                    <ListItem className={classes.listItem}>
                                        <Typography>
                                            <span className={classes.boldText}>Numéro de réclamation:</span>{' '}
                                            {selectedRow?.id ? selectedRow?.id : '--'}
                                        </Typography>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Typography>
                                            <span className={classes.boldText}>Nom complet du client:</span>{' '}
                                            {selectedRow?.clientFullName ? selectedRow?.clientFullName : '--'}
                                        </Typography>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Typography>
                                            <span className={classes.boldText}>Adresse du client:</span>{' '}
                                            {selectedRow?.adresseReclamation ? selectedRow?.adresseReclamation : '--'}
                                        </Typography>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <List>
                                    <ListItem className={classes.listItem}>
                                        <Typography>
                                            <span className={classes.boldText}>Date de réclamation:</span> {date ? date : '--'}
                                        </Typography>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Typography>
                                            <span className={classes.boldText}>Heure de réclamation:</span> {time ? time : '--'}
                                        </Typography>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Typography>
                                            <span className={classes.boldText}>Origine de la réclamation:</span>{' '}
                                            {selectedRow?.reclamationSource ? selectedRow?.reclamationSource : '--'}
                                        </Typography>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <List>
                                    <ListItem className={classes.listItem}>
                                        <Typography>
                                            <span className={classes.boldText}>Famille:</span>{' '}
                                            {selectedRow?.familyType?.name ? selectedRow?.familyType?.name : '--'}
                                        </Typography>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Typography>
                                            <span className={classes.boldText}>Type:</span>{' '}
                                            {selectedRow?.type?.libelle ? selectedRow?.type?.libelle : '--'}
                                        </Typography>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Typography>
                                            <span className={classes.boldText}>Priorité:</span>{' '}
                                            {selectedRow?.priority ? 'Urgente' : 'Non Urgente'}
                                        </Typography>
                                    </ListItem>
                                </List>
                            </Grid>
                            {selectedRow?.observation && (
                                <Grid item xs={12} sm={8}>
                                    <ListItem className={classes.listItem}>
                                        <Typography>
                                            <span className={classes.boldText}>Observation:</span> <br />
                                            {selectedRow.observation.match(/.{1,50}/g).map((line, index) => (
                                                <React.Fragment key={index}>
                                                    {line}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                        </Typography>
                                    </ListItem>
                                </Grid>
                            )}
                            {console.log('================================', selectedRow)}
                            <Grid item xs={12} sm={3}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Statut Réclamation (Créée par défaut)
                                </Typography>
                                <FormControl fullWidth>
                                    <Select id="status" name="status" required value="en cours">
                                        {statusReclamation2.map((obj) => (
                                            <MenuItem key={obj.id} value={obj.name}>
                                                {obj.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box mt={2}>
                        <Divider />
                    </Box>

                    <Box mt={2}>{/* <Divider /> */}</Box>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            {/* <Grid item xs={12} sm={4} md={4}>
                                <Button variant="contained" onClick={handleClose} fullWidth>
                                    Annuler
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <Button variant="contained" color="primary" fullWidth>
                                    Enregistrer
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <Button variant="contained" color="error" fullWidth>
                                    Fermer
                                </Button>
                            </Grid> */}
                        </Grid>
                    </Box>
                </StyleModal>
            </Modal>
        </>
    );
};

export default AddInterventionsModal;
