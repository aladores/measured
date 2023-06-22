function checkTable() {
    console.log("Checking table");
    const measurementTable = document.querySelector(".Table_table__conFW");
    const requestButton = document.querySelector(".RequestAction_button__mAClZ");

    if (measurementTable) {
        console.log("Found table!");
        compareMeasurements(measurementTable);
        clearInterval(intervalTable);
    }
    else if (requestButton) {
        console.log("No measurements provided");
        clearInterval(intervalTable);
        return;
    }
    // RequestAction_button__mAClZ
}

function compareMeasurements(measurementTable) {
    const staticMeasurements = [
        ["Chest", "22", "55.9"],
        ["Length", "30", "76.2"],
        ["Shoulders", "18", "45.7"],
        ["Sleeve Length", "25", "63.5"],
        ["Hem", "22", "80"]
    ]

    const measurementArray = parseMeasurements(measurementTable);

    for (let i = 0; i < measurementArray.length; i++) {
        if (measurementArray[i][0] === staticMeasurements[i][0]) {
            //console.log(measurementArray[i][0]);

            const inchDifference = (measurementArray[i][1] - staticMeasurements[i][1]).toFixed(2);
            const cmDifference = (measurementArray[i][2] - staticMeasurements[i][2]).toFixed(2);

            //console.log(`in: ${measurementArray[i][1]} - ${staticMeasurements[i][1]} = `, inchDifference);
            //console.log(`cm: ${measurementArray[i][2]} - ${staticMeasurements[i][2]} = `, cmDifference);

            addDifference(measurementTable, i, inchDifference, cmDifference);
        }
    }

}

function addDifference(measurementTable, position, inchDifference, cmDifference) {
    const inchCell = measurementTable.children[position].children[1];
    const cmCell = measurementTable.children[position].children[2];
    //const inchDiv = document.createElement("div");
    //inchDiv.classList.add("Text", "Callout_callout__1Kvd", "Row_column__4KcmY", "Row_unit__LJkvR");
    //inchDiv.innerText = `${inchDifference} in`;
    //console.log("html", inchDiv.innerHTML);

    let formattedInch = "";
    let formattedCm = "";
    if (parseFloat(inchDifference) === 0.00) {
        formattedInch = "=";
        formattedCm = "=";
    }
    else {
        formattedInch = inchDifference.match(/^\d/) ? `+${inchDifference} in` : `${inchDifference} in`;
        formattedCm = cmDifference.match(/^\d/) ? `+${cmDifference} cm` : `${cmDifference} cm`;
    }
    inchCell.innerHTML += ` ${formattedInch}`;
    cmCell.innerHTML += ` ${formattedCm}`;
}

function parseMeasurements(measurementTable) {
    //Chest,Length,Shoulders,Sleeve Length,Hem
    const parsedData = Array.from(measurementTable.children).map(item => item.innerText.split('\n').filter(Boolean));
    const measurements = parsedData.map(innerArray => {
        return innerArray.map(item => {
            return item.replace(/(in|cm)/g, '').trim();
        });
    });
    return measurements;
}

const intervalTable = setInterval(checkTable, 500);