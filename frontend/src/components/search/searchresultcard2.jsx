import { Card, CardMedia, Typography, ButtonBase, Box } from '@mui/material';

export default function SearchResultCard2({ title, price, image, onClick }) {
    return (
        <ButtonBase onClick={onClick} sx={{ display: 'block', textAlign: 'initial', width: '90%' }}>
            <Box sx={{ width: '100%', height: '300px', backgroundColor: 'rgb(255,255,255,0.8)', display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', backdropFilter: 'blur(20px)', borderRadius:'10px' }}>
                <Card sx={{borderRadius:"10px", width: '180px', height: 'auto', backgroundColor: 'transparent', boxShadow: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {image && (
                        <CardMedia
                            component="img"
                            image={image}
                            alt={title}
                            sx={{ height: '250px', width: '100%' }}
                        />
                    )}
                </Card>
                <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'space-around', width:'10%', padding: '0 20px' }}>
                    
                    <Typography sx={{ fontSize: '20px', marginBottom: '100px' }}><span className='poppins-regular'>{title}</span></Typography>
                    <Typography sx={{ fontSize: '20px' }}><span className='poppins-regular'>Market Price: {price} </span></Typography>
                </Box>
            </Box>
        </ButtonBase>
    );
}