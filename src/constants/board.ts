import BoardId from '../enums/BoardId';

export interface IBoard {
    id: BoardId;
    name: string;
    linearClassName?: string;
    prefixEmoji?: string;
    color?: {
        primary: string;
        secondary: string;
    };
    faviconPath?: {
        svg: string;
        png: string;
    };
    level: 1 | 2 | 3 | 4; // 4 En yüksek öncelikli; 1 En düşük öncelikli.
}

export const BOARD_URGENT: IBoard = {
    id: BoardId.urgent,
    prefixEmoji: '💣',
    name: 'Acil',
    linearClassName: 'bg-linear-red',
    color: {
        primary: '#C86E5A',
        secondary: '#FFDED7',
    },
    faviconPath: {
        svg: 'favicon/red/icon.svg',
        png: 'favicon/red/icon.png',
    },
    level: 4,
};

export const BOARD_IMPORTANT: IBoard = {
    id: BoardId.important,
    prefixEmoji: '🛑',
    name: 'Önemli',
    linearClassName: 'bg-linear-orange',
    color: {
        primary: '#DC8B2C',
        secondary: '#FFE1BE',
    },
    faviconPath: {
        svg: 'favicon/orange/icon.svg',
        png: 'favicon/orange/icon.png',
    },
    level: 3,
};

export const BOARD_NORMAL: IBoard = {
    id: BoardId.normal,
    prefixEmoji: '📌',
    name: 'Normal',
    linearClassName: 'bg-linear-blue',
    color: {
        primary: '#6C63FF',
        secondary: '#D7E1FE',
    },
    faviconPath: {
        svg: 'favicon/blue/icon.svg',
        png: 'favicon/blue/icon.png',
    },
    level: 2,
};

export const BOARD_DONE: IBoard = {
    id: BoardId.done,
    prefixEmoji: '🎉',
    name: 'Bitti',
    level: 1,
};

const Board: { [keys in BoardId]: IBoard } = {
    [BoardId.urgent]: BOARD_URGENT,
    [BoardId.important]: BOARD_IMPORTANT,
    [BoardId.normal]: BOARD_NORMAL,
    [BoardId.done]: BOARD_DONE,
};

export default Board;
