# Proof-of-Location-dApp
Final Project for Truffle University

## Background
The rationale behind this project is to be able to irrefutably prove your location at a point in time. There are numerous applications for this, but think along the lines of being able to show proof that you ran a marathon and finished at a certain time, or your hiked a mountain in a record time etc.

## User Stories

### Real Time
As a user I would like to capture my realtime location and upload it. Various metadata should be collected to aid the burden of proof: latitude, longitude, time of day, altitude, etc. 

### Upload (Ex-Post)
I would like to be able to upload my GPS data captured by popular tracking apps in formats such as geoJSON. I would like to be able to see this data in its entirety (perhaps stored on IPFS) and I would also like to have a hash of this data recorded in the blockchain for proof. 

## Implementation Details
### Overview
Considering using IPFS to store the geo-json file, which can get quite large due to the volume of GPS data that is stored, particularly on longer routes. The hash of this file will be the one that is uploaded to the blockchain. The application should be able to abstract away the low-level details of storing this file on IPFS and uploading a hash of it to the blockchain. The application should work with MetaMask and the application should have good error handling in place to handle issues such as failure to connect to Web3, etc. The application should indicate the active Ethereum account in Metamask to remind the user which account will be signing this transaction. 

### Stretch Goals
Handle more than one kind of GPS File
Allow the user to view the history of their prior submissions. 
