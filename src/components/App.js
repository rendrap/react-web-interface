import React, { Component } from 'react';
import '../css/App.css';

import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

import {without} from 'lodash';


class App extends Component {

  constructor() {
    super();
    this.state = {
      myAppointments: [],
      formDisplay: false,
      lastIndex: 0
    };
    this.handleDeleteAppointments = this.handleDeleteAppointments.bind(this);
  }

  toggleForm = () => {
    this.setState (prevState => {
      return {
        formDisplay: !prevState.formDisplay
      };
    });
  }

  /* toggleForm func

  */

  handleDeleteAppointments = apt => {
    let tempApts = this.state.myAppointments;
    tempApts = without (tempApts, apt);

    this.setState({ myAppointments: tempApts });
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({lastIndex: this.state.lastIndex +1});
          return item;
        })

        this.setState({
          myAppointments: apts
        });

      });
  }

  render () {

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                />
                <SearchAppointments />
                <ListAppointments appointments={this.state.myAppointments}
                  deleteAppointments={this.handleDeleteAppointments} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

}

export default App;
