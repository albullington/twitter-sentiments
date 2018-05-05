import React from 'react';
import Search from './Search.jsx';
import SentimentStats from './SentimentStats.jsx';
import Stream from './Stream.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      tweetIds: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({query: e.target.value});
    this.getQuery(e.target.value);
  }

  getQuery(query) {
    axios.get(`http://localhost:3000/tweets/${query}`)
      .then((res) => {
        this.setState({tweetIds: res.data});
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Welcome to Twitter Analytics</h1>
        <Search
          query={this.state.query}
          onChange={(e) => this.handleChange(e)} 
        />
        <SentimentStats />
        <Stream tweetIds={this.state.tweetIds} />
      </div>
    );
  }
}

export default App;