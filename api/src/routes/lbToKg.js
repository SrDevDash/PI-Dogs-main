const transform = ({ metric, imperial }) => {

    let array = metric.split(' ');

    if (metric === "NaN") {
        array = imperial.split(' ');
        console.log(array[0], array[2]);
        const result = `${Math.floor(array[0] * 0.453592)} - ${Math.floor(array[2] * 0.453592)}`;
        console.log(result);
        return result
    }

    if (array[0] === 'NaN') return array[2];
    if (array[2] === 'NaN') return array[0];



    return metric;
}

module.exports = { transform };