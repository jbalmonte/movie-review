import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import api from '../api';
import MovieList from '../components/MovieList';
import categoriesDB from '../db/categories'
import categoriesList from '../constant/categories'

const initialState = () => [{ label: 'Top', movies: Array(12).fill({}) }]

function Home() {
    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        setLoading(true)
        // async function init() {
        //     const data = await Promise.all(categories.map(async ({ label, apiPath, path }) => {
        //         const movies = await api.fetchByCount(apiPath, 12)
        //         return { label, path, movies }
        //     }))
        //     setState(data)
        //     setCurrent(data.slice(count.prev, count.next))
        // }
        // init()
        const data = categoriesList.map(category => ({ ...category, movies: categoriesDB[category.path].slice(0, 12) }))
        setState(data)

        return () => setLoading(false)
    }, [])

    useEffect(() => setLoading(false), [state])

    return (
        <Container sx={{ pt: 5, pb: 3 }} maxWidth="false">

            {state.map(({ label = "", path = "", movies = [] }, i) => (

                <Box key={label} >
                    <Typography variant="h4" sx={{ mb: 3 }}>
                        {label}
                    </Typography>

                    <MovieList movies={movies} loading={loading} />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {
                            loading ?
                                <Skeleton variant="text" /> :

                                <Button
                                    variant="text"
                                    sx={{ height: '60%', mt: 2, mb: 3, visibility: movies.length !== 12 ? 'hidden' : '' }}
                                    color="secondary"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => history.push(`/${path}`)}
                                >
                                    Discover More

                                </Button>
                        }
                    </Box>
                </Box>
            ))
            }
        </Container >
    )
}

export default React.memo(Home)