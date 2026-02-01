const personForm = document.getElementById('personForm')
const personInput = document.getElementById('personInput')
const personList = document.getElementById('peopleList')

const expenseForm = document.getElementById('expenseForm')
const descInput = document.getElementById('descinput')
const amountInput = document.getElementById('amountInput')
const paidBySelect = document.getElementById('paidBySelect')
const expenseList = document.getElementById('expenseList')

const totalSpent = document.getElementById('totalSpent')
const splitAmuont = document.getElementById('splitAmount')
const summaryList = document.getElementById('summaryList')

const people = []
const expenses = [{
    desc: 'Sodas',
    amount: 10,
    paidBy: 'Carlos'

}]

const render = () => {
    peopleList.innerHTML = ''
    paidBySelect.innerHTML = ''

    people.forEach(person => {
        const li = document.createElement('li')
        li.textContent = person
        peopleList.appendChild(li)

        const option = document.createElement('option')
        option.value = person
        option.textContent = person
        paidBySelect.appendChild(option)
    })


    expenseList.innerHTML = ''
    expenses.forEach(expense => {
        const li = document.createElement('li')
        li.textContent = `${expense.desc} - ${expense.amount.toFixed(2)} Paid by ${expense.paidBy}`
        expenseList.appendChild(li)
    })

    renderSummary()
}

const renderSummary = () => {
    summaryList.innerHTML = ''

    if(people.length === 0) {
        totalSpent.textContent = '$0.00'
        splitAmount.textContent = '$0.00'
        return
    }
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)
    const share = total / people.length

    totalSpent.textContent = `$${total.toFixed(2)}`
    splitAmount.textContent = `$${total.toFixed(2)}`

    people.forEach(person => {
        const paid = expenses.filter(exp => exp.paidBy === person).reduce((sum, exp) => sum + exp.amount, 0)

        const balance = paid - share

        const li = document.createElement('li')
        li.textContent =
        blanace >= 0
        ? `${person} gets $${balance.toFixed(2)}`
        : `${person} owes $${Math.abs(balance.toFixed(2))}`

        summaryList.appendChild('li')
    })

}

personForm.addEventListener('submit', event => {
    event.preventDefault()

    const name = personInput.value.trim()

    if(!name) return

    people.push(name)
    personInput.value = ''

    render()

})

expenseForm.addEventListener('submit', event => {
    event.preventDefault()

    const desc = descInput.value.trim()
    const amount = parseFloat(amountInput.value)
    const paidBy = paidBySelect.value

    if(!desc || !amount || !paidBy) return

    expenseList.push({
        desc, amount, paidBy
    })

    descInput.value = ''
    amountInput.value = ''

    render()
})

render()