import CollectionWrapper from "../components/collection/collectionwrapper";
import Background from '../assets/pokemoncollectionbackground.png';

export default function CollectionPage() {
    return (
        <div style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed', // Ensures the background image stays in place
            minHeight: '100vh', // Ensures the background covers the full viewport height
            width: '100%',
        }}>
            <CollectionWrapper />
        </div>
    );
}