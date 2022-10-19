import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from './pages/RoutesComponent';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

function App() {
  
  const client = new ApolloClient({
    uri: 'http://localhost:3001/songs',
    cache: new InMemoryCache()
  });


  return (
    <div className="App">
      <BrowserRouter>
        <ApolloProvider client={client}>
          <RoutesComponent/>
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
