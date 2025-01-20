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
                            document.getElementById('inv_lco').value = jdata.organ;
                            type = value.type;
                            act_name = value.name;
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
        loadInvoices(organs);
        loadattach(organs);
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

document.getElementById('acc_btn_search').addEventListener('click', searchMW);
function searchMW(event) {
    event.preventDefault();
    var id = document.getElementById('acc_mw_id').value;
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
                            //console.log(jdata);
                            document.getElementById('acc_mw_gen_id').value = jdata.id;
                            document.getElementById('acc_mw_userid').value = jdata.userid;
                            document.getElementById('acc_mw_passport').value = jdata.passport;
                            document.getElementById('acc_mw_nin').value = jdata.nin;
                            document.getElementById('acc_mw_name').value = jdata.names;
                            document.getElementById('acc_mw_lco').value = jdata.lcompany;
                            document.getElementById('acc_mw_fco').value = jdata.fcompany;

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
                    ShowError("Response Error", e, searchMW);
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


function loadInvoices(organ) {
    try {
        $.ajax({
            //
            url: url + "fetch/fin_invoice/0/" + organ + "/null",
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
                    $("#inv_nos").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.fin_invoice;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            e_data += '<option id="' + jdata.id + '" value="' + jdata.inv_id + '"">';
                            e_data += jdata.inv_id + " | " + jdata.fname + " | " + jdata.total;
                            e_data += '</option>';
                        } else {
                            $.each(data.fin_invoice, function (index, value) {
                                //console.log(value.id);
                                e_data += '<option id="' + value.id + '" value="' + jdata.inv_id + '"">';
                                e_data += value.inv_id + " | " + value.fname + " | " + value.total;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#inv_nos").append(e_data);
                    searchInvoices();
                } catch (e) {
                    ShowError("Response Error", e, loadInvoices);
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



function searchInvoices() {
    let id = $("#inv_nos :selected").attr('id');
    try {
        $.ajax({
            url: url + "fetch/fin_invoice/" + id + "/null/null",
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
                        var jdata = data.fin_invoice;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            //console.log(jdata);


                            document.getElementById('inv_genid').value = jdata.id;
                            document.getElementById('inv_fco_id').value = jdata.id;
                            document.getElementById('inv_fco_genid').value = jdata.fco;
                            document.getElementById('inv_fco').value = jdata.fname;
                            document.getElementById('inv_job_id').value = jdata.job_id;
                            document.getElementById('inv_id').value = jdata.inv_id;
                            document.getElementById('inv_cost').value = jdata.cost;
                            document.getElementById('inv_total').value = jdata.cost;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.fin_invoice, function (index, value) {
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
                    // ShowError("Response Error", e, searchInvoices);
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


document.getElementById('inv_add').addEventListener('click', attacHMw);
function attacHMw(event) {
    event.preventDefault();
    let formData = new FormData();

    //let type = document.getElementById("ass_type").value;
    //let inv = $("#inv_nos :selected").attr('id');
    //let inv = $("#inv_nos :selected").val();
    let jo_id = document.getElementById("inv_job_id").value;
    let inv_id = document.getElementById("inv_id").value;
    let mw_id = document.getElementById("acc_mw_userid").value; //$("#rec_choice :selected").attr('id');
    let passport = document.getElementById("acc_mw_passport").value;
    let nin = document.getElementById("acc_mw_nin").value;
    let name = document.getElementById("acc_mw_name").value;
    let arrival = document.getElementById("inv_arrival").value;
    let job = document.getElementById("inv_job").value;
    let lco = document.getElementById("inv_lco").value;
    let fco = document.getElementById("inv_fco_genid").value;
    let cost = document.getElementById("inv_cost").value;
    let remarks = document.getElementById("inv_rem").value;
    let total = document.getElementById("inv_total").value;



    formData.append('jo_id', jo_id);
    formData.append('inv_id', inv_id);
    formData.append('mw_id', mw_id);
    formData.append('passport', passport);
    formData.append('nin', nin);
    formData.append('name', name);
    formData.append('arrival', arrival);
    formData.append('job', job);
    formData.append('fco', fco);
    formData.append('lco', lco);
    formData.append('cost', cost);
    formData.append('remarks', remarks);
    formData.append('total', total);

    fetch(url + "create/attach",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Migrant Worker Attached to Invoice(Job Order)");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



function loadattach(input) {
    try {
        $.ajax({
            //
            url: url + "fetch/attach/0/null/" + input + "/null",
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
                            e_data += '<td>';
                            e_data += "<a href='' id='" + value.id + "' onclick='delattach(this)' ><i class = 'fa fa-trash'></i></a>";
                            e_data += '</td>';
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
                                e_data += '<td>';
                                e_data += "<a href='' id='" + value.id + "' onclick='delattach(this)' ><i class = 'fa fa-trash'></i></a>";
                                e_data += '</td>';
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






document.getElementById('inv_gen').addEventListener('click', genInvoice_doc);
function genInvoice_doc(event) {
    event.preventDefault();

    let inv_id = document.getElementById("inv_gen_id").value;

    //console.log(inv_id);

    let formData = new FormData();
    //formData.append("invid", "EI_220822_585");

    formData.append('invid', inv_id);
    fetch(url + "create/gen_job_invoice",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Generated Successfull");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).then(function (data) {
        //console.log(data);
        const obj = JSON.parse(data);
        base64toPDF_Inv(obj.pdf, "Invoice");
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });

}


function base64toPDF_Inv(data, name) {
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
    link.download = "esafe_" + name + ".pdf";
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