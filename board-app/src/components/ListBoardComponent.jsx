import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import BoardService from '../service/BoardService';

function ListBoardComponent(props) {
    const navigate = useNavigate();
    const pageNumCountPerPage = 5; // 한 화면에 출력할 페이지 번호 수
    const [boards, setBoards] = useState([]);
    const [pNum, setPNum] = useState(0);
    const [paging, setPaging] = useState({});
    
    // 리액트의 생명주기 메소드인 'componentDidMount'에서 'BoardService'의 메소드를 호출해서 데이터를 가져온다.
    // ★this.state에 선언한 변수의 값을 변경하기 위해선 setState를 사용해야함.
    useEffect (() => {
        BoardService.getBoards(pNum).then((res) => {
            console.log(res.data);
 
            var currentPageNum = res.data.number;
            var total = res.data.totalPages;
            var startAndEndNum = setCalcForPaging(currentPageNum, total);

            setPNum(currentPageNum+1);
            setPaging({
                total : total,
                size : res.data.size,
                prev : !res.data.first,
                next : !res.data.last,
                pageNumStart : startAndEndNum.start,
                pageNumEnd : startAndEndNum.end
            });
            setBoards(res.data.content);
        });
    }, []);

    // 글 작성 버튼을 클릭시 글작성 페이지로 이동하게 해주는 함수를 정의
    function createBoard() {
        navigate('/create-board/_create');
    }

    // 글 제목을 클릭 했을 때 글 상세보기 페이지로 이동하게 해주는 함수를 정의
    function readBoard(no) {
        navigate(`/read-board/${no}`);
    }

    // 리스트 페이징 처리
    function listBoard(pNum) {
        console.log('pNum: '+pNum);
        BoardService.getBoards(pNum).then((res) => {
            console.log(res.data);
 
            var currentPageNum = res.data.number;
            var total = res.data.totalPages;
            var startAndEndNum = setCalcForPaging(currentPageNum, total);

            setPNum(currentPageNum);
            setPaging({
                total : total,
                size : res.data.size,
                prev : !res.data.first,
                next : !res.data.last,
                pageNumStart : startAndEndNum.start,
                pageNumEnd : startAndEndNum.end
            });
            setBoards(res.data.content);
        });
    }

    function setCalcForPaging(currentPageNum, pageNumCountTotal) {
        var tmpPageNumStart = (Math.ceil(currentPageNum+1 / pageNumCountPerPage) * pageNumCountPerPage);
        var tmpPageNumEnd = 0;
        var pageNumStart = 0;
        var pageNumEnd = 0;
                
        if (tmpPageNumStart == 0) {
            pageNumStart = 1;
            tmpPageNumEnd = tmpPageNumStart + pageNumCountPerPage;		
        } else if (tmpPageNumStart == currentPageNum) {
            pageNumStart = tmpPageNumStart - (pageNumCountPerPage - 1);
            tmpPageNumEnd = currentPageNum;
        } else {
            pageNumStart = tmpPageNumStart + 1;
            tmpPageNumEnd = pageNumStart + pageNumCountPerPage;
        }
        pageNumEnd = (pageNumCountTotal < tmpPageNumEnd) ? pageNumCountTotal : tmpPageNumEnd;
        
        return {
            start: pageNumStart,
            end: pageNumEnd
        };
    }

    function viewPaging() {
        const pageNums = [];

        for (let i = paging.pageNumStart; i <= paging.pageNumEnd; i++ ) {
            pageNums.push(i);
        }

        return (pageNums.map((page) => {
            console.log(page, pNum)
            if (page === pNum+1) {
                return (
                    <li className="page-item" key={page.toString()} >
                        <a className="page-link btn btn-primary" onClick = {() => this.listBoard(page-1)}>{page}</a>
                    </li>
                );
            } else {
                return (
                    <li className="page-item" key={page.toString()} >
                        <a className="page-link" onClick = {() => this.listBoard(page-1)}>{page}</a>
                    </li>
                );
            }
        }));
        
    }

    function isPagingPrev(){
        if (paging.prev) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => listBoard( (pNum - 1) )} tabIndex="-1">Previous</a>
                </li>
            );
        }
    }

    function isPagingNext(){
        if (paging.next) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => listBoard( (pNum + 1) )} tabIndex="-1">Next</a>
                </li>
            );
        }
    }

    function isMoveToFirstPage() {
        if (pNum != 0) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => listBoard(0)} tabIndex="-1">《</a>
                </li>
            );
        }
    }

    function isMoveToLastPage() {
        if (pNum != paging.total-1) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => listBoard( (paging.total-1) )} tabIndex="-1">》</a>
                </li>
            );
        }
    }

    //  render() 함수의 내용이 실제 웹페이지에 표시된다. 
    // maps() 함수를 사용해서 'boards'의 데이터를 출력한다.
    return (
        <div>
            <h2 className="text-center">Boards List</h2>
            
            <div className ="row">
                <button onClick={()=>createBoard()} className="btn btn-primary">글 작성</button>
            </div>

            <div className ="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>글 번호</th>
                            <th>타이틀 </th>
                            <th>작성자 </th>
                            <th>작성일 </th>
                            <th>갱신일 </th>
                            <th>좋아요수</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            boards.map(
                                board => 
                                <tr key ={board.no}>
                                    <td> {board.no} </td>
                                    <td onClick={()=>readBoard(board.no)}> {board.title} </td>
                                    <td> {board.memberNo} </td>
                                    <td> {board.createdTime} </td>
                                    <td> {board.updatedTime ? board.updatedTime : "-"} </td>
                                    <td> {board.likes} </td>
                                    <td> {board.counts} </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className ="row">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            {isPagingPrev()}
                            {viewPaging()}
                            {isPagingNext()}
                        </ul>
                    </nav>
                </div>
        </div>
    );
}

export default ListBoardComponent;