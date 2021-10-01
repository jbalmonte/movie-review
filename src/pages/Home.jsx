import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import categories from '../constant/categories'
import api from '../api';
import MovieList from '../components/MovieList';

export default function Home() {
    const [state, setState] = useState(() => categories.map(c => ({ ...c, movies: Array(12).fill({}) })))
    //     [{
    //     label: 'Top',
    //     path: 'top',
    //     apiPath: 'Top250Movies',
    //     movies: [
    //         {
    //             "id": "tt0111161",
    //             "rank": "1",
    //             "title": "The Shawshank Redemption",
    //             "fullTitle": "The Shawshank Redemption (1994)",
    //             "year": "1994",
    //             "image": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX128_CR0,3,128,176_AL_.jpg",
    //             "crew": "Frank Darabont (dir.), Tim Robbins, Morgan Freeman",
    //             "imDbRating": "9.2",
    //             "imDbRatingCount": "2466800"
    //         },
    //         {
    //             "id": "tt0068646",
    //             "rank": "2",
    //             "title": "The Godfather",
    //             "fullTitle": "The Godfather (1972)",
    //             "year": "1972",
    //             "image": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX128_CR0,1,128,176_AL_.jpg",
    //             "crew": "Francis Ford Coppola (dir.), Marlon Brando, Al Pacino",
    //             "imDbRating": "9.1",
    //             "imDbRatingCount": "1705309"
    //         },
    //         {
    //             "id": "tt0071562",
    //             "rank": "3",
    //             "title": "The Godfather: Part II",
    //             "fullTitle": "The Godfather: Part II (1974)",
    //             "year": "1974",
    //             "image": "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX128_CR0,1,128,176_AL_.jpg",
    //             "crew": "Francis Ford Coppola (dir.), Al Pacino, Robert De Niro",
    //             "imDbRating": "9.0",
    //             "imDbRatingCount": "1184585"
    //         },
    //         {
    //             "id": "tt0468569",
    //             "rank": "4",
    //             "title": "The Dark Knight",
    //             "fullTitle": "The Dark Knight (2008)",
    //             "year": "2008",
    //             "image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX128_CR0,3,128,176_AL_.jpg",
    //             "crew": "Christopher Nolan (dir.), Christian Bale, Heath Ledger",
    //             "imDbRating": "9.0",
    //             "imDbRatingCount": "2421435"
    //         },
    //         {
    //             "id": "tt0050083",
    //             "rank": "5",
    //             "title": "12 Angry Men",
    //             "fullTitle": "12 Angry Men (1957)",
    //             "year": "1957",
    //             "image": "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX128_CR0,3,128,176_AL_.jpg",
    //             "crew": "Sidney Lumet (dir.), Henry Fonda, Lee J. Cobb",
    //             "imDbRating": "8.9",
    //             "imDbRatingCount": "730177"
    //         },
    //         {
    //             "id": "tt0108052",
    //             "rank": "6",
    //             "title": "Schindler's List",
    //             "fullTitle": "Schindler's List (1993)",
    //             "year": "1993",
    //             "image": "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX128_CR0,3,128,176_AL_.jpg",
    //             "crew": "Steven Spielberg (dir.), Liam Neeson, Ralph Fiennes",
    //             "imDbRating": "8.9",
    //             "imDbRatingCount": "1267594"
    //         },
    //         {
    //             "id": "tt0167260",
    //             "rank": "7",
    //             "title": "The Lord of the Rings: The Return of the King",
    //             "fullTitle": "The Lord of the Rings: The Return of the King (2003)",
    //             "year": "2003",
    //             "image": "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX128_CR0,3,128,176_AL_.jpg",
    //             "crew": "Peter Jackson (dir.), Elijah Wood, Viggo Mortensen",
    //             "imDbRating": "8.9",
    //             "imDbRatingCount": "1711180"
    //         },
    //         {
    //             "id": "tt0110912",
    //             "rank": "8",
    //             "title": "Pulp Fiction",
    //             "fullTitle": "Pulp Fiction (1994)",
    //             "year": "1994",
    //             "image": "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX128_CR0,3,128,176_AL_.jpg",
    //             "crew": "Quentin Tarantino (dir.), John Travolta, Uma Thurman",
    //             "imDbRating": "8.8",
    //             "imDbRatingCount": "1910184"
    //         },
    //         {
    //             "id": "tt0060196",
    //             "rank": "9",
    //             "title": "The Good, the Bad and the Ugly",
    //             "fullTitle": "The Good, the Bad and the Ugly (1966)",
    //             "year": "1966",
    //             "image": "https://m.media-amazon.com/images/M/MV5BOTQ5NDI3MTI4MF5BMl5BanBnXkFtZTgwNDQ4ODE5MDE@._V1_UX128_CR0,3,128,176_AL_.jpg",
    //             "crew": "Sergio Leone (dir.), Clint Eastwood, Eli Wallach",
    //             "imDbRating": "8.8",
    //             "imDbRatingCount": "718405"
    //         },
    //         {
    //             "id": "tt0120737",
    //             "rank": "10",
    //             "title": "The Lord of the Rings: The Fellowship of the Ring",
    //             "fullTitle": "The Lord of the Rings: The Fellowship of the Ring (2001)",
    //             "year": "2001",
    //             "image": "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UX128_CR0,3,128,176_AL_.jpg",
    //             "crew": "Peter Jackson (dir.), Elijah Wood, Ian McKellen",
    //             "imDbRating": "8.8",
    //             "imDbRatingCount": "1732454"
    //         },
    //         {
    //             "id": "tt0137523",
    //             "rank": "11",
    //             "title": "Fight Club",
    //             "fullTitle": "Fight Club (1999)",
    //             "year": "1999",
    //             "image": "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX128_CR0,3,128,176_AL_.jpg",
    //             "crew": "David Fincher (dir.), Brad Pitt, Edward Norton",
    //             "imDbRating": "8.8",
    //             "imDbRatingCount": "1941994"
    //         },
    //         {
    //             "id": "tt0109830",
    //             "rank": "12",
    //             "title": "Forrest Gump",
    //             "fullTitle": "Forrest Gump (1994)",
    //             "year": "1994",
    //             "image": "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX128_CR0,3,128,176_AL_.jpg",
    //             "crew": "Robert Zemeckis (dir.), Tom Hanks, Robin Wright",
    //             "imDbRating": "8.7",
    //             "imDbRatingCount": "1906914"
    //         }]

    // }]
    //)
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {

        setLoading(true)
        async function init() {
            const data = await Promise.all(categories.map(async ({ label, apiPath, path }) => {
                const movies = await api.fetchByCount(apiPath, 12)
                return { label, path, movies }
            }))
            setState(data)
        }
        init()
        return () => setLoading(false)

        //setTimeout(() => setLoading(false), 2000)
    }, [])

    useEffect(() => setLoading(false), [state])

    return (
        <Container sx={{ pt: 5, pb: 3 }} maxWidth="false">
            {state.map(({ label = "", path = "", movies = [] }, i) => (
                <Box sx={{ height: '100%' }} key={i}>

                    <Typography variant="h4" sx={{ mb: 3 }}>
                        {label}
                    </Typography>

                    <MovieList movies={movies} loading={loading} />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {
                            loading ?
                                <Skeleton variant="text" /> :

                                <Button
                                    variant="text"
                                    sx={{ height: '60%', mt: 2, mb: 3 }}
                                    color="secondary"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => history.push(`/${path}`)}
                                >
                                    Discover More
                                </Button>
                        }
                    </Box>
                </Box>
            ))
            }
        </Container >
    )
}
