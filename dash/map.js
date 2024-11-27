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

                            document.getElementById('model_c_assignid').value = jdata.resid;
                            document.getElementById('model_c_assignee').value = jdata.name;
                            type = value.type;
                            act_name = value.name;
                            setRole(value.role);
                            setType(value.type);
                            organ = value.organ;
                            setAdmin_role(value.role);
                            //loadCaseAll(value.type, value.organ);
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
            url: url + "fetch/workerbi",
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
                            e_data += '<button id="' + value.id + '" onclick="getWorker(this)"  type="button"  class="btn btn-primary" >Card</button>';
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
                                e_data += '<button id="' + value.id + '" onclick="getWorker(this)"  type="button"  class="btn btn-primary" >Card</button>';
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
                            e_data += '<button id="' + value.id + '" onclick="getWorker(this)"  type="button"  class="btn btn-primary" >Card</button>';
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
                                e_data += '<button id="' + value.id + '" onclick="getWorker(this)"  type="button"  class="btn btn-primary" >Card</button>';
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
        //console.log(data);
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}

function getWorker(input) {

    let id = $(input).attr("id");
    try {
        $.ajax({
            url: url + "fetch/worker/" + id,
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
                                alert("Error while loading user data");
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


document.getElementById('all_mw').addEventListener('click', allMw);
function allMw(event) {
    event.preventDefault();
    loadWorkerCat(type, organ);
}

document.getElementById('search_mw').addEventListener('click', searchMW);
function searchMW(event) {
    event.preventDefault();
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


document.getElementById('model_check_button').addEventListener('click', checkUp);
function checkUp(event) {
    event.preventDefault();
    let formData = new FormData();
    //let type = document.getElementById("supplier").value;
    let period = $("#model_check_period :selected").attr('id');
    let qtn = document.getElementById("model_check_qtn").value;
    let organid = document.getElementById("model_check_organid").value;
    let userid = document.getElementById("model_check_organuser").value;
    let workerid = document.getElementById("model_check_userid").value;

    formData.append('workerid', workerid);
    formData.append('organid', organid);
    formData.append('userid', userid);
    formData.append('period', period);
    formData.append('qtn', qtn);
    formData.append('answer', "No Reply Yet");
    fetch(url + "create/check",
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

document.getElementById('model_bank_update').addEventListener('click', bankUpdate);
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




function manageMW(input) {
    //loadItem();
    loadForeignOrgan();
    getMWDetails(input);
    $('#manage_MW').modal('show');

}




function getMWDetails(input) {
    let id = $(input).attr("id");
    try {
        $.ajax({
            url: url + "fetch/worker/" + id,
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
                            document.getElementById('model_bank_userid').value = jdata.userid;
                            document.getElementById('model_check_userid').value = jdata.userid;
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
                            document.getElementById('model_check_organid').value = jdata.lcompany;

                            document.getElementById('model_bank_account').value = jdata.bank_account;
                            document.getElementById('model_bank_no').value = jdata.bank_name;


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

function initialize() {

    // Create a LatLng object
    // We use this LatLng object to center the map and position the marker
    var center = new google.maps.LatLng(0.299623,32.596551);

    // Declare your map options
    var mapOptions = {
        zoom: 15,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Create a map in the #map HTML element, using the declared options
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Create a marker and place it on the map
    var marker = new google.maps.Marker({
        position: center,
        map: map
    });
}