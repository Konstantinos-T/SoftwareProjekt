import React from 'react';


const CheckboxField = React.createClass({
  getInitialState: function () {
    return {
        complete: (!!this.props.complete) || false
      };
  },
  handleChange: function(){
    this.setState({
      complete: !this.state.complete
    });
  },
  render: function(){
    var labelStyle={
      'text-decoration': this.state.complete?'line-through':''
    };
    return (
      <span>
        <label style={labelStyle}>
          <input
            type="checkbox"
            defaultChecked={this.state.complete}
            ref="complete"
            onChange={this.handleChange}
          />
          {this.props.text}
        </label>
      </span>
    );
  }
});

export default CheckboxField;