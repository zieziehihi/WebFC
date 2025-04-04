import React from 'react'
import Title from '../components/Title'

const Home = () => {
    return (

        <div>
            <div className='text-2xl text-center pt-8 '>
                <Title text1={'ADMIN '} text2={'HOME'}></Title>
            </div>

            <div className='my-10 text-justify flex flex-col md:flex-row gap-16'>

                <div className='flex flex-col justify-center gap-6'>
                    <img src='https://www.theforage.com/blog/wp-content/uploads/2022/12/business-casual-1-scaled.jpg' alt='' />

                </div>
            </div>
        </div >
    )
}

export default Home
