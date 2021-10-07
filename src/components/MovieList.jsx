import React from 'react'
import Grid from '@mui/material/Grid'
import MovieCard from './MovieCard'
import withInfiniteScroll from '../hoc/withInfiniteScroll'


function MovieList({ loading, label, movies = [] }) {
    return (
        <Grid container spacing={[1, 2]} >
            {
                movies.map((movie, i) => (
                    <Grid item key={label + movie.id} xs={6} md={4} lg={2}>
                        <MovieCard movie={movie} loading={loading} />
                    </Grid>
                ))
            }
        </Grid >
    )
}

export default withInfiniteScroll(MovieList)