import React, {useCallback} from 'react';
import {useMutation} from 'react-query';
import CommentDelete from '../../components/Comments/CommentDelete';
import {deleteCommentRequest} from "../hooks/crud";

function CommentDeleteContainer({object}) {
    const {mutate: deleteComment} = useMutation(deleteCommentRequest);

    const onSubmit = useCallback(async () => {
        try {
            await deleteComment(object);
        } catch (e) {
            console.log(e);
        }
    }, [deleteComment]);

    return (
        <CommentDelete onSubmit={onSubmit}/>
    );
}

export default CommentDeleteContainer;
