import { Modal, Button } from 'antd';
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ModalSelect from '../component/ModalSelect';

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

const Body1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const BodyContents = styled.div`
  font-size: 1em;
  color: #b0b1b6;
  text-align: center;
`;

const ModalWindow = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
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
        title={
          <div
            style={{
              padding: 20,
              height: 100,
              border: 'none',
              textAlign: 'center',
              background: '#2B2E32',
              color: 'white',
              fontSize: '2em',
            }}
          >
            시작하기
          </div>
        }
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        height={580}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRadius: 30,
          background: '#2B2E32',
        }}
        footer={[<ModalSelect />]}
      >
        <Body1>
          <BodyContents>
            핀치에 뉴스레터를 추가해 보세요.
            <br />
            복잡한 뉴스레터에서 벗어나 따끈한 뉴스레터만 모아볼 수 있어요.
          </BodyContents>
          <img src="/public/design/modalStart.PNG" />
        </Body1>
      </Modal>
    </>
  );
};

export default ModalWindow;
