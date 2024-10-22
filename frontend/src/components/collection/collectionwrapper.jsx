import { useState, useEffect } from 'react';
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CollectionCard from './collectioncard'; // Import the CollectionCard component
import { GET_USER_MAIN_COLLECTION } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';

// import Mudkip from '../../assets/mudkipgoldstar.jpg';
// import Groudon from '../../assets/groudongoldstar.jpg';
// import Gyarados from '../../assets/gyaradosgoldstar.jpg';
// import Lisia from '../../assets/lisiapokemon.jpeg';
// import Mewtwo from '../../assets/mewtwogoldstar.jpg';
// import Vaporeon from '../../assets/vaporeongoldstar.jpg';
// import Rayquaza from '../../assets/rayponcho.jpg';


// const mockData = [
//     { id: 1, name: 'Mudkip 1', price: 200, image: Mudkip },
//     { id: 2, name: 'Mudkip 2', price: 142, image: Rayquaza },
//     { id: 3, name: 'Mudkip 3', price: 5325, image: Groudon },
//     { id: 4, name: 'Mudkip 4', price: 553, image: Gyarados },
//     { id: 5, name: 'Mudkip 5', price: 7547, image: Lisia },
//     { id: 6, name: 'Mudkip 6', price: 77, image: Mewtwo},
//     { id: 7, name: 'Gold Star Vaporeon', price: 37, image: Vaporeon },
//     { id: 8, name: 'Mudkip 8', price: 4, image: Rayquaza },
//     { id: 9, name: 'Mudkip 9', price: 843, image: Mudkip },
//     { id: 10, name: 'Mudkip 10', price: 679, image: Rayquaza },
//     { id: 11, name: 'Mudkip 11', price: 76064, image: Groudon },
//     { id: 12, name: 'Mudkip 12', price: 4854, image: Gyarados },
//     { id: 13, name: 'Mudkip 13', price: 45833, image: Lisia },
//     { id: 14, name: 'Mudkip 14', price: 4584, image: Mewtwo },
//     { id: 15, name: 'Mudkip 15', price: 4584, image: Vaporeon },
//     { id: 16, name: 'Mudkip 16', price: 45832, image: Rayquaza },
// ];

import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.04);
  }
`;


export default function CollectionWrapper() {
  const [sortOrder, setSortOrder] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [mainCollection, setMainCollection] = useState([]);
  const [collectionName, setCollectionName] = useState('')

  const user = Auth.loggedIn() ? Auth.getProfile().data : null;

  const { loading, error, data } = useQuery(GET_USER_MAIN_COLLECTION, {
    variables: { userId: user ? user.id : '' },
    skip: !user, // Skip the query if the user is not logged in
  });
  useEffect(() => {
    if (data) {
      setMainCollection(data.getUserMainCollection.cards);
      setCollectionName(data.getUserMainCollection.collectionName)
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const sortedData = [...mainCollection].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.id - b.id;
    } else if (sortOrder === 'dsc') {
      return b.id - a.id;
    } else if (sortOrder === 'priceDSC') {
      return b.price - a.price;
    } else if (sortOrder === 'priceASC') {
      return a.price - b.price;
    } else {
      return 0;
    }
  });

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const toggleSearchBar = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <Box sx={{}}>
      <Box
        sx={{
          width: '100%',
          position: 'fixed',
          top: '0',
          zIndex: '1000',
          marginTop: '90px',
          left: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: '55px',
            color: 'white',
            textShadow: '-2px 0 0 black, 0 2px 0 black, -2px 2px 0 black',
            textAlign: 'center',
            animation: `${pulse} 0.7s steps(2, end) infinite`,
            transformOrigin: 'bottom',
            width: '100%',
          }}
        >
          <span className="tiny5-regular">{collectionName}</span>
        </Typography>
      </Box>
      <Box
        sx={{
          marginLeft: '100px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          marginTop: '100px',
          zIndex: '1100',
          position: 'fixed',
        }}
      >
        <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }}>
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            labelId="sort-label"
            value={sortOrder}
            onChange={handleSortChange}
            label="Sort"
          >
            <MenuItem value="asc">Oldest</MenuItem>
            <MenuItem value="dsc">Newest</MenuItem>
            <MenuItem value="priceDSC">Highest Price</MenuItem>
            <MenuItem value="priceASC">Lowest Price</MenuItem>
          </Select>
        </FormControl>
        <IconButton
          onClick={toggleSearchBar}
          color="primary"
          sx={{
            backgroundColor: 'rgba(0, 0, 0)',
            color: 'white',
            marginLeft: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backdropFilter: 'blur(5px)',
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Dialog
        open={showSearch}
        onClose={toggleSearchBar}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Search</DialogTitle>
        <DialogContent>
          <TextField label="Search" variant="outlined" fullWidth />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            sx={{ textAlign: 'center' }}
            onClick={toggleSearchBar}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '95vh' }}>
        <Box sx={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              flex: '1',
              overflowY: 'auto',
              padding: '40px',
              borderTop: '2px solid white',
              borderBottom: '2px solid white',
              width: '100vw',
              marginTop: '200px',
              backdropFilter: 'blur(20px)',
            }}
          >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '50px',
            }}
          >
            {sortedData.map((item) => (
              <Box key={item.cardId} sx={{ aspectRatio: '3 / 4' }}>
                <CollectionCard
                  name={item.name}
                  price={formatPrice(item.price)}
                  image={item.image}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
    </Box>
  );
}
