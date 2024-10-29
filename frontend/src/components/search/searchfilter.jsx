import { useState, useEffect } from 'react';
import { Dialog, Box, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, DialogActions, Button } from '@mui/material';
import { artists, cardTypes, pokemonTypes, subtypes, rarities, setNames } from '../../assets/set-data/filterArrays';

export default function FilterModal({ open, onClose, selectedSets, handleSetsChange, handleFilterClose, selectedCardTypes, handleCardTypesChange, handleClearFilters, handleApplyClick, handleArtistChange, handleSubtypeChange, handleRarityChange, handlePokemonTypeChange, selectedPokemonType, selectedSubtype, selectedRarity, selectedArtist }) {
  const [tempSelectedSets, setTempSelectedSets] = useState(selectedSets);
  const [tempSelectedCardTypes, setTempSelectedCardTypes] = useState(selectedCardTypes);
  const [tempSelectedPokemonType, setTempSelectedPokemonType] = useState(selectedPokemonType);
  const [tempSelectedArtist, setTempSelectedArtist] = useState(selectedArtist);
  const [tempSelectedSubtype, setTempSelectedSubtype] = useState(selectedSubtype);
  const [tempSelectedRarity, setTempSelectedRarity] = useState(selectedRarity);

  useEffect(() => {
    if (open) {
      setTempSelectedSets(selectedSets);
      setTempSelectedCardTypes(selectedCardTypes);
      setTempSelectedPokemonType(selectedPokemonType);
      setTempSelectedArtist(selectedArtist);
      setTempSelectedRarity(selectedRarity);
      setTempSelectedSubtype(selectedSubtype);
    }
  }, [open, selectedSets, selectedCardTypes, selectedPokemonType, selectedArtist, selectedRarity, selectedSubtype]);

  const handleApply = () => {
    handleSetsChange(tempSelectedSets);
    handleCardTypesChange(tempSelectedCardTypes);
    handlePokemonTypeChange(tempSelectedPokemonType);
    handleArtistChange(tempSelectedArtist);
    handleRarityChange(tempSelectedRarity);
    handleSubtypeChange(tempSelectedSubtype);
    handleApplyClick();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 24px', marginTop: '20px' }}>
        <DialogTitle>Filter Options</DialogTitle>
      </Box>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <FormControl variant="standard" sx={{ marginBottom: '20px', width: '20vw' }}>
          <InputLabel id="sets-select-label">Sets</InputLabel>
          <Select
            labelId="sets-select-label"
            id="sets-select"
            multiple
            value={tempSelectedSets}
            onChange={(e) => {
              console.log('Select onChange called with:', e.target.value);
              setTempSelectedSets(e.target.value);
            }}
            renderValue={(selected) => selected.join(', ')}
          >
             {setNames.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
            {/* {Object.entries(setIds).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))} */}
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ marginBottom: '20px', width: '20vw' }}>
          <InputLabel id="type-select-label">Card Type</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            multiple
            value={tempSelectedCardTypes}
            onChange={(e) => setTempSelectedCardTypes(e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {cardTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ marginBottom: '20px', width: '20vw' }}>
          <InputLabel id="subtype-select-label">Subtype</InputLabel>
          <Select
            labelId="subtype-select-label"
            id="subtype-select"
            multiple
            value={tempSelectedSubtype}
            onChange={(e) => setTempSelectedSubtype(e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {subtypes.map((subtype) => (
              <MenuItem key={subtype} value={subtype}>
                {subtype}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ marginBottom: '20px', width: '20vw' }}>
          <InputLabel id="pokemon-type-select-label">Pokémon Type</InputLabel>
          <Select
            labelId="pokemon-type-select-label"
            id="pokemon-type-select"
            multiple
            value={tempSelectedPokemonType}
            onChange={(e) => setTempSelectedPokemonType(e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {pokemonTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ marginBottom: '20px', width: '20vw' }}>
          <InputLabel id="rarity-select-label">Rarity</InputLabel>
          <Select
            labelId="rarity-select-label"
            id="rarity-select"
            multiple
            value={tempSelectedRarity}
            onChange={(e) => setTempSelectedRarity(e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {rarities.map((rarity) => (
              <MenuItem key={rarity} value={rarity}>
                {rarity}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ marginBottom: '20px', width: '20vw' }}>
          <InputLabel id="artist-select-label">Artist</InputLabel>
          <Select
            labelId="artist-select-label"
            id="artist-select"
            multiple
            value={tempSelectedArtist}
            onChange={(e) => setTempSelectedArtist(e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {artists.map((artist) => (
              <MenuItem key={artist} value={artist}>
                {artist}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button sx={{ textAlign: 'center' }} onClick={handleApply} color="primary">
          Apply
        </Button>
        <Button sx={{ textAlign: 'center' }} onClick={handleClearFilters} color="primary">
          Clear Filters
        </Button>
        <Button sx={{ textAlign: 'center' }} onClick={handleFilterClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}