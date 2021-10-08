/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import useFetchData from '../hooks/useFetchData'
import CategoryIcon from '@mui/icons-material/Category';
import MovieIcon from '@mui/icons-material/Movie';
import StarIcon from '@mui/icons-material/Star';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import useMediaQuery from '@mui/material/useMediaQuery'
import Poster from '../components/Poster'
import Title from '../components/Title'
import BackButton from '../components/BackButton';

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
    const history = useHistory()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const sm = useMediaQuery(theme => theme.breakpoints.down('sm'))

    useEffect(() => {
        fetchData(id).then(data => {
            setData(data)
            setTimeout(() => setLoading(false), 1000)
        }).catch(() => history.replace('/InvalidID'))
        return () => setLoading(false)
    }, [])


    return (
        <Container maxWidth="lg" sx={{ bgcolor: 'inherit', pt: [4, 5], pb: [5, 3], display: [null, 'flex'], alignItems: 'center' }}>

            <Box sx={{ width: ['80%', '70%', '80%'], px: 3, mx: 'auto', mb: 3 }}>
                {
                    sm ?
                        <>
                            <BackButton sx={{ textAlign: 'top', mb: 2 }} loading={loading} />
                            <Title title={data.Title} loading={loading} />
                            <Poster poster={data.Poster} loading={loading} />
                        </>
                        :
                        <>
                            <BackButton sx={{ textAlign: 'top', mb: 2 }} loading={loading} />
                            <Title title={data.Title} loading={loading} />
                        </>
                }


                <TableContainer>
                    {
                        loading ?
                            <Box sx={{ display: 'flex', justifyContent: ['space-between', 'start'] }}>
                                <Skeleton variant="rectangular" height={150} sx={{ bgcolor: "secondary.dark", mr: [0, 4], width: ['45%', '40%'] }} animation="wave" />
                                <Skeleton variant="rectangular" height={150} sx={{ bgcolor: "secondary.dark", mr: [0, 4], width: ['45%', '40%'] }} animation="wave" />
                            </Box>
                            :
                            <Table size="small" padding="none" >
                                <TableBody >
                                    {
                                        fields.map(v => (
                                            <TableRow key={v.field} sx={{ '& td': { border: 'none', pt: 1 } }}>
                                                <TableCell sx={{ color: 'secondary.light', display: 'flex', alignItems: 'center' }}>
                                                    <v.Icon fontSize="small" sx={{ mr: 1 }} />
                                                    {v.field}
                                                </TableCell>
                                                <TableCell sx={{ color: 'secondary.main' }}>
                                                    {data[v.field]}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>

                            </Table>
                    }
                </TableContainer>
                {
                    loading ?
                        <Box sx={{ mt: 5 }}>
                            <Skeleton variant="text" height={50} sx={{ bgcolor: "secondary.dark", mb: 0, width: ['50%', '30%', '20%'] }} animation="wave" />
                            <Skeleton variant="text" width="90%" height={50} sx={{ bgcolor: "secondary.dark" }} animation="wave" />
                        </Box>
                        :
                        <>
                            <Typography variant="h5" sx={{ mt: 5 }} gutterBottom>
                                <MenuBookIcon fontSize="small" sx={{ mr: 1 }} />
                                Plot
                            </Typography>
                            <Typography variant="body2" color="secondary" sx={{ textIndent: [25, 50] }}>
                                {data.Plot}
                            </Typography>
                        </>
                }
            </Box>

            {!sm && <Poster poster={data.Poster} loading={loading} />}
        </Container >
    )
}
