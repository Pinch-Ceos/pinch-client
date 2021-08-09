import styled from 'styled-components';

const SubscriptionIcon = ({ header, size }) => {
  switch (header) {
    case '스요레터':
      return (
        <IconWrapper
          size={size}
          src={`https://lh3.googleusercontent.com/a-/AOh14GjInT_zx1sKxyNP6gv_WsyGQ_ub3BYUIs4yihIR=s80
      `}
          alt={'subscriptionIcon'}
        />
      );
    case '빵슐랭 가이드':
      return (
        <IconWrapper
          size={size}
          src={`https://lh3.googleusercontent.com/a-/AOh14GgUOjUSXwv42qeDQyELaoRJkztgwDG2XS8XVN7I=s80
      `}
          alt={'subscriptionIcon'}
        />
      );
    case 'UPPITY':
      return (
        <IconWrapper
          size={size}
          src={`https://lh3.googleusercontent.com/a-/AOh14Gj10cdzRVk3V-xH2b6fuxZlnHJCEGSs6zW-hG8E=s80
      `}
          alt={'subscriptionIcon'}
        />
      );
    case '머니네버슬립':
      return (
        <IconWrapper
          size={size}
          src={`https://lh3.googleusercontent.com/a-/AOh14Gi0BiHdPdyrVeMHp6h6NzHn7k_MNH6Gn4LC5IF-=s80
      `}
          alt={'subscriptionIcon'}
        />
      );
    case '아웃스탠딩':
      return (
        <IconWrapper
          size={size}
          src={`https://lh3.googleusercontent.com/a-/AOh14Gjc8vkYn6cn_PgKNPM8akhYKdBNq1p8DWF-nAFT=s40
      `}
          alt={'subscriptionIcon'}
        />
      );
    case '바이라인네트워크':
      return (
        <IconWrapper
          size={size}
          src={`https://lh3.googleusercontent.com/a-/AOh14Gi2b_zjlzwmfJ63GviJn8P0OsGmdjL4505pbHnD=s40
      `}
          alt={'subscriptionIcon'}
        />
      );
    case '까탈로그':
      return (
        <IconWrapper
          size={size}
          src={`https://lh3.googleusercontent.com/a-/AOh14GjbJ2CDq34I_P0ZHHIpzh6I6lMzeafJ27u-HgqO=s40
      `}
          alt={'subscriptionIcon'}
        />
      );
    case '스트레터':
      return (
        <IconWrapper
          size={size}
          src={`https://lh3.googleusercontent.com/a-/AOh14GgAKZKg41DEtqzczqVDd5qXSMv1L24Gz9OT4dQ5=s40
      `}
          alt={'subscriptionIcon'}
        />
      );
    case '디독 김강령':
      return (
        <IconWrapper
          size={size}
          src={`https://lh3.googleusercontent.com/a-/AOh14GjFvVI8GWytDRlauedIEVTV5-ifeGB8wTkFTM1v=s40
        `}
          alt={'subscriptionIcon'}
        />
      );
    case '디독':
      return (
        <IconWrapper
          size={size}
          src={`https://lh3.googleusercontent.com/a-/AOh14GjFvVI8GWytDRlauedIEVTV5-ifeGB8wTkFTM1v=s40
          `}
          alt={'subscriptionIcon'}
        />
      );
    default:
      return (
        <IconWrapper
          size={size}
          src={`/design/subscriptionIcon.png
      `}
          alt={'subscriptionIcon'}
        />
      );
  }
};

export default SubscriptionIcon;

const IconWrapper = styled.img`
  width: ${(props) => (props.size === 'true' ? '40px' : '22px')};
  height: ${(props) => (props.size === 'true' ? '40px' : '22px')};
`;
