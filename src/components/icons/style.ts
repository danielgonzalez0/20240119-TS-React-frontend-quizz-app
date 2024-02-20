import styled from 'styled-components';

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;

  .icon-container {
    width: 56px;
    height: 56px;
    padding: 8px;
    border-radius: 12px;
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.size.smallmobile}) {
    gap: 16px;
    .icon-container {
      width: 40px;
      height: 40px;
      padding: 6px;
    }
  }
`;

export const IconTitle = styled.p`
  font-family: ${({ theme }) => theme.typography.headingS.fontFamily};
  font-size: ${({ theme }) => theme.typography.headingS.fontSize};
  line-height: ${({ theme }) => theme.typography.headingS.lineHeight};
  display: flex;
  align-items: center;

  @media screen and (max-width: ${({ theme }) => theme.size.smallmobile}) {
    font-size: 18px;
  }
`;
