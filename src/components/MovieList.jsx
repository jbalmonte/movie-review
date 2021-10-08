import React from 'react'
import Grid from '@mui/material/Grid'
import MovieCard from './MovieCard'
import withInfiniteScroll from '../hoc/withInfiniteScroll'

function MovieList({ loading, movies = [] }) {

    return (
        <Grid container spacing={[1, 2]}>
            {
                movies.map((movie, i) => (
                    <Grid item key={movie.id + i} xs={6} sm={4} md={3} lg={2}>
                        <MovieCard movie={movie} loading={loading} />
                    </Grid>
                ))
            }
        </Grid >
    )
}

export default withInfiniteScroll(MovieList)