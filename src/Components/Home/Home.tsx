import { useAuth } from "hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { fetchUserTests } from "redux/tests/operations";
import { selectUserTests } from "redux/tests/selectors";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  const tests = useSelector(selectUserTests);
  const { user } = useAuth();

  useEffect(() => {
    dispatch(fetchUserTests());
  }, [dispatch]);

  return (
    <>
      <h2>Statistic</h2>
      <p>Hello, {user.name}!</p>
      <p>Your results</p>
      <ul>
        {tests.map(({ _id, mark, testTitle }: any) => (
          <li key={_id} style={{ display: "flex" }}>
            {mark}
            <p>{testTitle}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
