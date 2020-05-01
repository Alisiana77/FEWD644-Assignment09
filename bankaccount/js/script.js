/*eslint-env browser*/

let $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};




//THE CLOSURE FUNCTION
let bankAccount = (ownerName) => {
    "use strict";
    let balance = 0;
    let owner = ownerName;
    let withdr = 0;
    let deppo = 0;

    let getInfo = function() {
        $("namediv").innerHTML = ownerName;
        $("depdiv").innerHTML = "$" + deppo;
        $("wthdiv").innerHTML = "$" + withdr;
        $("balancediv").innerHTML = "You have  " + "$" + balance + " in your account.";
    };
        getInfo();
        
        return { withdrawal: (withdrawalAmount) => {
            if ( withdrawalAmount === isNaN || withdrawalAmount < 0) {
                window.alert("Invalid input.");
            } else if (withdrawalAmount > balance) {
                window.alert("You have insufficient fund.");
            } else {
                withdr = withdrawalAmount;
                balance -= withdrawalAmount;
                getInfo();

            }

        },

        deposit: (depositAmount) => {
            if (depositAmount === isNaN || depositAmount < 0) {
                window.alert("Invalid input.");
            } else {
                deppo = depositAmount;
                balance += depositAmount;
                getInfo();
            }

        },
        
    };



};

window.addEventListener("load", function () {
    "use strict";

    let account;

    $("name").onclick = function () {
        
        let name = window.prompt("Enter Account's name.");
            account = bankAccount(name);

    };

    $("deposit").onclick = function () {
        
        let depositAmt = window.prompt("Enter deposit amount $");
            account.deposit(Number(depositAmt));

    };

    $("withdraw").onclick = function () {

        let wthdraw = window.prompt("Enter withdraw amount $");
            account.withdrawal(Number(wthdraw));
    };

    

});

