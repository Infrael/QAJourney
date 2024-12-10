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
    document.querySelector(".totalSum").innerHTML = (taxAmount + total).toFixed(2);
}

renderInvoiceData('https://in3.dev/inv/');
