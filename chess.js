const   EMPTY = 0,
        QUEEN = 1

class ChessBoard {
    constructor(size = 8) { // 8 by default - it is classical eight queen puzzle problem
        this.board = []
        this.size = size

        // Add columns to rows
        for (let i = 0; i < size; i++)
            this.board[i] = []


        // Initialize all fields as empty fields
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                this.board[i][j] = EMPTY
            }
        }

        return this
    }

    // Try to recursively solve table with queens
    recursiveSolve(col = 0) {

        /*  If actual column is out of range, it means that in
            previous parent function successfuly solved last needed
            queen, return true for parent function to resolve success
        */
        if (col >= this.size)
            return true;

        /* For every field in column, try to solve */
        for (let i = 0; i < this.size; i++) {

            if (this.isPossible(i, col)) {
                this.board[i][col] = QUEEN

                /* Send next col to child function, if its very child return true
                All childs returns true to parent, it means successful solution
                */
                if (this.recursiveSolve(col + 1))
                    return true;

                /* Solution failed, set to empty and go to try next field in col */
                this.board[i][col] = EMPTY
            }
        }

        /* If all fields in col failed, return false */
        return false
    }


    /*
    Method checks if is possible on field at row and col insert
    queen. Check is applied diagonal and in a row
    */
    isPossible(row, col) {

        // ROW CHECK
        for (let i = 0; i < col; i++)
            if (this.board[row][i])
                return false

        // DIAGONAL DOWN
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
            if (this.board[i][j])
                return false

        // DIAGONAL UP
        for (let i = row, j = col; j >= 0 && i < this.size; i++, j--)
            if (this.board[i][j])
                return false

        return true;
    }

    /* Write result to div container provided as argument */
    writeOutBoard(container) {

        for (let i = 0; i < this.size; i++) {
            let row = document.createElement('p')

            for (let j = 0; j < this.size; j++) {
                row.innerHTML += `${this.board[i][j]} `
            }
            container.appendChild(row)
        }
    }
}

// select div from DOM
const container = document.querySelector('#results')

// Solve board with size of N
const chessBoard = new ChessBoard(15)

const startTime = Date.now()

if (chessBoard.recursiveSolve()) {
    window.alert(`Naslo sa riesenie za ${Date.now() - startTime} ms`)
} else {
    window.alert('Pre tuto dlzku, sa kralovne nedaju zostavit')
}

chessBoard.writeOutBoard(container)
