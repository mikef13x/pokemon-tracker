import { Box, Button} from '@mui/material';
import MarketCard from './marketCard';
import MarketChart from './marketChart';


export default function MarketWrapper({ id, name, price, image, cardId, setName}) {

    const getCardId = (cardId) => {
        return cardId.split('-')[1];
    };
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    return (
        <>
        
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'row',  
                   
                    alignItems:'center',
                    border: '4px solid black', 
                    height: '75vh', 
                    width: '80vw', 
                    marginTop: '100px', 
                    backgroundColor: 'rgb(255,250,245)',
                    
                }}>
                   
                    <MarketCard id={id} name={name} price={formatPrice(price)} setName={setName}  image={image} cardId={getCardId(cardId)} />
                    <MarketChart/>
                </Box>
               
            </Box>
        </>
    );
}