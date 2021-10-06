
import React, { useState } from 'react'
import SearchContext from './SearchContext'
import debounce from '../utils/debounce'

export default function ContextProvider({ children }) {
    const [searchState, setSearchState] = useState('')
    const setSearchText = debounce(val => setSearchState(val), 500)
    const value = { searchText: searchState, setSearchText }
    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}
