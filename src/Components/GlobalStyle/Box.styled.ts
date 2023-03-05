import styled from "styled-components";

export const Box = styled.div`
  width: 100%;
  max-width: 800px;
  max-height: 700px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${(p) => p.theme.space[4]}px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
  margin-top: ${(p) => p.theme.space[3]}px;
  margin-right: auto;
  margin-left: auto;
`;

export const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const FormBox = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const InputBox = styled.div``;

export const Label = styled.label`
  :not(:first-child) {
    margin-top: ${(p) => p.theme.space[2]}px;
  }

  display: flex;
  flex-direction: column;
`;
export const Input = styled.input`
  width: 100%;
  max-width: 250px;
  border-radius: 12px;
  padding: 10px 24px;
`;

export const Button = styled.button`
  margin-left: ${(p) => p.theme.space[3]}px;
  ${(p) => p.theme.components.buttons.secondaryButton}
`;

export const StatisticList = styled.ul`
  margin-top: ${(p) => p.theme.space[3]}px;
`;

export const StatisticListItem = styled.li`
  :not(:first-child) {
    border: 1px solid #9090c296;
  }
  border-radius: 5px;
  @media screen and (min-width: 550px) {
    flex: 1;
    display: flex;
    align-items: center;
  }
  :not(:first-child) {
    margin-top: ${(p) => p.theme.space[2]}px;
  }
`;

export const ListText = styled.p`
  flex: 1;
  margin-left: ${(p) => p.theme.space[3]}px;
  text-align: center;
  font-size: ${(p) => p.theme.fontSizes[2]}px;
  line-height: ${(p) => p.theme.lineHeights.body};
`;

export const FirstText = styled.p`
  flex: 1;
  margin-left: ${(p) => p.theme.space[3]}px;
  text-align: center;
  font-size: ${(p) => p.theme.fontSizes[2]}px;
  line-height: ${(p) => p.theme.lineHeights.body};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  :hover {
    white-space: normal;
    overflow: visible;
  }
`;
