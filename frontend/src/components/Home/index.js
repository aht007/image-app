import React from 'react'
import { gql, useMutation, useQuery } from "@apollo/client";

import Post from './post.js'
import Header from '../Navbar'

const FETCH_IMAGES = gql`
query ImagesQuery{
  Images{
    id,
    user_id,
    image_link
  }
}
`;

// const cardData = [
//     { id: 1, user_id: 1, image_link: "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back03.jpg" }
//     , { id: 2, user_id: 1, image_link: "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back03.jpg" },
//     { id: 3, user_id: 1, image_link: "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back03.jpg" }
// ]

const Home = () => {
    const { loading, error, data } = useQuery(FETCH_IMAGES,{
        onCompleted: (data) => {
            if(data)
            {
                console.log(data)
            }
            else{
                alert("Failed to fetch Images");
            }
           }
    });
    return (
        <>
            <Header />
            <div className='container'>

                <div className='row row-cols-md-3 g-4 mt-5'>
                    {data && data.Images.map((data, index) => {
                        return <div id={index}><Post data={data} /></div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Home;