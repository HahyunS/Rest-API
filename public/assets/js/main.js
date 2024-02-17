// async/await function for getting NASA data
async function getData( date ) {
    try {
        // Fetch the Nasa api
        const nasa = await fetch(`https://api.nasa.gov/planetary/apod?api_key=UBY71aJwkZ8U3OCDOsB65XItqD6akboe19zvCMoI&start_date=${date}&end_date=${date}`);

        const data = await nasa.json();

        console.log(data);

        // Select the element that Nasa picture will be rendered
        const content = document.querySelector( '#nasa-info' );

        let htmlText = '';

        for (let i = 0; i < data.length; i++) {
            htmlText += `
                <h3>${data[i].title}, ${data[i].date}</h3>
                <p>${data[i].explanation}</p>
                <img class="nasa-image" src="${data[i].url}" alt="${data[i].title}" />
            `;
        }
        // Render the Nasa picture and description
        content.innerHTML = htmlText;
    } catch( error ) {
        console.warn (`Nope: ${ error }`);
    }
}

// Select the date input
const dateInput = document.querySelector( '#pic-date' );
// Select the Get Photo button
const getButton = document.querySelector( '.date-button' );

// Watch if the Get Photo button is clicked
getButton.addEventListener('click', () => {
    // Render the Nasa picture and description
    getData(dateInput.value);
});

// Get today's date
const today = new Date();
const currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
// Render the today's Nasa picture when the page is loaded
getData(currentDate);