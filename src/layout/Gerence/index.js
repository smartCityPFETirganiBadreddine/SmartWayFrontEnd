import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Card, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { IconLayoutDashboard } from '@tabler/icons-react';
import { IconBolt } from '@tabler/icons-react';
import { IconDropletFilled2 } from '@tabler/icons-react';
import { IconFilterOff } from '@tabler/icons-react';
import { IconUsersGroup } from '@tabler/icons-react';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import { useState } from 'react';
import { useContext } from 'react';
import AppContext from 'layout/Context';
import { useMemo } from 'react';

// ===============================|| SHADOW BOX ||=============================== //

const ShadowBox = ({ item, color, icon, onClick, selected }) => {
    const handleClick = () => {
        onClick();
    };

    return (
        <Card
            onClick={handleClick}
            sx={{
                ml: 1,
                boxShadow: selected ? '0px 2px 10px rgba(23, 23, 23, 0.05)' : 'none',
                color: color
            }}
        >
            <Card sx={{ p: 0 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 1.5,
                        bgcolor: selected ? 'primary.light' : 'transparent',
                        color: color
                    }}
                >
                    {icon}
                    <Box sx={{ color: 'inherit' }}>{item}</Box>
                </Box>
            </Card>
        </Card>
    );
};

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    marginBottom: '10px',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const Gerence = ({ isLoading, onItemChange = () => {} }) => {
    const theme = useTheme();

    const [selectedItem, setSelectedItem] = useState('general');

    const handleItemClick = (item) => {
        setSelectedItem(item);
        onItemChange(item);
    };

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={2} lg={2}>
                                        <ShadowBox
                                            item="Général"
                                            icon={<IconLayoutDashboard />}
                                            onClick={() => handleItemClick('general')}
                                            color="#868E96"
                                            selected={selectedItem === 'general'}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2} lg={2}>
                                        <ShadowBox
                                            item="Électricité"
                                            color="#DC3838"
                                            icon={<IconBolt />}
                                            onClick={() => handleItemClick('Electricite')}
                                            selected={selectedItem === 'Electricite'}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2} lg={2}>
                                        <ShadowBox
                                            item="Eau Potable"
                                            color="#33C4FF"
                                            icon={<IconDropletFilled2 />}
                                            onClick={() => handleItemClick('Eau Potable')}
                                            selected={selectedItem === 'Eau Potable'}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2} lg={2}>
                                        <ShadowBox
                                            item="Assainissement"
                                            color="#56B82C"
                                            icon={<IconFilterOff />}
                                            onClick={() => handleItemClick('Assainissement')}
                                            selected={selectedItem === 'Assainissement'}
                                        />
                                    </Grid>
                                    {/*<Grid item xs={12} sm={2} lg={2}>
                                        <ShadowBox
                                            item="Clientèle"
                                            color="#FF5733"
                                            icon={<IconUsersGroup />}
                                            onClick={() => handleItemClick('Assainissement')}
                                            selected={selectedItem === 'Assainissement'}
                                        />
                                    </Grid>*/}
                                </Grid>
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

Gerence.propTypes = {
    isLoading: PropTypes.bool,
    onItemChange: PropTypes.func
};

export default Gerence;
