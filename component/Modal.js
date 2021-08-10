import { Modal, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Tag from '../component/Tag';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_SENDER_REQUEST, LOAD_SUBSCRIPTION_REQUEST } from '../reducers';
import { useCookies } from 'react-cookie';

const ModalWindow = () => {
  const [visible, setVisible] = useState(false);
  const [componum, setComponum] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);
  const { loadSenderLoading, me } = useSelector((state) => state);

  const showModal = () => {
    setComponum(0);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    {
      loadSenderLoading === false ? setComponum(2) : setComponum(1);
    }
  }, [loadSenderLoading]);

  useEffect(() => {
    if (me.subscription_num === 0) {
      showModal();
    }
  }, []);

  const changeBody = () => {
    if (componum === 0) {
      dispatch({
        type: LOAD_SENDER_REQUEST,
        token: cookie.Token,
      });
    } else if (componum === 2) {
      handleCancel();
      dispatch({
        type: LOAD_SUBSCRIPTION_REQUEST,
        data: selectedTags,
        token: cookie.Token,
      });
    }
  };

  const ModalBody = ({ name }) => {
    if (componum === 0) {
      return (
        <StyledCompo>
          <StyledTitle>시작하기</StyledTitle>
          <StyledBody>
            핀치에 뉴스레터를 추가해 보세요.
            <br />
            복잡한 메일함에서 벗어나 따끈한 뉴스레터만 모아볼 수 있어요.
          </StyledBody>
          <StyledImage>
            <img
              src={'/design/modalStart.png'}
              alt="modal start"
              style={{ width: '15.625em', height: '13.438em' }}
            />
          </StyledImage>
          <StyledButton type="button" onClick={changeBody}>
            좋아요!
          </StyledButton>
        </StyledCompo>
      );
    } else if (componum === 1) {
      return (
        <StyledCompo>
          <StyledTitle>잠시만 기다려주세요. </StyledTitle>
          <StyledGif>
            <img
              src={'/design/modalLoader.gif'}
              alt="modal loading gif"
              style={{ width: '12.5em', height: '12.5em' }}
            />
          </StyledGif>
          <Label>
            최근 7일 간 {name}님의 메일로 온<br />
            뉴스레터들을 찾고 있어요.
          </Label>
        </StyledCompo>
      );
    } else if (componum === 2) {
      return (
        <StyledCompo>
          <StyledTitle>뉴스레터를 선택해주세요. </StyledTitle>
          <StyledLabel>
            이제 선택한 뉴스레터들은 핀치의 인박스로 도착하게 됩니다.
            <br />
            당신의 메일함도 한층 더 깔끔해질 거에요.😊
          </StyledLabel>
          <Tag selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          <StyledButton type="button" onClick={changeBody}>
            다 선택했어요!
          </StyledButton>
        </StyledCompo>
      );
    }
  };

  return (
    <>
      <Global />
      <StyledModal
        visible={visible}
        onCancel={handleCancel}
        width={800}
        footer={<div />}
      >
        <ModalBody name={me.user_name} />
      </StyledModal>
    </>
  );
};
export default ModalWindow;

const Global = createGlobalStyle`
  body {
    font-size: 16px;
    @media screen and (max-width: 768px) {font-size: 11px;}
  }

 .ant-modal-header{
    padding: 0px 0px;
    border-bottom: none;
  }

  .ant-modal-content{
    border: none;
    border-radius: 30;
    display: flex;
    background: none;
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
    display: none;
    justify-content: center;
  }

  .ant-btn .ant-btn-primary{
    border-radius: 15;
    padding: 10, 10, 15, 15;
    margin: 0;
  }

  .ant-modal-close-x{
    display:none;
  }
`;

const StyledCompo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding-top: 5.375em;
  padding-bottom: 2.5em;
  width: 100%;
  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
`;

const StyledTitle = styled.div`
  text-align: center;
  font-weight: bold;
  background: #2b2e32;
  color: #e5e6eb;
  font-size: 2.5em;
  line-height: 1.25em;
  word-break: keep-all;
  margin-bottom: 1em;
`;

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.25);
  background: #2b2e32;
  font-size: 16px;
  padding-bottom: 0px;
`;

const StyledBody = styled.div`
  font-size: 1.125em;
  font-weight: normal;
  color: #b0b1b6;
  text-align: center;
  word-break: break-word;
  margin-bottom: 4.375em;
`;

const Label = styled.div`
  font-size: 1.125em;
  font-weight: normal;
  color: #b0b1b6;
  text-align: center;
  word-break: break-word;
  margin-bottom: 2.944em;
`;

const StyledButton = styled.button`
  border-radius: 100px;
  padding: 1.125em 0.875em;
  font-weight: normal;
  text-align: center;
  font-size: 1em;
  color: #ffffff;
  line-height: 1.5em;
  background-color: #3562ff;
  border: none;
  width: 15.375em;
  z-index: 999;
`;

const StyledImage = styled.div`
  margin-bottom: 3.375em;
  width: 15.625em;
  height: 13.438em;
`;

const StyledGif = styled.div`
  margin-top: 3.625em;
  width: 12.5em;
  height: 12.5em;
  margin-bottom: 4.75em;
`;

const StyledLabel = styled(StyledBody)`
  margin-bottom: 1.2em;
`;
