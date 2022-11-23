import React from 'react';
import { gql, useMutation } from "@apollo/client";

const UPLOAD_MUTATION = gql`
mutation createImageMutation(
    $image_link: String!
    $user_id: Int!
  ) {
    createImage(user_id:$user_id, image_link:$image_link)
    {
        id,
        user_id,
    }
  }
`;


const Navbar = () => {
    const logout = ()=>{
        localStorage.clear()
        window.location.href = "/auth"
    }

    const [uploadPic, { loading, error, }] = useMutation(
        UPLOAD_MUTATION,{
            onCompleted: data=>{
                alert("Upload Complete");
            }
        }
    );

    const uploadPicture = ()=>{
        console.log(localStorage.getItem("userId"))
        uploadPic({
            variables: {
                image_link:"http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back03.jpg",
                user_id:parseInt(localStorage.getItem("userId"))
            }
        })
        if (error) {
            alert("Upload Failed")
        }
    }
    
    return (
        <nav className="navbar navbar navbar-dark bg-dark justify-content-between">
            <a className="navbar-brand m-2">Welcome</a>
            <button className="btn btn-outline-primary my-2 my-sm-0" type="button" onClick={uploadPicture}>Upload Picture</button>
            <button className="btn btn-outline-success my-2 my-sm-0 m-4" type="button" onClick={logout}>Logout</button>
        </nav>
    );
};

export default Navbar;