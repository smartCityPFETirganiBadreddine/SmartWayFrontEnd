import * as React from 'react';
import Card from '@mui/material/Card';
import { create, getAllPersonnel } from 'api/personnel';
//Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//end Toastify
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { Box } from '@mui/system';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AppContext from 'layout/Context';

import { makeStyles } from '@material-ui/core/styles';

import { roles } from 'utils/renameRoles';
import { branches } from 'utils/branches';
import { useEffect } from 'react';
import { useState } from 'react';
import TablePersonnel from './TablePersonnel';
import AddPersonnelModal from './Modals/add';
import ToastyNotification from 'utils/toasty';
import Gerence from 'layout/Gerence';

function ParametragePersonnel() {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);
    const [dataPersonnel, setDataPersonnel] = React.useState([]);

    const [isChange, setIsChange] = React.useState(false);

    //load data
    async function fetchData() {
        try {
            const { data: personnelData } = await getAllPersonnel();

            setDataPersonnel(personnelData);
        } catch (error) {
            console.error('Error fetching personnel data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [isChange]);
    //update Personnel
    const [selectedPersonnel, setSelectedPersonnel] = useState({});
    const [itemName, setItemName] = useState('general');
    const onItemChange = (item) => {
        setItemName(item);
    };
    return (
        <>
            <Gerence onItemChange={onItemChange} />
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleToastClose} />

            <AppContext.Provider value={{ dataPersonnel, selectedPersonnel, setSelectedPersonnel, isChange, setIsChange, itemName }}>
                {/* Modal add Personnel */}
                <AddPersonnelModal open={open} setOpen={setOpen} />
                <Card>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={10}>
                            <Typography variant="h4" ml={3}>
                                LISTE DES PERSONEEL
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button variant="contained" onClick={handleOpen} fullWidth>
                                <AddCircleOutlineIcon /> Ajouter
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TablePersonnel />
                        </Grid>
                    </Grid>
                </Card>
            </AppContext.Provider>
        </>
    );
}

export default ParametragePersonnel;
