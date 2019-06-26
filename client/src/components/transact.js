import React from "react";
import Maptok from "./maptokens";
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
handleSubmit = (e) => {
    var mintcoin = this.state.contractstate.methods["mintcoin"];
    var data = mintcoin().send().then((req, res) => {
    })
}
newSubmit = (e) => {
    const { drizzle, drizzleState } = this.props;
    e.preventDefault();
    var newcoin = this.state.contractstate.methods["createItem"];
    var coindata = newcoin(this.state.title, this.state.artist).send(
        {
            gas: 5000000,
            gasPrice: '8000000000'
        }
    ).then((req, res) => {
        this.setState({data: req})
    })
    this.setState({coindatastate: coindata})
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
return (
    <div>
    <div>
        <form onSubmit={this.newSubmit}>
                <input onChange={this.updateValue} className='form-input' id="form-input"value={this.state.title} name='title' type='text' placeholder="Title"/>
                <input onChange={this.updateValue} className='form-input' name='artist' value={this.state.artist} type='text' placeholder="Artist"/>
                <br />
                <button type="submit">submit</button>
        </form>
    </div>
    <br />
    {/* <div>
        <form onSubmit={this.idSubmit}>
                <input onChange={this.updateValue} className='form-input' id="form-input"value={this.state.id} name='id' type='text' placeholder="Id"/>
                <br />
        <button type="submit">submit</button>
        </form>
    </div> */}
    <div>
        <h3>My tokens:</h3>
        <Maptok
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
          mytoks={this.state.tokensarray}
        ></Maptok>
    </div>
</div>
)
  }
}
export default Trans;