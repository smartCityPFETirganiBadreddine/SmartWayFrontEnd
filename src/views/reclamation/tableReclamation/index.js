import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCardIcon from '@mui/icons-material/AddCard';
import AppContext from 'layout/Context';
import SearchEquipe from '../searsh';
import ToastyNotification from 'utils/toasty';
import ElectricRickshawIcon from '@mui/icons-material/ElectricRickshaw';
import { getAllReclmation, getContratByNumPolice, remove } from 'api/reclamation';
import { getAllByFamille } from 'api/type';
import UpdateReclamationModal from '../Modals/update';
import IconButton from '@mui/material/IconButton';
import AddInterventiosModal from '../Modals/addInterventiosModal';
import AddInterventionsModal from '../Modals/addInterventiosModal';
import { getInterventionsByReclamationId } from 'api/intervention';
const getFullName = (user, index) => `${index + 1}. ${user.firstName} ${user.lastName}`;

const createData = (reclamation, idReclamation, handleEditClick, handleInterventionClick, handleDeleteClick) => {
    const { id, num_Contrat, adresseReclamation, priority, clientInfo, telportable, status, branch, branchid } = reclamation;
    console.log();
    const dateTime = new Date(status?.createAt);
    const date = dateTime.toLocaleDateString('en-GB');
    const time = dateTime.toLocaleTimeString();

    return {
        id: id,
        num_Contrat: clientInfo?.id ?? '-',
        adresseReclamation: adresseReclamation ?? '-',
        telPortable: telportable ?? '-',
        priority: priority ? 'Urgente' : 'Not Urgente',
        createAt: date ?? '-',
        heure: time ?? '-',
        branch: branch?.name ?? '-',
        statut: status?.statu ?? '-',
        action: (
            <div style={{ display: 'flex' }}>
                <IconButton
                    className="btn-primary"
                    style={{ backgroundColor: '#0A5EE6', marginRight: '5px', borderRadius: '5px', padding: '8px' }}
                    onClick={() => handleEditClick(reclamation)}
                    title="Modifier réclamation"
                >
                    <EditIcon sx={{ color: '#FFFFFF', fontSize: '1.2rem' }} />
                </IconButton>
                <IconButton
                    className="btn-primary"
                    style={{ backgroundColor: '#14B547', marginRight: '5px', borderRadius: '5px', padding: '8px' }}
                    onClick={() => handleInterventionClick(reclamation)}
                    title="Ajouter plusieurs interventions"
                >
                    <ElectricRickshawIcon sx={{ color: '#FFFFFF', fontSize: '1.2rem' }} />
                </IconButton>
                <IconButton
                    className="btn-primary"
                    style={{ backgroundColor: '#D86767', borderRadius: '5px', padding: '8px' }}
                    onClick={() => handleDeleteClick(id)}
                    title="Supprimer réclamation"
                >
                    <DeleteForeverIcon sx={{ color: '#FFFFFF', fontSize: '1.2rem' }} />
                </IconButton>
            </div>
        )
    };
};

const columns = [
    { id: 'id', label: 'N°Réc', minWidth: 70 },
    { id: 'num_Contrat', label: 'N°contrat', minWidth: 70, align: 'left' },
    { id: 'adresseReclamation', label: 'Adresse', minWidth: 170, align: 'left' },
    { id: 'telPortable', label: 'TelPortable', minWidth: 80, align: 'left' },
    { id: 'createAt', label: 'Date', minWidth: 90, align: 'left' },
    { id: 'heure', label: 'Heure', minWidth: 90, align: 'left' },
    { id: 'priority', label: 'Priorité', minWidth: 70, align: 'left' },
    { id: 'branch', label: 'Branche', minWidth: 80 },
    { id: 'statut', label: 'Statut', minWidth: 80, align: 'left', format: (value) => value.toLocaleString('en-US') },
    { id: 'action', label: 'Actions', minWidth: 80, align: 'center', format: (value) => value.toFixed(2) }
];

const useStyles = makeStyles((theme) => ({
    radioGroup: {
        display: 'flex',
        flexDirection: 'row'
    }
}));

const TableReclamation = () => {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([10, 25, 50, 100]);
    const [filteredRowsPerPageOptions, setFilteredRowsPerPageOptions] = useState(rowsPerPageOptions);
    const [selectedMemberssave, setSelectedMemberssave] = useState([]);
    const navigate = useNavigate();
    const classes = useStyles();

    const {
        itemName,
        isChanged,
        setIsChanged,
        setDataReclamation,
        selectedRow,
        setSelectedRow,
        client,
        setClient,
        contrat,
        setContrat,
        type,
        setType,
        branchid
    } = useContext(AppContext);
    const [isUpdated, setIsUpdated] = useState(false);
    const fetchPersonnelData = async () => {
        try {
            const { data: reclamationData } = await getAllReclmation(branchid);

            if (Array.isArray(reclamationData)) {
                setDataReclamation(reclamationData);
                const equipeList = reclamationData.map((reclamation) =>
                    createData(reclamation, reclamation?.id, handleEditClick, handleInterventionClick, handleDeleteClick)
                );
                setRows(equipeList);
            } else {
                setRows([]);
                console.error('Invalid reclamation data:', reclamationData);
            }
        } catch (error) {
            console.error('Error fetching personnel data:', error);
        }
    };

    useEffect(() => {
        console.log({ isChanged });

        //if (branchid) {
        fetchPersonnelData();
        //}
    }, [isChanged, branchid]);

    const [isClient, setIsClient] = useState(false);
    const handleDeleteClick = async (idPersonnel) => {
        try {
            await remove(idPersonnel);
            setMessage('Réclamation bien supprimée');
            setTypeToast('success');
            setOpenToast(true);

            //setRows((prevRows) => prevRows.filter((row) => row.id !== idPersonnel));
            setIsChanged((isChanged) => !isChanged);
        } catch (error) {
            setMessage("Erreur lors de l'ajout du type");
            setTypeToast('error');
            toast.error('Une erreur est survenue lors de la suppression');
        }
    };

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

    const filteredItems = useMemo(
        () =>
            rows.filter((row) =>
                Object.values(row).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase()))
            ),
        [rows, searchText, isUpdated]
    );

    const filterList = useMemo(() => {
        if (itemName !== 'tous') {
            return filteredItems.filter((item) => item.statut === itemName);
        } else {
            return filteredItems;
        }
    }, [filteredItems, itemName, isChanged, isUpdated]);

    const [open, setOpen] = useState(false);
    const [openIntervention, setOpenIntervention] = useState(false);
    const [fetchData, setFetchData] = useState(false);

    const handleEditClick = async (reclamation) => {
        setOpen(true);
        setSelectedRow(reclamation);

        getType(reclamation.familyType.id);
        if (reclamation.clientInfo === null) {
            setIsClient(false);
        } else {
            setIsClient(true);
            const { data: DataContrat } = await getContratByNumPolice(reclamation.clientInfo.numPolice);
            setContrat(DataContrat);
        }
    };
    const handleInterventionClick = async (reclamation) => {
        setSelectedRow(reclamation);

        setOpenIntervention(true);
    };

    const getType = async (id) => {
        try {
            const { data: DataContrat } = await getAllByFamille(id);
            setType(DataContrat);
        } catch (error) {
            console.error('Error fetching personnel data:', error);
        }
    };

    const handleCloseToast = () => {
        setOpenToast(false);
    };

    return (
        <>
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleCloseToast} />
            <UpdateReclamationModal
                open={open}
                setOpen={setOpen}
                isClient={isClient}
                selectedRow={selectedRow}
                setIsUpdated={setIsUpdated}
                isUpdated={isUpdated}
                fetchPersonnelData={fetchPersonnelData}
            />
            <AddInterventionsModal
                open={openIntervention}
                setOpen={setOpenIntervention}
                isClient={isClient}
                setIsUpdated={setIsUpdated}
                isUpdated={isUpdated}
                fetchPersonnelData={fetchPersonnelData}
            />
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} ml={2}>
                        <SearchEquipe setSearchText={setSearchText} value={searchText} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TableContainer key={branchid} sx={{ maxHeight: 440 }}>
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
                                    {filterList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
                                    ))}
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
};

export default TableReclamation;
