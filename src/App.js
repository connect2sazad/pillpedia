import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import { Search } from './components/search.component';
import { Results } from './components/results.component';
import { Pill } from './components/pill.component';
import { AdminLogin } from './components/admin-login.component';
import { Dashboard } from './components/admin.component';

import { Footer } from './components/footer.component';
import { URLNotFound } from './components/url-not-found.component';

function App() {
  return (
    <div>
      {/* <Header /> */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Search />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/find/:find">
            <Results />
          </Route>
          <Route path="/find">
            <Search />
          </Route>
          <Route path="/admin">
            <Dashboard />
          </Route>
          <Route path="/admin-login">
            <AdminLogin />
          </Route>
          <Route path="/login">
            <AdminLogin />
          </Route>
          <Route path="/pill/:pillinfo">
            <Pill />
          </Route>
          <Route path="*">
            <URLNotFound />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
