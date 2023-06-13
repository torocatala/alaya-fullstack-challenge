import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../../PostActions';
import { useParams } from 'react-router-dom';
import { isTokenExpired } from "../../../util/tokenization";
import { useHistory } from 'react-router-dom';


export function PostDetailPage() {

  const { cuid } = useParams();
  const post = useSelector(state => state.posts.data.find(currentPost => (currentPost.cuid === cuid)));
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    // Check for token expiracy on page load
    isTokenExpired()
    .then(isExpired => {
        if (isExpired) {
            localStorage.removeItem('user');
            history.push('/login');
        }
        else{
          if (!post) dispatch(fetchPost(cuid));
        }
    })
    .catch(error => {
        console.error('Error checking token expiration:', error);
    });

  },[]);


  // Formatting date 
  let formattedDate = false;
  if(post){
    const postDate = new Date(post.dateAdded);
    formattedDate = postDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  return (post
    ?
      (<div className="container">
        <div className="row">
          <div className="col-12">
            <a href="/" className="previous">&laquo; Previous</a>
            <article>
              <header className='mb-4'>
                <h1 className='fw-bolder mb-1'>{post.title}</h1>
                <div className='text-muted fst-italic mb-2'>Posted on {formattedDate || post.dateAdded} by {post.username}</div>
              </header>
              { post.image_url ?
                  <figure className='mb-4'>
                    <img src={post.image_url} alt={post.title + ' image'} className="img-fluid rounded" />
                  </figure> 
                : ''
              }
              <section className='mb-5'>
                <p className='fs-5 mb-4'>{post.content}</p>
              </section>

            </article>
          </div>
        </div>
      </div>)
    : (<div>Loading</div>)
  );
}
export default PostDetailPage;
