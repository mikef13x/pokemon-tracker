import { useState, useEffect } from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import CollectionCard from './collectioncard'; // Import the CollectionCard component
import { GET_USER_MAIN_COLLECTION } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import { motion } from 'framer-motion';
import { containerInfo, itemInfo } from '../../utils/framerMotion';
import { keyframes } from '@emotion/react';
import SetProgress from './setprogress';

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
  const [collectionName, setCollectionName] = useState('');
  const [animationKey, setAnimationKey] = useState(0); // State for animation key
  const [showNewComponent, setShowNewComponent] = useState(false);
  const [isViewingSet, setIsViewingSet] = useState(false); // Add this state
  const [currentSetImage, setCurrentSetImage] = useState(''); // State to show new component

  const user = Auth.loggedIn() ? Auth.getProfile().data : null;

  const { loading, error, data } = useQuery(GET_USER_MAIN_COLLECTION, {
    variables: { userId: user ? user.id : '' },
    skip: !user, // Skip the query if the user is not logged in
  });

  useEffect(() => {
    if (data) {
      setMainCollection(data.getUserMainCollection.cards);
      setCollectionName(data.getUserMainCollection.collectionName);
      setAnimationKey((prevKey) => prevKey + 1); // Update the animation key
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const sortedData = [...mainCollection].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.releaseDate - b.releaseDate;
    } else if (sortOrder === 'dsc') {
      return b.releaseDate - a.releaseDate;
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

  const handleToggleComponentClick = () => {
    setShowNewComponent((prev) => !prev);
  };
  const handleViewSet = (setImage) => {
    setIsViewingSet(true);
    setCurrentSetImage(setImage);
  };

  return (
    <Box sx={{}}>
      <Box
        sx={{
          width: '100%',
          // position: 'fixed',
          top: '0',
          zIndex: '1000',
          marginTop: '100px',
          marginBottom:'-170px',
          left: 0,
        }}>
        <Typography
          sx={{
            fontSize: '55px',
            color: 'white',
            textShadow: '-2px 0 0 black, 0 2px 0 black, -2px 2px 0 black',
            textAlign: 'center',
            animation: `${pulse} 0.7s steps(2, end) infinite`,
            transformOrigin: 'bottom',
            width: '100%',
          }}>
            {isViewingSet ? (
              <img src={currentSetImage} alt="Set" style={{ width: 'auto', height: 'auto', maxWidth:'400px', maxHeight:'200px' }} />
            ) : (
              <span className="tiny5-regular">{showNewComponent ? 'View Collection' : 'Collection Progress'}</span>
            )}
        </Typography>
      </Box>
      <Box
        sx={{
          marginLeft: '100px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '-170px',
          marginTop: '100px',
          zIndex: '1100',
          // position: 'fixed',
        }}>
        <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }}>
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select labelId="sort-label" value={sortOrder} onChange={handleSortChange} label="Sort">
            <MenuItem value="asc">Oldest</MenuItem>
            <MenuItem value="dsc">Newest</MenuItem>
            <MenuItem value="priceDSC">Highest Price</MenuItem>
            <MenuItem value="priceASC">Lowest Price</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={handleToggleComponentClick}
          color="primary"
          sx={{
            backgroundColor: 'rgba(255,255,255)', color: 'black', marginLeft: '20px', width: '120px', height: '55px',
            backdropFilter: 'blur(5px)',
          }}>
          <span className="tiny5-regular">{showNewComponent ? 'View Collection' : 'Collection Progress'}</span>
          
        </Button>
      </Box>
      <Dialog open={showSearch} onClose={toggleSearchBar} maxWidth="md" fullWidth>
        <DialogTitle>Search</DialogTitle>
        <DialogContent>
          <TextField label="Search" variant="outlined" fullWidth />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button sx={{ textAlign: 'center' }} onClick={toggleSearchBar} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <Box sx={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              flex: '1',
              overflowY: 'auto',
              padding: '40px',
              borderTop: '2px solid white',
              borderBottom: '2px solid white',
            
              height:'75vh',
              marginTop: '200px',
              backdropFilter: 'blur(20px)',
            }}>
            {showNewComponent ? (
              <SetProgress mainCollection={mainCollection} handleViewSet={handleViewSet} setIsViewingSet={setIsViewingSet}/>
            ) : (
              <motion.div
                key={animationKey} // Use the animation key
                variants={containerInfo}
                initial="hidden"
                animate="visible">
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '50px', padding:'60px'
                  }}>
                  {sortedData.map((item) => (
                    <motion.div key={`${item.cardId}-${item.price}-${item.name}`} variants={itemInfo}>
                      <Box key={item.cardId} sx={{ aspectRatio: '3 / 4' }}>
                        <CollectionCard cardId={item.cardId} name={item.name} price={formatPrice(item.price)} image={item.image} />
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}