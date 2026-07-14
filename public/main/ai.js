const aiButton = document.getElementById("aiButton");
const aiChat = document.getElementById("aiChat");
const closeChat = document.getElementById("closeChat");

const sendButton = document.getElementById("sendButton");
const userInput = document.getElementById("userInput");

const messages = document.getElementById("messages");

let isLoading = false;
// Open Chat
aiButton.addEventListener("click",()=>{
    aiChat.style.display="flex";
});
// Close Chat
closeChat.addEventListener("click",()=>{
    aiChat.style.display="none";
});
// Send Events
sendButton.addEventListener(
    "click",
    sendMessage
);
userInput.addEventListener(
    "keydown",
    (event)=>{
        if(event.key==="Enter"){
            sendMessage();
        }
    }
);
// Main Chat Function
async function sendMessage(){
    if(isLoading)
        return;
    const message =
    userInput.value.trim();
    if(!message)
        return;
    addMessage(
        message,
        "user-message"
    );
    userInput.value="";
    // Frontend protection only
    if(!isRealEstateQuestion(message)){
        addMessage(
        `
        🏠 أنا مساعد عقاري متخصص فقط.
        <br><br>
        أستطيع مساعدتك في البحث عن العقارات حسب:
        <br>
        • نوع العقار
        <br>
        • السعر
        <br>
        • المنطقة
        <br>
        • عدد الغرف
        <br>
        • المساحة
        <br>
        • الحمامات
        <br>
        • المميزات

        `,

        "bot-message"
        );
        return;
    }
    isLoading=true;
    const loading =
    addMessage(
        "🔎 جاري البحث عن العقار المناسب...",
        "bot-message"
    );
    try{
        const realEstates =
        await searchRealEstate(message);
        loading.remove();
        showRealEstates(realEstates);
    }
    catch(error){
        loading.remove();
        addMessage(
        `
        حدث خطأ أثناء الاتصال بالخادم.
        <br>
        يرجى المحاولة لاحقاً.
        `,
        "bot-message"
        );
        console.error(
            error
        );
    }
    finally{
        isLoading=false;
    }
}
// Send To Backend
async function searchRealEstate(message){
    const response =
    await fetch(
        "/api/ai/search",
        {
            method:"POST",
            headers:{
                "Content-Type":
                "application/json"
            },
            body:
            JSON.stringify({
                message:message
            })
        }
    );
    if(!response.ok){
        throw new Error(
            "Backend Error"
        );
    }
    const data =
    await response.json();
    return data;
}
// Add Message
function addMessage(text,className){
    const div =
    document.createElement("div");
    div.className =
    className;
    div.innerHTML =
    text;
    messages.appendChild(div);
    messages.scrollTop =
    messages.scrollHeight;
    return div;
}
// Frontend Real Estate Gate
// Only First Protection
function isRealEstateQuestion(message){
    const text =
    message
    .toLowerCase()
    .trim();

    const keywords=[

        "عقار",
        "عقارات",

        "شقة",
        "شقق",

        "فيلا",

        "بيت",
        "منزل",

        "ارض",
        "أرض",


        "شراء",
        "بيع",

        "ايجار",
        "إيجار",


        "غرفة",
        "غرف",

        "حمام",
        "حمامات",


        "مساحة",
        "متر",


        "سعر",
        "ميزانية",


        "مسبح",

        "حديقة",

        "موقف",

        "كراج",

        "مصعد",

        "بلكون",


        "منطقة",

        "حي",

        "مدينة"
    ];
    return keywords.some(keyword =>
        text.includes(keyword)
    );
}
// Display Results
function showRealEstates(realEstates){
    if(
        !realEstates ||
        realEstates.length===0
    ){
        addMessage(
        "لم أجد عقارات مطابقة لطلبك.",
        "bot-message"
        );
        return;
    }
    let html =
    `
    وجدت ${realEstates.length} عقار مناسب:
    <br><br>
    `;
    realEstates.forEach(realEstate=>{
        html +=
        `
        <div class="realestate-card">
            <b>
            ${realEstate.title || "عقار"}
            </b>
            <br>
            السعر:
            ${realEstate.price || "-"}
            <br>
            الموقع:
            ${realEstate.location || "-"}
            <br>
            التفاصيل:
            ${realEstate.description || ""}
        </div>
        <hr>
        `;
    });
    addMessage(
        html,
        "bot-message"
    );
}