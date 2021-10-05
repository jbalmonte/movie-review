import axios from 'axios'

const api = {
    fetch: async category => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_IMDB_END_POINT}/${category}/${process.env.REACT_APP_IMDB_API_KEY}`)
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
            const response = await axios.get(`${process.env.REACT_APP_OMDB_END_POINT}/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}&plot=full`)
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
    }

}

export default api