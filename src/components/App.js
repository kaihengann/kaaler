import React from "react";
import "../styles/App.css";

const rgbToHex = rgb => {
  return (
    "#" +
    ("0" + parseInt(rgb[0]).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[1]).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2]).toString(16)).slice(-2)
  );
};

const processRgb = rgb => {
  if (rgb.includes("a")) {
    const arr = rgb.slice(5, -1).split(", ");
    arr.pop();
    return arr;
  }
  return rgb.slice(4, -1).split(", ");
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorDarkShades: "#e8e9d4",
      colorDarkAccent: "#f7dbbc",
      colorMain: "#e2a097",
      colorLightAccent: "#41202e",
      colorLightShades: "#22223d",
      selectedColor: ""
    };
  }

  handleCopy = e => {
    const color = window
      .getComputedStyle(e.target)
      .getPropertyValue("background-color");
    const rgbArr = processRgb(color);
    this.setState({ selectedColor: rgbToHex(rgbArr) });
  };

  // TODO: add proxy to remove unsafe script warning?
  handleGenerate = async () => {
    try {
      const url = "http://colormind.io/api/";
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
      this.setState({
        colorDarkShades: rgbToHex(data.result[0]),
        colorDarkAccent: rgbToHex(data.result[1]),
        colorMain: rgbToHex(data.result[2]),
        colorLightAccent: rgbToHex(data.result[3]),
        colorLightShades: rgbToHex(data.result[4])
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const appStyle = {
      "--colorDarkShades": `${this.state.colorDarkShades}`,
      "--colorDarkAccent": `${this.state.colorDarkAccent}`,
      "--colorMain": `${this.state.colorMain}`,
      "--colorLightAccent": `${this.state.colorLightAccent}`,
      "--colorLightShades": `${this.state.colorLightShades}`
    };

    return (
      <div id="app" style={appStyle}>
        <button className="generateColor" onClick={this.handleGenerate}>
          G
        </button>
        <Toolbar onClick={this.handleCopy} />
        <span>{this.state.selectedColor}</span>
      </div>
    );
  }
}

const Toolbar = ({ onClick }) => {
  return (
    <div className="toolBar">
      <button onClick={onClick} />
      <button onClick={onClick} />
      <button onClick={onClick} />
      <button onClick={onClick} />
      <button onClick={onClick} />
    </div>
  )
}


export default App;
