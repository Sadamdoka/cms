/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var url = "https://ceemis.mglsd.go.ug:8080/api.ceemis/service/"
//var url = "https://esafeafrica.com/api.ceemis/service/";

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
                            //role = value.role;
                            
                            act_name = value.name;

                            setRole(value.role);
                            setType(value.type);
                            type = value.type;
                            loadRep(value.type, value.organ);
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



function roleSetter(input) {
    if (input === "1") {
        return "Admin User";
    } else if (input === "2") {
        return "Normal User";
    } else {
        return "Role Not Defined";
    }
}



function loadRep(input, organ) {
    if (input === "1") {
        loadReciepts(organ);
        loadInvoice(organ);
        loadPayout(organ);
        loadRoll(organ);
        loadled(organ);
    } else if (input === "2") {

    } else if (input === "3") {

    } else if (input === "4") {

    } else {
        alert("Error Code");
    }
}



function loadReciepts(input) {
    try {
        $.ajax({
//
            url: url + "fetch/reciept/0/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#rec_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#rec_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.reciepts;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.sale_date + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.ref_no + '</td>';
                            e_data += '<td>' + value.recieptid + '</td>';
                            e_data += '<td>' + value.ref + '</td>';
                            e_data += '<td>' + value.type + '</td>';
                            e_data += '<td>' + value.ms + '</td>';
                            e_data += '<td>' + value.tel + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>' + value.total + '</td>';
                            e_data += '<td>' + value.balance + '</td>';
                            e_data += '<td>' + value.cheque_no + '</td>';
                            e_data += '<td>' + value.due + '</td>';
                            e_data += '<td>' + value.drawer + '</td>';
                            e_data += '<td>' + value.currency + '</td>';
                            e_data += '<td>' + value.method + '</td>';
                            e_data += '<td>' + value.prepared + '</td>';
                            e_data += '<td>';
                            e_data += "<a href='' id='" + value.id + "' onclick='delReceipt(this)' ><i class = 'fa fa-trash'></i></a>";
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.reciepts, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.sale_date + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.ref_no + '</td>';
                                e_data += '<td>' + value.recieptid + '</td>';
                                e_data += '<td>' + value.ref + '</td>';
                                e_data += '<td>' + value.type + '</td>';
                                e_data += '<td>' + value.ms + '</td>';
                                e_data += '<td>' + value.tel + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>' + value.total + '</td>';
                                e_data += '<td>' + value.balance + '</td>';
                                e_data += '<td>' + value.cheque_no + '</td>';
                                e_data += '<td>' + value.due + '</td>';
                                e_data += '<td>' + value.drawer + '</td>';
                                e_data += '<td>' + value.currency + '</td>';
                                e_data += '<td>' + value.method + '</td>';
                                e_data += '<td>' + value.prepared + '</td>';
                                e_data += '<td>';
                                e_data += "<a href='' id='" + value.id + "' onclick='delReceipt(this)' ><i class = 'fa fa-trash'></i></a>";
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#rec_table").append(e_data);
                    pager('rec_table');
                } catch (e) {
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



function loadInvoice(input) {
    try {
        $.ajax({
//
            url: url + "fetch/fin_invoice/0/" + input + "/null",
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
                            e_data += '<td>' + jdata.fco + '</td>';
                            e_data += '<td>' + jdata.fname + '</td>';
                            e_data += '<td>' + jdata.fdetail + '</td>';
                            e_data += '<td>' + jdata.qty + '</td>';
                            e_data += '<td>' + jdata.cost + '</td>';
                            e_data += '<td>' + jdata.o_total + '</td>';
                            e_data += '<td>' + jdata.total + '</td>';
                            e_data += '<td>';
                            e_data += "<a href='' id='" + jdata.id + "' onclick='delInv(this)' ><i class = 'fa fa-trash'></i></a>";
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
                                e_data += '<td>' + value.fco + '</td>';
                                e_data += '<td>' + value.fname + '</td>';
                                e_data += '<td>' + value.fdetail + '</td>';
                                e_data += '<td>' + value.qty + '</td>';
                                e_data += '<td>' + value.cost + '</td>';
                                e_data += '<td>' + value.o_total + '</td>';
                                e_data += '<td>' + value.total + '</td>';
                                e_data += '<td>';
                                e_data += "<a href='' id='" + value.id + "' onclick='delInv(this)' ><i class = 'fa fa-trash'></i></a>";
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



function loadPayout(input) {
    try {
        $.ajax({
//
            url: url + "fetch/payout/0/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#payout_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#payout_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.payout;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.ref_no + '</td>';
                            e_data += '<td>' + value.pay_id + '</td>';
                            e_data += '<td>' + value.type + '</td>';
                            e_data += '<td>' + value.pay_to + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>' + value.reason + '</td>';
                            e_data += '<td>' + value.amount + '</td>';
                            e_data += '<td>' + value.authe_by + '</td>';
                            e_data += '<td>';
                            e_data += "<a href='' id='" + value.id + "' onclick='delPay(this)' ><i class = 'fa fa-trash'></i></a>";
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.payout, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.ref_no + '</td>';
                                e_data += '<td>' + value.pay_id + '</td>';
                                e_data += '<td>' + value.type + '</td>';
                                e_data += '<td>' + value.pay_to + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>' + value.reason + '</td>';
                                e_data += '<td>' + value.amount + '</td>';
                                e_data += '<td>' + value.authe_by + '</td>';
                                e_data += '<td>';
                                e_data += "<a href='' id='" + value.id + "' onclick='delPay(this)' ><i class = 'fa fa-trash'></i></a>";
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#payout_table").append(e_data);
                    pager('payout_table');
                } catch (e) {
                    //ShowError("Response Error", e, loadPayout);
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


function loadRoll(input) {
    try {
        $.ajax({
//
            url: url + "fetch/payroll/0/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#roll_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                //console.log(data);
                try {
                    $("#roll_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.payroll;
                        if (!isJsonArray(value)) {
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.ref_no + '</td>';
                            e_data += '<td>' + value.pay_id + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.tel + '</td>';
                            e_data += '<td>' + value.month + '</td>';
                            e_data += '<td>' + value.net + '</td>';
                            e_data += '<td>' + value.bonus + '</td>';
                            e_data += '<td>' + value.amount + '</td>';
                            e_data += '<td>';
                            e_data += "<a href='' id='" + value.id + "' onclick='delRoll(this)' ><i class = 'fa fa-trash'></i></a>";
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.payroll, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.ref_no + '</td>';
                                e_data += '<td>' + value.pay_id + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.tel + '</td>';
                                e_data += '<td>' + value.month + '</td>';
                                e_data += '<td>' + value.net + '</td>';
                                e_data += '<td>' + value.bonus + '</td>';
                                e_data += '<td>' + value.amount + '</td>';
                                e_data += '<td>';
                                e_data += "<a href='' id='" + value.id + "' onclick='delRoll(this)' ><i class = 'fa fa-trash'></i></a>";
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#roll_table").append(e_data);
                    pager('roll_table');
                } catch (e) {
                    //ShowError("Response Error", e, loadRoll);
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



function delReceipt(input) {
    event.preventDefault();
    let id = $(input).attr("id");
    let formData = new FormData();
    formData.append('id', id);
    $.ajax({
        url: url + "delete/reciept",
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

function delInv(input) {
    event.preventDefault();
    let id = $(input).attr("id");
    let formData = new FormData();
    formData.append('id', id);
    $.ajax({
        url: url + "delete/fin_invoice",
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


function delPay(input) {
    event.preventDefault();
    let id = $(input).attr("id");
    let formData = new FormData();
    formData.append('id', id);
    $.ajax({
        url: url + "delete/payout",
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


function delRoll(input) {
    event.preventDefault();
    let id = $(input).attr("id");
    let formData = new FormData();
    formData.append('id', id);
    $.ajax({
        url: url + "delete/payroll",
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


function delled(input) {
    event.preventDefault();
    let id = $(input).attr("id");
    let formData = new FormData();
    formData.append('id', id);
    $.ajax({
        url: url + "delete/ledger",
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

