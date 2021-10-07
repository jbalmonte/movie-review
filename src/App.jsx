import grey from '@mui/material/colors/grey';
import orange from '@mui/material/colors/orange';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Category, SingleMovie, Page404, SearchResult } from './pages';
import Layout from './components/Layout'
import SearchProvider from './context/SearchProvider'
import categories from './constant/categories';

const theme = createTheme({
  palette: {
    primary: orange,
    secondary: grey,
    background: {
      default: grey[800],
      contrastText: grey['A100']
    }
  },
})

const categoryEnum = categories.map(c => c.path).join`|`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SearchProvider>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/:id(tt\d+)" component={SingleMovie} />
              <Route exact path={`/:category(${categoryEnum})`} component={Category} />
              <Route exact path="/search" component={SearchResult} />
              <Route path="*" component={Page404} />
            </Switch>
          </Layout>
        </SearchProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
