export const PORT = 8080;

export const AppRoute = {
  HOME: '/',
  POST: '/posts/:id',
  POST_EDIT: '/posts/:id/edit',
  ADD_POST: '/add-post',
  LOGIN: '/login',
  REGISTER: '/register',
  TAGS_PAGE: '/tags/:name',
};

export const ApiRoute = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',
  POSTS_NEW: '/posts/new',
  POSTS_POPULAR: '/posts/popular',
  TAGS: '/tags'
};
