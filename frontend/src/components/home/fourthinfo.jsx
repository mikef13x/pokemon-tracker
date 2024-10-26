import { Box, Typography } from "@mui/material";
import firstimage from '../../assets/firstinfoimage.jpg';

export default function InfoBox4() {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ marginTop: '50px', width: '96vw', height: '500px', textAlign: 'center', backgroundColor: 'rgb(176, 196, 209)' }}>
                    
                    <Box sx={{ backgroundColor: 'rgb(176, 196, 209)', display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', padding: '50px' }}>
                        <img src={firstimage} alt="pricechart" style={{ maxWidth: '100%', height: '400px' }} />
                        <Typography sx={{ color: 'black', textAlign: 'center', marginLeft: '200px', maxWidth: '900px', fontSize: '24px' }}>
                        <h2 className="poppins-regular" style={{  }}>Extra Info</h2>
                            <span className="poppins-regular">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec auctor ex. Donec efficitur lium ultricies urna vel semper. Aliquam congue lorem justo, in congue lectus vulputate luctus.</span>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}