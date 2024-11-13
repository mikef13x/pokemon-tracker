import { Card, CardContent, CardMedia, Typography, ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CollectionCard({ name, price, image, cardId }) {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/market/${cardId}`, {
            state: {
                from: location.pathname
            }
        })
    };


    const id = `#${cardId.split('-')[1]}`;

    return (
        <ButtonBase onClick={handleCardClick} style={{ width: '100%', display: 'block', textAlign: 'initial' }}>

            <Card style={{ borderRadius: '10px', width: '280px', height: 'auto', margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(to bottom right, rgb(200,200,200), rgb(255,255,255))' }}>
                {image && (
                    <CardMedia
                        component="img"
                        image={image}
                        alt={name}
                        style={{ height: 'auto', width: '70%', objectFit: 'contain', margin: 'auto', marginTop: '30px', borderRadius: '10px' }}
                    />
                )}
                <CardContent style={{ textAlign: 'center', color: 'black', padding: '8px' }}>
                    <Typography variant="h5" component="div" style={{ height: '48px', width: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                        <span className='poppins-regular' style={{ display: 'inline-block', maxWidth: 'calc(100% - 50px)', overflow: 'hidden', textOverflow: 'ellipsis', verticalAlign: 'bottom' }}>{name}</span>
                        &nbsp;
                        <span className='poppins-regular' style={{ display: 'inline-block', verticalAlign: 'bottom' }}>{id}</span>
                    </Typography>
                    <Typography variant="h6">
                        <span className='poppins-regular'>{price}</span>
                    </Typography>
                </CardContent>
            </Card>

        </ButtonBase>
    );
}