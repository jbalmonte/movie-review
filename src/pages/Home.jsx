import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import MovieList from '../components/MovieList';
import categoriesDB from '../db'
import categoriesList from '../constant/categories'
import useSearch from '../hooks/useSearch';
import FindInPageIcon from '@mui/icons-material/FindInPage';


const initialState = [{ label: 'Top', movies: Array(12).fill({}).map((_, i) => ({ id: i })) }]

function Home() {
    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const { searchText, setSearchText } = useSearch()

    useEffect(() => {
        setLoading(true)

        /*
        OPTION 1
        Fetch from an api, but if the api is capped, you can switch to option number 2
        
        async function init() {
            const data = await Promise.all(categoriesList.map(async ({ label, apiPath, path }) => {
                const movies = await api.fetchByCount(apiPath, 12)
                return { label, path, movies }
            }))
            setState(data)
        }
        init()
        */

        //OPTION 2 (Fetch from db)
        const data = categoriesList.map(
            category => (
                {
                    ...category,
                    movies: categoriesDB[category.path].slice(0, 12)
                    //  .filter(m => new RegExp(searchText, 'i').test(m.title))
                }
            ))
        setState(data)

        return () => {
            setLoading(false)
            setSearchText('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => setTimeout(() => setLoading(false), 1000), [state])

    return (
        <Container sx={{ pt: 5, pb: 3 }} maxWidth="false">

            {state.map(({ label = "", path = "", movies = [] }) => {
                const filteredMovies = movies.filter(m => new RegExp(searchText, 'i').test(m.title))
                return (
                    <React.Fragment key={path}>
                        {
                            filteredMovies.length &&
                            <Box >
                                <Typography variant="h4" sx={{ mb: 3 }}>
                                    {label}
                                </Typography>

                                <MovieList
                                    movies={filteredMovies}
                                    loading={loading}
                                    label={label}
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {
                                        loading ?
                                            <Skeleton variant="text" />
                                            :
                                            <Button
                                                variant="text"
                                                sx={{ height: '60%', mt: 2, mb: 3, visibility: filteredMovies.length !== 12 ? 'hidden' : '' }}
                                                color="secondary"
                                                endIcon={<ArrowForwardIcon />}
                                                onClick={() => history.push(`/${path}`)}
                                            >
                                                Discover More
                                            </Button>
                                    }
                                </Box>
                            </Box>
                        }
                    </React.Fragment>
                )
            }
            )
            }
        </Container >
    )
}

export default React.memo(Home)