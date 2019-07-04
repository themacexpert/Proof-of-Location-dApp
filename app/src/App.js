import React, {Component} from 'react';
import drizzleOptions from './drizzleOptions';
import { DrizzleProvider } from 'drizzle-react';
import Container from './Container';

class App extends Component {
  render() {
    return (
    <DrizzleProvider options={drizzleOptions}>
      <Container />
    </DrizzleProvider>
  );
  }
}

export default App;
