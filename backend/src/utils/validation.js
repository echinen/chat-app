const isRealString = (word) => {
    return typeof word === 'string' && word.trim().length > 0;
};

module.exports = {
    isRealString
}