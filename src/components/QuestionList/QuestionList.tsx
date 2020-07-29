import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Question, QuizState } from '../../redux/types';
import { selectQuestion, deleteQuestion } from '../../redux/actions/questionsAction';
import { RootState } from '../../redux/reducers';
import { thunkFetchQuestions } from '../../redux/actions/thunkActions';
import { Button, Grid, Header, List, Segment } from 'semantic-ui-react';


const QuestionList: React.FC = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state: RootState): QuizState => state.quiz);

  const handleUpload = () => {
    dispatch(thunkFetchQuestions());
  };

  const handleEdit = (index: number) => {
    dispatch(selectQuestion(index));
  };

  const handleRemove = (index: number) => {
    dispatch(deleteQuestion(index));
  };

  return (
    <Segment floated='right'>
      <Header as='h1'>
        Questions
        <Button floated='right' onClick={handleUpload}>Load more questions</Button>
      </Header>
      <List>
        {
          questions.map((question: Question, index: number) => {
            return (
              <List.Item as={Segment} style={{ padding: '1rem' }}>
                <Grid stackable verticalAlign='middle'>
                  <Grid.Row>
                    <Grid.Column>
                      <Header.Subheader>
                        {question.question}
                      </Header.Subheader>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <List.Description>Category: {question.category}</List.Description>
                      <List.Description>Difficulty: {question.difficulty}</List.Description>
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                      <Button.Group vertical>
                        <Button compact fluid onClick={() => handleEdit(index)}>Edit</Button>
                        <Button compact fluid onClick={() => handleRemove(index)}>Delete</Button>
                      </Button.Group>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </List.Item>
            );
          })
        }
      </List>
    </Segment>
  );
};

export default QuestionList;
