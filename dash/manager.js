/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var url = "http://192.168.20.1:8080/api.ceemis/service/"
var url = "https://esafeafrica.com/api.ceemis/service/";


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
                            loadAcco(value.type, value.organ);
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


function loadAcco(input, organs) {
//console.log(organs);
    if (input === "1") {
//loadAccommodation_local(organs);
    } else if (input === "2") {
//loadAccommodation_foreign(organs);
    } else if (input === "3") {
//loadAccommodation();
        loadOrganOfficers(organs);
        loadCity_tb();
        loadEmno();
        loadAmnesty();
        loadCompanies_Home();
        loadCompanies_FCO();
    } else if (input === "4") {
//console.log(input);
        loadOrganOfficers(organs);
        loadCity_tb();
        loadEmno();
        loadAmnesty();
        loadCompanies_Home();
        loadCompanies_FCO();
    } else {
        alert("Error Code");
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

document.getElementById('model_add_button').addEventListener('click', addCity);
function addCity() {

    let name = document.getElementById("model_city").value;
    let country = document.getElementById("model_country").value;
    let region = $("#model_country :selected").attr('id');

    var formdata = new FormData();

    formdata.append("name", name);
    formdata.append("region", region);
    formdata.append("country", country);

    fetch(url + "create/city",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("City Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
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


function loadCity_tb() {
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
                $("#city_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#city_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.city;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.region + '</td>';
                            e_data += '<td>' + value.country + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.city, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.region + '</td>';
                                e_data += '<td>' + value.country + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#city_table").append(e_data);
                    pager('city_table');
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
            url: url + "fetch/organs_cty_bi/UG",
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
                    pager('co_table');
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


function loadCompanies_FCO() {
    try {
        $.ajax({
//
            url: url + "fetch/organs_cty_bi/SA",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#fco_body").html('<tr><td colspan="20" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#fco_body").empty();
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
                    $("#fco_table").append(e_data);
                    pager('fco_table');
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

function getCty(typ) {
    if (typ === '1') {
        return "UG";
    } else if (typ === '2') {
        return "SA";
    } else if (typ === '3') {
        return "EMB";
    } else {
        return "ESAFE"
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
    formData.append('license_type', l_type);
    formData.append('license_exp', l_Exp);
    formData.append('officer', officer);
    formData.append('cty', getCty(type));
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
    formData.append('license', lic);
    formData.append('ltype', ltype);
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


function loadOfficer(input) {

    let id = $(input).attr("id");
    try {
        $.ajax({
            //
            url: url + "fetch/user/0/" + input + "/null/",
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
                        var jdata = data.user;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);

                            document.getElementById("o_id").value = jdata.resid;
                            document.getElementById("o_name").value = jdata.name;
                            document.getElementById("o_email").value = jdata.email;
                        } else {
                            $.each(data.user, function (index, value) {
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


document.getElementById('att_btn').addEventListener('click', addInvoice);
function addInvoice() {
    let form = new FormData();
    let organid = document.getElementById("org_id").value;
    let name = document.getElementById("org_name").value;
    let address = document.getElementById("org_address").value;
    let reason = document.getElementById("att_re").value;
    let amt = document.getElementById("att_amt").value;
    let date = document.getElementById("att_date").value;
    let doc = document.getElementById("att_file"); //.value;
    //let type = $("#org_type :selected").attr('id');//document.getElementById("org_type").value;

    form.append("organid", organid);
    form.append("_to", name);
    form.append("loca", address);
    form.append("_for", reason);
    form.append("amount", amt);
    form.append("date", date);
    form.append("attach", doc.files[0]);
    fetch(url + "create/invoice",
            {
                body: form,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Invoice Added");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
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
                $("#org_address").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#org_address").empty();
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
                    $("#org_address").append(e_data);
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


function loadOrganOfficers(input) {
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
                // $("#prop_body").html('<tr><td colspan="5" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#model_m_officer").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.user;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            e_data += '<option id="' + jdata.resid + '" ">';
                            e_data += jdata.name;
                            e_data += '</option>';
                        } else {
                            $.each(data.user, function (index, value) {
                                //console.log(value.id);
                                e_data += '<option id="' + value.resid + '"">';
                                e_data += value.name;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }

                    $("#model_m_officer").append("<option  disabled selected hidden >Choose Officer to Assign</option>");
                    $("#model_m_officer").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadOrganOfficers);
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



document.getElementById('att_btn').addEventListener('click', assignEMOfficer);
function assignEMOfficer(event) {
    event.preventDefault();
    let formData = new FormData();
    let organ = document.getElementById("org_id").value;
    //let officer = document.getElementById("model_c_type").value;
    let officerId = $("#model_m_officer :selected").attr('id');
    //console.log(officer);
    formData.append('organ', organ);
    formData.append('officer', officerId);
    fetch(url + "update/organ_officer",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Assigned");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function loadAmnesty() {
    try {
        $.ajax({
//
            url: url + "fetch/amnesty",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#amnesty_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#amnesty_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.amnesty;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.latitude + '</td>';
                            e_data += '<td>' + value.longitude + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.amnesty, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.latitude + '</td>';
                                e_data += '<td>' + value.longitude + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#amnesty_table").append(e_data);
                    pager('amnesty_table');
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


document.getElementById('acc_btn_amnesty').addEventListener('click', addAmnest_model);
function addAmnest_model() {
    $('#add_model_amnesty').modal('show');
}


document.getElementById('model_add_amnesty').addEventListener('click', addAmnesty);
function addAmnesty() {

    let name = document.getElementById("model_amnesty_name").value;
    let lat = document.getElementById("model_amnesty_lat").value;
    let long = document.getElementById("model_amnesty_long").value;
    let pic = "https://avienseconsults.com/amnesty/police.png";

    var formdata = new FormData();

    formdata.append("name", name);
    formdata.append("lati", lat);
    formdata.append("longi", long);
    formdata.append("picture", pic);

    fetch(url + "create/amnesty",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Amnesty Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



function loadEmno() {
    try {
        $.ajax({
//
            url: url + "fetch/em_number",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#em_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#em_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.numbers;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.names + '</td>';
                            e_data += '<td>' + value.phone + '</td>';
                            e_data += '<td>' + value.email + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.numbers, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.names + '</td>';
                                e_data += '<td>' + value.phone + '</td>';
                                e_data += '<td>' + value.email + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#em_table").append(e_data);
                    pager('em_table');
                } catch (e) {
                    ShowError("Response Error", e, loadEmno);
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


document.getElementById('acc_btn_em').addEventListener('click', addEmno_model);
function addEmno_model() {
    $('#add_model_emno').modal('show');
}


document.getElementById('model_add_emno').addEventListener('click', addEMno);
function addEMno() {

    let name = document.getElementById("model_em_name").value;
    let tel = document.getElementById("model_em_tel").value;
    let email = document.getElementById("model_em_email").value;
    //let pic = "https://avienseconsults.com/amnesty/police.png";

    var formdata = new FormData();

    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("phone", tel);
    //formdata.append("picture", pic);

    fetch(url + "create/emno",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Emergency Number Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}