import React from 'react'
import NavBar from './NavBar'
import Box from '@mui/material/Box'

export default function Layout({ children }) {
    return (
        <Box sx={{ bgcolor: 'background.default', height: '100%', color: 'background.contrastText', m: 0, p: 0 }}>
            <NavBar />
            {children}
        </Box>
    )
}
