export const renderCountries = (countries) => {
    console.dir(countries);
    return countries.map(({ flags, name }) => {
            return `
            <li>
            <img src ="${flags.png}" width="20px" height="17px">
            ${name.official}
            </li>
        `;
        })
            .join("");
} 
export const renderCountry = (countries) => {
    console.dir(countries);
        return countries.map(({ flags, name, capital, population, languages }) => {
            return `
     <ul>
            <li>
            <img src ="${flags.png} " width="20px" height="17px">
            <span class="card-name">${name.official}</span>
            </li>
            <li><span class="name">Capital:  </span>${capital}
            </li>
            <li><span class="name">Population:  </span>${population}
            </li>
            <li><span class="name">Languages:  </span>${Object.values(languages)}
            </li>
     </ul>
        `;
        })
            .join("");


}