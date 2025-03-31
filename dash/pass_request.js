/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var url = "http://154.72.194.17:8080/api.ceemis/service/";
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


// document.querySelector() is used to select an element from the document using its ID
let captchaText = document.querySelector('#captcha');
var ctx = captchaText.getContext("2d");
ctx.font = "40px Roboto";
ctx.fillStyle = "#08e5ff";


let userText = document.querySelector('#textBox');
let submitButton = document.querySelector('#btn_req');
let output = document.querySelector('#output');
let refreshButton = document.querySelector('#refreshButton');


// alphaNums contains the characters with which you want to create the CAPTCHA
let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let emptyArr = [];



function checkEmail() {

    let input = document.getElementById("floatingInput").value;
    try {
        $.ajax({
            url: url + "fetch/user/0/null/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function () {
                //reset container
            },
            complete: function (data) {
                //upon completion
                //alert("Finished Loading");
            },
            success: function (data) {
                var e_data = '';
                try {
                    let row = "";
                    let i = 1;
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.user;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            var value = jdata;
                            sendReset(input,value.name,value.resid);
                            //output.style.color = "green";
                            //output.innerHTML = "Email Exists";
                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.Users, function (index, value) {
                                output.style.color = "red";
                                output.innerHTML = "More Accounts";
                            });
                        }
                    } else {
                        output.style.color = "red";
                        output.innerHTML = "Email doesn't Exist";
                        //alert("No Data to load");
                    }
                } catch (e) {
                    //ShowError("Response Error", e, getAccount);
                }
            },
            error: function (d) {
                console.log(d);
            }});
    } catch (ex) {
        console.log(ex);
    }
}

function sendReset(email, name, userid) {
    //event.preventDefault();
    let formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    formData.append('userid', userid);
    $.ajax({
        url: url + "create/send_reset",
        //dataType: 'json',
        data: formData,
        type: 'POST',
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            output.style.color = "green";
            output.innerHTML = "Email Sent";
        },
        error: function (d) {
            console.log(d);
        }
    });

}





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
        checkEmail();
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
