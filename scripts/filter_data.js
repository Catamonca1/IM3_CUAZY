//init and reset used html elements
const form = document.querySelector('form');

// zip code filter
const zipInputField = document.querySelector('#zipCode')
zipInputField.value = '';
let selectedZipCodeValue = undefined;

// course niveau filter
const niveauRadioButtons = document.querySelectorAll('input[name="niveau"]');
niveauRadioButtons.forEach(button => {
    button.checked = false;
})

let selectedNiveauValue = undefined;

// price range filter
const priceRangeDropdown = document.querySelector('#priceRangeDropdown');
priceRangeDropdown.value = "";
let selectedPriceRangeValue = undefined;

//Event Listeners for html elements

//Add the event for InputField to get the selected zipCode value
zipInputField.addEventListener("change", () => {
    selectedZipCodeValue = zipInputField.value;
});

//Add the event for radiobuttons to get the selected niveau value
niveauRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", () => {
        if (radioButton.checked) {
            selectedNiveauValue = radioButton.value;
        }
    });
});

//Add the event for selection element to get the price range value
priceRangeDropdown.addEventListener("change", () => {  
    const selectedOption = priceRangeDropdown.options[priceRangeDropdown.selectedIndex];
    selectedPriceRangeValue = selectedOption.value;
});

//Add the form submit event
form.addEventListener('submit', function (e) {
    e.preventDefault(); //e.preventDefault();--> Verhindert das Neuladen der Seite, wenn das Formular abgesendet wird

    const queryParams = createURLSearchParameters();
    const targetURLWithParams = `results.html?${queryParams.toString()}`;
    window.location.href = targetURLWithParams;
});

//create the params that will be used to open new page containing search params
let createURLSearchParameters = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("zipCodeValue", selectedZipCodeValue);
    queryParams.set("niveauValue", selectedNiveauValue);
    queryParams.set("priceRangeValue", selectedPriceRangeValue);

    return queryParams.toString();
}