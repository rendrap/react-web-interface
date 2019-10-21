import React, { Component } from 'react';

class ListAppointments extends Component {
  render () {

    const listItems = this.props.appointments.map((item, index) => (
      <div>
        <div key={index}>{ item.petName }</div>
        <div key={index}>{ item.ownerName }</div>
      </div>
      ));

    return <div>{listItems}</div>;
  }
}

export default ListAppointments;