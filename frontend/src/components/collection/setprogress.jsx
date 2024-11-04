import React, { useState } from 'react';
import { Typography, Box, Grid, Card, CardMedia, CardActionArea, Button, LinearProgress, useMediaQuery } from '@mui/material';
import { modalData, WOTCData, EXData, DPData, POPData, PlatinumData, HGSSData, BWData, XYData, SMData, SSData, SVData, PromoData, OtherData } from '../../assets/set-data/set-data';
import SetDetails from './setdetails';
import { keyframes } from '@mui/system';



export default function SetProgress({ mainCollection, handleViewSet, setIsViewingSet }) {
  const [selectedSet, setSelectedSet] = useState(null);
  const [showInitialSets, setShowInitialSets] = useState(true);
  const [selectedExpansion, setSelectedExpansion] = useState(null);

  
  console.log(mainCollection);

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleSetClick = (setId) => {
    switch (setId) {
      case 'WOTC':
        setSelectedSet(WOTCData);
        break;
      case 'EX Series':
        setSelectedSet(EXData);
        break;
      case 'Diamond & Pearl':
        setSelectedSet(DPData);
        break;
      case 'POP Series':
        setSelectedSet(POPData);
        break;
      case 'Platinum':
        setSelectedSet(PlatinumData);
        break;
      case 'HeartGold & SoulSilver':
        setSelectedSet(HGSSData);
        break;
      case 'Black & White':
        setSelectedSet(BWData);
        break;
      case 'XY':
        setSelectedSet(XYData);
        break;
      case 'Sun & Moon':
        setSelectedSet(SMData);
        break;
      case 'Sword & Shield':
        setSelectedSet(SSData);
        break;
      case 'Scarlet & Violet':
        setSelectedSet(SVData);
        break;
      case 'Pokemon Promos':
        setSelectedSet(PromoData);
        break;
      case 'Misc. Sets':
        setSelectedSet(OtherData);
        break;
      default:
        setSelectedSet(null);
    }
    setShowInitialSets(false);
  };

  const handleBackClick = () => {
    setShowInitialSets(true);
    setSelectedSet(null);
    setSelectedExpansion(null);
  };

  const handleSetBackClick = () => {
    setSelectedExpansion(null);
   setIsViewingSet(false)
  };

  const handleExpansionClick = (set) => {
    setSelectedExpansion(set);
    handleViewSet(set.image)
  };

  const getCardCount = (setId) => {
    return mainCollection.filter(card => card.setId === setId).length;
  };
  
  const stripeAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

  return (
    <Box>
      {showInitialSets ? (
        <Grid container spacing={2}>
          {modalData.map((set) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={set.id}>
              <Card sx={{ backgroundColor: 'rgb(255,255,255,0.1)', padding: '40px' }}>
                <CardActionArea onClick={() => handleSetClick(set.name)}>
                  <CardMedia component="img" height="75" image={set.image} alt={set.name} sx={{ objectFit: 'contain', backgroundColor: 'transparent' }} />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : selectedExpansion ? (
        <SetDetails set={selectedExpansion} handleSetBackClick={handleSetBackClick} mainCollection={mainCollection} />
      ) : (
        <Box>
          <Button onClick={handleBackClick} variant="contained" color="primary" sx={{ marginBottom: '20px' }}>
            Back
          </Button>
          <Grid container spacing={2}>
            {selectedSet.map((item) => {
              const cardCount = getCardCount(item.setId);
              const percentage = (cardCount / item.total) * 100;
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Card sx={{ backgroundColor:'rgb(255,255,255,0.1)', paddingY: '20px', paddingX: '5px', margin: 'auto', width: isMobile ? '100%' : '90%' }}>
                    <CardActionArea onClick={() => handleExpansionClick(item)}>
                      <CardMedia component="img" height="50" image={item.image} alt={item.name} sx={{ objectFit: 'contain', backgroundColor: 'transparent' }} />
                      <Box sx={{ padding: '10px' }}>
                        <Typography sx={{ textAlign: 'center', color:'white' }}>{item.name}</Typography>
                        <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%', marginTop: '20px' }}>
                          <LinearProgress variant="determinate" value={percentage} sx={{ width: '100%', height: '30px', backgroundColor:'white', borderRadius: '25px', '& .MuiLinearProgress-bar': {
                            backgroundColor: 'rgb(100,255,100)', // Change the progress bar color to green
                            backgroundImage: 'linear-gradient(45deg, rgba(100,255,100,0.5) 25%, transparent 25%, transparent 100%, rgba(100,255,100,0.5) 50%, rgba(100,255,100,0.5) 75%, transparent 75%, transparent)',
                            backgroundSize: '1rem 1rem',
                            animation: `${stripeAnimation} 1s linear infinite`,
                          }, }} />
                          <Typography
                            variant="body2"
                            color="black"
                            sx={{
                              fontSize: '.8rem',
                              position: 'absolute',
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}>
                            {percentage.toFixed()}%
                          </Typography>
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </Box>
  );
}