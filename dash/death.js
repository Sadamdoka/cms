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
                            // document.getElementById('pro_userid').innerHTML = value.resid;
                            // document.getElementById('user_name').innerHTML = value.name;
                            //document.getElementById('pro_name').innerHTML = value.name;
                            document.getElementById('user_name').innerHTML = value.name;
                            //document.getElementById('user_email').innerHTML = value.email;
                            //document.getElementById('pro_email').innerHTML = value.email;
                            //document.getElementById('pro_phone').innerHTML = value.phone;
                            //document.getElementById('pro_role').innerHTML = roleSetter(value.role);
                            type = value.type;
                            organ = value.organ;
                            act_name = value.name;
                            setAdmin_role(value.role);
                            setType(value.type);
                            loadCaseAll(value.type, value.organ);
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


function loadCaseAll(input, organs) {
    if (input === "1") {
        loadCasesLocal(organs);
        //loadEmergenciesAgency(organs);
    } else if (input === "2") {
        loadCasesForeign(organs);
        //loadEmergenciesAgency(organs);
    } else if (input === "3") {
        loadCases("UG");
        //loadEmergencies();
    } else if (input === "4") {
        //loadCases(1);
        //loadEmergencies();
    } else {
        alert("Error Code");
    }
}


function loadCases(input) {
    try {
        $.ajax({
//
            url: url + "fetch/case_ticket_emb_death/" + input,
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
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageCase(this)" value="2" name="' + value.case_id + '"   type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + getStatus(value.case_status) + '</td>';
                            e_data += '<td>' + value.case_id + '</td>';
                            e_data += '<td>' + value.mw_name + '</td>';
                            e_data += '<td>' + value.mw_passport_no + '</td>';
                            e_data += '<td>' + value.comp_category + '</td>';
                            e_data += '<td>' + value.mw_location + ' OR ' + value.mw_loca + '</td>';
                            e_data += '<td>' + value.local_agency + '</td>';
                            e_data += '<td>' + value.foreign_agency + '</td>';
                            e_data += '<td>' + value.who_name + '</td>';
                            e_data += '<td>' + value.who_phone + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.Case_ticket, function (index, value) {
                                //console.log(value);
                                //console.log(value.case_status);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageCase(this)" value="2" name="' + value.case_id + '"    type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + getStatus(value.case_status) + '</td>';
                                e_data += '<td>' + value.case_id + '</td>';
                                e_data += '<td>' + value.mw_name + '</td>';
                                e_data += '<td>' + value.mw_passport_no + '</td>';
                                e_data += '<td>' + value.comp_category + '</td>';
                                e_data += '<td>' + value.mw_location + ' OR ' + value.mw_loca + '</td>';
                                e_data += '<td>' + value.local_agency + '</td>';
                                e_data += '<td>' + value.foreign_agency + '</td>';
                                e_data += '<td>' + value.who_name + '</td>';
                                e_data += '<td>' + value.who_phone + '</td>';
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


function loadCasesForeign(input) {
    try {
        $.ajax({
//
            url: url + "fetch/case_ticket_agency_status/null/" + input + "/0",
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
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageCase(this)" name="2"   type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
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
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageCase(this)" name="2"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
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



function loadCasesLocal(input) {
    try {
        $.ajax({
//
            url: url + "fetch/case_ticket_agency_status/" + input + "/null/0",
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
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageCase(this)" name="2"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
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
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageCase(this)" name="2"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
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


function loadEmergencies() {
    try {
        $.ajax({
//
            url: url + "fetch/emergencybi",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#mw_emer_table_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#mw_emer_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.emergency;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.emerid + '" onclick="manageCase(this)" name="1"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.emerid + '</td>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.topic + '</td>';
                            e_data += '<td>' + value.event + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>' + value.location + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.emergency, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.emerid + '" onclick="manageCase(this)" name="1"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.emerid + '</td>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.topic + '</td>';
                                e_data += '<td>' + value.event + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>' + value.location + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#mw_emer_table").append(e_data);
                    pager('mw_emer_table');
                } catch (e) {
                    ShowError("Response Error", e, loadEmergencies);
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



function loadEmergenciesAgency(input) {
    try {
        $.ajax({
//
            url: url + "fetch/emergencybi/0/null/null/null/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#mw_emer_table_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#mw_emer_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.emergency;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.emerid + '" onclick="manageCase(this)" name="1"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.emerid + '</td>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.topic + '</td>';
                            e_data += '<td>' + value.event + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>' + value.location + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.emergency, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.emerid + '" onclick="manageCase(this)" name="1"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.emerid + '</td>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.topic + '</td>';
                                e_data += '<td>' + value.event + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>' + value.location + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#mw_emer_table").append(e_data);
                    pager('mw_emer_table');
                } catch (e) {
                    ShowError("Response Error", e, loadEmergencies);
                }
            },
            error: function (d) {

                //alert("ajax Error", "Sorry! Something wrong, please try again");
                //$("#gallery_table").html('<tr><td colspan="5" align="center">Sorry an Expected error Occured.</td></tr>');
                //  if (ajaxOptions === 'timeout') {
                alert("ajax Error", "Connection Timeout");
                // } else {
                //ShowError("ajax Error", thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                //}
                //console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}



//document.getElementById('search_det_case').addEventListener('click', searchDetCase);
function searchDetCase(event) {
    event.preventDefault();
    var id = document.getElementById('case_det_id').value;

    try {
        $.ajax({
//
            url: url + "fetch/case_ticket/0/" + id + "/null",
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
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageCase(this)" name="2"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.case_id + '</td>';
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
                            e_data += '<td>' + value.mw_location + ' OR ' + value.mw_loca + '</td>';
                            e_data += '<td>' + value.mw_escape + '</td>';
                            e_data += '<td>' + value.mw_phone_status + '</td>';
                            e_data += '<td>' + value.mw_salary_status + '</td>';
                            e_data += '<td>' + value.mw_salary_amount + '</td>';
                            e_data += '<td>' + value.mw_food_status + '</td>';
                            e_data += '<td>' + value.mw_sleep_status + '</td>';
                            e_data += '<td>' + value.mw_rest_status + '</td>';
                            e_data += '<td>' + value.mw_rest_wake + '</td>';
                            e_data += '<td>' + value.mw_rest_bed + '</td>';
                            e_data += '<td>' + value.mw_rest_wake + '</td>';
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
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageCase(this)" name="2"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.case_id + '</td>';
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
                                e_data += '<td>' + value.mw_location + ' OR ' + value.mw_loca + '</td>';
                                e_data += '<td>' + value.mw_escape + '</td>';
                                e_data += '<td>' + value.mw_phone_status + '</td>';
                                e_data += '<td>' + value.mw_salary_status + '</td>';
                                e_data += '<td>' + value.mw_salary_amount + '</td>';
                                e_data += '<td>' + value.mw_food_status + '</td>';
                                e_data += '<td>' + value.mw_sleep_status + '</td>';
                                e_data += '<td>' + value.mw_rest_status + '</td>';
                                e_data += '<td>' + value.mw_rest_wake + '</td>';
                                e_data += '<td>' + value.mw_rest_bed + '</td>';
                                e_data += '<td>' + value.mw_rest_wake + '</td>';
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
                    ShowError("Response Error", e, searchDetCase);
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

//document.getElementById('search_short_cases').addEventListener('click', searchShortCase);
function searchShortCase(event) {
    event.preventDefault();
    var id = document.getElementById('case_short_id').value;

    try {
        $.ajax({
//
            url: url + "fetch/emergencybi/0/" + id + "/null/null/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#mw_emer_table_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#mw_emer_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.emergency;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.emerid + '" onclick="manageCase(this)" name="1"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.emerid + '</td>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.topic + '</td>';
                            e_data += '<td>' + value.event + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>' + value.location + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.emergency, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.emerid + '"  onclick="manageCase(this)" name="1"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.emerid + '</td>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.topic + '</td>';
                                e_data += '<td>' + value.event + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>' + value.location + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#mw_emer_table").append(e_data);
                    pager('mw_emer_table');
                } catch (e) {
                    ShowError("Response Error", e, loadEmergencies);
                }
            },
            error: function (d) {

                //alert("ajax Error", "Sorry! Something wrong, please try again");
                //$("#gallery_table").html('<tr><td colspan="5" align="center">Sorry an Expected error Occured.</td></tr>');
                //  if (ajaxOptions === 'timeout') {
                alert("ajax Error", "Connection Timeout");
                // } else {
                //ShowError("ajax Error", thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                //}
                //console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}

//document.getElementById('all_short').addEventListener('click', allShortCase);
function allShortCase(event) {
    event.preventDefault();
    loadCaseAll(type, organ);
}
//document.getElementById('all_detail').addEventListener('click', allDetCase);
function allDetCase(event) {
    event.preventDefault();
    loadCaseAll(type, organ);
}



function manageCase(input) {
    //loadItem();


    let case_type = $(input).attr("value");
    if (case_type === '1') {
        document.getElementById('model_t_type').value = '1';
        getCaseShort(input);
    } else if (case_type === '2') {
        document.getElementById('model_c_type').value = '2';
        getCaseDet(input);
    } else {
        alert('Case has no type');
    }

    loadLogs(input, 'act_mw_table', 'act_mw_table_body');
    loadAttachment(input, 'model_att_table', 'model_attach_table_body');
    document.getElementById('officer_div').style.visibility = "hidden";
    $('#manage_case').modal('show');

}

function setOfficer() {
    let s = $("#model_c_status :selected").attr('id');
    if (s === "2") {
        document.getElementById('officer_div').style.visibility = "visible";
        //document.getElementById('officer_div').style.display = 'show';
        loadOrganOfficers(organ);
    } else {
        document.getElementById('officer_div').style.visibility = "hidden";
        //document.getElementById('officer_div').style.display = 'none';
    }
}


function getCaseShort(input) {
    let id = $(input).attr("id");
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
                            document.getElementById('model_t_id').value = jdata.id;
                            document.getElementById('model_t_ticket').value = jdata.emerid;
                            document.getElementById('model_t_mwname').value = jdata.name;
                            document.getElementById('model_t_pass').value = jdata.passport;
                            document.getElementById('model_t_cat').value = jdata.topic;
                            document.getElementById('model_t_det').value = jdata.details;
                            document.getElementById('model_t_loca').value = jdata.location;
                            document.getElementById('model_c_id').value = jdata.emerid;
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

    let id = $(input).attr("id");
    try {
        $.ajax({
            url: url + "fetch/case_ticket/" + id + "/null/null",
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
                            getCaseMgt(jdata.case_id);
                            document.getElementById('model_t_id').value = jdata.id;
                            document.getElementById('model_t_ticket').value = jdata.case_id;
                            document.getElementById('model_t_cat').value = jdata.comp_category;
                            document.getElementById('model_t_det').value = jdata.mw_assistance;
                            document.getElementById('model_t_loca').value = jdata.mw_loca;
                            document.getElementById('model_c_id').value = jdata.case_id;
                            document.getElementById('model_c_cc').value = jdata.comp_category;
                            document.getElementById('model_c_det').value = jdata.mw_assistance;
                            document.getElementById('model_att_id').value = jdata.case_id;

                            if (jdata.mw_passport_no === "NA" || jdata.mw_passport_no === "Unknown") {
                                document.getElementById('model_t_mwname').value = jdata.mw_name;
                                document.getElementById('model_t_pass').value = jdata.mw_passport_no;
                            } else {
                                getMW_Details_Case(jdata.mw_sys_id, 'model_t_mwname', 'model_t_pass', '0', 'model_t_lco', 'model_t_lco_con', 'model_t_lco_email', 'model_t_fco', 'model_t_fco_con', 'model_t_fco_email');

                            }

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


function getCaseMgt(input) {
    // let id = $(input).attr("id");

    //let id = $(input).attr("id");
    //console.log(input);
    try {
        $.ajax({
            url: url + "fetch/case_mgt/0/null/" + input,
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
                            document.getElementById('model_t_officer_id').value = jdata.officer;
                            document.getElementById('model_t_officer').value = jdata.officerId;

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
                        document.getElementById('model_t_officer_id').value = "No Officer Assigned";
                        document.getElementById('model_t_officer').value = "No Officer Assigned";
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

document.getElementById('model_att_button').addEventListener('click', attachDocu);
function attachDocu(event) {
    event.preventDefault();
    let caseticket = document.getElementById("model_att_id").value;
    let caseDetails = document.getElementById("model_att_det").value;
    let caseAttach = document.getElementById("model_att_file");//.value;

    addAttachment(caseticket, caseDetails, caseAttach);
}


document.getElementById('model_c_button').addEventListener('click', assignOfficer);
function assignOfficer(event) {
    event.preventDefault();
    let formData = new FormData();

    let caseticket = document.getElementById("model_c_id").value;
    let caseType = document.getElementById("model_c_type").value;
    let caseDetails = document.getElementById("model_c_det").value;
    let assigneeId = document.getElementById("model_c_assignid").value;
    let assignee = document.getElementById("model_c_assignee").value;
    let officerId = $("#model_c_officer :selected").attr('id');
    let officer = document.getElementById("model_c_officer").value;
    //let recommendation = document.getElementById("model_m_fco").value;
    //let followUp = document.getElementById("model_m_remark").value;
    //let remarks = document.getElementById("model_m_officer").value;

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

    fetch(url + "create/case_mgt",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Case Assigned Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}






function setShortCase() {
    let status = $("#model_short_status :selected").attr('id');
    try {
        $.ajax({
            url: url + "fetch/emergencybi_status/" + status,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#mw_emer_table_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#mw_emer_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.emergency;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.emerid + '</td>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.topic + '</td>';
                            e_data += '<td>' + value.event + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>' + value.location + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.emerid + '" onclick="manageCase(this)" name="1"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.emergency, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.emerid + '</td>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.topic + '</td>';
                                e_data += '<td>' + value.event + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>' + value.location + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.emerid + '"  onclick="manageCase(this)" name="1"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#mw_emer_table").append(e_data);
                    pager('mw_emer_table');
                } catch (e) {
                    ShowError("Response Error", e, loadEmergencies);
                }
            },
            error: function (d) {

                //alert("ajax Error", "Sorry! Something wrong, please try again");
                //$("#gallery_table").html('<tr><td colspan="5" align="center">Sorry an Expected error Occured.</td></tr>');
                //  if (ajaxOptions === 'timeout') {
                alert("ajax Error", "Connection Timeout");
                // } else {
                //ShowError("ajax Error", thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                //}
                //console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}


function searchDetCase() {
    let status = $("#model_det_status :selected").attr('id');

    try {
        $.ajax({
//
            url: url + "fetch/case_ticket/0/null/" + status,
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
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.case_id + '</td>';
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
                            e_data += '<td>' + value.mw_location + ' OR ' + value.mw_loca + '</td>';
                            e_data += '<td>' + value.mw_escape + '</td>';
                            e_data += '<td>' + value.mw_phone_status + '</td>';
                            e_data += '<td>' + value.mw_salary_status + '</td>';
                            e_data += '<td>' + value.mw_salary_amount + '</td>';
                            e_data += '<td>' + value.mw_food_status + '</td>';
                            e_data += '<td>' + value.mw_sleep_status + '</td>';
                            e_data += '<td>' + value.mw_rest_status + '</td>';
                            e_data += '<td>' + value.mw_rest_wake + '</td>';
                            e_data += '<td>' + value.mw_rest_bed + '</td>';
                            e_data += '<td>' + value.mw_rest_wake + '</td>';
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
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageCase(this)" name="2"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.Case_ticket, function (index, value) {
                                //console.log(value);
                                e_data += '<tr>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.case_id + '</td>';
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
                                e_data += '<td>' + value.mw_location + ' OR ' + value.mw_loca + '</td>';
                                e_data += '<td>' + value.mw_escape + '</td>';
                                e_data += '<td>' + value.mw_phone_status + '</td>';
                                e_data += '<td>' + value.mw_salary_status + '</td>';
                                e_data += '<td>' + value.mw_salary_amount + '</td>';
                                e_data += '<td>' + value.mw_food_status + '</td>';
                                e_data += '<td>' + value.mw_sleep_status + '</td>';
                                e_data += '<td>' + value.mw_rest_status + '</td>';
                                e_data += '<td>' + value.mw_rest_wake + '</td>';
                                e_data += '<td>' + value.mw_rest_bed + '</td>';
                                e_data += '<td>' + value.mw_rest_wake + '</td>';
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
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageCase(this)" name="2"   type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
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
                    ShowError("Response Error", e, searchDetCase);
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



document.getElementById('model_comment_btn').addEventListener('click', commentCase);
function commentCase(event) {
    event.preventDefault();
    let formData = new FormData();

    let caseticket = document.getElementById("model_c_id").value;
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
            alert("Comment Added");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}
