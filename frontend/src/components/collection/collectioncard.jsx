import { Card, CardContent, CardMedia, Typography, ButtonBase } from '@mui/material';

export default function CollectionCard({ title, price, image, onClick }) {
    return (
        <ButtonBase onClick={onClick} sx={{ width: '100%', display: 'block', textAlign: 'initial' }}>
            <Card sx={{ width: '300px', height: 'auto', margin: 'auto', backgroundColor: 'transparent', boxShadow: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {image && (
                    <CardMedia
                        component="img"
                        image={image}
                        alt={title}
                        sx={{ height: 'auto', width: '100%', objectFit: 'contain' }}
                    />
                )}
                <CardContent sx={{ textAlign: 'center', color: 'white', backgroundColor: 'transparent', padding: '8px' }}>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="h6">
                        {price}
                    </Typography>
                </CardContent>
            </Card>
        </ButtonBase>
    );
}