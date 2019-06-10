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
      selectedColorHex: "",
      selectedColorRgb: "",
      isColorClicked: false
    };
  }
  // TODO: logic to change form value after new colors are generated while form is visible
  handleClick = e => {
    const color = window
      .getComputedStyle(e.target)
      .getPropertyValue("background-color");
    const rgbArr = processRgb(color);
    if (rgbArr.join(", ") === this.state.selectedColorRgb) {
      this.setState({
        isColorClicked: !this.state.isColorClicked
      });
    } else if (!this.state.isColorClicked) {
      this.setState({
        selectedColorHex: rgbToHex(rgbArr),
        selectedColorRgb: rgbArr.join(", "),
        isColorClicked: !this.state.isColorClicked
      });
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
        <NavBar />
        <ShowCase />
        <CardsContainer />
        <Tooltip
          colorClickedHex={this.state.selectedColorHex}
          colorClickedRgb={this.state.selectedColorRgb}
          onChange={this.state.handleChange}
          isClicked={this.state.isColorClicked}
        />
        <Toolbar onClick={this.handleClick} onGenerate={this.handleGenerate} />
      </div>
    );
  }
}

const Toolbar = ({ onClick, onGenerate }) => {
  return (
    <div className="toolBar">
      <button className="colorButton" onClick={onClick} />
      <button className="colorButton" onClick={onClick} />
      <button className="colorButton" onClick={onClick} />
      <button className="colorButton" onClick={onClick} />
      <button className="colorButton" onClick={onClick} />
      <GenerateButton onGenerate={onGenerate} />
    </div>
  );
};

const GenerateButton = ({ onGenerate }) => {
  return (
    <button className="generateButton" onClick={onGenerate}>
      KAALER!
    </button>
  );
};

const Tooltip = ({ colorClickedHex, colorClickedRgb, isClicked }) => {
  return (
    <div className={isClicked ? "toolTip visible" : "toolTip hidden"}>
      <label className="toolTipText">Hex</label>
      <input
        type="text"
        name="hexInput"
        className="toolTipInput"
        value={colorClickedHex}
      />
      <label className="toolTipText">RGB</label>
      <input type="text" className="toolTipInput" value={colorClickedRgb} />
    </div>
  );
};

const NavBar = () => {
  return (
    <div className="navBar">
      <a href="#0">HOME</a>
      <a href="#0">ABOUT</a>
      <a href="#0">BLOG</a>
      <a href="#0">WORK</a>
      <a href="#0">CONTACT</a>
    </div>
  );
};

const ShowCase = () => {
  return(
    <div className="showCase">
      <div className="showCaseText">
        <h1>
          HELPING OUR CLIENTS ACHIEVE SUCCESS
        </h1>
        <p>
          We make high-level design affordable for everyone
        </p>
        <div className='showCaseButtons'>
          <Button className="button hiEmphasis" text="Get Started" link="#0" />
          <Button className="button midEmphasis" text="Contact Us" link="#0" />
        </div>
      </div>
    </div>
  )
}

const Button = ({ className, text, link }) => {
  return (
      <a href={link} className={className}>{text}</a>
  )
}

const CardsContainer = () => {
  return (
    <div className="cardsContainer">
      <h2>What we offer</h2>
      <div className='card'>
        <i id='iconBranding' className='icon'></i>
        <h2>Branding</h2>
      </div>
      <div className='card'>
        <i id='iconWebDesign' className='icon'></i>
        <h2>Web Design</h2>
      </div>
      <div className='card'>
        <i id='iconUxUi' className='icon'></i>
        <h2>UX/UI</h2>
      </div>
      <div className='card'>
        <i id='iconSEO' className='icon'></i>
        <h2>SEO</h2>
      </div>
      <div className='card'>
        <i id='iconPhotography' className='icon'></i>
        <h2>Photography</h2>
      </div>
      <div className='card'>
        <i id='iconMotion' className='icon'></i>
        <h2>Motion</h2>
      </div>
    </div>
  )
}

export default App;
