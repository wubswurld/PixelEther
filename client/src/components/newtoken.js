import React, { Component } from "react";

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

        const { title, artist, updateValue, newSubmit, captureFile } = this.props
        return (
            <div>
            <form onSubmit={newSubmit}>
                    <input onChange={updateValue} className='form-input' id="form-input"value={title} name='title' type='text' placeholder="Title"/>
                    <input onChange={updateValue} className='form-input' name='artist' value={artist} type='text' placeholder="Artist"/>
                    <input type = "file" onChange = {captureFile} />
                    <br />
                    <button type="submit">submit</button>
            </form>
        </div>
        )
    }
}

export default Newtoken;