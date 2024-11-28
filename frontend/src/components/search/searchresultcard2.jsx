import { Card, CardMedia, Typography, ButtonBase, Box, IconButton, Paper} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_COLLECTION } from '../../utils/mutations';
import { GET_USER_MAIN_COLLECTION } from '../../utils/queries';
import Auth from '../../utils/auth';
export default function SearchResultCard2({ id, name, price, image, onClick, cardId, setName}) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [collection, setCollection] = useState([]);
    const [collectionId, setCollectionId] = useState('');
    const user = Auth.loggedIn() ? Auth.getProfile().data : null;

    const [updateCollection] = useMutation(UPDATE_COLLECTION);

    const { loading, error, data } = useQuery(GET_USER_MAIN_COLLECTION, {
      variables: { userId: user ? user.id : '' },
      skip: !user,
    });
  
    useEffect(() => {
      if (data && data.getUserMainCollection) {
        const userCollection = data.getUserMainCollection.cards.map(card => card._id);
        setCollection(userCollection);
        setCollectionId(data.getUserMainCollection._id);
        if (userCollection.includes(id)) {
          setIsFavorite(true);
        }
      }
    }, [data, id]);
    const heartButtonRef = useRef(null);
    const handleFavoriteClick = async () => {
        const updatedCollection = isFavorite
          ? collection.filter(item => item !== id)
          : [...collection, id];
    
        setIsFavorite(!isFavorite);
        setCollection(updatedCollection);
    
    
        try {
          await updateCollection({
            variables: { collectionId: collectionId, updateData: { cards: updatedCollection } },
          });
        } catch (error) {
          console.error('Error updating collection:', error);
         
        }
      };

    return (
        <Box sx={{ position: 'relative' }}>
          <Paper 
            elevation={0} 
            sx={{ 
                position: 'absolute', 
                backgroundColor: 'transparent', 
                outline: 'none', 
                border: 'none', 
                boxShadow: 'none', 
                top: 0, 
                right: 0, 
                zIndex: 1 
            }}
        >
        <IconButton ref={heartButtonRef} onClick={handleFavoriteClick} sx={{ marginTop: '8px' }}>
            {isFavorite ? <FavoriteIcon sx={{ color: 'pink'}} /> : <FavoriteBorderIcon />}
          </IconButton>
        </Paper>
        <ButtonBase onClick={onClick} sx={{ display: 'block', textAlign: 'initial', width: '115%' }}>
            <Box sx={{ width: '350px', height: '270px', backgroundColor: 'rgb(255,255,255,0.8)', display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', backdropFilter: 'blur(20px)', borderRadius:'10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)' }}>
                <Card sx={{borderRadius:"10px", width: '200px', height: 'auto', backgroundColor: 'transparent', boxShadow: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {image && (
                        <CardMedia
                            component="img"
                            image={image}
                            alt={name}
                            sx={{ height: '250px', width: '90%', borderRadius:'10px' }}
                        />
                    )}
                </Card>
                <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'space-around', width:'30%', padding: ' 20px' }}>
                    
                    <Typography sx={{ fontSize: '20px' }}><span className='poppins-regular'>{name}</span></Typography>
                    <Typography sx={{ fontSize: '14px', marginBottom: '25px'  }}><span className='poppins-regular'>#{cardId} </span></Typography>
                    <Typography sx={{ fontSize: '14px',marginBottom: '25px' }}><span className='poppins-regular'>Set: {setName}</span></Typography>
                    <Typography sx={{ fontSize: '14px' }}><span className='poppins-regular'>Market Price:  </span></Typography>
                    <Typography sx={{ fontSize: '20px' }}><span className='poppins-regular'> {price} </span></Typography>
                </Box>
            </Box>
        </ButtonBase>
        </Box>
    );
}