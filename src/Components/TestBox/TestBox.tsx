import { useAuth } from "hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { addTest, fetchUserTests } from "redux/tests/operations";
import { selectUserTests } from "redux/tests/selectors";
import { courses } from "data/tests";
import styled, { useTheme } from "styled-components";
import Dropdown from "Components/DropDown/DropDown";
import { motion } from "framer-motion";
import Question from "./Question/Question";
import Timer from "Components/Timer/Timer";
import { useParams } from "react-router-dom";

const TestBox = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();
  const userTests = useSelector(selectUserTests);

  const [test, setTest] = useState<any>(null);
  const [testCipher, setTestCipher] = useState<string | null>(null);
  const [results, setResults] = useState<number[]>([]);
  const [userMark, setUserMark] = useState<any>(null);
  const [finishTestStatus, setFinishTestStatus] = useState<boolean>(false);
  const [startTestStatus, setStartTestStatus] = useState<boolean>(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set<number>());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<any>(0);
  const [course, setCourse] = useState<any>(null);

  const { courseID } = useParams();

  const theme: any = useTheme();

  useEffect(() => {
    if (finishTestStatus) {
      const { mark } = userTests[0];
      setUserMark(mark);
    }
  }, [userTests, finishTestStatus]);

  useEffect(() => {
    const course = courses.filter(
      (course: any) => String(course.id) === courseID
    );
    setCourse(course);
    const [selectTest] = course[0].tests.filter(
      (test) => test.cipher === testCipher
    );
    setTest(selectTest);
  }, [testCipher, courseID]);

  const handleStartTest = () => {
    setStartTestStatus(true);
    setFinishTestStatus(false);
  };

  const handleFinishTest = async () => {
    console.log(results, test.title, user.email, test.cipher);
    await dispatch(
      addTest({
        results,
        testTitle: test.title,
        email: user.email,
        cipher: test.cipher,
      })
    );
    await dispatch(fetchUserTests());
    setResults([]);
    setFinishTestStatus(true);
    setStartTestStatus(false);
    setTestCipher(null);
    setAnsweredQuestions(new Set<number>());
    setCurrentQuestionIndex(0);
  };

  const selectAnswer = (questionIndex: number, answer: any) => {
    setResults((prev: any) => [...prev, answer]);
    setAnsweredQuestions((prev) => new Set(prev).add(questionIndex));
    if (currentQuestionIndex === test.questions.length - 1) {
      return;
    }
    if (questionIndex === currentQuestionIndex) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleData = (dataFromChild: string) => {
    setTestCipher(dataFromChild);
  };

  const getTime = (time: string) => {
    if (+time - 1 === 0) {
      handleFinishTest();
    }
  };

  return (
    <Box>
      <ChoseTestBox>
        {!startTestStatus && (
          <>
            <Dropdown placeHolder="Тести" onData={handleData} course={course} />
            {!startTestStatus && (
              <StartTestButton
                onClick={handleStartTest}
                disabled={testCipher ? false : true}
                animate={{
                  backgroundColor: testCipher
                    ? theme.colors.active
                    : theme.colors.notActive,
                }}
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.95 }}
              >
                Старт
              </StartTestButton>
            )}
          </>
        )}
      </ChoseTestBox>
      {startTestStatus && (
        <>
          <Timer seconds={test.questions.length * 5} onData={getTime} />
          <List>
            {test?.questions.map(
              ({ id, question, answers }: any, questionIndex: number) =>
                questionIndex === currentQuestionIndex && (
                  <Question
                    key={id}
                    id={id}
                    question={question}
                    answers={answers}
                    questionIndex={questionIndex}
                    selectAnswer={selectAnswer}
                    answeredQuestions={answeredQuestions}
                    theme={theme}
                    testLength={test.questions.length}
                  />
                )
            )}
          </List>
        </>
      )}
      {startTestStatus &&
        currentQuestionIndex === test.questions.length - 1 && (
          <FinishTestButton
            onClick={handleFinishTest}
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Підтвердити
          </FinishTestButton>
        )}
      {finishTestStatus && userMark && (
        <>
          <MarkText>Ваша оцінка за тест {userMark.total}.</MarkText>
          <MarkText>Правильних відповідей {userMark.correct}.</MarkText>
        </>
      )}
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  max-width: 800px;
  padding: ${(p) => p.theme.space[4]}px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
  margin-top: ${(p) => p.theme.space[3]}px;
  margin-right: auto;
  margin-left: auto;
`;

const ChoseTestBox = styled.div`
  ${(p) => p.theme.flexCentered}
`;

const List = styled.ul`
  margin-top: ${(p) => p.theme.space[3]}px;
`;
const MarkText = styled.p`
  margin-top: ${(p) => p.theme.space[3]}px;
  text-align: center;
`;
const StartTestButton = styled(motion.button)`
  ${(p) => p.theme.components.buttons.secondaryButton}
  margin-left: ${(p) => p.theme.space[3]}px;
`;

const FinishTestButton = styled(motion.button)`
  ${(p) => p.theme.components.buttons.secondaryButton}
  margin-top: ${(p) => p.theme.space[3]}px;
  margin-left: auto;
  margin-right: auto;
`;

export default TestBox;