async function renderInvoiceData(webLink) {
    const apiData = await fetch(webLink).then(response => response.json());
    console.log(apiData)

    // Header Info
    document.querySelector(".invoiceSeries").innerHTML = apiData.number.split('-')[0];
    document.querySelector(".invoiceNumber").innerHTML = apiData.number.split('-')[1];
    document.querySelector(".date").innerHTML = apiData.date;
    document.querySelector(".due_date").innerHTML = apiData.due_date;

    // Main Info
    Object.entries(apiData.company).forEach(([party, details]) => {
        document.querySelector(`.${party}Name`).innerHTML = details.name;

        document.querySelector(`.${party}Code`).innerHTML = details.code;
        document.querySelector(`.${party}Vat`).innerHTML = details.vat;
        document.querySelector(`.${party}Address`).innerHTML = details.address;

        document.querySelector(`.${party}Phone`).innerHTML = details.phone;
        document.querySelector(`.${party}Email`).innerHTML = details.email;
        document.querySelector(`.${party}Email`).href += details.email;
    });

    // Section Info
    const table = document.querySelector(".itemTable");
    const lastRow = table.querySelector(".listEnd");

    let totalAmount = 0;

    apiData.items.forEach(item => {
        const row = document.createElement("tr");

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = item.description;

        const quantityCell = document.createElement("td");
        quantityCell.textContent = item.quantity;

        let price = item.price;

        const priceCell = document.createElement("td");
        if(item.discount.length == 0){
            priceCell.textContent = item.price.toFixed(2);
        } else {
            const originalPrice = document.createElement("span");
            originalPrice.textContent = item.price.toFixed(2);
            originalPrice.style.textDecoration = "line-through";

            const discountMessage = document.createElement("span");
            if(item.discount.type === "percentage"){
                price = item.price - (item.price * item.discount.value / 100);
                discountMessage.textContent = ` ${price.toFixed(2)}`;
            } else {
                price = item.price - item.discount.value;
                discountMessage.textContent = ` ${price.toFixed(2)}`;
            }

            priceCell.appendChild(originalPrice);
            priceCell.appendChild(discountMessage);
        }

        const sumCell = document.createElement("td");
        const sum = item.quantity * price;
        sumCell.textContent = sum.toFixed(2);
        totalAmount += sum;

        row.appendChild(descriptionCell);
        row.appendChild(quantityCell);
        row.appendChild(priceCell);
        row.appendChild(sumCell);

        table.querySelector("tbody").insertBefore(row, lastRow);
    });
    
    document.querySelector(".shipmentCost").innerHTML = apiData.shippingPrice.toFixed(2);
    totalAmount += apiData.shippingPrice;
    document.querySelector(".noTaxSum").innerHTML = totalAmount.toFixed(2);

    const taxAmount = (totalAmount * 21) / 100;
    document.querySelector(".taxAmount").innerHTML = taxAmount.toFixed(2);

    document.querySelector(".totalSum").innerHTML = (taxAmount + totalAmount).toFixed(2);
}

renderInvoiceData('https://in3.dev/inv/');
