import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component'

function withInfiniteScroll(WrappedComponent) {

    function WithInfiniteScroll(props) {
        const { movies = [], variant, ...rest } = props
        const [count, setCount] = useState({ prev: 0, next: 18 })
        const [current, setCurrent] = useState([])
        const [hasMore, setHasMore] = useState(true)

        useEffect(() => {
            setCurrent(movies.slice(0, 18))
            setCount({ prev: 18, next: 36 })
        }, [movies])


        useEffect(() => {
            if (movies.length && current.length === movies.length) setHasMore(false);
        }, [current, movies])


        const fetchMoreMovies = () => {
            setCount(prevState => ({ prev: prevState.next, next: prevState.next + 18 }))
            setCurrent(current.concat(movies.slice(count.next, count.next + 18)))
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
                                {...rest}
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
