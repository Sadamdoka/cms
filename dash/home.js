/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var url = "https:esafeafrica.com/api.monitoring_mglsd/service/";
//var url = "http://localhost:8080/api.esafe/service/";
var user = '';
var role = '';
var type = '';
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
    count();
    loadCases_Chart();
    loadCasesMgt_Chart();
    loadCasesSubMgt_Chart();
    //colorPrint();
    //console.log('Email:' + mode);
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
                            //console.log(value);
                            // document.getElementById('pro_userid').innerHTML = value.resid;
                            // document.getElementById('user_name').innerHTML = value.name;
                            //document.getElementById('pro_name').innerHTML = value.name;
                            document.getElementById('user_name').innerHTML = value.name;
                            act_name = value.name;
                            //document.getElementById('user_email').innerHTML = value.email;
                            //document.getElementById('pro_email').innerHTML = value.email;
                            //document.getElementById('pro_phone').innerHTML = value.phone;
                            //document.getElementById('pro_role').innerHTML = roleSetter(value.role);
                            //role = value.role;

                            setAdmin_role(value.role);

                            setType(value.type);
                            type = value.type;
                            //loadCases();
                            loadCaseAll_home(value.type, value.organ);
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



function roleSetter(input) {
    if (input === "1") {
        return "Admin User";
    } else if (input === "2") {
        return "Normal User";
    } else {
        return "Role Not Defined";
    }
}



function loadCaseAll_home(input, organ) {
    if (input === "1") {
//loadCasesLocal(organ);
//loadEmergenciesAgency(organ);
        loadUsers(organ);
    } else if (input === "2") {
//loadCasesLocal(organ);
//loadEmergenciesAgency(organ);
        loadUsers(organ);
    } else if (input === "3") {
// loadCases();
//loadEmergencies();
        loadUsers(organ);
    } else if (input === "4") {
//loadCases();
//loadEmergencies();
        loadUsers(organ);
    } else {
        alert("Error Code");
    }
}


function loadCases() {
    try {
        $.ajax({
//
            url: url + "fetch/case_ticket",
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
                console.log(data);
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




function loadCasesForeign(input) {
    try {
        $.ajax({
//
            url: url + "fetch/case_ticket_agency/null/" + input,
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
                            e_data += '<td style="background-color:#FF0000; font-size: 30px; text-align:center; color: #FFF">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
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
                                e_data += '<td style="background-color:#FF0000; font-size: 30px; text-align:center; color: #FFF">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
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
                            e_data += '</tr>';
                        } else {
                            $.each(data.user, function (index, value) {
                                //console.log(value);

                                e_data += '<tr>';
                                e_data += '<td>' + value.resid + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.phone + '</td>';
                                e_data += '<td>' + value.email + '</td>';
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



function loadCasesLocal(input) {
    try {
        $.ajax({
//
            url: url + "fetch/case_ticket_agency/" + input + "/null",
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
                            e_data += '<td style="background-color:#FF0000; font-size: 30px; text-align:center; color: #FFF">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
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
                                e_data += '<td style="background-color:#FF0000; font-size: 30px; text-align:center; color: #FFF">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
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



//loadCases_Chart(ctx);

function loadCases_Chart() {
    var ctx = document.getElementById('myChart'); //.getContext('2d');
    try {
        $.ajax({
//
            url: url + "fetch/case_ticket_cty/UG",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#bar_Chart").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
                $("#pie_Chart").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                // $("#pie_body").html("<i class = 'fa fa-spinner spin'></i> Please Wait.." + JSON.stringify(data));
                //$("#bar_body").html("<i class = 'fa fa-spinner spin'></i> Please Wait.." + JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                //console.log(data);
                try {
                    //$("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        var value = data.Case_ticket;
                        //console.log("1: "+value.length);
                        //console.log("2: "+Object.keys(value).length);
                        case_Status(value);
                        case_Category(value);
                    } else {
                        //row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#mw_case_table").append(e_data);
                    //pager('mw_case_table');

                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, loadCases);
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

function case_Category(input) {

    var occurences = input.reduce(function (r, row) {
        r[row.comp_category] = ++r[row.comp_category] || 1;
        return r;
    }, {});
    var result = Object.keys(occurences).map(function (key) {
        return {key: key, value: occurences[key]};
    });
    //console.log(result);
    //result.JSON.parse(this.responseText);
    var labels = result.map(function (e) {
        return e.key;
    });
    var data_x = result.map(function (e) {
        return e.value;
    });
    new Chart("bar_Chart", {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                    backgroundColor: colorPrint(result),
                    data: data_x
                }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Case Category"
            }
        }
    });
}


function case_Status(input) {

    var occurences = input.reduce(function (r, row) {
        r[row.case_status] = ++r[row.case_status] || 1;
        return r;
    }, {});
    var result = Object.keys(occurences).map(function (key) {
        return {key: key, value: occurences[key]};
    });
    var labels = result.map(function (e) {
        return e.key;
    });
    var data_x = result.map(function (e) {
        return e.value;
    });
    var leb = ["New Cases", "Confirmed", "Being Solved", "Government Involved", "Cleared", "Compliments"];
    new Chart("pie_chart", {
        type: "bar",
        data: {
            labels: leb,
            datasets: [{
                    backgroundColor: colorPrint(result),
                    data: data_x
                }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Case Status"
            }

        }
    });
}

function generateRandomColor(input) {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
}

function colorPrint(input) {
    const col = [];
    for (let i = 0; i < input.length; i++) {
        col.push(generateRandomColor());
    }
    return col;
}



/**
 var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
 var yValues = [55, 49, 44, 24, 15];
 var barColors = ["red", "green", "blue", "orange", "brown"];
 
 new Chart("myChart", {
 type: "bar",
 data: {
 labels: xValues,
 datasets: [{
 backgroundColor: barColors,
 data: yValues
 }]
 },
 options: {
 legend: {display: false},
 title: {
 display: true,
 text: "World Wine Production 2018"
 }
 }
 });
 * 
 * @returns {undefined}**
 */




function count() {
    countCases();
    countCases_handled(4, 'count_case_handled');
    countCases_handled(0, 'count_case_pend');
    countCases_handled(3, 'count_case_refer');
    countCandidate();
    countMW();
}

function countCases() {
    try {
        $.ajax({
//
            url: url + "counter/cases",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#mw_case_table_body").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        var value = data.count;
                        document.getElementById('count_case_total').innerHTML = value.number;
                    } else {
                        //row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#mw_case_table").append(e_data);
                    //pager('mw_case_table');

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



function countCases_handled(input, cout) {
    try {
        $.ajax({
//
            url: url + "counter/cases/null/null/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#mw_case_table_body").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        var value = data.count;
                        document.getElementById(cout).innerHTML = value.number;
                    } else {
                        //row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#mw_case_table").append(e_data);
                    //pager('mw_case_table');

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


function countMW() {
    try {
        $.ajax({
//
            url: url + "counter/mw",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#mw_case_table_body").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        var value = data.count;
                        document.getElementById('count_mw_saudi').innerHTML = parseInt(110000) + parseInt(value.number);
                    } else {
                        //row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#mw_case_table").append(e_data);
                    //pager('mw_case_table');

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


function countCandidate() {
    try {
        $.ajax({
//
            url: url + "counter/candidates",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#mw_case_table_body").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        var value = data.count;
                        document.getElementById('count_mw').innerHTML = parseInt(110000) + parseInt(value.number);
                    } else {
                        //row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#mw_case_table").append(e_data);
                    //pager('mw_case_table');

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



function loadCasesMgt_Chart() {
    //var ctx = document.getElementById('myChart'); //.getContext('2d');
    try {
        $.ajax({
//
            url: url + "fetch/case_mgt_emb/1/UG",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#user_bar_Chart").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
                //$("#pie_Chart").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                // $("#pie_body").html("<i class = 'fa fa-spinner spin'></i> Please Wait.." + JSON.stringify(data));
                //$("#bar_body").html("<i class = 'fa fa-spinner spin'></i> Please Wait.." + JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                //console.log(data);
                try {
                    //$("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        var value = data.case_mgt;
                        //console.log("1: "+value.length);
                        //console.log("2: "+Object.keys(value).length);
                        //case_Status(value);
                        case_mgt_bar(value);
                    } else {
                        //row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#mw_case_table").append(e_data);
                    //pager('mw_case_table');

                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, loadCases);
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


function case_mgt_bar(input) {

    var occurences = input.reduce(function (r, row) {
        r[row.officerId] = ++r[row.officerId] || 1;
        return r;
    }, {});
    var result = Object.keys(occurences).map(function (key) {
        return {key: key, value: occurences[key]};
    });
    //console.log(result);
    //result.JSON.parse(this.responseText);
    var labels = result.map(function (e) {
        return e.key;
    });
    var data_x = result.map(function (e) {
        return e.value;
    });
    new Chart("user_bar_Chart", {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                    backgroundColor: colorPrint(result),
                    data: data_x
                }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Cases Per Officers"
            }
        }
    });
}





function loadCasesSubMgt_Chart() {
    //var ctx = document.getElementById('myChart'); //.getContext('2d');
    try {
        $.ajax({
//
            url: url + "fetch/subcase_mgt_emb/1",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#user_sub_bar_Chart").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
                //$("#pie_Chart").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                // $("#pie_body").html("<i class = 'fa fa-spinner spin'></i> Please Wait.." + JSON.stringify(data));
                //$("#bar_body").html("<i class = 'fa fa-spinner spin'></i> Please Wait.." + JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                //console.log(data);
                try {
                    //$("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        var value = data.sub_case_mgt;
                        //console.log("1: "+value.length);
                        //console.log("2: "+Object.keys(value).length);
                        //case_Status(value);
                        case_sub_mgt_bar(value);
                    } else {
                        //row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#mw_case_table").append(e_data);
                    //pager('mw_case_table');

                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, loadCases);
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


function case_sub_mgt_bar(input) {

    var occurences = input.reduce(function (r, row) {
        r[row.officerId] = ++r[row.officerId] || 1;
        return r;
    }, {});
    var result = Object.keys(occurences).map(function (key) {
        return {key: key, value: occurences[key]};
    });
    //console.log(result);
    //result.JSON.parse(this.responseText);
    var labels = result.map(function (e) {
        return e.key;
    });
    var data_x = result.map(function (e) {
        return e.value;
    });
    new Chart("user_sub_bar_Chart", {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                    backgroundColor: colorPrint(result),
                    data: data_x
                }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Sub Cases Per Officers"
            }
        }
    });
}


