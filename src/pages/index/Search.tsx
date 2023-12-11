import React, { useEffect, useState } from 'react'
import { dataHost } from '../../global.ts';
import { PageRef } from '../../data.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faCircleQuestion, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function SearchResults({ input, setInput }: { input: string, setInput: React.Dispatch<React.SetStateAction<string>> }) {
    const [data, setData] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(`${dataHost}pages.json`)
            .then(data => data.text().then(s => setData(s)))
            .catch(error => setError(error.toString()))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className='bg-bj-yellow-bg rounded-2xl flex flex-col justify-center items-center h-64 p-5'>
                <FontAwesomeIcon icon={faSpinner} spin className='text-3xl' />
            </div>
        )
    }

    if (error) {
        return (
            <div className='bg-bj-yellow-bg rounded-2xl flex flex-col justify-center items-center h-64 p-5 text-center'>
                <FontAwesomeIcon icon={faCircleExclamation} className='text-red-500 mb-1 text-3xl' />
                <p>An error occurred.</p>
                <p>Please refresh to try again.</p>
            </div>
        )
    }

    if (input.length < 1) {
        return (
            <div className='bg-bj-yellow-bg rounded-2xl flex flex-col justify-center items-center h-64 p-5'>
                <p className='text-center'>Please enter more than 1 letter.</p>
            </div>
        )
    }

    const parsedData: Map<string, PageRef> = new Map(Object.entries(JSON.parse(data!)))
    const matches = []

    for (const page of parsedData.entries()) {
        if (page[1].title.toLowerCase().includes(input.toLowerCase())) {
            matches.push(page)
        }
    }

    return (
        <div className='bg-bj-yellow-bg rounded-2xl flex flex-col items-center h-64 overflow-auto p-3'>
            {matches.map((match, index) =>
                <div key={index} className='rounded-3xl w-full mb-3 p-4 bg-bj-yellow-accent flex items-center'>
                    <Link onClick={() => setInput('')} to={`/page/${match[0]}`}><p>{match[1].title}</p></Link>
                </div>)}
            {matches.length == 0 ?
                <div className='flex flex-col items-center justify-center h-full p-2'>
                    <FontAwesomeIcon icon={faCircleQuestion} className='mb-1 text-3xl' />
                    <p>No results</p>
                </div> : null}
        </div>
    )
}

export default function Search() {
    const [value, setValue] = useState('')

    return (
        <div className='relative'>
            <div className='bg-bj-yellow-bg rounded-full w-full px-5 py-2'>
                <input type='text'
                       className='bg-transparent w-full z-10 outline-none'
                       placeholder='Search...'
                       value={value}
                       onChange={e => setValue(e.target.value)} />
            </div>
            <div className='transition-all duration-400 absolute w-full mt-4'
                 style={{ opacity: value.length == 0 ? 0 : 1, height: value.length == 0 ? '0' : '18rem' }}>
                <SearchResults input={value} setInput={setValue} />
            </div>
        </div>
    )
}
