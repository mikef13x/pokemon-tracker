import { Box, Button } from '@mui/material';
import MarketCard from './marketCard';
import MarketChart from './marketChart';
import { useNavigate, useLocation } from 'react-router-dom';



export default function MarketWrapper({ id, name, price, image, cardId, setName, artist, setId }) {
  const navigate = useNavigate()
  const location = useLocation()


  const getCardId = (cardId) => {
    return cardId.split('-')[1];
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  const handleBackClick = () => {

    if (location.state && location.state.from) {
      navigate(location.state.from, {
        state: {
          searchValue: location.state.searchValue,
          currentPage: location.state.currentPage,
          sortOrder: location.state.sortOrder,
          isGridView: location.state.isGridView,
          fetchedSetData: location.state.fetchedSetData,
          selectedImage: location.state.selectedImage,
          selectedSets: location.state.selectedSets,
          selectedCardTypes: location.state.selectedCardTypes,
          selectedArtist: location.state.selectedArtist,
          selectedSubtype: location.state.selectedSubtype,
          selectedRarity: location.state.selectedRarity,
          selectedPokemonType: location.state.selectedPokemonType

        },
      });
    } else {
      navigate('/search'); // Default to search page if no state is available
    }
  };


  return (
    <>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',

          alignItems: 'center',
          border: '4px solid black',
          height: '75vh',
          width: '80vw',
          marginTop: '100px',
          background: 'linear-gradient(to bottom right, rgb(200,200,200), rgb(255,255,255))',
          position: 'relative'

        }}>

          <Button onClick={handleBackClick} sx={{ position: 'absolute', top: '20px', left: '20px' }}>
            Back
          </Button>

          <MarketCard id={id} name={name} price={formatPrice(price?.raw)} setName={setName} setId={setId} image={image} artist={artist} cardId={getCardId(cardId)} />

          <MarketChart />
        </Box>

      </Box>
    </>
  );
}