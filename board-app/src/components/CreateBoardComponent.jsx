import React, {useState, useEffect} from 'react';
import BoardService from '../service/BoardService';
import {useNavigate, useParams} from 'react-router-dom';

function CreateBoardComponent(props) {
    const navigate = useNavigate();
    const params = useParams();

    const [no] = useState(params.no);
    const [type, setType] = useState("1");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [memberNo, setMemberNo] = useState("");

    useEffect (() => {
        if (no !== '_create') {
            BoardService.getOneBoard(no).then( (res) => {
                let board = res.data;
                console.log("board => "+ JSON.stringify(board));
                
                setType(board.type);
                setTitle(board.title);
                setContents(board.contents);
                setMemberNo(board.memberNo);
            });
        }
    }, []);

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
        if (no === '_create') {
            BoardService.createBoard(board).then(res => {
                navigate('/board');
            });
        } else {
            BoardService.updateBoard(no, board).then(res => {
                navigate('/board');
            });
        }
    }

    // 
    const cancel = () => {
        navigate('/board');
    }

    // 
    const getTitle = () => {
        if (no === '_create') {
            return <h3 className="text-center">????????? ??????????????????</h3>
        } else {
            return <h3 className="text-center">{no}??? ???????????? ???????????????.</h3>
        }
    }

    // 
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            getTitle()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Type </label>
                                    <select placeholder="type" name="type" className="form-control" onChange={changeTypeHandler} defaultValue="???????????????">
                                        <option value="1">???????????????</option>
                                        <option value="2">????????? ??????</option>
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