import { Tag } from 'antd';
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { select } from '@redux-saga/core/effects';

const Tags = ({ selectedTags, setSelectedTags }) => {
  const { sender_list } = useSelector((state) => state);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <div style={{ width: '100%' }}>
      <OverflowGradient>
        <Container universal={true}>
          <Global />
          {sender_list.map((tag) => (
            <CheckableTag
              key={tag.name}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={(checked) => handleChange(tag, checked)}
            >
              <StyledTag>
                <Title>{tag.name}</Title>
                <Email>{tag.email_address}</Email>
              </StyledTag>
            </CheckableTag>
          ))}
        </Container>
      </OverflowGradient>
    </div>
  );
};

export default Tags;

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

const { CheckableTag } = Tag;

const StyledTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
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
