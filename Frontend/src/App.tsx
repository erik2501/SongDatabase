import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3001/songs',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query GetSongs {
        song {
          songName
          artistName
        }
      }
    `,
  })
  .then((result) => console.log(result))
  .catch(err => console.log(err));

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
