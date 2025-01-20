/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */var url = "http://192.168.20.1:8080/api.cms/service/"
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
                            var value = jdata;
                            // console.log(value.email);
                            // console.log(value.email);
                            // document.getElementById('pro_userid').innerHTML = value.resid;
                            // document.getElementById('user_name').innerHTML = value.name;
                            //document.getElementById('pro_name').innerHTML = value.name;
                            document.getElementById('user_name').innerHTML = value.name;
                            act_name = value.name;
                            //document.getElementById('user_email').innerHTML = value.email;
                            //document.getElementById('pro_email').innerHTML = value.email;
                            //document.getElementById('pro_phone').innerHTML = value.phone;
                            //document.getElementById('pro_role').innerHTML = roleSetter(value.role);
                            type = jdata.type;
                            organs = jdata.organ;
                            setType(jdata.type);
                            //setRole(jdata.role);
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
        loadFollow_lorgan(organs);
    } else if (input === "2") {
        loadFollow_forgan(organs);
    } else if (input === "3") {
        loadFollow();
    } else if (input === "4") {
        loadFollow();
    } else {
        alert("Error Code");
    }
}

function getStatus(input) {
    if (input === "0") {
        return "Not Yet";
    } else if (input === "1") {
        return "Done";
    } else {
        return "Error";
    }
}


function loadFollow() {
    try {
        $.ajax({
//
            url: url + "fetch/follow/0/UG",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#follow_body").html('<tr><td colspan="20" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#follow_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.follow;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" name="' + value.mw_id + '" onclick="manageCheck(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.mw_id + '</td>';
                            e_data += '<td>' + value.mw_passport + '</td>';
                            e_data += '<td>' + value.mw_name + '</td>';
                            e_data += '<td>' + value.last_check + '</td>';
                            e_data += '<td>' + value.loca + '</td>';
                            e_data += '<td>' + value.salary + '</td>';
                            e_data += '<td>' + value.phone + '</td>';
                            e_data += '<td>' + value.sleep + '</td>';
                            e_data += '<td>' + value.work + '</td>';
                            e_data += '<td>' + value.care + '</td>';
                            e_data += '<td>' + value.family + '</td>';
                            e_data += '<td>' + value.av_resting + '</td>';
                            e_data += '<td>' + value.emp_status + '</td>';
                            e_data += '<td>' + value.contract + '</td>';
                            e_data += '<td>' + value.extra + '</td>';
                            e_data += '<td>' + value.officer + '</td>';
                            e_data += '<td>' + value.period + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.follow, function (index, value) {
                                //console.log(value.id);

                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" name="' + value.mw_id + '"  onclick="manageCheck(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.mw_id + '</td>';
                                e_data += '<td>' + value.mw_passport + '</td>';
                                e_data += '<td>' + value.mw_name + '</td>';
                                e_data += '<td>' + value.last_check + '</td>';
                                e_data += '<td>' + value.loca + '</td>';
                                e_data += '<td>' + value.salary + '</td>';
                                e_data += '<td>' + value.phone + '</td>';
                                e_data += '<td>' + value.sleep + '</td>';
                                e_data += '<td>' + value.work + '</td>';
                                e_data += '<td>' + value.care + '</td>';
                                e_data += '<td>' + value.family + '</td>';
                                e_data += '<td>' + value.av_resting + '</td>';
                                e_data += '<td>' + value.emp_status + '</td>';
                                e_data += '<td>' + value.contract + '</td>';
                                e_data += '<td>' + value.extra + '</td>';
                                e_data += '<td>' + value.officer + '</td>';
                                e_data += '<td>' + value.period + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="20" align="center">No data</td></tr>';
                    }
                    $("#follow_table").append(e_data);
                    pager('follow_table');
                } catch (e) {
                    ShowError("Response Error", e, loadFollow);
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



function loadFollow_lorgan(input) {
    try {
        $.ajax({
//
            url: url + "fetch/follow_agency/" + input + "/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#follow_body").html('<tr><td colspan="20" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#follow_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.follow;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" name="' + value.mw_id + '"  onclick="manageCheck(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.mw_id + '</td>';
                            e_data += '<td>' + value.mw_passport + '</td>';
                            e_data += '<td>' + value.mw_name + '</td>';
                            e_data += '<td>' + value.last_check + '</td>';
                            e_data += '<td>' + value.loca + '</td>';
                            e_data += '<td>' + value.salary + '</td>';
                            e_data += '<td>' + value.phone + '</td>';
                            e_data += '<td>' + value.sleep + '</td>';
                            e_data += '<td>' + value.work + '</td>';
                            e_data += '<td>' + value.care + '</td>';
                            e_data += '<td>' + value.family + '</td>';
                            e_data += '<td>' + value.av_resting + '</td>';
                            e_data += '<td>' + value.emp_status + '</td>';
                            e_data += '<td>' + value.contract + '</td>';
                            e_data += '<td>' + value.extra + '</td>';
                            e_data += '<td>' + value.officer + '</td>';
                            e_data += '<td>' + value.period + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.follow, function (index, value) {
                                //console.log(value.id);

                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" name="' + value.mw_id + '"  onclick="manageCheck(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.mw_id + '</td>';
                                e_data += '<td>' + value.mw_passport + '</td>';
                                e_data += '<td>' + value.mw_name + '</td>';
                                e_data += '<td>' + value.last_check + '</td>';
                                e_data += '<td>' + value.loca + '</td>';
                                e_data += '<td>' + value.salary + '</td>';
                                e_data += '<td>' + value.phone + '</td>';
                                e_data += '<td>' + value.sleep + '</td>';
                                e_data += '<td>' + value.work + '</td>';
                                e_data += '<td>' + value.care + '</td>';
                                e_data += '<td>' + value.family + '</td>';
                                e_data += '<td>' + value.av_resting + '</td>';
                                e_data += '<td>' + value.emp_status + '</td>';
                                e_data += '<td>' + value.contract + '</td>';
                                e_data += '<td>' + value.extra + '</td>';
                                e_data += '<td>' + value.officer + '</td>';
                                e_data += '<td>' + value.period + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="20" align="center">No data</td></tr>';
                    }
                    $("#follow_table").append(e_data);
                    pager('follow_table');
                } catch (e) {
                    ShowError("Response Error", e, loadFollow_lorgan);
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


function loadFollow_forgan(input) {
    try {
        $.ajax({
//
            url: url + "fetch/follow_agency/null/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#follow_body").html('<tr><td colspan="20" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#follow_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.follow;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" name="' + value.mw_id + '"  onclick="manageCheck(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.mw_id + '</td>';
                            e_data += '<td>' + value.mw_passport + '</td>';
                            e_data += '<td>' + value.mw_name + '</td>';
                            e_data += '<td>' + value.last_check + '</td>';
                            e_data += '<td>' + value.loca + '</td>';
                            e_data += '<td>' + value.salary + '</td>';
                            e_data += '<td>' + value.phone + '</td>';
                            e_data += '<td>' + value.sleep + '</td>';
                            e_data += '<td>' + value.work + '</td>';
                            e_data += '<td>' + value.care + '</td>';
                            e_data += '<td>' + value.family + '</td>';
                            e_data += '<td>' + value.av_resting + '</td>';
                            e_data += '<td>' + value.emp_status + '</td>';
                            e_data += '<td>' + value.contract + '</td>';
                            e_data += '<td>' + value.extra + '</td>';
                            e_data += '<td>' + value.officer + '</td>';
                            e_data += '<td>' + value.period + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.follow, function (index, value) {
                                //console.log(value.id);

                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" name="' + value.mw_id + '"  onclick="manageCheck(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.mw_id + '</td>';
                                e_data += '<td>' + value.mw_passport + '</td>';
                                e_data += '<td>' + value.mw_name + '</td>';
                                e_data += '<td>' + value.last_check + '</td>';
                                e_data += '<td>' + value.loca + '</td>';
                                e_data += '<td>' + value.salary + '</td>';
                                e_data += '<td>' + value.phone + '</td>';
                                e_data += '<td>' + value.sleep + '</td>';
                                e_data += '<td>' + value.work + '</td>';
                                e_data += '<td>' + value.care + '</td>';
                                e_data += '<td>' + value.family + '</td>';
                                e_data += '<td>' + value.av_resting + '</td>';
                                e_data += '<td>' + value.emp_status + '</td>';
                                e_data += '<td>' + value.contract + '</td>';
                                e_data += '<td>' + value.extra + '</td>';
                                e_data += '<td>' + value.officer + '</td>';
                                e_data += '<td>' + value.period + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="20" align="center">No data</td></tr>';
                    }
                    $("#follow_table").append(e_data);
                    pager('follow_table');
                } catch (e) {
                    ShowError("Response Error", e, loadFollow_forgan);
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

function manageCheck(input) {
    getMWDetails(input);
    getFollow(input);
    loadLogsTimelime(input, 'timeline');
    $('#manage_MW').modal('show');
}



function getMWDetails(input) {
    let id = $(input).attr("name");
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
                            candidatPhoto(jdata.nin, 'model_mw_pic');
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


function getFollow(input) {
    let id = $(input).attr("id");
    try {
        $.ajax({
            url: url + "fetch/follow/" + id,
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
                        var jdata = data.follow;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            document.getElementById('model_follow_id').value = jdata.id;
                            document.getElementById('model_follow_userid').value = jdata.mw_id;
                            document.getElementById('model_follow_pass').value = jdata.mw_passport;
                            document.getElementById('model_follow_name').value = jdata.mw_name;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.follow, function (index, value) {
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
                    ShowError("Response Error", e, getFollow);
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



document.getElementById('model_follow_button').addEventListener('click', editCheck);
function editCheck(event) {
    event.preventDefault();
    let formData = new FormData();

    //let last = document.getElementById("model_follow_date").value;
    let loca = document.getElementById("model_follow_loca").value;
    let salary = document.getElementById("model_follow_salary").value;
    let phone = document.getElementById("model_follow_phone").value;
    let food = document.getElementById("model_follow_food").value;
    let sleep = document.getElementById("model_follow_sleep").value;
    let work = document.getElementById("model_follow_work").value;
    let care = document.getElementById("model_follow_care").value;
    let family = document.getElementById("model_follow_family").value;
    let av_rest = document.getElementById("model_follow_av_rest").value;
    let emp = document.getElementById("model_follow_emp").value;
    let contract = document.getElementById("model_follow_contract").value;
    let extra = document.getElementById("model_follow_extra").value;
    let id = document.getElementById("model_follow_id").value;


    formData.append('id', id);
    formData.append('loca', loca);
    formData.append('salary', salary);
    formData.append('phone', phone);
    formData.append('food', food);
    formData.append('sleep', sleep);
    formData.append('work', work);
    formData.append('care', care);
    formData.append('family', family);
    formData.append('av_rest', av_rest);
    formData.append('emp', emp);
    formData.append('contract', contract);
    formData.append('extra', extra);
    formData.append('status', "1");


    fetch(url + "update/follow_mw",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Check Up Has Been Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}
