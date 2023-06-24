const deepCopy = (s: any) => {
    try {
        return JSON.parse(JSON.stringify(s));
    } catch (e) {
        throw new Error(`Invalid JSON: ${s}`);
    }
};

export default deepCopy;
