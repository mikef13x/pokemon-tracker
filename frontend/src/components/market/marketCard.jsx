import { Box, Typography, IconButton, Popover } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useRef } from 'react';

export default function MarketCard({ image, name, price, cardId, setName}) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [popoverMessage, setPopoverMessage] = useState('');
    const heartButtonRef = useRef(null);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        setPopoverMessage(!isFavorite ? 'Added to collection!' : 'Removed from collection');
        setPopoverOpen(true);
        setTimeout(() => {
            setPopoverOpen(false);
        }, 1000);
    };

    return (
        <Box sx={{ 
            width: '25%', 
            padding: '16px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxSizing: 'border-box'
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
                    marginTop: '10px' 
                }} />
            </Box>
            <Typography variant="h6" sx={{ marginTop: '20px', textAlign: 'center', fontSize: '24px' }}>
                <span className='poppins-regular'>{name} # {cardId}</span>
            </Typography>
            <Typography variant="body1" sx={{ marginTop: '20px' }}>
                Market Price: {price}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: '8px' }}>
              Set: {setName}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: '8px' }}>
                other data here, like card data
            </Typography>
            <IconButton ref={heartButtonRef} onClick={handleFavoriteClick} sx={{ marginTop: '8px' }}>
                {isFavorite ? <FavoriteIcon sx={{ color: 'pink' }} /> : <FavoriteBorderIcon />}
            </IconButton>
            <Popover
                open={popoverOpen}
                anchorEl={heartButtonRef.current}
                onClose={() => setPopoverOpen(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Typography sx={{ p: 2 }}>{popoverMessage}</Typography>
            </Popover>
        </Box>
    );
}