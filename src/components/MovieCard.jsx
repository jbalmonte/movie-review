import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import StarIcon from '@mui/icons-material/Star';
import useRatingCount from '../hooks/useRatingCount';
import { useHistory } from 'react-router';
import useImage from '../hooks/useImage';

import api from '../api'

function MovieCard({ movie = {}, loading }) {
    const { id, title, imDbRating, imDbRatingCount, releaseState, year, gross, worldwideLifetimeGross } = movie
    const ratingCount = useRatingCount(imDbRatingCount)
    const transform = useImage()
    const [image, setImage] = useState(movie.image)
    const history = useHistory()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => (image === undefined) && api.fetchImage(id).then(img => setImage(img)), [])

    return (
        <Card sx={{ bgcolor: 'secondary.main' }}>
            <CardActionArea onClick={() => history.push(`/${id}`)}>
                {
                    loading ?
                        <Skeleton variant="rectangular" animation="wave" height={200} /> :
                        <CardMedia
                            component="img"
                            height="200"
                            image={transform(image) || "/images/img_placeholder.png"}
                            alt={title}
                        />

                }
                <CardContent sx={{ bgcolor: "text.primary", m: 0 }}>
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

export default MovieCard