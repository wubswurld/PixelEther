import React from "react";
import { Button } from 'reactstrap';
import Modalexport from "./Model";

class Balance extends React.Component {
  state = { dataKey: null };
componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Pixelether;
// let drizzle know we want to watch 'sum'
    var balanceOf = contract.methods["balanceOf"];

    var dataKey = balanceOf(drizzleState.accounts[0]).call().then((req, res) => {
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
    console.log(dataKey);
// using the saved `dataKey`, get the variable we're interested in
    // const sum = Pixelether.sum[this.state.dataKey];
// if it exists, then we display its value
return (
<div>
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
  <a className="navbar-brand" id="title" href="#">PixelEther</a>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <Modalexport data={this.state.dataKey}
                    drizzle={this.props.drizzle}
                    drizzleState={drizzleState}
                ></Modalexport>
            </li>
        </ul>
</nav>
<br></br>
</div>)
  }
}
export default Balance;