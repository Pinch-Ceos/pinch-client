import { Tag } from 'antd';
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { select } from '@redux-saga/core/effects';

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
    .Container :-webkit-scrollbar {
        width: 7px !important;
    }
    .Container :-webkit-scrollbar-thumb {
        background-color: #404247 !important;
    }
    .Container :-webkit-scrollbar-track {
        background-color: none !important;
    }
`;

const { CheckableTag } = Tag;
const Container = styled.div`
  height: 300px;
  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
`;

const Tags = ({ selectedTags, setSelectedTags }) => {
  const { sender_list } = useSelector((state) => state);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <Container universal={true}>
      <Global />
      {sender_list.map((tag) => (
        <CheckableTag
          key={tag.name}
          checked={selectedTags.indexOf(tag) > -1}
          onChange={(checked) => handleChange(tag, checked)}
        >
          {tag.name}
          <br />
          {tag.email_address}
        </CheckableTag>
      ))}
    </Container>
  );
};

export default Tags;
