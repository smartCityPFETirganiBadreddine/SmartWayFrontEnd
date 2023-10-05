import React, { useContext } from 'react';
import Paper from '@mui/material/Paper';
import ContainerReclamation from '../Reclamations';
import AppContext from 'layout/Context';

function Reclamation() {
    const { contrat, setContrat } = useContext(AppContext);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <ContainerReclamation />
        </Paper>
    );
}

export default Reclamation;
