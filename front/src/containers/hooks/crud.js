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

export const getUser = async (id) => {
    return (await apiClient.get(`/user/${id}`));
};

export const getByTokenUser = async (data) => {
    return (await apiClient.post(`/getUser`, data, {
        headers: {
            'Authorization' : `Bearer ${data.accessToken}`
        }
    }));
};

export const updateUserRequest = async (data) => {
    const accessToken = localStorage.getItem('accessToken');
    return (await apiClient.put(`/user/${data.id}`, data, {
        headers: {
            'Authorization' : `Bearer ${accessToken}`
        }
    }));
};

export const createPostRequest = async (data) => {
    return (await apiClient.post('/post', data, {
        headers: {
            'Authorization' : `Bearer ${data.accessToken}`
        }
    }));
};

export const updatePostRequest = async (data) => {
    return (await apiClient.put(`/post/${data.id}`, data, {
        headers: {
            'Authorization' : `Bearer ${data.accessToken}`
        }
    }));
};

export const deletePostRequest = async (data) => {
    return (await apiClient.delete(`/post/${data.id}`, data, {
        headers: {
            'Authorization' : `Bearer ${data.accessToken}`
        }
    }));
};

export const loginRequest = async (data) => {
    let accessToken = null;

    await apiClient.post(`/auth/login`, data).then(response => {
        accessToken = response?.data.accessToken;
    });

    localStorage.setItem('accessToken', accessToken);
};

export const isCheckAccessToken = async (data) => {
    return (await apiClient.post(`/auth/isCheckAccessToken`, data, {
        headers: {
            'Authorization' : `Bearer ${data.accessToken}`
        }
    }));
};
