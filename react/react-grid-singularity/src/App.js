import Header from './containers/Header';
import CountryPopulation from './containers/CountryPopulation';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './redux/store'

function App() {
  return (
      <Provider store={store}>
          <Router>
              <Header/>
              <Switch>
                  <Route path="/" exact component={CountryPopulation} />
                  <Route>Not found</Route>
              </Switch>
          </Router>
      </Provider>
  );
}

export default App;
