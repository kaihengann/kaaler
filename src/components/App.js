import React from "react";
import "../styles/App.css";
import ToolBar from "./ToolBar";
import ColorPicker from "./ColorPicker";
import NavBar from "./NavBar";
import ShowCase from "./ShowCase";
import CardsContainer from "./CardsContainer";
import { rgbToHex, processRgbArr } from "../rgbToHex";
import { relativeLuminance, partialLuminance } from "../luminance";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolBarColors: [
        { id: 0, colorHex: "#cccccd", colorRgb: "204, 204, 205"},
        { id: 1, colorHex: "#d2d1c0", colorRgb: "210, 209, 192" },
        { id: 2, colorHex: "#79a9b4", colorRgb: "121, 169, 180" },
        { id: 3, colorHex: "#4f627e", colorRgb: "79, 98, 126" },
        { id: 4, colorHex: "#1b3046", colorRgb: "27, 48, 70" }
      ],
      selectedColorHex: "",
      selectedColorRgb: "",
      isColorClicked: false,
      selectedButton: null
    };
  }
  // TODO: logic to change form value after new colors are generated while form is visible
  handleClick = (id, colorHex, colorRgb) => {
    // console.log(processRgb(rgb))
    // REMOVE
    // Get event target color
    // const color = window
    //   .getComputedStyle(e.target)
    //   .getPropertyValue("background-color");

    // Convert color to hex code
    // const rgbArr = processRgb(color);
    // const colorHex = rgbToHex(rgbArr);
    // const colorRgb = rgbArr.join(", ");

    // If color picker is visible and clicked color is the same, hide color picker
    if (colorHex === this.state.selectedColorHex) {
      this.setState({
        isColorClicked: !this.state.isColorClicked,
        selectedButton: null
      });
      // If color picker is hidden, show color picker and display color code of selected color
    } else if (!this.state.isColorClicked) {
      this.setState({
        selectedColorHex: colorHex,
        selectedColorRgb: colorRgb,
        isColorClicked: !this.state.isColorClicked,
        selectedButton: id
      });
      // If color picker is visible and a different color is picked, display new color code only
    } else {
      this.setState({
        selectedColorHex: colorHex,
        selectedColorRgb: colorRgb,
        selectedButton: id
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
         [lumArr[0]]: data.result[0],
         [lumArr[1]]: data.result[1],
         [lumArr[2]]: data.result[2],
         [lumArr[3]]: data.result[3],
         [lumArr[4]]: data.result[4]
      };
      console.log(data.result[0])
      // Sort luminance in descending order
      const lumArrSorted = lumArr
        .sort((a, b) => b - a)
        .map(key => key.toString());
      // Create new array of colors in order of luminance
      const colorSorted = lumArrSorted.map(key => lumUnsorted[key]);
     
      this.setState({
        toolBarColors: [
          { id: 0, colorHex: rgbToHex(colorSorted[0]), colorRgb: processRgbArr(colorSorted[0]) },
          { id: 1, colorHex: rgbToHex(colorSorted[1]), colorRgb: processRgbArr(colorSorted[1]) },
          { id: 2, colorHex: rgbToHex(colorSorted[2]), colorRgb: processRgbArr(colorSorted[2]) },
          { id: 3, colorHex: rgbToHex(colorSorted[3]), colorRgb: processRgbArr(colorSorted[3]) },
          { id: 4, colorHex: rgbToHex(colorSorted[4]), colorRgb: processRgbArr(colorSorted[4]) }
        ]
      });
      console.log(this.state.toolBarColors);
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    // Get first key of object in colors array
    const appStyle = {
      "--colorLight1": this.state.toolBarColors[0].colorHex,
      "--colorLight2": this.state.toolBarColors[1].colorHex,
      "--colorMain": this.state.toolBarColors[2].colorHex,
      "--colorDark2": this.state.toolBarColors[3].colorHex,
      "--colorDark1": this.state.toolBarColors[4].colorHex
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
        <ToolBar colors={this.state.toolBarColors} onClick={this.handleClick} onGenerate={this.handleGenerate} selectedButton={this.selectedButton} />
      </div>
    );
  }
}

export default App;
