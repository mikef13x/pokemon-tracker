import { Box } from '@mui/material';
import MarketCard from './marketCard';


export default function MarketWrapper({ name, price, image, cardId }) {

    const getCardId = (cardId) => {
        return cardId.split('-')[1];
    };
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',  
                    justifyContent: 'center',
                    border: '4px solid black', 
                    height: '75vh', 
                    width: '80vw', 
                    marginTop: '100px', 
                    backgroundColor: 'white' 
                }}>
                    <MarketCard name={name} price={formatPrice(price)}  image={image} cardId={getCardId(cardId)} />
                </Box>
            </Box>
        </>
    );
}