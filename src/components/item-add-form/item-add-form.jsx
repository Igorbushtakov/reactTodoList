import React, {Component} from 'react';
import './item-add-form.css';

export default class itemAddForm extends Component {
    state ={
        label : ''
    };

    onlabelChange = (event) => {
      this.setState({
          label: event.target.value
      })  
    };
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onItemAdded(this.state.label);
        //set state зачищает форму 
        this.setState({
             label:''
         })
    };

    render () {
        return (
            <form className="item-add-form d-flex"
            onSubmit={this.onSubmit} >
                <input type="text" className="form-control"
                onChange={this.onlabelChange} 
                placeholder="what's need to do"
                value = {this.state.label}/>
                <button className="btn btn-outline-secondary">
                    Add</button>
            </form>
        )
    }
}