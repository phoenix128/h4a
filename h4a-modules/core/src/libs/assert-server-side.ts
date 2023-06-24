const assertServerSide = () => {
    if (typeof process !== 'object') {
        throw new Error('This module should only be used on the server side');
    }
};

export default assertServerSide;
