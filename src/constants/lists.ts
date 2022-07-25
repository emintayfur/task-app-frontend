import Board, { IBoard } from './board';

export const boards: IBoard[] = [
    Board.urgent,
    Board.important,
    Board.normal,
    Board.done,
];

export const priorities = [Board.urgent, Board.important, Board.normal];
