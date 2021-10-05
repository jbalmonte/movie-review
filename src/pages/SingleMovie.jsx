import React, { useEffect } from 'react'
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
import CategoryIcon from '@mui/icons-material/Category';
import MovieIcon from '@mui/icons-material/Movie';
import StarIcon from '@mui/icons-material/Star';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import PersonIcon from '@mui/icons-material/Person';

export default function SingleMovie() {
    const { id } = useParams()
    const bg = "url(https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg)"

    const items = [
        { Icon: props => <CategoryIcon {...props} />, field: 'Genre', data: 'Drama' },
        { Icon: props => <MovieIcon {...props} />, field: 'Rated', data: 'R' },
        { Icon: props => <EventIcon {...props} />, field: 'Released', data: '14 Oct 1994' },
        { Icon: props => <AccessTimeIcon {...props} />, field: 'Runtime', data: '142 min' },
        { Icon: props => <SportsScoreIcon {...props} />, field: 'Metascore', data: '80' },
        { Icon: props => <StarIcon {...props} />, field: 'IMDB Rating', data: '9.5 (62m)' },
        { Icon: props => <PersonIcon {...props} />, field: 'Director', data: 'Frank Darabont' },
    ]

    return (
        <Container maxWidth="false" sx={{ bgcolor: 'inherit', pt: 5 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'top',
                    pt: 1,
                    width: '90%',
                    mx: 'auto'

                }}>
                <Paper
                    elevation={0}
                    sx={{
                        mt: 1,
                        backgroundImage: bg,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        bgcolor: 'inherit',
                        height: 300,
                        width: 300,
                    }}
                >

                </Paper>
                <Box>
                    <Typography variant="h3" component="h1" gutterBottom>
                        The Shawshank Redemption
                    </Typography>
                    <TableContainer>
                        <Table size="small" sx={{ width: "70%" }}>
                            <TableBody >
                                {
                                    items.map(item => (
                                        <TableRow key={item.field}>
                                            <TableCell sx={{ color: 'primary.light', border: 'none', display: 'flex', alignItems: 'center' }}>
                                                <item.Icon fontSize="small" sx={{ mr: 1 }} />
                                                {item.field}:
                                            </TableCell>
                                            <TableCell sx={{ color: 'secondary.main', border: 'none' }}>
                                                {item.data}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            <Box sx={{ width: '90%', mx: 'auto', my: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Plot
                </Typography>
                <Typography variant="subtitle2" color="secondary">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda fugit voluptate eligendi rerum repellat quo necessitatibus enim non? Quibusdam ea maxime, a accusamus cum, vitae, voluptas corporis tenetur rerum repudiandae neque iusto minima eveniet doloribus fugit animi ducimus tempora sint! Quisquam ullam beatae eos dolorum aspernatur corporis asperiores ab eius est magnam amet molestias cupiditate, doloremque quis iste sed tempore illum suscipit nihil possimus quibusdam numquam praesentium omnis qui. Quibusdam porro, corporis molestiae aliquid beatae praesentium repudiandae provident laudantium tempora voluptatibus, ipsam ut quasi a, veniam rem fugit dolore earum cumque quo nam! Dolores veritatis at itaque qui neque consequuntur!
                </Typography>
            </Box>

        </Container >
    )
}
