import { useAuth } from "hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { addTest, fetchUserTests } from "redux/tests/operations";
import { selectUserTests } from "redux/tests/selectors";
import { tests } from "data/tests";
import styled, { useTheme } from "styled-components";
import Dropdown from "Components/DropDown/DropDown";
import { motion } from "framer-motion";

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

  const theme: any = useTheme();

  useEffect(() => {
    if (finishTestStatus) {
      const { mark } = userTests[0];
      setUserMark(mark);
    }
  }, [userTests, finishTestStatus]);

  useEffect(() => {
    const [selectTest] = tests.filter((test) => test.cipher === testCipher);
    setTest(selectTest);
  }, [testCipher]);

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

  function handleData(dataFromChild: any) {
    setTestCipher(dataFromChild);
  }

  return (
    <Box>
      <ChoseTestBox>
        {!startTestStatus && (
          <>
            <Dropdown placeHolder="Тести" onData={handleData} />
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
        <ul>
          {test?.questions.map(
            ({ id, question, answers }: any, questionIndex: number) =>
              questionIndex === currentQuestionIndex && (
                <ListItem key={id}>
                  <p>{question}</p>
                  <AnswersBox>
                    {answers.map((answer: string, answerIndex: number) => (
                      <AnswerButton
                        key={answerIndex}
                        onClick={() =>
                          selectAnswer(questionIndex, answerIndex + 1)
                        }
                        disabled={answeredQuestions.has(questionIndex)}
                        style={{
                          backgroundColor: answeredQuestions.has(questionIndex)
                            ? theme.colors.notActive
                            : theme.colors.active,
                        }}
                        animate={{
                          backgroundColor: answeredQuestions.has(questionIndex)
                            ? theme.colors.notActive
                            : theme.colors.active,
                        }}
                        whileHover={{
                          scale: 1.02,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {answer}
                      </AnswerButton>
                    ))}
                  </AnswersBox>
                </ListItem>
              )
          )}
        </ul>
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

const MarkText = styled.p`
  margin-top: ${(p) => p.theme.space[3]}px;
  text-align: center;
`;
const StartTestButton = styled(motion.button)`
  ${(p) => p.theme.components.buttons.secondaryButton}
  margin-left: ${(p) => p.theme.space[3]}px;
`;

const ListItem = styled.li`
  :not(:first-child) {
    margin-top: ${(p) => p.theme.space[3]}px;
  }
`;
const AnswersBox = styled.div`
  ${(p) => p.theme.flexCentered}
`;
const AnswerButton = styled(motion.button)`
  ${(p) => p.theme.components.buttons.secondaryButton}
  margin-top: ${(p) => p.theme.space[3]}px;
  :not(:first-child) {
    margin-left: ${(p) => p.theme.space[3]}px;
  }
`;

const FinishTestButton = styled(motion.button)`
  ${(p) => p.theme.components.buttons.secondaryButton}
  margin-top: ${(p) => p.theme.space[3]}px;
  margin-left: auto;
  margin-right: auto;
`;

export default TestBox;
