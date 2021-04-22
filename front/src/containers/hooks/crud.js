import {defaultApiClient, secureApiClient} from "../../config/axios";

export const getPosts = async (limit, page) => {
    return (await secureApiClient.get(`/posts?page=${page}&limit=${limit}`));
};

export const getCountPosts = async () => {
    return (await defaultApiClient.get('/posts/count'));
};

export const getPost = async (id) => {
    return (await secureApiClient.get(`/post/${id}`));
};

export const getUser = async (id) => {
    return (await defaultApiClient.get(`/user/${id}`));
};

export const getByTokenUser = async (data) => {
    const accessToken = localStorage.getItem('accessToken');

    return (accessToken) ? await secureApiClient.post('/getUser', data) : false;
};

export const updateUserRequest = async (data) => {
    return (await secureApiClient.put(`/user/${data.id}`, data));
};

export const createPostRequest = async (data) => {
    return (await secureApiClient.post('/post', data));
};

export const updatePostRequest = async (data) => {
    return (await secureApiClient.put(`/post/${data.id}`, data));
};

export const deletePostRequest = async (data) => {
    return (await secureApiClient.delete(`/post/${data.id}`, data));
};

export const loginRequest = async (data) => {
    await defaultApiClient.post('/auth/login', data).then(response => {
        localStorage.setItem('accessToken', response?.data.accessToken);
    });

    window.location.reload();
};

export const socialLoginRequest = async (data) => {
    await defaultApiClient.post('/auth/social', data).then(response => {
        localStorage.setItem('accessToken', response?.data.accessToken);
    });

    window.location.reload();
};

export const LogoutRequest = async () => {
    const accessToken = localStorage.getItem('accessToken');

    await secureApiClient.post('/auth/logout', {accessToken: accessToken});

    localStorage.removeItem('accessToken');
    window.location.reload();
};

export const getPostCommentsRequest = async (data) => {
    return (await secureApiClient.get(`/comment/postId/${data.postId}`));
};

export const countCommentsRequest = async (data) => {
    return (await defaultApiClient.get(`/comment/countComments/${data.postId}`));
};

export const createCommentRequest = async (data) => {
    return (await secureApiClient.post('/comment/create', data));
};

export const updateCommentRequest = async (data) => {
    return (await secureApiClient.put(`/comment/${data.id}`, data));
};

export const deleteCommentRequest = async (data) => {
    return (await secureApiClient.delete(`/comment/${data.id}`, data));
};


