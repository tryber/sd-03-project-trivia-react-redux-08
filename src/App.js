import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Feedback,
  Game,
  Home,
  NotFound,
  Ranking,
} from './pages';
import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/feedback" component={Feedback} />
        <Route exact path="/ranking" component={Ranking} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
