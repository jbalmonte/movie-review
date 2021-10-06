/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieList from '../components/MovieList'
import { useParams } from 'react-router'
import useURLCategory from '../hooks/useURLCategory'
import useSearch from '../hooks/useSearch';
import BackButton from '../components/BackButton'

import api from '../api'

function Category() {

    const params = useParams()
    const { category, apiCategory } = useURLCategory(params.category)
    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const [count, setCount] = useState({ prev: 0, next: 18 })
    const [current, setCurrent] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const { searchText, setSearchText } = useSearch()



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
                setCurrent(movies.slice(count.prev, count.next))
            })

        return () => setSearchText('')
    }, [])

    useEffect(() => {
        const filteredMovies = movies.filter(m => new RegExp(searchText, 'i').test(m.title))
        setFilteredMovies(filteredMovies)
        setCurrent(filteredMovies.slice(0, 18))
        setCount({ prev: 18, next: 36 })
    }, [searchText]);

    useEffect(() => {
        if (filteredMovies.length && current.length === filteredMovies.length) {
            setHasMore(false)
        }
    }, [current, filteredMovies])


    const fetchMoreMovies = () => {
        setCount(prevState => ({ prev: prevState.next, next: prevState.next + 18 }))
        setCurrent(current.concat(filteredMovies.slice(count.next, count.next + 18)))
    }

    return (
        <Container sx={{ pt: [3, 5], pb: 4 }} maxWidth="false">
            <Box sx={{ display: [null, 'flex'], mb: 3 }}>

                <BackButton />

                <Typography
                    variant="h4"
                    align="center"
                    sx={{ mx: 'auto' }}
                >
                    {category.toUpperCase()} MOVIES
                </Typography>
            </Box>
            <InfiniteScroll
                dataLength={current.length}
                next={fetchMoreMovies}
                hasMore={hasMore}
                loader={
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress color="secondary" disableShrink />
                    </Box>
                }
            >
                <MovieList movies={current} />
            </InfiniteScroll>
        </Container>
    )
}

export default Category