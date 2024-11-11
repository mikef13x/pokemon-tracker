
import { Box, Button, Typography } from '@mui/material';
import { Link } from "react-router-dom"
import Auth from '../../utils/auth'


export default function LetsGetStarted() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
            <Typography sx={{
                color: 'white', fontSize: '32px', '@media (max-width: 1300px)': {
                    fontSize: '24px', // Adjust the font size for smaller screens
                    marginTop: '-50px'
                },
            }}>
                <span className='poppins-regular'> Welcome to PokéTracker</span>
            </Typography>
            <Typography sx={{
                color: 'white', fontSize: '24px', textAlign: "center", '@media (max-width: 1300px)': {
                    fontSize: '16px',
                    marginTop: '20px' // Adjust the font size for smaller screens

                }
            }}>
                <span className='poppins-regular'> Here you can monitor pokemon card price data, create your collection,
                    <br />
                    and share your progress with others.
                </span> </Typography>
            <Box sx={{ display: 'flex', marginTop: '50px', }}>
                <Link to='/search'>
                    <Button variant='contained' sx={{ marginRight: '50px', width: '150px', height: '40px' }} >
                        Search
                    </Button>
                </Link>
                {Auth.loggedIn() ? (
                    <Link to='/collection'>
                        <Button variant='contained' sx={{ width: '150px', height: '40px' }}>
                            Collection
                        </Button>
                    </Link>
                ) : (
                    <Link to='/signin'>
                        <Button variant='contained' sx={{ width: '150px', height: '40px' }}>
                            Collection
                        </Button>
                    </Link>
                )}
            </Box>
            <Typography sx={{
                color: 'white', marginTop: '100px', animation: 'fadeInOut 2s infinite', '@media (max-width: 600px)': {
                    // Adjust the font size for smaller screens
                    marginTop: '50px', // Adjust the margin for smaller screens
                }
            }}>
                <span className='poppins-regular'>Scroll down for more info</span>
            </Typography>
        </Box>
    );
}