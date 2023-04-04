import { refs } from './refs'
import { renderCountries } from './render';
import { renderCountry } from './render';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const checkCountryNumber = (countries) => {
    
    if (countries.length > 10) {
        refs.ulRef.innerHTML = "";
        Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (countries.length <= 10 && countries.length >= 2) {
        refs.infoRef.innerHTML = "";
        refs.ulRef.innerHTML = renderCountries(countries);
    } else if (countries.length < 2) {
        refs.ulRef.innerHTML = "";
        refs.infoRef.innerHTML = renderCountry(countries);
     }
}