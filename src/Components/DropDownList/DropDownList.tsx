import { tests } from "data/tests";
import { useAuth } from "hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { addTest, fetchUserTests } from "redux/tests/operations";
import { selectUserTests } from "redux/tests/selectors";

const DropDownTestList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();
  const userTests = useSelector(selectUserTests);

  const [test, setTest] = useState<any>(null);
  const [testTitle, setTestTitle] = useState<string>("");
  const [results, setResults] = useState<any>([]);
  const [userMark, setUserMark] = useState<any>(null);
  const [finishTestStatus, setFinishTestStatus] = useState<boolean>(false);
  const [startTestStatus, setStartTestStatus] = useState<boolean>(false);

  useEffect(() => {
    if (finishTestStatus) {
      const { mark } = [...userTests].sort(
        (first: any, second: any) => first.createdAt - second.createdAt
      )[userTests.length - 1];
      setUserMark(mark);
    }
  }, [userTests, finishTestStatus]);

  useEffect(() => {
    const [selectTest] = tests.filter((test) => test.title === testTitle);
    setTest(selectTest);
  }, [testTitle]);

  const handleStartTest = () => {
    setStartTestStatus(true);
    setFinishTestStatus(false);
  };

  const selectAnswer = (answer: any) => {
    setResults((prev: any) => [...prev, answer]);
  };

  const submitResult = async () => {
    const email = user.email;
    const cipher = test.cipher;
    console.log(results, testTitle, email, cipher);
    await dispatch(addTest({ results, testTitle, email, cipher }));
    await dispatch(fetchUserTests());
    setResults([]);
    setTest(null);
    setFinishTestStatus(true);
    setStartTestStatus(false);
  };

  const handleChangeTest = (e: any) => {
    setTestTitle(e.target.value);
  };

  return (
    <div>
      <label>
        <select value={testTitle} onChange={handleChangeTest}>
          {tests.map(({ title }) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </label>
      {!startTestStatus && <button onClick={handleStartTest}>Start</button>}
      {startTestStatus && (
        <ul>
          {test?.questions.map(({ id, question, answers }: any) => (
            <li key={id}>
              <p>{question}</p>
              {answers.map((answer: any) => (
                <button
                  key={answer}
                  onClick={() => selectAnswer(answers.indexOf(answer) + 1)}
                >
                  {answer}
                </button>
              ))}
            </li>
          ))}
        </ul>
      )}
      {startTestStatus && <button onClick={submitResult}>Submit</button>}
      {finishTestStatus && <p>Your mark is {userMark}</p>}
    </div>
  );
};

export default DropDownTestList;
