import React from "react";
import "../styles/App.css";
import NavBar from "./NavBar";
import ToolBar from "./ToolBar";
import ShowCase from "./ShowCase";
import { rgbToHex } from "../rgbToHex";
import ColorPicker from "./ColorPicker";
import { dataForApi, url } from "../api";
import CardsContainer from "./CardsContainer";
import { relativeLuminance, partialLuminance } from "../luminance";
import {
  toolBarColorsDefault,
  paletteColorsDefault,
  lockStatusDefault,
  userPaletteDefault
} from "../defaultStates";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolBarColors: toolBarColorsDefault,
      paletteColors: paletteColorsDefault,
      lockStatus: lockStatusDefault,
      selectedColorHex: "",
      selectedColorRgb: "",
      isColorClicked: false,
      selectedButton: null,
      lastToolBarColorId: null,
      userPalette: userPaletteDefault
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

  handleLock = (id, isLocked) => {
    // Toggle lock status
    const newLockStatus = [...this.state.lockStatus];
    const changeLock = { id, isLocked: !isLocked };
    newLockStatus[id] = changeLock;

    const indexToReplace = id;
    const newUserPalette = [...this.state.userPalette];
    // If color is getting locked, add toolbar color to userPalette
    if (!isLocked) {
      // Get current color of associated toolbar button
      const colorToInsert = this.state.toolBarColors[id].colorRgb
        .split(", ")
        .map(number => parseInt(number, 10));
      newUserPalette.splice(indexToReplace, 1, colorToInsert);
      // If color is getting unlocked, remove toolbar color from userPalette
    } else {
      newUserPalette.splice(indexToReplace, 1, "N");
    }
    this.setState({
      lockStatus: newLockStatus,
      userPalette: newUserPalette
    });
  };

  handleGenerate = async () => {
    try {
      // If user has selected color(s), insert userPalette into inputData
      if (this.state.userPalette.length > 0) {
        dataForApi.body = `{"input": ${JSON.stringify(
          this.state.userPalette
        )}, "model":"default" }`;
      }

      const response = await fetch(url, dataForApi);
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
            colorRgb: colorSorted[0].join(", ")
          },
          {
            id: 1,
            colorHex: rgbToHex(colorSorted[1]),
            colorRgb: colorSorted[1].join(", ")
          },
          {
            id: 2,
            colorHex: rgbToHex(colorSorted[2]),
            colorRgb: colorSorted[2].join(", ")
          },
          {
            id: 3,
            colorHex: rgbToHex(colorSorted[3]),
            colorRgb: colorSorted[3].join(", ")
          },
          {
            id: 4,
            colorHex: rgbToHex(colorSorted[4]),
            colorRgb: colorSorted[4].join(", ")
          }
        ],
        // Reset custom palette and unlock all toolbar colors
        userPalette: userPaletteDefault,
        lockStatus: lockStatusDefault
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
          onLock={this.handleLock}
          lockStatus={this.state.lockStatus}
          onClick={this.handleClick}
          onGenerate={this.handleGenerate}
          selectedButton={this.state.selectedButton}
        />
      </div>
    );
  }
}

export default App;
