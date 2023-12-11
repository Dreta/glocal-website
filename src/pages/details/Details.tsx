import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { ImageBlock, MarkdownBlock, Page, WordRecordingBlock } from '../../data.tsx'

import detailsHeader from './details-header.webp'
import Markdown from 'react-markdown';
import { dataHost } from '../../global.ts';
import Search from '../index/Search.tsx';
import Footer from './Footer.tsx';
import {ImageDisplay, WordRecordingDisplay} from './blocks.tsx';

function renderMarkdownBlocks(blocks: [MarkdownBlock | ImageBlock | WordRecordingBlock]): (React.JSX.Element | null)[] {
    return blocks.map((block, index) => {
        if (block.type == 'markdown') {
            return <div className='mb-5' key={index}><Markdown>{block.content}</Markdown></div>
        }
        return null
    })
}

function renderMiscBlocks(blocks: [MarkdownBlock | ImageBlock | WordRecordingBlock]): (React.JSX.Element | null)[] {
    return blocks.map((block, index) => {
        if (block.type == 'image') {
            return <div className='mb-8' key={index}><ImageDisplay image={block} /></div>
        }
        if (block.type == 'wordRecording') {
            return <div className='mb-8' key={index}><WordRecordingDisplay recording={block} /></div>
        }
        return null
    })
}

function renderAllBlocks(blocks: [MarkdownBlock | ImageBlock | WordRecordingBlock]): (React.JSX.Element | null)[] {
    return blocks.map((block, index) => {
        if (block.type == 'markdown') {
            return <div className='mb-5' key={index}><Markdown>{block.content}</Markdown></div>
        }
        if (block.type == 'image') {
            return <div className='mb-5' key={index}><ImageDisplay image={block} /></div>
        }
        if (block.type == 'wordRecording') {
            return <div className='mb-5' key={index}><WordRecordingDisplay recording={block} /></div>
        }
        return null
    })
}

export default function Details() {
    const { page } = useParams()

    const [data, setData] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(`${dataHost}pages/${page}.json`)
            .then(data => data.text().then(s => setData(s)))
            .catch(error => setError(error.toString()))
            .finally(() => setLoading(false))
    })

    if (loading) {
        return (
            <div className='flex justify-center items-center flex-col h-screen overflow-hidden'>
                <FontAwesomeIcon icon={faSpinner} spin className='text-gray-400 text-3xl' />
            </div>
        )
    }

    if (error != null) {
        return (
            <div className='flex justify-center items-center flex-col h-screen overflow-hidden'>
                <FontAwesomeIcon icon={faCircleExclamation} className='text-red-500 mb-3 text-3xl' />
                <p>An error occurred!</p>
                <p>{error}</p>
            </div>
        )
    }

    const parsedData: Page = JSON.parse(data!)

    return (
        <div>
            <div className='w-full sticky py-3 px-8 mb-8 lg:mb-32 bg-cover bg-center flex items-center'
                 style={{ backgroundImage: `url(${detailsHeader})` }}>
                <Link to='/' className='font-display font-bold text-2xl text-white'>Beijing Speaks</Link>

                <div className='ml-auto hidden lg:block w-72'>
                    <Search />
                </div>
            </div>
            <div className='px-8 sm:px-24 lg:px-32 xl:px-48 mb-8'>
                <h1 className='font-display font-bold text-4xl lg:text-6xl xl:text-7xl mb-3'>{parsedData.title}</h1>
                <p className='text-gray-400 mb-5'>By {parsedData.author}, {new Date(parsedData.time).toLocaleDateString()}</p>

                <div className='hidden lg:flex w-full'>
                    <div className='w-1/2 xl:w-3/5 2xl:w-3/4 mr-8'>
                        {renderMarkdownBlocks(parsedData.content)}
                    </div>
                    <div className='w-1/2 xl:w-2/5 2xl:w-1/4 ml-8'>
                        {renderMiscBlocks(parsedData.content)}
                    </div>
                </div>

                <div className='lg:hidden'>
                    {renderAllBlocks(parsedData.content)}
                </div>
            </div>

            <div className='flex justify-center items-center w-full mb-8'>
                <hr className='px-5 w-64' />
            </div>

            <Footer />
        </div>
    )
}
