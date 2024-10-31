const { name, destination, seats, pricePerSeat, totalFare } = require('../src/script.js');

describe('Calculator functions', () => {

    test('booking a ticket for a specified destination', () => {//booking a ticket for a specified destination.
        document.getElementById('name').value = 'Alice';
        document.getElementById('destination').value = 'New Calodonia';
        document.getElementById('seats').value = 5;

        document.getElementById('bookingForm').dispatchEvent(new Event('submit'));

        expect(destination).toBe("New York");
    });

    test('Verifying seat availability based on user input', () => {//Verifying seat availability based on user input.
        
    });

    test('Calculating the fare according to the number of tickets booked', () => {//Calculating the fare according to the number of tickets booked
        expect();
    });
});