import { Modal, Button } from 'antd';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Tags from '../component/Tag';

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

class ModalWindow extends React.Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <>
        <Global />
        <Button
          type="button"
          onClick={this.showModal}
          style={{
            borderRadius: 15,
            padding: '10px, 10px, 15px, 15px',
            margin: 10,
            backgroundColor: '#3562FF',
            border: 'none',
          }}
        >
          좋아요!
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
              뉴스레터를 선택해 주세요
            </div>
          }
          onOk={this.handleOk}
          onCancel={this.handleCancel}
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
          footer={[
            <Button
              key="button"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
              style={{
                borderRadius: 15,
                padding: '10, 10, 15, 15',
                margin: 0,
              }}
            >
              다 선택했어요!
            </Button>,
          ]}
        >
          <Tags />
        </Modal>
      </>
    );
  }
}

export default ModalWindow;
