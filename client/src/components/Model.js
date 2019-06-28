import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

class Modalexport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  render() {
      const { data, drizzleState, drizzle } = this.props
    return (
      <div className="signin">
        <Button outline color="secondary" size="sm" id="login" onClick={this.toggle}>{this.props.buttonLabel}Your Wallet</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} id="modal">
          <ModalHeader toggle={this.toggle}>Information</ModalHeader>
          <ModalBody>
              <div>
                  <p>Wallet address: {drizzleState.accounts[0]}</p>
                <p>Pixel Asset Balance: {data}</p>
              </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Modalexport;