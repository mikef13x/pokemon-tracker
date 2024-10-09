import { Box, Select, Grid, MenuItem, FormControl, InputLabel, Typography, Paper, Dialog,DialogActions, DialogContent, DialogTitle, Button} from '@mui/material';
import SearchWrapper from "./searchwrapper";
import Mudkip from '../../assets/mudkipgoldstar.jpg';
import Groudon from '../../assets/groudongoldstar.jpg'
import Gyarados from '../../assets/gyaradosgoldstar.jpg'
import Lisia from '../../assets/lisiapokemon.jpeg'
import Mewtwo from '../../assets/mewtwogoldstar.jpg'
import Vaporeon from '../../assets/vaporeongoldstar.jpg'
import Rayquaza from '../../assets/rayponcho.jpg'
import { useState } from "react";


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
const modalData = [
    { id: 1, name: 'WOTC', image: Gyarados },
    { id: 2, name: 'EX Series', image: Lisia },
    { id: 3, name: 'Diamond & Pearl', image: Mewtwo },
    { id: 4, name: 'POP Series', image: Vaporeon },
    { id: 5, name: 'Platinum', image: Rayquaza },
    { id: 6, name: 'HeartGold SoulSilver', image: Groudon },
    { id: 7, name: 'Black & White', image: Mudkip },
    { id: 8, name: 'XY', image: Gyarados },
    { id: 9, name: 'Sun & Moon', image: Vaporeon },
    { id: 10, name: 'Sword & Shield', image: Mewtwo },
    { id: 11, name: 'Scarlet & Violet', image: Mewtwo },
];

const WOTCData = [
    { id: 1, name: 'Base Set', image: Mudkip },
    { id: 2, name: 'Jungle', image: Rayquaza },
    { id: 3, name: 'Fossil', image: Groudon },
    { id: 4, name: 'Base Set 2', image: Gyarados },
    { id: 5, name: 'Gym Challenge', image: Lisia },
    { id: 6, name: 'Gym Heroes', image: Mewtwo },
    { id: 7, name: 'Neo Destiny', image: Vaporeon },
    { id: 8, name: 'Neo Revelation', image: Rayquaza},
    { id: 9, name: 'Neo Discovery', image: Mudkip },
    { id: 10, name: 'Neo Genesis', image: Lisia },
    { id: 11, name: 'Legendary Collection', image: Mewtwo },
    { id: 12, name: 'Expedition', image: Mewtwo },
    { id: 13, name: 'Aquapolis', image: Mewtwo },
    { id: 14, name: 'Skyridge', image: Mewtwo },
    
];
const EXData = [
    { id: 1, name: 'Power Keepers', image: Mudkip },
    { id: 2, name: 'Dragon Frontiers', image: Rayquaza },
    { id: 3, name: 'Crystal Guardians', image: Groudon },
    { id: 4, name: 'Holon Phantoms', image: Gyarados },
    { id: 5, name: 'Legend Maker', image: Lisia },
    { id: 6, name: 'Delta Species', image: Mewtwo },
    { id: 7, name: 'Unseen Forces', image: Vaporeon },
    { id: 8, name: 'Emerald', image: Rayquaza},
    { id: 9, name: 'Deoxys', image: Mudkip },
    { id: 10, name: 'Team Rocket Returns', image: Lisia },
    { id: 11, name: 'FireRed & LeafGreen', image: Mewtwo },
    { id: 11, name: 'Hidden Legends', image: Mewtwo },
    { id: 11, name: 'Team Magma vs Team Aqua', image: Mewtwo },
    { id: 11, name: 'Dragon', image: Mewtwo },
    { id: 11, name: 'Sandstorm', image: Mewtwo },
    { id: 11, name: 'Ruby & Sapphire', image: Mewtwo },
];

export default function MainSearch() {
    const [sortOrder, setSortOrder] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [currentModalData, setCurrentModalData] = useState(modalData)
    const [title, setTitle] = useState('All Pokemon Sets');
    
    const [isInitialState, setIsInitialState] = useState(true);
    
   
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


    const handleModalOpen  = () => {
        setShowModal(true)
    }
    const handleModalClose  = () => {
        setShowModal(false)
        setCurrentModalData(modalData)
        setTitle('All Pokemon Sets')
        setIsInitialState(true);
     
    }
    const handleButtonClick = (newData, newTitle) => {
        setIsInitialState(false);
        setCurrentModalData(newData);
        setTitle('All Pokemon Sets')
        setTitle(newTitle);
    };
    const handleBackButtonClick = () => {
        // Logic to go back to the previous state
        setIsInitialState(true);
        setCurrentModalData(modalData); // Reset to initial modal data
        setTitle('All Pokemon Sets')
    };
    return(
        <>
        <Paper sx={{paddingTop: '80px', height: '100px', backgroundColor: 'transparent', boxShadow: 'none'}}>
        <FormControl sx={{ minWidth: 120, backgroundColor: 'white', marginTop: '20px', marginLeft: '50px'}}>
        <InputLabel id="sort-label"><span className='tiny5-regular'>Sort</span></InputLabel>
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
    <Button onClick={handleModalOpen} color="primary" sx={{ 
                backgroundColor: 'rgba(255,255,255)',
                color: 'black', 
                marginLeft: '20px', 
                width: '120px', 
                height: '55px', 
              
                backdropFilter: 'blur(5px)',
                marginTop: '20px'
            }}>
              <span className='tiny5-regular'>Search by Set</span> 
            </Button>
    <Dialog open={showModal} onClose={handleModalClose} maxWidth="md" fullWidth>
          
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', marginTop: '20px' }}>
        {!isInitialState && (
            <Button onClick={handleBackButtonClick} color="primary">
                Back
            </Button>
        )}
        <DialogTitle sx={{ textAlign: 'center', flex: 1, marginRight: isInitialState ? '0px' : '64px' }}>
        {title}
        </DialogTitle>
    </Box>
            <DialogContent>
            <Grid container spacing={2}>
                            {currentModalData.map((item) => (
                                <Grid item xs={12} sm={6} md={3} key={item.id}>
                                    <Button
                                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', height: '100px', textAlign: 'center' }}
                                        onClick={() => item.name === 'WOTC' ? handleButtonClick(WOTCData, 'WOTC Sets') : item.name === 'EX Series' ? handleButtonClick(EXData, 'EX Series Sets') : null}
                                    >
                                        <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px' }} />
                                        <Typography variant="button" sx={{ flex: 1 }}>
                                            {item.name}
                                        </Typography>
                                    </Button>
                                </Grid>
            ))}
        </Grid>
            </DialogContent>
            <DialogActions sx={{justifyContent: 'center'}}>
            
                <Button sx={{textAlign:'center'}} onClick={handleModalClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>

    </Paper>
    <Typography sx={{textAlign: 'center', fontSize: '24px', padding: '20px', color: 'white'}}>10 results</Typography>
    <Box sx={{ marginTop: '0px', height: '70vh', width: '100vw', flexDirection: 'column', overflowY: 'auto',  padding: '0px' }}>
        <SearchWrapper sortedData={sortedData}/>
        </Box>
        </>
    )
}