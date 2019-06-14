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
        { id: 0, colorHex: "#cccccd", colorRgb: "204, 204, 205" },
        { id: 1, colorHex: "#d2d1c0", colorRgb: "210, 209, 192" },
        { id: 2, colorHex: "#79a9b4", colorRgb: "121, 169, 180" },
        { id: 3, colorHex: "#4f627e", colorRgb: "79, 98, 126" },
        { id: 4, colorHex: "#1b3046", colorRgb: "27, 48, 70" }
      ],
      paletteColors: [
        { id: 11, colorHex: "#E94A35", colorRgb: "233, 74, 53" },
        { id: 12, colorHex: "#F59D00", colorRgb: "245, 157, 0" },
        { id: 13, colorHex: "#F5E100", colorRgb: "245, 225, 0" },
        { id: 14, colorHex: "#009755", colorRgb: "0, 151, 85" },
        { id: 15, colorHex: "#083D7A", colorRgb: "8, 61, 122" },
        { id: 16, colorHex: "#6EC4FD", colorRgb: "110, 196, 253" },
        { id: 17, colorHex: "#7935E9", colorRgb: "121, 53, 233" },
        { id: 18, colorHex: "#B58989", colorRgb: "181, 137, 137" },
        { id: 19, colorHex: "#B7B7B7", colorRgb: "183, 183, 183" },
        { id: 20, colorHex: "#D2B85C", colorRgb: "210, 184, 92" },
        { id: 21, colorHex: "#745029", colorRgb: "116, 80, 41" },
        { id: 22, colorHex: "#790000", colorRgb: "121, 0, 0" },
        { id: 23, colorHex: "#F26D7D", colorRgb: "242, 109, 125" },
        { id: 24, colorHex: "#6DF2B5", colorRgb: "109, 242, 181" },
        { id: 25, colorHex: "#ffffff", colorRgb: "255, 255, 255" },
        { id: 26, colorHex: "#000000", colorRgb: "0, 0, 0" }
      ],
      selectedColorHex: "",
      selectedColorRgb: "",
      isColorClicked: false,
      selectedButton: null,
      lastToolBarColorId: null,
      userPalette: ["N", "N", "N", "N", "N"]
    };
  }
  handleClick = (id, colorHex, colorRgb) => {
    // If color picker is hidden, show color picker and display color code of selected color
    if (!this.state.isColorClicked) {
      this.setState({
        selectedColorHex: colorHex,
        selectedColorRgb: colorRgb,
        isColorClicked: !this.state.isColorClicked,
        selectedButton: id,
        lastToolBarColorId: id
      });
      // If color picker is visible and clicked color is the same, hide color picker
    } else if (colorHex === this.state.selectedColorHex) {
      this.setState({
        isColorClicked: !this.state.isColorClicked,
        selectedButton: null
      });
      // If color picker is visible and toolbar color is clicked
    } else if (id < 5) {
      this.setState({
        selectedColorHex: colorHex,
        selectedColorRgb: colorRgb,
        lastToolBarColorId: id,
        selectedButton: id
      });
      // If color picker is visible and colorpicker is clicked
    } else if (id > 5) {
      /* Replace color of previously clicked toolbar color with selected colorpicker color */
      // Create new object to replace old object in toolBarcolor
      const transferedColor = {
        id: this.state.lastToolBarColorId,
        colorHex,
        colorRgb
      };
      const newToolBarColors = [...this.state.toolBarColors];
      // id is same as index in toolBarColors
      newToolBarColors[this.state.lastToolBarColorId] = transferedColor;

      /* Record colors user has selected from colorpicker */
      // Parse selected color into array
      const userSelectedColor = colorRgb
        .split(", ")
        .map(number => parseInt(number, 10));
      const newUserPalette = [...this.state.userPalette];
      const indexToReplace = this.state.lastToolBarColorId;
      newUserPalette.splice(indexToReplace, 1, userSelectedColor);

      this.setState({
        selectedColorHex: colorHex,
        selectedColorRgb: colorRgb,
        selectedButton: id,
        toolBarColors: newToolBarColors,
        userPalette: newUserPalette
      });
    }
  };

  handleGenerate = async () => {
    try {
      const proxy = "https://polar-beach-54822.herokuapp.com/";
      const api = "http://colormind.io/api/";
      const url = proxy + api;
      const inputData = {
        body: `{ "model":"default"}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      };
      // If user has selected color(s), insert userPalette into inputData
      if (this.state.userPalette.length > 0) {
        inputData.body = `{"input": ${JSON.stringify(
          this.state.userPalette
        )}, "model":"default" }`;
      }

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
      // Sort luminance in descending order
      const lumArrSorted = lumArr
        .sort((a, b) => b - a)
        .map(key => key.toString());
      // Create new array of colors in order of luminance
      const colorSorted = lumArrSorted.map(key => lumUnsorted[key]);

      this.setState({
        toolBarColors: [
          {
            id: 0,
            colorHex: rgbToHex(colorSorted[0]),
            colorRgb: processRgbArr(colorSorted[0])
          },
          {
            id: 1,
            colorHex: rgbToHex(colorSorted[1]),
            colorRgb: processRgbArr(colorSorted[1])
          },
          {
            id: 2,
            colorHex: rgbToHex(colorSorted[2]),
            colorRgb: processRgbArr(colorSorted[2])
          },
          {
            id: 3,
            colorHex: rgbToHex(colorSorted[3]),
            colorRgb: processRgbArr(colorSorted[3])
          },
          {
            id: 4,
            colorHex: rgbToHex(colorSorted[4]),
            colorRgb: processRgbArr(colorSorted[4])
          }
        ]
      });
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
          colors={this.state.paletteColors}
          onClick={this.handleClick}
          selectedButton={this.state.selectedButton}
          isClicked={this.state.isColorClicked}
          selectedColorHex={this.state.selectedColorHex}
          selectedColorRgb={this.state.selectedColorRgb}
        />
        <ToolBar
          colors={this.state.toolBarColors}
          onClick={this.handleClick}
          onGenerate={this.handleGenerate}
          selectedButton={this.state.selectedButton}
        />
      </div>
    );
  }
}

export default App;
