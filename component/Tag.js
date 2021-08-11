import React, { memo, useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector, connect, useDispatch } from 'react-redux';
import { SCROLLING } from '../reducers';

const SubTag = memo(({ selectedTags, setSelectedTags, tag }) => {
  const onClickTag = (tag) => (e) => {
    console.log(e);
    if (selectedTags.find((v) => tag === v)) {
      setSelectedTags(selectedTags.filter((value) => value !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const isSelected = (tag) => {
    if (selectedTags.find((v) => tag === v)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <CheckableTag
      key={tag.name}
      onClick={onClickTag(tag)}
      selected={isSelected(tag)}
    >
      <StyledTag>
        <Title>{tag.name}</Title>
        <Email>{tag.email_address}</Email>
      </StyledTag>
    </CheckableTag>
  );
});

const Tags = memo(({ selectedTags, setSelectedTags }) => {
  const { sender_list, modalScroll } = useSelector((state) => state);
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    scrollRef.current.scrollBy(0, modalScroll);
  }, [selectedTags]);

  const onScroll = (e) => {
    dispatch({
      type: SCROLLING,
      data: e.target.scrollTop,
    });
    console.log(e);
  };

  return (
    <>
      <div style={{ width: '100%' }}>
        <OverflowGradient>
          <Container universal={true} onScroll={onScroll} ref={scrollRef}>
            <Global />
            {sender_list.map((tag) => (
              <SubTag
                key={tag.name}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                tag={tag}
              />
            ))}
          </Container>
        </OverflowGradient>
      </div>
    </>
  );
});

export default Tags;

const CheckableTag = styled.div`
  display: flex;
  width: 40%;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
  height: 87px;
  margin: 10px;
  border-radius: 12px;
  background-color: ${(props) => (props.selected ? '#3562FF' : ' #393a3f')};
`;

const Global = createGlobalStyle`
    .ant-tag{
        margin: 10px;
    }
    .ant-tag-checkable{
        width: 302px;
        height: 87px;
        text-align: center;
        color: #E5E6EB;
        border-radius: 12px;
        background: #393A3F;

    }
    .ant-tag-checkable-checked{
        background: #3562FF;
    }
`;

const OverflowGradient = styled.div`
  //스크롤 끝까지 내려도 gradient 효과 들어가는거 수정필요
  position: relative;
  width: 100%;
  :before {
    content: '';
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%; //이거 픽셀 아니면 안먹히는데, 모바일 화면 이상함
    height: 50px;
    background: linear-gradient(#2b2e32, rgba(255, 255, 255, 0.001));
  }
  :after {
    content: '';
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 170px;
    background: linear-gradient(transparent, #2b2e32);
    pointer-events: none;
  }
`;

const StyledTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: center;
  flex-flow: wrap;
  padding-top: 25px;
  padding-bottom: 80px;
  height: 303px;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: inherit;
    width: 7px;
    background-color: none;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #404247;
    border-radius: 7px;
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: none;
  }
`;

const Title = styled.div`
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
  text-align: center;
  color: #e5e6eb;
`;

const Email = styled.div`
  font-family: 'Poppins-Regular';
  font-weight: normal;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  color: #b0b1b6;
  opacity: 0.7;
`;
