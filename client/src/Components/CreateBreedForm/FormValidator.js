export const validator = (data) => {
    const erros = {};

    if (!data.name) erros.name = 'Name is required'
    if (!data.minWeight) erros.weight = 'Weight is required'
    if (!data.maxHeight) erros.height = 'Height is required'
    if (!data.minLifeSpan) erros.lifeSpan = 'Life span is required'
    if (!data.image) erros.image = 'Image is required'
    if (!data.temperaments.length) erros.temperaments = 'One temperament at least is required'

    return erros
}
