const getSearchResult = () => {
    document.getElementById('searchError').classList.add('d-none');
    document.getElementById('phoneDetails').innerHTML = '';
    document.getElementById('addPhone').innerHTML = '';
    document.getElementById('loading').classList.remove('d-none');
    const searchValue = document.getElementById('searchFild').value;
    const search = searchValue.toLowerCase();
    if (search == '') {
        document.getElementById('phoneDetails').innerHTML = '';
        document.getElementById('addPhone').innerHTML = '';
        document.getElementById('searchError').classList.remove('d-none');
        document.getElementById('loading').classList.add('d-none');

    } else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
            .then(res => res.json())
            .then(data => setSearchResult(data.data))
    }
}
const setSearchResult = phones => {
    const phoneParentDiv = document.getElementById('addPhone');
    console.log(phones)
    if(phones == '' ){
        document.getElementById('searchError').classList.remove('d-none');
        document.getElementById('loading').classList.add('d-none');
    }
    phones?.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 border-0 shadow rounded-3">
            <img src="${phone.image}" class="card-img-top px-5 pt-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <button onclick="seeDetails('${phone.slug}')" class=" btn btn text-white btn-bg-color "> See Details</button>
            </div>
        </div>`
        phoneParentDiv.appendChild(div);
        document.getElementById('searchFild').value = ''
        document.getElementById('loading').classList.add('d-none');
    });
};

const seeDetails = phoneId => {
    console.log(phoneId)
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
        .then(res => res.json())
        .then(data => phoneDetails(data));
}

const phoneDetails = details => {
    console.log(details.data.releaseDate)
    const detailsParentDiv = document.getElementById('phoneDetails');
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('card', 'mb-3', 'w-75', 'mx-auto');
    detailsDiv.innerHTML = `<div class="row g-0">
     <div class="col-md-4">
        <img src="${details.data.image} " class="img-fluid rounded-start" alt="...">
     </div>
     <div class="col-md-8">
      <div class="card-body">
      <h5 class="card-title"> ${details.data.name}</h5>
      <h6 >Details:</h6>
      <ul>
          <li class="card-text">storage: ${details.data.mainFeatures.storage}</li>
          <li class="card-text">displaySize: ${details.data.mainFeatures.displaySize}</li>
          <li class="card-text">chipSet: ${details.data.mainFeatures.chipSet}</li>
          <li class="card-text">memory: ${details.data.mainFeatures.memory}</li>
      </ul>
      <p class="primary-color"> releaseDate: ${details.data.releaseDate ? details.data.releaseDate:'No release data' }</p>
      </div>
    </div>
  </div>`
    detailsParentDiv.appendChild(detailsDiv);
}