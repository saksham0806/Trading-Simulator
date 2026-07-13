console.log("running")

async function addStock(symbol,quantity,initialBuy,currentSell){
    let table = document.querySelector(".stocksInInventory tbody");
    let row = document.createElement("tr");
    row.innerHTML = `
            <td>${symbol}</td>
            <td>${quantity}</td>
            <td>$${initialBuy}</td>
            <td>$${currentSell}</td>
            <td>$${quantity*currentSell}</td>`;
    table.append(row);

}

addStock("ASD",23,233,422);
addStock("AMAZON",123,23433,45622);

let rows = document.querySelectorAll(".stocksInInventory tbody tr");
rows.forEach(i => {
    i.addEventListener("click",()=>{
        let pagestock = i.querySelectorAll("td")[0].textContent;
        console.log(pagestock);
        document.location.href = `http://${window.location.host}/stock/${pagestock}`;
    })
});

console.log(rows);