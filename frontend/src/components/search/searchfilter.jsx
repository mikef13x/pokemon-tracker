import { Dialog, Box, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, DialogActions, Button } from '@mui/material';
import { useState } from 'react';
export default function FilterModal({ open, onClose, selectedSets, handleSetsChange, handleFilterClose, selectedCardTypes, handleCardTypesChange }) {
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 24px', marginTop: '20px' }}>
          <DialogTitle>Filter Options</DialogTitle>
        </Box>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <FormControl variant="standard" sx={{ marginBottom: '20px', width: '20vw' }}>
            <InputLabel id="sets-select-label">Sets</InputLabel>
            <Select labelId="sets-select-label" id="sets-select" multiple value={selectedSets} onChange={handleSetsChange} renderValue={(selected) => selected.join(', ')}>
              <MenuItem value="Base">Base Set</MenuItem>
              <MenuItem value="Jungle">Jungle</MenuItem>
              <MenuItem value="Fossil">Fossil</MenuItem>
              {/* Add more sets as needed */}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ marginBottom: '20px', width: '20vw' }}>
            <InputLabel id="type-select-label">Card Type</InputLabel>
            <Select labelId="type-select-label" id="type-select" multiple value={selectedCardTypes} onChange={handleCardTypesChange} renderValue={(selected) => selected.join(', ')}>
              <MenuItem value="Pokémon">Pokémon</MenuItem>
              <MenuItem value="Trainer">Trainer</MenuItem>
              <MenuItem value="Energy">Energy</MenuItem>
              {/* Add more sets as needed */}
            </Select>
          </FormControl>
          {/* <FormControl  variant="standard" sx={{ marginBottom: '20px', width:'20vw' }}>
      <InputLabel id="years-select-label">Years</InputLabel>
      <Select
        labelId="years-select-label"
        id="years-select"
        multiple
        value={selectedYears}
        onChange={handleYearsChange}
        renderValue={(selected) => selected.join(', ')}
      >
        <MenuItem value="2020">2020</MenuItem>
        <MenuItem value="2021">2021</MenuItem>
        <MenuItem value="2022">2022</MenuItem>
        {/* Add more years as needed */}
          {/* </Select>
    </FormControl>
    <FormControl  variant="standard" sx={{ marginBottom: '20px', width:'20vw' }}>
      <InputLabel id="prices-select-label">Prices</InputLabel>
      <Select
        labelId="prices-select-label"
        id="prices-select"
        multiple
        value={selectedPrices}
        onChange={handlePricesChange}
        renderValue={(selected) => selected.join(', ')}
      >
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
        {/* Add more price ranges as needed */}
          {/* </Select>
    </FormControl> */}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button sx={{ textAlign: 'center' }} onClick={handleFilterClose} color="primary">
            Apply
          </Button>
          <Button sx={{ textAlign: 'center' }} onClick={handleFilterClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
