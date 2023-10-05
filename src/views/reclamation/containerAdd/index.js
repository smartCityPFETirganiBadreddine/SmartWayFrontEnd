import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import TableContrats from '../contrats';
import AddReclamation from '../addReclamation';
import AppContext from 'layout/Context';
import { useContext } from 'react';
import { useParams } from 'react-router';
import { getBranchById } from 'utils/Util';
function ContainerAdd() {
    const [value, setValue] = useState(0);
    const [contrat, setContrat] = useState({});
    const [reclamation, setReclamation] = useState([]);
    const [isChanged, setIsChanged] = useState(false);
    const [isStep2, setIsStep2] = useState('client');
    const { branchid } = useParams();
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setContrat({});
    };
    const titre = getBranchById(branchid);
    return (
        <AppContext.Provider
            value={{
                value,
                setValue,
                contrat,
                setContrat,
                reclamation,
                setReclamation,
                isChanged,
                setIsChanged,
                isStep2,
                setIsStep2,
                branchid
            }}
        >
            <Box display="flex" justifyContent="center" marginBottom="20px">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Add Reclamation Tabs"
                    style={{ borderRadius: '10px' }}
                    sx={{ backgroundColor: 'white', p: 0 }}
                >
                    <Tab
                        label="Consulter Contrats"
                        id="home-tab"
                        aria-controls="home"
                        sx={{ fontWeight: value === 0 ? 'bold' : 'normal' }}
                    />
                    <Tab
                        label={'Créer Réclamation (' + titre + ')'}
                        id="profile-tab"
                        aria-controls="profile"
                        sx={{ fontWeight: value === 1 ? 'bold' : 'normal' }}
                    />
                </Tabs>
            </Box>
            {value === 0 ? <TableContrats /> : <AddReclamation />}
        </AppContext.Provider>
    );
}

export default ContainerAdd;
