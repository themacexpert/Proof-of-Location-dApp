import React, {Component} from 'react';
import drizzleOptions from './drizzleOptions';
import { DrizzleProvider } from 'drizzle-react';

class App extends Component {
  render() {
    return (
    <DrizzleProvider options={drizzleOptions}>
      <div>Hello World DApp</div>
    </DrizzleProvider>
  );
  }
}

export default App;
