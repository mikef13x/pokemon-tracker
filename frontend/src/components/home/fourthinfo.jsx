import { Box, Typography } from "@mui/material";
import fourthimage from '../../assets/firstinfoimage.jpg';

export default function InfoBox4() {
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
                        <h2 className="poppins-regular">Market</h2>
                        <span className="poppins-regular">Our market page is very useful for gathering price information. Users will be able to look at current pricing and past pricing, compare prices of different grades and conditions. The page will feature a chart of data including 1 year, 6 months, 3 months, and 2 week charts, providing comprehensive insights into market trends.
                        </span>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}