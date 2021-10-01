import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieList from '../components/MovieList'
import { useParams, useHistory } from 'react-router'
import useURLCategory from '../hooks/useURLCategory'
//import movies from '../constant/movies'
import api from '../api'


export default function Category() {
    const params = useParams()
    const history = useHistory()
    const { category, apiCategory } = useURLCategory(params.category)
    const [movies, setMovies] = useState([])
    const [count, setCount] = useState({ prev: 0, next: 18 })
    const [current, setCurrent] = useState([])
    const [hasMore, setHasMore] = useState(true)


    useEffect(() => {
        api.fetch(apiCategory).then(response => {
            setMovies(response)
            setCurrent(response.slice(count.prev, count.next))
        })
        //setCurrent(movies.slice(count.prev, count.next))
    }, [])

    useEffect(() => setCurrent(prev => prev.concat(movies.slice(count.prev, count.next))), [count])

    const fetchMoreMovies = () => {
        if (current.length && current.length >= movies.length) return setHasMore(false)
        setCount(prevState => ({ prev: prevState.next, next: prevState.next + 18 }))
    }

    return (
        <Container sx={{ pt: 5, pb: 4 }} maxWidth="false">
            <Box sx={{ display: 'flex', mb: 3 }}>
                <Button startIcon={<ArrowBackIosIcon />} color="secondary" onClick={() => history.goBack()}>
                    Back
                </Button>
                <Typography variant="h4" sx={{ mx: 'auto' }}>
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
