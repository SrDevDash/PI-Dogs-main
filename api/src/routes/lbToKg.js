const transform = (data) => {
    const array = data.split(' ');

    const result = `${Math.floor(array[0] * 0.453592)} - ${Math.floor(array[2] * 0.453592)}`;

    console.log(result);
    return result
}

module.exports = { transform };