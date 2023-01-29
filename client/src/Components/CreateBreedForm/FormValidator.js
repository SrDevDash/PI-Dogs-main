export const validator = (data) => {
    const erros = {};

    console.log(data);
    if (!data.name) erros.name = 'Name is required';
    else if (!/^[a-zA-Z ]+$/.test(data.name)) erros.name = 'Name should be a string'

    if (!data.minWeight) erros.weight = 'Weight is required';
    else if (parseInt(data.minWeight) > parseInt(data.maxWeight)) erros.weight = "Min weight should be lower than Max weight"

    if (!data.minHeight) erros.height = 'Height is required'
    else if (parseInt(data.minHeight) > parseInt(data.maxHeight)) erros.height = "Min height should be lower than Max height"

    console.log(data.minHeight, data.maxHeight)
    if (!data.minLifeSpan) erros.lifeSpan = 'Life span is required'
    else if (parseInt(data.minLifeSpan) > parseInt(data.maxLifeSpan)) erros.lifeSpan = "Min life span should be lower than Max life span"

    if (!data.image) erros.image = 'Image is required'
    if (!data.temperaments.length) erros.temperaments = 'One temperament at least is required'

    return erros
}
