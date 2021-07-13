import { Tag } from 'antd';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
    .ant-tag{
        /* display: flex;
        justify-content: center; */
        margin: 5px;
    }
    .ant-tag-checkable{
        width: 300px;
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
        width: 7px;
    }
    :-webkit-scrollbar-thumb {
        background-color: #404247;
    }
    :-webkit-scrollbar-track {
        background-color: none;
    }
`;

const { CheckableTag } = Tag;
const Container = styled.div`
  height: 300px;
  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  :-webkit-scrollbar {
    /* width: 7px; */
    width: 0;
    display: none;
  }
  :-webkit-scrollbar-thumb {
    background-color: #404247;
  }
  :-webkit-scrollbar-track {
    background-color: none;
  }
`;

const tagsData = [
  { 스페이스오디티: '123@123.com' },
  { 뉴닉: '1234@123.com' },
  { 집가고싶당: '123@123.com' },
  { '어쩌구~': '1234@123.com' },
  { 'css왜 적용안댐': '123@123.com' },
  { '다섯개째~': '1234@123.com' },
  { 스페이스오디티: '123@123.com' },
  { 뉴닉: '1234@123.com' },
];

class Tags extends React.Component {
  state = {
    selectedTags: ['Books'],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    // console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <Container>
        <Global />
        <span style={{ marginRight: 8 }} />
        {tagsData.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={(checked) => this.handleChange(tag, checked)}
          >
            {JSON.stringify(tag)}
          </CheckableTag>
        ))}
      </Container>
    );
  }
}

export default Tags;
