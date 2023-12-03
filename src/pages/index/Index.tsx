import Search from './Search.tsx'
import imageDesktop from './image-desktop.webp'
import imageMobile from './image-mobile.webp'

function DesktopIndex() {
    return (
        <div className='bg-bj-red relative h-screen w-screen overflow-hidden'>
            <div className='z-10 absolute -top-[50vh] -left-[40vw] bg-white h-[200vh] w-[110vw] rounded-full'></div>
            <div className='flex w-full h-full z-20'>
                <div className='w-1/2 flex flex-col justify-center px-[12vw] z-30'>
                    <h1 className='text-6xl xl:text-7xl font-bold font-display mb-12'>
                        Beijing<br />
                        <span className='ml-24'>Speaks</span>
                    </h1>
                    <p className='mb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>

                    <Search />
                </div>

                <div className='w-1/2 flex flex-col justify-center ml-[6vw] xl:ml-[10vw] relative'>
                    <div className='absolute z-30 left-5 mt-12 rounded-xl bg-bj-yellow w-[32vw] xl:w-[24vw] h-[64vh]'></div>
                    <img className='z-40 w-[32vw] xl:w-[24vw] h-[64vh] object-cover rounded-xl' src={imageDesktop} alt='Image of a tower in Beijing style' />
                </div>
            </div>
        </div>
    )
}

function MobileIndex() {
    return (
        <div className='overflow-hidden h-screen w-screen'>
            <div className='absolute -z-20 bottom-0 w-full bg-cover bg-center h-[40vh]' style={{backgroundImage: `url(${imageMobile})`}}></div>
            <div className='absolute -z-10 bg-white rounded-full top-1/3 left-1/2 h-[100vh] w-[100vh]' style={{transform: 'translate(-50%, -50%)'}}></div>

            <div className='h-full px-16 py-32 flex items-center flex-col'>
                <h1 className='text-5xl font-bold font-display mb-12'>
                    Beijing<br />
                    <span className='ml-24'>Speaks</span>
                </h1>

                <p className='mb-8 text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>

                <Search />
            </div>
        </div>
    )
}

export default function Index() {
    return (
        <div>
            <div className='hidden lg:block'>
                <DesktopIndex />
            </div>
            <div className='lg:hidden'>
                <MobileIndex />
            </div>
        </div>
    )
}
