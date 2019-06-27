import React from "react";
import Maptok from "./maptokens";
import Newtoken from "./newtoken";
import ipfs from "../ipfs";
import { async } from "q";
class Trans extends React.Component {
  state = { 
      dataKey: null, 
      data: null, 
      coindatastate: null,
      contractstate: null,
      title: '',
      artist: '',
      id: '',
      iddata: null,
      tokensarray: [],
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      txReceipt: ''  

    };
componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Pixelether;
    this.setState({contractstate: contract});
    var balanceOf = contract.methods["balanceOf"];
    var itemCheck = contract.methods["ItemCheck"];
    var tokensOfOwner = contract.methods["tokensOfOwner"];
    var owners = tokensOfOwner(drizzleState.accounts[0]).call()
    .then((req, res) => {
                this.setState({ tokensarray: req});
    });
    var check = itemCheck().call().then((req, res) => {
    })
    var dataKey = balanceOf(drizzleState.accounts[0]).call().then((req, res) => {
        this.setState({ dataKey: req });
    })
  }
  componentOnMount() {
        // console.log(this.state.dataKey);
  }
  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)  
  };
convertToBuffer = async(reader) => {
  //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
  //set this buffer -using es6 syntax
    this.setState({buffer});
};
handleSubmit = (e) => {
    var mintcoin = this.state.contractstate.methods["mintcoin"];
    var data = mintcoin().send().then((req, res) => {
    })
}
newSubmit = async (e) => {
    const { drizzle, drizzleState } = this.props;
    e.preventDefault();
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        console.log(err,ipfsHash);
        //setState by setting ipfsHash to ipfsHash[0].hash 
        this.setState({ ipfsHash:ipfsHash[0].hash });
    console.log(this.state.ipfsHash);
    var newcoin = this.state.contractstate.methods["createItem"];
    var coindata = newcoin(this.state.title, this.state.artist, this.state.ipfsHash).send(
        {
            gas: 5000000,
            gasPrice: '8000000000'
        }
    ).then((req, res) => {
        this.setState({data: req})
    })
    this.setState({coindatastate: coindata})
});
}

idSubmit = (e) => {
    const { drizzle, drizzleState } = this.props;

    e.preventDefault();
    var newcoin = this.state.contractstate.methods["getPixelfromId"];
    var ita = newcoin(this.state.id).call().then((req, res) => {
        console.log(req);
        this.setState({iddata: req.v});
    })
}
updateValue = (event) => {
    this.setState({[event.target.name]: event.target.value});
}


render() {
    // get the contract state from drizzleState
    // console.log(this.state.data);
    // console.log(this.state.coindatastate);
    const { drizzleState } = this.props;
    const { Pixelether } = this.props.drizzleState.contracts;
    const {dataKey, contractstate} = this.state;
    console.log(this.state.buffer);
    console.log(this.state.ipfsHash);
return (
    <div>
    {/* <div>
        <form onSubmit={this.newSubmit}>
                <input onChange={this.updateValue} className='form-input' id="form-input"value={this.state.title} name='title' type='text' placeholder="Title"/>
                <input onChange={this.updateValue} className='form-input' name='artist' value={this.state.artist} type='text' placeholder="Artist"/>
                <br />
                <button type="submit">submit</button>
        </form>
    </div> */}
    <Newtoken title={this.state.title} artist={this.state.artist} updateValue={this.updateValue} newSubmit={this.newSubmit} captureFile={this.captureFile}></Newtoken>
    <br />
    <div>
        <h3>My tokens:</h3>
        <Maptok
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
          mytoks={this.state.tokensarray}
        ></Maptok>
        <div className="container">
          <div class="row justify-content-between">
    {/* <div class="col-4">
      One of two columns
    </div>
    <div class="col-4">
      One of two columns
    </div> */}
  </div>
    </div>
    </div>
</div>
)
  }
}
export default Trans;