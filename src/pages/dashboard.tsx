import type { NextPage } from 'next';
import AddTodoContainer from '../containers/AddTodo';
import TodoBoard from '../containers/TodoBoard';
import { boards } from '../constants/lists';
import Scrollbars from 'react-custom-scrollbars';
import BgLinearByPriority from '../components/BgLinearByPriority';
import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import { TodoElem } from '../store/reducers/todos';
import { IBoard } from '../constants/board';

const getTodosByBoard = (board: IBoard, todos: TodoElem[]) =>
    todos.filter((todo) => todo.board === board.id);

const RiseTechQDashboard: NextPage = () => {
    const todosState = useAppSelector((state) => state.todos);
    const todos = useMemo(() => {
        // For filter
        return todosState;
    }, [todosState]);

    return (
        <>
            <BgLinearByPriority />
            <div className="flex relative z-20 h-screen box-border flex-col justify-between items-center py-4 pt-10 gap-2">
                <div className="flex flex w-10/12 mx-auto h-full">
                    <Scrollbars universal>
                        <div className="flex relative flex box-border h-full flex-1 pb-7 px-4">
                            <div className="flex relative flex-1 gap-8 z-20">
                                {boards.map((board) => (
                                    <TodoBoard
                                        board={board}
                                        key={`board_${board.id}`}
                                        items={getTodosByBoard(board, todos)}
                                    />
                                ))}
                            </div>
                        </div>
                    </Scrollbars>
                </div>

                <AddTodoContainer />
            </div>
        </>
    );
};

export default RiseTechQDashboard;
