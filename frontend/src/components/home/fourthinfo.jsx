import { Box, Typography } from "@mui/material";
import fourthimage from '../../assets/firstinfoimage.jpg';

export default function InfoBox4() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '0px' }}>
            <Box sx={{
                width: '96vw',
                height: '500px',
                textAlign: 'center',
                backgroundColor: 'rgb(200, 200, 200)',
                '@media (max-width: 1200px)': {
                    height: 'auto',
                    padding: '20px'
                }
            }}>
                <Box sx={{
                    backgroundColor: 'rgb(200, 200, 200)',
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
                        <h2 className="poppins-regular">Extra Info</h2>
                        <span className="poppins-regular">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec auctor ex. Donec efficitur libero ac pulvinar interdum. Cras sodales feugiat ligula, at elementum libero congue vel. Nam non neque orci. Pellentesque habitant morbe lectus vulputate luctus.</span>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}