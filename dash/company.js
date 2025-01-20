/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var url = "http:/192.168.20.1:8080/api.cms/service/";
 
//var url = "http://localhost:8080/api.cms/service/";


var user = '';
var role = '';
var type = '';
var organs = '';
var act_name = '';
$(document).ready(function () {
    /*
     //getting email in url
     var queryString = decodeURIComponent(window.location.search);
     queryString = queryString.substring(1);
     var queries = queryString.split("&");
     for (var i = 0; i < queries.length; i++)
     {
     // user = queries[i];
     }
     user = queryString.substring(0, queryString.length);
     //console.log(user);*/

    const email = sessionStorage.getItem('user');
    sessionEmpty(email);
    getAccount(email);

});
function createNode(element) {
    return document.createElement(element);
}
function append(parent, el) {
    return parent.appendChild(el);
}


function getAccount(input) {
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
                    //$("#logs").empty();
                    let row = "";
                    let i = 1;
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.user;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            // console.log(value.email);
                            // console.log(value.email);
                            // document.getElementById('pro_userid').innerHTML = value.resid;
                            // document.getElementById('user_name').innerHTML = value.name;
                            document.getElementById("user_organ_id").value = jdata.organ;
                            //document.getElementById('user_organ_id') = value.organ;
                            document.getElementById('user_name').innerHTML = jdata.name;
                            act_name = jdata.name;
                            //document.getElementById('user_email').innerHTML = value.email;
                            //document.getElementById('pro_email').innerHTML = value.email;
                            //document.getElementById('pro_phone').innerHTML = value.phone;
                            //document.getElementById('pro_role').innerHTML = roleSetter(value.role);
                            type = jdata.type;
                            organs = jdata.organ;
                            setType(jdata.type);

                            setAdmin_role(jdata.role);
                            setRole_s(jdata.role);
                            loadAcco(jdata.type, jdata.organ);
                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.Users, function (index, value) {
                                alert("Error while loading user data");
                                //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                                //++i;
                            });
                        }
                    } else {
                        alert("No Data to load");
                    }
                    //appending data
                    // $("#logs").append(e_data);
                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, getAccount);
                }
            },
            error: function (d) {
                //$("#id").html()
                ShowError("Response Error");
                if (ajaxOptions === 'timeout') {
                    ShowError("Ajax Error", "Connection TimeOut");
                } else {
                    ShowError("Ajax Error", "Something went wrong!");
                }
            }});
    } catch (ex) {
        ShowError("Exception", ex);
    }
}


function loadAcco(input, organs) {
    //console.log(organs);
    if (input === "1") {
        //loadFollow_lorgan(organs);
    } else if (input === "2") {
        //loadFollow_forgan(organs);
    } else if (input === "3") {
        //loadCompanies();
        loadUsers(organs);
        loadCity();
        loadEmployer();
    } else if (input === "4") {
        //loadCompanies();
        loadUsers(organs);
        loadCity();
        loadEmployer();
    } else {
        alert("Error Code");
    }
}



function setRole_s(input) {
    if (input === '1') {
        // document.getElementById('user_manger').style.display = 'block';
    } else {
        // document.getElementById('user_manger').style.display = 'nono';
    }
}


function getCoType(input) {
    if (input === "1") {
        return "UGANDAN COMPANY";
    } else if (input === "2") {
        return "SAUDI COMPANY";
    } else if (input === "3") {
        return "GOVERNMENT ENTITY";
    } else if (input === "2") {
        return "ESAFE";
    } else {
        return "Error";
    }
}




function getStatus(input) {
    if (input === "0") {
        return "Not Active";
    } else if (input === "1") {
        return "Active";
    } else {
        return "Error";
    }
}

function loadEmployer() {
    try {
        $.ajax({
//
            url: url + "fetch/employer",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#co_body").html('<tr><td colspan="20" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#co_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.employer;
                        if (!isJsonArray(value)) {

                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="delUser(this)"  name="' + value.emp_id + '"    type="button"  class="btn btn-danger" >Delete</button>';
                            e_data += '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.emp_id + '</td>';
                            e_data += '<td>' + value.nin + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.contact + '</td>';
                            e_data += '<td>' + value.email + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.employer, function (index, value) {
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="delUser(this)"  name="' + value.emp_id + '"    type="button"  class="btn btn-danger" >Delete</button>';
                                e_data += '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.emp_id + '</td>';
                                e_data += '<td>' + value.nin + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.contact + '</td>';
                                e_data += '<td>' + value.email + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="20" align="center">No data</td></tr>';
                    }
                    $("#co_table").append(e_data);
                    pager('co_table');
                } catch (e) {
                    ShowError("Response Error", e, loadCompanies);
                }
            },
            error: function (d) {
                //$("#gallery_table").html('<tr><td colspan="5" align="center">Sorry an Expected error Occured.</td></tr>');
                if (ajaxOptions === 'timeout') {
                    alert("ajax Error", "Connection Timeout");
                } else {
                    alert("ajax Error", "Sorry! Something wrong, please try again");
                    //ShowError("ajax Error", thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                }
                //console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}


document.getElementById('model_add_button').addEventListener('click', addUser);
function addUser() {

    let organ_id = document.getElementById("user_organ_id").value;
    let name = document.getElementById("user_name_txt").value;
    let email = document.getElementById("user_email_txt").value;
    let tel = document.getElementById("user_phone_txt").value;
    let pass = document.getElementById("user_pass_txt").value;
    let role = $("#user_role_txt :selected").attr('id');

    var formdata = new FormData();
    formdata.append("organ", organ_id);
    formdata.append("type", "3");
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("tel", tel);
    formdata.append("password", pass);
    formdata.append("role", role);

    fetch(url + "create/user",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("User Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}






function loadUsers(input) {
    try {
        $.ajax({
//
            url: url + "fetch/users/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#user_table_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#user_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        //console.log(data);
                        row += "";
                        var value = data.user;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);

                            e_data += '<tr>';
                            e_data += '<td>' + value.resid + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.phone + '</td>';
                            e_data += '<td>' + value.email + '</td>';
                            e_data += '<td>' + setRoleString(value.role) + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageUser(this)"  name="' + value.resid + '"    type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '</tr>';

                        } else {
                            $.each(data.user, function (index, value) {
                                //console.log(value);

                                e_data += '<tr>';
                                e_data += '<td>' + value.resid + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.phone + '</td>';
                                e_data += '<td>' + value.email + '</td>';
                                e_data += '<td>' + setRoleString(value.role) + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageUser(this)"  name="' + value.resid + '"    type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#user_table").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadUsers);
                }
            },
            error: function (d) {
                //$("#gallery_table").html('<tr><td colspan="5" align="center">Sorry an Expected error Occured.</td></tr>');
                if (ajaxOptions === 'timeout') {
                    alert("ajax Error", "Connection Timeout");
                } else {
                    alert("ajax Error", "Sorry! Something wrong, please try again");
                    //ShowError("ajax Error", thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                }
                //console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}

function setRoleString(input) {
    if (input === '1') {
        return 'Admin Rights';
    } else {
        return 'Normal Rights';
    }
}


function loadCity() {
    try {
        $.ajax({
//
            url: url + "fetch/city",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#user_city_txt").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#user_city_txt").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.city;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<option id="' + value.id + '" ">';
                            e_data += value.name + " | " + value.region + " | " + value.country;
                            e_data += '</option>';
                        } else {
                            $.each(data.city, function (index, value) {
                                e_data += '<option id="' + value.id + '" ">';
                                e_data += value.name + " | " + value.region + " | " + value.country;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#user_city_txt").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadCity);
                }
            },
            error: function (d) {
                //$("#gallery_table").html('<tr><td colspan="5" align="center">Sorry an Expected error Occured.</td></tr>');
                if (ajaxOptions === 'timeout') {
                    alert("ajax Error", "Connection Timeout");
                } else {
                    alert("ajax Error", "Sorry! Something wrong, please try again");
                    //ShowError("ajax Error", thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                }
                //console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}


function manageUser(input) {
    //loadItem();
    let id = $(input).attr("id");
    getUserDetail(id);
    $('#manage_User').modal('show');
}

document.getElementById('model_add_new').addEventListener('click', add_new);
function add_new() {

    $('#manage_User').modal('show');
}


function getUserDetail(input) {
    ///let id = $(input).attr("id");
    try {
        $.ajax({
            url: url + "fetch/user/" + input + "/null/null",
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
                    //$("#logs").empty();
                    let row = "";
                    let i = 1;
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.user;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            console.log(jdata.organ);
                            document.getElementById("user_id").value = jdata.id;
                            document.getElementById("user_organ_id").value = jdata.organ;
                            document.getElementById("user_organ_type").value = jdata.type;
                            document.getElementById("user_res").value = jdata.resid;
                            document.getElementById("user_name_txt").value = jdata.name;
                            document.getElementById("user_email_txt").value = jdata.email;
                            document.getElementById("user_phone_txt").value = jdata.phone;
                            document.getElementById("user_pass_txt").value = jdata.password;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.emerusergency, function (index, value) {
                                alert("Error while loading user data");
                                //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                                //++i;
                            });
                        }
                    } else {
                        alert("No Data to load");
                    }
                    //appending data
                    $("#logs").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, getUserDetail);
                }
            },
            error: function (d) {
                //$("#id").html()
                ShowError("Response Error");
                if (ajaxOptions === 'timeout') {
                    ShowError("Ajax Error", "Connection TimeOut");
                } else {
                    ShowError("Ajax Error", "Something went wrong!");
                }
            }});
    } catch (ex) {
        ShowError("Exception", ex);
    }
}


document.getElementById('model_del_button').addEventListener('click', delUser);
function delUser() {

    let id = document.getElementById("user_id").value;

    var formdata = new FormData();
    formdata.append("id", id);

    fetch(url + "delete/user",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("User Deleted");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}




document.getElementById('model_edit_button').addEventListener('click', editUser);
function editUser() {

    let id = document.getElementById("user_id").value;
    let organ_id = document.getElementById("user_organ_id").value;
    let org_type = document.getElementById("user_organ_type").value;
    let name = document.getElementById("user_name_txt").value;
    let email = document.getElementById("user_email_txt").value;
    let tel = document.getElementById("user_phone_txt").value;
    let pass = document.getElementById("user_pass_txt").value;
    let role = $("#user_role_txt :selected").attr('id');

    var formdata = new FormData();
    formdata.append("id", id);
    formdata.append("organ", organ_id);
    formdata.append("type", org_type);
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("tel", tel);
    formdata.append("password", pass);
    formdata.append("role", role);

    fetch(url + "update/user",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("User Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


document.getElementById('model_add_employer').addEventListener('click', add_Emp);
function add_Emp() {
    $('#manage_Employer').modal('show');
}



document.getElementById('model_add_emp').addEventListener('click', addEmployer);
function addEmployer() {

    let nin = document.getElementById("emp_nin").value;
    let name = document.getElementById("emp_name").value;
    let phone = document.getElementById("emp_phone").value;
    let email = document.getElementById("emp_email").value;
    let doc = document.getElementById("emp_attach");//.value;

    var formdata = new FormData();
    formdata.append("nin", nin);
    formdata.append("name", name);
    formdata.append("contact", phone);
    formdata.append("email", email);
    formdata.append("doc", doc.files[0]);

    fetch(url + "create/employer",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Employer Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function delUser(input) {


    let id = $(input).attr("id");
    var formdata = new FormData();
    formdata.append("id", id);

    fetch(url + "delete/employer",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("User Deleted");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}
