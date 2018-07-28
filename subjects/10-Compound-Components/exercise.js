////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement a radio group form control with the API found in <App>.
//
// - Clicking a <RadioOption> should update the value of <RadioGroup>
// - The selected <RadioOption> should pass the correct value to its <RadioIcon>
// - The `defaultValue` should be set on first render
//
// Got extra time?
//
// - Implement an `onChange` prop that communicates the <RadioGroup>'s state
//   back to the <App> so it can use it to render something
// - Implement keyboard controls on the <RadioGroup>
//   - Hint: Use tabIndex="0" on the <RadioOption>s so the keyboard will work
//   - Enter and space bar should select the option
//   - Arrow right, arrow down should select the next option
//   - Arrow left, arrow up should select the previous option
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const radioOptions = {
    "am": {value: "am", label: "AM"},
    "fm": {value: "fm", label: "FM"},
    "tape": {value: "tape", label: "Tape"},
    "aux": {value: "aux", label: "Aux"},
};

class RadioGroup extends React.Component {
  state = { activeIndex: 1 };

  handleSelect = (index) => {
      if (this.state.activeIndex !== index) {
          this.setState({activeIndex: index});
      }
  };

  render() {
      const children = React.Children.map(
          this.props.children,
          (child, index) => {
              console.log(this.state);
              if (child.type === RadioOption) {
                  console.log(index);
                  return React.cloneElement(child, {
                      _isSelected: (index === this.state.activeIndex),
                      _onRadioClick: () => this.handleSelect(index)
                  });
              } else {
                  return child;
              }
          });

          return <div>{children}</div>;

  }
}

class RadioOption extends React.Component {
    render() {
        const {children, _isSelected, _onRadioClick} = this.props;

        return <div onClick={_onRadioClick}>
            <RadioIcon _isSelected={_isSelected}/>
            {children}
            </div>;
    }
}

class RadioIcon extends React.Component {
    render() {
        const {_isSelected} = this.props;
        console.log(_isSelected);

        return (
            <div
                style={{
                    borderColor: "#ccc",
                    borderWidth: 3,
                    borderStyle: _isSelected ? "inset" : "outset",
                    height: 16,
                    width: 16,
                    display: "inline-block",
                    cursor: "pointer",
                    marginRight: "7px",
                    background: _isSelected ? "rgba(0, 0, 0, 0.05)" : ""
                }}
            />
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>♬ It's about time that we all turned off the radio ♫</h1>

                <RadioGroup defaultValue="fm">
                    <RadioOption value="am">AM</RadioOption>
                    <RadioOption value="fm">FM</RadioOption>
                    <RadioOption value="tape">Tape</RadioOption>
                    <RadioOption value="aux">Aux</RadioOption>
                </RadioGroup>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById("app"));
