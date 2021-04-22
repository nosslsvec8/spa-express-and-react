import React, {useCallback} from 'react';
import {useMutation} from 'react-query';
import CommentEdit from '../../components/Comments/CommentEdit';
import {updateCommentRequest} from "../hooks/crud";

function CommentEditContainer({object}) {
    const {mutate: editComment} = useMutation(updateCommentRequest);

    const onSubmit = useCallback(async formData => {
        try {
            await editComment({id: object.id, ...formData});
        } catch (e) {
            console.log(e);
        }
    }, [editComment]);

    return (
        <CommentEdit comment={object} onSubmit={onSubmit}/>
    );
}

export default CommentEditContainer;
