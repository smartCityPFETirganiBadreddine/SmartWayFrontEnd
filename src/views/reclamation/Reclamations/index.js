import React, { useEffect, useState, useContext } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import ToastyNotification from 'utils/toasty';
import AppContext from 'layout/Context';
import ClinetInfo from './infoClient';
import ReclamationInfo from './infoReclamation';
import { styleModal, styleModalx, useStyles } from 'utils/Modals/styleModals';
import ReclamationInfoAdress from './reclamationInfoAdress';

function ContainerReclamation() {
    const [clientInfo, setClientInfo] = useState({});
    const [reclamationInfo, setReclamationInfo] = useState({});
    const [valueClient, setValueClient] = useState(0);
    const { contrat, setContrat, isStep2, setIsStep2, setValue, value, branchid } = useContext(AppContext);
    const classes = useStyles();

    const [tabOneIndex, setTabOneIndex] = useState(0);
    const [tabTowIndex, setTabTowIndex] = useState(0);

    const handleChangeTabOne = (event, index) => {
        setTabOneIndex(index);
        setIsStep2(index === 0 ? 'client' : 'address');
    };

    const handleChangeTabTow = (event, index) => {
        setTabTowIndex(index);
        if (index === 0) {
            setIsStep2('client');
        } else if (index === 1) {
            setIsStep2('reclamation');
        }
    };

    useEffect(() => {
        fetchContratsData();
    }, []);

    const fetchContratsData = async () => {
        setIsStep2('client');

        try {
            const { data: DataContrats } = await getAllContrats();
            setContrats(DataContrats);
        } catch (error) {
            console.error('Error fetching personnel data:', error);
        }
    };

    let content;
    if (isStep2 === 'client') {
        content = <ClinetInfo />;
    } else if (isStep2 === 'address') {
        content = <ReclamationInfoAdress />;
    } else if (isStep2 === 'reclamation') {
        content = <ReclamationInfo />;
    }

    return (
        <Box m={2}>
            {/* <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={() => setOpenToast(false)} /> */}
            <Box display="flex" justifyContent="space-between" marginBottom="20px">
                <Tabs
                    value={tabOneIndex}
                    onChange={handleChangeTabOne}
                    aria-label="Add Reclamation Tabs"
                    style={{ borderRadius: '10px' }}
                    sx={{ backgroundColor: 'white', p: 0 }}
                >
                    <Tab index={0} label="Client" aria-controls="home" sx={{ fontWeight: tabOneIndex === 0 ? 'bold' : 'normal' }} />

                    <Tab
                        index={1}
                        label="Adresse"
                        aria-controls="profile"
                        onClick={() => setIsStep2('address')}
                        sx={{ fontWeight: tabOneIndex === 1 ? 'bold' : 'normal' }}
                    />
                </Tabs>

                <Tabs
                    value={tabTowIndex}
                    onChange={handleChangeTabTow}
                    aria-label="Add Reclamation Tabs"
                    style={{ borderRadius: '10px' }}
                    sx={{ backgroundColor: 'white', p: 0 }}
                >
                    {isStep2 !== 'address' && (
                        <Tab
                            index={0}
                            label="Information Client"
                            aria-controls="home"
                            sx={{ fontWeight: tabTowIndex === 0 ? 'bold' : 'normal' }}
                        />
                    )}

                    <Tab
                        index={isStep2 === 'address' ? 0 : 1}
                        label="Information Réclamation"
                        aria-controls="profile"
                        onClick={() => setIsStep2('reclamation')}
                        sx={{ fontWeight: isStep2 === 'address' || tabTowIndex === 1 ? 'bold' : 'normal' }}
                    />
                </Tabs>
            </Box>
            {content}
        </Box>
    );
}

export default ContainerReclamation;
