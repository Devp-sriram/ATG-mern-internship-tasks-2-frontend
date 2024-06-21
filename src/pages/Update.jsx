import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/update.css';
import API_URL from '../../config/global'
import Comments from './Comments'

function Update() {
    const [file, setFile] = useState();
    const [image, setImage] = useState([]);
    const [like, setLike] = useState(0);

    const [showCommments,setShowCommments] = useState(false)
    const [selectedPostId, setSelectedPostId] = useState(null); 
    // const [isImageDeleted, setIsImageDeleted] = useState(false);


    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            let response;
            if (selectedPostId) {
                // Update the alread existing post
                response = await axios.put(`${API_URL}/update/${selectedPostId}`, formData);
            } else {
                // create new post
                response = await axios.post(`${API_URL}/upload`, formData);
            }
            console.log(response);
        } catch (error) {
            console.error('from frontend', error);
        }
    };

    const handleDelete = async () => {
        if (selectedPostId) {
            try {
                const response = await axios.delete(`${API_URL}/delete/${selectedPostId}`);
                console.log(response);
                // remove the posr from the local state as
                setImage(prevImages => prevImages.filter(imgObj => imgObj._id!== selectedPostId));
                // setIsImageDeleted(false);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const toggleComments =()=>{
        setShowCommments(!showCommments)
    }

    const addLikes = async () => {
        try {
            await axios.put(`${API_URL}/like/${selectedPostId}`);
    
            // Then, fetch the updated likes count from the server
            const response = await axios.get(`${API_URL}/like/${selectedPostId}`);
            setLike(response.data); // Correctly update the state with the new likes count
        } catch (error) {
            console.error("Failed to add likes:", error);
        }
    };
    

    useEffect(() => {
        axios.get(`${API_URL}/getImage`)
            .then(res => setImage(res.data))
            .catch(e => console.log(e));
    }, [handleUpload , handleDelete]);

    const selectPost = (id) => {
        setSelectedPostId(id);
    };

    // useEffect(() => {
    //     const fetchInitialLikes = async () => {
    //         try {
    //             const response = await axios.get(`${API_URL}/like/${selectedPostId}`);
    //             setLike(response.data);
    //         } catch (error) {
    //             console.error("Failed to fetch initial likes:", error);
    //         }
    //     };
    //     fetchInitialLikes();
    // }, []);
    

    return (
        <>
            <div>
            <div className='flex justify-between m-2' >
                <input type="file" onChange={e => setFile(e.target.files[0])} />
              <div className= "mx-5">  
                <button className= "p-2 bg-blue-700 text-white rounded-2xl mx-2" type='button' onClick={handleUpload}>Upload</button>
                {/* <button className= "p-2 bg-red-700 text-white rounded-2xl mx-2" type='button' onClick={handleDelete}>Delete</button> */}
              </div>
            </div>

            <p >( note: to change or reupload the post or like the post click on the post once then change it , delete option also click on the center of the post once and you can do everything)</p>
            <p >(if anything stops working reload the page it will be good to go)</p>

                 <br />
                <div className='border-2 border-black w-1/2 mx-auto'>
                
                    {image.map((imgObj, index) => (
                        <div className='h-auto m-3 ' key={index} onClick={() => selectPost(imgObj._id)}>
                            <div className=' border-2 border-gray-300 w-full'>
                            <img src={`${API_URL}/files/${imgObj.image}`} alt="" />
                            
                                    <div className='flex justify-between'>
                                    <button onClick = {addLikes} className='flex p-4'><img className='w-6 mr-2' src="./like.png" alt="" />  {like}</button>
                                    <button onClick = {toggleComments}  className='flex p-4'><img className='w-8 mr-2' src="./comment.png" alt="" /></button>
                                    <button onClick = {handleDelete}  className='flex p-4'><img className='w-8 mr-2' src="./delete.png" alt="" /></button>
                                    </div>
            
                                {showCommments? <Comments postId={selectedPostId} /> : null }

                            </div>
                        </div>
                    ))}
            
                </div>
            </div>
        </>
    );
}

export default Update;



