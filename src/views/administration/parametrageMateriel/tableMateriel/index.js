import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useContext } from 'react';
import AppContext from 'layout/Context';
//Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//end Toastify
import { getAll, remove, update, create, getAllMembersUp } from 'api/materiel';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@material-ui/core/styles';
import UpdateEquipeModal from '../Modals/update';
import SearchMateriel from '../searsh';
import UpdateMaterielModal from '../Modals/update';
import ToastyNotification from 'utils/toasty';
import { useMemo } from 'react';

//get All Team
function getFullName(user, index) {
    return `${index + 1}. ${user.firstName} ${user.lastName}`;
}
//format data
function createData(obj, idObj, handleEditClick, handleDeleteClick) {
    const { id, name, unit, branch, active } = obj;

    return {
        id: id,
        unit: unit,
        name: name,
        branch: branch.name,
        actif: active ? 'Oui' : 'Non',
        // set whiteSpace to pre-line
        action: (
            <div>
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#0A5EE6', marginRight: '10px', borderRadius: '5px' }}
                    onClick={() => handleEditClick(obj)}
                >
                    <EditIcon sx={{ color: '#FFFFFF' }} />
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#D86767', borderRadius: '5px' }}
                    onClick={() => handleDeleteClick(idObj)}
                >
                    <DeleteForeverIcon sx={{ color: '#FFFFFF' }} />
                </button>
            </div>
        )
    };
} //id, name, unit, branch, active
const columns = [
    { id: 'name', label: ' Nom du matériel', minWidth: 170 },
    {
        id: 'unit',
        label: 'Unité de mesure',
        minWidth: 170,
        align: 'left'
    },
    {
        id: 'branch',
        label: 'Branche',
        minWidth: 170,
        align: 'left'
    },
    {
        id: 'actif',
        label: 'Actif',
        minWidth: 30,
        align: 'left'
    },

    {
        id: 'action',
        label: 'Actions',
        minWidth: 130,
        align: 'center',
        format: (value) => value.toFixed(2)
    }
];
//style table

const useStyles = makeStyles((theme) => ({
    radioGroup: {
        display: 'flex',
        flexDirection: 'row'
    }
}));
//end style table
function TableMateriel() {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };
    const [rows, setRows] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [openUp, setOpenUp] = React.useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [searchText, setSearchText] = useState('');
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([10, 25, 50, 100]);
    const [filteredRowsPerPageOptions, setFilteredRowsPerPageOptions] = useState(rowsPerPageOptions);

    //load data
    const { setFetchData, fetchData, dataEquipe, selected, setSelected, isChange, setIsChange, itemName, setItemName } =
        useContext(AppContext);

    async function fetchPersonnelData() {
        const equipeList = dataEquipe.map((team) => createData(team, team?.id, handleEditClick, handleDeleteClick));
        setRows(equipeList);
    }
    useEffect(() => {
        fetchPersonnelData();
    }, [dataEquipe, isChange]);

    // Update the equipement state variable when the existing team data is loaded

    // Define the handleInputChange function to update the form data and state variables

    //end update
    async function handleDeleteClick(idObj) {
        try {
            await remove(idObj);

            setMessage('Materiel ajouté avec succès');
            setTypeToast('success');
            setOpenToast(true);
            setTimeout(() => {
                setIsChange(!isChange);
            }, 20);
        } catch (error) {
            setMessage("Erreur lors de l'ajout du materiel");
            setTypeToast('error');
            console.error(error);
            toast.error('Une erreur est survenue lors de la suppression');
        }
    }
    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        const filteredOptions = rowsPerPageOptions.filter((option) => option <= newRowsPerPage);
        setFilteredRowsPerPageOptions(filteredOptions);
    };

    const filteredItems = rows.filter((row) =>
        Object.values(row).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase()))
    );

    // Update the fetchMembersData function to set the members state variable

    // Update the handleEditClick function to set the membersToUpdate state variable
    const handleEditClick = async (personnel) => {
        try {
            setSelected(personnel);
            setOpenUp(true);
        } catch (error) {
            console.error(error);
        }
    };
    // filter by branch

    const filterList = useMemo(() => {
        if (!(itemName === 'general')) {
            console.log('items', filteredItems);
            return filteredItems?.filter((item) => item?.branch === itemName);
        } else {
            return filteredItems;
        }
    }, [filteredItems, rows, itemName]);

    //end filter by branch
    return (
        <>
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleToastClose} />
            {/* Modal update Equipe */}
            <UpdateMaterielModal openUp={openUp} setOpenUp={setOpenUp} />

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} ml={2}>
                        <SearchMateriel setSearchText={setSearchText} value={searchText} />
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
export default TableMateriel;
