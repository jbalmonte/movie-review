
import React, { useState } from 'react'
import SearchContext from './SearchContext'

export default function ContextProvider({ children }) {
    const [searchText, setSearchText] = useState('')
    const value = { searchText, setSearchText }
    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}
