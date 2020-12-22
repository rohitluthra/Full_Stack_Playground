import React, { Component } from 'react';
import './App.css';


const list = [ {
  title: 'React',
  url: 'https://reactjs.org/', author: 'Jordan Walke', num_comments: 3,
  points: 4,
  objectID: 0,
}, {
  title: 'Redux',
  url: 'https://redux.js.org/', author: 'Dan Abramov, Andrew Clark', num_comments: 2,
  points: 5,
  objectID: 1,
}];

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Hello I am Luthra</h1>
        {list.map(function(item)
        {
          return <div key = {item.objectId}>
          <span><a href={item.url}></a></span>
            <span>{item.author}</span>
            <span>{item.new_comments}</span>
            <span>{item.points}</span>

          </div>;
        })}
      </div>
    );
    // first is element and can be component too, last is children going in div.
    // {} is is javascript object
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null ,'Hi, I am rohit'));


  }
}

export default App;
