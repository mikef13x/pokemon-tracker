import { Box } from '@mui/material';
import SearchResultCard2 from './searchresultcard2';

export default function SearchWrapper2({ sortedData }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    return (
        <>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '10px', marginTop: '20px', padding:'50px' }}>
                {sortedData.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <SearchResultCard2 title={item.title} price={formatPrice(item.price)} image={item.image} />
                    </Box>
                ))}
            </Box>
        </>
    );
}