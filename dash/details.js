/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var url = "https:esafeafrica.com/api.monitoring_mglsd/service/";
//var url = "https://avienseconsults.com/api.monitoring_mglsd/service/";
//var url = "http://localhost:8080/api.esafe/service/";


var user = '';
var role = '';
var type = '';
var organs = '';
var userid = '';
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
                            act_name = jdata.name;
                            type = jdata.type;
                            organs = jdata.organ;
                            userid = jdata.resid;
                            //setType(jdata.type);

                            //setRole(jdata.role);
                            //loadOrgan(jdata.organ, 'pic_logo');
                            //getOrgan_details(jdata.organ);
                            loadOrgan('2', 'det_fco', "<option  disabled selected hidden >Choose Recrutment Agency</option>");
                            //setRole_s(jdata.role);
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
        //loadPara(organs);
    } else if (input === "2") {
        //loadPara(organs);
        //loadCompanies_all();
    } else if (input === "3") {
        loadCompanies_Home();
        loadCompanies_SA();
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



function getOrgan_details(input) {
    let id = $(input).attr("id");
    //console.log(input);
    let xs = $('#' + id + ' :selected').attr('id');

    try {
        $.ajax({
            url: url + "fetch/organ/0/" + xs,
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
                            //Add Singular values
                            $("#co_status_").empty();
                            $("#co_status_").append(getCoStatus(jdata.status));
                            loadPara(jdata.organid);
                            loadRemark(jdata.organid);
                            document.getElementById("det_genid").value = jdata.id;
                            document.getElementById("para_gen").value = jdata.id;
                            document.getElementById("det_organid").value = jdata.organid;
                            document.getElementById("para_organ").value = jdata.organid;
                            document.getElementById("det_name").value = jdata.names;
                            document.getElementById("det_phone").value = jdata.phone;
                            document.getElementById("det_email").value = jdata.email;
                            document.getElementById("det_license").value = jdata.license;
                            document.getElementById("det_l_type").value = jdata.license_type;
                            document.getElementById("det_l_exp").value = jdata.license_exp;
                            document.getElementById("det_address").value = jdata.address;
                            document.getElementById("det_country").value = jdata.country;

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




//document.getElementById('det_edit').addEventListener('click', confirmEdit);
function confirmEdit() {
    var genid = document.getElementById("det_genid").value;
    //var organid = document.getElementById("det_organid").value;
    var name = document.getElementById("det_name").value;
    var phone = document.getElementById("det_phone").value;
    var email = document.getElementById("det_email").value;
    var licence = document.getElementById("det_license").value;
    var l_type = document.getElementById("det_l_type").value;
    var l_exp = document.getElementById("det_l_exp").value;
    var address = document.getElementById("det_address").value;
    var country = document.getElementById("det_country").value;

    var type = document.getElementById("det_country").value;
    var _ie = document.getElementById("det_country").value;

    var formdata = new FormData();
    formdata.append("id", genid);
    formdata.append("name", name);
    formdata.append("address", address);
    formdata.append("email", email);
    formdata.append("phone", phone);
    formdata.append("type", type);
    formdata.append("country", country);
    formdata.append("_ie", _ie);
    formdata.append("license", licence);
    formdata.append("l_type", l_type);
    formdata.append("l_exp", l_exp);
    //formdata.append("logo", );

    fetch(url + "update/organ",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Information Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
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


function getCoStatus(input) {
    if (input === '0') {
        return '<span class="badge badge-warning">Pending</span>';
    } else if (input === '1') {
        return '<span class="badge badge-success">Active</span>';
    } else if (input === '2') {
        return '<span class="badge badge-danger">Rejected</span>';
    } else if (input === '3') {
        return '<span class="badge badge-danger">Suspended</span>';
    } else {
        return '<span class="badge badge-success">Closed</span>';
    }
}


document.getElementById('det_view_para').addEventListener('click', viewpara);
function viewpara() {
    //let organ = $(input).attr("value");
    //let id = $(input).attr("id");
    //getPara(id);
    $('#view_para').modal('show');
}



function managePara(input) {
    let organ = $(input).attr("value");
    let id = $(input).attr("id");
    getPara(id);
    loadRemark(organ);
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


document.getElementById('para_active').addEventListener('click', actCompany);
function actCompany() {
    var genid = document.getElementById("para_gen").value;
    var msg = document.getElementById("para_msg").value;
    var organ = document.getElementById("para_organ").value;
    let  status = $("#para_co_status :selected").attr('id');


    var formdata = new FormData();
    formdata.append("id", genid);
    formdata.append("organ", organ);
    formdata.append("status", status);

    fetch(url + "update/organ_status",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            if (!msg) {
                alert("Information Updated");
            } else {
                sendRemark(organ, organs, userid, msg);
            }

            //$('#manage_para').modal('close');
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}

function sendRemark(organid, emb, userid, qtn) {

    var formdata = new FormData();
    formdata.append("workerid", organid);
    formdata.append("organid", emb);
    formdata.append("forgan", emb);
    formdata.append("userid", userid);
    formdata.append("period", "NA");
    formdata.append("qtn", qtn);
    formdata.append("answer", "NA");

    fetch(url + "create/check",
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



function loadOrgan(input, elem, opt) {
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




function loadCompanies_SA() {
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
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.organid + '</td>';
                            e_data += '<td>' + value.license + '</td>';
                            e_data += '<td>' + value.names + '</td>';
                            e_data += '<td>' + value.address + '</td>';
                            e_data += '<td>' + value.country + '</td>';
                            e_data += '<td>' + value.email + '</td>';
                            e_data += '<td>' + value.phone + '</td>';
                            e_data += '<td>' + getCoType(value.type) + '</td>';
                            e_data += '<td>' + getCoStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.organ, function (index, value) {
                                //console.log(value.id);

                                // console.log(value);

                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.organid + '</td>';
                                e_data += '<td>' + value.license + '</td>';
                                e_data += '<td>' + value.names + '</td>';
                                e_data += '<td>' + value.address + '</td>';
                                e_data += '<td>' + value.country + '</td>';
                                e_data += '<td>' + value.email + '</td>';
                                e_data += '<td>' + value.phone + '</td>';
                                e_data += '<td>' + getCoType(value.type) + '</td>';
                                e_data += '<td>' + getCoStatus(value.status) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="20" align="center">No data</td></tr>';
                    }
                    $("#co_table").append(e_data);
                    pager('co_table');
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
                $("#lco_body").html('<tr><td colspan="20" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#lco_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.organ;
                        if (!isJsonArray(value)) {

                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.organid + '</td>';
                            e_data += '<td>' + value.license + '</td>';
                            e_data += '<td>' + value.names + '</td>';
                            e_data += '<td>' + value.address + '</td>';
                            e_data += '<td>' + value.country + '</td>';
                            e_data += '<td>' + value.email + '</td>';
                            e_data += '<td>' + value.phone + '</td>';
                            e_data += '<td>' + getCoType(value.type) + '</td>';
                            e_data += '<td>' + getCoStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.organ, function (index, value) {
                                //console.log(value.id);

                                // console.log(value);

                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.organid + '</td>';
                                e_data += '<td>' + value.license + '</td>';
                                e_data += '<td>' + value.names + '</td>';
                                e_data += '<td>' + value.address + '</td>';
                                e_data += '<td>' + value.country + '</td>';
                                e_data += '<td>' + value.email + '</td>';
                                e_data += '<td>' + value.phone + '</td>';
                                e_data += '<td>' + getCoType(value.type) + '</td>';
                                e_data += '<td>' + getCoStatus(value.status) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="20" align="center">No data</td></tr>';
                    }
                    $("#lco_table").append(e_data);
                    pager('lco_table');
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
        return "BURUNDIAN COMPANY";
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


function loadRemark(input) {
    try {
        $.ajax({
//
            url: url + "fetch/check/" + input + "/0",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#remark_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#remark_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        //console.log(data);
                        row += "";
                        var value = data.check_up;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);

                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="clearRemark(this)" value = "' + value.workerid + '"  type="button"  class="btn btn-info" >Clear Query</button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.qtn + '</td>';
                            e_data += '<td>' + getRemarkStatus(value.status) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.check_up, function (index, value) {
                                //console.log(value);

                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="clearRemark(this)" value = "' + value.workerid + '"  type="button"  class="btn btn-info" >Clear Query</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.qtn + '</td>';
                                e_data += '<td>' + getRemarkStatus(value.status) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#remark_table").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadRemark);
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


function getRemarkStatus(input) {
    if (input === '0') {
        return '<span class="badge badge-warning">Pending</span>';
    } else {
        return '<span class="badge badge-success">Success</span>';
    }
}


document.getElementById('det_view_remarks').addEventListener('click', viewremarks);
function viewremarks() {
    //let organ = $(input).attr("value");
    //let id = $(input).attr("id");
    $('#manage_remark').modal('show');
}


function clearRemark(input) {
    let id = $(input).attr("id");

    fetch(url + "conditions/check/" + id + "/1",
            {
                //body: formdata,
                method: 'GET'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Remark Cleared");

            //$('#manage_para').modal('close');
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}