import React from "react";

class ReadString extends React.Component {
  state = { dataKey: null, dataKeys: null, id: 0 };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Pixelether;

    // let drizzle know we want to watch the `myString` method
    const Key = contract.methods["Name"];
    const keys = contract.methods["items"];
    var dataKey = Key().call().then((req, res) => {
        console.log(req);
        this.setState({ dataKey: req });
    });
    var dataKeys = keys(this.state.id).call().then((req, res) => {
        console.log(req);
        this.setState({ dataKeys: req });
    })
    // console.log(dataKey);
    // save the `dataKey` to local component state for later reference
    // this.setState({ dataKey });
  }

  render() {
    const { drizzle } = this.props;
      const { dataKey } = this.state;
      console.log(dataKey);
    // get the contract state from drizzleState
    // using the saved `dataKey`, get the variable we're interested in
    // if it exists, then we display its value
    return <p>My stored string: {dataKey}</p>;
  }
}

export default ReadString;