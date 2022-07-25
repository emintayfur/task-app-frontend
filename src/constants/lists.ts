import Board, { IBoard } from './Board';

export const boards: IBoard[] = [
    Board.urgent,
    Board.important,
    Board.normal,
    Board.done,
];
