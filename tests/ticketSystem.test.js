const { JSDOM } = require('jsdom');//importing the JSDOM module to create a DOM so that testing works

describe('Ticket System', () => {
    let dom;//declaring the dom variable
    let document;//declaring the document variable
    let window; //declaring the window variable
    let handleFormSubmit;//declaring the handleFormSubmit variable
    
    beforeEach(() => {//what happens before each test
        dom = new JSDOM
            (`<form id="bookingForm">
                <input id="name" type="text" />
                <input id="destination" type="text" />
                <input id="seats" type="number" />
                <button type="submit">Submit</button>
            </form>
            <p id="message"></p>`);
        window = dom.window;
        document = dom.window.document;
        global.window = window;
        global.document = document;

        ({handleFormSubmit, pricePerSeat} = require('../src/script.js'));   
        document.getElementById('name').value = '';
        document.getElementById('destination').value = '';
        document.getElementById('seats').value = 0;
    });

    test('booking a ticket for a specified destination', () => {//booking a ticket for a specified destination.
        document.getElementById('name').value = 'John Doe';
        document.getElementById('destination').value = 'New York';
        document.getElementById('seats').value = 3;

        handleFormSubmit({ preventDefault: () => {} });

        
        const message = document.getElementById("message").innerText;
        expect(message).toContain('New York');    
    });

    test('Verifying seat availability based on user input', () => {//Verifying seat availability based on user input.
        document.getElementById('name').value = 'John Doe';
        document.getElementById('destination').value = 'New York';
        document.getElementById('seats').value = 3;

        handleFormSubmit({ preventDefault: () => {} });

        const message = document.getElementById("message").innerText;
        expect(message).toContain('Seats: 3');

    });

    test('Calculating the fare according to the number of tickets booked', () => {//Calculating the fare according to the number of tickets booked
        document.getElementById('name').value = 'John Doe';
        document.getElementById('destination').value = 'New York';
        document.getElementById('seats').value = 3;
        pricePerSeat = 10;

        handleFormSubmit({ preventDefault: () => {} });

        const message = document.getElementById("message").innerText;
        expect(document.getElementById("seats").value).toBe('3');
        expect(pricePerSeat).toBe(10);
        expect(message).toContain('Total fare: $30');
    });
});