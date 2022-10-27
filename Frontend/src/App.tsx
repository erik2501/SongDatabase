import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from './pages/RoutesComponent';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { RecoilRoot } from 'recoil';

function App() {
  
  const client = new ApolloClient({
    uri: 'http://localhost:3001/songs',
    cache: new InMemoryCache()
  });


  return (
    <div className="App">
      <BrowserRouter>
        <ApolloProvider client={client}>
          <RecoilRoot>
            <RoutesComponent/>
          </RecoilRoot>
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
