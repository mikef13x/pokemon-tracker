import { Box, Typography } from "@mui/material";
import firstimage from '../../assets/firstinfoimage.jpg';

export default function InfoBox3() {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                <Box sx={{ marginTop: '50px', width: '96vw', height: '500px', textAlign: 'center', backgroundColor: 'rgb(90, 134, 163)' }}>
                   
                    <Box sx={{backgroundColor: 'rgb(90, 134, 163)', display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', padding: '50px' }}>
                        <Typography sx={{ color: 'black', textAlign: 'center', marginRight: '200px', fontSize: '24px', maxWidth: '900px' }}>

                        <h2 className="poppins-regular" style={{  }}>Other Info</h2>                            <span className="poppins-regular">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec auctor ex. Donec efficitur libero ac pulvinar interdum. Cras sodales feugiat ligula, at elementum libero congue vel. Nam non neque orci. Pellena vel semper. Aliquam congue lorem justo, in congue lectus vulputate luctus.</span>
                        </Typography>
                        <img src={firstimage} alt="pricechart" style={{ maxWidth: '100%', height: '400px' }} />
                    </Box>
                </Box>
            </Box>
        </>
    );
}