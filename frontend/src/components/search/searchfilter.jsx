import { Dialog, Box, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, DialogActions, Button } from '@mui/material';
import setIds from '../../assets/set-data/setIds.json'; 
import {artists} from '../../assets/set-data/artists'

export default function FilterModal({ open, onClose, selectedSets, handleSetsChange, handleFilterClose, handleFilterApply, selectedCardTypes, handleCardTypesChange, handleClearFilters, handleArtistChange, handleSubtypeChange, handlePokemonTypeChange, selectedPokemonType, selectedSubtype, selectedArtist }) {

  const pokemonTypesArr = ["Grass", "Fire", "Water", "Lightning", "Fighting", "Psychic", "Colorless", "Darkness", "Metal", "Dragon", "Fairy"];
  
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
              {Object.entries(setIds).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ marginBottom: '20px', width: '20vw' }}>
            <InputLabel id="type-select-label">Card Type</InputLabel>
            <Select labelId="type-select-label" id="type-select" multiple value={selectedCardTypes} onChange={handleCardTypesChange} renderValue={(selected) => selected.join(', ')}>
              <MenuItem value="Pokémon">Pokémon</MenuItem>
              <MenuItem value="Trainer">Trainer</MenuItem>
              <MenuItem value="Energy">Energy</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ marginBottom: '20px', width: '20vw' }}>
            <InputLabel id="pokemon-type-select-label">Pokémon Type</InputLabel>
            <Select labelId="pokemon-type-select-label" id="pokemon-type-select" multiple value={selectedPokemonType} onChange={handlePokemonTypeChange} renderValue={(selected) => selected.join(', ')}>
              {pokemonTypesArr.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ marginBottom: '20px', width: '20vw' }}>
            <InputLabel id="artist-select-label">Artist</InputLabel>
            <Select labelId="artist-select-label" id="artist-select" multiple value={selectedArtist} onChange={handleArtistChange} renderValue={(selected) => selected.join(', ')}>
              {artists.map((artist) => (
                <MenuItem key={artist} value={artist}>
                  {artist}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
         
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button sx={{ textAlign: 'center' }} onClick={handleFilterApply} color="primary">
            Apply
          </Button>
          <Button sx={{ textAlign: 'center' }} onClick={handleClearFilters} color="primary">
            Clear Filters
          </Button>
          <Button sx={{ textAlign: 'center' }} onClick={handleFilterClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
