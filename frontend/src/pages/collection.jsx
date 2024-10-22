import CollectionWrapper from "../components/collection/collectionwrapper";
import Background from '../assets/pokemoncollectionbackground.png';
import Footer from '../components/other/footer'; // Assuming you have a Footer component

export default function CollectionPage() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed', // Ensures the background image stays in place
        }}>
            <div style={{ flex: '1' }}>
                <CollectionWrapper />
            </div>
            <Footer />
        </div>
    );
}