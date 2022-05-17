import React, { useState } from 'react';
import BoardService from '../service/BoardService';
import {useNavigate} from 'react-router-dom';

function CreateBoardComponent(props) {

    const navigate = useNavigate();
    const [type, setType] = useState("1");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [memberNo, setMemberNo] = useState("");

    // 
    const changeTypeHandler = (event) => {
        setType(event.target.value);
    }
    const changeTitleHandler = (event) => {
        setTitle(event.target.value);
    }
    const changeContentsHandler = (event) => {
        setContents(event.target.value);
    }
    const changeMemberNoHandler = (event) => {
        setMemberNo(event.target.value);
    }

    // 
    const createBoard = (event) => {
        event.preventDefault();
        let board = {
            type: type,
            title: title,
            contents: contents,
            memberNo: memberNo
        };
        console.log("board => " + JSON.stringify(board));
        BoardService.createBoard(board).then(res => {
            navigate('/board');
        });
    }

    // 
    const cancel = () => {
        navigate('/board');
    }

    // 
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">새글을 작성해주세요</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Type </label>
                                    <select placeholder="type" name="type" className="form-control" onChange={changeTypeHandler} defaultValue="자유게시판">
                                        <option value="1">자유게시판</option>
                                        <option value="2">질문과 답변</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label> Title </label>
                                    <input type="text" placeholder="title" name="title" className="form-control"
                                        value={title} onChange={changeTitleHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Contents  </label>
                                    <textarea placeholder="contents" name="contents" className="form-control"
                                        value={contents} onChange={changeContentsHandler} />
                                </div>
                                <div className="form-group">
                                    <label> MemberNo  </label>
                                    <input placeholder="memberNo" name="memberNo" className="form-control"
                                        value={memberNo} onChange={changeMemberNoHandler} />
                                </div>
                                <button className="btn btn-success" onClick={createBoard}>Save</button>
                                <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}

export default CreateBoardComponent;