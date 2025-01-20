/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var url = "http://192.168.20.1:8080/api.cms/service/"
//var url = "http://localhost:8080/api.cms/service/";
var user = '';
var role = '';
var type = '';
var organ = '';
var organUserid = '';
var organName = '';
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
    //console.log(user);
    sessionEmpty(email);
    getAccount(email);
    getOrgans();
    //datepicker('model_follow_date');
    //loadWorkers();
    //pager();
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
                //  console.log(data);
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
                            // console.log(value.email);
                            var value = jdata;
                            //console.log(value);
                            // document.getElementById('pro_userid').innerHTML = value.resid;
                            // document.getElementById('user_name').innerHTML = value.name;
                            //document.getElementById('pro_name').innerHTML = value.name;
                            document.getElementById('user_name').innerHTML = value.name;
                            //document.getElementById('user_email').innerHTML = value.email;
                            //document.getElementById('pro_email').innerHTML = value.email;
                            //document.getElementById('pro_phone').innerHTML = value.phone;
                            //document.getElementById('pro_role').innerHTML = roleSetter(value.role);
                            organ = jdata.organ;
                            act_name = jdata.name;
                            //console.log(organUserid);
                            //setRole(jdata.role);
                            setType(jdata.type);
                            //getConame(jdata.organ);
                            setAdmin_role(value.role);
                            loadWorkerCat(jdata.type, jdata.organ);
                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.Users, function (index, value) {
                                alert("Error while loading user data(Uname)");
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
                    alert("MW Response Error", e, getAccount);
                }
            },
            error: function (d) {
                //$("#id").html()
                alert("Response Error");
                if (ajaxOptions === 'timeout') {
                    alert("Ajax Error", "Connection TimeOut");
                } else {
                    alert("Ajax Error", "Something went wrong!");
                }
            }});
    } catch (ex) {
        ShowError("Exception", ex);
    }
}



function getConame(input) {
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
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            var value = jdata;
                            document.getElementById('co_name').value = jdata.names;
                            //console.log(value.names);
                            //console.log(document.getElementById("co_name").value);
                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.organ, function (index, value) {
                                alert("Error while loading user data(COm)");
                                //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                                //++i;
                            });
                        }
                    } else {
                        alert("No Data to load");
                    }
                    //console.log(co_name);
                    //appending data
                    // $("#logs").append(e_data);
                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, getConame);
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



function loadWorkerCat(input, organs) {
    if (input === "1") {
        loadLocalAgency(organs);
    } else if (input === "2") {
        loadForeignAgency(organs);
    } else if (input === "3") {
       loadWorkers();
    } else if (input === "4") {
        loadWorkers();
    } else {
        alert("Error Code");
    }

}


function loadWorkers() {
    try {
        $.ajax({
//
            url: url + "fetch/worker_cty/UG",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#mw_app_table_body").html('<tr><td colspan="15" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#mw_app_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.user_worker;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageMW(this)" name= "' + value.userid + '"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.nin + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.names + '</td>';
                            e_data += '<td>' + gender(value.gender) + '</td>';
                            e_data += '<td>' + value.address + '</td>';
                            e_data += '<td>' + value.location + '</td>';
                            e_data += '<td>' + value.kin_name + '</td>';
                            e_data += '<td>' + value.kin_phone + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.user_worker, function (index, value) {
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageMW(this)" name= "' + value.userid + '"   type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.nin + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.names + '</td>';
                                e_data += '<td>' + gender(value.gender) + '</td>';
                                e_data += '<td>' + value.address + '</td>';
                                e_data += '<td>' + value.location + '</td>';
                                e_data += '<td>' + value.kin_name + '</td>';
                                e_data += '<td>' + value.kin_phone + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#mw_app_table").append(e_data);
                    pager('mw_app_table');
                } catch (e) {
                    ShowError("Response Error", e, loadWorkers);
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



document.getElementById('mw_search_btn').addEventListener('click', loadWorkers_cty);
function loadWorkers_cty(event) {
    event.preventDefault();
    var con = document.getElementById('mw_para').value;
    try {
        $.ajax({
//
            url: url + "fetch/workers_cty/" + con + "/UG",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#mw_app_table_body").html('<tr><td colspan="15" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

                $("#mw_app_table_body").empty();
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#mw_app_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.user_worker;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageMW(this)" name= "' + value.userid + '"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.nin + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.names + '</td>';
                            e_data += '<td>' + gender(value.gender) + '</td>';
                            e_data += '<td>' + value.address + '</td>';
                            e_data += '<td>' + value.location + '</td>';
                            e_data += '<td>' + value.kin_name + '</td>';
                            e_data += '<td>' + value.kin_phone + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.user_worker, function (index, value) {
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageMW(this)" name= "' + value.userid + '"   type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.nin + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.names + '</td>';
                                e_data += '<td>' + gender(value.gender) + '</td>';
                                e_data += '<td>' + value.address + '</td>';
                                e_data += '<td>' + value.location + '</td>';
                                e_data += '<td>' + value.kin_name + '</td>';
                                e_data += '<td>' + value.kin_phone + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#mw_app_table").append(e_data);
                    pager('mw_app_table');
                } catch (e) {
                    ShowError("Response Error", e, loadWorkers);
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





function loadLocalAgency(input) {
    try {
        $.ajax({
//
            url: url + "fetch/workercobi/" + input + "/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#mw_app_table_body").html('<tr><td colspan="15" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#mw_app_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.user_worker;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageMW(this)" name= "' + value.userid + '"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.nin + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.names + '</td>';
                            e_data += '<td>' + gender(value.gender) + '</td>';
                            e_data += '<td>' + value.address + '</td>';
                            e_data += '<td>' + value.location + '</td>';
                            e_data += '<td>' + value.kin_name + '</td>';
                            e_data += '<td>' + value.kin_phone + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.user_worker, function (index, value) {
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageMW(this)" name= "' + value.userid + '"   type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.nin + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.names + '</td>';
                                e_data += '<td>' + gender(value.gender) + '</td>';
                                e_data += '<td>' + value.address + '</td>';
                                e_data += '<td>' + value.location + '</td>';
                                e_data += '<td>' + value.kin_name + '</td>';
                                e_data += '<td>' + value.kin_phone + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#mw_app_table").append(e_data);
                    pager('mw_app_table');
                } catch (e) {
                    ShowError("Response Error", e, loadLocalAgency);
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


function loadForeignAgency(input) {
    try {
        $.ajax({
//
            url: url + "fetch/workercobi/null/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#mw_app_table_body").html('<tr><td colspan="15" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#mw_app_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.user_worker;
                        if (!isJsonArray(value)) {
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageMW(this)" name= "' + value.userid + '"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.nin + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.names + '</td>';
                            e_data += '<td>' + gender(value.gender) + '</td>';
                            e_data += '<td>' + value.address + '</td>';
                            e_data += '<td>' + value.location + '</td>';
                            e_data += '<td>' + value.kin_name + '</td>';
                            e_data += '<td>' + value.kin_phone + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.user_worker, function (index, value) {
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageMW(this)" name= "' + value.userid + '"   type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.nin + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.names + '</td>';
                                e_data += '<td>' + gender(value.gender) + '</td>';
                                e_data += '<td>' + value.address + '</td>';
                                e_data += '<td>' + value.location + '</td>';
                                e_data += '<td>' + value.kin_name + '</td>';
                                e_data += '<td>' + value.kin_phone + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#mw_app_table").append(e_data);
                    pager('mw_app_table');
                } catch (e) {
                    ShowError("Response Error", e, loadForeignAgency);
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


function gender(input) {
    if (input === "1") {
        return "Male";
    } else if (input === "2") {
        return "Female";
    } else {
        return "NA";
    }
}


function base64toPDF(data, userid) {
    var bufferArray = base64ToArrayBuffer(data);
    var blobStore = new Blob([bufferArray], {type: "application/pdf"});
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobStore);
        return;
    }

    var data = window.URL.createObjectURL(blobStore);
    var link = document.createElement('a');
    document.body.appendChild(link);
    link.href = data;
    link.download = "esafecard_" + userid + ".pdf";
    //link.open = "lemax_file.pdf";
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
}

function base64ToArrayBuffer(data) {
    var bString = window.atob(data);
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
        var ascii = bString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}





function genCard(userid, nin, passport, name, gender, marital, phone, email, dob, nationality, company, kin, kin_no, code) {
    let formData = new FormData();
    //getType(types);
    formData.append('userid', userid);
    formData.append('nin', nin);
    formData.append('passport', passport);
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('marital', marital);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('dob', dob);
    formData.append('nationality', nationality);
    formData.append('company', company);
    formData.append('kin', kin);
    formData.append('kin_no', kin_no);
    formData.append('code', code);

    // formData.append('Fname', fname);
    fetch(url + "create/gencard",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Card has been Generated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).then(function (data) {
        const obj = JSON.parse(data);
        base64toPDF(obj.pdf, userid);
        console.log(data);
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}

function getWorker(input) {

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
                            var value = jdata;
                            //console.log(value);
                            genCard(value.userid, value.nin, value.passport, value.names, gender(value.gender), value.marital, value.phone, value.email, value.dob, "UGANDAN", document.getElementById("co_name").value, value.kin_name, value.kin_phone, value.code);
                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.user_worker, function (index, value) {
                                alert("Error while loading user data(WORKER)");
                                //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                                //++i;
                            });
                        }
                    } else {
                        alert("Worker No Data to load");
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


//document.getElementById('all_mw').addEventListener('click', allMw);
function allMw(event) {
    //event.preventDefault();
    //  loadWorkerCat(type, organ);
}

//document.getElementById('search_mw').addEventListener('click', searchMW);
function searchMW(event) {
    // event.preventDefault();
    var id = document.getElementById('mw_id').value;
    try {
        $.ajax({
//
            url: url + "fetch/workers/" + id,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#mw_app_table_body").html('<tr><td colspan="15" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#mw_app_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.user_worker;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.nin + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.names + '</td>';
                            e_data += '<td>' + gender(value.gender) + '</td>';
                            e_data += '<td>' + value.marital + '</td>';
                            e_data += '<td>' + value.email + '</td>';
                            e_data += '<td>' + value.phone + '</td>';
                            e_data += '<td>' + value.dob + '</td>';
                            e_data += '<td>' + value.address + '</td>';
                            e_data += '<td>' + value.location + '</td>';
                            e_data += '<td>' + value.kin_name + '</td>';
                            e_data += '<td>' + value.kin_phone + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageMW(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.userid + '" onclick="getWorker(this)"  type="button"  class="btn btn-primary" >Card</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.user_worker, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.nin + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.names + '</td>';
                                e_data += '<td>' + gender(value.gender) + '</td>';
                                e_data += '<td>' + value.marital + '</td>';
                                e_data += '<td>' + value.email + '</td>';
                                e_data += '<td>' + value.phone + '</td>';
                                e_data += '<td>' + value.dob + '</td>';
                                e_data += '<td>' + value.address + '</td>';
                                e_data += '<td>' + value.location + '</td>';
                                e_data += '<td>' + value.kin_name + '</td>';
                                e_data += '<td>' + value.kin_phone + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageMW(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.userid + '" onclick="getWorker(this)"  type="button"  class="btn btn-primary" >Card</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#mw_app_table").append(e_data);
                    pager('mw_app_table');
                } catch (e) {
                    ShowError("Response Error", e, loadWorkers);
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


function loadlocalOrgan() {
    try {
        $.ajax({
            //
            url: url + "fetch/organs/1",
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
                    $("#model_mw_lorgan").empty();
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
                    $("#model_mw_lorgan").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadlocalOrgan);
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



function loadForeignOrgan() {
    try {
        $.ajax({
            //
            url: url + "fetch/organs/2",
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
                    $("#model_mw_organ").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadForeignOrgan);
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


document.getElementById('model_chat_button').addEventListener('click', chatMW);
function chatMW(event) {
    event.preventDefault();
    let formData = new FormData();

    let qtn = document.getElementById("model_mw_txt_qtn").value;
    let organid = document.getElementById("model_check_organid").value;
    let forgan = document.getElementById("model_mw_forgan").value;
    let userid = document.getElementById("model_check_organuser").value;
    let workerid = document.getElementById("model_check_userid").value;


    formData.append('workerid', workerid);
    formData.append('organid', organid);
    formData.append('forgan', forgan);
    formData.append('userid', organUserid);
    formData.append('period', "NA");
    formData.append('qtn', qtn);
    formData.append('answer', "No Reply Yet");
    formData.append("cty", "UG");
    fetch(url + "create/check",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Message Sent");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



document.getElementById('model_follow_button').addEventListener('click', checkMW);
function checkMW(event) {
    event.preventDefault();
    let formData = new FormData();

    let lco = document.getElementById("model_follow_organid").value;
    let fco = document.getElementById("model_follow_forgan").value;
    let officer = "NA";//document.getElementById("model_follow_organuser").value;
    let workerid = document.getElementById("model_follow_userid").value;
    let passport = document.getElementById("model_follow_pass").value;
    let name = document.getElementById("model_follow_name").value;
    let last = document.getElementById("model_follow_date").value;
    let period = document.getElementById("model_follow_period").value;


    formData.append('lco', lco);
    formData.append('fco', fco);
    formData.append('mw_id', workerid);
    formData.append('passport', passport);
    formData.append('name', name);
    formData.append('last', last);
    formData.append('loca', "NA");
    formData.append('salary', "NA");
    formData.append('phone', "NA");
    formData.append('food', "NA");
    formData.append('sleep', "NA");
    formData.append('work', "NA");
    formData.append('care', "NA");
    formData.append('family', "NA");
    formData.append('av_rest', "NA");
    formData.append('emp', "NA");
    formData.append('contract', "NA");
    formData.append('extra', "NA");
    formData.append('officer', officer);
    formData.append('period', period);
    formData.append("cty", "UG");
    formData.append('status', "0");


    fetch(url + "create/follow",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Check Up Sent");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


//document.getElementById('model_bank_update').addEventListener('click', bankUpdate);
function bankUpdate(event) {
    event.preventDefault();
    let formData = new FormData();

    let userid = document.getElementById("model_bank_userid").value;
    let bank_account = document.getElementById("model_bank_account").value;
    let bank_no = document.getElementById("model_bank_no").value;

    formData.append('userid', userid);
    formData.append('bank_name', bank_account);
    formData.append('bank_account', bank_no);

    fetch(url + "update/bank",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Bank Information updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


document.getElementById('model_mw_update').addEventListener('click', editMigrantWorker);
function editMigrantWorker(event) {
    event.preventDefault();
    let formData = new FormData();
    //let type = document.getElementById("supplier").value;
    let userid = document.getElementById("model_mw_userid").value;
    let nin = document.getElementById("model_mw_nin").value;
    let name = document.getElementById("model_mw_name").value;
    let pass = document.getElementById("model_mw_pass").value;
    let iqama = document.getElementById("model_mw_iqama").value;
    let email = document.getElementById("model_mw_email").value;
    let phone = document.getElementById("model_mw_lphone").value;
    let ex_phone = document.getElementById("model_mw_fphone").value;
    //let gender = document.getElementById("model_check_organid").value;
    let marital = document.getElementById("model_mw_marital").value;
    let nationality = document.getElementById("model_mw_nationality").value;
    let dob = document.getElementById("model_mw_dob").value;
    let lcompany = $("#model_mw_lorgan :selected").attr('id');
    let fcompany = $("#model_mw_organ :selected").attr('id');
    let kin_name = document.getElementById("model_mw_kin").value;
    let kin_no = document.getElementById("model_mw_kin_no").value;

    formData.append('userid', userid);
    formData.append('nin', nin);
    formData.append('name', name);
    formData.append('pass', pass);
    formData.append('iqama', iqama);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('ex_phone', ex_phone);
    formData.append('gender', "gender");
    formData.append('marital', marital);
    formData.append('nationality', nationality);
    formData.append('dob', dob);
    formData.append('lcompany', lcompany);
    formData.append('fcompany', fcompany);
    formData.append('kin_name', kin_name);
    formData.append('kin_no', kin_no);

    fetch(url + "update/worker_simple",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Migrant Worker Information updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



document.getElementById('model_mw_update_co').addEventListener('click', editMigrantWorker_co);
function editMigrantWorker_co(event) {
    event.preventDefault();
    let formData = new FormData();
    //let type = document.getElementById("supplier").value;
    let userid = document.getElementById("model_mw_userid").value;
    let lcompany = $("#model_mw_lorgan :selected").attr('id');
    let fcompany = $("#model_mw_organ :selected").attr('id');

    formData.append('userid', userid);
    formData.append('lcompany', lcompany);
    formData.append('fcompany', fcompany);

    fetch(url + "update/worker_co",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
       // console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Migrant Worker Company Information updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function manageMW(input) {
    //loadItem();
    // console.log(input);
    loadForeignOrgan();
    loadlocalOrgan();
    getMWDetails(input);
    loadLogsTimelime(input, 'timeline');
    //loadLogs(input, 'act_mw_table', 'act_mw_table_body');
    //loadLogDiv(input,'div_activity');
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
                            //document.getElementById('model_bank_userid').value = jdata.userid;
                            document.getElementById('model_check_userid').value = jdata.userid;
                            document.getElementById('model_follow_userid').value = jdata.userid;

                            document.getElementById('model_mw_pass').value = jdata.passport;
                            document.getElementById('model_follow_pass').value = jdata.passport;



                            //candidatPhoto(jdata.nin, 'model_mw_pic');

                            document.getElementById("model_mw_pic").src = "data:image/png;base64," + jdata.pic;
                            document.getElementById('model_mw_nin').value = jdata.nin;
                            document.getElementById('model_mw_iqama').value = jdata.iqama;
                            document.getElementById('model_mw_name').value = jdata.names;
                            document.getElementById('model_follow_name').value = jdata.names;

                            document.getElementById('model_mw_email').value = jdata.email;
                            document.getElementById('model_mw_lphone').value = jdata.phone;
                            document.getElementById('model_mw_fphone').value = jdata.ex_phone;
                            document.getElementById('model_mw_marital').value = jdata.marital;
                            document.getElementById('model_mw_dob').value = jdata.dob;
                            document.getElementById('model_mw_nationality').value = jdata.nationality;
                            document.getElementById('model_mw_kin').value = jdata.kin_name;
                            document.getElementById('model_mw_kin_no').value = jdata.kin_phone;

                            document.getElementById('model_mw_organid').value = jdata.lcompany;
                            document.getElementById('model_check_organid').value = jdata.lcompany;
                            document.getElementById('model_follow_organid').value = jdata.lcompany;


                            getCRDetails(jdata.userid);
                            getFco_name(jdata.lcompany, "mw_lco_id", "mw_lco_name", "mw_lco_tel", "mw_lco_email");
                            getFco_name(jdata.fcompany, "mw_fco_id", "mw_fco_name", "mw_fco_tel", "mw_fco_email");
                            //getFco_name(jdata.fcompany, 'model_mw_fco');
                            //getFco_name(jdata.lcompany, 'model_mw_lco');
                            document.getElementById('model_mw_forgan').value = jdata.fcompany;
                            document.getElementById('model_follow_forgan').value = jdata.fcompany;
                            //console.log(jdata.fcompany);

                            //document.getElementById('model_bank_account').value = jdata.bank_account;
                            //document.getElementById('model_bank_no').value = jdata.bank_name;
                            //document.getElementById('model_check_qtn').innerHTML = value.email;

                            //document.getElementById('model_check_organuser').value = jdata.organUserid;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.user_worker, function (index, value) {
                                alert("Error while loading user data(WORKER DETAILS)");
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
                
              console.log(e);
            }});
    } catch (ex) {
        ShowError("Exception", ex);
    }
}


function getFco_name(input, elm_id, elm_name, elm_tel, elm_email) {
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
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            //document.getElementById(elm).value = jdata.names;

                            document.getElementById(elm_id).value = jdata.organid;
                            document.getElementById(elm_name).value = jdata.names;
                            document.getElementById(elm_tel).value = jdata.phone;
                            document.getElementById(elm_email).value = jdata.email;
                            //document.getElementById('model_check_qtn').innerHTML = value.email;

                            //document.getElementById('model_check_organuser').value = jdata.organUserid;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.organ, function (index, value) {
                                alert("Error while loading user data(FCO)");
                                //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                                //++i;
                            });
                        }
                    } else {
                        alert("NO COMPANY ATTACHED");
                    }
                    //appending data
                    //$("#logs").append(e_data);
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


function getOrgans() {
    try {
        $.ajax({
//
            url: url + "fetch/organ",
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
                    $("#org_select").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, getOrgans);
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

function onChangeOrgan() {
    var name = $("#org_select :selected").attr('id');
    //console.log(name);
    loadLocalAgency(name);
}



document.getElementById('mw_btn_picture').addEventListener('click', updatePicture);
function updatePicture() {
    let formData = new FormData();
    let id = document.getElementById("model_mw_userid").value;
    let pic = document.getElementById("mw_pic"); //.value;


    formData.append('userid', id);
    formData.append('pic', pic.files[0]);
    fetch(url + "update/worker_pic",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Picture Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



//document.getElementById('mw_emp_seacrh').addEventListener('click', serachEmployer);
function serachEmployer() {

    var id = document.getElementById("mw_emp_s").value;
    try {
        $.ajax({
            url: url + "fetch/employer/0/" + id + "/" + id,
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

                            document.getElementById("mw_emp_id").value = jdata.emp_id;
                            document.getElementById("mw_emp_name").value = jdata.name;
                            document.getElementById("mw_emp_email").value = jdata.email;
                            document.getElementById("mw_emp_nin").value = jdata.nin;
                            document.getElementById("mw_emp_tel").value = jdata.contact;

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



function getCRDetails(input) {
    //document.getElementById('cr_manager').style.display = 'block';
    //let id = $(input).attr("id");
    //console.log(id);

    try {
        $.ajax({
            url: url + "fetch/contract/0/null/" + input + "/null/null/null",
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
                            getEmployer(jdata.emp);

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




function getEmployer(input) {
    //var id = document.getElementById("mw_emp_s").value;
    try {
        $.ajax({
            url: url + "fetch/employer/0/" + input + "/" + input,
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

                            document.getElementById("mw_emp_id").value = jdata.emp_id;
                            document.getElementById("mw_emp_name").value = jdata.name;
                            document.getElementById("mw_emp_email").value = jdata.email;
                            document.getElementById("mw_emp_nin").value = jdata.nin;
                            document.getElementById("mw_emp_tel").value = jdata.contact;
                            document.getElementById("mw_emp_sal").value = jdata.salary;

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


//document.getElementById('mw_transfer_new_btn').addEventListener('click', transferContract);
function transferContract() {
    var mw = document.getElementById("model_mw_userid").value;
    var emp = document.getElementById("mw_emp_id").value;
    var lco = document.getElementById("mw_lco_id").value;
    var fco = document.getElementById("mw_fco_id").value;
    var salary = document.getElementById("mw_emp_sal").value;
    var doc = document.getElementById("mw_transfer_doc");//.value;
    var remark = document.getElementById("mw_transfer_remark").value;

    var formdata = new FormData();
    formdata.append("mw", mw);
    formdata.append("emp", emp);
    formdata.append("lco", lco);
    formdata.append("fco", fco);
    formdata.append("start", "2023-09-19");
    formdata.append("end", "2025-09-19");
    formdata.append("salary", salary);
    formdata.append("cty", "UG");

    fetch(url + "/create/contract",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            logger(mw, "Contract Transfer", remark,act_name);
            addAttachment(mw, "Contract Tranfer Document", doc);
            alert("Transfer Successful");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });

}
