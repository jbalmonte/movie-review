/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MovieList from '../components/MovieList'
import { useParams } from 'react-router'
import useURLCategory from '../hooks/useURLCategory'
import BackButton from '../components/BackButton'
import Error from '../components/Error'

import api from '../api'
import useSearch from '../hooks/useSearch'

function Category() {

    const params = useParams()
    const { searchText } = useSearch()
    const [filteredMovies, setFilteredMovies] = useState([])
    const { category, apiCategory } = useURLCategory(params.category)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        /*
        fetch from an api, but if the api is capped at 100 requests, use movie list from the db

        api.fetch(apiCategory).then(movies => {
            setMovies(movies)
            setCurrent(movies.slice(count.prev, count.next))
        })
        */


        //From the db
        import(`../db/${params.category}`)
            .then(response => response.default)
            .then(movies => {
                setMovies(movies)
                setFilteredMovies(movies)
            })

    }, [])

    useEffect(() => {
        const filteredMovies = movies.filter(m => new RegExp(searchText, 'i').test(m.title))
        setFilteredMovies(filteredMovies)
    }, [searchText])

    return (
        <Container sx={{ pt: [3, 5], pb: 4 }} maxWidth="false">

            {
                filteredMovies.length ?
                    (
                        <>
                            <Box sx={{ display: ['block', 'block', 'flex'], mb: 3 }}>
                                <BackButton sx={{ mb: [1, 2, 0] }} />
                                <Typography
                                    variant="h4"
                                    align='center'
                                    sx={{ mx: 'auto' }}
                                >
                                    {category.toUpperCase()} MOVIES
                                </Typography>
                            </Box>

                            <MovieList movies={filteredMovies} variant="infinite-scroll" />
                        </>
                    )
                    :
                    <>
                        {searchText &&
                            <Error
                                height={[100, 300]}
                                width={[100, 400, 500]}
                                image="no_data.svg"
                                text=" No movies to display"
                                subText="Please try another keyword"
                            />
                        }
                    </>

            }


        </Container >
    )
}

export default Category