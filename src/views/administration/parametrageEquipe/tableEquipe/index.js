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
import { getAllMembers, remove, update, create, getAllMembersUp } from 'api/equipe';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@material-ui/core/styles';
import UpdateEquipeModal from '../Modals/update';
import SearchEquipe from '../searsh';
import ToastyNotification from 'utils/toasty';
import { useMemo } from 'react';
import Gerence from 'layout/Gerence';

//get All Team
function getFullName(user, index) {
    return `${index + 1}. ${user.firstName} ${user.lastName}`;
}
//format data
function createData(personnel, idPersonnel, handleEditClick, handleDeleteClick) {
    const { id, specialite, teamName, enabled, nvehicule, chefEquipe, superviseur, members, fullNameEditeur } = personnel;
    const filteredMembers = members.filter((member) => member.roles[0]?.name.includes('ROLE_OKSA_EQP_MEMBER'));
    const branch = personnel.branch.name;
    const memberNames = filteredMembers.map((member, index) => getFullName(member, index)).join('\n'); // use '\n' instead of ',\n'
    return {
        id: id,
        teamName: teamName,
        specialite: specialite,
        branch: branch,
        nvehicule: nvehicule,
        fillNameEditeur: fullNameEditeur,
        superviseur: superviseur?.firstName + ' ' + superviseur?.lastName,
        chefEquipe: chefEquipe?.firstName + ' ' + chefEquipe?.lastName,
        actif: enabled ? 'Oui' : 'Non',
        // set whiteSpace to pre-line
        members: <div style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>{memberNames}</div>,
        action: (
            <div>
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#0A5EE6', marginRight: '10px', borderRadius: '5px' }}
                    onClick={() => handleEditClick(personnel)}
                >
                    <EditIcon sx={{ color: '#FFFFFF' }} />
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#D86767', borderRadius: '5px' }}
                    onClick={() => handleDeleteClick(idPersonnel)}
                >
                    <DeleteForeverIcon sx={{ color: '#FFFFFF' }} />
                </button>
            </div>
        )
    };
}
const columns = [
    { id: 'teamName', label: 'Equipe', minWidth: 170 },
    {
        id: 'chefEquipe',
        label: "chef d'équipe",
        minWidth: 170,
        align: 'left'
    },
    {
        id: 'members',
        label: "Members d'équipe",
        minWidth: 200,
        align: 'left'
    },
    {
        id: 'fillNameEditeur',
        label: "Utilisateur d'edition",
        minWidth: 170,
        align: 'right'
    },
    {
        id: 'branch',
        label: 'Gerence',
        minWidth: 170,
        align: 'left'
    },
    { id: 'specialite', label: "Spécialité d'équipe", minWidth: 170 },
    {
        id: 'nvehicule',
        label: 'N° de véhicule',
        minWidth: 130,
        align: 'left',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'superviseur',
        label: 'superviseur',
        minWidth: 130,
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
function TableEquipe() {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };
    const [rows, setRows] = useState([]);

    const [open, setOpen] = React.useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [searchText, setSearchText] = useState('');
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([10, 25, 50, 100]);
    const [filteredRowsPerPageOptions, setFilteredRowsPerPageOptions] = useState(rowsPerPageOptions);

    const [selectedMemberssave, setSelectedMemberssave] = useState([]);

    //load data
    const {
        setFetchData,
        fetchData,
        dataEquipe,
        superviseurs,
        chefEquipes,
        members,
        selectedPersonnel,
        setSelectedPersonnel,
        selectedchefEquipe,
        setSelectedchefEquipe,
        selectedMembers,
        setSelectedMembers,
        membersToUpdate,
        setMembersToUpdate,
        selectedSuperviseur,
        setSelectedSuperviseur,
        itemName,
        setItemName
    } = useContext(AppContext);

    async function fetchPersonnelData() {
        console.log('fetchPersonnelData', dataEquipe);
        const equipeList = dataEquipe.map((team) => createData(team, team?.id, handleEditClick, handleDeleteClick));
        setRows(equipeList);
        console.log('equipeList****', equipeList);
    }
    useEffect(() => {
        fetchPersonnelData();
    }, [dataEquipe]);

    // Update the equipement state variable when the existing team data is loaded

    // Define the handleInputChange function to update the form data and state variables

    //end update
    async function handleDeleteClick(idPersonnel) {
        try {
            await remove(idPersonnel);
            setMessage('Equipe bien supprimée');
            setTypeToast('success');
            setOpenToast(true);
            setTimeout(() => {
                setFetchData(!fetchData);
            }, 20);
        } catch (error) {
            setMessage("Erreur lors de l'ajout du type");
            setTypeToast('error');
            toast.error('Une erreur est survenue lors de la suppression');
        }
    }
    const classes = useStyles();

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

    const filteredItems = rows.filter((row) =>
        Object.values(row).some((value) => typeof value === 'string' && value?.toLowerCase()?.includes(searchText?.toLowerCase()))
    );

    // Update the handleEditClick function to set the membersToUpdate state variable
    const handleEditClick = async (personnel) => {
        try {
            const { data: dataMembersUp } = await getAllMembersUp(personnel.id);

            setMembersToUpdate(dataMembersUp);

            console.log('membersToUpdate', membersToUpdate);
            console.log('Personnel.id: ' + personnel.id, personnel);

            const itemSaved = personnel.members.filter((user) => {
                return user.roles[0]?.name === 'ROLE_OKSA_EQP_MEMBER' && user.team !== null && user.team.id === personnel.id;
            });
            setSelectedMembers(itemSaved.map((member) => member.id));
            setSelectedPersonnel(personnel);
            setSelectedSuperviseur(personnel.superviseur.id);
            setOpen(true);
        } catch (error) {
            console.error(error);
        }
    };
    const handleBranchChange = (event) => {
        setSelectedPersonnel((prv) => ({
            ...prv,
            branch: { id: parseInt(event.target.value) }
        }));
    };
    // filter by branch

    const filterList = useMemo(() => {
        if (!(itemName === 'general')) {
            return filteredItems?.filter((item) => item?.branch === itemName);
        } else {
            console.log('items', filteredItems);
            return filteredItems;
        }
    }, [filteredItems, rows, itemName]);

    //end filter by branch
    return (
        <>
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleToastClose} />
            {/* Modal update Equipe */}
            <UpdateEquipeModal open={open} setOpen={setOpen} setFetchData={setFetchData} fetchData={fetchData} />

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} ml={2}>
                        <SearchEquipe setSearchText={setSearchText} value={searchText} />
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
export default TableEquipe;
