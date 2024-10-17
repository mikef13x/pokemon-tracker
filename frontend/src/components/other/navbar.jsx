import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function Navbar() {
  // const handleLogout = () => {
  //   localStorage.removeItem('id_token')
  //   window.location.reload()
  // }

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
            <span className='tiny5-regular'>PokeTrack</span>
          </Typography>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color='inherit'>
                <Typography sx={{ marginLeft: '15px', marginRight: '15px' }}>
                  <span className='tiny5-regular'>Home</span>
                </Typography>
              </Button>
            </Link>
            <Link to="/collection" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color='inherit'>
                <Typography sx={{ marginLeft: '15px', marginRight: '15px' }}>
                  <span className='tiny5-regular'>Collection</span>
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