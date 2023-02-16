import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "Components/Sidebar/Sidebar";
import Loader from "Components/Loader/Loader";
import styled from "styled-components";
import MainBox from "Components/MainBox/MainBox";

const Dashboard = () => {
  return (
    <Container>
      <Sidebar />
      <MainBox>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </MainBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 10px;
  height: 100vh;
`;

export default Dashboard;
