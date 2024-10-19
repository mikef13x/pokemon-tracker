
import { useLocation, useParams } from 'react-router-dom';
import MarketWrapper from '../components/market/marketwrapper'
import { Button } from '@mui/material';

export default function MarketPage() {
    const { cardId } = useParams();
    const location = useLocation();
    const card = location.state;

    return (
        <div>
               
                <MarketWrapper name={card.name} price={card.price} image={card.image} cardId={cardId} />
           
        </div>
    );
}