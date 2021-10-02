import React from 'react';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import StarIcon from '@mui/icons-material/Star';
import useRatingCount from '../hooks/useRatingCount';

function MovieCard({ movie = {}, loading }) {
    const { image, title, imDbRating, imDbRatingCount, releaseState, year, gross, worldwideLifetimeGross } = movie

    const ratingCount = useRatingCount(imDbRatingCount)

    return (
        <Card sx={{ bgcolor: 'secondary.main' }}>
            <CardActionArea>
                {
                    loading ?
                        <Skeleton variant="rectangular" animation="wave" height={200} /> :
                        <CardMedia
                            component="img"
                            height="200"
                            image={image || "/images/img_placeholder.png"}
                            alt={title}
                        />

                }
                <CardContent sx={{ bgcolor: "text.primary" }}>
                    {
                        loading ?
                            <>
                                <Skeleton height={10} animation="wave" sx={{ mb: 1, bgcolor: 'secondary.main' }} />
                                <Skeleton height={10} animation="wave" width="60%" sx={{ bgcolor: 'secondary.main' }} />
                            </>
                            :
                            <>
                                <Typography noWrap gutterBottom variant="subtitle2" sx={{ color: 'background.contrastText' }}>
                                    {title}
                                </Typography>

                                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', color: theme => theme.palette.secondary[400] }}>

                                    {
                                        (imDbRating || ratingCount) ?
                                            <>
                                                <StarIcon sx={{ mr: 0.5, mb: 0.5 }} fontSize="inherit" color="primary" />
                                                {imDbRating || '0'}
                                                {ratingCount && ` (${ratingCount})`}
                                            </> :
                                            releaseState ?
                                                releaseState.replace(/Opening this week -/i, '') + ', ' + year
                                                :
                                                gross ?
                                                    gross :
                                                    worldwideLifetimeGross

                                    }
                                </Typography>
                            </>

                    }
                </CardContent>
            </CardActionArea>
        </ Card>
    );
}

export default React.memo(MovieCard)