let inputBoxValue = '';
let register = 0;
let requestedOperation = false;
let canStartAnotherOperation = false;
let nextOperation = '';
let equalsCount = 0;
let DEBUG = false;

function resetInputOnStart() {
    $('document').ready(function() {
        clearInput();
        nextOperation = '';
        requestedOperation = false;
        register = 0;
    });
}

function debug() {
    if (DEBUG){
        console.log("register value: " + register);
        console.log("next operation: " + nextOperation);
        console.log("can start another operation: " + canStartAnotherOperation);
        console.log("requested operation: " + requestedOperation);
    }
}

function addEventsToNumbers(numericButtons) {
    numericButtons.each(function() {
        $(this).click(function () {
            if (requestedOperation) {
                register = inputBoxValue;
                clearInput();
                inputBoxValue += $(this).val();
                requestedOperation = false;
            } else if (canStartAnotherOperation){
                clearInput();
                register = 0;
                inputBoxValue += $(this).val();
            } else {
                inputBoxValue += $(this).val();
            }
            canStartAnotherOperation = false;
            visualUpdateInputBox();
            debug();
        });
    });
}

function addEventsToOperations(operationsButtons) {
    operationsButtons.each(function() {
        $(this).click(function () {
            updateNextOperation($(this).html());
            debug();
        });
    });
}

function addResultEvent() {
    $('#equalsButton').click(function () { 
        if ($('#display').val() === '' || requestedOperation) return;
        if (equalsCount === 0) {
            evaluate(nextOperation, register, $('#display').val());    
        } else {
            evaluate(nextOperation, register, $('#display').val());
        }
        // nextOperation = '';
        // requestedOperation = false;
        canStartAnotherOperation = true;
        debug();
    });
}

function evaluate(op, n1, n2) {
    n1 = Number(n1);
    n2 = parseFloat(n2);
    switch(op) {
        case '+':
            register = n1 + n2;
            inputBoxValue = '' + register;
            visualUpdateInputBox();
            break;
        case '-':
            register = n1 - n2;
            inputBoxValue = '' + register;
            visualUpdateInputBox();
            break;
        case '*':
            register = n1 * n2;
            inputBoxValue = '' + register;
            visualUpdateInputBox();
            break;
        case '/':
            let divisor = n2;
            if (divisor === 0) {
                inputBoxValue = 'Error, cannot divide by 0';
            } else {
                inputBoxValue = '' + n1 / divisor;
            }
            visualUpdateInputBox();
            break;
    }
}

function addClearEvent() {
    $('#clearButton').click(function() {
        clearInput();
        register = 0;
        debug();
    });
}

function visualUpdateInputBox() {
    $('#display').val(inputBoxValue);
}

function clearInput() {
    inputBoxValue = '';
    requestedOperation = false;
    visualUpdateInputBox();
}

function updateNextOperation(op) {
    requestedOperation = true;
    if (nextOperation === '') {
        register = inputBoxValue;
    }
    else {
        register = evaluate(nextOperation, register, $('#display').val());
    }
    canStartAnotherOperation = false;
    nextOperation = op;
}

let numericButtons = $('button').filter('.numeric');
let operationsButtons = $('button').filter('.operation');
resetInputOnStart();
addClearEvent();
addEventsToNumbers(numericButtons);
addEventsToOperations(operationsButtons);
addResultEvent();
