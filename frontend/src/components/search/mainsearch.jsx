import { Box, Select, MenuItem, FormControl, InputLabel, Typography, Paper} from '@mui/material';
import SearchWrapper from "./searchwrapper";
import Mudkip from '../../assets/mudkipgoldstar.jpg';
import Groudon from '../../assets/groudongoldstar.jpg'
import Gyarados from '../../assets/gyaradosgoldstar.jpg'
import Lisia from '../../assets/lisiapokemon.jpeg'
import Mewtwo from '../../assets/mewtwogoldstar.jpg'
import Vaporeon from '../../assets/vaporeongoldstar.jpg'
import Rayquaza from '../../assets/rayponcho.jpg'
import { useState } from "react";


export default function MainSearch() {
    const [sortOrder, setSortOrder] = useState('');
    
    const mockData = [
        { id: 1, title: 'Mudkip 1', price: 200, image: Mudkip },
        { id: 2, title: 'Mudkip 2', price: 142, image: Rayquaza },
        { id: 3, title: 'Mudkip 3', price: 5325, image: Groudon },
        { id: 4, title: 'Mudkip 4', price: 553, image: Gyarados },
        { id: 5, title: 'Mudkip 5', price: 7547, image: Lisia },
        { id: 6, title: 'Mudkip 6', price: 77, image: Mewtwo},
        { id: 7, title: 'Mudkip 7', price: 37, image: Vaporeon },
        { id: 8, title: 'Mudkip 8', price: 4, image: Rayquaza },
        { id: 9, title: 'Mudkip 9', price: 843, image: Mudkip },
        { id: 10, title: 'Mudkip 10', price: 679, image: Rayquaza },
        { id: 11, title: 'Mudkip 11', price: 76064, image: Groudon },
        { id: 12, title: 'Mudkip 12', price: 4854, image: Gyarados },
        { id: 13, title: 'Mudkip 13', price: 45833, image: Lisia },
        { id: 14, title: 'Mudkip 14', price: 4584, image: Mewtwo },
        { id: 15, title: 'Mudkip 15', price: 4584, image: Vaporeon },
        { id: 16, title: 'Mudkip 16', price: 45832, image: Rayquaza },
    ];
    

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





    return(
        <>
        <Paper sx={{paddingTop: '80px', height: '100px', backgroundColor: 'transparent', boxShadow: 'none'}}>
        <FormControl sx={{ minWidth: 120, backgroundColor: 'white', marginTop: '20px', marginLeft: '50px'}}>
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

    </Paper>
    <Typography sx={{textAlign: 'center', fontSize: '24px', padding: '20px', color: 'white'}}>10 results</Typography>
    <Box sx={{ marginTop: '0px', height: '70vh', width: '100vw', flexDirection: 'column', overflowY: 'auto',  padding: '0px' }}>
        <SearchWrapper sortedData={sortedData}/>
        </Box>
        </>
    )
}