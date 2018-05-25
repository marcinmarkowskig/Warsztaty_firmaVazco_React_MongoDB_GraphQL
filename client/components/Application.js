import ApolloClient from 'apollo-boost';
import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Link, Redirect, Route, Switch} from 'react-router-dom';

import Example from './Example';
import Component from './component';
import Products from './Products';
import Products2 from './Products2';

const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

export default function Application() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.Fragment>
          <div className="ui inverted menu">
            <div className="ui container">
              <Link className="header item" to="/">
                Warsztaty
              </Link>
              <Link className="item" to="/example">
                Przykład
              </Link>
            </div>

            <div className="item">
              GraphQL + MongoDB + React
            </div>
          </div>

          <Switch>
            <Route path="/example/:input" component={Example} />
            <Route path="/warsztaty/:input" component={Component} />
            <Route path="/warsztaty2/:input" component={Products} />
            <Route path="/warsztaty3/:input" component={Products2} />
            <Route exact path="/example" render={() => <Redirect to="/example/42" />} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </ApolloProvider>
  )
}
