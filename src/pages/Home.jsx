import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '../components/Card'
import React from 'react'

const entries = [
    'Top',
    'Most Popular',
    'In Theaters',
    'Coming Soon',
    'Box Office',
    'Box Office of All Time'
]

export default function Home() {
    return (
        <Container sx={{ bgcolor: 'background.default' }} maxWidth="false">
            {entries.map((entry, i) => (
                <Box sx={{ color: 'background.contrastText', pt: 5, pb: 3 }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        {entry}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Card />
                        </Grid>
                        <Grid item>
                            <Card />
                        </Grid>
                        <Grid item>
                            <Card />
                        </Grid>
                        <Grid item>
                            <Card />
                        </Grid>
                        <Grid item>
                            <Card />
                        </Grid>
                        <Grid item>
                            <Card />
                        </Grid>
                    </Grid>
                </Box>
            ))}
        </Container >
    )
}
