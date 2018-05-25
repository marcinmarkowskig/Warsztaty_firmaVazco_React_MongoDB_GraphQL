import React from 'react';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';
import {Query} from 'react-apollo';

const ExampleQuery = gql`
  query($country: String) {
    users(country: $country) {
      _id
      name
      origin
      price

    }
  }
`;

function ExampleRenderer({data, error, loading}) {
  if (error) {
    return (
      <div className="ui negative icon message">
        <i className="exclamation icon" />
        <div className="header">
          An error occurred :(
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="ui active loader" />
    );
  }

  return (
    <div className="ui large relaxed divided list container">
      {data.users.map(example =>
        <div className="item" key={example._id}>
          <div className="header">
            PRODUCTS:&nbsp;
            {/* <Link to={`/example/${example.time}`}>
              {example.answer}
            </Link> */}
          </div>
          <br></br>
          <div className="content">
            {/* <b>Username:</b> {example.username} */}
            <b>Name:</b> {example.name}
            <br></br>
            {/* <b>Avatar:</b> <img src={example.avatar} /> */}
            <b>Origin:</b> {example.origin}
            <br></br>
            {/* <b>Birthdate:</b> {example.birthdate} */}
            <b>Price:</b> {example.price}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Products2({match: {params: {input}}}) {
  return (
    <Query query={ExampleQuery} variables={{input}}>
    {/* <Query query={ExampleQuery} variables={{input}}> */}
      {ExampleRenderer}
    </Query>
  );
}
