import React from 'react'
import Grid from '@mui/material/Grid'
import MovieCard from './MovieCard'
import withInfiniteScroll from '../hoc/withInfiniteScroll'

function MovieList({ loading, movies = [] }) {
    const n = movies.length % 10 === 0 ? 10 : 12
    return (
        <Grid container spacing={[1, 2]} columns={{ xs: 12, sm: 12, md: 12, lg: n }}>
            {
                movies.map(movie => (
                    <Grid item key={movie.id} xs={6} md={4} lg={2}>
                        <MovieCard movie={movie} loading={loading} />
                    </Grid>
                ))
            }
        </Grid >
    )
}

export default withInfiniteScroll(MovieList)