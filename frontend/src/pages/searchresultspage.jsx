import MainSearch from "../components/search/mainsearch"
import Background from '../assets/pokemonresultpage.jpg'

export default function SearchPage() {

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
        <MainSearch/>
        </div>
    )
}