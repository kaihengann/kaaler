import React from "react";
import "../styles/App.css";

// const data = {
//   result: [
//     [214, 78, 69],
//     [247, 242, 163],
//     [201, 216, 147],
//     [57, 141, 112],
//     [62, 80, 64]
//   ]
// };
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      color: "#e15426"
    };
  }

  handleClick = () => {
    this.setState({ color: "#2b8f9b" });
  };
  handleClick2 = () => {
    this.setState({ color: "#1c1f2a" });
  };

  componentDidMount = async () => {
    try {
      const url = "http://colormind.io/api/";
      const inputData = {
        body:
          '{ "input":[[44,43,44],[90,83,82],"N","N","N"],"model":"default"}',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      };
      const response = await fetch(url, inputData);
      if (!response.ok) throw new Error("API is broken!"); // Can also use response.status >= 400
      const data = await response.json();
      this.setState({ data: data });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div id="app" style={{ "--color-page-bg": `${this.state.color}` }}>
        <button className="generateColor" onClick={this.handleClick}>
          1
        </button>
        <button className="generateColor" onClick={this.handleClick2}>
          2
        </button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
      </div>
    );
  }
}
export default App;
