// ==========================
//صفحة اضافة عقار
//نوع العقار
let typeButtons = document.querySelectorAll(".type-btn");

typeButtons.forEach(function(button){
    button.onclick = function() {  //لما المستخدم يكبس عالزر نفذ الكود
        typeButtons.forEach(function(btn){   //حذف ال active من كل الازرار
            btn.classList.remove("active");
        });
        button.classList.add("active");  //اضافة active للزر الحالي
    };
});
let uploadinput = document.querySelector("#images");
let uploadinputlabel = document.querySelector(".upload-text");
uploadinput.onchange = function() {
    let fileCount = uploadinput.files.length;
    uploadinputlabel.innerHTML = fileCount + `تم اخيار ${fileCount} صورة`; //innerhtml تغير النص داخل العنصر

};
//التحقق من الحقول قبل النشر
let publishButton = document.querySelector(".publish"); //جبت زر النشر

publishButton.onclick = function(e){   //عند الضغط عليه

  e.preventDefault();  //منع اعادة تحميل الصفحة

  //جبت حقل العنوان والسعر والمدينة
  let title = document.querySelector("#title");
  let price = document.querySelector("#price");
  let city = document.querySelector("#city");

  if(       //اذا اي حقل فاضي
    title.value === "" ||
    price.value === "" ||
    city.value === ""
  ){
     alert("الرجاء ملء جميع الحقول المطلوبة");
  }

    // تحديث الصفحة
    else {

      alert("تم إرسال العقار إلى الأدمن للمراجعة");

      location.reload();
      window.location.href = "../views/index.html";

  }

}


//الترحيب
function welcomeMessage(userName){
    return `مرحباً ${userName} في موقع Magic`;
}
console.log(welcomeMessage("Shahed")); //استدعاء الفانكشن

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