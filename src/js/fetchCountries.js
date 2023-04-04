import { refs } from './refs'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { checkCountryNumber } from './checkCountry';


export const fetchCountries = () => {
    refs.inputRef.value = refs.inputRef.value.trim();
    fetch(`https://restcountries.com/v3.1/name/${refs.inputRef.value}?fields=name,capital,population,flags,languages`)
        .then(response => {
        if (!response.ok) {
         throw new Error(response.status);
        }
        return response.json();
        })
        .then(countries => checkCountryNumber(countries))
        .catch(error => {
            refs.ulRef.innerHTML = "";
            refs.infoRef.innerHTML = "";
            console.log(error);
            Notify.failure("Oops, there is no country with that name");
        });
}

 