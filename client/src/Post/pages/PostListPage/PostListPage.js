import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
import { addPostRequest, deletePostRequest, fetchPosts } from '../../PostActions';
import Logo from '../../../logo.svg';
import { isTokenExpired } from "../../../util/tokenization";

import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const PostListPage = ({ showAddPost }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector(state => state.posts.data);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false;
  const [open, setOpen] = React.useState(false);

  useEffect(() => {

    isTokenExpired()
    .then(isExpired => {
        if (isExpired) {
            localStorage.removeItem('user');
            history.push('/login');
        }
        else{
            dispatch(fetchPosts());
        }
    })
    .catch(error => {
        console.error('Error checking token expiration:', error);
    });

  },[dispatch]);

  const handleDeletePost = post => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      dispatch(deletePostRequest(post));
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPost = async (post) => {

    try {
      const response = await dispatch(addPostRequest(post));

      if (!response) {
        history.push('/login');
      }
        
    } catch (error) {
      console.error('Error adding the post:', error);
    }

    handleClose();

  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-12 d-flex align-items-center">
          <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
          <h1 className="mt-4">
             Alaya Blog
          </h1>
        </div>
        <div className='col-sm-6 col-12 d-flex justify-content-end align-items-end'> 
          <h6 className='mt-2'>Hi, {user.fullName}</h6>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
          <Button variant="contained" className='fw-bold' color="primary" onClick={handleClickOpen}>
              + Create a new post
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <PostCreateWidget addPost={handleAddPost} showAddPost={showAddPost} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="col-12">
          <PostList handleDeletePost={handleDeletePost} posts={posts} user_logged={user.username}  />
          {/* TODO: Pagination */}
        </div>
      </div>
    </div>
  );
};

PostListPage.propTypes = {
  showAddPost: PropTypes.bool.isRequired
};


export default PostListPage;
