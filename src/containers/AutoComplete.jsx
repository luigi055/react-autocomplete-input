// @flow
import React, { Component } from "react";
import axios from "axios";
import AutoCompleteInput from "./../components/AutoCompleteInput/AutoCompleteInput";

class AutoCompleteComponent extends Component {
  state = {
    countries: [],
    selectedCountry: "",
    selectedCountryTwo: ""
  };
  componentDidMount() {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://restcountries.eu/rest/v2/all"
        );

        const countries = data.map(country => country.name);
        this.setState({
          countries
        });
      } catch (err) {
        throw new Error(err);
      }
    })();
  }
  // Single source of truth using React State Management
  // AutoComplete just receive arrays of strings
  updateGlobalState = state => this.setState(state);
  render() {
    return (
      <div>
        <AutoCompleteInput
          stateName="selectedCountry"
          parentUpdateState={this.updateGlobalState}
          autoCompleteItems={this.state.countries}
          maxSuggests={5}
          maxWidth="280px"
          labelName="Search Country: "
          placeholder="Type a Country Name"
        />
        <AutoCompleteInput
          stateName="selectedCountryTwo"
          parentUpdateState={this.updateGlobalState}
          autoCompleteItems={this.state.countries}
          maxSuggests={5}
          maxWidth="280px"
          labelName="Search Country: "
          placeholder="Type a Country Name"
        />
        {this.state.selectedCountry}
        {this.state.selectedCountryTwo}
      </div>
    );
  }
}

export default AutoCompleteComponent;
