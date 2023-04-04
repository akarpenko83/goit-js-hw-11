import './css/styles.css';
import { refs } from './js/refs';
import { fetchCountries } from './js/fetchCountries'

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

refs.inputRef.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY))




