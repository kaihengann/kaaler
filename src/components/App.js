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

const partialLuminance = arr => {
  const newArr = arr.map(value => {
    const colorSRGB = value / 255;
    if (colorSRGB <= 0.03928) {
      return colorSRGB / 12.92;
    } else {
      return ((colorSRGB + 0.055) / 1.055) ** 2.4;
    }
  });
  return newArr;
};

const relativeLuminance = arr => {
  return 0.2126 * arr[0] + 0.7152 * arr[1] + 0.0722 * arr[2];
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
      // TODO: Rank colors acc to relative luminance
      console.log(data.result[0]); // returns [23,23,23]
      
      const lumArr = data.result.map((arr)=> relativeLuminance(partialLuminance(arr)));

      const colorInfo =[
        { [lumArr[0]]: rgbToHex(data.result[0])},
        {
          [lumArr[1]]: rgbToHex(data.result[1])
        },
        {
          [lumArr[2]]: rgbToHex(data.result[2])
        },
        {
          [lumArr[3]]: rgbToHex(data.result[3])
        },
        {
          [lumArr[4]]: rgbToHex(data.result[4])
        }
      ]
      
      // get luminance of each color
      // get arr of object keys
      // arr.sort((a, b) => a-b);
      // for each key, set new object [key] = old object [key]
      

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
  return (
    <div className="showCase">
      <div className="showCaseText">
        <h1>HELPING OUR CLIENTS ACHIEVE SUCCESS</h1>
        <p>We make high-level design affordable for everyone</p>
        <div className="showCaseButtons">
          <Button className="button hiEmphasis" text="Get Started" link="#0" />
          <Button className="button midEmphasis" text="Contact Us" link="#0" />
        </div>
      </div>
    </div>
  );
};

const Button = ({ className, text, link }) => {
  return (
    <a href={link} className={className}>
      {text}
    </a>
  );
};

const CardsContainer = () => {
  return (
    <div className="cardsContainer">
      <h2>WHAT WE OFFER</h2>
      <div className="card">
        <i id="iconBranding" className="icon" />
        <h3>Branding</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ducimus
          magni{" "}
        </p>
      </div>
      <div className="card card1">
        <i id="iconWebDesign" className="icon" />
        <h3>Web Design</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ducimus
          magni{" "}
        </p>
      </div>
      <div className="card card2">
        <i id="iconUxUi" className="icon" />
        <h3>UX/UI</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ducimus
          magni{" "}
        </p>
      </div>
      <div className="card card3">
        <i id="iconSEO" className="icon" />
        <h3>SEO</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ducimus
          magni{" "}
        </p>
      </div>
      <div className="card card4">
        <i id="iconPhotography" className="icon" />
        <h3>Photography</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ducimus
          magni{" "}
        </p>
      </div>
      <div className="card card5">
        <i id="iconMotion" className="icon" />
        <h3>Motion</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ducimus
          magni{" "}
        </p>
      </div>
    </div>
  );
};

export default App;
