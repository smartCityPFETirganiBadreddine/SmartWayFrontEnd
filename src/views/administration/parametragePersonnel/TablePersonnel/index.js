import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getAllPersonnel, remove, update } from 'api/personnel';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
    InputAdornment,
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
import { makeStyles } from '@material-ui/core/styles';
import { renameRoles, roles } from 'utils/renameRoles';
import { branches } from 'utils/branches';
import AppContext from 'layout/Context';
import { useContext } from 'react';
import UpdatePersonnelModal from '../Modals/update';
import ToastyNotification from 'utils/toasty';
import { useMemo } from 'react';
const columns = [
    { id: 'login', label: 'Login', minWidth: 170 },
    { id: 'name', label: 'Nom', minWidth: 100 },
    { id: 'roles', label: 'Role', minWidth: 170 },
    {
        id: 'prenom',
        label: 'Prénom',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'phone',
        label: 'Telephone',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'actif',
        label: 'Actif',
        minWidth: 170,
        align: 'right'
    },
    {
        id: 'branch',
        label: 'Branche',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'action',
        label: 'Actions',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2)
    }
];

function createData(personnel, idPersonnel, handleEditClick, handleDeleteClick) {
    const { id, userName, cin, email, password, matricule, firstName, lastName, phone, enabled, branch, roles } = personnel;

    return {
        id: id,
        cin: cin,
        matricule: matricule,
        email: email,
        password: password,
        login: userName,
        name: lastName,
        prenom: firstName,
        phone,
        roles: renameRoles(roles[0].name),
        actif: enabled ? 'Oui' : 'Non',
        branch: branch?.name || '',
        action: (
            <div>
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#0A5EE6', marginRight: '10px', borderRadius: '5px' }}
                >
                    <EditIcon sx={{ color: '#FFFFFF' }} onClick={() => handleEditClick(personnel)} />
                </button>
                <button type="button" className="btn btn-primary" style={{ backgroundColor: '#D86767', borderRadius: '5px' }}>
                    <DeleteForeverIcon sx={{ color: '#FFFFFF' }} onClick={() => handleDeleteClick(idPersonnel)} />
                </button>
            </div>
        )
    };
}

const useStyles = makeStyles((theme) => ({
    radioGroup: {
        display: 'flex',
        flexDirection: 'row'
    }
}));

//isChange, setIsChange

function TablePersonnel({}) {
    const { isChange, setIsChange, dataPersonnel, selectedPersonnel, setSelectedPersonnel, itemName } = useContext(AppContext);
    const handleEditClick = (Personnel) => {
        setSelectedPersonnel(Personnel);
        // Open the modal for editing personnel
        setOpen(true);
    };
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };
    const [fetchData, setFetchData] = useState(false);
    //load data
    const [rows, setRows] = useState([]);

    //load data
    async function fetchPersonnelData() {
        const personnelList = dataPersonnel.map((personnel) => createData(personnel, personnel?.id, handleEditClick, handleDeleteClick));
        setRows(personnelList);
    }

    useEffect(() => {
        fetchPersonnelData();
    }, [dataPersonnel, isChange]);

    async function handleDeleteClick(idPersonnel) {
        try {
            await remove(idPersonnel);

            setMessage('Personnel bien supprimé');
            setTypeToast('success');
            setOpenToast(true);

            const { data: personnelData } = await getAllPersonnel();

            const personnelList = personnelData.map((personnel) =>
                createData(personnel, personnel?.id, handleEditClick, handleDeleteClick)
            );
            setRows(personnelList);
            setIsChange(!isChange);
        } catch (error) {
            console.error('Error deleting personnel:', error);
            alert("Une erreur est survenue lors de la suppression de l'utilisateur.");
        }
    }
    //update
    async function handleSubmitType(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const roleName = formData.get('roles') ? formData.get('roles') : 'ROLE_ADMIN';

        const user = {
            userName: formData.get('userName'),
            email: formData.get('email'),
            enabled: formData.get('enabled') === 'on',
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phone: formData.get('phone'),
            branch: { id: parseInt(formData.get('branch')) },
            matricule: formData.get('matricule'),
            chargeDeTravaux: formData.get('chargeDeTravaux') === 'true',
            cin: formData.get('cin'),
            password: formData.get('password'),
            roles: [{ name: roleName }]
        };
        await update(formData.get('id'), user);
        setIsChange(!isChange);
        toast.success('Personnel bien modifié');
        handleClose();

        setFetchData(!fetchData);
    }
    //end update
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);
    const [personnel, setPersonnel] = React.useState([]);
    const [selectedProfile, setSelectedProfile] = React.useState('option1');

    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    //update Personnel

    //end update Personnel
    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        const filteredOptions = rowsPerPageOptions.filter((option) => option <= newRowsPerPage);
        setFilteredRowsPerPageOptions(filteredOptions);
    };
    const [searchText, setSearchText] = useState('');
    const filteredItems = rows.filter((row) =>
        Object.values(row).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase()))
    );
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([10, 25, 50, 100]);
    const [filteredRowsPerPageOptions, setFilteredRowsPerPageOptions] = useState(rowsPerPageOptions);
    // filter by branch

    const filterList = useMemo(() => {
        if (!(itemName === 'general')) {
            console.log('filteredItems', filteredItems);
            return filteredItems?.filter((item) => item?.branch === itemName);
        } else {
            console.log('items', rows);
            return filteredItems;
        }
    }, [filteredItems, rows, itemName]);

    //end filter by branch
    return (
        <>
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleToastClose} />
            <UpdatePersonnelModal open={open} setOpen={setOpen} isChange={isChange} setIsChange={setIsChange} />
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} ml={2}>
                        <TextField
                            label="Rechercher un personnel..."
                            variant="outlined"
                            margin="normal"
                            value={searchText}
                            fullWidth={true}
                            onChange={(e) => setSearchText(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <i className="fas fa-search"></i>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filterList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={rowsPerPageOptions}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default TablePersonnel;
