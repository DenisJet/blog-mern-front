import React from 'react';
import { useSelector } from 'react-redux';
import axios from '../../axios';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import { selectAuthData } from '../../redux/slices/auth';

export const Index = ({ avatarUrl, id }) => {
  const authData = useSelector(selectAuthData);
  const [text, setText] = React.useState('');

  const onSubmit = async () => {
    try {
      const fields = {
        user: {
          fullName: authData.fullName,
          avatarUrl: authData.avatarUrl,
        },
        text,
      };

      await axios.patch(`/posts/${id}/postComment`, fields);
      window.location.reload();
    } catch (err) {
      console.warn(alert('Ошибка при создании комментария'));
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={avatarUrl} />
        <div className={styles.form}>
          <TextField
            label='Написать комментарий'
            variant='outlined'
            maxRows={10}
            multiline
            onChange={(e) => setText(e.target.value)}
            fullWidth
          />
          <Button onClick={onSubmit} variant='contained'>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
