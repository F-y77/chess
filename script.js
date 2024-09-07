document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');
    const moveSound = document.getElementById('moveSound');
    const winSound = document.getElementById('winSound');

    const pieces = {
        '♔': 'king', '♕': 'queen', '♖': 'rook', '♗': 'bishop', '♘': 'knight', '♙': 'pawn',
        '♚': 'king', '♛': 'queen', '♜': 'rook', '♝': 'bishop', '♞': 'knight', '♟': 'pawn'
    };

    const board = [
        ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
        ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
    ];

    let selectedPiece = null;

    function createBoard() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
                square.dataset.row = row;
                square.dataset.col = col;
                square.textContent = board[row][col];
                square.addEventListener('click', handleSquareClick);
                chessboard.appendChild(square);
            }
        }
    }

    function handleSquareClick(event) {
        const square = event.target;
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);

        if (selectedPiece) {
            movePiece(selectedPiece, row, col);
            selectedPiece = null;
        } else if (board[row][col]) {
            selectedPiece = { row, col };
        }
    }

    function movePiece(from, toRow, toCol) {
        const { row, col } = from;
        const piece = board[row][col];

        if (isValidMove(piece, row, col, toRow, toCol)) {
            board[toRow][toCol] = piece;
            board[row][col] = '';
            updateBoard();
            moveSound.play();

            if (isCheckmate()) {
                winSound.play();
                alert('Checkmate!');
            }
        }
    }

    function isValidMove(piece, fromRow, fromCol, toRow, toCol) {
        // 简单的移动规则示例，实际应实现完整的国际象棋规则
        const dx = Math.abs(toRow - fromRow);
        const dy = Math.abs(toCol - fromCol);

        switch (pieces[piece]) {
            case 'pawn':
                return (dx === 1 && dy === 0) || (dx === 2 && dy === 0 && fromRow === 1);
            case 'knight':
                return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
            case 'bishop':
                return dx === dy;
            case 'rook':
                return dx === 0 || dy === 0;
            case 'queen':
                return dx === dy || dx === 0 || dy === 0;
            case 'king':
                return dx <= 1 && dy <= 1;
            default:
                return false;
        }
    }

    function updateBoard() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            const row = square.dataset.row;
            const col = square.dataset.col;
            square.textContent = board[row][col];
        });
    }

    function isCheckmate() {
        // 简单的胜利判断，实际应实现完整的国际象棋规则
        return false;
    }

    createBoard();
});


