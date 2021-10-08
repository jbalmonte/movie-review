import React from 'react'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography';

export default function Poster({ poster, loading }) {
    return (
        <>
            {
                loading ?
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            bgcolor: "secondary.dark",
                            mx: ['auto', null],
                            mr: ['auto', 1, 1, 4],
                            mb: [5, 0],
                            height: [200, 500],
                            width: ['80%', '40%'],
                        }}
                        animation="wave"
                    />
                    :
                    <Paper
                        elevation={0}
                        sx={{
                            mt: 1,
                            mb: [3, 1],
                            mx: ['auto', 0],
                            background: `url(${poster}) center center`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            bgcolor: poster === 'N/A' ? 'secondary.dark' : 'inherit',
                            height: [200, 400, 500],
                            width: [200, 400, 500],
                            color: 'secondary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {
                            poster === "N/A" &&
                            <Typography variant="h5" align="center">
                                No poster to display
                            </Typography>
                        }
                    </Paper>
            }

        </>
    )
}
