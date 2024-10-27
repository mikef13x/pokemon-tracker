import { Box, Typography, Button, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';


export default function Footer() {


    return (
        <footer style={{width:'100%', position: 'static', bottom: 0}}>
 <Box sx={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
               flexDirection:'column',
                color: 'white',
                display: 'flex',
                height: '13vh',
                
            }}>
            <Box sx={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection:'row',
                color: 'white',
                display: 'flex',
                height: '5vh',
                
            }}>
                
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
                    <div style={{marginTop:'20px'}}>
                    © 2024. Created by Michael Freeman and Daniel Gomez.
                    </div>
         </Box>
        </footer>
    );
}