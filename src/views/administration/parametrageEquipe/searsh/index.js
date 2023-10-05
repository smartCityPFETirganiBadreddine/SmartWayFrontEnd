import React, { useState } from 'react';

import { InputAdornment, TextField } from '@mui/material';

const SearchEquipe = ({ searchText, setSearchText }) => {
    return (
        <TextField
            required
            label="Rechercher une Equipe ..."
            variant="outlined"
            margin="normal"
            value={searchText}
            fullWidth={true}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <i className="fas fa-search"></i>
                    </InputAdornment>
                )
            }}
        />
    );
};

export default SearchEquipe;
