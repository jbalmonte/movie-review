import React from 'react'
import NavBar from './NavBar'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from './ScrollTop'

export default function Layout({ children, ...rest }) {
    return (
        <Box sx={{ bgcolor: 'background.default', height: '100%', color: 'background.contrastText', m: 0, p: 0 }}>
            <NavBar />
            {children}
            <ScrollTop {...rest}>
                <Fab color="primary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Box>
    )
}
