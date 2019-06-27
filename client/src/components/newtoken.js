import React, { Component } from "react";

class Newtoken extends Component {
    render() {
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