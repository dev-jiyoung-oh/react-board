//  의존하는 패키지등을 정의한 곳이다. react-router-dom과 최상위 컴포넌트등을 정의.
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListBoardComponent from './components/ListBoardComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import ReadBoardComponent from './components/ReadBoardComponent';

// App()함수에 최상위 컴포넌트들을 정의함.
function App() {

  return (
    <div>
      <BrowserRouter>
        <HeaderComponent/>
        <div className="container">
              <Routes>
                <Route path = "/" element = {<ListBoardComponent/>}></Route>
                <Route path = "/board" element = {<ListBoardComponent/>}></Route>
                <Route path = "/create-board/:no" element = {<CreateBoardComponent/>}></Route>
                <Route path = "/read-board/:no" element = {<ReadBoardComponent/>}></Route>
              </Routes>
        </div>
        <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;
