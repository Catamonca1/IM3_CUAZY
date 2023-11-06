import { supa } from "../config/config.js";

// *************************************************************************************************
// helper functions to run the page flow

//get the query params with values from the url
function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const values = [];
    for (const [key, value] of queryParams) {
        values.push({ key, value });
    }

    return values;
}

//handle data - api requests
//get all schools with relation to courses
async function getSchoolData() {

    const { data, error } = await supa.from("school").select('*, courses(*), school_courses(*)');

    if (error) {
        alert("Error fetching data from database:", error);
    } else {
        return data;
    }
}

const applyFilters = (data) => {

    const queryParams = getQueryParams();
    let filteredData = data;

    // Filter by Zip
    if (queryParams[0].value != "undefined") {
       
        const newfilteredData = filteredData.filter(school => {
            return school.zip_code === parseInt(queryParams[0].value);
        })

        filteredData = newfilteredData;
    }

    // Filter by course name
    if (queryParams[1].value != "undefined") {

        const newfilteredData = filteredData.filter(school =>
            school.courses.some(course => course.name === queryParams[1].value)
        );

        filteredData = newfilteredData;
    }

    //filter price range
    if (queryParams[2].value !== "undefined") {
        console.log('queryParam obj: ', queryParams)
        console.log('queryParam obj value 3:', queryParams[2].value)

        let priceRange = getPriceRange(queryParams[2].value);
        console.log(priceRange)

        const minPrice = priceRange[0];
        const maxPrice = priceRange[1];

        const newfilteredData = filteredData.filter(school => {
            console.log('school: ', school)
            return school.school_courses.some(course => {
                const price = course.price;
                return price >= minPrice && price <= maxPrice;
            });
        });

        filteredData = newfilteredData;

    }
    return filteredData
}

// helper method to return min and max price range base on select option in html element
// required for filters "price range"
const getPriceRange = (priceIndicator) => {

    let minPrice = 0;
    let maxPrice = 0;

    switch (priceIndicator) {
        case '0':
            break;
        case '1':
            minPrice = 4;
            maxPrice = 15;
            break;
        case '2':
            minPrice = 14;
            maxPrice = 30;
            break;
        case '3':
            minPrice = 29;
            maxPrice = 40;
            break;
        case '4':
            minPrice = 39;
            maxPrice = 10000;
            break;
        default:
            throw new Error("price option is invalid");
    }

    return [minPrice, maxPrice];
}

const createResultListHtml = async (data) => {
    let template = '<ul class="main_list_container">';

    if (data.length === 0) {
      template += `<li class="main_list_item_container">Für diese Suchparameter wurde leider keine Schule gefunden &#128532</li></ul>`;
      return template;
    }

    // the courseTemplate has to be awaited, since it takes some time to filter out the existing courses
    const coursesTemplate = await getAllCourses(data);
  
    data.forEach((school, index) => {
        template += `
        <li class="main_list_item_container">
          <div class='result_item_container'>
            <div class='item_header'>Schule:</div>
            <div class='item_body'>${school.name}</div>
          </div>
          <div class='result_item_container'>
            <div class='item_header'>Addresse:</div>
            <div class='item_body'>${school.street_name} ${school.street_number}, ${school.zip_code} ${school.city}</div>
          </div>
          <div class='result_item_container'>
            <div class='item_header'>Telefon:</div>
            <div class='item_body'>${school.telephone}</div>
          </div>
          <div class='result_item_container'>
            <div class='item_header'>Website:</div>
            <div class='item_body'>${school.website}</div>
          </div>
          ${coursesTemplate[index]}
        </li>`;
    });
  
    template += `</ul>`;
    return template;
  };

async function getAllCourses(data) {
    const coursesPromises = data.map(async school => {
      if (school.courses) {
        const coursesTemplate = [`
        <div class="result_item_container">
            <div class="item_header">Kursangebot:</div>
            <div class="item_body_courselist">
                <div class="item_body_courselist_header">
                    <div>Niveau</div>
                    <div>Kosten</div>
                </div>
                <ul>`];
        for (const course of school.courses) {
          const coursePrice = school.school_courses.find(entry => course.id === entry.courses_id);
          coursesTemplate.push(`
            <li class="course_item_container">
              <div class="course_item_name_container">${course.name}</div>
              <div class="course_item_price_container">${coursePrice ? coursePrice.price + ".-" : 'Preis unbekannt'}</div>
            </li>
          `);
        }
        coursesTemplate.push(`
                </ul>
            </div>
        </div>`);
        return coursesTemplate.join('');
      }
      return ''; // if there are no courses, return an empty string
    });
     
    return await Promise.all(coursesPromises);
  }

//write data to html by templating new html area and adding it to the DOM
let writeTemplateToHtml = (template) => {
    document.querySelector('.school_list_container').innerHTML = '';
    document.querySelector('.school_list_container').innerHTML = template;
};

//google maps functions
//create markers on map
function createMarkers(data) {

    //init the map if its not already inited
    if (typeof map === 'undefined') {
        initMap();
    }

    // Loop through your filteredData array and create markers for each school
    data.forEach(school => {
        const marker = new google.maps.Marker({
            position: {
                lat: parseFloat(school.lat),
                lng: parseFloat(school.lng),
            },
            map: map,
            // add more options if you want
        });

        // if you want, you can add an event listener to the marker, 
        // f.e.: to open an info window when clicked :)
        marker.addListener('click', function () {
            const infoWindow = new google.maps.InfoWindow({
                content: `<div class="infowindow">
                            <strong>${school.name}</strong>
                            <a href="school.website"><div>${school.website}</div></a>
                            <div>${school.telephone}</div>
                           </div>`
            });
            infoWindow.open(map, marker);
        });
    });
}


// *************************************************************************************************
// page logic flow (process-flow when page is loaded)   
getSchoolData().then(result => {
    const filteredData = applyFilters(result);
    createMarkers(filteredData);
    return createResultListHtml(filteredData);
}).then(template => {
    writeTemplateToHtml(template);
}).catch(error => {
    console.log(error)
});
