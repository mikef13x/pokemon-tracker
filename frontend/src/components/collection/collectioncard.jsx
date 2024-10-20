import { Card, CardContent, CardMedia, Typography, ButtonBase, Paper } from '@mui/material';

export default function CollectionCard({ name, price, image, onClick }) {
    return (
        <ButtonBase onClick={onClick} sx={{ width: '100%', display: 'block', textAlign: 'initial' }}>
          
                <Card sx={{ borderRadius: '10px', width: '280px', height: 'auto', margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  background: 'linear-gradient(to bottom right, rgb(200,200,200), rgb(255,255,255))' }}>
                    {image && (
                        <CardMedia
                            component="img"
                            image={image}
                            alt={name}
                            sx={{ height: 'auto', width: '70%', objectFit: 'contain', margin: 'auto', marginTop: '30px', borderRadius:'10px' }}
                        />
                    )}
                    <CardContent sx={{ textAlign: 'center', color: 'black', padding: '8px' }}>
                        <Typography variant="h5" component="div">
                            <span className='poppins-regular'>{name}</span>
                        </Typography>
                        <Typography variant="h6">
                            <span className='poppins-regular'>{price}</span>
                        </Typography>
                    </CardContent>
                </Card>
      
        </ButtonBase>
    );
}