////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Make `withMouse` a "higher-order component" that sends the mouse position
//   to the component as props (hint: use `event.clientX` and `event.clientY`).
//
// Got extra time?
//
// - Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";


function withCat(Component) {

    return class extends React.Component {

        state = {
          };

        render() {
            let style = {left: (this.props.mouse.x - 100), top: (this.props.mouse.y - 100)};
            return <div className="cat" style={style}>
                <Component {...this.props}/>
            </div>
        }
    };
}

function withMouse(Component) {

    return class extends React.Component {
    state = {
      x: 0, y: 0
    };

    handleMouseMove(event) {
      this.setState({
          x: event.clientX,
          y: event.clientY
      })
    }

    render() {
        return <div onMouseMove={(event) => this.handleMouseMove(event)}>
            <Component {...this.props} mouse={this.state} />
        </div>
    }
  };
}

class App extends React.Component {
    static propTypes = {
        mouse: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        })
    };


  render() {

    return (
        <div>
          <div className="container">
            {/*{this.props.mouse ? (*/}
              {/*<h1>*/}
                {/*The mouse position is ({this.props.mouse.x}, {this.props.mouse.y})*/}
              {/*</h1>*/}
            {/*) : (*/}
              {/*<h1>We don't know the mouse position yet :(</h1>*/}
            {/*)}*/}
          </div>

        </div>
    );
  }
}

const AppWithMouse = withMouse(withCat(App));

ReactDOM.render(<AppWithMouse />, document.getElementById("app"));
