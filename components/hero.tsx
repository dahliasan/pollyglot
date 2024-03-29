import Image from 'next/image'

const Hero = () => {
  return (
    <div className='hero relative w-full px-4 py-8 sm:rounded-md overflow-hidden'>
      <div className='absolute bg-black inset-0 z-0'>
        <Image src='/worldmap.png' alt='worldmap decorative background' fill />
      </div>

      <div className='relative z-10 flex gap-4 items-center justify-center'>
        <Image src='/parrot.png' alt='parrot' width={100} height={100} />
        <div className='text-white'>
          <h1 className='text-green-500 text-2xl md:text-4xl font-extrabold'>
            PollyGlot
          </h1>
          <p className='text-sm md:text-base'>Translate and learn a language</p>
        </div>
      </div>
    </div>
  )
}

export default Hero
