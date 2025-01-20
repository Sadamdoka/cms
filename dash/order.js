/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var url = "http://192.168.20.1:8080/api.cms/service/";
 
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
                            document.getElementById('user_name').innerHTML = value.name;
                            document.getElementById('user_name_head').innerHTML = value.name;
                            document.getElementById('user_email').innerHTML = value.email;
                            type = value.type;
                            act_name = value.name;
                            organs = value.organ;
                            setRole(value.role);
                            setType(value.type);
                            loadDet(value.type, value.organ);
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


function loadDet(input, organs) {
    //console.log(organs);
    if (input === "1") {
        //loadlco(organs);
        //loadForeignOrgan();
    } else if (input === "2") {
        loadJo(organs);
        loadInvoice(organs);

    } else if (input === "3") {

    } else if (input === "4") {


    } else {
        alert("Error Code");
    }
}


function calInvTotal() {
    var amt = document.getElementById('jo_cost').value;
    var qt = document.getElementById('jo_mw_no').value;
    var qty_amt = qt * amt;
    document.getElementById('jo_total').value = qty_amt;
}


function loadJo(input) {
    try {
        $.ajax({
//
            url: url + "fetch/fin_jo/0/null/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#jo_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#jo_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        //console.log(data);
                        var jdata = data.fin_jo;
                        if (!isJsonArray(jdata)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(jdata.datereg) + '</td>';
                            e_data += '<td>' + jdata.id + '</td>';
                            e_data += '<td>' + jdata.ref_no + '</td>';
                            e_data += '<td>' + jdata.job_id + '</td>';
                            e_data += '<td>' + jdata.lco + '</td>';
                            e_data += '<td>' + jdata.lname + '</td>';
                            e_data += '<td>' + jdata.ldetail + '</td>';
                            e_data += '<td>' + jdata.o_qty + '</td>';
                            e_data += '<td>' + jdata.qty + '</td>';
                            e_data += '<td>' + jdata.cost + '</td>';
                            e_data += '<td>' + jdata.o_total + '</td>';
                            e_data += '<td>' + jdata.total + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.fin_jo, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.ref_no + '</td>';
                                e_data += '<td>' + value.job_id + '</td>';
                                e_data += '<td>' + value.lco + '</td>';
                                e_data += '<td>' + value.lname + '</td>';
                                e_data += '<td>' + value.ldetail + '</td>';
                                e_data += '<td>' + value.o_qty + '</td>';
                                e_data += '<td>' + value.qty + '</td>';
                                e_data += '<td>' + value.cost + '</td>';
                                e_data += '<td>' + value.o_total + '</td>';
                                e_data += '<td>' + value.total + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#jo_table").append(e_data);
                    pager('jo_table');
                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, loadReciepts);
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


function delJo(input) {
    event.preventDefault();
    let id = $(input).attr("id");
    let formData = new FormData();
    formData.append('id', id);
    $.ajax({
        url: url + "delete/fin_jo",
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


function loadInvoice(input) {
    try {
        $.ajax({
//
            url: url + "fetch/fin_invoice/0/null/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#inv_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#inv_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        //console.log(data);
                        var jdata = data.fin_invoice;
                        if (!isJsonArray(jdata)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(jdata.datereg) + '</td>';
                            e_data += '<td>' + jdata.id + '</td>';
                            e_data += '<td>' + jdata.ref_no + '</td>';
                            e_data += '<td>' + jdata.job_id + '</td>';
                            e_data += '<td>' + jdata.inv_id + '</td>';
                            e_data += '<td>' + jdata.lco + '</td>';
                            e_data += '<td>' + jdata.lname + '</td>';
                            e_data += '<td>' + jdata.ldetail + '</td>';
                            e_data += '<td>' + jdata.qty + '</td>';
                            e_data += '<td>' + jdata.cost + '</td>';
                            e_data += '<td>' + jdata.o_total + '</td>';
                            e_data += '<td>' + jdata.total + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + jdata.inv_id + '" onclick="manageA(this)"  type="button"  class="btn btn-primary" >View Details</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.fin_invoice, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.ref_no + '</td>';
                                e_data += '<td>' + value.job_id + '</td>';
                                e_data += '<td>' + value.inv_id + '</td>';
                                e_data += '<td>' + value.lco + '</td>';
                                e_data += '<td>' + value.lname + '</td>';
                                e_data += '<td>' + value.ldetail + '</td>';
                                e_data += '<td>' + value.qty + '</td>';
                                e_data += '<td>' + value.cost + '</td>';
                                e_data += '<td>' + value.o_total + '</td>';
                                e_data += '<td>' + value.total + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.inv_id + '" onclick="manageA(this)"  type="button"  class="btn btn-primary" >View Details</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#inv_table").append(e_data);
                    pager('inv_table');
                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, loadReciepts);
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

function manageA(input) {
    $('#add_model_attach').modal('show');
    let id = $(input).attr("id");
    //console.log(id);
    loadattach(id);
}


function loadattach(input) {
    try {
        $.ajax({
            //
            url: url + "fetch/attach/0/" + input + "/null/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#inv_aa_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#inv_aa_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        //console.log(data);
                        var value = data.fin_jo_attach;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.jo_id + '</td>';
                            e_data += '<td>' + value.inv_id + '</td>';
                            e_data += '<td>' + value.mw_id + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.nin + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.arrival + '</td>';
                            e_data += '<td>' + value.job + '</td>';
                            e_data += '<td>' + value.cost + '</td>';
                            e_data += '<td>' + value.remarks + '</td>';
                            e_data += '<td>' + value.total + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.fin_jo_attach, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.jo_id + '</td>';
                                e_data += '<td>' + value.inv_id + '</td>';
                                e_data += '<td>' + value.mw_id + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.nin + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.arrival + '</td>';
                                e_data += '<td>' + value.job + '</td>';
                                e_data += '<td>' + value.cost + '</td>';
                                e_data += '<td>' + value.remarks + '</td>';
                                e_data += '<td>' + value.total + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#inv_aa_table").append(e_data);
                    pager('inv_aa_table');
                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, loadReciepts);
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


function delattach(input) {
    event.preventDefault();
    let id = $(input).attr("id");
    let formData = new FormData();
    formData.append('id', id);
    $.ajax({
        url: url + "delete/attach",
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