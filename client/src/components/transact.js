import React from "react";
class Trans extends React.Component {
  state = { 
      dataKey: null, 
      data: null, 
      coindatastate: null,
      contractstate: null,
      title: '',
      artist: '',
      id: '',
      iddata: null
    };
componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Pixelether;
    this.setState({contractstate: contract});
    var balanceOf = contract.methods["balanceOf"];
    var itemCheck = contract.methods["ItemCheck"];
    var check = itemCheck().call().then((req, res) => {
        console.log(req);
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
        console.log(req);
    })
    console.log(data)
}
newSubmit = (e) => {
    const { drizzle, drizzleState } = this.props;
    e.preventDefault();
    var newcoin = this.state.contractstate.methods["createItem"];
    var coindata = newcoin(this.state.title).send(
        {
            gas: 5000000,
            gasPrice: '8000000000'
        }
    ).then((req, res) => {
        console.log(req);
        console.log(res)
        this.setState({data: req})
    })
    this.setState({coindatastate: coindata})
    console.log(coindata);
}

idSubmit = (e) => {
    const { drizzle, drizzleState } = this.props;

    e.preventDefault();
    var newcoin = this.state.contractstate.methods["getName"];
    var ita = newcoin(this.state.id).send({
        from: drizzleState.accounts[0],
        gas: 5000000,
        gasPrice: '8000000000'
    }).then((req, res) => {
        console.log(req)
        console.log(res);
    })
    console.log(ita);
    this.setState({iddata: ita});
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
    // const myString = contractstate.getTokenName[this.state.iddata];
    // console.log(myString);
    console.log(this.state.data);
    // console.log(this.state.id);
return (
    <div>
<div>
    <form onSubmit={this.handleSubmit}>
    <button type="submit">Mint</button>
    </form>
</div>
<br></br>
<div>
    <form onSubmit={this.newSubmit}>
                <input onChange={this.updateValue} className='form-input' id="form-input"value={this.state.title} name='title' type='text' placeholder="Title"/>
                <input onChange={this.updateValue} className='form-input' name='artist' value={this.state.artist} type='text' placeholder="Artist"/>
                <br />
                <button type="submit">submit</button>
    </form>
    </div>
    <br />
    <div>
    <form onSubmit={this.idSubmit}>
                <input onChange={this.updateValue} className='form-input' id="form-input"value={this.state.id} name='id' type='text' placeholder="Id"/>
                <br />
        <button type="submit">submit</button>
    </form>
    </div>
</div>
)
  }
}
export default Trans;