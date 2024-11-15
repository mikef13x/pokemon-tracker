import { Box, Typography } from "@mui/material";
import fourthimage from '../../assets/firstinfoimage.jpg';

export default function InfoBox2() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '0px' }}>
            <Box sx={{
                width: '96vw',
                height: '500px',
                textAlign: 'center',
                backgroundColor: 'rgb(130, 174, 203)',
                '@media (max-width: 1200px)': {
                    height: 'auto',
                    padding: '20px'
                }
            }}>
                <Box sx={{
                    backgroundColor: 'rgb(130, 174, 203)',
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '50px',
                    '@media (max-width: 1200px)': {
                        flexDirection: 'column',
                        padding: '20px'
                    }
                }}>
                    <Box component="img" src={fourthimage} alt="extra info" sx={{
                        maxWidth: '100%',
                        height: '400px',
                        '@media (max-width: 1200px)': {
                            display: 'none'
                        }
                    }} />
                    <Typography sx={{
                        color: 'black',
                        textAlign: 'center',
                        marginLeft: '200px',
                        fontSize: '24px',
                        maxWidth: '900px',
                        '@media (max-width: 1200px)': {
                            marginLeft: '0px',
                            fontSize: '20px'
                        }
                    }}>
                        <h2 className="poppins-regular">Collection</h2>
                        <span className="poppins-regular">Our site allows you to track your collection of Pokémon cards, whether they are raw or graded. This feature is incredibly useful for keeping an organized record of what you have, helping you manage your collection efficiently. Additionally, you can share your collection with others, making it easy to showcase your prized cards to friends and fellow collectors.</span>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}