import React, {useContext} from 'react';
import {CurrentUserContext} from "../../containers/RenderContainer";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import ActionMenu from "../../components/ActionMenu";
import CommentCreate from "../../containers/Comments/CommentCreateContainer";
import CommentEdit from "../../containers/Comments/CommentEditContainer";
import CommentDelete from "../../containers/Comments/CommentDeleteContainer";

const useStyles = makeStyles((theme) => ({
    detailsList: {
        flexDirection: 'column',
        '& > div': {
            marginTop: '15px'
        },
        '& > div:first-child': {
            marginTop: '0'
        }
    },
    commentTitle: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

function CommentsList({postId, comments, isFetching, countComments}) {
    const currentUser = useContext(CurrentUserContext);
    const classes = useStyles();

    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Comments: {countComments}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.detailsList}>
                    {isFetching && 'Loading comments...'}
                    {!isFetching &&
                    comments.map(({id, userId, name, text, createdAt}) => (
                        <Grid item xs={12} key={id}>
                            <Paper>
                                <CardContent>
                                    <div className={classes.commentTitle}>
                                        <span>{name}</span>
                                        <span>{createdAt.substr(0, 10)}</span>
                                        {userId===currentUser.id &&
                                        <ActionMenu object={{id, text, userId}} ObjectEdit={CommentEdit} ObjectDelete={CommentDelete}/>}
                                    </div>
                                    <Typography variant="body1">{text}</Typography>
                                </CardContent>
                            </Paper>
                        </Grid>
                    ))}
                    <CommentCreate postId={postId} userId={currentUser.id}/>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default CommentsList;
