import React, { useEffect, useState, useContext } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import SearchEquipe from '../searsh';
import ToastyNotification from 'utils/toasty';
import { getAllContrats } from 'api/reclamation';
import { useNavigate } from 'react-router-dom';
import AppContext from 'layout/Context';

const useStyles = makeStyles((theme) => ({
    radioGroup: {
        display: 'flex',
        flexDirection: 'row'
    }
}));

function TableContrats() {
    const { value, setValue, contrat, setContrat, branchid } = useContext(AppContext);
    const navigate = useNavigate();
    const classes = useStyles();
    const [contrats, setContrats] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');

    useEffect(() => {
        setOpenToast(true);
        setMessage("Merci de choisir l'un des contrats ou de créer un nouveau reclamation");
        const fetchContratsData = async () => {
            try {
                const { data: DataContrats } = await getAllContrats();
                setContrats(DataContrats);
            } catch (error) {
                console.error('Error fetching personnel data:', error);
            }
        };

        fetchContratsData();
    }, []);

    const handleDeleteClick = async (idPersonnel) => {
        try {
            await remove(idPersonnel);
            setMessage('Equipe bien supprimée');
            setTypeToast('success');
            setOpenToast(true);
        } catch (error) {
            setMessage("Erreur lors de l'ajout du type");
            setTypeToast('error');
            toast.error('Une erreur est survenue lors de la suppression');
        }
    };

    const handleRowClick = (row) => {
        //navigate(`/reclamation/add/${id}`);
        setValue(1);
        setContrat(row);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    const filteredItems = contrats.filter((row) =>
        Object.values(row).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase()))
    );

    const columns = [
        { id: 'numPolice', label: 'N°contrat', minWidth: 100, align: 'left' },
        { id: 'codeLocalite', label: 'Gérence', minWidth: 100, align: 'left' },
        { id: 'clientName', label: 'Nom Abonné', minWidth: 100, align: 'left' },
        { id: 'clientCin', label: 'CIN', minWidth: 100, align: 'left' },
        { id: 'address', label: 'Adresse', minWidth: 100, align: 'left' },
        { id: 'codeLocalite', label: 'Localité', minWidth: 100, align: 'left' },
        { id: 'sector', label: 'Sécteur', minWidth: 100 },
        { id: 'numBloc', label: 'Bloc', minWidth: 100, align: 'left' },
        { id: 'numOrdre', label: 'Order', minWidth: 100, align: 'left' },
        { id: 'refCompteur', label: 'Compteur', minWidth: 100, align: 'left' }
    ];

    return (
        <>
            <ToastyNotification
                type={typetoast}
                message={message}
                isOpen={openToast}
                autoHideDuration={5000}
                handleClose={() => setOpenToast(false)}
            />

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
                                    {filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.code}
                                                onClick={() => handleRowClick(row)}
                                            >
                                                {columns.map((column) => {
                                                    const value = column.id === 'sector' ? row.sector.name : row[column.id];

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
                            component="div"
                            count={filteredItems.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPageOptions={[10, 25, 50, 100]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default TableContrats;
