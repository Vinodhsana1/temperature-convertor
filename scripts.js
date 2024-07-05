document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('converter-form');
    const result = document.getElementById('converted-temperature');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let temperatureInput = document.getElementById('temperature');
        let fromUnitInput = document.getElementById('unit');
        let toUnitInput = document.getElementById('to-unit');

        let temperature = parseFloat(temperatureInput.value);
        let fromUnit = fromUnitInput.value;
        let toUnit = toUnitInput.value;

        if (isNaN(temperature) || temperatureInput.value.trim() === "") {
            displayMessage("Please enter a valid number!", "red");
            return;
        }

        let convertedTemperature;

        if (fromUnit === toUnit) {
            displayMessage("Please select different units to convert!", "red");
            return;
        }

        switch (fromUnit) {
            case 'celsius':
                convertedTemperature = convertCelsius(temperature, toUnit);
                break;
            case 'fahrenheit':
                convertedTemperature = convertFahrenheit(temperature, toUnit);
                break;
            case 'kelvin':
                convertedTemperature = convertKelvin(temperature, toUnit);
                break;
            default:
                displayMessage("Invalid conversion units!", "red");
                return;
        }

        displayMessage(`${temperature} ${fromUnit} is ${convertedTemperature.toFixed(2)} ${toUnit}`, "black");
    });

    function convertCelsius(temp, toUnit) {
        switch (toUnit) {
            case 'fahrenheit':
                return (temp * 9/5) + 32;
            case 'kelvin':
                return temp + 273.15;
            default:
                return temp;
        }
    }

    function convertFahrenheit(temp, toUnit) {
        switch (toUnit) {
            case 'celsius':
                return (temp - 32) * 5/9;
            case 'kelvin':
                return ((temp - 32) * 5/9) + 273.15;
            default:
                return temp;
        }
    }

    function convertKelvin(temp, toUnit) {
        switch (toUnit) {
            case 'celsius':
                return temp - 273.15;
            case 'fahrenheit':
                return (temp - 273.15) * 9/5 + 32;
            default:
                return temp;
        }
    }

    function displayMessage(message, color) {
        result.style.opacity = 0;
        setTimeout(() => {
            result.innerHTML = message;
            result.style.color = color;
            result.style.opacity = 1;
        }, 200);
    }
});
