import React from 'react';
import {useQuery} from 'react-query';
import Post from '../components/Posts/Post';
import {getPost} from "./hooks/crud";
import {useLocation} from "react-router";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

function PostContainer() {
    const regEx = /[^\d\+]/g;
    const location = useLocation();
    const id = location.pathname.replace(regEx, '');

    const {data: response, isFetching} = useQuery('post', () => getPost(+id));
    const post = response?.data || [];

    return (
        <Card>
            <CardHeader title="Posts:"/>
            <CardContent>
                <Post post={post} isFetching={isFetching}/>
            </CardContent>
        </Card>
    );
}

export default PostContainer;
