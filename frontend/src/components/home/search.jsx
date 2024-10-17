import { Box, Button, Typography } from '@mui/material';
import {Link} from "react-router-dom"


export default function LetsGetStarted() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
           <Typography sx={{color: 'white', fontSize: '32px'}}>
         <span className='poppins-regular'> Welcome to PokeTrack</span>
           </Typography>
           <Typography sx={{color: 'white', fontSize: '24px', textAlign:"center"}}>
           <span className='poppins-regular'> Here you can monitor pokemon card price data, create your collection,
            <br/>
             and share your progress with others.
             </span> </Typography>
           <Box sx={{display: 'flex', marginTop: '50px',}}>
            <Link to='/search'>
            <Button variant='contained' sx={{marginRight: '50px', width: '150px', height: '40px'}} >
                Search
            </Button>
            </Link>
            <Link  to='/collection'>
            <Button variant='contained' sx={{ width: '150px', height: '40px'}}>
                Collection
            </Button>
            </Link>
           </Box>
        </Box>
    );
}