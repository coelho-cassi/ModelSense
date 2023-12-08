import { LandingPage, AboutPage, HelpPage, VisualizationPage } from "./pages";
import {BrowserRouter as Router, Routes , Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/help' element={<HelpPage />} />
            <Route path='/visualization' element={<VisualizationPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;