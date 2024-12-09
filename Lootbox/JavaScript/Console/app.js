if (document.querySelector("head title").innerHTML === "Console Work"){
    console.log("Hello, I`m an advanced Console A.I.\n\tPlease do not engage with me, as I am shy..");
}

{
    class Kibiras1{

        constructor(){
            this.amountOfRocks = 0;
        }

        addOneRock(){
            this.amountOfRocks += 1;
        }

        addManyRocks(amount){
            this.amountOfRocks += amount;
        }

        countAndTell(){
            console.log(this.amountOfRocks);
        }
    }


    let myBucket = new Kibiras1();

    myBucket.countAndTell();
    myBucket.addOneRock();
    myBucket.addOneRock();
    myBucket.countAndTell();
    myBucket.addManyRocks(8);
    myBucket.addManyRocks(10);
    myBucket.countAndTell();
    console.log("- - - - - - - - - - - - -")
}

{
    class Wallet{
        constructor(){
            this.smallMoney = 0;
            this.bigMoney = 0;
        }

        addMoney(amount){
            if (amount < 0){
                return;
            } else if (amount <= 2){
                this.smallMoney += amount;
            } else {
                this.bigMoney += amount;
            }
        }

        countMoney(){
            console.log(this.smallMoney + this.bigMoney);
        }
    }

    let myWallet = new Wallet();

    myWallet.addMoney(5);
    myWallet.addMoney(-5);
    myWallet.addMoney(1);
    myWallet.addMoney(1);
    myWallet.addMoney(3);

    myWallet.countMoney();

    console.log("- - - - - - - - - - - - -")
}

{
    class Bus{
        static totalPassengers = 0;

        static modifyTotalPassengers(amount){
            this.totalPassengers += amount;
        }
        
        static totalTraffic(){
            console.log(this.totalPassengers)
        }

        constructor(){
            this.passengers = 0;                
        }

        offBoarding(amount){
            if (this.passengers + amount < 0){
                return;
            } else {
                this.passengers += amount;
                this.constructor.modifyTotalPassengers(amount);
            }
        }

        onBoarding(amount){
            this.passengers += amount;
            this.constructor.modifyTotalPassengers(amount);
        }
        
        driving(){
            console.log(`On this Bus, there ${(this.passengers == 1 ? "is 1 passenger."  : "are " + this.passengers + " passengers")}`);
        }
    }

    let bus1 = new Bus();
    let bus2 = new Bus();


    bus1.onBoarding(1);
    bus1.driving();
    bus1.onBoarding(9);
    bus1.driving();
    bus2.onBoarding(5);
    bus2.driving();
    bus2.offBoarding(-6);
    bus2.driving();
    bus2.offBoarding(-4);
    bus2.driving();

    Bus.totalTraffic();

    console.log("- - - - - - - - - - - - -")
}

// 8.
{
    class Glass{
        constructor(volume){
            this.volume = volume;
            this.amount = 0;
        }

        addLiquid(amount){
            while (amount > 0 && this.amount < this.volume){
                this.amount++;
                amount--;
            }
        }

        emptyContainer(){
            console.log(`${this.amount == 0 ? "The Glass is empty." : this.amount + "units poured out."}`)
            this.amount = 0;
        }

        estimateAmount(){
            console.log(`The Glass currently holds approximately ${this.amount}units`)
        }
    }

    let bigGlass = new Glass(200);
    let mediumGlass = new Glass(150);
    let smallGlass = new Glass(100);

    bigGlass.emptyContainer();
    bigGlass.addLiquid(200);
    bigGlass.estimateAmount();

    mediumGlass.addLiquid(bigGlass.amount);
    mediumGlass.estimateAmount();

    smallGlass.addLiquid(mediumGlass.amount);
    smallGlass.estimateAmount();
    smallGlass.emptyContainer();
}

// 9.
{
    class Basket{
        #storedItems = new Map();

        constructor(size = 500){
            this.size = size;
            this.amount = 0;
        }

        addItem(item, amount){
            if (this.amount > this.size){
                console.log(item + " fell off the Basket :(")
            } else {
                this.amount += amount;
                this.#storedItems.set(["weight", amount], item)
            }            
        }

        showAllItems(){
            console.log(this.#storedItems)
        }
    }

    class Mushroom{
        constructor(isEdible = Math.random() < 0.5, isHealthy = Math.random() < 0.5, size = Math.floor(Math.random() * (45 - 5 + 1)) + 5){
            this.isEdible = isEdible;
            this.isHealthy = isHealthy;
            this.size = size;
        }

        static goShrooming(myStorage){
        
            if (!(myStorage instanceof Basket)){
                return;
            }
        
            while (myStorage.size > myStorage.amount){
                let newMushroom = new Mushroom();
                
                if (newMushroom.isEdible && newMushroom.isHealthy){
                    myStorage.addItem("Mushroom", newMushroom.size);
                    console.log(`An edible, and healthy Mushroom has been added.`)
                }

            }
            
            console.log(`Basket was filled with ${myStorage.amount}units of items.`);
            return myStorage;
        }
    }

    myShroomsket = Mushroom.goShrooming(new Basket());
    myShroomsket.showAllItems();
    myShroomsket.addItem("Mushroom", (new Mushroom(true, true, 50)).size)
}
