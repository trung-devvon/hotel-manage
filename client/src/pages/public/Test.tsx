import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Fuse from 'fuse.js'
import { useDebounce } from '@hooks/useDebounce'

const SearchComponent = () => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    axios
      .get('https://vietnam-administrative-division-json-server-swart.vercel.app/province')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  const fuse = new Fuse(data, {
    keys: ['name'],
    threshold: 0.3
  })

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      const result = fuse.search(debouncedQuery).map((result) => result.item)
      setResults(result)
    } else {
      setResults([])
    }
  }, [debouncedQuery, fuse])

  return (
    <div>
      <input className='border p-2' type='text' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search for a province' />
      <ul>
        {results.map((item: any) => (
          <li key={item.idProvince}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default SearchComponent
