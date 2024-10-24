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
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,

  

} from '@mui/material';
import FilterModal from './searchfilter';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useRef, useEffect } from 'react';
import SearchWrapper2 from './searchwrapper2';
import SearchWrapper from './searchwrapper';
import { useNavigate, useLocation } from 'react-router-dom';
// import Mudkip from '../../assets/mudkipgoldstar.jpg';
// import Groudon from '../../assets/groudongoldstar.jpg'
// import Gyarados from '../../assets/gyaradosgoldstar.jpg'
// import Lisia from '../../assets/lisiapokemon.jpeg'
// import Mewtwo from '../../assets/mewtwogoldstar.jpg'
// import Vaporeon from '../../assets/vaporeongoldstar.jpg'
// import Rayquaza from '../../assets/rayponcho.jpg'
import { useState } from 'react';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useLazyQuery } from '@apollo/client';
import { GET_CARDS_BY_SET, GET_CARDS_BY_NAME } from '../../utils/queries';
import { modalData, WOTCData, EXData, DPData, POPData, PlatinumData, HGSSData, BWData, XYData, SMData, SSData, SVData, PromoData, OtherData } from '../../assets/set-data/set-data';

import { ArrowForward, ArrowBack } from '@mui/icons-material';


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
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const navigate = useNavigate();
  const wrapperRef = useRef(null)
  const itemsPerPage = 30;
  const [selectedSets, setSelectedSets] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  
  const handleSetsChange = (event) => {
    setSelectedSets(event.target.value);
  };
  
  const handleYearsChange = (event) => {
    setSelectedYears(event.target.value);
  };
  
  const handlePricesChange = (event) => {
    setSelectedPrices(event.target.value);
  };

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
      },
    });
  };

  useEffect(() => {
    if (location.state) {
        setSearchValue(location.state.searchValue || '');
        setCurrentPage(location.state.currentPage || 1);
        setSortOrder(location.state.sortOrder || '');
        setIsGridView(location.state.isGridView || true);
        setFetchedData(location.state.fetchedSetData || []);
        setSelectedImage(location.state.selectedImage || null);
        setSearchInitiated(true);
    }
}, [location.state]);


  const [getCardsBySet, { loading, data, error }] = useLazyQuery(
    GET_CARDS_BY_SET,
    {
      onCompleted: (data) => {
        console.log('Query completed:', data);
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
      console.log('Query completed:', data);
      setFetchedData(data.getCardsByName); // Update the state with the fetched data
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
    },
  });

  const handleSetClick = (event) => {
    const setId = event.currentTarget.getAttribute('data-setid');
    const setImage = event.currentTarget.getAttribute('data-image');
    if (!setId) {
      console.error('setId is null or undefined');
      return;
    }
    console.log(`Running query for setId: ${setId}`);
    getCardsBySet({ variables: { setId } });
    setSelectedImage(setImage);
    setSearchInitiated(true)
    handleModalClose();
    setCurrentPage(1)
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll the wrapper element to the top
    }

  };

  const sortedData = fetchedSetData.slice().sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.releaseDate - b.releaseDate;
    } else if (sortOrder === 'dsc') {
      return b.releaseDate - a.releaseDate;
    } else if (sortOrder === 'priceDSC') {
      return b.price - a.price;
    } else if (sortOrder === 'priceASC') {
      return a.price - b.price;
    } else {
      return a.releaseDate - b.releaseDate;
    }
  });
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1)
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
    setSearchInitiated(true);
    setSelectedImage(null);
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll the wrapper element to the top
    }
    getCardsByName({
       variables:{
       name: searchValue ,
      setName: selectedSets,
       },
    
    }).finally(() => {
      // Any additional logic after the search is complete
    });
  };

 

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter' && searchValue.trim().length > 0) {
      handleSearchButtonClick();
      console.log('keydown search initated')
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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
         
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '-20px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', marginLeft: '220px', }}  >
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
              disabled={searchValue.trim().length === 0}
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

        <Dialog
          open={showModal}
          onClose={handleModalClose}
          maxWidth="md"
          fullWidth
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', marginTop: '20px', }} >
            {!isInitialState && (
              <Button onClick={handleBackButtonClick} color="primary">
                Back
              </Button>
            )}
            <DialogTitle sx={{ textAlign: 'center', flex: 1, marginRight: isInitialState ? '0px' : '64px', }} >
              {title}
            </DialogTitle>
          </Box>
          <DialogContent>
            {loading && <CircularProgress />}
            {error && (
              <Typography color="error">Error: {error.message}</Typography>
            )}

            <Grid container spacing={2}>
              {currentModalData.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <Button sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', height: '100px', textAlign: 'center', textTransform: 'none', }}
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
                      sx={{ flex: 1, fontSize: '10px', color: 'black', textTransform: 'none', }} >
                      {item.name}
                    </Typography>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
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
  selectedYears={selectedYears}
  handleYearsChange={handleYearsChange}
  selectedPrices={selectedPrices}
  handlePricesChange={handlePricesChange}
  handleFilterClose={handleFilterClose}
/>


      </Paper>
      <Typography sx={{ textAlign: 'center', fontSize: '24px', padding: '20px', color: 'white', }} >
        {searchInitiated ? `${sortedData.length} results` : 'Start a search to begin'}
      </Typography>
      <Box
        ref={wrapperRef}
        sx={{ marginTop: '0px', height: '70vh', width: '100vw', flexDirection: 'column', overflowY: 'auto', padding: '0px', }} >
        {searchInitiated && sortedData.length === 0 ? (
          <Typography sx={{ textAlign: 'center', fontSize: '24px', padding: '20px', color: 'white', }} >

          </Typography>
        ) : (
          <>
            {isGridView ? (
              <SearchWrapper2 sortedData={paginatedData} handleCardClick={handleCardClick} />
            ) : (
              <SearchWrapper sortedData={paginatedData} handleCardClick={handleCardClick} />
            )}


            {sortedData.length > 30 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '8px' }}>
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
            )}
          </>
        )}
      </Box>
    </>
  );
}
