import React, {useCallback} from 'react';
import {useMutation} from 'react-query';
import CommentCreate from '../../components/Comments/CommentCreate';
import {createCommentRequest} from "../hooks/crud";
import getCurrentDateForDB from "../../services/getCurrentDateForDB";

function CommentCreateContainer({postId, userId}) {
    const {mutate: createComment} = useMutation(createCommentRequest);

    const onSubmit = useCallback(async formData => {
        try {
            await createComment({
                ...formData,
                postId: postId,
                userId: userId,
                createdAt: getCurrentDateForDB()
            });
        } catch (e) {
            console.log(e);
        }
    }, [createComment]);

    return (
        <CommentCreate onSubmit={onSubmit}/>
    );
}

export default CommentCreateContainer;
