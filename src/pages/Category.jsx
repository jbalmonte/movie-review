import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from 'react-router'
import useURLCategory from '../hooks/useURLCategory'
import api from '../api'

export default function Category() {
    const params = useParams()
    const category = useURLCategory(params.category)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        api.fetch(category).then(movies => setMovies(movies))
    }, [])

    return (
        <Container>
            <Typography>
                {category}
            </Typography>
            <InfiniteScroll
            >
                <Grid container>
                    { }
                </Grid>
            </InfiniteScroll>
        </Container>
    )
}
