import React from 'react'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

export default function Title({ title, loading }) {
    return (
        <>
            {
                loading ?
                    <>
                        <Skeleton
                            variant="text"
                            height={50}
                            sx={{
                                bgcolor: "secondary.dark",
                                mx: ['auto', 0],
                                mr: 4,
                                width: ['80%', '90%']
                            }}
                            animation="wave"
                        />
                        <Skeleton
                            variant="text"
                            height={50}
                            sx={{
                                bgcolor: "secondary.dark",
                                mx: ['auto', 0],
                                mr: 4,
                                mb: 4,
                                width: ['40%']
                            }}
                            animation="wave" />
                    </>
                    :

                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            mb: 3,
                            textAlign: ['center', 'left']
                        }}
                    >
                        {title?.toUpperCase()}
                    </Typography>
            }
        </>
    )
}
