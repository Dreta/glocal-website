import {ImageBlock, SentenceRecordingBlock, WordRecordingBlock} from '../../data.tsx';
import {dataHost} from '../../global.ts';
import {useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons';

export function ImageDisplay({ image }: { image: ImageBlock }) {
    return (
        <div>
            <img src={dataHost + image.url} alt={image.alt} className='rounded-3xl object-cover w-full' />
        </div>
    )
}

export function WordRecordingDisplay({ recording }: { recording: WordRecordingBlock }) {
    const [playing, setPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    const togglePlayback = () => {
        if (playing) {
            audioRef.current!.pause()
        } else {
            audioRef.current!.play()
        }
    }

    return (
        <div className='rounded-3xl bg-bj-yellow-bg w-full h-72 flex flex-col justify-center items-center p-8'>
            <div className='text-4xl mb-3'>
                {recording.chinese.map((char, index) =>
                    <ruby key={index} className='mx-1'>{char}
                        <rt>{recording.pinyin[index]}</rt>
                    </ruby>)}
            </div>
            <div className='mb-3 text-center'>
                <p>{recording.english}</p>
                <p>{recording.englishLiteral}</p>
            </div>
            <button className='bg-bj-yellow-accent hover:bg-bj-yellow transition-colors duration-100
                rounded-full w-12 h-12 flex justify-center items-center' onKeyUp={togglePlayback}
                    onClick={togglePlayback}>
                <FontAwesomeIcon icon={playing ? faPause : faPlay} className='text-xl' />
                <audio ref={audioRef} className='hidden' src={dataHost + recording.url} onPlay={() => setPlaying(true)}
                       onPause={() => setPlaying(false)} />
            </button>
        </div>
    )
}

export function SentenceRecordingDisplay({ recording }: { recording: SentenceRecordingBlock }) {
    const [playing, setPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    const togglePlayback = () => {
        if (playing) {
            audioRef.current!.pause()
        } else {
            audioRef.current!.play()
        }
    }

    return (
        <div className='rounded-3xl bg-bj-yellow-bg w-full h-64 flex flex-col items-center justify-center p-8'>
            <div className='text-2xl mb-2'>
                {recording.chinese.map((char, index) =>
                    <ruby key={index} className='mx-0.5'>{char}
                        <rt>{recording.pinyin[index]}</rt>
                    </ruby>)}
            </div>
            <div className='mb-3'>
                <p>{recording.english}</p>
            </div>
            <button className='bg-bj-yellow-accent hover:bg-bj-yellow transition-colors duration-100
                rounded-full w-12 h-12 flex justify-center items-center' onKeyUp={togglePlayback}
                    onClick={togglePlayback}>
                <FontAwesomeIcon icon={playing ? faPause : faPlay} className='text-xl' />
                <audio ref={audioRef} className='hidden' src={dataHost + recording.url} onPlay={() => setPlaying(true)}
                       onPause={() => setPlaying(false)} />
            </button>
        </div>
    )
}
