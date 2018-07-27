////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Modify <ListView> so that it only renders the list items that are visible!
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (hint: Listen
//   for the window's "resize" event)
// - Remember the scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as RainbowListDelegate from "./RainbowListDelegate";

class ListView extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  };

  state = {
      scrollTop: 0
  };

  handleOnScroll = (event) => {
    this.setState({scrollTop: event.target.scrollTop, viewableHeight: this.scroller.clientHeight})
  };

  componentDidMount() {
    this.setState({viewableHeight: this.scroller.clientHeight});
  };

  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props;
    const {scrollTop, viewableHeight} = this.state;
    const totalHeight = numRows * rowHeight;

    const items = [];

    let startIndex = Math.floor(scrollTop/rowHeight);
    let viewableRows = Math.ceil(viewableHeight/rowHeight);
    let paddingTop = startIndex * rowHeight;
    let index = startIndex;
    let endIndex = Math.min(numRows, startIndex + viewableRows);
    while (index < endIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>);
      index++;
    }

    return (

      <div onScroll={this.handleOnScroll} style={{ height: "100vh", overflowY: "scroll" }}
            ref={(node) => this.scroller = node}>
        <div style={{ height: totalHeight, paddingTop: paddingTop}}>
          <ol>{items}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ListView
    numRows={20000}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById("app")
);
