import { Card, CardMedia, Typography, ButtonBase, Box } from '@mui/material';

export default function SearchResultCard({ title, price, image, onClick }) {
    return (
        <ButtonBase onClick={onClick} sx={{ display: 'block', textAlign: 'initial', width: '90%' }}>
            <Box sx={{ width: '100%', height: '140px', backgroundColor: 'rgb(255,255,255,0.8)', display: 'flex', alignItems: 'center', marginBottom: '0px', padding: '10px', backdropFilter: 'blur(20px)' }}>
                <Card sx={{ width: '100px', height: 'auto', backgroundColor: 'transparent', boxShadow: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {image && (
                        <CardMedia
                            component="img"
                            image={image}
                            alt={title}
                            sx={{ height: '200px', width: '100%', objectFit: 'contain' }}
                        />
                    )}
                </Card>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', padding: '0 20px' }}>
                    
                    <Typography sx={{ fontSize: '28px' }}><span className='tiny5-regular'>{title}</span></Typography>
                    <Typography sx={{ fontSize: '28px' }}><span className='tiny5-regular'>Market Price: </span>{price}</Typography>
                </Box>
            </Box>
        </ButtonBase>
    );
}