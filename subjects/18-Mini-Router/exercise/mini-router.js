import React from "react";
import PropTypes from "prop-types";
import { createHashHistory } from "history";

/*
How to use the history library:

// read the current URL
history.location

// listen for changes to the URL
history.listen(() => {
  history.location // is now different
})

// change the URL
history.push('/something')
*/

const RouterContext = React.createContext();

class Router extends React.Component {
  history = createHashHistory();

  state = {location: this.history.location};

  handleOnClick = (to) => {
      this.history.push(to);
      this.setState({location: this.history.location});
  };

  render() {
    return <RouterContext.Provider {...this.props} value={{
        _onClick: this.handleOnClick,
        location: this.state.location,
    }}>
       {this.props.children}
    </RouterContext.Provider>
  }
}

class Route extends React.Component {
    render(){
        const {path, render, component: Component} = this.props;
        console.log(path);
        return <RouterContext.Consumer>
            {router => {
                if (router.location.pathname.startsWith(path)) {
                    if (render) {
                        return render();
                    }
                    if (Component) {
                        return <Component/>;
                    }
                }
                return null;
            }}
        </RouterContext.Consumer>
    };
}

class Link extends React.Component {
    handleOnClick = (event, router) => {
        event.preventDefault();
        router._onClick(this.props.to);
    };

    render() {
        const {children, to} = this.props;
        return (
            <RouterContext.Consumer>
                {router =>  <a href={`#${to}`} onClick={(event) => this.handleOnClick(event, router)}>
                    {children}
                </a>}
            </RouterContext.Consumer>
        );
    }

}

export { Router, Route, Link };
