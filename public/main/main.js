//=========================================
// API
//=========================================

const API = "http://127.0.0.1:8000/api";

const container = document.querySelector(".property-grid");


//=========================================
// تحميل العقارات
//=========================================

window.onload = function () {

    loadProperties();

}


//=========================================
// جلب العقارات
//=========================================

async function loadProperties() {

    try {

        let response = await fetch(API + "/real-estate");

        let data = await response.json();

        renderProperties(data.real_estates.data);

    }

    catch (error) {

        console.log(error);

    }

}


//=========================================
// عرض العقارات
//=========================================

function renderProperties(properties) {

    container.innerHTML = "";

    properties.forEach(function(property) {

        let image = "/images/default.jpg";

        if(property.pictures.length > 0){

            image =
            "http://127.0.0.1:8000/storage/" +
            property.pictures[0].image_path;

        }

        container.innerHTML += `

        <div class="property-card"
             data-id="${property.id}">

            <div style="position:relative;">

                <img src="${image}">

                <span class="tag">

                    ${property.contract_type=="sale" ? "بيع" : "إيجار"}

                </span>

            </div>

            <div class="content">

                <div class="price">

                    ${property.price}$

                </div>

                <h4>

                    ${property.type_real_estate}

                </h4>

                <p>

                    ${property.address}

                </p>

                <div class="details">

                    <span>${property.bedrooms} غرف</span>

                    <span>${property.bathrooms} حمامات</span>

                    <span>${property.size} م²</span>

                </div>

            </div>

        </div>

        ;`

    });

}


//=========================================
// البحث والفلترة
//=========================================

document
.getElementById("searchBtn")
.addEventListener("click", searchProperties);


async function searchProperties() {

    let city =
    document.getElementById("city").value;

    let type =
    document.getElementById("type").value;

    let state =
    document.getElementById("state").value;

    let price =
    document.getElementById("price").value;

    let url = API + "/real-estate?";



    //----------------------------------

    if(city){

        url += "address=" + city + "&";

    }

    //----------------------------------

    if(type){

        url +=
        "type_real_estate=" + type + "&";

    }

    //----------------------------------

    if(state){

        url +=
        "contract_type=" + state + "&";

    }

    //----------------------------------

    if(price=="low"){

        url +=
        "max_price=500000&";

    }

    else if(price=="medium"){

        url +=
        "min_price=500000&max_price=2000000&";

    }

    else if(price=="high"){

        url +=
        "min_price=2000000&";

    }

    //----------------------------------

    let response =
    await fetch(url);

    let data =
    await response.json();

    renderProperties(data.real_estates.data);

}
