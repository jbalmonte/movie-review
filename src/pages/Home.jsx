import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import MovieList from '../components/MovieList';
import categoryDB from '../db'
import categoryList from '../constant/categories'
import useSearch from '../hooks/useSearch';


const initialState = [{ label: 'Top', m: Array(12).fill({}).map((_, i) => ({ id: i })) }]

function Home() {
    const [movies, setMovies] = useState({})
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const { searchText } = useSearch()

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

        //OPTION 2 (Fetch from local db)
        const data = categoryList.map(c =>
        ({
            ...c,
            movies: categoryDB[c.path].slice(0, 12)
        }));

        setMovies(data)
        setTimeout(() => setLoading(false), 1000)

        return () => setLoading(false)

    }, [])

    useEffect(() => {

        const newData = {}

        for (let key in categoryDB) {
            const filteredMovies = categoryDB[key].filter(b => new RegExp(searchText, 'i').test(b.title)).slice(0, 12)
            if (filteredMovies.length) {
                newData[key] = filteredMovies
            }
        }

        setMovies(newData)

    }, [searchText])


    return (
        <Container sx={{ pt: 5, pb: 3 }} maxWidth="false">

            {
                Object.values(movies).length ?
                    (loading ? initialState : categoryList).map(({ label = "", path = "", m }) => {
                        const movieList = m || movies[path]
                        return (
                            <React.Fragment key={path}>
                                {
                                    movieList?.length &&
                                    <Box >
                                        <Typography variant="h4" sx={{ mb: 3 }}>
                                            {label}
                                        </Typography>

                                        <MovieList
                                            movies={movieList}
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
                                                        sx={{
                                                            height: '60%',
                                                            mt: 2,
                                                            mb: 3,
                                                            visibility: movies.length !== 12 ? 'hidden' : ''
                                                        }}
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
                    ) :

                    <>
                        {
                            !loading &&
                            <Box
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >

                                <Paper
                                    elevation={0}
                                    sx={{
                                        mt: 1,
                                        mb: 3,
                                        mx: ['auto', 0],
                                        background: "url(/images/no_data.svg) center center",
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'contain',
                                        bgcolor: 'inherit',
                                        height: [100, 300, 400],
                                        width: [100, 400, 500],
                                    }}
                                />
                                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
                                    No Movies to Display
                                    <SentimentVeryDissatisfiedIcon fontSize="large" sx={{ ml: 1 }} />
                                </Typography>
                                <Typography variant="h5" sx={{ textAlign: 'center', color: 'secondary.main' }}>
                                    Please try another keyword
                                </Typography>
                            </Box>
                        }
                    </>
            }
        </Container >
    )
}

export default React.memo(Home)