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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorDarkShades: "",
      colorDarkAccent: "",
      colorMain: "",
      colorLightAccent: "",
      colorLightShades: ""
    };
  }

  // Not sure if this should be async
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
    return (
      <div
        id="app"
        style={{
          "--colorDarkShades": `${this.state.colorDarkShades}`,
          "--colorDarkAccent": `${this.state.colorDarkAccent}`,
          "--colorMain": `${this.state.colorMain}`,
          "--colorLightAccent": `${this.state.colorLightAccent}`,
          "--colorLightShades": `${this.state.colorLightShades}`
        }}
      >
        <button className="generateColor" onClick={this.handleGenerate}>
          Generate
        </button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
      </div>
    );
  }
}
export default App;
