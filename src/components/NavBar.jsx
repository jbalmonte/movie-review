import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import useSearch from '../hooks/useSearch';
import { useHistory } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary[50], 0.5),
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary[100], 0.8),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0.5, 2),
    height: '80%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(0.5, 1, 0.5, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '40ch',
            '&:focus': {
                width: '48ch',
            },
        },
    },
}));


export default function SearchAppBar() {
    const { searchText, setSearchText } = useSearch()
    const history = useHistory()

    return (
        <Box sx={{ flexGrow: 1 }} elevation={0}>
            <AppBar position="static" sx={{ bgcolor: 'primary.main', color: 'common.black' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} variant="dense" id="back-to-top-anchor">
                    <Box
                        sx={{ display: 'flex', pointer: 'cursor', alignItems: 'center' }}
                        onClick={() => history.push('/')}
                    >
                        <MovieFilterOutlinedIcon sx={{ mr: 1, alignItems: 'center', }} />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', sm: 'block' },
                                fontFamily: 'Anton, sans serif',
                                pr: 1,
                                pointerEvents: 'none'
                            }}
                        >
                            Movie Review
                        </Typography>
                    </Box>

                    <Search >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ ml: 1 }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box >
    );
}
