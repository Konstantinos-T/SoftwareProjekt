import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = (props) => {
  /* const posts = useSelector((state) => state.posts); */
  const posts = props.data;
  const classes = useStyles();

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={3} md={3}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
