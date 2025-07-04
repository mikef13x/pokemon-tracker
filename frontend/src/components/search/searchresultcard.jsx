import { Card, CardMedia, Typography, ButtonBase, Box } from '@mui/material';

export default function SearchResultCard({ name, price, image, onClick, cardId, setName }) {
    return (
        <ButtonBase onClick={onClick} sx={{ display: 'block', textAlign: 'initial', width: '90%' }}>
            <Box sx={{ width: '100%', height: '120px', backgroundColor: 'rgb(255,255,255,0.8)', display: 'flex', alignItems: 'center', marginBottom: '0px', padding: '10px', backdropFilter: 'blur(20px)' }}>
                <Card sx={{ width: '100px', height: 'auto', backgroundColor: 'transparent', boxShadow: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {image && (
                        <CardMedia
                            component="img"
                            image={image}
                            alt={name}
                            sx={{ height: '120px', width: '100%', objectFit: 'contain', borderRadius:'8px' }}
                        />
                    )}
                </Card>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', padding: '0 20px' }}>
                    
                    <Typography sx={{ fontSize: '28px' }}><span className='poppins-regular'>{name} #{cardId}</span></Typography>
                    <Typography sx={{ fontSize: '14px' }}><span className='poppins-regular'>{setName}</span></Typography>
                    <Typography sx={{ fontSize: '28px' }}><span className='poppins-regular'>Market Price: {price} </span></Typography>
                </Box>
            </Box>
        </ButtonBase>
    );
}