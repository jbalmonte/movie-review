/* eslint-disable react-hooks/exhaustive-deps */
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import React, { useState, useEffect, useCallback } from 'react'
import MovieList from '../components/MovieList';
import useSearch from '../hooks/useSearch';
import Error from '../components/Error';
import api from '../api';
import BackButton from '../components/BackButton';
import debounce from '../utils/debounce'


const errorTypes = {
    tooManyResults: { image: 'too_many_result_error.svg', text: 'Too many results' },
    movieNotFound: { image: 'no_data.svg', text: 'Movie not found' }
}


export default function SearchResult() {
    const [movies, setMovies] = useState([])
    const [totalLength, setTotalLength] = useState(0)
    const [error, setError] = useState()
    const { searchText } = useSearch()

    const fetch = useCallback(
        debounce(s => {
            api.fetchMovies(s)
                .then(data => {
                    setMovies(data.movies)
                    setTotalLength(+data.totalLength)
                    setError(undefined)
                })
                .catch(err => {
                    const type = err.message === "Movie not found!" ? 'movieNotFound' : 'tooManyResults'
                    setError(errorTypes[type])
                    setTotalLength(0)
                    setMovies([])
                })
        }, 400), [])


    useEffect(() => fetch(searchText), [searchText])


    const next = async (page) => {
        try {
            const data = await api.fetchMovies(searchText, page)
            return await data
        } catch (err) {
            throw new Error(err.message)
        }
    }

    return (
        <Container sx={{ pt: 5, pb: 5 }} maxWidth="false">
            {
                error ?
                    <Box sx={{ display: ['block', 'block', 'flex'], alignItems: 'start' }}>
                        <BackButton variant="search-reset" />

                        <Error
                            image={error.image}
                            height={[100, 300, 400]}
                            width={[100, 400, 500]}
                            text={error.text}
                            subText="Please try another keyword"
                        />

                    </Box>
                    :
                    <>
                        <Box sx={{ display: ['block', 'block', 'flex'], justifyContent: 'space-between' }}>
                            <BackButton sx={{ mb: 2 }} variant="search-reset" />
                            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h6">
                                    Showing the result(s) of:
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{ fontStyle: 'italic', fontWeight: 'bold', ml: 1 }}
                                    color="secondary"
                                >
                                    {searchText}
                                </Typography>
                            </Box>

                        </Box>
                        <MovieList
                            movies={movies}
                            totalLength={totalLength}
                            variant="infinite-scroll"
                            next={next}
                        />
                    </>


            }

        </Container >
    )
}
