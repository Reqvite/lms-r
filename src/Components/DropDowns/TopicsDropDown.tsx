import { FC, useState, useEffect } from "react";
import { useWindowSize } from "hooks";
import styled from "styled-components";
import { BsChevronDown } from "react-icons/bs";
import { selectTheme } from "redux/theme/selectors";
import { useSelector } from "react-redux";

interface DropDownProps {
  placeHolder: string;
  onData: (dataFromChild: string, id: number) => void;
  topics: string[];
}

const TopicsDropDown: FC<DropDownProps> = ({ onData, placeHolder, topics }) => {
  const { theme: currentTheme }: any = useSelector(selectTheme);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string | null>(null);

  const windowSize = useWindowSize();

  useEffect(() => {
    const handler = () => setShowMenu(false);

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = (): string => {
    if (selectValue) {
      return selectValue;
    }
    return placeHolder;
  };

  const onItemClick = (topicTitle: string, id: number) => {
    setSelectValue(topicTitle);
    onData(topicTitle, id);
  };

  return (
    <DropDownContainer
      style={{ width: windowSize.width <= 835 ? "100%" : "200px" }}
    >
      <DropDownInput onClick={handleInputClick}>
        {showMenu && (
          <DropDownMenu>
            {topics.map(({ id, topicTitle }: any) => (
              <DropDownItem
                key={id}
                onClick={() => onItemClick(topicTitle, id)}
              >
                {topicTitle}
              </DropDownItem>
            ))}
          </DropDownMenu>
        )}
        <div>{getDisplay()}</div>
        <div>
          <BsChevronDown
            size={15}
            color={currentTheme === "dark" ? "white" : "black"}
          />
        </div>
      </DropDownInput>
    </DropDownContainer>
  );
};

const DropDownContainer = styled.div`
  position: relative;
  z-index: 2;
  text-align: left;
  border: ${(p) => p.theme.borders.dropDownBorder};
  border-radius: ${(p) => p.theme.borders.baseBorder};
`;

const DropDownInput = styled.div`
  padding: ${(p) => p.theme.space[1]}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  font-weight: ${(p) => p.theme.fontWeights.bold};
`;

const DropDownMenu = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  transform: translateY(4px);
  width: 100%;
  max-height: 250px;
  border: ${(p) => p.theme.borders.dropDownBorder};
  border-radius: ${(p) => p.theme.borders.baseBorder};
  background-color: ${(p) => p.theme.colors.mainBackground};
  overflow: auto;
`;

const DropDownItem = styled.div`
  padding: ${(p) => p.theme.space[1]}px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  cursor: pointer;
  :hover {
    background-color: ${(p) => p.theme.colors.accentColor};
  }
`;

export default TopicsDropDown;
