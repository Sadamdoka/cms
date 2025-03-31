/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var url = "http://154.72.194.17:8080/api.ceemis/service/"
//var url = "https://esafeafrica.com/api.ceemis/service/";


var user = '';
var role = '';
var type = '';
var organ = '';
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
                            document.getElementById('user_name').innerHTML = value.name;
                            document.getElementById('user_name_head').innerHTML = value.name;
                            document.getElementById('user_email').innerHTML = value.email;
                            act_name = value.name;
                            setType(value.type);
                            type = value.type;
                            organ = value.organ;

                            setAdmin_role(value.role);
                            setRole(value.role);
                            loadChecks(value.type, value.organ);
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


function loadChecks(input, organs) {
    if (input === "1") {
        loadCheck_ups_organ(organs);
    } else if (input === "2") {
        loadCheck_ups_organ_foreign(organs);
    } else if (input === "3") {
        loadCheck_ups();
    } else if (input === "4") {
        loadCheck_ups();
    } else {
        alert("Error Code");
    }
}

function getStatus(input) {
    if (input === "0") {
        return "Migrant Worker hasn't Replied Yet";
    } else if (input === "1") {
        return "Migrant Worker Replied";
    } else {
        return "Error";
    }
}


function getPeriod(input) {
    if (input === "1") {
        return "Arrival Check Up";
    } else if (input === "2") {
        return "7 Days Check Up";
    } else if (input === "3") {
        return "14 Days Check Up";
    } else if (input === "4") {
        return "1 Month";
    } else if (input === "5") {
        return "3 Months";
    } else if (input === "6") {
        return "6 Months";
    } else if (input === "7") {
        return "1 Year";
    } else if (input === "8") {
        return "1 & Half Years";
    } else if (input === "9") {
        return "End of Contract";
    } else if (input === "10") {
        return "Non Applicable";
    } else {
        return "Error";
    }
}


function loadCheck_ups() {
    try {
        $.ajax({
//
            url: url + "fetch/check",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#check_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#check_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.check_up;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.workerid + '</td>';
                            e_data += '<td>' + value.qtn + '</td>';
                            e_data += '<td>' + value.answer + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.workerid + '" onclick="manageMW(this)"  type="button"  class="btn btn-primary" >View</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.check_up, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.workerid + '</td>';
                                e_data += '<td>' + value.qtn + '</td>';
                                e_data += '<td>' + value.answer + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.workerid + '" onclick="manageMW(this)"  type="button"  class="btn btn-primary" >View</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#check_table").append(e_data);
                    pager('check_table');
                } catch (e) {
                    ShowError("Response Error", e, loadCheck_ups);
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


function loadCheck_ups_organ(input) {

    let status = $("#sel_status :selected").attr('id');
    try {
        $.ajax({
//
            url: url + "fetch/checks/null/null/" + input + "/null/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#check_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#check_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.check_up;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.workerid + '</td>';
                            e_data += '<td>' + value.qtn + '</td>';
                            e_data += '<td>' + value.answer + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.workerid + '" onclick="manageMW(this)"  type="button"  class="btn btn-primary" >View</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.check_up, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.workerid + '</td>';
                                e_data += '<td>' + value.qtn + '</td>';
                                e_data += '<td>' + value.answer + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.workerid + '" onclick="manageMW(this)"  type="button"  class="btn btn-primary" >View</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#check_table").append(e_data);
                    pager('check_table');
                } catch (e) {
                    ShowError("Response Error", e, loadCheck_ups_organ);
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



function loadCheck_ups_organ_foreign(input) {

    let status = $("#sel_status :selected").attr('id');
    try {
        $.ajax({
//
            url: url + "fetch/checks/null/null/null/" + input + "/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#check_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#check_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.check_up;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.workerid + '</td>';
                            e_data += '<td>' + value.qtn + '</td>';
                            e_data += '<td>' + value.answer + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.workerid + '" onclick="manageMW(this)"  type="button"  class="btn btn-primary" >View</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.check_up, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.workerid + '</td>';
                                e_data += '<td>' + value.qtn + '</td>';
                                e_data += '<td>' + value.answer + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.workerid + '" onclick="manageMW(this)"  type="button"  class="btn btn-primary" >View</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#check_table").append(e_data);
                    pager('check_table');
                } catch (e) {
                    ShowError("Response Error", e, loadCheck_ups_organ_foreign);
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


document.getElementById('all_check').addEventListener('click', allCheck);
function allCheck(event) {
    event.preventDefault();
    loadChecks(type, organ);
}

function manageMW(input) {
    //loadItem();
    //let id = $(input).attr("id");
    //console.log(id);
    getMWDetails(input);
    $('#manage_MW').modal('show');

}


function getMWDetails(input) {
    let id = $(input).attr("id");
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
                            document.getElementById('model_mw_id').value = jdata.id;
                            //document.getElementById('model_bank_id').value = jdata.id;
                            document.getElementById('model_mw_userid').value = jdata.userid;
                            document.getElementById('model_mw_pass').value = jdata.passport;
                            document.getElementById('model_mw_nin').value = jdata.nin;
                            document.getElementById('model_mw_iqama').value = jdata.iqama;
                            document.getElementById('model_mw_name').value = jdata.names;
                            document.getElementById('model_mw_email').value = jdata.email;
                            document.getElementById('model_mw_lphone').value = jdata.phone;
                            document.getElementById('model_mw_fphone').value = jdata.ex_phone;
                            document.getElementById('model_mw_marital').value = jdata.marital;
                            document.getElementById('model_mw_dob').value = jdata.dob;
                            document.getElementById('model_mw_nationality').value = jdata.nationality;
                            document.getElementById('model_mw_kin').value = jdata.kin_name;
                            document.getElementById('model_mw_kin_no').value = jdata.kin_phone;
                            document.getElementById('model_mw_organid').value = jdata.lcompany;
                            document.getElementById('model_mw_forgan').value = jdata.fcompany;
                            //document.getElementById('model_check_qtn').innerHTML = value.email;
                            document.getElementById('model_check_organuser').value = jdata.organUserid;

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
                    ShowError("Response Error", e, getMWDetails);
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




document.getElementById('search_check').addEventListener('click', loadCheck_ups_worker);
function loadCheck_ups_worker(event) {
    event.preventDefault();
    var id = document.getElementById('mw_check_id').value;
    let status = $("#sel_status :selected").attr('id');
    try {
        $.ajax({
//
            url: url + "fetch/checks/" + id + "/null/null/" + status,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#check_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#check_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.check_up;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.workerid + '</td>';
                            e_data += '<td>' + value.qtn + '</td>';
                            e_data += '<td>' + value.answer + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.workerid + '" onclick="manageMW(this)"  type="button"  class="btn btn-primary" >View</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.check_up, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.workerid + '</td>';
                                e_data += '<td>' + value.qtn + '</td>';
                                e_data += '<td>' + value.answer + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.workerid + '" onclick="manageMW(this)"  type="button"  class="btn btn-primary" >View</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#check_table").append(e_data);
                    pager('check_table');
                } catch (e) {
                    ShowError("Response Error", e, loadCheck_ups_organ);
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



