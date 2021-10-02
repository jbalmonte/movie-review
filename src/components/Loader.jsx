import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export default function Loader({ my = 4 }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my }}>
            <CircularProgress color="secondary" disableShrink />
        </Box>
    )
}
