import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPostsSortByNew = createAsyncThunk('posts/fetchPostsNew', async () => {
  const { data } = await axios.get('/posts/new');
  return data;
});

export const fetchPostsSortByPopular = createAsyncThunk('posts/fetchPostsPopular', async () => {
  const { data } = await axios.get('/posts/popular');
  return data;
});

export const fetchPostsByTag = createAsyncThunk('posts/fetchPostsByTag', async (tag) => {
  const { data } = await axios.get('/posts/new');
  return data.filter((item) => item.tags.includes(tag));
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
  axios.delete(`/posts/${id}`);
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    // Получение новых статей
    [fetchPostsSortByNew.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPostsSortByNew.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPostsSortByNew.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    // Получение популярных статей
    [fetchPostsSortByPopular.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPostsSortByPopular.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPostsSortByPopular.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    // Получение тегов
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },

    // Получение статей по тегу
    [fetchPostsByTag.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPostsByTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPostsByTag.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    // Удаление статьи
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export const selectLastComments = (state) => {
  const lastComments = [];

  state.posts.posts.items.forEach((item) => {
    const comments = item.comments.slice().reverse();
    lastComments.push(comments[0]);
  });

  return lastComments.flat().slice(0, 5);
};

export const postsReducer = postsSlice.reducer;
