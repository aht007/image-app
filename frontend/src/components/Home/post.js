import React from 'react'
import { gql, useMutation, useLazyQuery } from "@apollo/client";

const LIKE_MUTATION = gql`
mutation ImageLike(
    $image_id: Int!
    $user_id: Int!
  ) {
    createImageLike(user_id:$user_id, image_id:$image_id){
        id,
        user_id,
        image_id
    }
  }
`;

const GET_IMAGE_LIKES = gql`
query GetImageLikes(
    $image_id: ID!
){
	ImageLikes(image_id:$image_id){
        likes
  }
}
`

const Post = (props) => {

    const [likePic, { loading, error, }] = useMutation(
        LIKE_MUTATION,{
            onCompleted: data=>{
                alert("Image Liked");
            }
        }
    );

    const likeImage = (imageId)=>{
        const userId = parseInt(localStorage.getItem("userId"))
        likePic({
            variables:{
                image_id:parseInt(imageId),
                user_id:userId,
            }
        })
        if(error){
            console.log(error)
        }
    }

    const [getLikes, { likesError }] = useLazyQuery(
        GET_IMAGE_LIKES,{
            onCompleted: (data) => {
                if(data)
                {
                    const likes = data.ImageLikes.likes
                    alert(`This image has been liked ${likes} times`)
                }
                else{
                    alert("Error fetching likes: "+likesError)
                }
               },
               fetchPolicy: 'network-only',
        }
    );

    const getImageLikes = (imageId)=>{
        getLikes({
            variables:{
                image_id:parseInt(imageId)
            }
        })
    }
    return (
        <div className="col" id={props.data.id}>
            <div className="card border-secondary bg-light mb-3" style={{ width: "20rem", height: "30rem" }}>
                <img className="card-img-top" src={props.data.image_link} alt="Card image cap" />
                <div className="card-body">
                    <button className="btn btn-primary" id={props.data.id} onClick={()=>likeImage(props.data.id)}>Like</button>
                </div>
                <div className='card-footer'>
                <button className="btn btn-primary" onClick={()=> getImageLikes(props.data.id)}>See All Like</button>
                </div>
            </div>
        </div>
    )
}
export default Post;
