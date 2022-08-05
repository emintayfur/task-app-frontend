import { useCallback, useEffect, useState } from 'react';

const MAX_WIDTH = 1280;
const useMobileViewController = () => {
    const [width, setWidth] = useState(window?.innerWidth || 0);

    const handleResize = useCallback((e: any) => {
        if (e?.target?.innerWidth) setWidth(e?.target?.innerWidth);
    }, []);

    useEffect(() => {
        if (window) {
            setWidth(window?.innerWidth || 0);
            window.addEventListener('resize', handleResize);
        }
        return () => {
            if (window) {
                document.removeEventListener('resize', handleResize);
            }
        };
    }, [handleResize]);

    return width < MAX_WIDTH;
};

export default useMobileViewController;
