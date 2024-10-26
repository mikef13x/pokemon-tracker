import { Box, Typography } from "@mui/material";
import firstimage from '../../assets/firstinfoimage.jpg';

export default function InfoBox1() {
    return (
        <>
            <Box sx={{ marginTop: '350px', width: '100vw', height: '500px', textAlign: 'center', backgroundColor: 'white' }}>
                <h1 style={{ paddingTop: '50px' }}>Price info</h1>
                <Box sx={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', padding:'50px'}}>
                    <Typography sx={{ color: 'black', textAlign: 'center', marginRight: '200px', fontSize:'24px', maxWidth:'900px' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec auctor ex. Donec efficitur libero ac pulvinar interdum. Cras sodales feugiat ligula, at elementum libero congue vel. Nam non neque orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc et turpis est. In a tortor eget libero sollicitudin volutpat. Vestibulum non euismod nisl. Pellentesque rutrum ultricies urna vel semper. Aliquam congue lorem justo, in congue lectus vulputate luctus.
                    </Typography>
                    <img src={firstimage} alt="pricechart" style={{ maxWidth: '100%', height: '260px' }} />
                </Box>
            </Box>
        </>
    );
}