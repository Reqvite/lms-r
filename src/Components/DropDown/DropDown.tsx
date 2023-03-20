import { FC } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserFinishedTests } from "../../redux/tests/selectors";
import styled, { useTheme } from "styled-components";

interface DropDownProps {
  placeHolder: string;
  onData: (dataFromChild: string) => void;
  topic: any;
}

const Icon: FC = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const Dropdown: FC<DropDownProps> = ({ onData, placeHolder, topic }) => {
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
          <Icon />
        </div>
      </DropDownInput>
    </DropDownContainer>
  );
};

const DropDownContainer = styled.div`
  position: relative;
  width: 200px;
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
