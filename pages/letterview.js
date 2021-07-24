import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../component/AppLayout';

const NewsLetterView = () => {
  const { view } = useSelector((state) => state);
  return (
    <>
      <AppLayout>
        <iframe
          name="NeBoard"
          scrolling="No"
          onLoad="ResizeFrame(`NeBorad`);"
          style={{
            width: '75vw',
            height: '75vh',
            wordBreak: 'break-all',
            border: 'none',
            boxShadow: 'none',
          }}
          srcDoc={`${view}`}
        ></iframe>
      </AppLayout>
    </>
  );
};

export default NewsLetterView;
