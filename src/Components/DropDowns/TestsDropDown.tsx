import { FC } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserFinishedTests } from "redux/tests/selectors";
import styled, { useTheme } from "styled-components";
import { selectTheme } from "redux/theme/selectors";

interface DropDownProps {
  placeHolder: string;
  onData: (dataFromChild: string) => void;
  topic: any;
}

const Dropdown: FC<DropDownProps> = ({ onData, placeHolder, topic }) => {
  const { theme: currentTheme }: any = useSelector(selectTheme);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const theme: any = useTheme();

  const finishedTests = useSelector(selectUserFinishedTests);

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

  const onItemClick = (cipher: string, title: string) => {
    setSelectValue(title);
    onData(cipher);
  };

  const renderList = (index: number, title: string, cipher: string): void => {
    if (
      index === 0 ||
      finishedTests.includes(cipher) ||
      +cipher === +finishedTests[finishedTests.length - 1] + 1
    ) {
      onItemClick(cipher, title);
    }
  };

  const handleColor = (cipher: string, index: number): string => {
    let color = theme.colors.notActive;
    if (
      index === 0 ||
      finishedTests.includes(cipher) ||
      +cipher === +finishedTests[finishedTests.length - 1] + 1
    ) {
      color = theme.colors.active;
    }
    return color;
  };

  return (
    <DropDownContainer>
      <DropDownInput onClick={handleInputClick}>
        {showMenu && (
          <DropDownMenu>
            {topic.tests.map(({ title, cipher }: any, index: number) => (
              <DropDownItem
                key={cipher}
                onClick={() => renderList(index, title, cipher)}
                style={{
                  backgroundColor: handleColor(cipher, index),
                }}
              >
                {title}
              </DropDownItem>
            ))}
          </DropDownMenu>
        )}
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tool">
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
  width: 100%;
  max-width: 200px;
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
`;

const DropDownMenu = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  transform: translateY(4px);
  width: 100%;
  max-height: 150px;
  border: ${(p) => p.theme.borders.dropDownBorder};
  border-radius: ${(p) => p.theme.borders.baseBorder};
  background-color: ${(p) => p.theme.colors.mainBackground};
  overflow: auto;
`;

const DropDownItem = styled.div`
  padding: ${(p) => p.theme.space[1]}px;
  cursor: pointer;

  :hover {
    background-color: ${(p) => p.theme.colors.accentColor};
  }
`;

export default Dropdown;
