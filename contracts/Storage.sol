//Contract to manage the ipfs hash / location of the data on IPFS.
pragma solidity >=0.5.0;

contract Storage {
  string ipfsHash;

  function set(string memory x) public {
    ipfsHash = x;
  }

  function get() public view returns (string memory){
  	return ipfsHash;
  }
}
