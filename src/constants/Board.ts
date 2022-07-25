export interface IBoard {
    id: string;
    name: string;
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
    id: 'urgent',
    prefixEmoji: '💣',
    name: 'Acil',
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
    id: 'important',
    prefixEmoji: '🛑',
    name: 'Önemli',
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
    id: 'normal',
    prefixEmoji: '📌',
    name: 'Normal',
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
    id: 'done',
    prefixEmoji: '🎉',
    name: 'Bitti',
    level: 1,
};

const Board = {
    urgent: BOARD_URGENT,
    important: BOARD_IMPORTANT,
    normal: BOARD_NORMAL,
    done: BOARD_DONE,
};

export default Board;
