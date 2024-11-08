import { Box, Typography } from "@mui/material";
import firstimage from '../../assets/firstinfoimage.jpg';

export default function InfoBox3() {
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
                        <h2 className="poppins-regular">Search Info</h2>
                        <span className="poppins-regular">With our search feature you will be able to find any Pokemon card! We have integrated many features including search by set, sorting options, and many filter options. There are many ways to discover new cards! You can find all cards from a particular artist you like, or find all fire type cards. </span>
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