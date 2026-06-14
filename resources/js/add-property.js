// ==========================
//صفحة اضافة عقار
//اختيار نوع العقار
let typeButtons = document.querySelectorAll(".type-btn");

typeButtons.forEach(function(button){
    button.onclick = function() {  //لما المستخدم يكبس عالزر نفذ الكود
        typeButtons.forEach(function(btn){   //حذف ال active من كل الازرار
            btn.classList.remove("active");
        });
        button.classList.add("active");  //اضافة active للزر الحالي
    };
});



//التحقق من الحقول قبل النشر
let publishButton = document.querySelector(".publish");

publishButton.onclick = function(e){

    e.preventDefault();

    let title = document.querySelector("#title");
    let price = document.querySelector("#price");
    let city = document.querySelector("#city");

    if (
        title.value === "" ||
        price.value === "" ||
        city.value === ""
    ){
        alert("الرجاء ملء جميع الحقول المطلوبة");
        return;
    }

    let type = document.querySelector(".type-btn.active")?.innerText || "غير محدد";

    let newProperty = {
        title: title.value,
        price: price.value,
        location: city.value,
        type: type,
        status: "pending"
    };

    console.log(newProperty);

    alert("تم إرسال العقار إلى الأدمن للمراجعة");
    //هذه الفكرة للباك بس يتحقق من نشر العقار للادمن يعمل انتقال للصفحة
    window.location.href = "../views/index.html";
};



let reveals =
document.querySelectorAll(".reveal");

window.addEventListener("scroll", function(){

  reveals.forEach(function(card){

    let windowHeight =
    window.innerHeight;

    let cardTop =
    card.getBoundingClientRect().top;

    if(cardTop < windowHeight - 100){

      card.classList.add("active");

    }

  });

});
/*صورة الهوية*/
let identityInput =
document.querySelector("#identityImage");

let identityPreview =
document.querySelector(".identity-preview");

identityInput.onchange = function(){

    let file = identityInput.files[0];

    if (!file) return;

    identityPreview.src =
    URL.createObjectURL(file);

    identityPreview.style.display =
    "block";

};
/*صورة الملكية*/

let ownershipInput =
document.querySelector("#ownershipImage");

let ownershipPreview =
document.querySelector(".ownership-preview");

ownershipInput.onchange = function(){

    let file = ownershipInput.files[0];

    if (!file) return;

    ownershipPreview.src =
    URL.createObjectURL(file);

    ownershipPreview.style.display =
    "block";

};

/*صورة الوكالة*/
let agencyInput =
document.querySelector("#agencyImage");

let agencyPreview =
document.querySelector(".agency-preview");

agencyInput.onchange = function(){

    let file = agencyInput.files[0];

    if (!file) return;

    agencyPreview.src =
    URL.createObjectURL(file);

    agencyPreview.style.display =
    "block";
};


//رفع الصورة
let uploadInput =
document.querySelector("#images");

let uploadText =
document.querySelector(".upload-text");

let previewContainer =
document.querySelector(".preview-container");


uploadInput.onchange = function(){

    let fileCount =
    uploadInput.files.length;

    uploadText.innerHTML =
    "تم اختيار " + fileCount + " صورة";

    previewContainer.innerHTML = "";

    for(let i = 0; i < fileCount; i++){

        let image =
        document.createElement("img");

        image.src =
        URL.createObjectURL(
        uploadInput.files[i]
        );

        previewContainer.appendChild(image);

    }

};

document.querySelector(".cancel").onclick = function () {
    window.location.href = "index.html";
};