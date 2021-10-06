import { useContext } from 'react'
import SearchContext from '../context/SearchContext'

export default function useSearch() {
    return useContext(SearchContext)
}
