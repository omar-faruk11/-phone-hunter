const getSearchResult = () => {
    const searchValue = document.getElementById('searchFild').value;
    const search = searchValue.toLowerCase();
    if (search == '') {

    } else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
            .then(res => res.json())
            .then(data => setSearchResult(data.data))
    }
}
const setSearchResult = (phones) => {
    const parentDiv = document.getElementById('addPhone');
    phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card h-100 border-0 shadow rounded-3">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <button onclick="seeDetails()" class=" btn btn text-white btn-bg-color "> See Details</button>
            </div>
        </div>`
        parentDiv.appendChild(div);
    });
}