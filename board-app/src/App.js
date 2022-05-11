//  의존하는 패키지등을 정의한 곳이다. react-router-dom과 최상위 컴포넌트등을 정의.
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

// App()함수에 최상위 컴포넌트들을 정의함.
function App() {
  return (
    <div>
      <HeaderComponent/>
      <div className="container">
      <BrowserRouter>
          <Routes>
            <Route path = "/" exact element = {<ListBoardComponent/>}></Route>
            <Route path = "/board" element = {<ListBoardComponent/>}></Route>
          </Routes>
      </BrowserRouter>
      </div>
      <FooterComponent/>
    </div>
  );
}

export default App;
