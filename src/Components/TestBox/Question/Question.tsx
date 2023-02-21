import { motion } from "framer-motion";
import styled from "styled-components";

interface QuestionProps {
  id: number;
  question: string;
  answers: string[];
  questionIndex: number;
  selectAnswer: (questionIndex: number, answerIndex: number) => void;
  answeredQuestions: Set<number>;
  theme: any;
}

const Question = ({
  id,
  question,
  answers,
  questionIndex,
  selectAnswer,
  answeredQuestions,
  theme,
}: QuestionProps) => {
  return (
    <ListItem key={id}>
      <p>{question}</p>
      <AnswersBox>
        {answers.map((answer, answerIndex) => (
          <AnswerButton
            key={answerIndex}
            onClick={() => selectAnswer(questionIndex, answerIndex)}
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
