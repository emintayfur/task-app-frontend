export const classNameList = (arr: any[]) => {
    const filtered = arr.filter((arr) => arr);

    if (!filtered.length) return undefined;
    return filtered.join(' ');
};
