import { Modal, Button } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Tag from '../component/Tag';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {
  LOADING,
  LOAD_SENDER_REQUEST,
  LOAD_SUBSCRIPTION_REQUEST,
} from '../reducers';
import { useCookies } from 'react-cookie';
import { Tooltip } from 'antd';
import { useRouter } from 'next/router';
import Router from 'next/router';
const ModalWindow = (sub) => {
  const [visible, setVisible] = useState(false);
  const [componum, setComponum] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);
  const { loadSenderLoading, me, loadSubscriptionDone } = useSelector(
    (state) => state
  );
  const router = useRouter();
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
    if (
      (me.subscription_num === 0 || !me.subscription_num) &&
      router.pathname !== '/profile'
    ) {
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
      dispatch({ type: LOADING });
    }
  };

  useEffect(() => {
    if (loadSubscriptionDone) {
      Router.push(`/redirect?loadsubscription=${true}`);
    }
  }, [loadSubscriptionDone]);

  const handleDisabled = () => {
    if (selectedTags.length > 0) {
      return;
    } else {
      return 'disabled';
    }
  };

  const ModalBody = useCallback(() => {
    if (componum === 0) {
      return (
        <StyledCompo>
          <StyledTitle>시작하기</StyledTitle>
          <StyledBody>
            핀치에 뉴스레터를 추가해 보세요.
            <br />
            복잡한 메일함에서 벗어나 따끈한 뉴스레터만 모아볼 수 있어요.
            <StyledImage>
              <img src={'/design/modalStart.png'} alt="modalstart" />
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
            최근 7일 간 {me.user_name}님의 메일로 온<br />
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
          <StyledButton
            type="button"
            onClick={changeBody}
            disabled={handleDisabled()}
          >
            다 선택했어요!
          </StyledButton>
        </StyledCompo>
      );
    }
  }, [componum, selectedTags]);

  const text = () => {
    return (
      <TooltipContainer>
        <TooltipText>
          새로 구독한 뉴스레터가 있으시다면,
          <br />
          뉴스레터를 추가해 주세요!
        </TooltipText>
        <TooltipButton onClick={() => showModal()}>추가하러 가기</TooltipButton>
      </TooltipContainer>
    );
  };

  return (
    <>
      <Global />

      <div className="demo">
        <div style={{ marginLeft: 100, whiteSpace: 'nowrap' }}>
          <Tooltip placement="topRight" title={text}>
            <OpenButton sub={sub.sub}>
              <img
                src={'/design/ProfilePlus.png'}
                alt="plus"
                style={{ width: '1.5em', height: '1.5em' }}
              />
            </OpenButton>
          </Tooltip>
        </div>
      </div>

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
    z-index:999;
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

  [tooltip-text]:hover{
    position:relative;
}
[tooltip-text]:hover:after{
    position:absolute;
    top:100%;
    right: 0;
    z-index: 999;
    background-color: grey;
}

  .ant-tooltip-inner{
    background: #FFFFFF;
    position:absolute;
    bottom:100%;
    right: 0;
    box-shadow: 0px 1px 30px rgba(145, 145, 145, 0.2);
    border-radius: 12px;
    width:35em;
    height: 9em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;
    @media screen and (max-width: 768px) {
    font-size: 10px;
  }
  }
  .ant-tooltip-arrow{
    display: none;
  }
  .ant-modal-close-x {
    display: none;
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
  :disabled {
    background-color: #393a3f;
  }
`;

// const LabelButton = styled(StyledButton)`
//   disabled:${(props) => (props.selected ? 'true' : 'false')};
// `;

const StyledImage = styled.div`
  margin-top: 8.8%;
  margin-bottom: 11.53%;
`;

const OpenButton = styled(Button)`
  background: none;
  width: 1.5em;
  height: 1.5em;
  padding: 1.375em;
  display: ${(props) => (props.sub === 0 ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: #f3f3f3;
  border: none;
  text-align: center;
  :hover {
    background: #f3f3f3;
  }
  a:active {
    border: none;
  }
`;
const TooltipContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const TooltipText = styled.div`
  font-weight: normal;
  font-size: 1.25em;
  line-height: 1.5em;
  color: #b0b1b6;
`;

const TooltipButton = styled.button`
  font-weight: normal;
  font-size: 1.25em;
  line-height: 1.5em;
  width: 8.15em;
  height: 2.25em;
  background: #3562ff;
  color: #ffffff;
  text-align: center;
  margin-left: 2.5em;
  border: none;
`;
