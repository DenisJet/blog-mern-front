import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login, TagsPage } from './pages';
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/slices/auth';
import { AppRoute } from './consts';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path={AppRoute.HOME} element={<Home />} />
          <Route path={AppRoute.POST} element={<FullPost />} />
          <Route path={AppRoute.POST_EDIT} element={<AddPost />} />
          <Route path={AppRoute.ADD_POST} element={<AddPost />} />
          <Route path={AppRoute.LOGIN} element={<Login />} />
          <Route path={AppRoute.REGISTER} element={<Registration />} />
          <Route path={AppRoute.TAGS_PAGE} element={<TagsPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
