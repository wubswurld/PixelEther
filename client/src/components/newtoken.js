import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
  }));
  
class Newtoken extends Component {
render() {
const inputBox = document.querySelector('.input-box');
const arrows = document.querySelectorAll('.arrow');
const usernameInput = document.querySelector('#username-input');
const mailInput = document.querySelector('#mail-input');
const passwordInput = document.querySelector('#password-input');
const arrowsArray = Array.from(arrows);
let deg = 0;
setTimeout(() => {
    // inputBox.classList.add('show-input');
    // setTimeout(() => inputBox.classList.remove('show-input'), 1300)
}, 100);
arrowsArray.forEach(current => {
    current.addEventListener('click', () => {
        deg -= 90;
        inputBox.style.transform = `rotate3d(1, 0, 0, ${deg}deg)`;
        if(deg === -270) {
            setTimeout(() => {
                usernameInput.value = '';
                mailInput.value = '';
                passwordInput.value = '';
                deg = 0;
                inputBox.style.transform = `rotate3d(1, 0, 0, 0)`
            }, 3000);
        }
    })
})

        const { title, artist, updateValue, newSubmit, captureFile } = this.props;
        return (
            <div>
                <h3>Create a new erc721!</h3>
            <form onSubmit={newSubmit}>
            <div className="check">
                    <TextField id="standard-dense" label="Title" margin="dense" onChange={updateValue} className="check" value={title} name='title' type='text'/>
                    </div>
                    <div className="check1">
                    <TextField id="standard-dense" label="Artist" margin="dense" onChange={updateValue} className='form-input' name='artist' value={artist} type='text'/>
                    </div>
                    <div className="check2">
                    <input type="file" onChange={captureFile} className="welp" />
                    </div>
                    <br />
                    <button type="submit">submit</button>
            </form>
        </div>
        )
    }
}

export default Newtoken;