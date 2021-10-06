import React from 'react'
import Grid from '@mui/material/Grid'
import MovieCard from './MovieCard'

export default function MovieList({ movies = [], loading, label = "" }) {

    return (
        <Grid container spacing={[1, 2]} >
            {
                movies.map((movie, i) => (
                    <Grid item key={label + movie.id} xs={6} md={4} lg={2}>
                        <MovieCard movie={movie} loading={loading} />
                    </Grid>
                )
                )
            }
        </Grid >

    )
}
