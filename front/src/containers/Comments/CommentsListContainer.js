import React from 'react';
import {useQuery} from 'react-query';
import CommentsList from '../../components/Comments/CommentsList';
import {countCommentsRequest, getPostCommentsRequest} from "../hooks/crud";

function CommentsListContainer({postId}) {
    const {data: response, isFetching} = useQuery(['comments', postId], () => getPostCommentsRequest({postId: postId}));
    const {data: count} = useQuery(['countComments', postId], () => countCommentsRequest({postId: postId}));
    const comments = response?.data || [];
    const countComments = count?.data[0]?.count || 0;

    return (
        <CommentsList postId={postId} comments={comments} isFetching={isFetching} countComments={countComments}/>
    );
}

export default CommentsListContainer;
