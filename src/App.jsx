import { purple, grey, orange } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages';
import Layout from './components/Layout'

const theme = createTheme({
  palette: {
    primary: orange,
    secondary: purple,
    background: {
      default: grey[900],
      contrastText: grey[100]
    }
  },
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
