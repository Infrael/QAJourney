if (document.querySelector("head title").innerHTML === "Console Work"){
    console.log("Hello, I`m an advanced Console A.I.\n\tPlease do not engage with me, as I am shy..");
}
    
{
    const allAssignments = document.querySelectorAll("main section");

    // 1. Paskaičiuoti klasės “skaiciai” sumą. Rezultatą išvesti į konsolę;
    {
        let totalSum = 0;

        allAssignments[0].querySelectorAll("span").forEach(span =>{
            totalSum += parseFloat(span.innerText);
        });

        console.log(`1. Total Sum of Class "Numbers": ${totalSum}`)
    }
    // 2. Paskaičiuoti klasės “raides” raidžių A ir B bendrą kiekį. Rezultatą išvesti į konsolę;
    {
        let totalSum = 0;
        allAssignments[1].querySelectorAll("span").forEach(span =>{
            let letter = span.innerText;

            if (letter === "A" || letter === "B"){
                span.style.cssText="font-weight: 700;"
                totalSum += 1;
            }
        });

        console.log(`3. Total A's and B's in Class "Letters": ${totalSum}`)
    }

    // 3. Paskaičiuoti klasės “vardai” vardų, kurie yra ne Antanas kiekį. Rezultatą išvesti į konsolę;
    {
        let totalSum = 0;
        allAssignments[2].querySelectorAll("span").forEach(span =>{
            let name = span.innerText;

            if (name === "Antanas"){
                span.style.cssText="font-weight: 700;"
                totalSum += 1;
            }
        });

        console.log(`2. Total Antanas'u in Class "Names": ${totalSum}`)
    }

    // 4. Paskaičiuoti klasės “gyvuliai” gyvulių kiekį (ne span tagų kiekį). Rezultatą išvesti į konsolę;
    {
        let totalSum = 0;
        allAssignments[3].querySelectorAll("span").forEach(span =>{
            let gyvunas = span.innerText;

            if (gyvunas){
                span.style.cssText="font-weight: 700;"
                totalSum += 1;
            }
        });

        console.log(`4. Total Animals in Class "Animals": ${totalSum}`)
    }

    // 5. Paskaičiuoti klasės “vaisiai” raidžių A (didžiųjų ir mažųjų kartu) kiekį. Rezultatą išvesti į konsolę;
    {
        let totalSum = 0;
        allAssignments[4].querySelectorAll("span").forEach(span =>{
            let fruit = span.innerText;

            for (const letter of fruit){
                if (letter === "A" || letter === "a"){
                    span.style.cssText="font-weight: 700;"
                    totalSum += 1;
                }
            }
        });

        console.log(`5. Total A's and a's in Class "Fruits": ${totalSum}`)
    }

    // 6. Paskaičiuoti klasės “miestai” miestų, kurie prasideda K arba baigiasi i kiekį. Rezultatą išvesti į konsolę;
    {
        let totalSum = 0;
        allAssignments[5].querySelectorAll("span").forEach(span =>{
            let city = span.innerText;

            if (city.slice(0, 1) === "K" || city.slice(-1) === "i"){
                span.style.cssText="font-weight: 700;"
                totalSum += 1;
            }

        });

        console.log(`6. Total K's and i's in Class "Cities": ${totalSum}`)
    }

    // 7. Paskaičiuoti klasės “salys” šalių skaičių, kurių pavadinimai ilgesni nei 7 raidės. Rezultatą išvesti į konsolę;
    {
        let totalSum = 0;
        allAssignments[6].querySelectorAll("span").forEach(span =>{
            let country = span.innerText;

            if (country.length > 7){
                span.style.cssText="font-weight: 700;"
                totalSum += 1;
            }

        });

        console.log(`7. 7 or more lettered Countries in Class "Countries": ${totalSum}`)
    }

    // 8. Paskaičiuoti ko daugiau pliusų ar minusų klasėje “pliusai-minusai”. Rezultatą išvesti į konsolę;
    {
        let totalPluses = 0;
        let totalMinuses = 0;

        allAssignments[7].querySelectorAll("span").forEach(span =>{
            let sign = span.innerText;

            if (sign === "+"){
                totalPluses += 1;
            } else {
                totalMinuses += 1;
            }
        });
    
        console.log(`8. Most common sign in Class "Plus&Minus": ${totalPluses > totalMinuses ? "+" : "-"}`)
    }

    // 9. Paskaičiuoti kiek minusų yra klasėje “keisti-minusai”. Rezultatą išvesti į konsolę;
    {
        let totalSum = 0;
        allAssignments[8].querySelectorAll("*").forEach(tag =>{
            let minuses = tag.innerText;

            if (minuses === "-"){
                totalSum += 1;
            }
        });

        console.log(`9. Total Minuses in Class "Weird-Minuses": ${totalSum}`)
    }

    // 10. Paskaičiuoti kiek klasėje “raudonos-salys” yra raudonų šalių. Rezultatą išvesti į konsolę;
    {
        let totalSum = 0;
        allAssignments[9].querySelectorAll("span").forEach(span =>{
            let countryColor = span.style.color;

            if (countryColor === "crimson"){
                totalSum += 1;
            }
        });

        console.log(`10. Total Red State's in Class "Red-States": ${totalSum}`)
    }
}


const miestai = ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys', 'Alytus', 'Marijampolė', 'Mažeikiai', 'Jonava', 'Utena', 'Kėdainiai', 'Telšiai', 'Visaginas', 'Tauragė', 'Ukmergė', 'Plungė', 'Kretinga', 'Šilutė', 'Radviliškis', 'Palanga', 'Druskininkai', 'Rokiškis', 'Šakiai', 'Biržai', 'Elektrėnai', 'Garliava', 'Jurbarkas', 'Švenčionys', 'Lentvaris', 'Anykščiai', 'Prienai', 'Jonava', 'Kaišiadorys', 'Širvintos', 'Kupiškis', 'Zarasai', 'Kelmė', 'Šalčininkai', 'Švenčionėliai', 'Varėna', 'Nemenčinė', 'Trakai', 'Šilalė', 'Kazlų Rūda', 'Šeduva', 'Širvintos', 'Raseiniai', 'Švenčionėliai', 'Šilalė', 'Kazlų Rūda', 'Šeduva', 'Širvintos', 'Raseiniai', 'Švenčionėliai', 'Šilalė', 'Kazlų Rūda', 'Šeduva', 'Širvintos', 'Raseiniai', 'Švenčionėliai', 'Šilalė', 'Kazlų Rūda', 'Šeduva', 'Širvintos', 'Raseiniai', 'Švenčionėliai', 'Šilalė', 'Kazlų Rūda', 'Šeduva'];
 
miestai.forEach( miestas => {
    console.log(miestas.slice(-1))
})