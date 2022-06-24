class Calculator {
    constructor(previousOperationTextElement, currentOperationTextElement) {
        this.previousOperationTextElement = previousOperationTextElement
        this.currentOperationTextElement = currentOperationTextElement
        this.clearAll()
    }

    delete(){
        this.currentOperation = this.currentOperation.toString().slice(0, -1) 
    }

    clearAll(){
        this.previousOperation = ''
        this.currentOperation = ''
        this.operation = undefined
    }

    appendNumber(number){
        if (number === '.' && this.currentOperation.includes('.')) return
        this.currentOperation = this.currentOperation.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperation === '')return
        if(this.previousOperation !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperation = this.currentOperation
        this.currentOperation = ''
    }

    compute(){
        let computations
        const previous = parseFloat(this.previousOperation)
        const current = parseFloat(this.currentOperation)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computations = previous + current
            break
          case '-':
            computations = previous - current
            break
          case '*':
            computations = previous * current
            break
          case '÷':
            computations = previoous / current
            break
          default:
            return
        }
        this.currentOperation = computations
        this.operation = undefined
        this.previousOperation = ''
    }

    updateDisplay(){
        if(this.operation === undefined){
            this.operation = ''}
        this.currentOperationTextElement.innerText = this.currentOperation
        this.previousOperationTextElement.innerText = this.previousOperation + ' ' + this.operation
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperationTextElement = document.querySelector('[data-previous-operations]');
const currentOperationTextElement = document.querySelector('[data-current-operations]');

const calculator = new Calculator(previousOperationTextElement,currentOperationTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clearAll()
    calculator.updateDisplay()
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})