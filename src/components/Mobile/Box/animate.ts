export const boxAnimateConstant = {
    // Backdrop
    backdrop: {
        initial: { opacity: 0 },
        animate: {
            opacity: 0.3,
            transition: { duration: 0.8, type: 'tween' },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.4, type: 'tween' },
        },
    },

    // Box
    box: {
        initial: { y: '100vh', opacity: 0 },
        animate: {
            y: '0',
            opacity: 1,
            transition: {
                duration: 0.8,
                type: 'tween',
            },
        },
        exit: {
            y: '100vh',
            opacity: 0,
            transition: { duration: 0.7, type: 'tween' },
        },
    },
};
