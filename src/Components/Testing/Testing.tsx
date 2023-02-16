import { useState } from "react";
import { test } from "data/tests";

const Testing = () => {
  const [result, setResult] = useState<any>([]);

  const click = (answer: any) => {
    setResult((prev: any) => [...prev, answer]);
  };

  const submitResult = () => {
    console.log(result);
  };

  return (
    <div>
      <h2>Testing</h2>
      <ul>
        {test.map(({ id, question, answers }: any) => (
          <li key={id}>
            <p>{question}</p>
            {answers.map((answer: any) => (
              <button
                onClick={() => click(answers.indexOf(answer) + 1)}
                key={answer}
              >
                {answer}
              </button>
            ))}
          </li>
        ))}
      </ul>
      <button onClick={submitResult}>Submit</button>
    </div>
  );
};

export default Testing;
