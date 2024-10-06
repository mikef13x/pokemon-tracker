import { Box, Button, TextField } from '@mui/material';


export default function LetsGetStarted() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
            <TextField
                variant="outlined"
                placeholder="Search for a card..."
                sx={{ marginBottom: '20px', width: '40vw', backgroundColor: 'white' }}
                inputProps={{
                    className: 'tiny5-regular', // Add the class to the input element
                }}
            />
            <Box sx={{ display: 'flex', gap: '10px' }}>
                <Button
                    sx={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        color: 'black',
                        background: 'linear-gradient(to bottom, red 50%, white 50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid black',
                    }}
                >
                    <span className='tiny5-regular'>Go</span>
                </Button>
            </Box>
        </Box>
    );
}