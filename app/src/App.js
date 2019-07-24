import React, {Component} from 'react';
import drizzleOptions from './drizzleOptions';
import { LoadingContainer} from 'drizzle-react-components';
import { DrizzleProvider } from 'drizzle-react';
//mport Container from './Container';
import MyComponent from './MyComponent';
import ipfs from './ipfs';
import StorageContract from "./contracts/Storage.json";
import getWeb3 from "./utils/getWeb3";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = StorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        StorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      //Added stuff from tutorial
      this.captureFile = this.captureFile.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, buffer: null, ipfsHash: ''}, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set("five").send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  captureFile(event){
    event.preventDefault();
    console.log('capture file...');
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  onSubmit(event){
    event.preventDefault();
    console.log('on submit');
    ipfs.files.add(this.state.buffer, (error, result) => {
      if (error) {
        console.log("there was an error with iPFS upload");
        return;
      }
        console.log("There were no errors");
        this.setState({ ipfsHash: result[0].hash});
        console.log('ipfsHash', this.state.ipfsHash);
    } )
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>IPFS File Upload DApp</h1>
        <p>Your Image.</p>
        <h2>Upload Image</h2>
        <form onSubmit={this.onSubmit} action="">
          <input type='file' onChange={this.captureFile}/>
          <input type='submit' />
        </form>
        <img src= {`https://gateway.ipfs.io/ipfs/${this.state.ipfsHash}`}  alt=""/>  
      </div>
    );
  }
}

export default App;
