import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import MovieList from '../components/MovieList';
import categoryDB from '../db'
import categoryList from '../constant/categories'
import useSearch from '../hooks/useSearch';
import Error from '../components/Error';
import api from '../api';


//const initialState = [{ label: 'Top', m: Array(12).fill({}).map((_, i) => ({ id: i })) }]

export default function SearchResult() {
    const [movies, setMovies] = useState({})
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const { searchText } = useSearch()

    useEffect(() => {

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
        const data = categoryList.map(c => [[c.path], categoryDB[c.path]?.slice(0, 12)])
        setMovies(Object.fromEntries(data))
        setTimeout(() => setLoading(false), 1000)

        return () => setLoading(false)

    }, [])

    useEffect(() => {

        if (searchText) {

            // const newData = {}

            // for (let key in categoryDB) {
            //     const filteredMovies = categoryDB[key].filter(b => new RegExp(searchText, 'i').test(b.title)).slice(0, 12)
            //     if (filteredMovies.length) {
            //         newData[key] = filteredMovies
            //     }
            // }

            // setMovies(newData)
        }

        else history.goBack()

    }, [searchText])


    useEffect(() => {
        // if (searchText && Object.values(movies).length === 0) {
        //     api.fetchMovies(searchText).then(data => {
        //         console.log('data', data)
        //         if (data) setMovies(data)
        //     })
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movies])

    return (
        <Container sx={{ pt: 5, pb: 3 }} maxWidth="false">

            <Typography variant="h4" sx={{ mb: 3 }}>
                Showing the result of: {searchText}
            </Typography>

            <MovieList
                movies={movies}
                loading={loading}
                variant="infinite-scroll"
            />
            :

            <>
                {
                    !loading &&

                    <Error
                        height={[100, 300, 400]}
                        width={[100, 400, 500]}
                        image="no_data.svg"
                        text=" No movies to display"
                        subText="Please try another keyword"
                    />
                }
            </>
        </Container >
    )
}
