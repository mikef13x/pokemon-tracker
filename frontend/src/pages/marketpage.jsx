
import { useLocation, useParams } from 'react-router-dom';
import MarketWrapper from '../components/market/marketwrapper'

export default function MarketPage() {
    const { cardId } = useParams();
    const location = useLocation();
    const card = location.state;

    return (
        <div>
            {card ? (
                <MarketWrapper name={card.name} price={card.price} image={card.image} cardId={cardId} />
            ) : (
                <p>No card selected</p>
            )}
        </div>
    );
}