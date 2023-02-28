import { FC } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

interface QuestionProps {
  id: number;
  question: string;
  answers: string[];
  questionIndex: number;
  selectAnswer: (
    questionIndex: number,
    answerIndex: number,
    answer: string
  ) => void;
  answeredQuestions: Set<number>;
  theme: any;
  testLength: string;
}

const Question: FC<QuestionProps> = ({
  id,
  question,
  answers,
  questionIndex,
  selectAnswer,
  answeredQuestions,
  theme,
  testLength,
}) => {
  return (
    <ListItem key={id}>
      <TextBox>
        <p>{question}</p>
        <div>
          <p>
            {questionIndex + 1}/{testLength}
          </p>
        </div>
      </TextBox>
      <AnswersBox>
        {answers.map((answer: any, answerIndex): any => (
          <AnswerButton
            key={answerIndex}
            onClick={() => selectAnswer(questionIndex, answerIndex + 1, answer)}
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
  );
};

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export default Question;
