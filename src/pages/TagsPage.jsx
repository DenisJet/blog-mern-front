import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { fetchPostsByTag } from '../redux/slices/post';

export const TagsPage = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const userData = useSelector((state) => state.auth.data);

  React.useEffect(() => {
    dispatch(fetchPostsByTag(name));
  }, [dispatch, name]);

  return (
    <>
      <h1>{`#${name}`}</h1>
      <Grid xs={8} item>
        {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
          isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:8080${obj.imageUrl}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
          )
        )}
      </Grid>
    </>
  );
};
