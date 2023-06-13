import callApi from '../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';

// Export Actions
export function addPost(post) {
	return {
		type: ADD_POST,
		post,
	};
}

export const addPostRequest = (post) => {

	return (dispatch) => {

		return new Promise((resolve, reject) => {
			const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false;
		
			const reader = new FileReader();
		
			reader.onloadend = () => {
			const imageData = reader.result && reader.result.split(',')[1] || false;
		
			const payload = {
				username: userInfo.username,
				title: post.title,
				content: post.content,
				image: imageData
			};
		
			callApi('posts', 'post', { post: payload })
				.then(res => {
				if (!res.success) {
					resolve(false);
				} else {
					return resolve(dispatch(addPost(res.post)));
				}
				})
				.catch(error => reject(error));
			};
		
			if (post.image) {
			reader.readAsDataURL(post.image);
			} else {
			reader.onloadend();
			}
		});
	};
}



export function addPosts(posts) {
	return {
		type: ADD_POSTS,
		posts,
	};
}

export function fetchPosts() {
	return (dispatch) => {
		return callApi('posts').then(res => {
			dispatch(addPosts(res.posts));
		});
	};
}

export function fetchPost(cuid) {
	return (dispatch) => {
		return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
	};
}

export function deletePost(cuid) {
	return {
		type: DELETE_POST,
		cuid,
	};
}

export function deletePostRequest(cuid) {
	return (dispatch) => {
		return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
	};
}