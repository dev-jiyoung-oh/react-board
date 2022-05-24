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
        });
    });

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
                        <button className="btn btn-primary" onClick={goToList} style={{marginLeft:"10px"}}>글 목록으로 이동</button>
                        <button className="btn btn-info" onClick={goToUpdate} style={{marginLeft:"10px"}}>글 수정</button>
                </div>
            </div>

        </div>
    );
}

export default ReadBoardComponent;