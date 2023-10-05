import React from 'react';
import {
    Modal,
    Box,
    Typography,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormGroup,
    Checkbox,
    Button
} from '@material-ui/core';

const styleModalx = {
    backdropFilter: 'blur(5px)' // Add this line to make the background blurry
};
const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '95%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: '15px',
    p: 4,

    overflowY: 'scroll'
};

const PersonnelModal = ({
    open,
    handleClose,
    handleSubmitType,
    selectedPersonnel,
    setSelectedPersonnel,
    selectedProfile,
    handleProfileChange,
    roles,
    handleBranchChange,
    branches,
    classes,
    isAddMode // Flag to determine if it's in add mode
}) => {
    // const styleModalx = {}; // Define your modal x styles here
    // const styleModal = {}; // Define your modal styles here

    const modalTitle = isAddMode ? 'AJOUTER PERSONNEL :' : 'MODIFIER PERSONNEL :';
    const submitButtonText = isAddMode ? 'Ajouter' : 'Enregistrer';

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmitType(isAddMode); // Pass the mode (add/update) to the submit handler
    };

    return (
        <Modal
            sx={styleModalx}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    {modalTitle}
                </Typography>

                <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Nom *
                            </Typography>
                            {!isAddMode && ( // Hide the ID input field in update mode
                                <input
                                    type="hidden"
                                    value={selectedPersonnel?.id}
                                    name="id"
                                    onChange={(e) =>
                                        setSelectedPersonnel({
                                            ...selectedPersonnel,
                                            id: e.target.value
                                        })
                                    }
                                />
                            )}
                            <TextField
                                id="firstName"
                                name="firstName"
                                variant="outlined"
                                fullWidth
                                value={selectedPersonnel?.firstName}
                                onChange={(e) =>
                                    setSelectedPersonnel({
                                        ...selectedPersonnel,
                                        firstName: e.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                CIN *
                            </Typography>
                            <TextField
                                id="cin"
                                name="cin"
                                variant="outlined"
                                fullWidth
                                value={selectedPersonnel?.cin}
                                onChange={(e) =>
                                    setSelectedPersonnel({
                                        ...selectedPersonnel,
                                        cin: e.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Prénom *:
                            </Typography>
                            <TextField
                                id="lastName"
                                name="lastName"
                                variant="outlined"
                                fullWidth
                                value={selectedPersonnel?.lastName}
                                onChange={(e) =>
                                    setSelectedPersonnel({
                                        ...selectedPersonnel,
                                        lastName: e.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Matricule *:
                            </Typography>
                            <TextField
                                id="matricule"
                                name="matricule"
                                variant="outlined"
                                fullWidth
                                value={selectedPersonnel?.matricule}
                                onChange={(e) =>
                                    setSelectedPersonnel({
                                        ...selectedPersonnel,
                                        matricule: e.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Nom d'utilisateur :
                            </Typography>
                            <TextField
                                id="userName"
                                name="userName"
                                variant="outlined"
                                fullWidth
                                value={selectedPersonnel?.userName}
                                onChange={(e) =>
                                    setSelectedPersonnel({
                                        ...selectedPersonnel,
                                        userName: e.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Tél *:
                            </Typography>
                            <TextField
                                id="phone"
                                name="phone"
                                variant="outlined"
                                fullWidth
                                value={selectedPersonnel?.phone}
                                onChange={(e) =>
                                    setSelectedPersonnel({
                                        ...selectedPersonnel,
                                        phone: e.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Email *:
                            </Typography>
                            <TextField
                                id="email"
                                name="email"
                                variant="outlined"
                                fullWidth
                                value={selectedPersonnel?.email}
                                onChange={(e) =>
                                    setSelectedPersonnel({
                                        ...selectedPersonnel,
                                        email: e.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ mt: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Selectionner un Profile</InputLabel>
                                <Select id="roles" name="roles" value={selectedProfile} onChange={handleProfileChange}>
                                    {roles.map((role) => (
                                        <MenuItem key={role.value} value={role.value}>
                                            {role.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Mot de passe * :
                            </Typography>
                            <TextField
                                id="password"
                                name="password"
                                variant="outlined"
                                fullWidth
                                onChange={(e) =>
                                    setSelectedPersonnel({
                                        ...selectedPersonnel,
                                        password: e.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Branche * :
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="branche"
                                    name="branch"
                                    value={selectedPersonnel?.branch?.id}
                                    onChange={handleBranchChange}
                                    className={classes.radioGroup}
                                >
                                    {branches.map((branch) => (
                                        <FormControlLabel
                                            key={branch.id}
                                            value={branch.id.toString()}
                                            control={<Radio />}
                                            label={branch.label}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Confirmation du mot de passe :
                            </Typography>
                            <TextField
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                variant="outlined"
                                fullWidth
                                value={selectedPersonnel?.passwordConfirmation}
                                onChange={(e) =>
                                    setSelectedPersonnel({
                                        ...selectedPersonnel,
                                        passwordConfirmation: e.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Actif * :
                            </Typography>

                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedPersonnel?.enabled}
                                            onChange={(e) =>
                                                setSelectedPersonnel({
                                                    ...selectedPersonnel,
                                                    enabled: e.target.checked
                                                })
                                            }
                                            id="enabled"
                                            name="enabled"
                                            color="primary"
                                        />
                                    }
                                    label="Actif"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button variant="outlined" onClick={handleClose} sx={{ mr: 2 }}>
                            Annuler
                        </Button>
                        <Button type="submit" variant="contained">
                            {submitButtonText}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default PersonnelModal;
