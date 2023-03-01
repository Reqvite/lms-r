import { FC } from "react";
import { motion } from "framer-motion";
import { NavLink, useParams } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import TopicsDropDown from "Components/DropDown/TopicsDropDown";
import styled from "styled-components";
import nextId from "react-id-generator";

const BreadCrumbList: FC<any> = ({
  crumbs,
  handleData,
  selectTopic,
  topics,
  path,
}) => {
  const { courseID, topicID } = useParams();
  return (
    <BreadCrumbsList>
      {crumbs.map(({ crumb, title }: any, index: any) => {
        const link = `/${path.slice(0, index + 1).join("/")}`;
        if (topicID === crumb.toLowerCase())
          return (
            <BreadCrumbsItem key={nextId()}>
              <TopicsDropDown
                placeHolder={selectTopic}
                onData={handleData}
                topics={topics}
              />
              <AiOutlineRight />
            </BreadCrumbsItem>
          );
        if (courseID === crumb.toLowerCase())
          return (
            <BreadCrumbsItem key={nextId()}>
              <BreadCrumbsLink as="p">{crumb}</BreadCrumbsLink>
              {index < crumbs.length - 1 && <AiOutlineRight />}
            </BreadCrumbsItem>
          );
        return (
          <BreadCrumbsItem
            key={nextId()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BreadCrumbsLink to={link.toLowerCase()}>{title}</BreadCrumbsLink>
            {index < crumbs.length - 1 && <AiOutlineRight />}
          </BreadCrumbsItem>
        );
      })}
    </BreadCrumbsList>
  );
};

export const Box = styled.div`
  margin-bottom: ${(p) => p.theme.space[2]}px;
`;

export const BreadCrumbsList = styled.ul`
  align-self: flex-end;
  display: flex;
  flex-wrap: wrap;
  margin-right: auto;
`;
export const BreadCrumbsItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-left: ${(p) => p.theme.space[2]}px;
`;
export const BreadCrumbsLink = styled(NavLink)`
  padding: ${(p) => p.theme.space[3]}px ${(p) => p.theme.space[2]}px;
  font-weight: ${(p) => p.theme.fontWeights.bold};

  @media screen and (max-width: 500px) {
    font-size: 3vw;
  }
`;

export const List = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: ${(p) => p.theme.space[2]}px;
`;

export const ListItem = styled.li``;

export const NavListItemLink = styled(NavLink)`
  display: block;
  font-weight: ${(p) => p.theme.fontWeights.bold};
  padding: ${(p) => p.theme.space[3]}px ${(p) => p.theme.space[3]}px;
  &.active {
    ${(p) => p.theme.components.activeNavLink}
  }
`;

export default BreadCrumbList;
