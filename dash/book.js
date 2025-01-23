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
    datepicker('inv_arrival');
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
                            document.getElementById('lco').value = jdata.organ;
                            act_name = jdata.name;
                            type = value.type;
                            organs = value.organ;
                            setRole(value.role);
                            setType(value.type);
                            loadAcco(value.type, value.organ);
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


function loadAcco(input, organs) {
    //console.log(organs);
    if (input === "1") {
        loadAccount(organs, "tran_a");
        loadAccount(organs, "tran_b");
        loadAccDet(organs);
        loadTran(organs);
    } else if (input === "2") {
        // loadAccommodation_foreign(organs);
    } else if (input === "3") {
        //  loadAccommodation();
    } else if (input === "4") {
        // loadAccommodation();
    } else {
        alert("Error Code");
    }
}



document.getElementById('acc_add').addEventListener('click', addAccount);
function addAccount(event) {
    event.preventDefault();
    let formData = new FormData();

    let lco = document.getElementById("lco").value;
    let fco = document.getElementById("lco").value;
    let name = document.getElementById("acc_name").value; //$("#rec_choice :selected").attr('id');
    let number = document.getElementById("acc_no").value;
    let amount = document.getElementById("acc_amt").value;
    let type = document.getElementById("acc_type").value;
    let currency = document.getElementById("acc_currency").value;



    formData.append('lco', lco);
    formData.append('fco', fco);
    formData.append('name', name);
    formData.append('number', number);
    formData.append('amount', amount);
    formData.append('type', type);
    formData.append('currency', currency);

    fetch(url + "create/fin_accounts",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Account Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



function loadAccount(organ, acc) {
    try {
        $.ajax({
            //
            url: url + "fetch/fin_accounts/0/null/" + organ,
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
                    $("#" + acc).empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.fin_accounts;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            e_data += '<option id="' + jdata.account_id + '" value="' + jdata.id + '"">';
                            e_data += jdata.account_id + " | " + jdata.name + " | " + jdata.currency + " : " + jdata.amount;
                            e_data += '</option>';
                        } else {
                            $.each(data.fin_accounts, function (index, value) {
                                //console.log(value.id);
                                e_data += '<option id="' + value.account_id + '" value="' + value.id + '"">';
                                e_data += value.account_id + " | " + value.name + " | " + value.currency + " : " + value.amount;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }

                    $("#" + acc).append(e_data);

                } catch (e) {
                    ShowError("Response Error", e, loadAccount);
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



document.getElementById('tran_add').addEventListener('click', addTran);
function addTran(event) {
    event.preventDefault();
    let formData = new FormData();

    let lco = document.getElementById("lco").value;
    let fco = document.getElementById("lco").value;
    let acc_a = $("#tran_a option:selected").attr('id');
    let det_a = $("#tran_a option:selected").text();
    let acc_b = $("#tran_b option:selected").attr('id');
    let det_b = $("#tran_b option:selected").text();
    let des = document.getElementById("tran_des").value;
    let amount = document.getElementById("tran_amt").value;
    let type = document.getElementById("tran_type").value;

    formData.append('lco', lco);
    formData.append('fco', fco);
    formData.append('acc_a', acc_a);
    formData.append('det_a', det_a);
    formData.append('acc_b', acc_b);
    formData.append('det_b', det_b);
    formData.append('des', des);
    formData.append('amount', amount);
    formData.append('type', type);

    fetch(url + "create/transaction",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            minusAccount("0", acc_a, amount);
            plusAccount("0", acc_b, amount);
            alert("Transaction Successfull");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



function minusAccount(id, acc_id, amount) {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('acc_id', acc_id);
    formData.append('amount', amount);
    fetch(url + "update/minus_fin_accounts",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Account Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}




function plusAccount(id, acc_id, amount) {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('acc_id', acc_id);
    formData.append('amount', amount);
    fetch(url + "update/plus_fin_accounts",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Account Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}




function loadAccDet(input) {
    try {
        $.ajax({
//
            url: url + "fetch/fin_accounts/0/null/" + input,
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
                        //console.log(data);
                        var jdata = data.fin_accounts;
                        if (!isJsonArray(jdata)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(jdata.datereg) + '</td>';
                            e_data += '<td>' + jdata.currency + '</td>';
                            e_data += '<td>' + jdata.id + '</td>';
                            e_data += '<td>' + jdata.account_id + '</td>';
                            e_data += '<td>' + jdata.name + '</td>';
                            e_data += '<td>' + jdata.number + '</td>';
                            e_data += '<td>' + jdata.amount + '</td>';
                            e_data += '<td>' + jdata.type + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.fin_accounts, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.currency + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.account_id + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.number + '</td>';
                                e_data += '<td>' + value.amount + '</td>';
                                e_data += '<td>' + value.type + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#acc_table").append(e_data);
                    //pager('acc_table');
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


function loadTran(input) {
    try {
        $.ajax({
//
            url: url + "fetch/transaction/0/null/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#tran_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#tran_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        // console.log(data);
                        var jdata = data.transaction;
                        if (!isJsonArray(jdata)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(jdata.datereg) + '</td>';
                            e_data += '<td>' + jdata.id + '</td>';
                            e_data += '<td>' + jdata.tranid + '</td>';
                            e_data += '<td>' + jdata.accountid_a + '</td>';
                            e_data += '<td>' + jdata.det_a + '</td>';
                            e_data += '<td>' + jdata.accountid_b + '</td>';
                            e_data += '<td>' + jdata.det_b + '</td>';
                            e_data += '<td>' + jdata.description + '</td>';
                            e_data += '<td>' + jdata.amount + '</td>';
                            e_data += '<td>' + jdata.type + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.transaction, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.tranid + '</td>';
                                e_data += '<td>' + value.accountid_a + '</td>';
                                e_data += '<td>' + value.det_a + '</td>';
                                e_data += '<td>' + value.accountid_b + '</td>';
                                e_data += '<td>' + value.det_b + '</td>';
                                e_data += '<td>' + value.description + '</td>';
                                e_data += '<td>' + value.amount + '</td>';
                                e_data += '<td>' + value.type + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#tran_table").append(e_data);
                    pager('tran_table');
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

