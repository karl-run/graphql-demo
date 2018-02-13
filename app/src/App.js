import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import AnsattListe from './AnsattListe';
import AnsattListeMedLønn from './AnsattListeMedLønn';
import NyAnsatt from './NyAnsatt';

import './App.css';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache(),
});

class App extends Component {
  state = {
    medLønn: false,
  };

  toggleMedLønn = () => {
    this.setState({ medLønn: !this.state.medLønn });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Mitt ansattsystem</h1>
            <button onClick={this.toggleMedLønn}>
              Vis {this.state.medLønn ? 'uten' : 'med'} lønn
            </button>
          </header>
          <h3>Mine ansatte:</h3>
          {!this.state.medLønn && <AnsattListe />}
          {this.state.medLønn && <AnsattListeMedLønn />}
          <NyAnsatt />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
