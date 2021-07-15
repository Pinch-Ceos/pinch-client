import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../component/AppLayout';
import CardList from '../../component/CardList';
import { LOAD_MAIL_REQUEST } from '../../reducers';

const Mail = () => {
  const router = useRouter();
  const { newsletter } = router.query;
  const dispatch = useDispatch();
  const { mails, subscribe_list, hasMoreMails, loadMailLoading } = useSelector(
    (state) => state
  );
  const [header, setHeader] = useState('');

  useEffect(() => {
    if (newsletter === 'inbox') {
      dispatch({
        type: LOAD_MAIL_REQUEST,
        data: '',
      });
      setHeader('전체 뉴스레터');
    } else {
      dispatch({
        type: LOAD_MAIL_REQUEST,
        data: newsletter,
      });
      setHeader(
        subscribe_list.find((v) => v.email_address === newsletter).name
      );
    }
  }, [newsletter]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMoreMails && !loadMailLoading) {
          if (newsletter === 'inbox') {
            dispatch({
              type: LOAD_MAIL_REQUEST,
              data: '',
            });
          } else {
            dispatch({
              type: LOAD_MAIL_REQUEST,
              data: newsletter,
            });
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [newsletter, mails.length, hasMoreMails, loadMailLoading]);

  return (
    <>
      <AppLayout>
        <CardList data={mails} header={header} />
      </AppLayout>
    </>
  );
};

export default Mail;