import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function MovieCard({ movie: { image, title, imDbRating, imDbRatingCount } }, loading) {

    return (
        <Card >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={image || "/images/img_placeholder.png"}
                    // {`https://source.unsplash.com/random/${~~(Math.random() * 100)}`}
                    alt="green iguana"
                />
                <CardContent sx={{ bgcolor: 'common.black' }}>
                    <Typography gutterBottom variant="body1" sx={{ color: 'background.contrastText' }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: theme => theme.palette.secondary[400] }}>
                        <StarIcon sx={{ mr: 0.5 }} fontSize="small" color="warning" />
                        {imDbRating} ({Math.round(imDbRatingCount / 1000)}k)
                    </Typography>
                </CardContent>
            </CardActionArea>
        </ Card>
    );
}
