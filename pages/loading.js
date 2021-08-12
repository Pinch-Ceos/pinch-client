import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { LoaderWrapper, ImageWrapper } from './redirect';

const Loading = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/inbox');
  }, []);
  return (
    <LoaderWrapper>
      <ImageWrapper>
        <img
          src={'/design/30266-documents.gif'}
          alt="loader"
          style={{ width: '27em', height: '27em' }}
        />
      </ImageWrapper>
    </LoaderWrapper>
  );
};

export default Loading;
