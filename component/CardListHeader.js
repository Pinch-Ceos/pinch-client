import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import SubscriptionIcon from './SubscriptionIcon';
import { Tooltip } from 'antd';
import { LOADING } from '../reducers';

const CardListHeader = ({ header, setPage }) => {
  const router = useRouter();
  const address = router.pathname.split('/')[1];
  const [cookie, setCookie, removeCookie] = useCookies(['Filter']);
  const [toggle, setToggle] = useState(false);
  const { num_of_email } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onClickToggle = useCallback(() => {
    dispatch({ type: LOADING });
    setToggle(!toggle);
    setPage(2);
    if (!toggle) {
      setCookie('Filter', 'True', { path: '/' });
    } else {
      setCookie('Filter', 'False', { path: '/' });
    }
    if (address === 'subscription') {
      Router.push(`/subscription/${router.query.newsletter}`);
    } else if (address === 'inbox') {
      Router.push('/inbox');
    }
  }, [address, toggle]);

  useEffect(() => {
    if (cookie['Filter'] === 'True') {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, []);

  const filterToggle = useCallback(() => {
    if (toggle) {
      return (
        <Image
          src={'/design/filterOn.png'}
          width="30px"
          height="30px"
          onClick={onClickToggle}
        />
      );
    }
    return (
      <Image
        src={'/design/filterOff.png'}
        width="30px"
        height="30px"
        onClick={onClickToggle}
      />
    );
  }, [toggle]);
  if (address === 'subscription') {
    const text = () => {
      return (
        <TooltipContainer>
          <TooltipTitle>읽지 않은 뉴스레터</TooltipTitle>
          <TooltipText>
            읽지 않은 뉴스레터를 먼저 표시하는 기능이에요.
          </TooltipText>
        </TooltipContainer>
      );
    };
    return (
      <>
        <Global />
        <Container>
          <HeaderContainer>
            <IconWrapper>
              <SubscriptionIcon header={header} size={'true'} />
            </IconWrapper>
            <SubHeaderWrapper>{header}</SubHeaderWrapper>
          </HeaderContainer>
          <Tooltip placement="topRight" title={text} color={'#FDFEFE'}>
            <FilterToggleWrapper>{filterToggle()}</FilterToggleWrapper>
          </Tooltip>
        </Container>
        <ImageWrapper>
          <Image src={'/design/frontnumber.png'} width="14px" height="18px" />
          <NumberConatainer>
            {num_of_email > 99 ? `99+개` : `${num_of_email}개`}
          </NumberConatainer>
        </ImageWrapper>
      </>
    );
  } else if (address === 'inbox') {
    const text = () => {
      return (
        <TooltipContainer>
          <TooltipTitle>읽지 않은 뉴스레터</TooltipTitle>
          <TooltipText>읽지 않은 뉴스레터만 표시하는 기능이에요.</TooltipText>
        </TooltipContainer>
      );
    };
    return (
      <>
        <Global />
        <Container>
          <HeaderWrapper>{header}</HeaderWrapper>
          <Tooltip placement="topRight" title={text} color={'#FDFEFE'}>
            <FilterToggleWrapper>{filterToggle()}</FilterToggleWrapper>
          </Tooltip>
        </Container>
      </>
    );
  }
  return <HeaderWrapper>{header}</HeaderWrapper>;
};

export default CardListHeader;

const Global = createGlobalStyle`
  .ant-tooltip-inner{
    background: #FFFFFF;
    position:absolute;
    bottom:100%;
    right: 0;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
    border-radius: 4px;
    width:17.5em;
    height: 5.25em;
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
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterToggleWrapper = styled.div`
  cursor: pointer;
  margin-right: 10px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SubHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  margin-left: 10px;
  font-weight: bold;
`;

const IconWrapper = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const NumberConatainer = styled.div`
  font-size: 20px;
  margin-left: 9px;
`;

const HeaderWrapper = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TooltipTitle = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 1.5em;
  color: #171920;
  margin-bottom: 0.375em;
`;
const TooltipText = styled.div`
  font-weight: normal;
  font-size: 11.5px;
  line-height: 1.333em;
  color: #a2a2a2;
`;
