// ==========================
// BrianQRGen Pro
// ==========================

const pages = {
    home: document.getElementById("homePage"),
    generate: document.getElementById("generatePage"),
    scan: document.getElementById("scanPage"),
    history: document.getElementById("historyPage"),
    about: document.getElementById("aboutPage")
};

const generateBtn = document.getElementById("generate");
const downloadBtn = document.getElementById("download");
const input = document.getElementById("text");
const qrContainer = document.getElementById("qrcode");
const historyDiv = document.getElementById("history");
const clearHistory = document.getElementById("clearHistory");

// Show Home when website opens
showPage("home");

// --------------------------
// Navigation
// --------------------------

function showPage(page){

    for(let key in pages){

        pages[key].style.display="none";

    }

    pages[page].style.display="block";

    if(page==="history"){

        loadHistory();

    }

}

// --------------------------
// Generate QR
// --------------------------

generateBtn.onclick=function(){

    let text=input.value.trim();

    if(text===""){

        alert("Please enter text or URL");

        return;

    }

    qrContainer.innerHTML="";

    new QRCode(qrContainer,{

        text:text,

        width:220,

        height:220

    });

    downloadBtn.style.display="block";

    saveHistory(text);

}

// --------------------------
// Download
// --------------------------

downloadBtn.onclick=function(){

    const img=document.querySelector("#qrcode img");

    const canvas=document.querySelector("#qrcode canvas");

    let url="";

    if(img){

        url=img.src;

    }

    if(canvas){

        url=canvas.toDataURL();

    }

    if(url!==""){

        const link=document.createElement("a");

        link.href=url;

        link.download="BrianQRGen.png";

        link.click();

    }

}

// --------------------------
// History
// --------------------------

function saveHistory(text){

    let history=JSON.parse(localStorage.getItem("qrHistory"))||[];

    history=history.filter(item=>item!==text);

    history.unshift(text);

    history=history.slice(0,10);

    localStorage.setItem("qrHistory",JSON.stringify(history));

}

function loadHistory(){

    historyDiv.innerHTML="";

    let history=JSON.parse(localStorage.getItem("qrHistory"))||[];

    history.forEach(item=>{

        let div=document.createElement("div");

        div.className="history-item";

        div.innerHTML=item;

        div.onclick=function(){

            showPage("generate");

            input.value=item;

        };

        historyDiv.appendChild(div);

    });

}

clearHistory.onclick=function(){

    localStorage.removeItem("qrHistory");

    loadHistory();

}