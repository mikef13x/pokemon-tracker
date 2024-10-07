import { Box } from '@mui/material';
import SearchResultCard from './searchresultcard';

export default function SearchWrapper({ sortedData }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    return (
        <>
   
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1px', marginTop: '0px', alignItems: 'center'}}>
                {sortedData.map((item) => (
                    <Box key={item.id} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <SearchResultCard title={item.title} price={formatPrice(item.price)} image={item.image} />
                    </Box>
                ))}
            </Box>
            
        </>
    );
}