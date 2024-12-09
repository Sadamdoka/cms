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
    datepicker('jo_date');

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
        loadlco(organs);
        loadJo(organs);
        loadForeignOrgan();
    } else if (input === "2") {

    } else if (input === "3") {

    } else if (input === "4") {


    } else {
        alert("Error Code");
    }
}


function selectAgency() {
    let id = $("#jo_foreign :selected").attr('id');
    try {
        $.ajax({
            url: url + "fetch/organ/0/" + id,
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

                            // console.log(value.email);jo_organid
                            //console.log(jdata);
                            document.getElementById('jo_organid').value = jdata.organid;
                            document.getElementById('jo_name').value = jdata.names;
                            document.getElementById('jo_tel').value = jdata.phone;
                            document.getElementById('jo_email').value = jdata.email;
                            document.getElementById('jo_address').value = jdata.address;
                            //document.getElementById('rec_amt').value = jdata.total;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
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
                    $("#logs").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, searchInvoices);
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



function loadlco(input) {
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
                var e_data = '';
                // console.log(data);
                try {
                    $("#acc_facility").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.organ;
                        if (!isJsonArray(jdata)) {
                            // console.log(jdata.names);

                            document.getElementById('lco').value = jdata.organid;
                            document.getElementById('lname').value = jdata.names;
                            document.getElementById('ldetail').value = jdata.phone;
                        } else {
                            $.each(data.organ, function (index, value) {

                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#acc_facility").append(e_data);
                } catch (e) {
                    alert(e);
                    //ShowError("Response Error", e, loadlco);
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
                //console.log(data);
                try {
                    $("#jo_foreign").empty();
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
                                // console.log(value.id);
                                e_data += '<option id="' + value.organid + '"">';
                                e_data += value.names;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#jo_foreign").append(e_data);
                    selectAgency();
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


function calInvTotal() {
    var amt = document.getElementById('jo_cost').value;
    var qt = document.getElementById('jo_mw_no').value;
    var qty_amt = qt * amt;
    document.getElementById('jo_total').value = qty_amt;
}


document.getElementById('jo_create').addEventListener('click', addFin_jo);
function addFin_jo(event) {
    event.preventDefault();
    let formData = new FormData();

    let ref_no = document.getElementById("jo_ref").value;
    let fco = document.getElementById("jo_organid").value; //$("#rec_choice :selected").attr('id');
    let fname = document.getElementById("jo_name").value;
    let fdetail = document.getElementById("jo_tel").value + " / " + document.getElementById("jo_email").value;
    let lco = document.getElementById("lco").value;
    let lname = document.getElementById("lname").value;
    let ldetail = document.getElementById("ldetail").value;
    let qty = document.getElementById("jo_mw_no").value;
    let cost = document.getElementById("jo_cost").value;
    let total = document.getElementById("jo_total").value;
    let currency = document.getElementById("jo_cur").value;

    formData.append('ref_no', ref_no);
    formData.append('fco', fco);
    formData.append('fname', fname);
    formData.append('fdetail', fdetail);
    formData.append('lco', lco);
    formData.append('lname', lname);
    formData.append('ldetail', ldetail);
    formData.append('qty', qty);
    formData.append('cost', cost);
    formData.append('total', total);
    formData.append('currency', currency);

    fetch(url + "create/fin_jo",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Job Order Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



function loadJo(input) {
    try {
        $.ajax({
//
            url: url + "fetch/fin_jo/0/" + input + "/null",
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
                            e_data += '<td>' + jdata.fco + '</td>';
                            e_data += '<td>' + jdata.fname + '</td>';
                            e_data += '<td>' + jdata.fdetail + '</td>';
                            e_data += '<td>' + jdata.o_qty + '</td>';
                            e_data += '<td>' + jdata.qty + '</td>';
                            e_data += '<td>' + jdata.cost + '</td>';
                            e_data += '<td>' + jdata.o_total + '</td>';
                            e_data += '<td>' + jdata.total + '</td>';
                            e_data += '<td>';
                            e_data += "<a href='' id='" + jdata.id + "' onclick='delInv(this)' ><i class = 'fa fa-trash'></i></a>";
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.fin_jo, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.ref_no + '</td>';
                                e_data += '<td>' + value.job_id + '</td>';
                                e_data += '<td>' + value.fco + '</td>';
                                e_data += '<td>' + value.fname + '</td>';
                                e_data += '<td>' + value.fdetail + '</td>';
                                e_data += '<td>' + value.o_qty + '</td>';
                                e_data += '<td>' + value.qty + '</td>';
                                e_data += '<td>' + value.cost + '</td>';
                                e_data += '<td>' + value.o_total + '</td>';
                                e_data += '<td>' + value.total + '</td>';
                                e_data += '<td>';
                                e_data += "<a href='' id='" + value.id + "' onclick='delJo(this)' ><i class = 'fa fa-trash'></i></a>";
                                e_data += '</td>';
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