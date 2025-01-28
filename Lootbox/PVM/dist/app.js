async function renderInvoiceData(webLink) {
    let apiData;

    try {
        const response = await fetch(webLink);
        apiData = await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    // Header Info
    renderNewInvoiceNo(apiData);
    renderDates(apiData);

    // Main Info
    renderCompanyInfo(apiData);

    // Purchase Table Info
    const tableBody = document.querySelector(".itemTable tbody");
    const lastRow = document.querySelector(".listEnd");

    let totalAmount = 0;

    apiData.items.forEach(item => {
        const row = createItemRow(item);
        tableBody.insertBefore(row, lastRow);
        totalAmount += item.quantity * getItemPrice(item);
    });

    renderTotals(totalAmount, apiData.shippingPrice);
}

function renderNewInvoiceNo(apiData) {
    document.querySelector(".invoiceSeries").innerHTML = apiData.number.split('-')[0];
    document.querySelector(".invoiceNumber").innerHTML = apiData.number.split('-')[1];
}

function renderDates(apiData) {
    document.querySelector(".date").innerHTML = apiData.date;
    document.querySelector(".due_date").innerHTML = apiData.due_date;
}

function renderCompanyInfo(apiData) {
    Object.entries(apiData.company).forEach(([party, details]) => {
        document.querySelector(`.${party}Name`).innerHTML = details.name;
        document.querySelector(`.${party}Code`).innerHTML = details.code;
        document.querySelector(`.${party}Vat`).innerHTML = details.vat;
        document.querySelector(`.${party}Address`).innerHTML = details.address;
        document.querySelector(`.${party}Phone`).innerHTML = details.phone;
        document.querySelector(`.${party}Email`).innerHTML = details.email;
        document.querySelector(`.${party}Email`).href += details.email;
    });
}

function createItemRow(item) {
    const row = document.createElement("tr");

    row.appendChild(createTableCell(item.description));
    row.appendChild(createTableCell(item.quantity));
    row.appendChild(createPriceCell(item));
    row.appendChild(createTableCell((item.quantity * getItemPrice(item)).toFixed(2)));

    return row;
}

function createTableCell(content) {
    const cell = document.createElement("td");
    cell.textContent = content;
    return cell;
}

function createPriceCell(item) {
    const priceCell = document.createElement("td");

    if (item.discount.length === 0) {
        priceCell.textContent = item.price.toFixed(2);
    } else {
        const originalPrice = document.createElement("span");
        originalPrice.textContent = item.price.toFixed(2);
        originalPrice.style.textDecoration = "line-through";

        const discountMessage = document.createElement("span");
        const discountedPrice = calculateDiscountedPrice(item);
        discountMessage.textContent = ` ${discountedPrice.toFixed(2)}`;

        priceCell.appendChild(originalPrice);
        priceCell.appendChild(discountMessage);
    }

    return priceCell;
}

function calculateDiscountedPrice(item) {
    if (item.discount.type === "percentage") {
        return item.price - (item.price * item.discount.value / 100);
    } else {
        return item.price - item.discount.value;
    }
}

function getItemPrice(item) {
    const price = item.discount.length === 0 
        ? item.price
        : calculateDiscountedPrice(item);
    return Number(price.toFixed(2));
}

function renderTotals(totalAmount, shippingPrice) {
    const total = totalAmount + shippingPrice;
    document.querySelector(".shipmentCost").innerHTML = shippingPrice.toFixed(2);
    document.querySelector(".noTaxSum").innerHTML = totalAmount.toFixed(2);

    const taxAmount = (total * 21) / 100;
    document.querySelector(".taxAmount").innerHTML = taxAmount.toFixed(2);

    const totalSum = (taxAmount + total).toFixed(2);
    document.querySelector(".totalSum").innerHTML = totalSum;
    document.querySelector(".sumInWords").innerHTML = convertToLithuanianWords(totalSum);
}

function convertToLithuanianWords(number) {
    const ones = [
        "", "vienas", "du", "trys", "keturi", "penki", "šeši", "septyni", "aštuoni", "devyni",
        "dešimt", "vienuolika", "dvylika", "trylika", "keturiolika", "penkiolika", "šešiolika", "septyniolika", "aštuoniolika", "devyniolika"
    ];
    const tens = [
        "", "", "dvidešimt", "trisdešimt", "keturiasdešimt", "penkiasdešimt", "šešiasdešimt", "septyniasdešimt", "aštuoniasdešimt", "devyniasdešimt"
    ];
    const hundreds = [
        "", "šimtas", "du šimtai", "trys šimtai", "keturi šimtai", "penki šimtai", "šeši šimtai", "septyni šimtai", "aštuoni šimtai", "devyni šimtai"
    ];
    const thousands = [
        "", "tūkstantis", "du tūkstančiai", "trys tūkstančiai", "keturi tūkstančiai", "penki tūkstančiai", "šeši tūkstančiai", "septyni tūkstančiai", "aštuoni tūkstančiai", "devyni tūkstančiai"
    ];
    const millions = [
        "", "milijonas", "du milijonai", "trys milijonai", "keturi milijonai", "penki milijonai", "šeši milijonai", "septyni milijonai", "aštuoni milijonai", "devyni milijonai"
    ];

    // Helper function for converting a number below 1000 into words
    function convertBelowThousand(num) {
        if (num === 0) return "";

        const hundred = Math.floor(num / 100);
        const ten = Math.floor((num % 100) / 10);
        const one = num % 10;

        let result = "";

        if (hundred > 0) {
            result += hundreds[hundred] + " ";
        }

        if (ten > 1) {
            result += tens[ten] + " ";
            result += ones[one];
        } else if (ten === 1) {
            result += ones[10 + one];
        } else {
            result += ones[one];
        }

        return result.trim();
    }

    let integerPart = Math.floor(number);
    const decimalPart = Math.round((number - integerPart) * 100); // Getting the two digits after the decimal point

    let result = "";

    // Handle millions
    if (integerPart >= 1000000) {
        const millionsPart = Math.floor(integerPart / 1000000);
        result += convertBelowThousand(millionsPart) + " ";
    
        if (millionsPart === 1) {
            result += "milijonas ";  // Singular form for 1
        } else if (millionsPart >= 2 && millionsPart <= 9) {
            result += "milijonai ";  // Plural form (for 2-9)
        } else {
            result += "milijonų ";  // Genitive plural form for larger numbers
        }
    
        integerPart %= 1000000;
    }

    // Handle thousands
    if (integerPart >= 1000) {
        const thousandsPart = Math.floor(integerPart / 1000);
        result += convertBelowThousand(thousandsPart) + " ";
    
        if (thousandsPart === 1) {
            result += "tūkstantis ";  // Singular form
        } else if (thousandsPart >= 2 && thousandsPart <= 9) {
            result += "tūkstančiai ";  // Plural form (for 2-9)
        } else if (thousandsPart >= 10 && thousandsPart <= 19) {
            result += "tūkstančių ";  // Plural form (for 2-9)
        }else {
            result += "tūkstančiai ";  // Genitive plural form for larger numbers
        }
    
        integerPart %= 1000;
    }

    // Handle the rest (hundreds, tens, ones)
    result += convertBelowThousand(integerPart);

    // Handling decimal part (centai)
    if (decimalPart > 0) {
        result += ` ir ${convertDecimalToWords(decimalPart)}`;
    }

    return result;
}

// Convert decimal part to Lithuanian (convert to words)
function convertDecimalToWords(decimalPart) {
    const ones = [
        "", "vienas", "du", "trys", "keturi", "penki", "šeši", "septyni", "aštuoni", "devyni"
    ];
    const tens = [
        "", "dešimt", "dvidešimt", "trisdešimt", "keturiasdešimt", "penkiasdešimt", "šešiasdešimt", "septyniasdešimt", "aštuoniasdešimt"
    ];

    let result = "";

    const ten = Math.floor(decimalPart / 10);
    const one = decimalPart % 10;

    if (ten > 0) {
        result += tens[ten] + " ";
    }
    
    if (one > 0) {
        result += ones[one];
    }

    let centWord = "centų";  // Default to 'centų' for teens and numbers divisible by 10
    if (decimalPart === 1 || decimalPart % 10 === 1 && decimalPart !== 11) {
        centWord = "centas";  // Singular form for 1 and numbers ending in 1 but not 11
    } else if (decimalPart >= 2 && decimalPart <= 9 || decimalPart % 10 >= 2 && decimalPart % 10 <= 9) {
        centWord = "centai";  // Plural form for 2-9 or numbers ending in 2-9
    }

    return `${result.trim()} ${centWord}`;
}

renderInvoiceData('https://in3.dev/inv/');
