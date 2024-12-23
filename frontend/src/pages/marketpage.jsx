import { useParams } from 'react-router-dom';
import MarketWrapper from '../components/market/marketwrapper';
import { CircularProgress, Box } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_CARD } from '../utils/queries';
import { useEffect, useState } from 'react';

export default function MarketPage() {
    const { cardId } = useParams();
    const [card, setCard] = useState({});

    const { data, loading, error } = useQuery(GET_CARD, {
        variables: { cardId: cardId },
    });

    useEffect(() => {
        if (data) {
            setCard(data.getCard);
        }
    }, [data]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <div>Error loading card data</div>;
    }
    
    return (
        <div>
            <MarketWrapper 
                id={card._id} 
                name={card.name} 
                price={card.prices} 
                setName={card.setName} 
                image={card.image} 
                artist={card.artist} 
                cardId={cardId} 
                setId={card.setId} 
            />
        </div>
    );
}