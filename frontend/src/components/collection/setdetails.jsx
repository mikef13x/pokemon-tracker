import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, Button, Grid } from '@mui/material';
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
      <Button onClick={handleSetBackClick} variant="contained" color="primary" sx={{ marginBottom: '20px' }}>
        Back
      </Button>
      <Card sx={{ backgroundColor: 'white', padding: '20px', margin: 'auto', width: '90%' }}>
        <CardMedia component="img" height="200" image={set.image} alt={set.name} sx={{ objectFit: 'contain', backgroundColor: 'transparent' }} />
        <Box sx={{ padding: '10px' }}>
          <Typography sx={{ textAlign: 'center' }}>{set.name}</Typography>
          <Typography sx={{ textAlign: 'center' }}>Set: {set.setId}</Typography>
          <Typography sx={{ textAlign: 'center' }}>Total Cards: {set.total}</Typography>
        </Box>
      </Card>
      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        {data && data.getCardsBySet && data.getCardsBySet.map((card) => {
          const inCollection = isCardInCollection(card.cardId);
          console.log(`Card ID: ${card.id}, In Collection: ${inCollection}`);
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
              <Card sx={{ backgroundColor: 'white', padding: '20px', margin: 'auto', width: '90%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={card.image}
                  alt={card.name}
                  sx={{
                    objectFit: 'contain',
                    backgroundColor: 'transparent',
                    filter: inCollection ? 'none' : 'grayscale(100%)',
                  }}
                />
                <Box sx={{ padding: '10px' }}>
                  <Typography sx={{ textAlign: 'center' }}>{card.name}</Typography>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}