user = document.getElementById("user");
biog = document.getElementById("biog");



nameSub = document.getElementById("nameSub");
biogSub = document.getElementById("biogSub");
form1 = document.getElementById("form1");
form2 = document.getElementById("form2");
bgColor = document.getElementById("bgColor");

// pop-up menus
write = document.getElementById("write");
    write.style.display="none";
colors = document.getElementById("colors");
    colors.style.display="none";
margin = document.getElementById("margin");
    margin.style.display="none";
templates = document.getElementById("templates");
    templates.style.display="none";
    
const firebaseConfig = {
    // Import the functions you need from the SDKs you need
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyBScCHQRvwumXBR9Ef1Z0cdhdmc9BexuG4",
    authDomain: "portfolio-d5c42.firebaseapp.com",
    projectId: "portfolio-d5c42",
    storageBucket: "portfolio-d5c42.firebasestorage.app",
    messagingSenderId: "893202911708",
    appId: "1:893202911708:web:17c379569b9dee2dbdff19",
    measurementId: "G-BWKCMW42G6"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const analytics = firebase.analytics();

window.signup = function(){
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    auth.createUserWithEmailAndPassword(email,password)
        .then((UserCredentials) => {
            alert("signup successful!");
            console.log(UserCredentials.user);
        })
        .catch((error) => {
            alert("Error " + error.message);
        })
}
window.login = function(){
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email,password)
    .then((UserCredential) => {
        alert("login successful!");
        console.log(UserCredential.user);
        loadMyPage();
    })
    .catch((error) =>{
        alert("Error: "+ error.message);
    })
}
async function loadMyPage() {
    const response = await fetch("/my-page", {
        method: "GET",
        headers: {
            "Authorization": auth.currentUser.uid  // 👈 same, sending UID in header
        }
    });

    const data = await response.json();

    // Now update your page with the saved data:
    user.textContent = data.title;
    biog.textContent = data.biog;
    document.body.style.backgroundColor = data.background_color;
    user.style.color = data.title_color;
    biog.style.color = data.biog_color;
}

// Call it after user logs in or page loads:



nameSub.onclick = function(){
    const myName = document.getElementById("nameText").value;
    fetch("/my-page", {
        method: "POST",
        headers : {
            "Content-Type": "application/json",
            "Authorization": auth.currentUser.uid    // 👈 send UID here!
        },
        body: JSON.stringify({title : myName})
    })
    .then(() => {document.getElementById("user").textContent = `${myName}'s Portfolio`});
}

biogSub.onclick = function(){
    const myBio = document.getElementById("bio").value;
    fetch("/my-page", {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization": auth.currentUser.uid    // 👈 send UID here!
        },
        body: JSON.stringify({biog:myBio})
    })
    .then(() => {document.getElementById("biog").textContent = myBio});
}



function showMenu(){
    menuArrow = document.getElementById("menuArrow");
    menu = document.getElementById("menu");
    menuLoadOut = document.getElementById("menuLoadOut");
    if(getComputedStyle(menu).top == "0px"){
        menu.style.top = "200px";
        menuLoadOut.style.display = "block";
        menuArrow.textContent = "/\\"
    }
    else if(getComputedStyle(menu).top == "200px"){
        menu.style.top = "0px";
        menuLoadOut.style.display = "none";
        menuArrow.textContent = "\\/"
    }
}

function writePop(){
    write.style.display = "block";
}
function colorsPop(){
    colors.style.display = "block";
}
function marginPop(){
    margin.style.display = "block";
}




function nameCloser(){
    write.style.display= "none";
}
function colorCloser(){
    colors.style.display = "none";
}
function marginCloser(){
    margin.style.display = "none";
}

//Make the DIV element draggagle:


/* CHANGE COLOR BUTTON */
function changeColor(color){
    fetch("/my-page", {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization": auth.currentUser.uid    // 👈 send UID here!
        },
        body: JSON.stringify({background_color:color})
    })
    .then(() => {document.body.style.backgroundColor = color});
}
function changeNameColor(textColor){
    fetch("/my-page", {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization": auth.currentUser.uid    // 👈 send UID here!
        },
        body: JSON.stringify({title_color:textColor})
    })
    .then(() => {user.style.color = textColor});
}
function changeBiogColor(textColor){
    fetch("/my-page", {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization": auth.currentUser.uid    // 👈 send UID here!
        },
        body: JSON.stringify({biog_color:textColor})
    })
    .then(() => {biog.style.color = textColor});
}
/***************** ***************/
/***************** ***************/
/* CHANGING MARGINS!!!*/
/***************** ***************/
/***************** ***************/

function moveName(direction){
    if(direction=="right")
        currentDirect = window.getComputedStyle(user).right;
    if(direction=="left")
        currentDirect = window.getComputedStyle(user).right;
    if(direction=="up")
        currentDirect = window.getComputedStyle(user).top;
    if(direction=="bottom")
        currentDirect = window.getComputedStyle(user).top;

    currentDirect = currentDirect.slice(0,-2);

    if(direction=="right"){
        console.log(direction);
        currentDirect = Number(currentDirect) - 10;
        console.log(currentDirect);
        user.style.right = currentDirect + "px";
    }
    if(direction=="left"){
        console.log(direction);
        currentDirect = Number(currentDirect) + 10;
        console.log(currentDirect);
        user.style.right = currentDirect + "px";
    }
    if(direction=="up"){
        console.log(direction);
        currentDirect = Number(currentDirect) - 10;
        console.log(currentDirect);
        user.style.top = currentDirect + "px";
    }
    if(direction=="bottom"){
        console.log(direction);
        currentDirect = Number(currentDirect) + 10;
        console.log(currentDirect);
        user.style.top = currentDirect + "px";
    }
}

function moveBiog(direction){
    if(direction=="right")
        currentDirect = window.getComputedStyle(biog).right;
    if(direction=="left")
        currentDirect = window.getComputedStyle(biog).right;
    if(direction=="up")
        currentDirect = window.getComputedStyle(biog).top;
    if(direction=="bottom")
        currentDirect = window.getComputedStyle(biog).top;

    currentDirect = currentDirect.slice(0,-2);

    if(direction=="right"){
        console.log(direction);
        currentDirect = Number(currentDirect) - 10;
        console.log(currentDirect);
        biog.style.right = currentDirect + "px";
    }
    if(direction=="left"){
        console.log(direction);
        currentDirect = Number(currentDirect) + 10;
        console.log(currentDirect);
        biog.style.right = currentDirect + "px";
    }
    if(direction=="up"){
        console.log(direction);
        currentDirect = Number(currentDirect) - 10;
        console.log(currentDirect);
        biog.style.top = currentDirect + "px";
    }
    if(direction=="bottom"){
        console.log(direction);
        currentDirect = Number(currentDirect) + 10;
        console.log(currentDirect);
        biog.style.top = currentDirect + "px";
    }
}



window.onload = async () => {
    const res = await fetch("/my-page");
    const data = await res.json();

    if (data.title) document.getElementById("user").textContent = `${data['title']}'s Portfolio`;
    if (data.biog) document.getElementById("biog").textContent = data["biog"];
    if (data.background_color) document.body.style.backgroundColor = data["background_color"];
    if (data.title_color) window.user.style.color = data["title_color"];
    if (data.biog_color) window.biog.style.color = data["biog_color"];
}


// pop-up menus
write = document.getElementById("write");
    write.style.display="none";
colors = document.getElementById("colors");
    colors.style.display="none";
margin = document.getElementById("margin");
    margin.style.display="none";
templates = document.getElementById("templates");
    templates.style.display="none";
    

dragElement(write);
dragElement(colors);
dragElement(margin);
dragElement(templates);

function dragElement(elmnt) {
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
if (document.getElementById(elmnt.id+"headbar")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id+"headbar").onmousedown = dragMouseDown;
} else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
}

function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
}

function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
}

function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
}
}


/* MOVES TO FRONT */
write.addEventListener('mousedown', (ev) => {
    write.style.zIndex = 3;
    colors.style.zIndex = 2;
    margin.style.zIndex = 2;
    templates.style.zIndex = 2;
})
colors.addEventListener('mousedown', (ev) => {
    colors.style.zIndex = 3;
    write.style.zIndex = 2;
    margin.style.zIndex = 2;
    templates.style.zIndex = 2;
})
margin.addEventListener('mousedown', (ev) => {
    colors.style.zIndex = 2;
    write.style.zIndex = 2;
    margin.style.zIndex = 3;
    templates.style.zIndex = 2;
})
templates.addEventListener('mousedown', (ev) => {
    colors.style.zIndex = 2;
    write.style.zIndex = 2;
    margin.style.zIndex = 2;
    templates.style.zIndex = 3;
})


function templatesPop(){
    templates.style.display = "block";
}

function templatesCloser(){
    templates.style.display = "none";
}
