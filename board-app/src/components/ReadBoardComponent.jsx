import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import BoardService from '../service/BoardService';

function ReadBoardComponent (props) {
    const navigate = useNavigate();
    const params = useParams();
    const [board, setBoard] = useState({});

    useEffect (() => {
        BoardService.getOneBoard(params.no).then( res => {
            setBoard(res.data);
            // TODO 조회수 증가
        });
    }, []);

    function returnBoardType(typeNo) {
        let type = null;
        if (typeNo === 1) {
            type = "자유게시판";

        } else if (typeNo === 2 ) {
            type = "질문과 답변 게시판";

        } else {
            type = "타입 미지정";
        }

        return (
            <div className = "row">
                <label> Board Type : {type}</label> 
            </div>
        )

    }

    function returnDate(cTime, uTime) {
        return (
            <div className = "row">
                <label>생성일 : [ {cTime} ] / 최종 수정일 : [ {uTime} ] </label>
            </div>
        )
    }

    function goToList() {
        navigate('/board');
    }

    function goToUpdate() {
        navigate('/create-board/' + params.no);
    }

    async function deleteView() {
        if (window.confirm("정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다.")) {
            BoardService.deleteBoard(params.no).then( res => {
                console.log("delete result => "+ JSON.stringify(res));
                if (res.status === 200) {
                    navigate('/board');
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
            });

        }
    }

    return (
        <div>
            <div className = "card col-md-6 offset-md-3">
                <h3 className ="text-center"> Read Detail</h3>
                <div className = "card-body">
                        {returnBoardType(board.type)} 
                        <div className = "row">   
                            <label> Title : {board.title}</label>
                        </div>

                        <div className = "row">
                            <label> Contents : </label><br></br>
                            <textarea value={board.contents} readOnly/> 
                        </div >

                        <div className = "row">
                            <label> MemberNo : {board.memberNo}</label>
                        </div>

                        {returnDate(board.createdTime, board.updatedTime) }
                        <button className="btn btn-primary" onClick={goToList} style={{marginLeft:"10px"}}>글 목록</button>
                        <button className="btn btn-info" onClick={goToUpdate} style={{marginLeft:"10px"}}>글 수정</button>
                        <button className="btn btn-danger" onClick={deleteView} style={{marginLeft:"10px"}}>글 삭제</button>
                </div>
            </div>

        </div>
    );
}

export default ReadBoardComponent;