import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Media } from 'reactstrap';


class Maptok extends React.Component {
  state = { dataKey: null, dataKeys: null, id: 0, artist: null, newone: [], initalRender: false, allTokens: [], modal: false};

  componentDidMount() {
    const { drizzle, mytoks } = this.props;
    const contract = drizzle.contracts.Pixelether;

    const Name = contract.methods["Name"];
    const Artist = contract.methods["Artist"];
    const Ida = contract.methods["Id"];
    const test = contract.methods["test"];
    // var newcoin = contract.methods["getPixelfromId"];
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
    const { drizzle, mytoks, ipfshash } = this.props;
    //   const { dataKey, artist, id } = this.state;
     const contract = drizzle.contracts.Pixelether;
     var newcoin = contract.methods["getPixelfromId"];
     var imgsrc = "https://gateway.ipfs.io/ipfs/";
     console.log(imgsrc);
     var tokens = []
     if(this.state.initalRender === false){
        const list = mytoks.map((key) => newcoin(key).call().then((req, res) => {
            tokens.push(req);
        this.setState({initalRender: true})
        this.setState({ allTokens: tokens});
    }));
     }
     const listItems = this.state.allTokens.map((key) =>
     <div class="col-sm">
     <div className="container" key={key}>
       {/* <div className="card-body"> */}
         {/* <h4 key={key[0]}>{key[0]}</h4>
         <p key={key[1]}>Artist: {key[1]}</p>
         <p key={key[2]}>Id: {key[2]}</p>
         <p key={key[3]}>Ipfs hash: {key[3]}</p> */}
         <img src={imgsrc + key[3]} className="imgurl"></img>
         <div className="middle" key={key}>
            <div className="text">
            <Media>
                <Media left top href="#">
                </Media>
                <Media body>
                <Media heading key={key[0]}>{key[0]}
                </Media>
                <Media heading key={key[1]}>{key[1]}
                </Media>
                <Media key={key[3]}>{key[3]}
                </Media>
                </Media>
            </Media>
            </div>
        </div>
         </div>
        {/* </div> */}
        <br></br>
       </div>
     )
    // console.log(this.state.newone);
    // const list = mytoks.map((key) => newcoin(key).call().then((req, res) => {
    //     console.log(req);
    //     this.setState({newone: req});
    // }));
    return(
        <div class="container">
        <div class="row">
            {listItems}
        </div>
        </div>
    )

  }
}

export default Maptok;