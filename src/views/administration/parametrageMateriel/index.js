//Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//end Toastify
import { getAll, remove, create, getAllMembersUp } from 'api/materiel';
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

import AppContext from 'layout/Context';
import AddEquipeModal from './Modals/add';
import TableMateriel from './tableMateriel';
import Gerence from 'layout/Gerence';
import ToastyNotification from 'utils/toasty';

//end style table
function ParametrageMateriel({ data }) {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };
    const [dataEquipe, setDataEquipe] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [fetchData, setFetchData] = useState(false);
    const [superviseurs, setSuperviseurs] = useState([]);
    const [chefDepartements, setChefDepartements] = useState([]);
    const [members, setMembers] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);

    //load data

    async function fetchPersonnelData() {
        try {
            const { data: equipeData } = await getAll();

            setDataEquipe(equipeData);
        } catch (error) {
            console.error('Error fetching personnel data:', error);
        }
    }
    useEffect(() => {
        fetchPersonnelData();
    }, [isChange]);
    const [selected, setSelected] = useState({});
    const [selectedChefDepartement, setSelectedChefDepartement] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [membersToUpdate, setMembersToUpdate] = useState([]);
    const [selectedSuperviseur, setSelectedSuperviseur] = useState('');
    // Define the handleInputChange function to update the form data and state variables
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
                    selected,
                    setSelected,
                    selectedChefDepartement,
                    setSelectedChefDepartement,
                    selectedMembers,
                    setSelectedMembers,
                    membersToUpdate,
                    setMembersToUpdate,
                    selectedSuperviseur,
                    setSelectedSuperviseur,
                    isChange,
                    setIsChange,
                    itemName,
                    setItemName
                }}
            >
                <Gerence onItemChange={onItemChange} />
                <AddEquipeModal open={open} setOpen={setOpen} setFetchData={setFetchData} fetchData={fetchData} />
                <Card>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={10}>
                            <Typography variant="h4" ml={3}>
                                PARAMÉTRAGE DU MATÉRIEL
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button variant="contained" onClick={handleOpen} fullWidth>
                                <AddCircleOutlineIcon /> Ajouter
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {/*table*/}
                            <TableMateriel />
                        </Grid>
                    </Grid>
                </Card>
            </AppContext.Provider>
        </>
    );
}

export default ParametrageMateriel;
