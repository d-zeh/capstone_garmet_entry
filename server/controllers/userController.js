let database = [
    {

        name: "Checkered Jeans",
        size: "Medium",
        season: "Fall",
        department: "Infant",
        price: 12,
        purchased: 7,
        aquired: "JCP",
        netProfit: 5,
        referenceNum: "001" 
    },
    {
        name: "Striped Shirt",
        size: "Large",
        season: "Summer",
        department: "Men",
        price: 20,
        purchased: 10,
        aquired: "Macy's",
        netProfit: 10,
        referenceNum: "002"
    },
    {
        name: "Floral Dress",
        size: "Small",
        season: "Spring",
        department: "Women",
        price: 30,
        purchased: 15,
        aquired: "Nordstrom",
        netProfit: 15,
        referenceNum: "003"
    },
    {
        name: "Cargo Shorts",
        size: "X-Large",
        season: "Summer",
        department: "Men",
        price: 25,
        purchased: 12,
        aquired: "Kohl's",
        netProfit: 13,
        referenceNum: "004"
    },
    {
        name: "Knit Sweater",
        size: "Medium",
        season: "Winter",
        department: "Women",
        price: 40,
        purchased: 20,
        aquired: "H&M",
        netProfit: 20,
        referenceNum: "005"
    }

];

module.exports = {
   adder: (req, res) => {
        req.body.referenceNum = `00${database.length +1}`
        database.push(req.body)
        console.log(req.body)
        res.status(200).send(`The garmet has been added.`)
},

    getInventory: (req, res) => {
        console.log(database);
        res.status(200).send(database)
},

    refLookup: (req,res) => {
        let a = parseInt(req.params.reference) -1;
        console.log(database[a])
        res.status(200).send(database[a])
},

    categoryLookup: (req, res) => {
        const { name, size, season, department, price, purchased, aquired } = req.query;

        const results = database.filter(item => {
            let matches = true;

            if ((name && item.name !== name) || name !== "") {
                matches = false;
            }
            if ((size && item.size !== size) || size !== "") {
                matches = false;
            }
            if ((department && item.department !== department) || department !== "") {
                matches = false;
            }
            if ((season && item.season !== season) || season !== "") {
                matches = false;
            }
            if ((price && item.price !== price) || price !== "") {
                matches = false;
            }
            if ((purchased && item.purchased !== purchased) || purchased !== "") {
                matches = false;
            }
            if ((aquired && item.aquired !== aquired) || aquired !== "") {
                matches = false;
            }
    
            return matches;
        });
    
        res.status(200).send(results);
    },



    }
