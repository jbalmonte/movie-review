import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import StarIcon from '@mui/icons-material/Star';
import useRatingCount from '../hooks/useRatingCount';
import useImage from '../hooks/useImage';

import api from '../api'
import { useHistory } from 'react-router';

function MovieCard({ movie = {}, loading }) {
    const { id, title, imDbRating, imDbRatingCount, releaseState, year, gross, worldwideLifetimeGross } = movie
    const history = useHistory()
    const ratingCount = useRatingCount(imDbRatingCount)
    const transform = useImage()
    const [image, setImage] = useState(movie.image)

    useEffect(() => {
        if (image === undefined) api.fetchImage(id).then(img => setImage(img))
        return () => setImage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Card sx={{ bgcolor: 'secondary.main' }}>
            <CardActionArea onClick={() => history.push(`/${id}`)}>
                {
                    loading ?
                        <Skeleton
                            variant="rectangular"
                            animation="wave"
                            sx={{
                                bgcolor: theme => theme.palette.secondary[500],
                                height: [150, 150, 200]
                            }}
                        />
                        :
                        <CardMedia
                            component="img"
                            sx={{ height: { xs: 150, md: 200 } }}
                            image={transform(image)}
                            onError={e => e.target.src = "/images/img_placeholder.png"}
                        />

                }
                <CardContent sx={{ bgcolor: "text.primary", heigh: '20%' }}>
                    {
                        loading ?
                            <Box sx={{ py: 0.5 }}>
                                <Skeleton height={13} variant="text" animation="wave" sx={{ mb: 1, bgcolor: theme => theme.palette.secondary[500] }} />
                                <Skeleton height={13} variant="text" animation="wave" width="60%" sx={{ bgcolor: theme => theme.palette.secondary[500] }} />
                            </Box>
                            :
                            <>
                                <Typography noWrap variant="subtitle2" sx={{ color: 'background.contrastText' }}>
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
                                            releaseState ? releaseState.replace(/Opening this week -/i, '') + ', ' + year
                                                :
                                                gross ? gross :
                                                    worldwideLifetimeGross ? worldwideLifetimeGross :
                                                        year

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