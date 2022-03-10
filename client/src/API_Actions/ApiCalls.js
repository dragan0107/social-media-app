import axios from 'axios';

export const registerUser = async (username, email, password, dispatch) => {
    const data = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
    };
    dispatch({ type: 'LOGIN_START' });
    try {
        const res = await axios.post('/auth/register', data);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
        localStorage.setItem('jwt', res.data.jwt);
        localStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (error) {
        console.log(error);
        dispatch({ type: 'LOGIN_FAILURE' });
    }
};

export const loginUser = async (username, password, dispatch) => {
    const data = {
        username: username.current.value,
        password: password.current.value,
    };
    dispatch({ type: 'LOGIN_START' });
    try {
        const res = await axios.post('/auth/login', data);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
        localStorage.setItem('jwt', res.data.jwt);
        localStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (error) {
        console.log(error);
        dispatch({ type: 'LOGIN_FAILURE' });
    }
};

// Fetches the post for timeline or for the user profile page depending on the request.
export const getPosts = async (
    usernameURL,
    user,
    setPosts,
    dispatch,
    setPostsFetching
) => {
    try {
        setPostsFetching(true);
        const res = usernameURL
            ? await axios.get(`/posts/user/${usernameURL}`)
            : await axios.get(`/posts/timeline/${user._id}`, {
                  headers: {
                      authorization: 'Bearer ' + localStorage.getItem('jwt'),
                  },
              });
        setPosts(res.data.allPosts);
        setPostsFetching(false);
    } catch (error) {
        if (error.response.status === 403) {
            dispatch({ type: 'LOGOUT' });
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
        }
    }
};

// Gets user information through the query
export const getUser = async (usernameURL, setUserData) => {
    try {
        const res = await axios.get(`/users/?username=${usernameURL}`);
        // console.log(res);
        setUserData(res.data);
    } catch (error) {
        console.log(error);
    }
};

// This function checks if the currently logged user has already reacted to the post and adds styling to the likes or dislikes
export const reactionChecker = (user, post, setIsLiked, setIsDisliked) => {
    if (post.likes.includes(user._id)) {
        setIsLiked(true);
    } else if (post.dislikes.includes(user._id)) {
        setIsDisliked(true);
    }
};

export const getConversations = async (setConversations, id) => {
    try {
        const res = await axios.get(`/conversations/${id}`);
        setConversations(res.data.conversations);
    } catch (error) {
        console.log(error);
    }
};

export const getMessages = async (setMessages, id) => {
    try {
        const res = await axios.get(`/messages/${id}`);
        setMessages(res.data);
    } catch (error) {
        console.log(error);
    }
};
