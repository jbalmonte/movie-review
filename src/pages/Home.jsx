import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import MovieCard from '../components/MovieCard'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import categories from '../constant/categories'
import api from '../api';

export default function Home() {
    const [state, setState] = useState([1, 2, 3])
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {

        /* 
        categories.forEach(async ({label, apiURL, path}) => {
                const movies = await api.fetchByCount(apiURL, 12)
                setState(prev => [...prev, {label, path, movies}])
            });
        */

    }, [])

    // useEffect(() => console.log('UPDATED', state), [state])

    return (
        <Container sx={{ bgcolor: 'background.default', heigh: '100%', pt: 5, pb: 3 }} maxWidth="false">
            {state.map(({ label = "", path = "", movies = [] }, i) => (
                <Box sx={{ color: 'background.contrastText', height: '100%' }} key={i}>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                        {label}
                    </Typography>

                    <Grid container spacing={[1, 2]}>
                        {
                            movies.map(movie => (
                                <Grid item key={movie.id} xs={6} md={4} lg={2}>
                                    <MovieCard movie={movie} />
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="text"
                            sx={{ height: '60%', mt: 2, mb: 3 }}
                            color="secondary"
                            endIcon={<ArrowForwardIcon />}
                            onClick={() => history.push(`/${path}`)}
                        >
                            {
                                loading ? <Skeleton /> : 'Discover More'
                            }
                        </Button>
                    </Box>
                </Box>
            ))
            }
        </Container >
    )
}
