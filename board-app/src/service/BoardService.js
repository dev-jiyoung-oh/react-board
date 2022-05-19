import axios from 'axios'; // axios를 사용하는 것을 정의

// spring boot api의 URL을 정의
const BOARD_API_BASE_URL = "http://localhost:8080/api/board";

class BoardService {
    // 글목록 데이터를 가져오는 함수
    getBoards() {
        return axios.get(BOARD_API_BASE_URL);
    }

    // 글 작성
    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board);
    }

    // 상세보기
    getOneBoard(no) {
        return axios.get(BOARD_API_BASE_URL + "/" + no);
    }
}

export default new BoardService();