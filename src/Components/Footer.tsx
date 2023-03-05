import { FC } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Footer: FC = () => {
  const location = useLocation();

  return location.pathname.length >= 20 &&
    location.pathname.includes("guide") ? null : (
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

const FooterText = styled.p`
  font-weight: ${(p) => p.theme.fontWeights.bold};
`;

export default Footer;
