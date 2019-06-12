import React from "react";
import "../styles/App.css";
import Toolbar from "./ToolBar";
import ColorPicker from "./ColorPicker";
import NavBar from "./NavBar";
import ShowCase from "./ShowCase";
import CardsContainer from "./CardsContainer";
import { rgbToHex, processRgb } from "../rgbToHex";
import { relativeLuminance, partialLuminance } from "../luminance";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [
        { colorLight1: "#e8e9d4", isClicked: false },
        { colorLight2: "#f7dbbc", isClicked: false },
        { colorMain: "#e2a097", isClicked: false },
        { colorDark2: "#41202e", isClicked: false },
        { colorDark1: "#22223d", isClicked: false }
      ],
      selectedColorHex: "",
      selectedColorRgb: "",
      isColorClicked: false
    };
  }
  // TODO: logic to change form value after new colors are generated while form is visible
  handleClick = e => {
    // Get event target color
    const color = window
      .getComputedStyle(e.target)
      .getPropertyValue("background-color");
    // Convert color to hex code
    const rgbArr = processRgb(color);
    // If color picker is visible and clicked color is the same, hide color picker
    if (rgbArr.join(", ") === this.state.selectedColorRgb) {
      this.setState({
        isColorClicked: !this.state.isColorClicked
      });
      // If color picker is hidden, show color picker and display color code of selected color
    } else if (!this.state.isColorClicked) {
      this.setState({
        selectedColorHex: rgbToHex(rgbArr),
        selectedColorRgb: rgbArr.join(", "),
        isColorClicked: !this.state.isColorClicked
      });
      // If color picker is visible and a different color is picked, display new color code only
    } else {
      this.setState({
        selectedColorHex: rgbToHex(rgbArr),
        selectedColorRgb: rgbArr.join(", ")
      });
    }
  };

  handleGenerate = async () => {
    try {
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = "http://colormind.io/api/";
      const url = proxy + api;
      const inputData = {
        body: '{ "model":"default"}',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      };

      const response = await fetch(url, inputData);
      if (!response.ok) throw new Error("API is broken!");
      const data = await response.json();
      // Convert API data to an array of luminance for each color
      const lumArr = data.result.map(arr =>
        relativeLuminance(partialLuminance(arr))
      );
      // Associate luminance with their respective color code
      const lumUnsorted = {
        [lumArr[0]]: rgbToHex(data.result[0]),
        [lumArr[1]]: rgbToHex(data.result[1]),
        [lumArr[2]]: rgbToHex(data.result[2]),
        [lumArr[3]]: rgbToHex(data.result[3]),
        [lumArr[4]]: rgbToHex(data.result[4])
      };
      // Sort luminance in ascending order
      const lumArrSorted = lumArr
        .sort((a, b) => a - b)
        .map(key => key.toString());
      // Create new array of colors in order of luminance
      const colorSorted = lumArrSorted.map(key => lumUnsorted[key]);
      this.setState({
        colors: [
          { colorLight1: colorSorted[0], isClicked: false },
          { colorLight2: colorSorted[1], isClicked: false },
          { colorMain: colorSorted[2], isClicked: false },
          { colorDark2: colorSorted[3], isClicked: false },
          { colorDark1: colorSorted[4], isClicked: false }
        ]
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const appStyle = {
      "--colorLight1": `${this.state.colors[0].colorLight1}`,
      "--colorLight2": `${this.state.colors[1].colorLight2}`,
      "--colorMain": `${this.state.colors[2].colorMain}`,
      "--colorDark2": `${this.state.colors[3].colorDark2}`,
      "--colorDark1": `${this.state.colors[4].colorDark1}`
    };

    return (
      <div id="app" style={appStyle}>
        <NavBar />
        <ShowCase />
        <CardsContainer />
        <ColorPicker
          colorClickedHex={this.state.selectedColorHex}
          colorClickedRgb={this.state.selectedColorRgb}
          onChange={this.state.handleChange}
          isClicked={this.state.isColorClicked}
          onClick={this.handleClick}
        />
        <Toolbar onClick={this.handleClick} onGenerate={this.handleGenerate} />
      </div>
    );
  }
}

export default App;
