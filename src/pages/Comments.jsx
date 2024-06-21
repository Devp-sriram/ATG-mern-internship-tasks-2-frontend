import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../config/global'

function Comments({ postId }) {

    const [formData, setFormData] = useState({
        comment: '' ,// Only keep the comment field
    });
    const [commentList, setCommentList] = useState([]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`${API_URL}/comments/${postId}`, formData );
            console.log(response.data);

    
            // Fetch updated comments
            const commentsResponse = await axios.get(`${API_URL}/comments/${postId}`);
            console.log(commentsResponse.data);
    
            const comments = (commentsResponse.data.Comments)? commentsResponse.data.Comments : [];
            setCommentList(comments);
            
            // Update state with fetched comments
            // Assuming you want to store comments in a separate state variable
            setCommentList(commentsResponse.data.Comments);
    
            // Optionally, clear the form
            setFormData({ comment: '' });
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };
    

    return (
        <div className='w-full '>
            <div>
            <form className='w-full relative' onSubmit={handleSubmit}>
                <textarea
                    name="comment"
                    className='w-full'
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Enter your comment..."
                    required
                >
                </textarea>
                <button className='absolute  w-6 right-4 bottom-8 rounded-2xl' type="submit"><img className="w-4" src="./up-arrow.png" alt="" /></button>
            </form>
            </div>

            {/* Display comments */}
            {/* <div>
                {commentList.map((comment, index) => (
                    <p key={index}>{comment}</p> // Adjusted to match the expected structure of each comment
                ))}
            </div> */}

            
        </div>
    );
}

export default Comments;
