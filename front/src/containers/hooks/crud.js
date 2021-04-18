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
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken !== null) {
        return (await apiClient.post(`/getUser`, data, {
            headers: {
                'Authorization': `Bearer ${data.accessToken}`
            }
        }));
    } else {
        return false;
    }
};

export const updateUserRequest = async (data) => {
    const accessToken = localStorage.getItem('accessToken');
    return (await apiClient.put(`/user/${data.id}`, data, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }));
};

export const createPostRequest = async (data) => {
    return (await apiClient.post('/post', data, {
        headers: {
            'Authorization': `Bearer ${data.accessToken}`
        }
    }));
};

export const updatePostRequest = async (data) => {
    return (await apiClient.put(`/post/${data.id}`, data, {
        headers: {
            'Authorization': `Bearer ${data.accessToken}`
        }
    }));
};

export const deletePostRequest = async (data) => {
    return (await apiClient.delete(`/post/${data.id}`, data, {
        headers: {
            'Authorization': `Bearer ${data.accessToken}`
        }
    }));
};

export const loginRequest = async (data) => {
    let accessToken = null;

    await apiClient.post(`/auth/login`, data).then(response => {
        accessToken = response?.data.accessToken;
    });

    localStorage.setItem('accessToken', accessToken);
    window.location.reload();
};

export const socialLoginRequest = async (data) => {
    let accessToken = null;

    await apiClient.post(`/auth/social`, data).then(response => {
        accessToken = response?.data.accessToken;
    });

    localStorage.setItem('accessToken', accessToken);
    window.location.reload();
};

export const LogoutRequest = async () => {
    const accessToken = localStorage.getItem('accessToken');

    await apiClient.post('/auth/logout', {accessToken: accessToken}, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    localStorage.removeItem('accessToken');
    window.location.reload();
};

export const isCheckAccessToken = async (data) => {
    return (await apiClient.post(`/auth/isCheckAccessToken`, data, {
        headers: {
            'Authorization': `Bearer ${data.accessToken}`
        }
    }));
};
