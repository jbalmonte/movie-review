import React from 'react'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useHistory } from 'react-router-dom'

export default function BackButton({ sx, loading }) {
    const history = useHistory()
    return (
        <>
            {
                loading ?
                    <Skeleton
                        variant="text"
                        height={50}
                        sx={{ bgcolor: "secondary.dark", mb: 2, width: [80, 100, 150] }}
                        animation="wave"
                    />
                    :
                    <Button
                        startIcon={<ArrowBackIosIcon fontSize="small" />}
                        color="secondary"
                        onClick={() => history.goBack()}
                        sx={sx}
                    >
                        Back
                    </Button>
            }
        </>
    )
}
