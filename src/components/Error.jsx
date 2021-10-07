import React from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'


export default function Error({ height, image, text, subText, width }) {
    return (
        <Container sx={{ mx: "auto", textAlign: 'center' }}>
            <Paper
                elevation={0}
                sx={{
                    mt: 1,
                    mb: 3,
                    mx: ['auto', 'auto'],
                    background: `url(/images/${image}) center center`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    bgcolor: 'inherit',
                    height,
                    width,
                }}
            />
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', display: ['block', 'flex'], alignItems: 'center', justifyContent: 'center' }}>
                {text}
                <SentimentVeryDissatisfiedIcon fontSize="inherit" sx={{ ml: 1 }} />
            </Typography>
            <Typography variant="h5" sx={{ textAlign: 'center', color: 'secondary.main' }}>
                {subText}
            </Typography>
        </Container>
    )
}
