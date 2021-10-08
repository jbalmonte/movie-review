/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useHistory } from 'react-router-dom'
import useSearch from '../hooks/useSearch'

export default function BackButton({ sx, loading, variant }) {
    const [clicked, setClicked] = useState(false)
    const { searchText, setSearchText } = useSearch()
    const history = useHistory()

    useEffect(() => clicked && !searchText && history.goBack(), [clicked])

    const handleClick = () => {
        if (variant === "search-reset") {
            setClicked(true)
            setSearchText('')
        }
        else history.goBack()
    }

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
                        onClick={handleClick}
                        sx={sx}
                    >
                        Back
                    </Button>
            }
        </>
    )
}
