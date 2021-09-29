import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function ActionAreaCard({ image, title = "Terminator (2011)", rating }) {
    return (
        <Card sx={{ width: 200 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={`https://source.unsplash.com/random/${~~(Math.random() * 100)}`}
                    alt="green iguana"
                />
                <CardContent sx={{ bgcolor: 'common.black' }}>
                    <Typography gutterBottom variant="body1" sx={{ color: 'background.contrastText' }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: theme => theme.palette.secondary[400] }}>
                        <StarIcon sx={{ mr: 0.5 }} fontSize="small" color="warning" />
                        9.7 (152)
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
