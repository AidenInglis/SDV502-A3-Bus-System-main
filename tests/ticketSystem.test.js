const { JSDOM } = require('jsdom');
const { name, destination, seats, pricePerSeat, totalFare } = require('../src/script.js');

describe('Ticket System', () => {
    let dom;
    let document;

    beforeEach(() => {
        dom = new JSDOM(`
            <form id="bookingForm">
                <input id="name" type="text" />
                <input id="destination" type="text" />
                <input id="seats" type="number" />
                <button type="submit">Submit</button>
            </form>
            <p id="message"></p>
        `);

        document.getElementById('name').value = '';
        document.getElementById('destination').value = '';
        document.getElementById('seats').value = 0;

        document = dom.window.document;

        // Assign global document and window to simulate the browser environment for the test
        global.document = document;
        global.window = dom.window;
    });

    test('booking a ticket for a specified destination', () => {//booking a ticket for a specified destination.
        document.getElementById('name').value = 'Alice';
        document.getElementById('destination').value = 'New Calodonia';
        document.getElementById('seats').value = 5;

        document.getElementById('bookingForm').dispatchEvent(new Event('submit'));

        expect(destination).toBe("New York");
    });

    // test('Verifying seat availability based on user input', () => {//Verifying seat availability based on user input.
        
    // });

    // test('Calculating the fare according to the number of tickets booked', () => {//Calculating the fare according to the number of tickets booked
    //     expect();
    // });
});