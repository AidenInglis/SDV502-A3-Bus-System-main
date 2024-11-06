const { JSDOM } = require('jsdom');//importing the JSDOM module to create a DOM so that testing works

describe('Ticket System', () => {
    let dom;//declaring the dom variable
    let document;//declaring the document variable
    let window; //declaring the window variable
    let handleFormSubmit;//declaring the handleFormSubmit variable
    
    beforeEach(() => {//what happens before each test
        dom = new JSDOM//declaring form structure
            (`<form id="bookingForm">
                <input id="name" type="text" />
                <input id="destination" type="text" />
                <input id="seats" type="number" />
                <button type="submit">Submit</button>
            </form>
            <p id="message"></p>`);
        window = dom.window;//assign virtual window to global window variable
        document = dom.window.document;//assign virtual document to global document variable
        global.window = window;//assign global window to virtual window
        global.document = document;//assign global document to virtual document

        ({handleFormSubmit, pricePerSeat} = require('../src/script.js'));//importing form submit function and price per seat from script file
        document.getElementById('name').value = '';//set default empty
        document.getElementById('destination').value = '';//set default empty
        document.getElementById('seats').value = 0;//set default 0
    });

    test('booking a ticket for a specified destination', () => {//booking a ticket for a specified destination.
        document.getElementById('name').value = 'John Doe';//set name to John Doe
        document.getElementById('destination').value = 'New York';//set destination to New York
        document.getElementById('seats').value = 3;//set seats to 3

        handleFormSubmit({ preventDefault: () => {} });//submit form

        const message = document.getElementById("message").innerText;//get message
        expect(message).toContain('New York');//expect message to contain New York  
    });

    test('Verifying seat availability based on user input', () => {//Verifying seat availability based on user input.
        document.getElementById('name').value = 'John Doe';//set name to John Doe
        document.getElementById('destination').value = 'New York';//set destination to New York
        document.getElementById('seats').value = 3;//set seats to 3

        handleFormSubmit({ preventDefault: () => {} });//submit form

        const message = document.getElementById("message").innerText;//get message
        expect(message).toContain('Seats: 3');//expect message to contain Seats: 3
    });

    test('Calculating the fare according to the number of tickets booked', () => {//Calculating the fare according to the number of tickets booked
        document.getElementById('name').value = 'John Doe';//set name to John Doe
        document.getElementById('destination').value = 'New York';//set destination to New York
        document.getElementById('seats').value = 3;//set seats to 3
        pricePerSeat = 10;//set price per seat to 10 as a constant and also just checking it was declared from the script file

        handleFormSubmit({ preventDefault: () => {} });//submit form

        const message = document.getElementById("message").innerText;//get message
        expect(document.getElementById("seats").value).toBe('3');//expect seats to be 3
        expect(pricePerSeat).toBe(10);//expect price per seat to be 10
        expect(pricePerSeat * document.getElementById("seats").value).toBe(30);//expect 'price per seat' X 'seats' to be 30
        expect(message).toContain('Total fare: $30');//expect message to contain Total fare: $30
    });
});