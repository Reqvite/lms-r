import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "Components/Header/Header";
import Loader from "Components/Loader/Loader";
import styled from "styled-components";
import MainBox from "Components/MainBox/MainBox";

const Dashboard = () => {
  return (
    <>
      <Header />
      <Container>
        <MainBox>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </MainBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  padding: ${(p) => p.theme.space[4]}px ${(p) => p.theme.space[3]}px;
`;

export default Dashboard;
