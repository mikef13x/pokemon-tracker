import { Box, Typography, Button, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import Logo from '../../assets/newlogo.jpg';

export default function Footer() {
    return (
        <footer style={{ width: '100%', position: 'static', bottom: 0, backgroundColor: "#0f1010" }}>
            <Box sx={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                color: 'white',
                display: 'flex',
                height: '20vh',
                padding: '20px 0',
                boxSizing: 'border-box'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <Box component="img" src={Logo} alt="logo" sx={{
                        maxWidth: '200px',
                        maxHeight: '100%',
                        paddingTop: '80px',
                        '@media (max-width: 1100px)': {
                            maxWidth: '150px', // Adjust the maxWidth for smaller screens
                            paddingTop: '80px' // Adjust the padding for smaller screens
                        },
                        '@media (max-width: 600px)': {
                            maxWidth: '100px', // Adjust the maxWidth for smaller screens
                            paddingTop: '80px' // Adjust the padding for smaller screens
                        },
                       
                    }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                    <Button target="_blank" color="inherit">
                        Contact
                    </Button>
                    <Button target="_blank" color="inherit">
                        Support
                    </Button>
                    <Button color="inherit">
                        About
                    </Button>
                    <Button color="inherit">
                        Tos
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '10px' }}>
                    <IconButton href="https://www.linkedin.com/in/mikef13/" target="_blank" color="inherit">
                        <LinkedInIcon />
                    </IconButton>
                    <IconButton href="https://github.com/mikef13x" target="_blank" color="inherit">
                        <GitHubIcon />
                    </IconButton>
                    <IconButton href="mailto:mikef132044@gmail.com" color="inherit">
                        <EmailIcon />
                    </IconButton>
                </Box>
                <Typography variant="body2" sx={{ marginTop: '10px', marginBottom:"40px" }}>
                    © 2024. Created by Michael Freeman and Daniel Gomez.
                </Typography>
            </Box>
        </footer>
    );
}