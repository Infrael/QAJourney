console.log("Hello, I`m an advanced Console A.I.\n\tPlease do not engage with me, as I am shy..");
console.log(document);


const valio = "radai slapta elementa!"

numberis = 100;
var numberis = 50;

let aktyvus = true;
{   
    let aktyvus = false;
    console.log(aktyvus);
    {
        aktyvus = true;
        console.log(aktyvus);
    }

    aktyvus = false;
}

console.log(aktyvus);

console.log("'numberis' times two is = " + numberis * 2);
console.log(typeof valio + "  |  " + typeof numberis);


{
    var disclaimer = document.querySelector('body footer a');
    console.log(disclaimer);

    var disclaimer = document.querySelector('html body b.disclaimer');
    console.log(disclaimer);

    setTimeout( () => {
        disclaimer.innerHTML = "! F12 !";
        document.links.item(0).innerText = "Return Home Now!!";
    }, 10000 );

    console.dir(document);
    console.log(document.body);
    
}
