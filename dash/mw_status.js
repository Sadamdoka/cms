/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var url = "https:esafeafrica.com/api.monitoring_mglsd/service/";
var url = "https://avienseconsults.com/api.monitoring_mglsd/service/";
//var url = "http://localhost:8080/api.esafe/service/";


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
                            document.getElementById('user_name').innerHTML = value.name;
                            document.getElementById('user_name_head').innerHTML = value.name;
                            document.getElementById('user_email').innerHTML = value.email;
                            type = value.type;
                            organs = value.organ;
                            act_name = value.name;
                            setRole(value.role);
                            setType(value.type);
                            setAdmin_role(value.role);
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



document.getElementById('acc_btn_search').addEventListener('click', searchMW);
function searchMW(event) {
    event.preventDefault();
    var input = document.getElementById('acc_mw_id').value;
    getMw(input);
}


function getMw(input) {
    try {
        $.ajax({
            url: url + "fetch/workers/" + input,
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

                            document.getElementById('nin').value = jdata.nin;
                            document.getElementById('name').value = jdata.names;
                            document.getElementById('userid').value = jdata.userid;
                            document.getElementById('passport').value = jdata.passport;

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
                    //$("#logs").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, getMw);
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


document.getElementById('gen_status').addEventListener('click', getReport);
function getReport(event) {
    event.preventDefault();


    //$("#follow_body").empty();
    //$("#medical_body").empty();
    //$("#mw_case_body").empty();
    //$("#acc_body").empty();

    var input = document.getElementById('userid').value;
    var pass = document.getElementById('passport').value;
    loadFollow(input);
    loadMedical(input);
    loadAcco(input);
    if (pass === "NA") {
        loadCases(input, "null");
    } else {
        loadCases(input, pass);
    }
}



function loadFollow(input) {
    try {
        $.ajax({
//
            url: url + "fetch/follow_mw_report/" + input,
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
                    //console.log(e);
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


function getStatus(input) {
    if (input === "0") {
        return "Not Yet";
    } else if (input === "1") {
        return "Done";
    } else {
        return "Error";
    }
}



function loadMedical(input) {
    try {
        $.ajax({
//
            url: url + "fetch/medicals/" + input + "/null/null/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#medical_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#medical_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.medical;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.requestID + '</td>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.names + '</td>';
                            e_data += '<td>' + value.problem + '</td>';
                            e_data += '<td>' + value.symptom + '</td>';
                            e_data += '<td>' + value.remarks + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.medical, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.requestID + '</td>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.names + '</td>';
                                e_data += '<td>' + value.problem + '</td>';
                                e_data += '<td>' + value.symptom + '</td>';
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
                    $("#medical_table").append(e_data);
                    pager('medical_table');
                } catch (e) {
                    ShowError("Response Error", e, loadMedical);
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





function loadCases(input, pass) {
    try {
        $.ajax({
//
            url: url + "fetch/case_ticket_mw/" + pass + "/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#mw_case_table_body").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.Case_ticket;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.case_id + '</td>';
                            e_data += '<td>' + value.who_org + '</td>';
                            e_data += '<td>' + value.who_name + '</td>';
                            e_data += '<td>' + value.who_phone + '</td>';
                            e_data += '<td>' + value.who_email + '</td>';
                            e_data += '<td>' + value.who_address + '</td>';
                            e_data += '<td>' + value.info_source + '</td>';
                            e_data += '<td>' + value.mw_name + '</td>';
                            e_data += '<td>' + value.mw_phone + '</td>';
                            e_data += '<td>' + value.mw_email + '</td>';
                            e_data += '<td>' + value.mw_sys_id + '</td>';
                            e_data += '<td>' + value.mw_passport_no + '</td>';
                            e_data += '<td>' + value.mw_dob + '</td>';
                            e_data += '<td>' + value.mw_country + '</td>';
                            e_data += '<td>' + value.mw_city + '</td>';
                            e_data += '<td>' + value.mw_contract_no + '</td>';
                            e_data += '<td>' + value.mw_date_arrival + '</td>';
                            e_data += '<td>' + value.mw_worked_me + '</td>';
                            e_data += '<td>' + value.mw_worked_house + '</td>';
                            e_data += '<td>' + value.mw_ug_address + '</td>';
                            e_data += '<td>' + value.mw_permit_no + '</td>';
                            e_data += '<td>' + value.mw_passport_status + '</td>';
                            e_data += '<td>' + value.emp_sector + '</td>';
                            e_data += '<td>' + value.local_agency + '</td>';
                            e_data += '<td>' + value.local_phone + '</td>';
                            e_data += '<td>' + value.local_email + '</td>';
                            e_data += '<td>' + value.foreign_agency + '</td>';
                            e_data += '<td>' + value.foreign_phone + '</td>';
                            e_data += '<td>' + value.foreign_email + '</td>';
                            e_data += '<td>' + value.com_times + '</td>';
                            e_data += '<td>' + value.training_center + '</td>';
                            e_data += '<td>' + value.medical_center + '</td>';
                            e_data += '<td>' + value.emp_name + '</td>';
                            e_data += '<td>' + value.emp_phone + '</td>';
                            e_data += '<td>' + value.mw_location + ' OR ' + value.mw_loca + '</td>';
                            e_data += '<td>' + value.mw_escape + '</td>';
                            e_data += '<td>' + value.mw_house_changed + '</td>';
                            e_data += '<td>' + value.mw_phone_status + '</td>';
                            e_data += '<td>' + value.mw_salary_status + '</td>';
                            e_data += '<td>' + value.mw_salary_amount + '</td>';
                            e_data += '<td>' + value.mw_food_status + '</td>';
                            e_data += '<td>' + value.mw_sleep_status + '</td>';
                            e_data += '<td>' + value.mw_rest_status + '</td>';
                            e_data += '<td>' + value.mw_rest_wake + '</td>';
                            e_data += '<td>' + value.mw_rest_bed + '</td>';
                            e_data += '<td>' + value.mw_rest_time + '</td>';
                            e_data += '<td>' + value.mw_house_size + '</td>';
                            e_data += '<td>' + value.mw_family_size + '</td>';
                            e_data += '<td>' + value.mw_other_maid + '</td>';
                            e_data += '<td>' + value.mw_contract_type + '</td>';
                            e_data += '<td>' + value.mw_other_house + '</td>';
                            e_data += '<td>' + value.mw_medical_status + '</td>';
                            e_data += '<td>' + value.mw_physical_status + '</td>';
                            e_data += '<td>' + value.mw_sexual + '</td>';
                            e_data += '<td>' + value.mw_emp_change + '</td>';
                            e_data += '<td>' + value.mw_comp_foreign + '</td>';
                            e_data += '<td>' + value.mw_comp_local + '</td>';
                            e_data += '<td>' + value.mw_comp_other + '</td>';
                            e_data += '<td>' + value.mw_contract_status + '</td>';
                            e_data += '<td>' + value.mw_eva_work + '</td>';
                            e_data += '<td>' + value.mw_eva_wake + '</td>';
                            e_data += '<td>' + value.mw_eva_wake_avg + '</td>';
                            e_data += '<td>' + value.mw_eva_phone + '</td>';
                            e_data += '<td>' + value.mw_eva_hygiene + '</td>';
                            e_data += '<td>' + value.mw_eva_service + '</td>';
                            e_data += '<td>' + value.mw_eva_comp_emp + '</td>';
                            e_data += '<td>' + value.mw_assistance + '</td>';
                            e_data += '<td>' + value.comp_category + '</td>';
                            e_data += '<td>' + value.observation + '</td>';
                            e_data += '<td>' + value.recommendation + '</td>';
                            e_data += '<td>' + value.action + '</td>';
                            e_data += '<td>' + value.comp_registra + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.Case_ticket, function (index, value) {
                                //console.log(value);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.case_id + '</td>';
                                e_data += '<td>' + value.who_org + '</td>';
                                e_data += '<td>' + value.who_name + '</td>';
                                e_data += '<td>' + value.who_phone + '</td>';
                                e_data += '<td>' + value.who_email + '</td>';
                                e_data += '<td>' + value.who_address + '</td>';
                                e_data += '<td>' + value.info_source + '</td>';
                                e_data += '<td>' + value.mw_name + '</td>';
                                e_data += '<td>' + value.mw_phone + '</td>';
                                e_data += '<td>' + value.mw_email + '</td>';
                                e_data += '<td>' + value.mw_sys_id + '</td>';
                                e_data += '<td>' + value.mw_passport_no + '</td>';
                                e_data += '<td>' + value.mw_dob + '</td>';
                                e_data += '<td>' + value.mw_country + '</td>';
                                e_data += '<td>' + value.mw_city + '</td>';
                                e_data += '<td>' + value.mw_contract_no + '</td>';
                                e_data += '<td>' + value.mw_date_arrival + '</td>';
                                e_data += '<td>' + value.mw_worked_me + '</td>';
                                e_data += '<td>' + value.mw_worked_house + '</td>';
                                e_data += '<td>' + value.mw_ug_address + '</td>';
                                e_data += '<td>' + value.mw_permit_no + '</td>';
                                e_data += '<td>' + value.mw_passport_status + '</td>';
                                e_data += '<td>' + value.emp_sector + '</td>';
                                e_data += '<td>' + value.local_agency + '</td>';
                                e_data += '<td>' + value.local_phone + '</td>';
                                e_data += '<td>' + value.local_email + '</td>';
                                e_data += '<td>' + value.foreign_agency + '</td>';
                                e_data += '<td>' + value.foreign_phone + '</td>';
                                e_data += '<td>' + value.foreign_email + '</td>';
                                e_data += '<td>' + value.com_times + '</td>';
                                e_data += '<td>' + value.training_center + '</td>';
                                e_data += '<td>' + value.medical_center + '</td>';
                                e_data += '<td>' + value.emp_name + '</td>';
                                e_data += '<td>' + value.emp_phone + '</td>';
                                e_data += '<td>' + value.mw_location + ' OR ' + value.mw_loca + '</td>';
                                e_data += '<td>' + value.mw_escape + '</td>';
                                e_data += '<td>' + value.mw_house_changed + '</td>';
                                e_data += '<td>' + value.mw_phone_status + '</td>';
                                e_data += '<td>' + value.mw_salary_status + '</td>';
                                e_data += '<td>' + value.mw_salary_amount + '</td>';
                                e_data += '<td>' + value.mw_food_status + '</td>';
                                e_data += '<td>' + value.mw_sleep_status + '</td>';
                                e_data += '<td>' + value.mw_rest_status + '</td>';
                                e_data += '<td>' + value.mw_rest_wake + '</td>';
                                e_data += '<td>' + value.mw_rest_bed + '</td>';
                                e_data += '<td>' + value.mw_rest_time + '</td>';
                                e_data += '<td>' + value.mw_house_size + '</td>';
                                e_data += '<td>' + value.mw_family_size + '</td>';
                                e_data += '<td>' + value.mw_other_maid + '</td>';
                                e_data += '<td>' + value.mw_contract_type + '</td>';
                                e_data += '<td>' + value.mw_other_house + '</td>';
                                e_data += '<td>' + value.mw_medical_status + '</td>';
                                e_data += '<td>' + value.mw_physical_status + '</td>';
                                e_data += '<td>' + value.mw_sexual + '</td>';
                                e_data += '<td>' + value.mw_emp_change + '</td>';
                                e_data += '<td>' + value.mw_comp_foreign + '</td>';
                                e_data += '<td>' + value.mw_comp_local + '</td>';
                                e_data += '<td>' + value.mw_comp_other + '</td>';
                                e_data += '<td>' + value.mw_contract_status + '</td>';
                                e_data += '<td>' + value.mw_eva_work + '</td>';
                                e_data += '<td>' + value.mw_eva_wake + '</td>';
                                e_data += '<td>' + value.mw_eva_wake_avg + '</td>';
                                e_data += '<td>' + value.mw_eva_phone + '</td>';
                                e_data += '<td>' + value.mw_eva_hygiene + '</td>';
                                e_data += '<td>' + value.mw_eva_service + '</td>';
                                e_data += '<td>' + value.mw_eva_comp_emp + '</td>';
                                e_data += '<td>' + value.mw_assistance + '</td>';
                                e_data += '<td>' + value.comp_category + '</td>';
                                e_data += '<td>' + value.observation + '</td>';
                                e_data += '<td>' + value.recommendation + '</td>';
                                e_data += '<td>' + value.action + '</td>';
                                e_data += '<td>' + value.comp_registra + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#mw_case_table").append(e_data);
                    pager('mw_case_table');
                } catch (e) {
                    ShowError("Response Error", e, loadCases);
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


function loadAcco(input) {
    try {
        $.ajax({
//
            url: url + "fetch/accomodation_worker/" + input + "/null/null",
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
                            e_data += '<td>' + value.datereg + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.facility + '</td>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.nin + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.reason + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.accomodation, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.datereg + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.facility + '</td>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.nin + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.reason + '</td>';
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
                    ShowError("Response Error", e, loadAcco);
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


