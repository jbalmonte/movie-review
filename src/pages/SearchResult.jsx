import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import MovieList from '../components/MovieList';
import useSearch from '../hooks/useSearch';
import Error from '../components/Error';
import api from '../api';



const errorTypes = {
    tooManyResults: { image: 'too_many_result_error.svg', text: 'Too many results' },
    movieNotFound: { image: 'no_data.svg', text: 'Movie not found' }
}


export default function SearchResult() {
    const [movies, setMovies] = useState([])
    const [error, setError] = useState()
    const history = useHistory()
    const { searchText } = useSearch()


    useEffect(() => {
        if (searchText) {
            api.fetchMovies(searchText)
                .then(data => {
                    setMovies(data)
                    setError(undefined)
                })

                .catch(err => {
                    const type = err.message === "Movie not found!" ? 'movieNotFound' : 'tooManyResults'
                    setError(errorTypes[type])
                    setMovies([])
                })
        }

        else history.goBack()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText])


    return (
        <Container sx={{ pt: 5, pb: 3 }} maxWidth="false">

            {
                error ?
                    <Error
                        image={error.image}
                        height={[100, 300, 400]}
                        width={[100, 400, 500]}
                        text={error.text}
                        subText="Please try another keyword"
                    />

                    :
                    <>
                        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h5" >
                                Showing the result of:
                            </Typography>

                            <Typography
                                variant="h5"
                                sx={{ fontStyle: 'italic', fontWeight: 'bold', ml: 1 }}
                                color="secondary"
                            >
                                {searchText}
                            </Typography>

                        </Box>

                        <MovieList
                            movies={movies}
                            variant="infinite-scroll"
                        />
                    </>


            }

        </Container >
    )
}
