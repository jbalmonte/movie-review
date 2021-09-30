import grey from '@mui/material/colors/grey';
import orange from '@mui/material/colors/orange';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Category } from './pages';
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
            <Route path="/:category" component={Category} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
