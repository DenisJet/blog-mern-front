import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import {
  fetchPostsSortByNew,
  fetchPostsSortByPopular,
  fetchTags,
  selectLastComments,
} from '../redux/slices/post';
import { BASEURL } from '../consts';

export const Home = () => {
  const [activeSort, setActiveSort] = useState(0);
  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const comments = useSelector(selectLastComments);

  const dispatch = useDispatch();

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPostsSortByNew());
    dispatch(fetchTags());
  }, [dispatch]);

  const handleSortChange = () => {
    if (activeSort === 0) {
      setActiveSort(1);
      dispatch(fetchPostsSortByPopular());
    } else {
      setActiveSort(0);
      dispatch(fetchPostsSortByNew());
    }
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        onChange={handleSortChange}
        value={activeSort}
        aria-label='basic tabs example'
      >
        <Tab label='Новые' />
        <Tab label='Популярные' />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `${BASEURL}${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={comments} isLoading={false} />
        </Grid>
      </Grid>
    </>
  );
};
