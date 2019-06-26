import React from "react";

class ReadString extends React.Component {
  state = { dataKey: null, dataKeys: null, id: 0, artist: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Pixelether;

    // let drizzle know we want to watch the `myString` method
    const Name = contract.methods["Name"];
    const Artist = contract.methods["Artist"];
    const Ida = contract.methods["Id"];
    const test = contract.methods["test"];
    var dey = test().call().then((req, res) => {
      this.setState({ dataKey: req });
  });
    const keys = contract.methods["items"];
    var dataKey = Name().call().then((req, res) => {
        this.setState({ dataKey: req });
    });
    var Art = Artist().call().then((req, res) => {
        this.setState({ artist: req });
    });
    var dataKeys = keys('1').call().then((req, res) => {
        this.setState({ dataKeys: req });
    });
    var idKeys = Ida().call().then((req, res) => {
      this.setState({ id: req });
  })
    // console.log(dataKey);
    // save the `dataKey` to local component state for later reference
    // this.setState({ dataKey });
  }

  render() {
    const { drizzle } = this.props;
      const { dataKey, artist, id } = this.state;
    // get the contract state from drizzleState
    // using the saved `dataKey`, get the variable we're interested in
    // if it exists, then we display its value
    return (
    <div>
        <h4>Last Upload</h4>
    <p>Name: {dataKey}</p>
    <p>Artist: {artist}</p>
    <p>Id: {id}</p>
    </div>
    );
  }
}

export default ReadString;