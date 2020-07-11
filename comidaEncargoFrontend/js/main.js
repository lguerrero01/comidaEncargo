const renderItem = (item) => {
    return `<li class="list-group-item"> ${item.name} </li> `
}
window.onload = () => {
    fetch('http://localhost:3000/api/getMeals', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'aplication/json'
        },
        redirect: 'follow',

    })
        .then(response => response.json())
        .then(data => {
            const mealsList = document.getElementById('meals-list')
            const submit = document.getElementById('submit')
            const template = data.map(item => renderItem(item)).join('')
            mealsList.innerHTML = template
            submit.removeAttribute('disabled')
        })
}