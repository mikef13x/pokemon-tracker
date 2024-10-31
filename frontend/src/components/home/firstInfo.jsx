import { Box, Typography } from "@mui/material";
import firstimage from '../../assets/firstinfoimage.jpg';

export default function InfoBox1() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '0px' }}>
            <Box sx={{
                width: '96vw',
                height: '500px',
                textAlign: 'center',
                backgroundColor: 'rgb(90, 134, 163)',
                '@media (max-width: 1200px)': {
                    height: 'auto',
                    padding: '20px'
                }
            }}>
                <Box sx={{
                    backgroundColor: 'rgb(90, 134, 163)',
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
                    <Typography sx={{
                        color: 'black',
                        textAlign: 'center',
                        marginRight: '200px',
                        fontSize: '24px',
                        maxWidth: '900px',
                        '@media (max-width: 1200px)': {
                            marginRight: '0px',
                            fontSize: '20px'
                        }
                    }}>
                        <h2 className="poppins-regular">Price info</h2>
                        <span className="poppins-regular"> Our site provides comprehensive data on Pokémon cards, whether they are raw or graded. Users can explore card values across different timelines, compare prices, and view the current market price. This allows collectors and enthusiasts to make informed decisions based on historical and real-time data.</span>
                    </Typography>
                    <Box component="img" src={firstimage} alt="extra info" sx={{
                        maxWidth: '100%',
                        height: '400px',
                        '@media (max-width: 1200px)': {
                            display: 'none'
                        }
                    }} />
                </Box>
                
            </Box>
        </Box>
    );
}