import type { NextPage } from 'next';
import AddTaskContainer from '../containers/AddTask';
import TodoBoard from '../containers/TodoBoard';
import { boards } from '../constants/lists';
import Scrollbars from 'react-custom-scrollbars';

const RiseTechQDashboard: NextPage = () => {
    return (
        <div className="flex h-screen box-border flex-col justify-between items-center py-4 pt-10">
            <div className="flex flex w-10/12 mx-auto h-full">
                <Scrollbars>
                    <div className="flex flex box-border h-full flex-1 pb-7 px-4">
                        <div className="flex flex-1 gap-8">
                            {boards.map((board) => (
                                <TodoBoard
                                    board={board}
                                    key={`board_${board.id}`}
                                />
                            ))}
                        </div>
                    </div>
                </Scrollbars>
            </div>

            <AddTaskContainer />
        </div>
    );
};

export default RiseTechQDashboard;
