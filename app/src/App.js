import React, {Component} from 'react';
import drizzleOptions from './drizzleOptions';
import { LoadingContainer} from 'drizzle-react-components';
import { DrizzleProvider } from 'drizzle-react';
//mport Container from './Container';
import MyComponent from './MyComponent';

class App extends Component {
  render() {
    return (
    <DrizzleProvider options={drizzleOptions}>
      <LoadingContainer>
      <MyComponent />
      </LoadingContainer>
    </DrizzleProvider>
  );
  }
}

export default App;
 