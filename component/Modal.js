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
    s;
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

  const ModalBody = () => {
    if (componum === 0) {
      return (
        <StyledCompo>
          <StyledTitle>시작하기</StyledTitle>
          <StyledBody>
            핀치에 뉴스레터를 추가해 보세요.
            <br />
            복잡한 메일함에서 벗어나 따끈한 뉴스레터만 모아볼 수 있어요.
            <StyledImage>
              <img src={'/design/modalStart.png'} alt="modal start" />
            </StyledImage>
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
          <StyledImage>
            <Image src={'/design/modalLoader.gif'} width="200" height="200" />
          </StyledImage>
          <Label>
            최근 7일 간 User님의 메일로 온<br />
            뉴스레터들을 찾고 있어요.
          </Label>
        </StyledCompo>
      );
    } else if (componum === 2) {
      return (
        <StyledCompo>
          <StyledTitle>뉴스레터를 선택해주세요. </StyledTitle>
          <StyledBody>
            이제 선택한 뉴스레터들은 핀치의 인박스로 도착하게 됩니다.
            <br />
            당신의 메일함도 한층 더 깔끔해질 거에요.😊
          </StyledBody>
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
        width={797}
        height={659}
        footer={<div />}
      >
        <ModalBody />
      </StyledModal>
    </>
  );
};

export default ModalWindow;

const Global = createGlobalStyle`
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
`;

const StyledCompo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`;

const StyledTitle = styled.div`
  text-align: center;
  font-weight: bold;
  background: #2b2e32;
  color: #e5e6eb;
  font-size: 2.5rem;
  line-height: 3.125rem;
  word-break: keep-all;
  margin-top: 86px;
  margin-bottom: 36px;
`;

const StyledModal = styled(Modal)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.25);
  background: #2b2e32;
`;

const StyledBody = styled.div`
  font-size: 1.125rem;
  font-weight: normal;
  color: #b0b1b6;
  text-align: center;
  word-break: break-word;
  margin-bottom: 5.28%;
`;

const Label = styled.div`
  font-size: 1.125rem;
  font-weight: normal;
  color: #b0b1b6;
  text-align: center;
  word-break: break-word;
  margin-bottom: 14.11%;
`;

const StyledButton = styled.button`
  border-radius: 100px;
  padding: 18px 14px;
  margin-bottom: 40px;
  font-weight: normal;
  text-align: center;
  font-size: 1rem;
  color: #ffffff;
  line-height: 1.5rem;
  background-color: #3562ff;
  border: none;
  width: 246px;
  z-index: 999;
`;

const LabelButton = styled(StyledButton)`
  /* disabled:${(props) => (props.selected ? 'false' : 'true')}; */
`;

const StyledImage = styled.div`
  margin-top: 8.8%;
  margin-bottom: 11.53%;
`;
