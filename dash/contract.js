/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var url = "http://192.168.20.1:8080/api.cms/service/"
var url = "https://esafeafrica.com/api.cms/service/";


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

    //loadCompanies();

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
                            //document.getElementById("user_organ_id").value = jdata.organ;
                            document.getElementById('user_name').innerHTML = jdata.name;
                            type = jdata.type;
                            organs = jdata.organ;
                            act_name = jdata.name;
                            //setType(jdata.type);
                            //setRole(jdata.role);
                            //loadOrgan(jdata.organ, 'pic_logo');
                            //loadCR(jdata.organ, 'det_fco', "<option  disabled selected hidden >Choose Job Order</option>");
                            //loadOrgan_sel('KE', 'jo_s_lco', "<option  disabled selected hidden >Choose Recrutment Agency</option>");
                            //getOrgan_details(jdata.organ);
                            //setRole_s(jdata.role);
                            //loadAcco(jdata.type, jdata.organ);
                            loadAll_CR();
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
    } else if (input === "2") {
    } else if (input === "3") {
        //loadPara(organs);
        loadAll_CR();
    } else if (input === "4") {
        //loadPara(organs);
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

function loadJO(input, elem, opt) {
    try {
        $.ajax({
            //
            url: url + "fetch/contract/UG",
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
                    $("#" + elem).empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.contract;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            e_data += '<option id="' + jdata.contract_id + '" value="' + jdata.id + '" name="' + jdata.category + '" ">';
                            e_data += jdata.joid + " | " + jdata.name + " | " + jdata.category + " | " + jdata.salary;
                            e_data += '</option>';
                        } else {
                            $.each(data.contract, function (index, value) {
                                //console.log(value.id);
                                e_data += '<option id="' + value.joid + '" value="' + value.id + '" name="' + value.category + '" ">';
                                e_data += value.joid + " | " + value.name + " | " + value.category + " | " + value.salary;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#" + elem).append(opt);
                    $("#" + elem).append(e_data);
                    //console.log(e_data);
                    //setSearch(elem);
                } catch (e) {
                    ShowError("Response Error", e, loadJO);
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




function loadOrgan_sel(input, elem, opt) {
    try {
        $.ajax({
            //
            url: url + "fetch/organs_cty_bi/" + input,
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
                    $("#model_mw_organ").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.organ;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            e_data += '<option id="' + jdata.organid + '" value="' + jdata.email + '" name="' + jdata.phone + '" ">';
                            e_data += jdata.names;
                            e_data += '</option>';
                        } else {
                            $.each(data.organ, function (index, value) {
                                //console.log(value.id);
                                e_data += '<option id="' + value.organid + '" value="' + value.email + '" name="' + value.phone + '" ">';
                                e_data += value.names;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#" + elem).append(opt);
                    $("#" + elem).append(e_data);
                    //console.log(e_data);
                    //setSearch(elem);
                } catch (e) {
                    ShowError("Response Error", e, loadOrgan);
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

//document.getElementById('jo_enable_edit').addEventListener('click', enableEdit);
function enableEdit() {
    //document.getElementById("det_genid").disabled = false;
    //document.getElementById("det_organid").disabled = false;
    //document.getElementById("jo_title").disabled = false;
    document.getElementById('jo_title').style.display = 'none';
    document.getElementById('jo_s_title').style.display = 'block';
    //document.getElementById("jo_cat").disabled = false;
    document.getElementById('jo_cat').style.display = 'none';
    document.getElementById('jo_s_cat').style.display = 'block';
    document.getElementById('jo_gender').style.display = 'none';
    document.getElementById('jo_s_gender').style.display = 'block';
    document.getElementById("jo_no").disabled = false;
    document.getElementById("jo_sal").disabled = false;
    document.getElementById("jo_period").disabled = false;
    document.getElementById('jo_lco').style.display = 'none';
    document.getElementById('jo_s_lco').style.display = 'block';
    document.getElementById("jo_sum").disabled = false;
    document.getElementById("jo_des").disabled = false;
}


//document.getElementById('jo_submit').addEventListener('click', submitJO);
function submitJO() {
    var id = document.getElementById("jo_id").value;
    var joid = document.getElementById("jo_s_id").value;


    var formdata = new FormData();
    formdata.append("id", id);
    formdata.append("joid", joid);
    formdata.append("status", "1");

    fetch(url + "update/jo_status",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Job Order Submitted");

            //$('#manage_para').modal('close');
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}

//document.getElementById('jo_add_new').addEventListener('click', addJo);
function addJo() {
    //var lco = document.getElementById("jo_lco").value;

    let  lco = $("#jo_s_lco :selected").attr('id');
    var fco = document.getElementById("jo_fco").value;
    var name = document.getElementById("jo_s_title").value;
    var gender = document.getElementById("jo_s_gender").value;
    var category = document.getElementById("jo_s_cat").value;
    var qty = document.getElementById("jo_no").value;
    var salary = document.getElementById("jo_sal").value;
    var period = document.getElementById("jo_period").value;
    var summary = document.getElementById("jo_sum").value;
    var description = document.getElementById("jo_des").value;


    var formdata = new FormData();
    formdata.append("lco", lco);
    formdata.append("fco", fco);
    formdata.append("name", name);
    formdata.append("gender", gender);
    formdata.append("category", category);
    formdata.append("qty", qty);
    formdata.append("salary", salary);
    formdata.append("period", period);
    formdata.append("summary", summary);
    formdata.append("description", description);

    fetch(url + "create/jo",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Job Ordered Added,Please refresh to finish Parameters");

            //$('#manage_para').modal('close');
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}




function getCRDetails_Table(input) {
    document.getElementById('cr_manager').style.display = 'block';
    let id = $(input).attr("id");
    console.log(id);

    try {
        $.ajax({
            url: url + "fetch/contract/0/" + id + "/null/null/null/null",
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
                        var jdata = data.contract;
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //$("#co_status_").empty();
                            //$("#co_status_").append(getCoStatus(jdata.status));
                            //loadOrgan_name(jdata.lco, 'jo_lco');
                            document.getElementById("con_genid").value = jdata.id;
                            document.getElementById("con_id").value = jdata.contract_id;
                            document.getElementById("con_start").value = jdata.start;
                            document.getElementById("con_end").value = jdata.end;
                            document.getElementById("con_sal").value = jdata.salary;
                            getWorker(jdata.mw);
                            getOrganDetails(jdata.lco, "con_lco_id", "con_lco_name", "con_lco_tel", "con_lco_email");
                            getOrganDetails(jdata.fco, "con_fco_id", "con_fco_name", "con_fco_tel", "con_fco_email");
                            getEmployer(jdata.emp);
                            loadPara(jdata.contract_id);

                        } else {
                            $.each(data.contract, function (index, value) {
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




function getWorker(input) {
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
                        if (!isJsonArray(jdata)) {

                            document.getElementById("con_mw_pic").src = "data:image/png;base64," + jdata.pic;
                            document.getElementById("con_mw_userid").value = jdata.userid;
                            document.getElementById("con_mw_name").value = jdata.names;
                            document.getElementById("con_mw_pass").value = jdata.passport;
                            document.getElementById("con_mw_htel").value = jdata.phone;
                            document.getElementById("con_mw_iqama").value = jdata.iqama;
                            document.getElementById("con_mw_rtel").value = jdata.ex_phone;//jo_fco
                            //document.getElementById("jo_fco").value = jdata.fco;
                            //document.getElementById("jo_no").value = jdata.qty;
                            //document.getElementById("jo_sal").value = jdata.salary;
                            //document.getElementById("jo_period").value = jdata.period;
                            //document.getElementById("jo_sum").value = jdata.summary;
                            //document.getElementById("jo_des").value = jdata.description;

                        } else {
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



function getOrganDetails(input, elm_id, elm_name, elm_tel, elm_email) {
    try {
        $.ajax({
            url: url + "fetch/organ/0/" + input,
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
                        var jdata = data.organ;
                        if (!isJsonArray(jdata)) {

                            document.getElementById(elm_id).value = jdata.organid;
                            document.getElementById(elm_name).value = jdata.names;
                            document.getElementById(elm_tel).value = jdata.phone;
                            document.getElementById(elm_email).value = jdata.email;
                            //document.getElementById("jo_fco").value = jdata.fco;
                            //document.getElementById("jo_no").value = jdata.qty;
                            //document.getElementById("jo_sal").value = jdata.salary;
                            //document.getElementById("jo_period").value = jdata.period;
                            //document.getElementById("jo_sum").value = jdata.summary;
                            //document.getElementById("jo_des").value = jdata.description;

                        } else {
                            $.each(data.organ, function (index, value) {
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



function getEmployer(input) {
    try {
        $.ajax({
            url: url + "fetch/employer/0/" + input + "/null",
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
                        var jdata = data.employer;
                        if (!isJsonArray(jdata)) {

                            document.getElementById("con_emp_id").value = jdata.emp_id;
                            document.getElementById("con_emp_name").value = jdata.name;
                            document.getElementById("con_emp_email").value = jdata.email;
                            document.getElementById("con_emp_nin").value = jdata.nin;
                            document.getElementById("con_emp_tel").value = jdata.contact;

                        } else {
                            $.each(data.employer, function (index, value) {
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



function getJODetails(input) {
    let id = $(input).attr("id");
    //console.log(input);
    let xs = $('#' + id + ' :selected').attr('id');
    try {
        $.ajax({
            url: url + "fetch/jo/0/" + xs,
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
                        var jdata = data.job_order;
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            $("#co_status_").empty();
                            $("#co_status_").append(getCoStatus(jdata.status));
                            document.getElementById("jo_id").value = jdata.id;
                            document.getElementById("para_gen").value = jdata.id;
                            document.getElementById("jo_s_id").value = jdata.joid;
                            document.getElementById("para_organ").value = jdata.joid;
                            document.getElementById("jo_title").value = jdata.name;
                            document.getElementById("jo_gender").value = jdata.gender;
                            loadOrgan_name(jdata.lco, 'jo_lco');
                            document.getElementById("jo_cat").value = jdata.category;//jo_fco
                            document.getElementById("jo_fco").value = jdata.fco;
                            document.getElementById("jo_no").value = jdata.qty;
                            document.getElementById("jo_sal").value = jdata.salary;
                            document.getElementById("jo_period").value = jdata.period;
                            document.getElementById("jo_sum").value = jdata.summary;
                            document.getElementById("jo_des").value = jdata.description;
                            loadPara(jdata.joid);

                        } else {
                            $.each(data.job_order, function (index, value) {
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


function loadPara(input) {
    try {
        $.ajax({
//
            url: url + "fetch/para/0/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#para_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#para_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        //console.log(data);
                        row += "";
                        var value = data.para;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);

                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="managePara(this)" value = "' + value.genid + '"  type="button"  class="btn btn-info" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + getParaStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.para, function (index, value) {
                                //console.log(value);

                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="managePara(this)" value = "' + value.genid + '"  type="button"  class="btn btn-info" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + getParaStatus(value.status) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#para_table").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadPara);
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

function getParaStatus(input) {
    if (input === '0') {
        return '<span class="badge badge-warning">Pending</span>';
    } else if (input === '1') {
        return '<span class="badge badge-dark">Submitted</span>';
    } else if (input === '2') {
        return '<span class="badge badge-danger">Rejected</span>';
    } else {
        return '<span class="badge badge-success">Success</span>';
    }
}

function managePara(input) {
    let organ = $(input).attr("value");
    let id = $(input).attr("id");
    getPara(id);
    $('#manage_para').modal('show');
}



function getPara(input) {
    try {
        $.ajax({
            url: url + "fetch/para/" + input + "/null",
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
                        var jdata = data.para;
                        if (!isJsonArray(jdata)) {
                            //Add Singular values

                            document.getElementById("m_id").value = jdata.id;
                            document.getElementById("m_org").value = jdata.genid;
                            document.getElementById("m_name").value = jdata.name;
                            document.getElementById("m_details").value = jdata.detail;
                            document.getElementById("m_attach").value = jdata.attach;
                            getParatype(jdata.type);
                            //getReviewStatus(jdata.status);
                        } else {
                            $.each(data.para, function (index, value) {
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
                // ShowError("Response Error");
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

function getParatype(input, info) {
    if (input === 'Text') {
        document.getElementById('attach').style.display = 'none';
        document.getElementById('details').style.display = 'block';
    } else {
        document.getElementById('details').style.display = 'none';
        document.getElementById('attach').style.display = 'block';
    }
}

function getReviewStatus(input) {
    if (input === '2') {
        document.getElementById('review').style.display = 'block';
    } else {
        document.getElementById('review').style.display = 'none';
    }
}


document.getElementById('m_update').addEventListener('click', editPara);
function editPara() {
    var genid = document.getElementById("m_id").value;
    var review = document.getElementById("m_review").value;
    let  status = $("#m_status :selected").attr('id');


    var formdata = new FormData();
    formdata.append("id", genid);
    formdata.append("review", review);
    formdata.append("status", status);

    fetch(url + "update/review_para",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Information Updated");

            //$('#manage_para').modal('close');
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



function loadOrgan_name(input, elem) {
    try {
        $.ajax({
            //
            url: url + "fetch/organ/0/" + input,
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
                try {
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.organ;

                        document.getElementById(elem).value = jdata.names;
                        //return jdata.names;
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //console.log(e_data);
                    //setSearch(elem);
                } catch (e) {
                    //return e;
                }
            },
            error: function (d) {
                //return d;
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}


document.getElementById('det_view_para').addEventListener('click', viewpara);
function viewpara() {
    //let organ = $(input).attr("value");
    //let id = $(input).attr("id");
    //getPara(id);
    $('#view_para').modal('show');

}

function loadAll_CR() {
    try {
        $.ajax({
//
            url: url + "fetch/contract/UG/1",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#cr_body").html('<tr><td colspan="20" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#cr_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.contract;
                        if (!isJsonArray(value)) {

                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.contract_id + '" onclick="getCRDetails_Table(this)" value = "' + value.id + '"  type="button"  class="btn btn-info" >View</button>';
                            e_data += '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.contract_id + '</td>';
                            e_data += '<td>' + value.mw + '</td>';
                            e_data += '<td>' + value.emp + '</td>';
                            e_data += '<td>' + value.start + '</td>';
                            e_data += '<td>' + value.end + '</td>';
                            e_data += '<td>' + value.salary + '</td>';
                            e_data += '<td>' + getCRStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.contract, function (index, value) {
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.contract_id + '" onclick="getCRDetails_Table(this)" value = "' + value.id + '"  type="button"  class="btn btn-info" >View</button>';
                                e_data += '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.contract_id + '</td>';
                                e_data += '<td>' + value.mw + '</td>';
                                e_data += '<td>' + value.emp + '</td>';
                                e_data += '<td>' + value.start + '</td>';
                                e_data += '<td>' + value.end + '</td>';
                                e_data += '<td>' + value.salary + '</td>';
                                e_data += '<td>' + getCRStatus(value.status) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="20" align="center">No data</td></tr>';
                    }
                    $("#cr_table").append(e_data);
                    pager('cr_table');
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


function getCRStatus(input) {
    if (input === '0') {
        return '<span class="badge badge-warning">Pending</span>';
    } else if (input === '1') {
        return '<span class="badge badge-dark">Attached & Submitted</span>';
    } else if (input === '2') {
        return '<span class="badge badge-info">Reviewed</span>';
    } else if (input === '3') {
        return '<span class="badge badge-success">Appoved</span>';
    } else {
        return '<span class="badge badge-danger">Rejected</span>';
    }
}



document.getElementById('con_btn_approval').addEventListener('click', sendApprove);
function sendApprove() {
    var genid = document.getElementById("con_genid").value;

    fetch(url + "conditions/contract/" + genid + "/2",
            {
                method: 'GET'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            logger(genid, "Contract Renwal", "Sending for Approval",act_name);
            alert("Successfull");

            //$('#manage_para').modal('close');
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}
