import { Tag } from 'antd';
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';

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
    :-webkit-scrollbar {
        width: 7px !important;
    }
    :-webkit-scrollbar-thumb {
        background-color: #404247 !important;
    }
    :-webkit-scrollbar-track {
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

const Tags = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const { subscribe_list } = useSelector((state) => state);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <Container universal={true}>
      <Global />
      {subscribe_list.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedTags.indexOf(tag) > -1}
          onChange={(checked) => handleChange(tag, checked)}
          data-aos="fade-up"
          data-aos-duration="3000"
          data-aos-once="false"
          data-aos-anchor-placement=".other-element"
        >
          {JSON.stringify(tag.name, tag.email_address)}
        </CheckableTag>
      ))}
    </Container>
  );
};

export default Tags;
