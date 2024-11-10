import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Auth from '../../utils/auth'
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  // const handleLogout = () => {
  //   localStorage.removeItem('id_token')
  //   window.location.reload()
  // }
  const [scrollToInfo, setScrollToInfo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  function handleLogoutClick() {
    localStorage.removeItem("id_token");
    window.location.reload()
    window.location.assign('/')
  }
  const scrollToInfoBox1 = () => {
    if (location.pathname !== '/') {
      setScrollToInfo(true);
      navigate('/');
    } else {
      const element = document.getElementById('infoBox1');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (scrollToInfo && location.pathname === '/') {
      const element = document.getElementById('infoBox1');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setScrollToInfo(false);
    }
  }, [location.pathname, scrollToInfo]);
  const scrollToHome = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(55, 55, 55, 0.3)',
        }}
      >
        <Toolbar>
          <Typography sx={{ marginRight: '70px' }} variant="h6" component="div">
            <span className='tiny5-regular'>PokéTracker</span>
          </Typography>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Link to="/" onClick={scrollToHome} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color='inherit'>
                <Typography sx={{ marginLeft: '15px', marginRight: '15px' }}>
                  <span className='tiny5-regular'>Home</span>
                </Typography>
              </Button>
            </Link>
            <Link to="/#infoBox1" onClick={scrollToInfoBox1} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color='inherit' href=''>
                <Typography sx={{ marginLeft: '15px', marginRight: '15px' }}>
                  <span className='tiny5-regular'>About</span>
                </Typography>
              </Button>
            </Link>

            <Link to="/search" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color='inherit'>
                <Typography sx={{ marginLeft: '15px', marginRight: '15px' }}>
                  <span className='tiny5-regular'>Search</span>
                </Typography>
              </Button>
            </Link>
            {Auth.loggedIn() ? (
              <Link to="/collection" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color='inherit'>
                  <Typography sx={{ marginLeft: '15px', marginRight: '15px' }}>
                    <span className='tiny5-regular'>Collection</span>
                  </Typography>
                </Button>
              </Link>) : (
              <Link to="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color='inherit'>
                  <Typography sx={{ marginLeft: '15px', marginRight: '15px' }}>
                    <span className='tiny5-regular'>Collection</span>
                  </Typography>
                </Button>
              </Link>
            )}


            {Auth.loggedIn() ? (
              <Link to="/404" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color='inherit'>
                  <Typography sx={{ marginLeft: '15px', marginRight: '15px' }}>
                    <span className='tiny5-regular'>My Shop</span>
                  </Typography>
                </Button>
              </Link>) : (
              <Link to="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color='inherit'>
                  <Typography sx={{ marginLeft: '15px', marginRight: '15px' }}>
                    <span className='tiny5-regular'>My Shop</span>
                  </Typography>
                </Button>
              </Link>
            )}
            {Auth.loggedIn() ? (
              <Link to="/404" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color='inherit'>
                  <Typography sx={{ marginLeft: '15px', marginRight: '15px' }}>
                    <span className='tiny5-regular'>Discover</span>
                  </Typography>
                </Button>
              </Link>) : (
              <Link to="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color='inherit'>
                  <Typography sx={{ marginLeft: '15px', marginRight: '15px' }}>
                    <span className='tiny5-regular'>Discover</span>
                  </Typography>
                </Button>
              </Link>
            )}


            <Box sx={{ display: 'flex', ml: 'auto' }}>
              {Auth.loggedIn() ? (
                <Button color='inherit' onClick={handleLogoutClick}>
                  <Typography sx={{ right: '0px', marginLeft: '15px', marginRight: '15px' }}>
                    <span className='tiny5-regular'>Logout</span>
                  </Typography>
                </Button>
              ) : (
                <Link to="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button color='inherit'>
                    <Typography sx={{ marginLeft: '15px', marginRight: '15px' }}>
                      <span className='tiny5-regular'>Login</span>
                    </Typography>
                  </Button>
                </Link>
              )}
            </Box>


            {/* {AuthService.loggedIn() ? (
               <Button color='inherit'onClick={handleLogout}> 
                 <Typography sx={{marginLeft: '15px', marginRight: '15px'}}>
               <span className='coda-regular'>Logout</span>
               </Typography></Button> */}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}