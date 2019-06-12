import React from "react";
import "../styles/App.css";
import ToolBar from "./ToolBar";
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
      colorDark1: "#1b3046",
      colorDark2: "#4f627e",
      colorMain: "#79a9b4",
      colorLight2: "#d2d1c0",
      colorLight1: "#cccccd" ,
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
    const colorHex = rgbToHex(rgbArr);
    const colorRgb = rgbArr.join(", ")
    // If color picker is visible and clicked color is the same, hide color picker
    if (colorRgb === this.state.selectedColorRgb) {
      this.setState({
        isColorClicked: !this.state.isColorClicked
      });
    // If color picker is hidden, show color picker and display color code of selected color
    } else if (!this.state.isColorClicked) {
      this.setState({
        selectedColorHex: colorHex,
        selectedColorRgb: colorRgb,
        isColorClicked: !this.state.isColorClicked
      });
      // If color picker is visible and a different color is picked, display new color code only
    } else {
      this.setState({
        selectedColorHex: colorHex,
        selectedColorRgb: colorRgb
      });
    }
  };

  handleGenerate = async () => {
    try {
      const proxy = "https://polar-beach-54822.herokuapp.com/";
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
        console.log(lumArrSorted);
      this.setState({
        colorDark1: colorSorted[0],
        colorDark2: colorSorted[1],
        colorMain: colorSorted[2],
        colorLight2: colorSorted[3],
        colorLight1: colorSorted[4]
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    // Get first key of object in colors array
    const appStyle = {
      "--colorLight1": this.state.colorLight1,
      "--colorLight2": this.state.colorLight2,
      "--colorMain": this.state.colorMain,
      "--colorDark2": this.state.colorDark2,
      "--colorDark1": this.state.colorDark1
    };

    return (
      <div id="app" style={appStyle}>
        <NavBar />
        <ShowCase />
        <CardsContainer />
        <ColorPicker
          colorClickedHex={this.state.selectedColorHex}
          colorClickedRgb={this.state.selectedColorRgb}
          isClicked={this.state.isColorClicked}
          onClick={this.handleClick}
        />
        <ToolBar onClick={this.handleClick} onGenerate={this.handleGenerate} />
      </div>
    );
  }
}

export default App;
