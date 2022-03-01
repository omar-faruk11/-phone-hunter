
const getSearchResult = () => {
    document.getElementById('searchError').classList.add('d-none');
    document.getElementById('phoneDetails').innerHTML = '';
    document.getElementById('addPhone').innerHTML = '';
    document.getElementById('phoneDetailsHeading').classList.add('d-none')
    document.getElementById('phoneHeading').classList.add('d-none');
    document.getElementById('hrLine').classList.add('d-none')
    document.getElementById('loading').classList.remove('d-none');
    const searchValue = document.getElementById('searchFild').value;
    const search = searchValue.toLowerCase();
    if (search == '') {
        document.getElementById('loading').classList.add('d-none');
        document.getElementById('phoneDetailsHeading').classList.add('d-none')
        document.getElementById('phoneHeading').classList.add('d-none');

    } else {
        // get api Response
        fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
            .then(res => res.json())
            .then(data => setSearchResult(data.data))
    }
} 

// setSearchResult 
const setSearchResult = phones => {
    const phoneParentDiv = document.getElementById('addPhone');
    console.log(phones)
    const phoneTwenty = phones.slice(0,20);
    console.log(phoneTwenty)
    if(phones == '' ){
        document.getElementById('searchError').classList.remove('d-none');
        document.getElementById('loading').classList.add('d-none');
        document.getElementById('phoneDetailsHeading').classList.add('d-none');
        document.getElementById('phoneHeading').classList.add('d-none');
        
    }
    // display phone 
    phoneTwenty?.forEach(phone => {
        document.getElementById('phoneDetailsHeading').classList.add('d-none')
        document.getElementById('phoneHeading').classList.remove('d-none');
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 border-0 shadow rounded-3">
            <img src="${phone.image}" class="card-img-top my-5 mx-auto phone-size" alt="...">
            <div class="card-body">
            <div class=" d-flex">
                <div> 
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                </div>
                <div class="ms-auto mt-auto">
                <button onclick="seeDetails('${phone.slug}')" class=" btn btn text-white btn-bg-color"> See Details</button>
                </div>
            </div>
            </div>
        </div>`
        phoneParentDiv.appendChild(div);
        document.getElementById('searchFild').value = ''
        document.getElementById('loading').classList.add('d-none');
    });
};
// get phone by using di 
const seeDetails = phoneId => {
    console.log(phoneId)
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
        .then(res => res.json())
        .then(data => phoneDetails(data.data));
}
// display phone details 
const phoneDetails = details => {
    console.log(details.mainFeatures.sensors[0])
    document.getElementById('phoneDetailsHeading').classList.remove('d-none')
    const detailsParentDiv = document.getElementById('phoneDetails');
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('card', 'mb-3', 'w-100', 'mx-auto' ,'shadow', 'rounded-3');
    detailsDiv.innerHTML = `<div class="row g-0">
     <div class="col-md-2">
        <img src="${details.image} " class=" img-fluid p-3 rounded-start" alt="...">
     </div>
        <div class="col-md-6">
            <div class="card-body">
                <h4 class="card-title mb-0 fw-bold"> ${details.name}</h4>
                <p class="primary-color mb-2">${details.releaseDate ? details.releaseDate:'No release day found'}</p>
                <h5 class=" fw-bold" >Main Features:</h5>
                <p class="card-text mb-1"> <span class=" fw-bold">storage:</span> ${details.mainFeatures.storage}</p>
                <p class="card-text mb-1"> <span class=" fw-bold">display Size:</span>  ${details.mainFeatures.displaySize}</p>
                <p class="card-text mb-1"> <span class=" fw-bold">chip Set:</span>  ${details.mainFeatures.chipSet}</p>
                <p class="card-text mb-1"> <span class=" fw-bold">memory:</span>  ${details.mainFeatures.memory}</p>
                <p class="fw-bold mb-0">sensors: </p>
                <ul class="ps-0 list-inline mb-0">
                    <li class=" list-inline-item"> <span class=""><i class="fa-solid fa-circle icon-size primary-color"></span></i> ${details.mainFeatures.sensors[0]}</li>
                    <li class=" list-inline-item"> <span class=""><i class="fa-solid fa-circle icon-size primary-color"></span></i> ${details.mainFeatures.sensors[1]}</li>
                    <li class=" list-inline-item"> <span class=""><i class="fa-solid fa-circle icon-size primary-color"></span></i> ${details.mainFeatures.sensors[2]}</li>.
                    <li class=" list-inline-item"> <span class=""><i class="fa-solid fa-circle icon-size primary-color"></span></i> ${details.mainFeatures.sensors[3]}</li>
                    <li class=" list-inline-item"> <span class=""><i class="fa-solid fa-circle icon-size primary-color"></span></i> ${details.mainFeatures.sensors[4]}</li>
                    <li class=" list-inline-item"> <span class=""><i class="fa-solid fa-circle icon-size primary-color"></span></i> ${details.mainFeatures.sensors[5]}</li>
                </ul>
            </div>
        </div>
            <div class="col-md-4">
                <div class=" card-body">
                    <h5 class=" fw-bold" >others:</h5>
                        <p class="card-text mb-1"> <span class=" fw-bold">WLAN:</span> ${details.others ?.WLAN ? details.others.WLAN:""}</p>
                        <p class="card-text mb-1"> <span class=" fw-bold">Bluetooth:</span>  ${details.others ?.Bluetooth ? details.others.Bluetooth:""}</p>
                        <p class="card-text mb-1"> <span class=" fw-bold">GPS:</span>  ${details.others ?.GPS ? details.others.GPS:""}</p>
                        <p class="card-text mb-1"> <span class=" fw-bold">NFC:</span>  ${details.others ?.NFC ? details.others.NFC:""}</p>
                        <p class="card-text mb-1"> <span class=" fw-bold">Radio:</span>  ${details.others ?.Radio ? details.others.Radio:""}</p>
                        <p class="card-text mb-1"> <span class=" fw-bold">USB:</span>  ${details.others ?.USB ? details.others.USB:""}</p>
                <div>
            </div>
        </div>`
    detailsParentDiv.appendChild(detailsDiv);
    document.getElementById('hrLine').classList.remove('d-none')
}

                        
                       
// document.getElementById('phoneDetails').innerHTML = '';
// document.getElementById('addPhone').innerHTML = '';
// document.getElementById('searchError').classList.remove('d-none');