import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import BoardService from '../service/BoardService';

function ListBoardComponent(props) {
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);
    
    // 리액트의 생명주기 메소드인 'componentDidMount'에서 'BoardService'의 메소드를 호출해서 데이터를 가져온다.
    // ★this.state에 선언한 변수의 값을 변경하기 위해선 setState를 사용해야함.
    useEffect (() => {
        BoardService.getBoards().then((res) => {
            setBoards(res.data);
        });
    });

    // 글 작성 버튼을 클릭시 글작성 페이지로 이동하게 해주는 함수를 정의
    function createBoard() {
        navigate('/create-board');
    }

    // 글 제목을 클릭 했을 때 글 상세보기 페이지로 이동하게 해주는 함수를 정의
    function readBoard(no) {
        navigate(`/read-board/${no}`);
    }

    //  render() 함수의 내용이 실제 웹페이지에 표시된다. 
    // maps() 함수를 사용해서 'boards'의 데이터를 출력한다.
    return (
        <div>
            <h2 className="text-center">Boards List</h2>
            
            <div className ="row">
                <a onClick={()=>createBoard()} className="btn btn-primary">글 작성</a>
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
        </div>
    );
}

export default ListBoardComponent;