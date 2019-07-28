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
  userPaletteDefault,
  mockUIDefault
} from "../defaultStates";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.mockUI = mockUIDefault;
    this.state = {
      selectedButton: null,
      selectedColorHex: "",
      selectedColorRgb: "",
      isLoading: false,
      isColorClicked: false,
      lastToolBarColorId: null,
      lockStatus: lockStatusDefault,
      userPalette: userPaletteDefault,
      toolBarColors: toolBarColorsDefault,
      paletteColors: paletteColorsDefault
    };
  }

  handleClick = (id, colorHex, colorRgb) => {
    if (!this.state.isColorClicked) {
      this.setState({
        selectedButton: id,
        selectedColorHex: colorHex,
        selectedColorRgb: colorRgb,
        lastToolBarColorId: id,
        isColorClicked: !this.state.isColorClicked
      });

    } else if (colorHex === this.state.selectedColorHex) {
      this.setState({
        selectedButton: null,
        isColorClicked: !this.state.isColorClicked
      });
    } else if (id < 5) {
      this.setState({
        selectedButton: id,
        selectedColorHex: colorHex,
        selectedColorRgb: colorRgb,
        lastToolBarColorId: id
      });
    } else if (id > 10) {
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

  handleClickOutside = e => {
    if (!this.mockUI.includes(e.target.className)) {
      this.setState({
        isColorClicked: false,
        selectedButton: null
      });
    }
  };

  handleLock = (id, isLocked) => {
    const newLockStatus = [...this.state.lockStatus];
    const changeLock = { id, isLocked: !isLocked };
    newLockStatus[id] = changeLock;

    const indexToReplace = id;
    const newUserPalette = [...this.state.userPalette];

    if (!isLocked) {
      const colorToInsert = this.state.toolBarColors[id].colorRgb
        .split(", ")
        .map(number => parseInt(number, 10));
      newUserPalette.splice(indexToReplace, 1, colorToInsert);

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
      this.setState({ isLoading: true });
      const nCount = this.state.userPalette.filter(item => item === "N").length;
      if (nCount < 5) {
        dataForApi.body = `{"input": ${JSON.stringify(
          this.state.userPalette
        )}, "model":"default" }`;
      } else {
        dataForApi.body = `{ "model":"default"}`;
      }

      const fetchData = await fetch(url, dataForApi);
      if (!fetchData.ok) throw new Error("API is broken!");
      const data = await fetchData.json();

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
        ],
        isColorClicked: false,
        isLoading: false
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const colorVar = {
      "--color0": this.state.toolBarColors[0].colorHex,
      "--color1": this.state.toolBarColors[1].colorHex,
      "--color2": this.state.toolBarColors[2].colorHex,
      "--color3": this.state.toolBarColors[3].colorHex,
      "--color4": this.state.toolBarColors[4].colorHex
    };

    return (
      <div id="app" style={colorVar} onClick={this.handleClickOutside}>
        <NavBar bgColor={this.state.toolBarColors[4].colorRgb} />
        <ShowCase buttonColor={this.state.toolBarColors[3].colorRgb} />
        <CardsContainer />
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
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default App;
