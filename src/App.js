import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { Switch, Route } from 'react-router-dom'

import NavBar from './components/common/NavBar'
import Footer from './components/common/Footer'
import HomePage from './components/pages/HomePage'
import CreatedPage from './components/pages/CreatedPage'
import LikedPage from './components/pages/LikedPage'
import SavedPage from './components/pages/SavedPage'
import Auth from './components/auth/Auth.js'

import './css/app.css'

function App() {
    // HTTP Link for Apollo Client
    const httpLink = createHttpLink({
      uri: 'http://localhost:5000/graphql',
    });
    
    // Headers for Apollo client (it's necessary for token validation)
    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      // const token = userData.token;
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          // Here we define our token
          // Authorization: token ? `Bearer ${token}` : "",
        }
      }
    });
    
    // And create new Apollo Client to work with GraphQl 
    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });
  return (
    <ApolloProvider client={client}>
      <NavBar />
      <Switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/created' exact component={CreatedPage}/>
        <Route path='/liked' exact component={LikedPage}/>
        <Route path='/saved' exact component={SavedPage}/>
        <Route path='/auth' exact component={Auth} />
      </Switch>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
