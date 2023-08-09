//Connect Check
console.log("JS has been connected");


//Grab buttons and info from html
let allLookupBtn = document.getElementById('allInvLookup');
let garmetNameAdd = document.querySelector('#garmetName_id');
let garmetSizeAdd = document.querySelector('#addGarmet-size');
let garmetSeasonAdd = document.querySelector('#addGarmet-season');
let garmetDeptAdd = document.querySelector('#addGarmet-dept')
let sellingPriceAdd = document.querySelector('#addGarmet-selling');
let purchasedPriceAdd = document.querySelector('#addGarmet-purchased');
let aquiredFromAdd = document.querySelector('#addGarmet-aquired');
let addInventoryBtn = document.querySelector('#addInvbutton');
let referenceNumberLookup = document.querySelector('#referenceNum');
let searchBtn = document.querySelector('#searchBtn');

let garmetNameLookup = document.querySelector("#garmetName_idlookup")
let garmetSizeLookup = document.querySelector('#lookupGarmet-size')
let garmetSeasonLookup = document.querySelector('#lookupGarmet-season')
let garmetDeptLookup = document.querySelector('#lookupGarmet-dept')
let garmetSellingLookup = document.querySelector('#lookupGarmet-selling')
let garmetPurchasedLookup = document.querySelector('#lookupGarmet-purchased')
let garmetAquiredLoookup = document.querySelector('#lookupGarmet-aquired')








// let adminUsername = document.querySelector('#adminUsername')
// let adminPassword = document.querySelector('#adminPassword')

// let employeeUsername = document.querySelector('#empUsername')
// let employeePasswork = document.querySelector('#empPassword')

// let adminBtn = document.querySelector('#adminBtn')
// let employeeBtn = document.querySelector('#employeeBtn')


// //adminBtn.addEventListener('click', ________);
// //employeeBtn.addEventListener('click', ________);


























//FUNCTIONS

let num = 5;

//add Garmet function
addInventoryBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if (
        garmetNameAdd.value == '' ||
        garmetSizeAdd.value == '' ||
        garmetDeptAdd.value == '' ||
        sellingPriceAdd.value == ''
    ) {
        alert('Please fill out all required fields, mom!!');
        return;
    }
    num ++;
    let newGarmet = {
        name: garmetNameAdd.value,
        size: garmetSizeAdd.value,
        season: garmetSeasonAdd.value,
        department: garmetDeptAdd.value,
        price: sellingPriceAdd.value,
        purchased: purchasedPriceAdd.value,
        aquired: aquiredFromAdd.value,
        netProfit: parseFloat(sellingPriceAdd.value) - parseFloat(purchasedPriceAdd.value),
        referenceNum: num.toString().padStart(3, '0')
    };
    console.log(newGarmet);
    axios

        .post('http://localhost:5050/api/garmentAdd', newGarmet)
        .then(res => {
            console.log(res.data);

            garmetNameAdd.value = '';
            garmetSizeAdd.value = '';
            garmetSeasonAdd.value = '';
            garmetDeptAdd.value = '';
            sellingPriceAdd.value = '';
            purchasedPriceAdd.value = '';
            aquiredFromAdd.value = '';

            alert(`The ${newGarmet.name} has been added. Reference Number: 000-${newGarmet.referenceNum}`)
        }
            
        )
});




//Show all Inventory button
allLookupBtn.addEventListener('click', () => {
    console.log("hi")
    axios
        .get('http://localhost:5050/api/inventory')
        .then(res => console.log(res.data))
});

//Lookup garmet by reference number
searchBtn.addEventListener('click', () => {

    if(referenceNumberLookup.value !== "") {
        console.log("hiiiiiiiiiiiiiiiiiiiiiiiiii")
            axios
                .get(`http://localhost:5050/api/inventory/${referenceNumberLookup.value}`)
                .then(res => console.log(res.data))
                .catch(error => console.log(error))
    } else if( 
    garmetNameLookup.value !== "" ||
    garmetSizeLookup.value !== "" ||
    garmetSeasonLookup.value !== "" ||
    garmetDeptLookup.value !== "" ||
    garmetSellingLookup.value !== "" ||
    garmetPurchasedLookup.value !== "" ||
    garmetAquiredLoookup.value !== "") {
        console.log("working")
    const nonNullParams = {
        name: garmetNameLookup.value,
        size: garmetSizeLookup.value,
        season: garmetSeasonLookup.value,
        department: garmetDeptLookup.value,
        price: garmetSellingLookup.value,
        purchased: garmetPurchasedLookup.value,
        aquired: garmetAquiredLoookup.value};

    const queryString = Object.keys(nonNullParams)
        .filter(key => nonNullParams[key] !== "")
        .map(key => `${key}=${encodeURIComponent(nonNullParams[key])}`)
        .join('&');

        axios
            .get(`http://localhost:5050/api/inventory?${queryString}`)
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
    

}else {
    console.log("Fill in a search criteria!")
}
});
