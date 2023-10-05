//Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//end Toastify
import { getAllequipes, getAllSupervisor, getAllChefDepartements, getAllMembers, remove, create, getAllMembersUp } from 'api/equipe';
import React, { useEffect, useState } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
import { Box } from '@mui/system';
import { makeStyles } from '@material-ui/core/styles';
import TableEquipe from './tableEquipe';
import AppContext from 'layout/Context';
import AddEquipeModal from './Modals/add';
import ToastyNotification from 'utils/toasty';
import Gerence from 'layout/Gerence';
import { useMemo } from 'react';

//style table
const styleModalx = {
    backdropFilter: 'blur(5px)' // Add this line to make the background blurry
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

//end style table
function ParametrageEquipe({ data }) {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };
    const [dataEquipe, setDataEquipe] = useState([]);

    const [fetchData, setFetchData] = useState(false);
    const [superviseurs, setSuperviseurs] = useState([]);
    const [chefDepartements, setChefDepartements] = useState([]);
    const [members, setMembers] = useState([]);

    const handleOpensave = () => setOpensave(true);
    const handleClosesave = () => setOpensave(false);
    const [opensave, setOpensave] = React.useState(false);

    //load data

    async function fetchPersonnelData() {
        try {
            const { data: superviseurData } = await getAllSupervisor();
            setSuperviseurs(superviseurData);

            const { data: chefDepartementData } = await getAllChefDepartements();
            setChefDepartements(chefDepartementData);

            const { data: memberData } = await getAllMembers();
            setMembers(memberData);
            const { data: equipeData } = await getAllequipes();

            setDataEquipe(equipeData);
        } catch (error) {
            console.error('Error fetching personnel data:', error);
        }
    }
    useEffect(() => {
        fetchPersonnelData();
    }, [fetchData]);

    const [selectedPersonnel, setSelectedPersonnel] = useState({});
    const [selectedChefDepartement, setSelectedChefDepartement] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [membersToUpdate, setMembersToUpdate] = useState([]);
    const [selectedSuperviseur, setSelectedSuperviseur] = useState('');
    const [itemName, setItemName] = useState('general');
    const onItemChange = (item) => {
        setItemName(item);
    };
    return (
        <>
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleToastClose} />
            {/* Modal add Equipe */}
            <AppContext.Provider
                value={{
                    setFetchData,
                    fetchData,
                    dataEquipe,
                    superviseurs,
                    chefDepartements,
                    members,
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
                    setItemName
                }}
            >
                <Gerence onItemChange={onItemChange} />
                <AddEquipeModal open={opensave} setOpensave={setOpensave} setFetchData={setFetchData} fetchData={fetchData} />
                <Card>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={10}>
                            <Typography variant="h4" ml={3}>
                                LISTE DES EQUIPE
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button variant="contained" onClick={handleOpensave} fullWidth>
                                <AddCircleOutlineIcon /> Ajouter
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {/*table*/}
                            <TableEquipe />
                        </Grid>
                    </Grid>
                </Card>
            </AppContext.Provider>
        </>
    );
}

export default ParametrageEquipe;
