import { useAuth } from "hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { addTest, fetchUserTests } from "redux/tests/operations";
import { selectUserTests } from "redux/tests/selectors";
import { tests } from "data/tests";

const DropDownTestList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();
  const userTests = useSelector(selectUserTests);

  const [test, setTest] = useState<any>(null);
  const [testTitle, setTestTitle] = useState<string>("FirstTest");
  const [results, setResults] = useState<number[]>([]);
  const [userMark, setUserMark] = useState<string | null>(null);
  const [finishTestStatus, setFinishTestStatus] = useState<boolean>(false);
  const [startTestStatus, setStartTestStatus] = useState<boolean>(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set<number>());

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

  const handleFinishTest = async () => {
    console.log(results, testTitle, user.email, test.cipher);
    await dispatch(
      addTest({ results, testTitle, email: user.email, cipher: test.cipher })
    );
    await dispatch(fetchUserTests());
    setResults([]);
    setFinishTestStatus(true);
    setStartTestStatus(false);
    setAnsweredQuestions(new Set<number>());
  };

  const selectAnswer = (questionIndex: number, answer: any) => {
    setResults((prev: any) => [...prev, answer]);
    setAnsweredQuestions((prev) => new Set(prev).add(questionIndex));
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
          {test?.questions.map(
            ({ id, question, answers }: any, questionIndex: number) => (
              <li key={id}>
                <p>{question}</p>
                {answers.map((answer: string, answerIndex: number) => (
                  <button
                    key={answerIndex}
                    onClick={() => selectAnswer(questionIndex, answerIndex + 1)}
                    disabled={answeredQuestions.has(questionIndex)}
                  >
                    {answer}
                  </button>
                ))}
              </li>
            )
          )}
        </ul>
      )}
      {startTestStatus && <button onClick={handleFinishTest}>Submit</button>}
      {finishTestStatus && <p>Your mark is {userMark}</p>}
    </div>
  );
};

export default DropDownTestList;
