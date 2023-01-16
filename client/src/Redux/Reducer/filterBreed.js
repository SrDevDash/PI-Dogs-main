export const filter = (filter, breedss) => {
    const { temperament, breeds, weigth, alpha } = filter;

    let newBreeds = breedss;

    console.log(temperament, breeds, weigth, alpha);

    if (temperament) {
        newBreeds = breedss.filter(breed => breed.temperament.includes(temperament))
    }

    if (weigth) {
        if (weigth === 'Weigth ASC') {
            newBreeds.sort((breedA, breedB) => {
                return breedA.weight.split(' - ')[0] - breedB.weight.split(' - ')[0]
            })
        } else {
            newBreeds.sort((breedA, breedB) => {
                return breedB.weight.split(' - ')[0] - breedA.weight.split(' - ')[0]
            })
        }
    }
    if (alpha) {
        if (alpha === 'ASC') {
            newBreeds.sort((breedA, breedB) => {
                return breedA.name < breedB.name
            })
        } else {
            newBreeds.sort((breedA, breedB) => {
                return breedA.name > breedB.name
            })
        }
    }

    return newBreeds
}