import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Button,
    Card,
    Checkbox,
    Chip,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AppContext from 'layout/Context';
import ToastyNotification from 'utils/toasty';
import TableReclamation from './tableReclamation';
import Status from 'layout/Status';
import { useParams } from 'react-router-dom';
const styleModalx = {
    backdropFilter: 'blur(5px)'
};

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '95%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '15px',
    p: 4,
    overflowY: 'scroll'
};

const useStyles = makeStyles((theme) => ({
    radioGroup: {
        display: 'flex',
        flexDirection: 'row'
    }
}));

function ParametrageReclamationElectricite({ data }) {
    const navigate = useNavigate();
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };
    const [dataRelamation, setDataReclamation] = useState([]);
    const [fetchData, setFetchData] = useState(false);
    const [selectedPersonnel, setSelectedPersonnel] = useState({});
    const [selectedChefDepartement, setSelectedChefDepartement] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [membersToUpdate, setMembersToUpdate] = useState([]);
    const [selectedSuperviseur, setSelectedSuperviseur] = useState('');
    const [itemName, setItemName] = useState('tous');
    const [contrat, setContrat] = useState([]);
    const [isChanged, setIsChanged] = useState(false);
    const [value, setValue] = useState(0);

    const handleOpenSave = (branchid) => {
        navigate('/reclamation/' + branchid);
    };

    const onItemChange = (item) => {
        setItemName(item);
    };
    const [isClient, setIsClient] = useState(false);
    const [selectedRow, setSelectedRow] = useState();
    const [famille, setFamille] = useState([]);
    const [client, setClient] = useState([]);
    const [type, setType] = useState([]);
    const { branchid } = useParams();
    const [idBranch, setIdBranch] = useState(branchid);
    const [Equipe, setEquipe] = useState([]);
    const [isInterventionChanged, setIsInterventionChanged] = useState();
    return (
        <>
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleToastClose} />

            <AppContext.Provider
                value={{
                    isInterventionChanged,
                    setIsInterventionChanged,
                    setFetchData,
                    fetchData,
                    dataRelamation,
                    isChanged,
                    setIsChanged,
                    selectedPersonnel,
                    setSelectedPersonnel,
                    selectedChefDepartement,
                    setSelectedChefDepartement,
                    selectedMembers,
                    setSelectedMembers,
                    membersToUpdate,
                    setMembersToUpdate,
                    selectedSuperviseur,
                    setSelectedSuperviseur,
                    itemName,
                    setItemName,
                    contrat,
                    setContrat,
                    dataRelamation,
                    setDataReclamation,
                    setValue,
                    value,
                    isClient,
                    setIsClient,
                    selectedRow,
                    setSelectedRow,
                    famille,
                    setFamille,
                    client,
                    setClient,
                    type,
                    setType,
                    branchid,
                    idBranch,
                    setIdBranch,
                    Equipe,
                    setEquipe,
                    famille,
                    setFamille
                }}
            >
                <Status onItemChange={onItemChange} />

                <Card>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={10}>
                            <Typography variant="h4" ml={3}>
                                LISTE DES RECLAMATIONS (
                                {branchid == 1 ? 'Electricité' : branchid == 2 ? 'Eau Potable' : branchid == 3 ? 'Assainissement' : null})
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button variant="contained" onClick={() => handleOpenSave(branchid)} fullWidth>
                                <AddCircleOutlineIcon /> Ajouter
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TableReclamation />
                        </Grid>
                    </Grid>
                </Card>
            </AppContext.Provider>
        </>
    );
}

export default ParametrageReclamationElectricite;
