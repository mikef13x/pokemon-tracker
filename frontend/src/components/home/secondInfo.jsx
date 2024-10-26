import { Box, Typography } from "@mui/material";
import firstimage from '../../assets/firstinfoimage.jpg';

export default function InfoBox2() {
    return (
        <>
            <Box sx={{ marginTop: '20px', width: '100vw', height: '500px', textAlign: 'center', backgroundColor: 'white' }}>
                <h1 style={{ paddingTop: '50px' }}>Collection Info</h1>
                <Box sx={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', padding:'50px'}}>
                <img src={firstimage} alt="pricechart" style={{ maxWidth: '100%', height: '260px' }} />
                    <Typography sx={{ color: 'black', textAlign: 'center', marginLeft: '200px', maxWidth:'900px', fontSize:'24px' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec auctor ex. Donec efficitur libero ac pulvinar interdum. Cras sodales feugiat ligula, at elementum libero congue vel. Nam non neque orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc et turpis est. In a tortor eget libero sollicitudin volutpat. Vestibulum non euismod nisl. Pellentesque rutrum ultricies urna vel semper. Aliquam congue lorem justo, in congue lectus vulputate luctus.
                    </Typography>
                 
                </Box>
            </Box>
        </>
    );
}