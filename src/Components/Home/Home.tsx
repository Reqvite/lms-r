import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { fetchUserTests } from "redux/tests/operations";
import { selectUserTests } from "redux/tests/selectors";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  const tests = useSelector(selectUserTests);

  useEffect(() => {
    dispatch(fetchUserTests());
  }, [dispatch]);
  return (
    <>
      <h2>Statistic</h2>
      <p>deff</p>
      <ul>
        {tests.map(({ _id, results }: any) => (
          <li key={_id}>{results[0]}</li>
        ))}
      </ul>
    </>
  );
};

export default Home;
