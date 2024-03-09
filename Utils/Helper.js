exports.toNumber = (n) => {
    return (!isNaN(parseFloat(n)) && !isNaN(n - 0)) ? parseFloat(n) : null;
}