import  { useState } from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CollectionCard from './collectioncard'; // Import the CollectionCard component
import Mudkip from '../../assets/mudkipgoldstar.jpg';
import { keyframes } from "@emotion/react";



const pulse = keyframes`
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.04);
  }
`;



// Mock data for CollectionCard components


const mockData = [
    { id: 1, title: 'Mudkip 1', price: 200, image: Mudkip },
    { id: 2, title: 'Mudkip 2', price: 142, image: Mudkip },
    { id: 3, title: 'Mudkip 3', price: 5325, image: Mudkip },
    { id: 4, title: 'Mudkip 4', price: 553, image: Mudkip },
    { id: 5, title: 'Mudkip 5', price: 7547, image: Mudkip },
    { id: 6, title: 'Mudkip 6', price: 77, image: Mudkip },
    { id: 7, title: 'Mudkip 7', price: 37, image: Mudkip },
    { id: 8, title: 'Mudkip 8', price: 4, image: Mudkip },
    { id: 9, title: 'Mudkip 9', price: 843, image: Mudkip },
    { id: 10, title: 'Mudkip 10', price: 679, image: Mudkip },
    { id: 11, title: 'Mudkip 11', price: 76064, image: Mudkip },
    { id: 12, title: 'Mudkip 12', price: 4854, image: Mudkip },
    { id: 13, title: 'Mudkip 13', price: 45833, image: Mudkip },
    { id: 14, title: 'Mudkip 14', price: 4584, image: Mudkip },
    { id: 15, title: 'Mudkip 15', price: 4584, image: Mudkip },
    { id: 16, title: 'Mudkip 16', price: 45832, image: Mudkip },
];

export default function CollectionWrapper() {
    const [sortOrder, setSortOrder] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const sortedData = [...mockData].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.id - b.id;
        } else if (sortOrder === 'dsc') {
            return b.id - a.id;
        } else if (sortOrder === 'priceDSC') {
            return b.price - a.price;
        } else if (sortOrder === 'priceASC') {
            return a.price - b.price;
        } else {
            return 0;
        }
    });

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    const toggleSearchBar = () => {
        setShowSearch((prev) => !prev);
    };

    return (
       
        <Box sx={{paddingTop:"100px"}}>
           <Box sx={{ width: '100%', position: 'fixed', top: '0', zIndex: '1000', marginTop: '100px', left: 0 }}>
            <Typography sx={{
                fontSize: '55px',
                color: 'white',
                textShadow: '-2px 0 0 black, 0 2px 0 black, -2px 2px 0 black',
                textAlign: 'center',
                animation: `${pulse} 0.7s steps(2, end) infinite`,
                transformOrigin: 'bottom',
                width: '100%',
            }}>
                <span className="tiny5-regular">Michael's Collection</span>
            </Typography>
        </Box>
        <Box sx={{ marginLeft: '100px',display: 'flex', alignItems: 'center', marginBottom: '20px', marginTop: '60px', zIndex: '1100' }}>
            <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }}>
                <InputLabel id="sort-label">Sort</InputLabel>
                <Select
                    labelId="sort-label"
                    value={sortOrder}
                    onChange={handleSortChange}
                    label="Sort"
                >
                    <MenuItem value="asc">Oldest</MenuItem>
                    <MenuItem value="dsc">Newest</MenuItem>
                    <MenuItem value="priceDSC">Highest Price</MenuItem>
                    <MenuItem value="priceASC">Lowest Price</MenuItem>
                </Select>
            </FormControl>
            <IconButton onClick={toggleSearchBar} color="primary" sx={{ 
                backgroundColor: 'rgba(0, 0, 0)',
                color: 'white', 
                marginLeft: '20px', 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backdropFilter: 'blur(5px)' 
            }}>
                <AddIcon />
            </IconButton>
        </Box>
        <Dialog open={showSearch} onClose={toggleSearchBar} maxWidth="md" fullWidth>
            <DialogTitle>Search</DialogTitle>
            <DialogContent>
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                />
            </DialogContent>
            <DialogActions sx={{justifyContent: 'center'}}>
                <Button sx={{textAlign:'center'}} onClick={toggleSearchBar} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        
        <Box sx={{display: 'flex', justifyContent:'center'}}>
        <Box sx={{ height: '75vh', overflowY: 'auto', padding: '20px', borderTop: '8px groove white', width: '100vw', marginLeft: '0px' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {sortedData.map((item) => (
                    <Box key={item.id} sx={{ aspectRatio: '3 / 4' }}>
                        <CollectionCard title={item.title} price={formatPrice(item.price)} image={item.image} />
                    </Box>
                ))}
            </Box>
        </Box>
        </Box>
    </Box>

    );
}