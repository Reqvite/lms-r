import { tests } from "data/tests";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const Dropdown = ({ onData, placeHolder }: any) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectValue, setSelectValue] = useState<any>(null);

  useEffect(() => {
    const handler = () => setShowMenu(false);

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (e: any) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (selectValue) {
      return selectValue;
    }
    return placeHolder;
  };

  const onItemClick = (cipher: string, title: string) => {
    setSelectValue(title);
    onData(cipher);
  };

  return (
    <DropDownContainer>
      <DropDownInput onClick={handleInputClick}>
        {showMenu && (
          <DropDownMenu>
            {tests.map(({ title, cipher }) => (
              <DropDownItem
                key={title}
                onClick={() => onItemClick(cipher, title)}
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
