/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var url = "http://ceemis.mglsd.go.ug:8080/api.ceemis/service/";
//var url = "https://esafeafrica.com/api.ceemis/service/";

$(document).ready(function () {
    /**
     Swal.fire({
     title: 'We cherish you!',
     text: 'May the new year bless you with health, wealth, happiness great partnerships.',
     imageUrl: './images/happy.jpg',
     imageWidth: 400,
     imageHeight: 200,
     imageAlt: 'Custom image',
     width: 600,
     padding: '3em',
     color: '#716add',
     background: '#fff url(./images/fire.gif)',
     backdrop: `
     rgba(6,6,99,0.4)
     url("./images/fire.gif")
     left top
     no-repeat`
     });
     **/
});

function createNode(element) {
    return document.createElement(element);
}
function append(parent, el) {
    return parent.appendChild(el);
}

//document.getElementById('authe').addEventListener('click', login);
function login() {
    //event.preventDefault();
    let formData = new FormData();
    let userid = document.getElementById("floatingInput").value;
    let password = document.getElementById("floatingPassword").value;
    formData.append('email', userid);
    formData.append('password', password);
    console.log(url + "conditions/user");
    $.ajax({
        url: url + "conditions/user",
        //dataType: 'json',
        data: formData,
        type: 'POST',
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            checker(data.status, userid);
            //console.log(data);
        }
        ,
        error: function (d) {
            console.log(d);
        }
    });

}

function checker(status, email) {
    if (status === true) {
        sessionStorage.setItem('user', email);
        //var queryString = "?" + email;
        location.href = 'home.html';
    } else {
        alert("Wrong Userid or Password");
    }
}



// document.querySelector() is used to select an element from the document using its ID
let captchaText = document.querySelector('#captcha');
var ctx = captchaText.getContext("2d");
ctx.font = "40px Roboto";
ctx.fillStyle = "#08e5ff";


let userText = document.querySelector('#textBox');
let submitButton = document.querySelector('#authe');
let output = document.querySelector('#output');
let refreshButton = document.querySelector('#refreshButton');


// alphaNums contains the characters with which you want to create the CAPTCHA
let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',  '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let emptyArr = [];

// This loop generates a random string of 7 characters using alphaNums
// Further this string is displayed as a CAPTCHA
for (let i = 1; i <= 7; i++) {
    emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
}
var c = emptyArr.join('');
ctx.fillText(emptyArr.join(''), captchaText.width / 4, captchaText.height / 2);


// This event listener is stimulated whenever the user press the "Enter" button
// "Correct!" or "Incorrect, please try again" message is
// displayed after validating the input text with CAPTCHA
userText.addEventListener('keyup', function (e) {
    // Key Code Value of "Enter" Button is 13
    if (e.keyCode === 13) {
        if (userText.value === c) {
            output.classList.add("correctCaptcha");
            //output.innerHTML = "Correct!";
        } else {
            output.classList.add("incorrectCaptcha");
            output.innerHTML = "Incorrect, please try again";
        }
    }
});

// This event listener is stimulated whenever the user clicks the "Submit" button
// "Correct!" or "Incorrect, please try again" message is
// displayed after validating the input text with CAPTCHA
submitButton.addEventListener('click', function (event) {

    event.preventDefault();
    if (userText.value === c) {
        output.classList.add("correctCaptcha");
        login();
        //output.innerHTML = "Correct!";
    } else {
        output.classList.add("incorrectCaptcha");
        output.innerHTML = "Incorrect Captcha, please try again";
    }
});

// This event listener is stimulated whenever the user press the "Refresh" button
// A new random CAPTCHA is generated and displayed after the user clicks the "Refresh" button
refreshButton.addEventListener('click', function (event) {

    event.preventDefault();
    userText.value = "";
    let refreshArr = [];
    for (let j = 1; j <= 7; j++) {
        refreshArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }
    ctx.clearRect(0, 0, captchaText.width, captchaText.height);
    c = refreshArr.join('');
    ctx.fillText(refreshArr.join(''), captchaText.width / 4, captchaText.height / 2);
    output.innerHTML = "";
});
