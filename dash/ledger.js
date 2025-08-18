/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var url = "https://ceemis.mglsd.go.ug:8443/api.ceemis/service/"
//var url = "https://esafeafrica.com/api.ceemis/service/";


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
    //datepicker('inv_arrival');
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
                            document.getElementById('user_name').innerHTML = value.name;
                            document.getElementById('user_name_head').innerHTML = value.name;
                            document.getElementById('user_email').innerHTML = value.email;
                            //document.getElementById('inv_lco').value = jdata.organ;
                            act_name = value.name;
                            type = value.type;
                            organs = value.organ;
                            //console.log(organs);
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
                    console.log(e);
                    ShowError("Response Error", e, getAccount);
                }
            },
            error: function (d) {
                //$("#id").html()
                console.log(d);
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
        loadled(organs);
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


function loadled(input) {
    try {
        $.ajax({
//
            url: url + "fetch/ledger/0/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#ledger_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#ledger_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.ledger;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.genid + '</td>';
                            e_data += '<td>' + value.description + '</td>';
                            e_data += '<td id="td_debt">' + value.debt + '</td>';
                            e_data += '<td id="td_credit">' + value.credit + '</td>';
                            e_data += '<td>' + value.balance + '</td>';
                            e_data += '<td>' + value.cur + '</td>';
                            //e_data += '<td>';
                            //e_data += "<a href='' id='" + value.id + "' onclick='delled(this)' ><i class = 'fa fa-trash'></i></a>";
                            //e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.ledger, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.genid + '</td>';
                                e_data += '<td>' + value.description + '</td>';
                                e_data += '<td id="td_debt">' + value.debt + '</td>';
                                e_data += '<td id="td_credit">' + value.credit + '</td>';
                                e_data += '<td>' + value.balance + '</td>';
                                e_data += '<td>' + value.cur + '</td>';
                                //e_data += '<td>';
                                //e_data += "<a href='' id='" + value.id + "' onclick='delled(this)' ><i class = 'fa fa-trash'></i></a>";
                                //e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#ledger_table").append(e_data);
                    pager('ledger_table');
                    calCredit();
                    calDebt();
                    calDef();
                } catch (e) {
                    // console.log(e);
                    // ShowError("Response Error", e, loadled);
                }
            },
            error: function (d) {
                //console.log(d);
                //$("#gallery_table").html('<tr><td colspan="5" align="center">Sorry an Expected error Occured.</td></tr>');

                //console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}



//Totals

function calCredit() {
    var TotalValue = 0;
    $("tr #td_credit").each(function (index, value) {
        currentRow = parseFloat($(this).text().replace(/,/g, ''));
        TotalValue += currentRow;
    });
    document.getElementById('tot_credit').value = parseFloat(TotalValue).toLocaleString('en');
}

function calDebt() {
    var TotalValue = 0;
    $("tr #td_debt").each(function (index, value) {
        currentRow = parseFloat($(this).text().replace(/,/g, ''));
        TotalValue += currentRow;
    });
    document.getElementById('tot_debt').value = parseFloat(TotalValue).toLocaleString('en');
}


function calDef() {
    var c = document.getElementById('tot_credit').value;
    var d = document.getElementById('tot_debt').value;
    var bal = c.replace(/,/g, '') - d.replace(/,/g, '');
    document.getElementById('tot_balance').value = parseFloat(bal).toLocaleString('en');
}