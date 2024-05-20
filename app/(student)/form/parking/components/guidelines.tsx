import { Tabs } from '@/components';
import { ReactNode, useMemo, useState } from 'react';

import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import ParkingRequestPage from '.';
import { documents, questions } from './guidelines-consts';
import styles from './guidelines.module.scss';

const QUESTIONS_COUNT = 5;

interface QuestionProps {
  question: string;
  key: number;
  icon?: ReactNode;
  onAnswer: (answer: boolean) => void;
}

function Question({ question, key, icon, onAnswer }: QuestionProps) {
  const trueId = `true-${key}`;
  const falseId = `false-${key}`;
  const questionId = `${key}-question`;

  return (
    <fieldset className={styles.question}>
      <legend>
        {question} {icon}
      </legend>
      <div>
        <label htmlFor={trueId}>Yes</label>
        <label htmlFor={falseId}>No</label>
      </div>

      <input
        type="radio"
        id={trueId}
        name={questionId}
        onChange={() => onAnswer(true)}
        hidden
        required
      />
      <input
        type="radio"
        id={falseId}
        name={questionId}
        onChange={() => onAnswer(false)}
        hidden
        required
      />
    </fieldset>
  );
}

function chooseRandomN(arr: any[], n: number) {
  return arr.sort(() => 0.5 - Math.random()).slice(0, n);
}

export function Guidelines({ formik }: ParkingRequestPage) {
  // Keep track of whether all documents have been visited
  const [allVisited, setAllVisited] = useState(false);

  // Variable to update the chosen questions memo
  const [restartState, setRestartState] = useState(0);

  // Keep track of whether the answers have been submitted
  const [submittedAnswers, setSubmittedAnswers] = useState(false);

  // Keep track of the selected answers
  const selectedAnswers: boolean[] = Array(QUESTIONS_COUNT);

  // Choose 5 random questions and persist them between re-renders
  const chosenQuestions = useMemo(
    () => chooseRandomN(questions, QUESTIONS_COUNT),
    [restartState]
  );

  // Check if all answers are correct
  const checkAnswers = () => {
    const allAnswersCorrect = selectedAnswers.every(
      (answer, index) => answer === chosenQuestions[index][1]
    );

    if (!allAnswersCorrect) {
      // TODO: mark incorrect answers and show a message
      return;
    }

    formik.submitForm();
  };

  // Reset the state
  // TODO: check if this properly reselects questions
  const retry = () => {
    setSubmittedAnswers(false);
    chosenQuestions.length = 0;

    // Update the state to reselect questions
    setRestartState(restartState + 1);
  };

  return (
    <>
      <section>
        <h1>Guidelines</h1>

        <Tabs tabs={documents} setAllVisited={setAllVisited} />

        <input type="checkbox" disabled={!allVisited} required>
          I've read and understood these terms
        </input>
      </section>

      <section>
        <h1>Questions</h1>
        <p>
          Answer the following questions to ensure you understand the
          guidelines.
        </p>

        {chosenQuestions.map(([question, _], index) => (
          <Question
            question={question}
            key={index}
            icon={
              submittedAnswers &&
              (selectedAnswers[index] === chosenQuestions[index][1] ? (
                <CheckIcon />
              ) : (
                <Cross1Icon />
              ))
            }
            onAnswer={(answer) => {
              selectedAnswers[index] = answer;
            }}
          />
        ))}

        {!submittedAnswers ? (
          <button onClick={checkAnswers}>Submit</button>
        ) : (
          <button onClick={retry}>Try again</button>
        )}
      </section>
    </>
  );
}
