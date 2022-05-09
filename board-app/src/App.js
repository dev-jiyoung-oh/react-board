//  의존하는 패키지등을 정의한 곳이다. react-router-dom과 최상위 컴포넌트등을 정의.
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

// App()함수에 최상위 컴포넌트들을 정의함.
function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
        <div className="container">
          <Switch>
            <Route path = "/" exact component = {ListBoardComponent}></Route>
            <Route path = "/board" component = {ListBoardComponent}></Route>
          </Switch>
        </div>
        <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;
