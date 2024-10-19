
import { Box, Typography } from '@mui/material';

export default function MarketCard({ image, name, price, cardId }) {
    return (
        <Box sx={{
            width: '25%',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            border: '4px solid black',
            marginLeft: '80px',
            height: '80%'
        }}>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: 'auto',
                flexGrow: 1
            }}>
                <img src={image} alt={name} style={{
                    maxWidth: '70%',
                    maxHeight: '100%',
                    borderRadius: '8px',
                    objectFit: 'contain',
                    marginTop: '50px'
                }} />

            </Box>
            <Typography variant="h6"
                sx={{
                    marginTop: '40px',
                    textAlign: 'center',
                    fontSize: '24px'
                }}>

                <span className='poppins-regular'>{name} # {cardId}</span>

            </Typography>

            <Typography variant="body1"
                sx={{
                    marginTop: '8px'
                }}>
                Market Price: {price}
            </Typography>
            <Typography variant="body1"
                sx={{
                    marginTop: '8px'
                }}>
                Other Data about card,
                move list 
              
            </Typography>
            <Typography variant="body1"
                sx={{
                    marginTop: '8px'
                }}>
                MORE DATA HERE
              
            </Typography>
        </Box>
    );
}