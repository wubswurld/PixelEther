import React from "react";
class Balance extends React.Component {
  state = { dataKey: null };
componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Pixelether;
// let drizzle know we want to watch 'sum'
    var balanceOf = contract.methods["balanceOf"];

    var dataKey = balanceOf(drizzleState.accounts[0]).call().then((req, res) => {
        console.log(req)
        this.setState({ dataKey: req });
    })
// save the `dataKey` to local component state for later reference

  }
  componentOnMount() {
        console.log(this.state.dataKey);
  }
render() {
    // get the contract state from drizzleState
    const { drizzleState } = this.props;
    const { Pixelether } = this.props.drizzleState.contracts;
    const {dataKey} = this.state;
// using the saved `dataKey`, get the variable we're interested in
    // const sum = Pixelether.sum[this.state.dataKey];
// if it exists, then we display its value
return (<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">PixelEther</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <p class="nav-item nav-link active" id="acct" href="#">Account: {drizzleState.accounts[0]} <span class="sr-only">(current)</span></p>
      {/* <p class="nav-item nav-link" id="acct" href="#">Pixel Balance: {dataKey}</p> */}
    </div>
  </div>
</nav>
<br></br>
<div>
    <h3>Pixel Asset Balance:</h3>
    <h2>{dataKey}</h2>
</div>
</div>)
    // return <p>Sum: {sum && sum.value}</p>;
  }
}
export default Balance;