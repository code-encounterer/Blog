import { Button, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from './Comment';

function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await fetch(`/api/comment/getPostComments/${postId}`);
                if(response.ok){
                    const data = await response.json();
                    setComments(data);
                }
            } catch (error) {
                
            }
        }
        getComments();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
          return;
        }
        try{
            const response = await fetch('/api/comment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: comment, postId, userId: currentUser._id})
            });
            const data = await response.json();
            if (response.ok) {
                setComment('');
                setCommentError(null);
                setComments([data, ...comments])
            }
        }catch(error){
            setCommentError(error.mesage);
        }
      };

    return (
        <div className="max-w-2xl mx-auto w-full p-3">
            {currentUser ? (
                <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                    <p>Logged in as:</p>
                    <img className="w-5 h-5 object-cover rounded-full" src={currentUser.profilePicture} alt="" />
                    <Link className="text-xs text-cyan-600 hover:underline" to={'/dashboard?tab=profile'}>
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className="text-sm text-teal-500 my-5 flex gap-1">
                    You must be logged in to comment.
                    <Link className="text-blue-500 hover:underline" to={'/sign-in'}>Sign In</Link>
                </div>
            )}
            {currentUser && (
                <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
                    <Textarea onChange={(e) => setComment(e.target.value)} value={comment} placeholder="Add a comment..." rows="3" maxLength="200"/>
                    <div className="flex justify-between items-center mt-5">
                        <p className="text-gray-500 test-xs">{200 - comment.length} characters remaining</p>
                        <Button gradientDuoTone="purpleToBlue" type="submit" outline>Submit</Button>
                    </div>
                    {
                        commentError && <Alert className="mt-5" color="failure">{commentError}</Alert>
                    }      
                </form>
            )}
            {comments.length === 0 ? (
                <p className="text-sm my-5">No comments yet!</p>
            ): (
                <>
                    <div className="text-sm my-5 flex items-center gap-1">
                        <p>Comments</p>
                        <div className="border border-gray-500 px-2 py-1 rounded-sm">
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {comments.map(comment => (
                        <Comment key={comment._id} comment={comment}/>
                    ))}
                </>
            )}
        </div>
    )
}

export default CommentSection;