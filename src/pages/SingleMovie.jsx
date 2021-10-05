import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Box from '@mui/material/Box'
import useFetchData from '../hooks/useFetchData'
import CategoryIcon from '@mui/icons-material/Category';
import MovieIcon from '@mui/icons-material/Movie';
import StarIcon from '@mui/icons-material/Star';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import PersonIcon from '@mui/icons-material/Person';

import MenuBookIcon from '@mui/icons-material/MenuBook';

const fields = [
    { Icon: props => <CategoryIcon {...props} />, field: 'Genre' },
    { Icon: props => <MovieIcon {...props} />, field: 'Rated' },
    { Icon: props => <EventIcon {...props} />, field: 'Released' },
    { Icon: props => <AccessTimeIcon {...props} />, field: 'Runtime' },
    { Icon: props => <SportsScoreIcon {...props} />, field: 'Metascore' },
    { Icon: props => <StarIcon {...props} />, field: 'IMDB Rating' },
    { Icon: props => <PersonIcon {...props} />, field: 'Director' }
]

export default function SingleMovie() {

    const { id } = useParams()
    const fetchData = useFetchData()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetchData(id).then(data => {
            setData(data)
            console.log(data)
            setLoading(false)
        })
        return () => setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Container sx={{ bgcolor: 'inherit', pt: 5, display: 'flex', alignItems: 'center' }}>


            <Paper
                elevation={0}
                sx={{
                    my: 1,
                    mx: 0,
                    backgroundImage: `url(${data.Poster})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    bgcolor: 'inherit',
                    height: 500,
                    width: 500,
                }}
            />

            <Box sx={{ width: '90%', mx: 'auto' }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
                    {data.Title?.toUpperCase()}
                </Typography>
                <TableContainer>
                    <Table size="small" padding="none">
                        <TableBody >
                            {
                                fields.map(v => (
                                    <TableRow key={v.field}>
                                        <TableCell sx={{ color: 'secondary.light', border: 'none', display: 'flex', alignItems: 'center', pt: 1 }}>
                                            <v.Icon fontSize="small" sx={{ mr: 1 }} />
                                            {v.field}:
                                        </TableCell>
                                        <TableCell sx={{ color: 'secondary.main', border: 'none' }}>
                                            {data[v.field]}
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
                    <MenuBookIcon fontSize="small" sx={{ mr: 1 }} />
                    Plot
                </Typography>
                <Typography variant="body2" color="secondary" sx={{ textIndent: 50 }}>
                    {data.Plot}
                </Typography>
            </Box>

        </Container >
    )
}
