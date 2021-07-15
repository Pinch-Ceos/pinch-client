import { Modal, Button } from 'antd';
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Tag from '../component/Tag';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { SENDER_LIST_REQUEST } from '../reducers';
// import startImage from 'D:/이화여대/ceos/pinch/pinch-client/public/design/modalStart.png';

const Global = createGlobalStyle`
 .ant-modal-header{
    padding: 0px 0px;
    border-bottom: none;
  }

  .ant-modal-content{
    background: #2B2E32; /*왜 색 다른지*/
    border: none;
    border-radius: 30;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: none;
  }
  .ant-modal-body{
    color: #b0b1b6;
    text-align: center;
    border-bottom: none;
    border-radius: 12px;
    padding: 0;
  }
  .ant-modal-footer{
    border-top: none;
    display: flex;
    justify-content: center;
  }

  .ant-btn .ant-btn-primary{
    border-radius: 15;
    padding: 10, 10, 15, 15;
    margin: 0;
  }
`;

const StartImage = styled(Image)`
  margin-top: 80px;
  margin-bottom: 80px;
`;
const StyledCompo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 12px;
`;

const StyledTitle = styled.div`
  padding: 20px;
  height: 100px;
  border: none;
  text-align: center;
  background: #2b2e32;
  color: white;
  font-size: 2em;
  word-break: keep-all;
`;

const StyledBody = styled.div`
  font-size: 1em;
  color: #b0b1b6;
  text-align: center;
`;

const StyledButton = styled.button`
  border-radius: 20px;
  padding: 20px 20px;
  margin: 10px;
  font-size: 1em;
  background-color: #3562ff;
  border: none;
  width: 146px;
`;

const ModalWindow = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [componum, setComponum] = useState(0);
  const dispatch = useDispatch();

  const showModal = () => {
    setComponum(0);
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const changeBody = () => {
    if (componum === 0) {
      dispatch({
        type: SENDER_LIST_REQUEST,
      });
      setComponum(1);
    } else if (componum === 1) {
      setComponum(2);
    }
  };

  const test = () => {
    setTimeout(() => {
      changeBody();
    }, 1000);
  };

  const modalBody = () => {
    if (componum === 0) {
      return (
        <StyledCompo>
          <StyledTitle>시작하기</StyledTitle>
          <StyledBody>
            핀치에 뉴스레터를 추가해 보세요.
            <br />
            복잡한 뉴스레터에서 벗어나 따끈한 뉴스레터만 모아볼 수 있어요.
            <br />
            <StartImage src={'/design/modalStart.png'} width="" height="" />
          </StyledBody>
          <StyledButton type="button" onClick={changeBody}>
            좋아요!
          </StyledButton>
        </StyledCompo>
      );
    } else if (componum === 1) {
      return (
        <StyledCompo>
          <StyledTitle>잠시만 기다려주세요. </StyledTitle>
          <StyledBody>
            최근 7일 간 <br /> User님의 메일로 온 뉴스레터들을 찾고 있어요.
          </StyledBody>
          {test()}
        </StyledCompo>
      );
    } else if (componum === 2) {
      return (
        <StyledCompo>
          <StyledTitle>뉴스레터를 선택해주세요. </StyledTitle>
          <StyledBody>
            <Tag />
          </StyledBody>
          <StyledButton type="button" onClick={changeBody}>
            {' '}
            다 선택했어요!
          </StyledButton>
        </StyledCompo>
      );
    }
  };

  return (
    <>
      <Global />
      <Button
        type="button"
        onClick={showModal}
        style={{
          padding: '5',
          marginLeft: '5',
          background: 'none',
          border: 'none',
        }}
      >
        🦔
      </Button>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        height={659}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRadius: 30,
          background: '#2B2E32',
        }}
        footer={[<div />]}
      >
        {modalBody()}
      </Modal>
    </>
  );
};

export default ModalWindow;
