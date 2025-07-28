/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var url = "https://ceemis.mglsd.go.ug:8080/api.ceemis/service/";
//var url = "https://esafeafrica.com/api.ceemis/service/";
var user = '';
var role = '';
var type = '';
var organ = '';
var userid = '';
var res_name = '';
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

    // datepicker('model_c_date');
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
                            document.getElementById('user_name').innerHTML = value.name;
                            document.getElementById('m_cc').value = jdata.email;
                            document.getElementById('m_bb').value = "esafealliance@gmail.com";


                            document.getElementById('model_c_assignid').value = jdata.resid;
                            document.getElementById('model_c_assignee').value = jdata.name;

                            type = value.type;
                            organ = value.organ;
                            userid = value.resid;
                            res_name = value.name;
                            act_name = value.name;
                            //setRole(value.role);
                            setAdmin_role(value.role);
                            setType(value.type);
                            loadCases(type, value.resid, organ);
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


function loadCases(input, userid, organs) {
    if (input === "1") {
        loadMyCases_Officer(userid);
        loadMySubCases_Officer(userid);
    } else if (input === "2") {
        loadMyCases_Officer(userid);
        loadMySubCases_Officer(userid);
    } else if (input === "3") {
        loadMyCases_Officer(userid);
        loadMySubCases_Officer(userid);
    } else if (input === "4") {
        loadMyCases_Officer(userid);
        loadMySubCases_Officer(userid);
    } else {
        alert("Error Code");
    }
}


function getStatus(input) {
    if (input === '0') {
        return '<span class="badge badge-danger">New Case</span>';
    } else if (input === '1' || input === '2') {
        return '<span class="badge badge-info">In-Progress</span>';
    } else if (input === '3') {
        return '<span class="badge badge-info">Refered to Us</span>';
    } else if (input === '4') {
        return '<span class="badge badge-success">Closed Case</span>';
    } else if (input === '5') {
        return '<span class="badge badge-success">Compliment</span>';
    } else {
        return '<span class="badge badge-sucess">Unclear Status</span>';
    }
}

function getCaseType(input) {
    if (input === "1") {
        return "Short Case";
    } else if (input === "2") {
        return "Detailed Case";
    } else {
        return "Error";
    }
}

//document.getElementById('all_mw').addEventListener('click', allCase);
function allCase(event) {
    event.preventDefault();
    loadCases(type, userid, organ);
}

function loadMyCases() {
    try {
        $.ajax({
//
            url: url + "fetch/case_mgt",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#case_mgt_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#case_mgt_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.case_mgt;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';

                            e_data += '<td>' + value.caseTicket + '</td>';
                            e_data += '<td>' + getCaseType(value.caseType) + '</td>';
                            e_data += '<td>' + value.caseDetails + '</td>';
                            e_data += '<td>' + value.followUp + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.case_mgt, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';

                                e_data += '<td>' + value.caseTicket + '</td>';
                                e_data += '<td>' + getCaseType(value.caseType) + '</td>';
                                e_data += '<td>' + value.caseDetails + '</td>';
                                e_data += '<td>' + value.followUp + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#case_mgt_table").append(e_data);
                    pager('case_mgt_table');
                } catch (e) {
                    ShowError("Response Error", e, loadMyCases);
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



function loadMyCases_Officer(input) {
    try {
        $.ajax({
//
            url: url + "fetch/case_mgt_officer/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#case_mgt_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#case_mgt_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.case_mgt;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                            e_data += '<td>' + value.caseTicket + '</td>';
                            e_data += '<td>' + value.caseType + '</td>';
                            e_data += '<td>' + value.caseDetails + '</td>';
                            e_data += '<td>' + value.followUp + '</td>';
                            e_data += '<td>' + value.remarks + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.case_mgt, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                                e_data += '<td>' + value.caseTicket + '</td>';
                                e_data += '<td>' + value.caseType + '</td>';
                                e_data += '<td>' + value.caseDetails + '</td>';
                                e_data += '<td>' + value.followUp + '</td>';
                                e_data += '<td>' + value.remarks + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#case_mgt_table").append(e_data);
                    pager('case_mgt_table');
                } catch (e) {
                    ShowError("Response Error", e, loadMyCases);
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


function loadMySubCases() {
    try {
        $.ajax({
//
            url: url + "fetch/subcase_mgt",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#subcase_mgt_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#subcase_mgt_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.sub_case_mgt;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageSubCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';

                            e_data += '<td>' + value.caseTicket + '</td>';
                            e_data += '<td>' + value.caseType + '</td>';
                            e_data += '<td>' + value.caseDetails + '</td>';
                            e_data += '<td>' + value.followUp + '</td>';
                            e_data += '<td>' + value.remarks + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.sub_case_mgt, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageSubCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                                e_data += '<td>' + value.caseTicket + '</td>';
                                e_data += '<td>' + value.caseType + '</td>';
                                e_data += '<td>' + value.caseDetails + '</td>';
                                e_data += '<td>' + value.followUp + '</td>';
                                e_data += '<td>' + value.remarks + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#subcase_mgt_table").append(e_data);
                    pager('subcase_mgt_table');
                } catch (e) {
                    ShowError("Response Error", e, loadMyCases);
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



function loadMySubCases_Officer(input) {
    try {
        $.ajax({
//
            url: url + "fetch/subcase_mgt_officer/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#subcase_mgt_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#subcase_mgt_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.sub_case_mgt;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageSubCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                            e_data += '<td>' + value.caseTicket + '</td>';
                            e_data += '<td>' + value.caseType + '</td>';
                            e_data += '<td>' + value.caseDetails + '</td>';
                            e_data += '<td>' + value.followUp + '</td>';
                            e_data += '<td>' + value.remarks + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.sub_case_mgt, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageSubCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                                e_data += '<td>' + value.caseTicket + '</td>';
                                e_data += '<td>' + value.caseType + '</td>';
                                e_data += '<td>' + value.caseDetails + '</td>';
                                e_data += '<td>' + value.followUp + '</td>';
                                e_data += '<td>' + value.remarks + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#subcase_mgt_table").append(e_data);
                    pager('subcase_mgt_table');
                } catch (e) {
                    ShowError("Response Error", e, loadMyCases);
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


//document.getElementById('search_mw').addEventListener('click', SearchCases);
function SearchCases(event) {
    event.preventDefault();

    var id = document.getElementById('mw_id').value;
    try {
        $.ajax({
//
            url: url + "fetch/case_mgt/0/null/" + id,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#case_mgt_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#case_mgt_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.case_mgt;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.genid + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.genid + '</td>';
                            e_data += '<td>' + value.caseTicket + '</td>';
                            e_data += '<td>' + getCaseType(value.caseType) + '</td>';
                            e_data += '<td>' + value.caseDetails + '</td>';
                            e_data += '<td>' + value.recommendation + '</td>';
                            e_data += '<td>' + value.followUp + '</td>';
                            e_data += '<td>' + value.remarks + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.case_mgt, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.genid + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.genid + '</td>';
                                e_data += '<td>' + value.caseTicket + '</td>';
                                e_data += '<td>' + getCaseType(value.caseType) + '</td>';
                                e_data += '<td>' + value.caseDetails + '</td>';
                                e_data += '<td>' + value.recommendation + '</td>';
                                e_data += '<td>' + value.followUp + '</td>';
                                e_data += '<td>' + value.remarks + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#case_mgt_table").append(e_data);
                    pager('case_mgt_table');
                } catch (e) {
                    ShowError("Response Error", e, loadMyCases);
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


function manageCase(input) {
    //loadItem();

    let nam = $(input).attr("name");
    window.groupID = nam;

    loadMsg(nam);
    getCases(input);
    getCaseMgt(input);
    //loadLogs(input, 'act_mw_table', 'act_mw_table_body');
    loadLogsTimelime(input, 'timeline');
    loadAttachment(input, 'model_att_table', 'model_attach_table_body');
    loadSubcaseCat(input);
    loadSubcaseCatTable(input);
    loadSubCaseOfficer_ticket(input);
    //document.getElementById('officer_div').style.visibility = "hidden";
    $('#manage_case').modal('show');

}


function manageSubCase(input) {
    console.log(input);
    //loadItem();

    let nam = $(input).attr("name");
    window.subgroupID = nam;

    subloadMsg(name);
    getSubCases(input);
    getSubCaseMgt(input);
    loadLogsTimelime(input, 'sub_timeline');
    //loadLogs(input, 'sub_act_mw_table', 'sub_act_mw_table_body');
    loadAttachment(input, 'sub_model_att_table', 'sub_model_attach_table_body');
    $('#manage_sub_case').modal('show');
}


function getCases(input) {
    let x = $(input).attr("value");
    console.log(x);
    getCaseDet(input);
    //if (x === '1') {
    // getSubCaseShort(input);
    // } else if (x === '2') {
    // } else {
    //     alert('Case has no type');
    // }
}


function getSubCases(input) {
    let x = $(input).attr("value");
    console.log(x);
    getSubCaseDet(input);
    //if (x === '1') {
    // getSubCaseShort(input);
    // } else if (x === '2') {
    // } else {
    //     alert('Case has no type');
    // }
}


document.getElementById('model_att_button').addEventListener('click', attachDocu);
function attachDocu(event) {
    event.preventDefault();
    let caseticket = document.getElementById("model_att_id").value;
    let caseDetails = document.getElementById("model_att_det").value;
    let caseAttach = document.getElementById("model_att_file");//.value;

    addAttachment(caseticket, caseDetails, caseAttach);
}

function getCaseShort(input) {
    // let id = $(input).attr("id");

    let id = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/emergencybi/0/" + id + "/null/null/null",
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
                        var jdata = data.emergency;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            console.log(jdata.who_name);
                            document.getElementById('model_t_id').value = jdata.id;
                            document.getElementById('model_t_ticket').value = jdata.emerid;
                            document.getElementById('model_t_mwname').value = jdata.name;
                            document.getElementById('model_t_pass').value = jdata.passport;
                            document.getElementById('model_t_cat').value = jdata.topic;
                            document.getElementById('model_t_reporter').value = jdata.who_name;
                            document.getElementById('model_t_r_cont').value = jdata.who_phone;
                            //document.getElementById('model_t_cat').value = jdata.topic;
                            document.getElementById('model_t_det').value = jdata.details;
                            document.getElementById('model_t_loca').value = jdata.location;
                            //document.getElementById('model_c_id').value = jdata.emerid;
                            document.getElementById('model_c_cc').value = jdata.topic;
                            document.getElementById('model_c_det').value = jdata.details;
                            document.getElementById('model_att_id').value = jdata.emerid;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.emergency, function (index, value) {
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
                    ShowError("Response Error", e, getCaseShort);
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


function getCaseDet(input) {
    // let id = $(input).attr("id");

    let id = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/case_ticket/0/" + id + "/null",
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
                        var jdata = data.Case_ticket;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            document.getElementById('model_counter').innerHTML = dayCounter(getDate_formart(jdata.datereg)) + " Days";
                            ageColor(dayCounter(getDate_formart(jdata.datereg)));
                            if (jdata.mw_passport_no === "NA" || jdata.mw_passport_no === "Unknown") {
                                document.getElementById('model_t_mwname').value = jdata.mw_name;
                                document.getElementById('model_tmw_userid').value = jdata.mw_sys_id;
                                document.getElementById('model_t_pass').value = jdata.mw_passport_no;
                                document.getElementById('model_t_lco').value = jdata.local_agency;
                                document.getElementById('model_t_lco_con').value = jdata.local_phone;
                                document.getElementById('model_t_lco_email').value = jdata.local_email;
                                document.getElementById('model_t_fco').value = jdata.foreign_agency;
                                document.getElementById('model_t_fco_con').value = jdata.foreign_phone;
                                document.getElementById('model_t_fco_email').value = jdata.foreign_email;
                            } else {
                                getMW_Details_Case(jdata.mw_sys_id, 'model_t_mwname', 'model_t_pass', '1', 'model_t_lco', 'model_t_lco_con', 'model_t_lco_email', 'model_t_fco', 'model_t_fco_con', 'model_t_fco_email', 'model_mw_pic');

                            }
                            document.getElementById('model_t_id').value = jdata.id;
                            document.getElementById('model_t_ticket').value = jdata.case_id;
                            document.getElementById('model_tmw_userid').value = jdata.mw_sys_id;
                            document.getElementById('model_t_cat').value = jdata.comp_category;
                            document.getElementById('model_t_det').value = jdata.mw_assistance;
                            document.getElementById('model_t_loca').value = jdata.mw_loca;
                            document.getElementById('model_t_reporter').value = jdata.who_name;
                            document.getElementById('model_t_r_cont').value = jdata.who_phone;
                            //document.getElementById('model_c_id').value = jdata.case_id;
                            //document.getElementById('model_c_cc').value = jdata.comp_category;
                            // document.getElementById('model_c_det').value = jdata.mw_assistance;
                            document.getElementById('model_att_id').value = jdata.case_id;



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



function getSubCaseShort(input) {
    // let id = $(input).attr("id");

    let id = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/emergencybi/0/" + id + "/null/null/null",
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
                        var jdata = data.emergency;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            document.getElementById('sub_model_t_id').value = jdata.id;
                            document.getElementById('sub_model_t_ticket').value = jdata.emerid;
                            document.getElementById('sub_model_t_mwname').value = jdata.name;
                            document.getElementById('sub_model_t_pass').value = jdata.passport;
                            document.getElementById('sub_model_t_cat').value = jdata.topic;
                            document.getElementById('sub_model_t_det').value = jdata.details;
                            document.getElementById('sub_model_t_loca').value = jdata.location;
                            //document.getElementById('model_c_id').value = jdata.emerid;
                            document.getElementById('sub_model_c_cc').value = jdata.topic;
                            document.getElementById('sub_model_c_det').value = jdata.details;
                            document.getElementById('sub_model_att_id').value = jdata.emerid;



                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.emergency, function (index, value) {
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
                    ShowError("Response Error", e, getCaseShort);
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


function getSubCaseDet(input) {
    // let id = $(input).attr("id");

    let id = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/case_ticket/0/" + id + "/null",
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
                        var jdata = data.Case_ticket;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            document.getElementById('sub_model_counter').innerHTML = dayCounter(getDate_formart(jdata.datereg)) + " Days";
                            ageColor(dayCounter(getDate_formart(jdata.datereg)));
                            document.getElementById('sub_model_t_id').value = jdata.id;
                            document.getElementById('sub_model_t_ticket').value = jdata.case_id;
                            document.getElementById('sub_model_t_cat').value = jdata.comp_category;
                            document.getElementById('sub_model_t_det').value = jdata.mw_assistance;
                            document.getElementById('sub_model_t_loca').value = jdata.mw_loca;
                            document.getElementById('sub_model_t_mwname').value = jdata.mw_name;
                            document.getElementById('sub_model_t_pass').value = jdata.mw_passport_no;
                            //document.getElementById('model_c_id').value = jdata.case_id;
                            //document.getElementById('model_c_cc').value = jdata.comp_category;
                            // document.getElementById('model_c_det').value = jdata.mw_assistance;
                            document.getElementById('sub_model_att_id').value = jdata.case_id;



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



function getCaseMgt(input) {
    let id = $(input).attr("id");
    //let id = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/case_mgt/" + id + "/null/null",
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
                        var jdata = data.case_mgt;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            document.getElementById('model_m_id').value = jdata.genid;
                            document.getElementById('model_t_type').value = jdata.caseType;
                            //document.getElementById('model_c_id').value = jdata.caseTicket;
                            //document.getElementById('model_c_cc').value = jdata.topic;
                            //document.getElementById('model_c_det').value = jdata.caseDetails;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.case_mgt, function (index, value) {
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
                    //pager('logs');
                } catch (e) {
                    ShowError("Response Error", e, getCaseShort);
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


function getSubCaseMgt(input) {
    let id = $(input).attr("id");
    //let id = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/case_mgt/" + id + "/null/null",
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
                        var jdata = data.case_mgt;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            document.getElementById('sub_model_m_id').value = jdata.genid;
                            document.getElementById('sub_model_t_type').value = jdata.caseType;
                            //document.getElementById('model_c_id').value = jdata.caseTicket;
                            //document.getElementById('model_c_cc').value = jdata.topic;
                            //document.getElementById('model_c_det').value = jdata.caseDetails;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.case_mgt, function (index, value) {
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
                    pager('logs');
                } catch (e) {
                    ShowError("Response Error", e, getCaseShort);
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



document.getElementById('model_c_button').addEventListener('click', manageCases);
function manageCases(event) {
    event.preventDefault();
    var x = document.getElementById("model_t_type").value;
    updateCaseMgt();
    updateCaseDet();
}


function updateCaseMgt() {
    let formData = new FormData();

    let ticket_id = document.getElementById("model_m_id").value;
    let reco = document.getElementById("model_c_reco").value;
    let remarks = document.getElementById("model_c_rema").value;
    let action = document.getElementById("model_c_action").value;
    //let dates = document.getElementById("model_c_date").value;
    let status = $("#model_c_status :selected").attr('id');
    let id = document.getElementById("model_t_id").value;
    //let followUp = document.getElementById("model_m_remark").value;
    //let remarks = document.getElementById("model_m_officer").value;

    //console.log(officer);
    formData.append('id', id);
    formData.append('genid', ticket_id);
    formData.append('recommendation', reco);
    formData.append('remarks', remarks);
    //formData.append('action', action);
    formData.append('followUp', "NA");
    formData.append('status', status);


    fetch(url + "update/case_mgt_status",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Case Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



function updateCaseShort() {
    let formData = new FormData();


    let id = document.getElementById("model_t_id").value;
    let ticket_id = document.getElementById("model_t_ticket").value;
    let reco = document.getElementById("model_c_reco").value;
    let remarks = document.getElementById("model_c_rema").value;
    let action = document.getElementById("model_c_action").value;
    let dates = document.getElementById("model_c_date").value;
    let status = $("#model_c_status :selected").attr('id');
    //let followUp = document.getElementById("model_m_remark").value;
    //let remarks = document.getElementById("model_m_officer").value;

    //console.log(officer);
    formData.append('id', id);
    //formData.append('genid', "null");
    formData.append('emerid', ticket_id);
    formData.append('details', remarks);
    formData.append('status', status);
    //formData.append('action', action);
    //formData.append('followUp', dates);
    //formData.append('status', "1");

    fetch(url + "update/emergency_status",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Case Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}




function updateCaseDet() {
    let formData = new FormData();

    let ticket_id = document.getElementById("model_t_ticket").value;
    let reco = document.getElementById("model_c_reco").value;
    let remarks = document.getElementById("model_c_rema").value;
    let action = document.getElementById("model_c_action").value;
    let dates = document.getElementById("model_c_date").value;
    let status = $("#model_c_status :selected").attr('id');
    let id = document.getElementById("model_t_id").value;
    //let followUp = document.getElementById("model_m_remark").value;
    //let remarks = document.getElementById("model_m_officer").value;

    //console.log(officer);
    formData.append('id', id);
    formData.append('case_id', ticket_id);
    formData.append('observation', remarks);
    formData.append('recommendation', reco);
    formData.append('action', action);
    formData.append('status', status);
    //formData.append('followUp', dates);
    //formData.append('status', "1");


    fetch(url + "update/case_status",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Case Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}

function ageColor(input) {
    //console.log(input);
    //document.getElementById('model_counter').style.color = 'red';
    if (parseInt(input) > 0 && parseInt(input) <= 14) {
        document.getElementById('model_counter').style.color = 'green';
        document.getElementById('sub_model_counter').style.color = 'green';
    } else if (parseInt(input) >= 15 && parseInt(input) <= 30) {
        document.getElementById('model_counter').style.color = 'orange';
        document.getElementById('sub_model_counter').style.color = 'orange';
    } else {
        document.getElementById('model_counter').style.color = 'red';
        document.getElementById('sub_model_counter').style.color = 'red';
    }
}


function setOfficerby() {
    let s = $("#model_c_status :selected").attr('id');
    console.log(s);
    if (s === "2") {
        document.getElementById('officer_div').style.display = 'block';
        loadOrganOfficers(organ);
    } else if (s === "6") {
        document.getElementById('officer_div').style.display = 'block';
        loadOfficers();
    } else {
        document.getElementById('officer_div').style.display = 'none';
        //document.getElementById('officer_div').style.visibility = "hidden";
        //document.getElementById('officer_div').style.display = 'none';
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
                //console.log(data);
                var e_data = '';
                try {
                    $("#model_c_officer").empty();
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
                    $("#model_c_officer").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadOrganOfficers);
                }
            },
            error: function (d) {
                console.log(d);
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





function loadOfficers() {
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
                // $("#prop_body").html('<tr><td colspan="5" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#model_c_officer").empty();
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
                    $("#model_c_officer").append(e_data);
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


document.getElementById('model_c_assign').addEventListener('click', subassignOfficer);
function subassignOfficer(event) {
    event.preventDefault();
    let formData = new FormData();

    let caseticket = document.getElementById("model_t_ticket").value;
    let caseType = document.getElementById("model_t_type").value;
    let caseDetails = document.getElementById("model_t_det").value;
    let assigneeId = document.getElementById("model_c_assignid").value;
    let assignee = document.getElementById("model_c_assignee").value;
    let officerId = $("#model_c_officer :selected").attr('id');
    let officer = document.getElementById("model_c_officer").value;


    //console.log(officer);
    formData.append('caseticket', caseticket);
    formData.append('caseType', caseType);
    formData.append('caseDetails', caseDetails);
    formData.append('assigneeId', assigneeId);
    formData.append('assignee', assignee);
    formData.append('officerId', officerId);
    formData.append('officer', officer);
    formData.append('recommendation', "NA");
    formData.append('followUp', "NA");
    formData.append('remarks', "NA");
    formData.append('emb', "1");

    fetch(url + "create/subcase_mgt",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            logger(caseticket, "Instructions", officer, act_name);
            logger(officer, "Instructions", caseticket + " | " + caseDetails, act_name);
            alert("Case SubAssigment Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}





function loadSubCaseOfficer_ticket(input) {
    var name = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/subcase_mgt/0/null/" + name,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#subcase_mw_table_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                console.log(data);
                try {
                    $("#subcase_mw_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.sub_case_mgt;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.officer + '</td>';
                            e_data += '<td>' + value.officerId + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="deleteSub(this)"  type="button"  class="btn btn-primary" >Remove</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.sub_case_mgt, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.officer + '</td>';
                                e_data += '<td>' + value.officerId + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="deleteSub(this)"  type="button"  class="btn btn-primary" >Remove</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#subcase_mw_table").append(e_data);
                    pager('subcase_mw_table');
                } catch (e) {
                    ShowError("Response Error", e, loadMyCases);
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

function deleteSub(input) {
    let formData = new FormData();

    let id = $(input).attr("id");
    formData.append('id', id);
    $.ajax({
        url: url + "delete/subcase_mgt",
        //dataType: 'json',
        data: formData,
        type: 'POST',
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            //checker(data.status, email);
            alert("Cleared");
        },
        error: function (d) {
            console.log(d);
        }
    });
}



document.getElementById('model_c_subcase_btn').addEventListener('click', addsubCase_cat);
function addsubCase_cat(event) {
    event.preventDefault();
    let formData = new FormData();

    let caseticket = document.getElementById("model_t_ticket").value;
    let name = document.getElementById("mw_comp_category").value;

    //console.log(officer);
    formData.append('caseid', caseticket);
    formData.append('name', name);

    fetch(url + "create/subcat",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            logger(caseticket, "Subcategory Added", name, act_name);
            //logger(officer, "Instructions", caseticket + " | " + caseDetails);
            alert("Sub Category Added");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function deletesubCase_cat(input) {
    let formData = new FormData();

    let id = $(input).attr("id");
    formData.append('id', id);
    $.ajax({
        url: url + "delete/subcat",
        //dataType: 'json',
        data: formData,
        type: 'POST',
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            //checker(data.status, email);
            alert("Cleared");
        },
        error: function (d) {
            console.log(d);
        }
    });
}




function loadSubcaseCat(input) {
    var caseid = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/subcat/0/" + caseid,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#sub_list").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                console.log(data);
                try {
                    $("#sub_list").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.sub_case_cat;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<li style="display:inline">&bull;' + value.name + ' &nbsp;&nbsp;&nbsp;</li>';
                        } else {
                            $.each(data.sub_case_cat, function (index, value) {
                                //console.log(value.id);
                                e_data += '<li style="display:inline">&bull;' + value.name + ' &nbsp;&nbsp;&nbsp;</li>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#sub_list").append(e_data);
                    //pager('subcase_mw_table');
                } catch (e) {
                    ShowError("Response Error", e, loadSubcaseCat);
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



function loadSubcaseCatTable(input) {
    var caseid = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/subcat/0/" + caseid,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#cat_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                console.log(data);
                try {
                    $("#cat_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.sub_case_cat;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="deletesubCase_cat(this)"  type="button"  class="btn btn-primary" >Remove</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.sub_case_cat, function (index, value) {
                                //console.log(value.id);

                                e_data += '<tr>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="deletesubCase_cat(this)"  type="button"  class="btn btn-primary" >Remove</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#cat_table").append(e_data);
                    pager('cat_table');
                } catch (e) {
                    ShowError("Response Error", e, loadSubcaseCatTable);
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


function composeEmail(event) {
    event.preventDefault();

    let to = document.getElementById("m_to").value;
    let cc = 'esafealliance@gmail.com';//document.getElementById("m_cc").value;
    let bb = 'consular.helpdesk@ugandaembassyriyadh.com';//document.getElementById("m_bb").value;
    let sub = document.getElementById("m_sub").value;
    let body = document.getElementById("m_txt_bd").value;

    sendCompose(to, cc, bb, sub, body);

}




document.getElementById('model_comment_btn').addEventListener('click', commentCase);
function commentCase(event) {
    event.preventDefault();
    let formData = new FormData();

    let caseticket = document.getElementById("model_t_ticket").value;
    let com = document.getElementById("model_comment").value;
    let ctype = $("#model_comment_type :selected").attr('id');

    //console.log(officer);
    formData.append('ref', caseticket);
    formData.append('name', "Case Comment");
    formData.append('det', com);
    formData.append('by', act_name);
    formData.append('status', ctype);

    fetch(url + "create/logger",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Comment Update Added");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



document.getElementById('sub_model_c_button').addEventListener('click', SubcommentCase);
function SubcommentCase(event) {
    event.preventDefault();
    let formData = new FormData();

    let caseticket = document.getElementById("sub_model_t_ticket").value;
    let com = document.getElementById("model_comment").value;
    let ctype = $("#sub_model_comment_type :selected").attr('id');

    //console.log(officer);
    formData.append('ref', caseticket);
    formData.append('name', "Case Comment");
    formData.append('det', com);
    formData.append('by', act_name);
    formData.append('status', ctype);

    fetch(url + "create/logger",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Comment Update Added");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


const chatContainer = document.querySelector('#chat_div');
const sub_chatContainer = document.querySelector('#sub_chat_div');

// Helper function to create a message element
function createMessageElement(sender, by, text, timestamp) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender === 'User' ? 'user' : 'bot'}`;

    const textDiv = document.createElement('div');
    textDiv.className = 'text';
    textDiv.textContent = text;

    const metadataDiv = document.createElement('div');
    metadataDiv.className = 'metadata';

    const usernameSpan = document.createElement('span');
    usernameSpan.className = 'username';
    usernameSpan.textContent = by;

    const timestampSpan = document.createElement('span');
    timestampSpan.className = 'timestamp';
    timestampSpan.textContent = timestamp;

    metadataDiv.appendChild(usernameSpan);
    metadataDiv.appendChild(timestampSpan);

    messageDiv.appendChild(textDiv);
    messageDiv.appendChild(metadataDiv);

    return messageDiv;
}


// Populate the chat with messages
// Function to populate messages into the chat
function populateMsg(data) {
    // Sort the messages by date in descending order
    //data.sort((a, b) => new Date(b.datereg) - new Date(a.datereg));

    // Sort the messages by date in ascending order
    data.sort((a, b) => new Date(a.datereg) - new Date(b.datereg));

    // Clear the chat container before populating
    chatContainer.innerHTML = '';

    // Loop through the sorted messages and append them
    data.forEach(message => {
        const sender = message.senderid.startsWith('U') ? 'User' : 'Bot';
        const text = message.msgtext;
        const by = message.msgby;
        const timestamp = new Date(message.datereg).toLocaleString();

        const messageElement = createMessageElement(sender, by, text, timestamp);
        chatContainer.appendChild(messageElement);
    });
}



function loadMsg(input) {
    //https://esafeafrica.com/api.monitoring_mglsd/service/fetch/message/MGLSD8471215/1/2/OU18746550
    try {
        $.ajax({
            url: url + "fetch/message/" + input + "/1/2/" + userid,
            dataType: 'json',
            type: 'get',
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $("#chat_div").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            success: function (data) {
                try {
                    $("#chat_div").empty();

                    if (!isEmpty(data)) {
                        // Save data globally for filtering
                        window.msgData = data.message;
                        // Populate table with initial data
                        populateMsg(data.message);

                    } else {
                        $("#chat_div").html('<tr><td colspan="13" align="center">No data available</td></tr>');
                    }
                } catch (e) {
                    console.error("Error processing data:", e);
                }
            },
            error: function (d) {
                alert("Error", "Unable to fetch case data. Please try again.");
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}





function setTextOfficer() {
    let s = document.getElementById("messageType").value;
    //let s = $("#messageType :selected").value;
    //console.log(s);
    if (s === "officer") {
        document.getElementById('officer_sel').style.display = 'block';
        //document.getElementById('officer_div').style.display = 'show';
        getTextOfficer(organ);
    } else {
        document.getElementById('officer_sel').style.display = 'none';
    }
}


function getTextOfficer(input) {
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
                    $("#officer_sel").empty();
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
                    $("#officer_sel").append(e_data);
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


document.getElementById('chat_btn_send').addEventListener('click', caseChat);
function caseChat(event) {
    event.preventDefault();
    let formdata = new FormData();

    let caseticket = document.getElementById("model_t_ticket").value;
    let msgtext = document.getElementById("messageInput").value;
    let statu = $("#messageType :selected").attr('id');
    let msgto = $("#officer_sel :selected").attr('id');
    //const msgto = document.getElementById('officer_sel');
    let username = document.getElementById('user_name').innerHTML;


    formdata.append("groupid", caseticket);
    formdata.append("senderid", user);
    formdata.append("msgtext", msgtext);
    formdata.append("msgto", msgto);
    formdata.append("msgby", username);
    formdata.append("status", statu);


    fetch(url + "create/message",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            loadMsg(window.groupID);
            alert("Message Sent");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}





// Populate the chat with messages
// Function to populate messages into the chat
function subpopulateMsg(data) {
    // Sort the messages by date in descending order
    //data.sort((a, b) => new Date(b.datereg) - new Date(a.datereg));

    // Sort the messages by date in ascending order
    data.sort((a, b) => new Date(a.datereg) - new Date(b.datereg));

    // Clear the chat container before populating
    sub_chatContainer.innerHTML = '';

    // Loop through the sorted messages and append them
    data.forEach(message => {
        const sender = message.senderid.startsWith('U') ? 'User' : 'Bot';
        const text = message.msgtext;
        const by = message.msgby;
        const timestamp = new Date(message.datereg).toLocaleString();

        const messageElement = createMessageElement(sender, by, text, timestamp);
        sub_chatContainer.appendChild(messageElement);
    });
}



function subloadMsg(input) {
    //https://esafeafrica.com/api.monitoring_mglsd/service/fetch/message/MGLSD8471215/1/2/OU18746550
    try {
        $.ajax({
            url: url + "fetch/message/" + input + "/1/2/" + userid,
            dataType: 'json',
            type: 'get',
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $("#sub_chat_div").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            success: function (data) {
                try {
                    $("#sub_chat_div").empty();

                    if (!isEmpty(data)) {
                        // Save data globally for filtering
                        window.msgData = data.message;
                        // Populate table with initial data
                        subpopulateMsg(data.message);

                    } else {
                        $("#sub_chat_div").html('<tr><td colspan="13" align="center">No data available</td></tr>');
                    }
                } catch (e) {
                    console.error("Error processing data:", e);
                }
            },
            error: function (d) {
                alert("Error", "Unable to fetch case data. Please try again.");
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}





function setTextOfficer() {
    let s = document.getElementById("messageType").value;
    //let s = $("#messageType :selected").value;
    //console.log(s);
    if (s === "officer") {
        document.getElementById('officer_sel').style.display = 'block';
        //document.getElementById('officer_div').style.display = 'show';
        getTextOfficer(organ);
    } else {
        document.getElementById('officer_sel').style.display = 'none';
    }
}


function subgetTextOfficer(input) {
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
                    $("#sub_officer_sel").empty();
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
                    $("#sub_officer_sel").append(e_data);
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


document.getElementById('sub_chat_btn_send').addEventListener('click', subcaseChat);
function subcaseChat(event) {
    event.preventDefault();
    let formdata = new FormData();

    let caseticket = document.getElementById("sub_model_t_ticket").value;
    let msgtext = document.getElementById("sub_messageInput").value;
    let statu = $("#sub_messageType :selected").attr('id');
    let msgto = $("#sub_officer_sel :selected").attr('id');
    //const msgto = document.getElementById('officer_sel');
    let username = document.getElementById('user_name').innerHTML;


    formdata.append("groupid", caseticket);
    formdata.append("senderid", user);
    formdata.append("msgtext", msgtext);
    formdata.append("msgto", msgto);
    formdata.append("msgby", username);
    formdata.append("status", statu);


    fetch(url + "create/message",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            subloadMsg(window.subgroupID);
            alert("Message Sent");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



