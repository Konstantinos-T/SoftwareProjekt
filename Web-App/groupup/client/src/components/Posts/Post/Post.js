import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from './styles';

const Post = ({ post }) => {
  
  const classes = useStyles();

  console.log(post);
  return (
    <form>
      <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" color="textSecondary" component="p">Start: {post.Start}</Typography>
        <Typography variant="h6" color="textSecondary" component="p">Ziel: {post.Ziel}</Typography>
        <Typography variant="h6" color="textSecondary" component="p">Datum: {post.Datum}</Typography>
        <Typography variant="h6" color="textSecondary" component="p">Abfahrt von: {post.Abfahrt} Uhr</Typography>
        <Typography variant="h6" color="textSecondary" component="p">Ankunft in: {post.Ankunft} Uhr</Typography>
        <Typography variant="h6" color="textSecondary" component="p">Preis: {post.Preis} Euro</Typography>
        <Typography variant="h6" color="textSecondary" component="p">Anzahl der freien Sitze: {post.Sitze}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button        
          variant="contained" 
          size="small" 
          color="primary" >
            <DeleteIcon fontSize="small"/> Delete </Button>
      </CardActions>
    </Card>
    </form>
  );
};

export default Post;