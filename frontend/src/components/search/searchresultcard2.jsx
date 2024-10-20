import { Card, CardMedia, Typography, ButtonBase, Box } from '@mui/material';

export default function SearchResultCard2({ name, price, image, onClick, cardId, setName}) {
    return (
        <ButtonBase onClick={onClick} sx={{ display: 'block', textAlign: 'initial', width: '115%' }}>
            <Box sx={{ width: '350px', height: '270px', backgroundColor: 'rgb(255,255,255,0.8)', display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', backdropFilter: 'blur(20px)', borderRadius:'10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)' }}>
                <Card sx={{borderRadius:"10px", width: '200px', height: 'auto', backgroundColor: 'transparent', boxShadow: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {image && (
                        <CardMedia
                            component="img"
                            image={image}
                            alt={name}
                            sx={{ height: '250px', width: '90%', borderRadius:'10px' }}
                        />
                    )}
                </Card>
                <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'space-around', width:'30%', padding: ' 20px' }}>
                    
                    <Typography sx={{ fontSize: '20px' }}><span className='poppins-regular'>{name}</span></Typography>
                    <Typography sx={{ fontSize: '14px', marginBottom: '25px'  }}><span className='poppins-regular'>#{cardId} </span></Typography>
                    <Typography sx={{ fontSize: '14px',marginBottom: '25px' }}><span className='poppins-regular'>Set: {setName}</span></Typography>
                    <Typography sx={{ fontSize: '14px' }}><span className='poppins-regular'>Market Price:  </span></Typography>
                    <Typography sx={{ fontSize: '20px' }}><span className='poppins-regular'> {price} </span></Typography>
                </Box>
            </Box>
        </ButtonBase>
    );
}