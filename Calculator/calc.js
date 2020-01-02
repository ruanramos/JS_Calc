let inputBoxValue = '';
let register = 0;
let requestedOperation = false;
let nextOperation = '';

function resetInputOnStart() {
    $('document').ready(function() {
        clearInput();
        nextOperation = '';
        requestedOperation = false;
    });
}

function addEventsToNumbers(numericButtons) {
    numericButtons.each(function() {
        $(this).click(function () {
            if (requestedOperation) {
                storeNumber();
                clearInput();
                inputBoxValue += $(this).val();
                requestedOperation = false;
            } else {
                inputBoxValue += $(this).val();
            }
            visualUpdateInputBox();
        });
    });
}

function addEventsToOperations(operationsButtons) {
    operationsButtons.each(function() {
        $(this).click(function () {
            updateNextOperation($(this).html());
        });
    });
}

function addResultEvent() {
    $('#equalsButton').click(function () { 
        switch(nextOperation) {
            case '+':
                register = Number(register) + parseFloat($('#display').val());
                inputBoxValue = '' + register;
                visualUpdateInputBox();
                break;
            case '-':
                register = Number(register) - parseFloat($('#display').val());
                inputBoxValue = '' + register;
                visualUpdateInputBox();
                break;
            case '*':
                register = Number(register) * parseFloat($('#display').val());
                inputBoxValue = '' + register;
                visualUpdateInputBox();
                break;
            case '/':
                let divisor = parseFloat($('#display').val())
                if (divisor === 0) {
                    inputBoxValue = 'Error, cannot divide by 0';
                } else {
                    register = Number(register) / divisor;
                    inputBoxValue = '' + register;
                }
                visualUpdateInputBox();
                break;
        }
        nextOperation = '';
        requestedOperation = false;
    });
}

function addClearEvent() {
    $('#clearButton').click(clearInput);
}

function storeNumber() {
    register = inputBoxValue;
}

function visualUpdateInputBox() {
    $('#display').val(inputBoxValue);
}

function clearInput() {
    inputBoxValue = '';
    visualUpdateInputBox();
}

function updateNextOperation(op) {
    requestedOperation = true;
    nextOperation = op;
    console.log('UpdatedNextOperation: ' + nextOperation);
}

let numericButtons = $('button').filter('.numeric');
let operationsButtons = $('button').filter('.operation');
resetInputOnStart();
addClearEvent();
addEventsToNumbers(numericButtons);
addEventsToOperations(operationsButtons);
addResultEvent();
