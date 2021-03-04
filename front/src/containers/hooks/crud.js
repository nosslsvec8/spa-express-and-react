import {apiClient} from "../../config/axios";

export const getPosts = async (limit, page) => {
    return (await apiClient.get(`/posts?page=${page}&limit=${limit}`));
};

export const getCountPosts = async () => {
    return (await apiClient.get('/posts/count'));
};

export const getPost = async (id) => {
    return (await apiClient.get(`/post/${id}`));
};

export const createPostRequest = async (data) => {
    return (await apiClient.post('/post', data));
};

export const updatePostRequest = async (data) => {
    return (await apiClient.put(`/post/${data.id}`, data));
};
