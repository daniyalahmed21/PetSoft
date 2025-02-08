'use client'
import { useSearchContext } from '@/lib/hooks'
import React from 'react'

const SearchForm = () => {
  const {searchQuery,handleChangeSetSearchQuery} = useSearchContext()
  return (
    <form className='w-full h-full' action="">
        <input
        className="w-full h-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50"
        placeholder="Search pets"
        type="search"
        value={searchQuery}
        onChange={(e)=>handleChangeSetSearchQuery(e.target.value)}
        
      />
    </form>
)
}

export default SearchForm