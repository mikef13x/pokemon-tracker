import { Box } from '@mui/material';
import SearchResultCard from './searchresultcard';

export default function SearchWrapper({ sortedData, handleCardClick }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };
    const getCardId = (cardId) => {
        return cardId.split('-')[1];
    };
    return (
        <>
   
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1px', marginTop: '20px', alignItems: 'center'}}>
                {sortedData.map((item) => (
                    <Box key={item.id} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <SearchResultCard name={item.name} setName={item.setName} price={formatPrice(item.prices.raw)} image={item.image} cardId={getCardId(item.cardId)} onClick={() => handleCardClick(item)} />
                    </Box>
                ))}
            </Box>
            
        </>
    );
}