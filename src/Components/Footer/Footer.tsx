import styled from "styled-components";

const Footer = () => {
  return (
    <FooterBox>
      <FooterText>Footer</FooterText>
    </FooterBox>
  );
};

const FooterBox = styled.footer`
  ${(p) => p.theme.flexCentered}
  width: 100%;
  min-height: 50px;
  padding: ${(p) => p.theme.space[2]}px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
`;

const FooterText = styled.p``;

export default Footer;
