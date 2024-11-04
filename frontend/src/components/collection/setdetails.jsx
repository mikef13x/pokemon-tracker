import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, Button, Grid, CardContent, ButtonBase} from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_CARDS_BY_SET } from '../../utils/queries';

export default function SetDetails({ set, handleSetBackClick, mainCollection }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const { refetch } = useQuery(GET_CARDS_BY_SET, {
    variables: { setId: set.setId },
    skip: true, // Skip the initial query execution
    onCompleted: (data) => {
      setLoading(false);
      setData(data);
    },
    onError: (error) => {
      setLoading(false);
      setError(error);
    },
  });

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);
    refetch({ setId: set.setId });
  }, [set, refetch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const isCardInCollection = (cardId) => {
    return mainCollection.some(card => card.cardId === cardId);
  };

  console.log('Data:', data);
  console.log('Main Collection:', mainCollection);

  return (
    <Box>
      <Button onClick={handleSetBackClick} variant="contained" color="primary" sx={{  }}>
        Back
      </Button>
      {/* <Card sx={{ backgroundColor: 'transparent', padding: '20px', margin: 'auto', width: '90%' }}> */}
        {/* <CardMedia component="img" height="80"  alt={set.name} sx={{ objectFit: 'contain', backgroundColor: 'transparent' }} /> */}
        <Box sx={{ padding: '10px' }}>
          <Typography sx={{ textAlign: 'center', color:'white', fontSize:'24px', marginTop:'-60px' }}><span className='poppins-regular'>{set.name}</span></Typography>
          {/* <Typography sx={{ textAlign: 'center', color:'white' }}>Set: {set.setId}</Typography> */}
          <Typography sx={{ textAlign: 'center', color:'white', fontSize:'24px' }}><span className='poppins-regular'>Total Cards: {set.total}</span></Typography>
        </Box>
      {/* </Card> */}
      <Grid container spacing={2} sx={{  display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '50px', padding:'60px'}}>
        {data && data.getCardsBySet && data.getCardsBySet.map((card) => {
          const inCollection = isCardInCollection(card.cardId);
          console.log(`Card ID: ${card.id}, In Collection: ${inCollection}`);
          return (
            <>
            <ButtonBase  sx={{  display: 'block', textAlign: 'initial', padding:"10px" }}>
            <Grid item  key={card.id}>
              <Card sx={{ borderRadius: '10px', width: '280px', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  background: 'linear-gradient(to bottom right, rgb(200,200,200), rgb(255,255,255))' }}>
                <CardMedia
                 
                  component="img"
                  // height="200"
                  image={card.image}
                  alt={card.name}
                  sx={{ height: 'auto', width: '70%', objectFit: 'contain', margin: 'auto', marginTop: '30px', borderRadius:'10px',filter: inCollection ? 'none' : 'grayscale(100%)' }}
                />
                <CardContent sx={{ textAlign: 'center', color: 'black', padding: '8px' }}>
                        <Typography variant="h5" component="div">
                            <span className='poppins-regular'>{card.name} #{card.cardId.split('-')[1]}</span>
                        </Typography>
                       
                    </CardContent>
               
              </Card>
            </Grid>
            </ButtonBase>
            </>
          );
        })}
      </Grid>
    </Box>
  );
}