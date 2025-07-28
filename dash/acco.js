/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var url = "https://ceemis.mglsd.go.ug:8080/api.ceemis/service/"
//var url = "https://esafeafrica.com/api.ceemis/service/";


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
    loadFacility();
    //loadCases();
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
                            // console.log(value.email);
                            // console.log(value.email);
                            // console.log(value.email);
                            // document.getElementById('pro_userid').innerHTML = value.resid;
                            // document.getElementById('user_name').innerHTML = value.name;
                            //document.getElementById('pro_name').innerHTML = value.name;
                            document.getElementById('user_name').innerHTML = value.name;
                            //document.getElementById('user_email').innerHTML = value.email;
                            //document.getElementById('pro_email').innerHTML = value.email;
                            //document.getElementById('pro_phone').innerHTML = value.phone;
                            //document.getElementById('pro_role').innerHTML = roleSetter(value.role);
                            type = value.type;
                            organs = value.organ;
                            act_name = value.name;
                            setAdmin_role(value.role);
                            //setRole(value.role);
                            setType(type);
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
                    ShowError("Response Error", e, getAccount);
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
        loadAccommodation_local(organs);
    } else if (input === "2") {
        loadAccommodation_foreign(organs);
    } else if (input === "3") {
        loadAccommodation();
    } else if (input === "4") {
        loadAccommodation();
    } else {
        alert("Error Code");
    }
}

function getStatus(input) {
    if (input === "0") {
        return "Still at Accommodation";
    } else if (input === "1") {
        return "Left Accommodation";
    } else {
        return "Error";
    }
}


document.getElementById('acc_btn_search').addEventListener('click', searchMW);
function searchMW(event) {
    event.preventDefault();
    var id = document.getElementById('acc_mw_id').value;
    try {
        $.ajax({
            url: url + "fetch/workers/" + id,
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
                        var jdata = data.user_worker;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            //console.log(jdata);
                            document.getElementById('acc_mw_gen_id').value = jdata.id;
                            document.getElementById('acc_mw_userid').value = jdata.userid;
                            document.getElementById('acc_mw_passport').value = jdata.passport;
                            document.getElementById('acc_mw_nin').value = jdata.nin;
                            document.getElementById('acc_mw_name').value = jdata.names;
                            document.getElementById('acc_mw_lco').value = jdata.lcompany;
                            document.getElementById('acc_mw_fco').value = jdata.fcompany;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.user_worker, function (index, value) {
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
                    ShowError("Response Error", e, searchMW);
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


document.getElementById('acc_add_acc').addEventListener('click', addAcco);
function addAcco(event) {
    event.preventDefault();
    let formData = new FormData();
    let userid = document.getElementById("acc_mw_userid").value;

    formData.append('con', userid);

    $.ajax({
        url: url + "conditions/check_acco",
        //dataType: 'json',
        data: formData,
        type: 'POST',
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            checker(data.status);
            //console.log(data);
        }
        ,
        error: function (d) {
            console.log(d);
        }
    });

}

function checker(status) {
    if (status === true) {
        alert("Migrant Worker Can't be Assigned to two Accommodation Facilities");
    } else {
        // alert("New");
        addAcco_method();
    }
}




function addAcco_method() {
    let formData = new FormData();

    let facility_id = $("#acc_facility :selected").attr('id');
    let facility = document.getElementById("acc_facility").value;
    let userid = document.getElementById("acc_mw_userid").value;
    let passport = document.getElementById("acc_mw_passport").value;
    let nin = document.getElementById("acc_mw_nin").value;
    let name = document.getElementById("acc_mw_name").value;
    let lco = document.getElementById("acc_mw_lco").value;
    let fco = document.getElementById("acc_mw_fco").value;
    let ct = document.getElementById("acco_ticket").value;
    let reason = document.getElementById("acco_reason").value;


    if (valForm(ct, "Please Provide Case Ticket") === false) {

    } else {
        formData.append('facility_id', facility_id);
        formData.append('facility', facility);
        formData.append('userid', userid);
        formData.append('passport', passport);
        formData.append('nin', nin);
        formData.append('name', name);
        formData.append('lco', lco);
        formData.append('fco', fco);
        formData.append('reason', ct);
        formData.append('det', reason);

        fetch(url + "create/accomodation",
                {
                    body: formData,
                    method: 'POST'
                }).then(function (response) {
            console.log('Response: ' + response.status);
            if (response.status === 200) {
                alert("Migrant Worker Assigned to Accommodation");
            } else {
                alert('Error Ocurred Please contact System Admin');
            }
            return response.text();
        }).catch(function (err) {
            console.log('ERROR: ' + err);
        });
    }
}




function loadFacility() {
    try {
        $.ajax({
            //
            url: url + "fetch/organs/5",
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
                    $("#acc_facility").empty();
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
                    $("#acc_facility").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadFacility);
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


document.getElementById('acc_btn_facility').addEventListener('click', addModel);
function addModel() {
    $('#add_model_facility').modal('show');

}

document.getElementById('model_add_button').addEventListener('click', addFacility);
function addFacility(event) {
    event.preventDefault();
    let formData = new FormData();

    let name = document.getElementById("model_item_name").value;
    let address = document.getElementById("model_item_address").value;
    let email = document.getElementById("model_item_email").value;
    let phone = document.getElementById("model_item_phone").value;
    let country = document.getElementById("model_item_country").value;


    formData.append('name', name);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('type', "5");
    formData.append('country', country);
    formData.append('_ie', "2");

    fetch(url + "create/organ",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Accommodation Facility Added");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function loadAccommodation() {
    try {
        $.ajax({
//
            url: url + "fetch/accomodation",
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
                        var value = data.accomodation;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageAcco(this)" name="' + value.acc_id + '"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.datereg + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.facility + '</td>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.nin + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.accomodation, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageAcco(this)" name="' + value.acc_id + '"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.datereg + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.facility + '</td>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.nin + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#acc_table").append(e_data);
                    pager('acc_table');
                } catch (e) {
                    ShowError("Response Error", e, loadAccommodation);
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



function loadAccommodation_local(input) {
    try {
        $.ajax({
//
            url: url + "fetch/accomodation_agency/null/" + input + "/null/null",
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
                        var value = data.accomodation;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageAcco(this)" name="' + value.acc_id + '"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.datereg + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.facility + '</td>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.nin + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.accomodation, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageAcco(this)" name="' + value.acc_id + '"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.datereg + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.facility + '</td>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.nin + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#acc_table").append(e_data);
                    pager('acc_table');
                } catch (e) {
                    ShowError("Response Error", e, loadAccommodation);
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


function loadAccommodation_foreign(input) {
    try {
        $.ajax({
            url: url + "fetch/accomodation_agency/null/null/" + input + "/null",
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
                        var value = data.accomodation;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageAcco(this)" name="' + value.acc_id + '"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.datereg + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.facility + '</td>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.nin + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.accomodation, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageAcco(this)" name="' + value.acc_id + '"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.datereg + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.facility + '</td>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.nin + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#acc_table").append(e_data);
                    pager('acc_table');
                } catch (e) {
                    ShowError("Response Error", e, loadAccommodation);
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





function statusAccommodation() {
    try {
        $.ajax({
//
            url: url + "fetch/accomodation_status/0",
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
                        var value = data.accomodation;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageAcco(this)" name="' + value.acc_id + '"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.datereg + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.facility + '</td>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.nin + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.accomodation, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageAcco(this)" name="' + value.acc_id + '"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.datereg + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.facility + '</td>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.nin + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#acc_table").append(e_data);
                    pager('acc_table');
                } catch (e) {
                    ShowError("Response Error", e, loadAccommodation);
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


document.getElementById('model_comment_btn_update').addEventListener('click', Acco_Update);
function Acco_Update(event) {
    event.preventDefault();
    let gen_id = document.getElementById("model_acco_genid").value;
    let acc_id = document.getElementById("model_acco_id").value;
    let userid = document.getElementById("model_acco_user").value;
    let name = document.getElementById("model_acco_name").value;
    let comment = document.getElementById("model_acco_comment").value;

    fetch(url + "conditions/accomodation/" + gen_id + "/0",
            {

                method: 'GET'
            }).then(function (response) {
        // console.log('Response: ' + response.status);
        if (response.status === 200) {
            logger(acc_id, "Accommodation Update", comment,act_name);
            logger(userid, "Accommodation Update", comment,act_name);
            alert("Migrant Worker has left Accommodation Center/Facility");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


document.getElementById('model_comment_btn_enter').addEventListener('click', Acco_Enter);
function Acco_Enter(event) {
    event.preventDefault();
    let gen_id = document.getElementById("model_acco_genid").value;
    let acc_id = document.getElementById("model_acco_id").value;
    let userid = document.getElementById("model_acco_user").value;
    let name = document.getElementById("model_acco_name").value;
    let comment = document.getElementById("model_acco_comment").value;

    fetch(url + "conditions/accomodation/" + gen_id + "/0",
            {

                method: 'GET'
            }).then(function (response) {
        // console.log('Response: ' + response.status);
        if (response.status === 200) {
            logger(acc_id, "Accommodation Update", comment,act_name);
            logger(userid, "Accommodation Update", comment,act_name);
            alert("Migrant Worker has left Accommodation Center/Facility");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


document.getElementById('model_comment_btn_exit').addEventListener('click', Acco_Exit);
function Acco_Exit(event) {
    event.preventDefault();
    let gen_id = document.getElementById("model_acco_genid").value;
    let acc_id = document.getElementById("model_acco_id").value;
    let userid = document.getElementById("model_acco_user").value;
    let name = document.getElementById("model_acco_name").value;
    let comment = document.getElementById("model_acco_comment").value;

    fetch(url + "conditions/accomodation/" + gen_id + "/1",
            {

                method: 'GET'
            }).then(function (response) {
        // console.log('Response: ' + response.status);
        if (response.status === 200) {
            logger(acc_id, "Accommodation Update", comment,act_name);
            logger(userid, "Accommodation Update", comment,act_name);
            alert("Migrant Worker has left Accommodation Center/Facility");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}

function manageAcco(input) {
    //loadItem();
    //console.log(input);
    loadLogs(input, 'act_mw_table', 'act_mw_table_body');
    getAccoDet(input);
    $('#manage_acco').modal('show');

}



function getAccoDet(input) {
    // let id = $(input).attr("id");

    let id = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/accomodation_worker/" + id + "/null/null/null",
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
                        var jdata = data.accomodation;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            document.getElementById('model_acco_genid').value = jdata.id;
                            document.getElementById('model_acco_user').value = jdata.userid;
                            document.getElementById('model_acco_pass').value = jdata.passport;
                            document.getElementById('model_acco_name').value = jdata.name;
                            document.getElementById('model_acco_id').value = jdata.acc_id;



                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.Case_ticket, function (index, value) {
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
                    //ShowError("Response Error", e, getCaseShort);
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