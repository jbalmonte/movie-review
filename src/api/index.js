import axios from 'axios'

const api = {
    fetch: async category => {
        try {
            const url = `${process.env.REACT_APP_IMDB_END_POINT}/${category}/${process.env.REACT_APP_IMDB_API_KEY}`
            const response = await axios.get(url)
            return response.data.items
        }
        catch (err) {
            console.log('API:Error', err)
        }
    },
    fetchByCount: async function (category, number) {
        try {
            const movies = await this.fetch(category)
            return movies.slice(0, number)
        } catch (err) {
            console.log('API:Error: ', err)
        }
    },

    fetchById: async id => {
        try {
            const url = `${process.env.REACT_APP_OMDB_END_POINT}/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}&plot=full`
            const response = await axios.get(url)
            return await response.data
        } catch (err) {
            console.log('API:Error: ', err)
        }
    },

    fetchImage: async function (id) {
        try {
            return await (await this.fetchById(id)).Poster
        } catch (err) {
            console.log('API:Error: ', err)
        }
    },
    fetchMovies: async (searchTerm, page = 1) => {
        try {
            const url = `${process.env.REACT_APP_OMDB_END_POINT}/?s=${searchTerm}&apikey=${process.env.REACT_APP_OMDB_API_KEY}&type=movie&page=${page}`
            const response = await axios.get(url)
            const data = await response.data
            if (data.Response === "True") {
                const movies = data.Search.map(a => {
                    return Object.fromEntries(
                        Object.entries(a).map(([x, y]) => [x.toLowerCase().replace("imdbid", "id"), y])
                    )
                })
                return { movies, totalLength: data.totalResults }
            }
            else return Promise.reject(new Error(data.Error))
        } catch (err) {
            console.log('API:Error', err)
        }
    }

}

export default api