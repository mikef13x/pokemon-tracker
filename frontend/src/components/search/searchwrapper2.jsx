import { Box } from '@mui/material';
import SearchResultCard2 from './searchresultcard2';
import { motion } from 'framer-motion';
import { containerInfo, itemInfo } from '../../utils/framerMotion';

export default function SearchWrapper2({ sortedData, handleCardClick }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    const getCardId = (cardId) => {
        return cardId.split('-')[1];
    };

    return (
        <motion.div
            variants={containerInfo}
            initial="hidden"
            animate="visible"
        >
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', columnGap: '70px', marginTop: '-50px', padding: '90px', marginRight: '0px' }}>
                {sortedData.map((item) => (
                    <motion.div key={`${item.id}-${item.price}-${item.name}`} variants={itemInfo}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <SearchResultCard2
                            id={item.id}
                                name={item.name}
                                setName={item.setName}
                                price={formatPrice(item.prices.raw)}
                                image={item.image}
                                cardId={getCardId(item.cardId)}
                                onClick={() => handleCardClick(item)}
                            />
                        </Box>
                    </motion.div>
                ))}
            </Box>
        </motion.div>
    );
}