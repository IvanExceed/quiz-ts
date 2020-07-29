import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Editor from './components/Editor/Editor';
import QuestionList from './components/QuestionList/QuestionList';
import { Grid } from 'semantic-ui-react';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Grid centered columns='equal' stretched>
          <Grid.Row stretched relaxed='very' style={{maxHeight: '100vh', marginTop: '50px'}}>
            <Grid.Column width={5}>
              <Editor/>
            </Grid.Column>
            <Grid.Column width={4}>
              <QuestionList/>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Provider>
    );
  }
}

export default App;
