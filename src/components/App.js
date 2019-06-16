import React from "react";
import "../styles/App.css";

import NavBar from "./NavBar";
import ToolBar from "./ToolBar";
import ShowCase from "./ShowCase";
import ColorPicker from "./ColorPicker";
import CardsContainer from "./CardsContainer";

import { rgbToHex } from "../rgbToHex";
import { dataForApi, url } from "../api";
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
      selectedButton: null,
      selectedColorHex: "",
      selectedColorRgb: "",
      isColorClicked: false,
      lastToolBarColorId: null,
      lockStatus: lockStatusDefault,
      userPalette: userPaletteDefault,
      toolBarColors: toolBarColorsDefault,
      paletteColors: paletteColorsDefault
    };
  }

  handleClick = (id, colorHex, colorRgb) => {
    // If color picker is hidden, show color picker and display color code of selected color
    if (!this.state.isColorClicked) {
      this.setState({
        selectedButton: id,
        selectedColorHex: colorHex,
        selectedColorRgb: colorRgb,
        lastToolBarColorId: id,
        isColorClicked: !this.state.isColorClicked
      });

      // If color picker is visible and clicked color is the same, hide color picker
    } else if (colorHex === this.state.selectedColorHex) {
      this.setState({
        selectedButton: null,
        isColorClicked: !this.state.isColorClicked
      });
      // If color picker is visible and toolbar color is clicked, update input form
    } else if (id < 5) {
      this.setState({
        selectedButton: id,
        selectedColorHex: colorHex,
        selectedColorRgb: colorRgb,
        lastToolBarColorId: id
      });
      // If color picker is visible and colorpicker is clicked, update input form and ...
    } else if (id > 10) {
      // replace color of previously clicked toolbar color with selected colorpicker color
      const transferedColor = {
        id: this.state.lastToolBarColorId,
        colorHex,
        colorRgb
      };

      const newToolBarColors = [...this.state.toolBarColors];
      newToolBarColors[this.state.lastToolBarColorId] = transferedColor;

      this.setState({
        selectedButton: id,
        selectedColorHex: colorHex,
        selectedColorRgb: colorRgb,
        toolBarColors: newToolBarColors
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
      // Determine whether any color is locked
      const nCount = this.state.userPalette.filter(item => item === "N").length;
      console.log(nCount);

      // If user has locked any color, send color data to API
      if (nCount < 5) {
        dataForApi.body = `{"input": ${JSON.stringify(
          this.state.userPalette
        )}, "model":"default" }`;
        // If no colors are selected/locked, send data without color data to API
      } else {
        dataForApi.body = `{ "model":"default"}`;
      }
      console.log(dataForApi.body);

      const response = await fetch(url, dataForApi);
      if (!response.ok) throw new Error("API is broken!");
      const data = await response.json();

      // Replace old color palette with a new one
      this.setState({
        toolBarColors: [
          {
            id: 0,
            colorHex: rgbToHex(data.result[0]),
            colorRgb: data.result[0].join(", ")
          },
          {
            id: 1,
            colorHex: rgbToHex(data.result[1]),
            colorRgb: data.result[1].join(", ")
          },
          {
            id: 2,
            colorHex: rgbToHex(data.result[2]),
            colorRgb: data.result[2].join(", ")
          },
          {
            id: 3,
            colorHex: rgbToHex(data.result[3]),
            colorRgb: data.result[3].join(", ")
          },
          {
            id: 4,
            colorHex: rgbToHex(data.result[4]),
            colorRgb: data.result[4].join(", ")
          }
        ]
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    // Assign generated colors to CSS variables
    const colorVar = {
      "--color0": this.state.toolBarColors[0].colorHex,
      "--color1": this.state.toolBarColors[1].colorHex,
      "--color2": this.state.toolBarColors[2].colorHex,
      "--color3": this.state.toolBarColors[3].colorHex,
      "--color4": this.state.toolBarColors[4].colorHex
    };

    return (
      <div id="app" style={colorVar}>
        <NavBar bgColor={this.state.toolBarColors[4].colorRgb} />
        <ShowCase bgColor={this.state.toolBarColors[1].colorRgb} buttonColor={this.state.toolBarColors[2].colorRgb} />
        <CardsContainer colorRgb={this.state.toolBarColors[4].colorRgb} />
        <ColorPicker
          colors={this.state.paletteColors}
          onClick={this.handleClick}
          isClicked={this.state.isColorClicked}
          selectedButton={this.state.selectedButton}
          selectedColorHex={this.state.selectedColorHex}
          selectedColorRgb={this.state.selectedColorRgb}
        />
        <ToolBar
          colors={this.state.toolBarColors}
          onLock={this.handleLock}
          onClick={this.handleClick}
          onGenerate={this.handleGenerate}
          lockStatus={this.state.lockStatus}
          selectedButton={this.state.selectedButton}
        />
      </div>
    );
  }
}

export default App;
