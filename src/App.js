import React from "react";
import "./App.css";
import Dropdown from "./Dropdown/Dropdown";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
    };
  }

  async componentDidMount() {
    let locations = await fetch("http://localhost:3000/locations");
    this.setState({
      location: await locations.json(),
    });
  }

  onAddNewItem = (item) => {
    this.setState({
      location: [...this.state.location, item],
    });
  };

  ddlOnChange = (selectedItem) => {
    console.log(selectedItem);
  };

  render() {
    return (
      <div className="App">
        <Dropdown
          title="Select Country"
          list={this.state.location}
          onChange={this.ddlOnChange}
          enableAddMore={true}
          onAddNewItem={this.onAddNewItem}
          defaultShow={3}
        />
      </div>
    );
  }
}

export default App;
