/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//var url = "https://ceemis.mglsd.go.ug:8443/api.ceemis/service/";
var url = "http://ceemis.mglsd.go.ug:8080/api.ceemis/service/";


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
    //loadFacility();
    //loadCases();
    //datepicker('att_date');
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
                            var value = jdata;
                            //console.log(value.email);
                            document.getElementById('user_name').innerHTML = value.name;
                            type = value.type;
                            act_name = value.name;
                            setType(value.type);
                            //setRole(value.role);
                            organs = value.organ;
                            //loadOrgan(value.organ);
                            //setType(value.type);

                            setAdmin_role(value.role);

                            loadCompanies_Home();
                            loadUsers();
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
                    $("#logs").append(e_data);
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







document.getElementById('acc_btn_facility').addEventListener('click', addModel);
function addModel() {
    $('#add_model_facility').modal('show');
}

function setCompany() {
    let input = $("#model_user_type :selected").attr('id');
    loadCompanies(input);

}

document.getElementById('org_add_access').addEventListener('click', actCo);
function actCo() {
    document.getElementById('co_div').style.display = 'block';
}




function getStatus(input) {
    if (input === "0") {
        return "Inactive";
    } else if (input === "1") {
        return "Active";
    } else {
        return "Error";
    }
}

function getType(input) {
    if (input === "0") {
        return "Inactive";
    } else if (input === "1") {
        return "Local User";
    } else if (input === "2") {
        return "Foreign User";
    } else if (input === "3") {
        return "Government User";
    } else if (input === "4") {
        return "Esafe User";
    } else {
        return "Error";
    }
}

function getRole(input) {
    if (input === "0") {
        return "No Rights";
    } else if (input === "1") {
        return "Admin Rights";
    } else if (input === "2") {
        return "Normal Rights";
    } else if (input === "3") {
        return "Acounts Rights";
    } else {
        return "Error";
    }
}



function loadCompanies_Home() {
    try {
        $.ajax({
//
            url: url + "fetch/organ",
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
                        var value = data.organ;
                        if (!isJsonArray(value)) {

                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.organid + '" onclick="loadCo(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.organid + '</td>';
                            e_data += '<td>' + value.license + '</td>';
                            e_data += '<td>' + value.names + '</td>';
                            e_data += '<td>' + value.address + '</td>';
                            e_data += '<td>' + value.country + '</td>';
                            e_data += '<td>' + value.email + '</td>';
                            e_data += '<td>' + value.phone + '</td>';
                            e_data += '<td>' + getCoType(value.type) + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.organ, function (index, value) {
                                //console.log(value.id);

                                // console.log(value);

                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.organid + '" onclick="loadCo(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.organid + '</td>';
                                e_data += '<td>' + value.license + '</td>';
                                e_data += '<td>' + value.names + '</td>';
                                e_data += '<td>' + value.address + '</td>';
                                e_data += '<td>' + value.country + '</td>';
                                e_data += '<td>' + value.email + '</td>';
                                e_data += '<td>' + value.phone + '</td>';
                                e_data += '<td>' + getCoType(value.type) + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="20" align="center">No data</td></tr>';
                    }
                    $("#co_table").append(e_data);
                    paginateTable('co_table');
                    //exportToExcel('co_table');
                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, loadCompanies);
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



function getCoType(input) {
    if (input === "1") {
        return "Ugandan COMPANY";
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

document.getElementById('org_add').addEventListener('click', addOrgan);
function addOrgan() {
    let formData = new FormData();
    let lic = document.getElementById("org_lic").value;
    let name = document.getElementById("org_name").value;
    let address = document.getElementById("org_address").value;
    let email = document.getElementById("org_email").value;
    let phone = document.getElementById("org_tel").value;
    let country = document.getElementById("org_country").value;
    let l_type = document.getElementById("org_ltype").value;
    let l_Exp = document.getElementById("org_lexp").value;
    let type = $("#org_type :selected").attr('id'); //document.getElementById("org_type").value;
    let officer = $("#model_m_officer :selected").attr('id'); //document.getElementById("org_type").value;

    formData.append('name', name);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('type', type);
    formData.append('country', country);
    formData.append('_ie', type);
    formData.append('license', lic);
    formData.append('license_type', "NA");
    formData.append('license_exp', "NA");
    formData.append('officer', "NA");
    formData.append('cty', address);
    fetch(url + "create/organ",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Organ Added");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


document.getElementById('org_edit').addEventListener('click', editOrgan);
function editOrgan() {
    let formData = new FormData();
    let id = document.getElementById("org_gen_id").value;
    let lic = document.getElementById("org_lic").value;
    let ltype = document.getElementById("org_ltype").value;
    let name = document.getElementById("org_name").value;
    let address = document.getElementById("org_address").value;
    let email = document.getElementById("org_email").value;
    let phone = document.getElementById("org_tel").value;
    let country = document.getElementById("org_country").value;
    let type = $("#org_type :selected").attr('id'); //document.getElementById("org_type").value;
    let logo = document.getElementById("org_logo"); //.value;


    formData.append('id', id);
    formData.append('name', name);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('type', type);
    formData.append('country', country);
    formData.append('_ie', type);
    formData.append('license', "NA");
    formData.append('ltype', "NA");
    formData.append('logo', logo.files[0]);
    fetch(url + "update/organ",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Organ Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


document.getElementById('org_del').addEventListener('click', deleteOrgan);
function deleteOrgan() {
    let formData = new FormData();
    let id = document.getElementById("org_gen_id").value;
    formData.append('id', id);
    fetch(url + "delete/organ",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Organ Deleted");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function loadCo(input) {

    let id = $(input).attr("id");
    try {
        $.ajax({
            //
            url: url + "fetch/organ/0/" + id,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                // $("#prop_body").html('<tr><td colspan="5" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    // $("#model_user_co").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.organ;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);

                            document.getElementById("org_gen_id").value = jdata.id;
                            document.getElementById("org_id").value = jdata.organid;
                            document.getElementById("org_name").value = jdata.names;
                            document.getElementById("org_address").value = jdata.address;
                            document.getElementById("org_email").value = jdata.email;
                            document.getElementById("org_tel").value = jdata.phone;
                            document.getElementById("org_country").value = jdata.country;
                            document.getElementById("org_logo_txt").value = jdata.logo;
                            document.getElementById("org_lic").value = jdata.license;
                            document.getElementById("org_ltype").value = jdata.license_type;
                            // document.getElementById("org_logo");//.value;
                            document.getElementById('co_div').style.display = 'block';
                            console.log(jdata.officer);
                            if (jdata.officer === 'NA') {
                                document.getElementById('o_div').style.display = 'none';
                            } else {
                                document.getElementById('o_div').style.display = 'block';
                                loadOfficer(jdata.officer);
                            }
                        } else {
                            $.each(data.organ, function (index, value) {
                                //console.log(value.id);
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#model_user_co").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadCo);
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



function loadUsers() {
    try {
        $.ajax({
//
            url: url + "fetch/user",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#acc_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#acc_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.user;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.datereg + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.resid + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.phone + '</td>';
                            e_data += '<td>' + value.email + '</td>';
                            e_data += '<td>' + getRole(value.role) + '</td>';
                            e_data += '<td>' + getType(value.type) + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.user, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.datereg + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.resid + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.phone + '</td>';
                                e_data += '<td>' + value.email + '</td>';
                                e_data += '<td>' + getRole(value.role) + '</td>';
                                e_data += '<td>' + getType(value.type) + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#acc_table").append(e_data);
                    paginateTable('acc_table');
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


function getStatus(input) {
    if (input === "0") {
        return "Inactive";
    } else if (input === "1") {
        return "Active";
    } else {
        return "Error";
    }
}

function getType(input) {
    if (input === "0") {
        return "Inactive";
    } else if (input === "1") {
        return "Local User";
    } else if (input === "2") {
        return "Foreign User";
    } else if (input === "3") {
        return "Government User";
    } else if (input === "4") {
        return "Esafe User";
    } else {
        return "Error";
    }
}

function getRole(input) {
    if (input === "0") {
        return "No Rights";
    } else if (input === "1") {
        return "Admin Rights";
    } else if (input === "2") {
        return "Normal Rights";
    } else if (input === "3") {
        return "Acounts Rights";
    } else {
        return "Error";
    }
}



function loadCompanies(input) {
    try {
        $.ajax({
//
            url: url + "fetch/organs/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                // $("#prop_body").html('<tr><td colspan="5" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#model_user_co").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.organ;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            e_data += '<option id="' + jdata.organid + '" ">';
                            e_data += jdata.names;
                            e_data += '</option>';
                        } else {
                            $.each(data.organ, function (index, value) {
                                //console.log(value.id);
                                e_data += '<option id="' + value.organid + '"">';
                                e_data += value.names;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#model_user_co").append(e_data);
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

function generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    document.getElementById("model_user_pass").value = password;
}
