import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';

function withInfiniteScroll(WrappedComponent) {

    function WithInfiniteScroll(props) {
        const { movies = [], variant, next, totalLength } = props
        const [page, setPage] = useState(2)
        const [count, setCount] = useState({ prev: 0, next: 18 })
        const [current, setCurrent] = useState([])
        const [hasMore, setHasMore] = useState(true)

        useEffect(() => setCurrent(movies.slice(0, 18)), [movies])

        useEffect(() => {
            if (totalLength && current.length === totalLength) setHasMore(false);
        }, [current, totalLength])


        const fetchMoreMovies = () => {
            if (next) {
                next(page)
                    .then(data => {
                        setCurrent(current.concat(data.movies))
                        setPage(prev => prev + 1)
                    })
                    .catch(() => setHasMore(false))
            }

            else {
                setCurrent(current.concat(movies.slice(count.next, count.next + 18)))
                setCount(prevState => ({ prev: prevState.next, next: prevState.next + 18 }))
            }
        }

        return (
            <>
                {
                    variant === "infinite-scroll" ?

                        <InfiniteScroll
                            dataLength={current.length}
                            next={fetchMoreMovies}
                            hasMore={hasMore}
                            loader={
                                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                                    <CircularProgress color="secondary" disableShrink />
                                </Box>
                            }
                        >

                            <WrappedComponent
                                {...props}
                                movies={current}
                            />

                        </InfiniteScroll>
                        :
                        <WrappedComponent {...props} />
                }
            </>
        )
    }

    WithInfiniteScroll.displayName = `WithInfiniteScroll(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

    return WithInfiniteScroll
}

export default withInfiniteScroll
