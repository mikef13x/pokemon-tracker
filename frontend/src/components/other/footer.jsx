import { Box } from '@mui/material';


export default function Footer() {


    return (
        <footer style={{width:'100%', position: 'static', bottom: 0}}>
            <Box sx={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              
                color: 'white',
                display: 'flex',
                height: '5vh',
                
            }}>
                © 2024. Created by Michael Freeman and Daniel Gomez.
            </Box>
        </footer>
    );
}