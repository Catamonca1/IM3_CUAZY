/*import { supa } from "../config/config.js";


const form = document.querySelector('form');


async function getSchoolByZipCode() {
    try {
        const { data: school, error } = await supa.from("school").select().eq('zipCode', parseInt(zipInputField.value));
        return school;
    }
    catch (error) {
        console.error('Es gab einen Fehler beim Abrufen der Daten', error);
    }

}

let writeSearchResultsToHtml = (school) => {

    document.querySelector('#map').innerHTML = '';
    let template
    if (school != undefined) {
    template = `
    <div class="schoolContainer">
        <div>School Name: ${school.School_Name }</div>
        <div>School Adress: ${school.Address }</div>
        <div>Tel: ${school.Telephone }</div>
        <div>Website: ${school.Website }</div>
        <div>Long: ${school.Lang }</div>
        <div>Lat: ${school.Lat }</div>
    </div>`
    } else {
        template = `
        <div class="schoolContainer">
        <div>Keine Schule für diesen ZipCode gefunden</div>
        </div>`

    }

    document.querySelector('#map').innerHTML = template;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    //e.preventDefault();--> Verhindert das Neuladen der Seite, wenn das Formular abgesendet wird
    getSchoolByZipCode().then(school => {
        // if (school.length === 0) {
        //     writeHTMLError();
        //     return;
        // }
        writeSearchResultsToHtml(school[0]);
    });
});
*/