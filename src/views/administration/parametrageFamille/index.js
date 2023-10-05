import react, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';

import EditIcon from '@mui/icons-material/Edit';
import { createFamille, getAllFamille } from 'api/famille';
//Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//end Toastify
import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@mui/material';

import { Box, width } from '@mui/system';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AppContext from 'layout/Context';
import Lists from './Lists';
import SubType from './SubType';
import { createType, getAllType } from 'api/type';
import Gerence from 'layout/Gerence';
import AddFamilyModal from './Modals/addFamily';
import AddTypeModal from './Modals/addType';
import ToastyNotification from 'utils/toasty';
import { useMemo } from 'react';

//import SubType from 'components/SubType';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '15px',
    p: 4
};
const styleModalx = {
    backdropFilter: 'blur(5px)' // Add this line to make the background blurry
};

function ParametrageFamille() {
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('Type ajouté avec succès');
    const [typetoast, setTypeToast] = useState('success');
    const handleToastClose = () => {
        setOpenToast(false);
    };
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemType, setSelectedItemType] = useState(null);
    const [showDeleteIconIndex, setShowDeleteIconIndex] = useState(-1);
    const [textbutton, setTextbutton] = useState('Activée ');
    const [textbuttonSubType, setTextbuttonSubType] = useState('Activée');
    const [idfamilleType, setIdfamilleType] = useState(-1);
    const [deleted, setDeleted] = useState(false);
    const [items, setItems] = useState([]);

    const [itemsType, setItemsType] = useState([]);

    const [isClicked, setIsClicked] = useState(false);
    const [isClickedType, setIsClickedType] = useState(false);

    const handleListItemClick = (index) => {
        setSelectedItem(index);
        //console.log(items[index].id);
    };
    const handleListItemClickType = (index) => {
        setSelectedItemType(index);
        //console.log(items[index].id);
    };
    const handleEditClick = () => {
        // handle edit click logic
    };

    const handleActionsClick = () => {
        if (selectedItem !== null) {
            if (deleted) {
                load();
                setDeleted(false);
            }
            //alert(items[selectedItem].id);
            if (!isClicked) {
                setIsClicked(true);
                setTextbutton('Désactiver');
            } else {
                setIsClicked(false);
                setTextbutton('Activée');
            }
        }
    };
    const handleActionsClickType = () => {
        // alert(selectedItemType);
        if (selectedItemType) {
            /*  if (deleted) {
                load();
                setDeleted(false);
            }*/
            //alert(items[selectedItem].id);
            if (!isClickedType) {
                setIsClickedType(true);
                setTextbuttonSubType('Désactiver');
            } else {
                setIsClickedType(false);
                setTextbuttonSubType('Activée');
            }
        }
    };
    const [isChange, setIsChange] = useState(false);
    const handleChange = (SelectChangeEvent) => {
        // alert(event.target.value);
    };
    const handleDeleteClick = (index) => {
        setShowDeleteIconIndex(index);
    };
    const load = () => {
        getAllFamille().then((response) => {
            setItems(response.data);
            console.log('FamilleList', response.data);
        });
        getAllType().then((response) => {
            setItemsType(response.data);
            console.log('TypeList', response.data);
        });
    };
    useEffect(() => {
        load();
    }, [isChange]);

    const [open, setOpen] = useState(false);
    const [openF, setOpenF] = useState(false);
    const [idfamilleTypep, setFamilleType] = useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleFOpen = () => setOpenF(true);
    const handleFClose = () => setOpenF(false);
    const [selectedItemTypeState, setSelectedItemTypeState] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [editedItem, setEditedItem] = useState(null);
    const [itemsP, setItemsP] = useState([]);
    const filteredItems = searchQuery ? items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())) : items;
    const [itemName, setItemName] = useState('general');
    const filterList = useMemo(() => {
        if (!(itemName === 'general')) {
            return filteredItems?.filter((item) => item?.branch.name === itemName);
        } else {
            console.log('items', items);
            return items;
        }
    }, [filteredItems, items, itemName]);
    const onItemChange = (item) => {
        setItemName(item);
    };
    console.log('filterList', filterList);
    return (
        <AppContext.Provider
            value={{
                items: filterList,
                setItems,
                itemsType,
                idfamilleType,
                setIdfamilleType,
                deleted,
                setDeleted,
                isClickedType,
                setIsClickedType,
                isChange,
                setIsChange,
                editedItem,
                setEditedItem,
                idfamilleTypep,
                setFamilleType,
                selectedItemTypeState,
                setSelectedItemTypeState,
                itemsP,
                setItemsP
            }}
        >
            <Gerence onItemChange={onItemChange} />
            <ToastyNotification type={typetoast} message={message} isOpen={openToast} handleClose={handleToastClose} />
            {/* Modal add famille */}
            <AddFamilyModal open={openF} setOpen={setOpenF} />
            {/* Modal add type */}
            <AddTypeModal open={open} setOpen={setOpen} />

            <>
                <Card>
                    <Grid container m={2}>
                        <Grid item xs={12} lg={4} ml={1}>
                            <div>
                                <Grid container mt={2}>
                                    <Grid item xs={12} lg={8} mt={1}>
                                        <Typography variant="h6">LISTE DES FAMILLES</Typography>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <Button variant="contained" endIcon={<EditIcon />} onClick={handleActionsClick}>
                                            {textbutton}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} lg={12} mt={2} mr={3}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Lists
                                                Rows={false}
                                                selectedItem={selectedItem}
                                                items={filterList}
                                                isClicked={isClicked}
                                                onListItemClick={handleListItemClick}
                                                ç={handleDeleteClick}
                                                showDeleteIconIndex={showDeleteIconIndex}
                                                setItems={setItems} // pass the setItems function as a prop
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} ml={1}>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            endIcon={<AddCircleOutlineIcon style={{ color: '#DC7633' }} />}
                                            onClick={handleFOpen}
                                        >
                                            Ajouter une Famille
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={7.5} ml={2} mt={1}>
                            <Grid container>
                                <Grid item xs={12} lg={6} mt={2} mb={2}>
                                    <Typography variant="h6">LISTE DES TYPES</Typography>
                                </Grid>
                                <Grid item xs={12} lg={3}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        endIcon={<AddCircleOutlineIcon style={{ color: '#DC7633' }} />}
                                        onClick={handleOpen}
                                    >
                                        Ajouter un type
                                    </Button>
                                </Grid>
                                <Grid item xs={12} lg={3}>
                                    <Button variant="contained" endIcon={<EditIcon />} onClick={handleActionsClickType}>
                                        {textbuttonSubType}
                                    </Button>
                                </Grid>
                                <Grid item xs={12} lg={12} mr={3}>
                                    <SubType
                                        items={itemsType}
                                        isClickedType={isClickedType}
                                        selectedItemType={selectedItemType}
                                        onListItemClick={handleListItemClickType}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </>
        </AppContext.Provider>
    );
}

export default ParametrageFamille;
