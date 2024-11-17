import {
  Box,
  Select,
  Grid,
  MenuItem,
  CircularProgress,
  FormControl,
  IconButton,
  TextField,
  InputLabel,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Pagination,
  PaginationItem,
  Divider
} from '@mui/material';
import FilterModal from './searchfilter';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useRef, useEffect } from 'react';
import SearchWrapper2 from './searchwrapper2';
import SearchWrapper from './searchwrapper';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useLazyQuery } from '@apollo/client';
import { GET_CARDS_BY_SET, GET_CARDS_BY_NAME } from '../../utils/queries';
import { modalData, WOTCData, EXData, DPData, POPData, PlatinumData, HGSSData, BWData, XYData, SMData, SSData, SVData, PromoData, OtherData } from '../../assets/set-data/set-data';
import { keyframes } from "@emotion/react";
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { containerInfo, itemInfo } from '../../utils/framerMotion';
import {motion} from 'framer-motion'
import { select } from 'framer-motion/client';


export default function MainSearch() {
  const [sortOrder, setSortOrder] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false)
  const [currentModalData, setCurrentModalData] = useState(modalData);
  const [title, setTitle] = useState('All Pokemon Sets');
  const [isGridView, setIsGridView] = useState(true);
  const [isInitialState, setIsInitialState] = useState(true);
  const [fetchedSetData, setFetchedData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();
  const [searchValue, setSearchValue] = useState(' ');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [currentSetModal, setCurrentSetModal] = useState('')

  const navigate = useNavigate();
  const wrapperRef = useRef(null)
  const itemsPerPage = 30;
  const [selectedSets, setSelectedSets] = useState([]);
  const [selectedCardTypes, setSelectedCardTypes] = useState([]);
  // const [selectedYears, setSelectedYears] = useState([]);
  // const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState([]);
  const [selectedSubtype, setSelectedSubtype] = useState([]);
  const [selectedRarity, setSelectedRarity] = useState([]);
  const [selectedPokemonType, setSelectedPokemonType] = useState([]);
  const [applyFilters, setApplyFilters] = useState(false);
  const [filtersCleared, setFiltersCleared] = useState(false);

  const [isSetModalSearch, setIsSetModalSearch] = useState(false);
  const [animateSearch, setAnimateSearch] = useState(false);
  const [animationKey, setAnimationKey] = useState(Date.now()); // Unique key for animation
  
  const handleSetsChange = (newSets) => setSelectedSets(newSets);
  const handleCardTypesChange = (newCardTypes) => setSelectedCardTypes(newCardTypes);
  const handlePokemonTypeChange = (newPokemonType) => setSelectedPokemonType(newPokemonType);
  const handleArtistChange = (newArtist) => setSelectedArtist(newArtist);
  const handleRarityChange = (newRarity) => setSelectedRarity(newRarity);
  const handleSubtypeChange = (newSubtype) => setSelectedSubtype(newSubtype);

  const handleCardClick = (card) => {
    navigate(`/market/${card.cardId}`, {
      state: {
        from: location.pathname,
        searchValue,
        currentPage,
        sortOrder,
        isGridView,
        fetchedSetData,
        selectedImage,
        selectedSets,
        selectedCardTypes,
        selectedArtist,
        selectedSubtype,
        selectedRarity,
        selectedPokemonType,
      },
    });
  };

  useEffect(() => {
    if (location.state) {
      setSearchValue(location.state.searchValue || ' ');
      setCurrentPage(location.state.currentPage || 1);
      setSortOrder(location.state.sortOrder || '');
      setIsGridView(location.state.isGridView || true);
      setFetchedData(location.state.fetchedSetData || []);
      setSelectedImage(location.state.selectedImage || null);
      setSelectedSets(location.state.selectedSets || []);
      setSelectedCardTypes(location.state.selectedCardTypes || []);
      setSelectedArtist(location.state.selectedArtist || []);
      setSelectedSubtype(location.state.selectedSubtype || []);
      setSelectedRarity(location.state.selectedRarity || []);
      setSelectedPokemonType(location.state.selectedPokemonType || []);
      setSearchInitiated(true);
      setAnimateSearch(true)
    }
  }, [location.state]);



  const [getCardsBySet, { loading, data, error }] = useLazyQuery(
    GET_CARDS_BY_SET,
    {
      onCompleted: (data) => {
        setFetchedData(data.getCardsBySet); // Update the state with the fetched data
      },
      onError: (error) => {
        console.error('Error fetching data:', error);
      },
    }
  );

  const [
    getCardsByName,
    { loading: loadingName, data: dataName, error: errorName },
  ] = useLazyQuery(GET_CARDS_BY_NAME, {
    onCompleted: (data) => {
      setFetchedData(data.getCardsByName); // Update the state with the fetched data
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
    },
  });

  useEffect(() => {
    if (location.state && location.state.artist) {
      setSelectedArtist([location.state.artist]);
      getCardsByName({ variables: { name: searchValue, filters: {artist: location.state.artist } }});
    }
  }, [location.state, getCardsByName]);

  useEffect(() => {
    if (location.state && location.state.setId) {
      setSelectedSets([location.state.setId]);
      getCardsByName({ variables: { name: searchValue, filters: {setId: location.state.setId } }});
    }
  }, [location.state, getCardsByName]);


  const handleSetClick = (event) => {
    const setId = event.currentTarget.getAttribute('data-setid');
    const setImage = event.currentTarget.getAttribute('data-image');
    setCurrentSetModal(setId)
    setAnimateSearch(true)
    handleModalClose();
    setAnimationKey(Date.now());
    setFetchedData([]);
    setIsSetModalSearch(true);
    setSelectedSets([setId]);
    setCurrentPage(1);
    setSelectedImage(setImage);
    setSearchInitiated(true)

    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll the wrapper element to the top
    }
    setTimeout(() => {
      if (!setId) {
        console.error('setId is null or undefined');
        return;
      }
      const filters = {};

      if (selectedCardTypes && selectedCardTypes.length > 0) {
        filters.cardType = selectedCardTypes;
      }
      if (selectedPokemonType && selectedPokemonType.length > 0) {
        filters.pokemonType = selectedPokemonType;
      }
      if (selectedArtist && selectedArtist.length > 0) {
        filters.artist = selectedArtist;
      }
      if (selectedRarity && selectedRarity.length > 0) {
        filters.rarity = selectedRarity;
      }
      if (selectedSubtype && selectedSubtype.length > 0) {
        filters.subType = selectedSubtype;
      }
      setSearchInitiated(true);
      getCardsBySet({variables: {setId: setId, filters:filters}})
     }, 400)
  };

  const sortedData = fetchedSetData.slice().sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.releaseDate - b.releaseDate;
    } else if (sortOrder === 'dsc') {
      return b.releaseDate - a.releaseDate;
    } else if (sortOrder === 'priceDSC') {
      return b.prices.raw - a.prices.raw;
    } else if (sortOrder === 'priceASC') {
      return a.prices.raw - b.prices.raw;
    } else {
      return a.releaseDate - b.releaseDate;
    }
  });
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1)
    setAnimationKey(Date.now());
    
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll the wrapper element to the top
    }
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleFilterOpen = () => {
    setShowFilter(true)
  }
  const handleFilterClose = () => {
    setShowFilter(false);
  };

  const handleFilterApply = () => {
    setCurrentPage(1)
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll the wrapper element to the top
    }
    if (isSetModalSearch && selectedSets.length <= 1) {
      setTimeout(() => {
        const filters = {};
        if (selectedCardTypes && selectedCardTypes.length > 0) {
          filters.cardType = selectedCardTypes;
        }
        if (selectedPokemonType && selectedPokemonType.length > 0) {
          filters.pokemonType = selectedPokemonType;
        }
        if (selectedArtist && selectedArtist.length > 0) {
          filters.artist = selectedArtist;
        }
        if (selectedRarity && selectedRarity.length > 0) {
          filters.rarity = selectedRarity;
        }
        if (selectedSubtype && selectedSubtype.length > 0) {
          filters.subType = selectedSubtype;
        }
        setSearchInitiated(true);
        getCardsBySet({variables: {setId: currentSetModal, filters:filters}})
      }, 400);
    } else {
      handleSearchButtonClick();
    }
    setShowFilter(false);
  };

  useEffect(() => {
    if (applyFilters) {
      setApplyFilters(false);
      handleFilterApply();
      handleFilterClose();
    }
  }, [applyFilters]);

  const handleApplyClick = () => {
    setApplyFilters(true);
  };

  const handleClearFilters = () => {
    setSelectedSets([]);
    setSelectedCardTypes([]);
    setSelectedArtist([]);
    setSelectedPokemonType([]);
    setSelectedSubtype([]);
    setSelectedRarity([])
    setFiltersCleared(true);
  };

  useEffect(() => {
    if (filtersCleared) {
      handleFilterApply();
      setFiltersCleared(false);
    }
  }, [filtersCleared]);
  

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentModalData(modalData);
    setTitle('All Pokemon Sets');
    setIsInitialState(true);
  };
  const handleButtonClick = (newData, newTitle) => {
    setIsInitialState(false);
    setCurrentModalData(newData);
    setTitle('All Pokemon Sets');
    setTitle(newTitle);
  };
  const handleBackButtonClick = () => {
    // Logic to go back to the previous state
    setIsInitialState(true);
    setCurrentModalData(modalData); // Reset to initial modal data
    setTitle('All Pokemon Sets');
  };


  const handleSearchButtonClick = () => {
    setCurrentPage(1);
    setSelectedImage(null);
    setAnimateSearch(true);
    setAnimationKey(Date.now());
    setFetchedData([]);
    setIsSetModalSearch(false);
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll the wrapper element to the top
    }
    setTimeout(() => {
      const filters = {};
      if (selectedSets && selectedSets.length > 0) {
        filters.setId = selectedSets;
      }
      if (selectedCardTypes && selectedCardTypes.length > 0) {
        filters.cardType = selectedCardTypes;
      }
      if (selectedPokemonType && selectedPokemonType.length > 0) {
        filters.pokemonType = selectedPokemonType;
      }
      if (selectedArtist && selectedArtist.length > 0) {
        filters.artist = selectedArtist;
      }
      if (selectedRarity && selectedRarity.length > 0) {
        filters.rarity = selectedRarity;
      }
      if (selectedSubtype && selectedSubtype.length > 0) {
        filters.subType = selectedSubtype;
      }
      setSearchInitiated(true);
      getCardsByName({
        variables: {
          name: searchValue,
          filters: filters       
        },
      }).finally(() => {
        // Any additional logic after the search is complete
      });
    }, 400); // 2 seconds delay
  };


  const handleSearchChange = (event) => {
    if (event.target.value){
      setSearchValue(event.target.value);
    } else if (!event.target.value){
      setSearchValue(' ')
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      setCurrentPage(1);
      setSelectedImage(null);
      setAnimateSearch(true);
      setAnimationKey(Date.now());
      setFetchedData([]);
      setIsSetModalSearch(false);
      if (wrapperRef.current) {
        wrapperRef.current.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll the wrapper element to the top
      }
      
      setTimeout(() => {
        setSearchInitiated(true);
        const filters = {};
        if (selectedSets && selectedSets.length > 0) {
          filters.setId = selectedSets;
        }
        if (selectedCardTypes && selectedCardTypes.length > 0) {
          filters.cardType = selectedCardTypes;
        }
        if (selectedPokemonType && selectedPokemonType.length > 0) {
          filters.pokemonType = selectedPokemonType;
        }
        if (selectedArtist && selectedArtist.length > 0) {
          filters.artist = selectedArtist;
        }
        if (selectedRarity && selectedRarity.length > 0) {
          filters.rarity = selectedRarity;
        }
        if (selectedSubtype && selectedSubtype.length > 0) {
          filters.subType = selectedSubtype;
        }
        setSearchInitiated(true);
        getCardsByName({
          variables: {
            name: searchValue,
            filters: filters       
          },
        }).finally(() => {
          // Any additional logic after the search is complete
        });
      }, 400); // 2 seconds delay
    }
  };


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    setAnimationKey(Date.now());
  };
  const pulse = keyframes`
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.04);
  }
`;

//   const slideUp = keyframes`
//   from {
//     transform: translateY(0vh);
//   }
//   to {
//     transform: translateY(-31.7vh);
//   }
// `;

const slideUp = keyframes`
  from {
    transform: translateY(35vh);
  }
  to {
    transform: translateY(0);
  }
`;
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  

  return (
    <>
      <Paper sx={{ paddingTop: '80px', height: '100px', backgroundColor: 'transparent', boxShadow: 'none', }}>
        <FormControl sx={{ minWidth: 120, backgroundColor: 'white', marginTop: '20px', marginLeft: '50px', }} >
          <InputLabel id="sort-label">
            <span className="tiny5-regular">Sort</span>
          </InputLabel>
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
        {selectedImage ? (
          <Button onClick={handleModalOpen}
            sx={{ padding: 0, minWidth: 'auto', marginLeft: '20px', marginTop: '20px' }} >
            <img
              src={selectedImage}
              alt="Selected Set"
              style={{ width: '120px', height: '55px', objectFit: 'contain' }}
            />
          </Button>
        ) : (
          <Button
            onClick={handleModalOpen}
            color="primary"
            sx={{
              backgroundColor: 'rgba(255,255,255)', color: 'black', marginLeft: '20px', width: '120px', height: '55px',
              backdropFilter: 'blur(5px)', marginTop: '20px',
            }}>
            <span className="tiny5-regular">Search by Set</span>
          </Button>
        )}



        {searchInitiated ? (
          <>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', marginTop: '-20px' }}>

<Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', marginLeft: '240px', animation: animateSearch ? `${slideUp} 0.5s ease-out forwards` : 'none', position: animateSearch ? 'relative' : 'absolute', top: animateSearch ? '0' : '50vh', transform: animateSearch ? 'translateY(0)' : 'translateY(-50%)' }}  >
                <TextField
                  variant="outlined"
                  placeholder="Search for a card..."
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  sx={{ marginBottom: '20px', width: '40vw', backgroundColor: 'white', }}
                  inputProps={{
                    className: 'poppins-regular', // Add the class to the input element
                  }}
                />
                <Button sx={{ width: '60px', height: '60px', borderRadius: '50%', color: 'black', background: 'linear-gradient(to bottom, red 50%, white 50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid black', marginLeft: '20px', }}
                  onClick={handleSearchButtonClick}
                  // disabled={searchValue.trim().length === 0}
                >
                  <span className="tiny5-regular">Go</span>
                </Button>
              </Box>


              <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '50px', marginBottom: '18px', }} >
                <IconButton
                  onClick={() => setIsGridView(true)}
                  sx={{ marginRight: '5px' }}    >
                  <ViewModuleIcon
                    sx={{ fontSize: 40 }}
                    color={isGridView ? 'primary' : 'inherit'}
                  />
                </IconButton>
                <IconButton onClick={() => setIsGridView(false)}>
                  <ViewListIcon
                    sx={{ fontSize: 40 }}
                    color={!isGridView ? 'primary' : 'inherit'}
                  />
                </IconButton>
                <IconButton
                  onClick={handleFilterOpen}
                  color="primary"
                  sx={{
                    backgroundColor: 'rgba(255,255,255, 0)', color: 'black', marginLeft: '20px', width: '55px', height: '55px',
                    backdropFilter: 'blur(5px)',
                  }}
                >
                  <FilterListIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </Box>

            </Box>
          </>
        ) : (

          <>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', marginTop: '-20px' }}>

<Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', marginLeft: '250px', animation: animateSearch ? `${slideUp} 0.5s ease-out forwards` : 'none', position: animateSearch ? 'relative' : 'absolute', top: animateSearch ? '0' : '50vh', transform: animateSearch ? 'translateY(0)' : 'translateY(-50%)' }}  >
              <TextField
                variant="outlined"
                placeholder="Search for a card..."
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                sx={{ marginBottom: '20px', width: '40vw', backgroundColor: 'white', }}
                inputProps={{
                  className: 'poppins-regular', // Add the class to the input element
                }}
              />
              <Button sx={{ width: '60px', height: '60px', borderRadius: '50%', color: 'black', background: 'linear-gradient(to bottom, red 50%, white 50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid black', marginLeft: '20px' }}
                onClick={handleSearchButtonClick}
                // disabled={searchValue.trim().length === 0}
              >
                <span className="tiny5-regular">Go</span>
              </Button>
          


            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '50px', marginBottom: '18px', }} >
            <IconButton
              //  disabled={true}
                onClick={handleFilterOpen}
                color="primary"
                sx={{
                  backgroundColor: 'rgba(255,255,255, 0)', color: 'white', marginLeft: '20px', width: '55px', height: '55px',
                  backdropFilter: 'blur(5px)',
                }}
              >
                <FilterListIcon sx={{ fontSize: 40, color:'rgb(0,0,0,1)' }}  />
              </IconButton>
              <IconButton
                onClick={() => setIsGridView(true)}
                sx={{ marginRight: '5px' }}   disabled={true}  >
                 
                <ViewModuleIcon
                   sx={{ fontSize: 40, color:'rgb(0,0,0,0)' }} 
                  color={isGridView ? 'primary' : 'inherit'}
                />
              </IconButton>
              <IconButton onClick={() => setIsGridView(false)}  disabled={true}>
                <ViewListIcon
                  sx={{ fontSize: 40, color:'rgb(0,0,0,0)' }} 
                  color={!isGridView ? 'primary' : 'inherit'}
                  disabled={true}
                />
              </IconButton>
            
            </Box>
            </Box>
          </Box>
        </>
        )}




<Dialog
          open={showModal}
          onClose={handleModalClose}
          maxWidth="md"
          fullWidth
          
      
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', backgroundColor:'rgb(40,40,40)' }} >
            {!isInitialState && (
              <Button onClick={handleBackButtonClick} color="primary">
                Back
              </Button>
            )}
            <DialogTitle sx={{ textAlign: 'center', flex: 1, marginRight: isInitialState ? '0px' : '64px', color:'white' }} >
              {title}
            </DialogTitle>
          </Box>
          <Divider sx={{ backgroundColor: 'white', height: '0px', width: '100%' }} />
          <DialogContent sx={{backgroundColor:'rgb(40,40,40)', color: 'white'}}>
            {loading && <CircularProgress />}
            {error && (
              <Typography color="error">Error: {error.message}</Typography>
            )}

            <Grid container spacing={2}>
              {currentModalData.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <Button sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', height: '100px', textAlign: 'center', textTransform: 'none', color:'white' }}
                    onClick={(event) => {
                      if (item.name === 'WOTC') {
                        handleButtonClick(WOTCData, 'WOTC Sets');
                      } else if (item.name === 'EX Series') {
                        handleButtonClick(EXData, 'EX Series Sets');
                      } else if (item.name === 'Diamond & Pearl') {
                        handleButtonClick(DPData, 'Diamond & Pearl');
                      } else if (item.name === 'POP Series') {
                        handleButtonClick(POPData, 'POP Series');
                      } else if (item.name === 'Platinum') {
                        handleButtonClick(PlatinumData, 'Platinum');
                      } else if (item.name === 'HeartGold & SoulSilver') {
                        handleButtonClick(HGSSData, 'HeartGold & SoulSilver');
                      } else if (item.name === 'Black & White') {
                        handleButtonClick(BWData, 'Black & White');
                      } else if (item.name === 'XY') {
                        handleButtonClick(XYData, 'XY');
                      } else if (item.name === 'Sun & Moon') {
                        handleButtonClick(SMData, 'Sun & Moon');
                      } else if (item.name === 'Sword & Shield') {
                        handleButtonClick(SSData, 'Sword & Shield');
                      } else if (item.name === 'Scarlet & Violet') {
                        handleButtonClick(SVData, 'Scarlet & Violet');
                      } else if (item.name === 'Pokemon Promos') {
                        handleButtonClick(PromoData, 'Pokemon Promos');
                      } else if (item.name === 'Misc. Sets') {
                        handleButtonClick(OtherData, 'Miscellaneous Sets');
                      } else {
                        handleSetClick(event);
                      }
                    }}
                    data-setid={item.setId}
                    data-image={item.image}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '130px', height: '60px', objectFit: 'contain', }} />
                    <Typography
                      variant="button"
                      sx={{ flex: 1, fontSize: '10px', textTransform: 'none', color: 'white' }} >
                      {item.name}
                    </Typography>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <Divider sx={{ backgroundColor: 'white', height: '0px', width: '100%' }} />
          <DialogActions sx={{ justifyContent: 'center', backgroundColor:'rgb(40,40,40)' }}>
            <Button
              sx={{ textAlign: 'center' }}
              onClick={handleModalClose}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <FilterModal
        open={showFilter}
        onClose={handleFilterClose}
        selectedSets={selectedSets}
        handleSetsChange={handleSetsChange}
        handleFilterClose={handleFilterClose}
        handleApplyClick={handleApplyClick}
        selectedCardTypes={selectedCardTypes}
        handleCardTypesChange={handleCardTypesChange}
        handleClearFilters={handleClearFilters}
        handleArtistChange={handleArtistChange}
        handleSubtypeChange={handleSubtypeChange}
        handleRarityChange={handleRarityChange}
        handlePokemonTypeChange={handlePokemonTypeChange}
        selectedPokemonType={selectedPokemonType}
        selectedSubtype={selectedSubtype}
        selectedRarity={selectedRarity}
        selectedArtist={selectedArtist}
      />

      </Paper>
      {searchInitiated ? (
        <>
          <Typography sx={{ textAlign: 'center', fontSize: '24px', padding: '20px', color: 'white', }} >
            {`${sortedData.length} results`}
          </Typography>
          <Box
            ref={wrapperRef}
            sx={{ marginTop: '0px', height: '70vh', width: '100vw', flexDirection: 'column', overflowY: 'auto', padding: '0px', }} >
            {sortedData.length === 0 ? (
              <Typography sx={{ textAlign: 'center', fontSize: '34px', padding: '20px', color: 'white', marginTop: '20px' }} >
                {/* We could not find anything, please try again */}
              </Typography>
            ) : (
              <>
                {isGridView ? (
                   <motion.div
                  key={animationKey}
                   variants={containerInfo}
                   initial="hidden"
                   animate="visible"
                 >
                  <SearchWrapper2 sortedData={paginatedData} handleCardClick={handleCardClick} />
                  </motion.div>
                ) : (
                  <SearchWrapper sortedData={paginatedData} handleCardClick={handleCardClick} />
                )}

                {sortedData.length > 30 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '-40px' }}>
                    <Box sx={{ minWidth: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '8px' }}>
                      <IconButton
                        onClick={(event) => handlePageChange(event, Math.max(currentPage - 10, 1))}
                        disabled={currentPage <= 10}
                      >
                        <ArrowBack />
                      </IconButton>
                      <Pagination
                        count={Math.ceil(sortedData.length / itemsPerPage)}
                        page={currentPage}
                        onChange={(event, value) => {
                          handlePageChange(event, value);
                          if (wrapperRef.current) {
                            wrapperRef.current.scrollTo({ top: 0, behavior: 'auto' }); // Scroll the wrapper element to the top
                          }
                        }}
                        color="primary"
                        renderItem={(item) => (
                          <PaginationItem
                            {...item}
                            onClick={(event) => {
                              if (item.type === 'first') {
                                handlePageChange(event, Math.max(currentPage - 10, 1));
                              } else if (item.type === 'last') {
                                handlePageChange(event, Math.min(currentPage + 10, Math.ceil(sortedData.length / itemsPerPage)));
                              } else {
                                handlePageChange(event, item.page);
                              }
                              if (wrapperRef.current) {
                                wrapperRef.current.scrollTo({ top: 0, behavior: 'auto' }); // Scroll the wrapper element to the top
                              }
                            }}
                          />
                        )}
                      />
                      <IconButton
                        onClick={(event) => handlePageChange(event, Math.min(currentPage + 10, Math.ceil(sortedData.length / itemsPerPage)))}
                        disabled={currentPage >= Math.ceil(sortedData.length / itemsPerPage) - 10}
                      >
                        <ArrowForward />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '70vh', width: '100%', marginTop: '-200px' }}>
          <Typography sx={{
            fontSize: '50px',
            color: 'white',
            textShadow: '-2px 0 0 black, 0 2px 0 black, -2px 2px 0 black',
            textAlign: 'center',
            animation: `${pulse} 0.7s steps(2, end) infinite`,
            transformOrigin: 'bottom',
            display: animateSearch ? 'none' : ''
          }}>
            <span className='poppins-regular'>Start a search to begin...</span>
          </Typography>

        </Box>
      )}
    </>
  )
}