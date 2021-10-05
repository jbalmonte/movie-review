import grey from '@mui/material/colors/grey';
import orange from '@mui/material/colors/orange';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Category, SingleMovie } from './pages';
import Layout from './components/Layout'

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:id(tt\d+)" component={SingleMovie} />
            <Route exact path="/:category(\w+\D)" component={Category} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
