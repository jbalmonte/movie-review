/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import MovieList from '../components/MovieList';
import categoryDB from '../db'
import categoryList from '../constant/categories'
import useSearch from '../hooks/useSearch';
import api from '../api';


const initialState = [{ label: 'Top', movies: Array(12).fill({}).map((_, i) => ({ id: i })) }]

function Home() {
    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const { searchText } = useSearch()

    useEffect(() => {

        /*
        OPTION 1
        Fetch from an api, but if the api is capped, you can switch to option number 2
        
        async function init() {
            const data = await Promise.all(categoriesList.map(async ({ label, apiPath, path }) => {
                const movies = await api.fetchByCount(apiPath, 12)
                return { label, path, movies }
            }))
            setState(data)
        }
        init()
        */

        //OPTION 2 (Fetch from local db)
        const data = categoryList.map(c => ({ ...c, movies: categoryDB[c.path]?.slice(0, 12) }))
        setState(data)
        setTimeout(() => setLoading(false), 1000)
        return () => setLoading(false)

    }, [])

    useEffect(() => searchText && history.push('/search'), [searchText])


    return (
        <Container sx={{ pt: 5, pb: 3 }} maxWidth="false">

            {
                (loading ? initialState : state).map(({ label = "", path = "", movies }) => {
                    return (
                        <React.Fragment key={path}>
                            {
                                movies?.length &&
                                <Box >
                                    <Typography variant="h4" sx={{ mb: 3 }}>
                                        {label}
                                    </Typography>

                                    <MovieList
                                        movies={movies}
                                        loading={loading}
                                        totalLength={movies.length}
                                        variant="normal"
                                    />

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        {
                                            loading ?
                                                <Skeleton variant="text" />
                                                :
                                                <Button
                                                    variant="text"
                                                    sx={{
                                                        height: '60%',
                                                        mt: 2,
                                                        mb: 3,
                                                        visibility: movies.length !== 12 ? 'hidden' : ''
                                                    }}
                                                    color="secondary"
                                                    endIcon={<ArrowForwardIcon />}
                                                    onClick={() => history.push(`/${path}`)}
                                                >
                                                    Discover More
                                                </Button>
                                        }
                                    </Box>
                                </Box>
                            }
                        </React.Fragment>
                    )

                }
                )
            }
        </Container >
    )
}

export default Home