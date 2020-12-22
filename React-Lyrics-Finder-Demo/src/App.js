import React from "react";
import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
/* Why in {}, bcz provuder is not a default export. */
import { Provider } from "./Context";
import Lyrics from "./components/tracks/Lyrics";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index}></Route>
                <Route
                  exact
                  path="/lyrics/track/:id"
                  component={Lyrics}
                ></Route>
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
