import {apiClient} from "../../config/axios";

export const getPosts = async () => {
    return (await apiClient.get('/posts'));
};
