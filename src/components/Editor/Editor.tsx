import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Question, QuizState } from '../../redux/types';
import { createQuestion, editQuestion } from '../../redux/actions/questionsAction';
import { validateAnswers } from '../../validators/answerValidator';
import { RootState } from '../../redux/reducers';
import { Answer, convertToApiAnswers, convertToEditableAnswers } from '../../utils/converter';
import {
  Button,
  Checkbox,
  Input,
  Segment,
  Header,
  Form, Message
} from 'semantic-ui-react';


const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const initialQuestion: Question = {
    id: 0,
    correct_answer: '',
    incorrect_answers: [],
    question: ''
  };
  const initialAnswers: Answer[] = [];

  const [question, setQuestion] = useState<Question>(initialQuestion);

  const { currentQuestion } = useSelector((state: RootState): QuizState => state.quiz);

  /* eslint-disable */
  useEffect(() => {
    if (currentQuestion) {
      setQuestion(currentQuestion);
      setAnswers(convertToEditableAnswers({
        correct_answer: currentQuestion.correct_answer,
        incorrect_answers: currentQuestion.incorrect_answers
      }));
    } else {
      setQuestion(initialQuestion);
      setAnswers(initialAnswers);
    }

  }, [currentQuestion]);
  /* eslint-enable */

  const [answers, setAnswers] = useState<Answer[]>(initialAnswers);
  const [error, setError] = useState<string>('');

//validation
  useEffect(
    () => {
      const error = validateAnswers(answers);
      if (typeof error === 'string')
        setError(error);
      else if (question.question === '')
        setError('The question can\'t be an empty string');
      else setError('');
    }, [answers, question.question]
  );

  const handleChangeCorrectAnswer = (indexAnswer: number) => {
    const newAnswers: Answer[] = answers.slice();
    newAnswers.map((answer, index) => {

      if (indexAnswer === index)
        answer.isCorrect = !answer.isCorrect;
      else
        answer.isCorrect = false;
      return answer;
    });
    setAnswers(newAnswers);
  };


  const handleAddAnswer = () => {
    const newAnswers: Answer[] = answers.slice();
    newAnswers.unshift({
      answer: ' ',
      isCorrect: false
    });
    setAnswers(newAnswers);
  };

  const handleRemoveAnswer = (index: number) => {
    const newAnswers: Answer[] = answers.slice();
    newAnswers.splice(index, 1);
    setAnswers(newAnswers);
  };

  const handleChangeAnswer = ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>, index: number) => {
    const newAnswers: Answer[] = answers.slice();
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };

  const onTitleChange = ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
    const title: string = value;
    setQuestion({
      ...question,
      question: title
    });
  };

  const handleCreate = () => {
    const { correct_answer, incorrect_answers } = convertToApiAnswers(answers);
    const newQuestion: Question = {
      ...question,
      correct_answer,
      incorrect_answers
    };
    if (currentQuestion) dispatch(editQuestion(newQuestion)); else dispatch(createQuestion(newQuestion));
    setQuestion(initialQuestion);
    setAnswers(initialAnswers);
  };

  return (
    <Form>
      <Segment>
        <Header as='h1'>Editor</Header>
        <Form.Input
          label='Question'
          fluid
          onChange={onTitleChange}
          value={question.question}
        />
        <Form.Group grouped>
          <Header>Answers</Header>
          <Form.Button onClick={handleAddAnswer}>Add answer</Form.Button>
        </Form.Group>

        <Form.Group grouped>

          {
            answers.map((item: Answer, index: number) => {

              return (
                <Form.Group inline>
                  <Form.Field>
                    <Input
                      label={<Button
                        icon='remove'
                        onClick={() => handleRemoveAnswer(index)}
                      />}
                      placeholder={'Add answer'}
                      value={item.answer}
                      onChange={(event) => handleChangeAnswer(event, index)}
                    />
                  </Form.Field>
                  <Checkbox
                    toggle
                    onChange={() => handleChangeCorrectAnswer(index)}
                    checked={item.isCorrect}/>
                </Form.Group>

              );
            })

          }
        </Form.Group>
        {
          error && (
            <Message negative>
              <p>{error}</p>
            </Message>
          )
        }
        <Form.Button
          content={!!currentQuestion ? 'Edit' : 'Add'}
          onClick={handleCreate}
          disabled={!!error}
        />
      </Segment>
    </Form>
  );
};

export default Editor;
