
const Board = () => {

    const boardSet = [
        {id: 1, boardTitle : "NewBoard" },
        {id: 2, boardTitle: "NextBoard"}
    ]

    const boards = boardSet.map((item, index) => {
        <div id={`${index}`}>
            <h2>{item.boardTitle}</h2>
        </div>
    })

    return(
        <>
        {boards}
        </>
    )
}

export default Board;