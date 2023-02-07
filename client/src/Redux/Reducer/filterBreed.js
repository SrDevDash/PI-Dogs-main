export const filter = (filter, breedss) => {
    const { temperament, breeds, weigth, alpha } = filter;

    let newBreeds = breedss;


    if (breeds) {
        newBreeds = newBreeds.filter(breed => breeds === "Real Breeds" ? !breed.db : breed.db)
    }

    if (temperament) {
        newBreeds = newBreeds.filter(breed => breed.temperament?.includes(temperament))
    }

    if (weigth) {
        if (weigth === 'Weigth ASC') {
            newBreeds.sort((breedA, breedB) => {
                return breedA.weight.split(' ')[0] - breedB.weight.split(' ')[0]
            })
        } else {
            newBreeds.sort((breedA, breedB) => {
                return breedB.weight.split(' ')[0] - breedA.weight.split(' ')[0]
            })
        }
    }

    if (alpha) {
        if (alpha === 'ASC') {
            newBreeds.sort((breedA, breedB) => {
                return breedB.name.toLowerCase().charCodeAt(0) - breedA.name.toLowerCase().charCodeAt(0)
            })
        } else {
            newBreeds.sort((breedA, breedB) => {
                return breedA.name.toLowerCase().charCodeAt(0) - breedB.name.toLowerCase().charCodeAt(0)
            })
        }
    }


    return newBreeds.length ? newBreeds : { error: 'Breed Not Found' }
}
