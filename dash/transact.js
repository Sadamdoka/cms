/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var url = "http://154.72.194.17:8080/api.ceemis/service/"''
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

    datepicker('rec_date');
    datepicker('rec_due');
    datepicker('ass_date');
    datepicker('inv_date');
    datepicker('pay_date');
    datepicker('roll_date');
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
                            document.getElementById('username').value = value.name;
                            document.getElementById('pay_by').value = value.name;
                            document.getElementById('user_name_head').innerHTML = value.name;
                            document.getElementById('user_email').innerHTML = value.email;
                            type = value.type;
                            organs = value.organ;
                            act_name = value.name;
                            setRole(value.role);
                            setType(value.type);
                            //loadlco(organs);
                            loadTran(value.type, value.organ);
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
                    //$("#logs").append(e_data);
                } catch (e) {
                    console.log(e)
                    //ShowError("Response Error", e, getAccount);
                }
            },
            error: function (d) {
                //$("#id").html()
                //ShowError("Response Error");
                if (ajaxOptions === 'timeout') {
                    // ShowError("Ajax Error", "Connection TimeOut");
                } else {
                    //ShowError("Ajax Error", "Something went wrong!");
                }
            }});
    } catch (ex) {
        ShowError("Exception", ex);
    }
}


function loadTran(input, organs) {
    if (input === "1") {
        loadlco(organs);
        loadJO(organs);
        loadAccount(organs, "rec_accounts");
        loadAccount(organs, "pay_accounts");
        loadAccount(organs, "roll_accounts");
        //loadForeignOrgan();
    } else if (input === "2") {

    } else if (input === "3") {

    } else if (input === "4") {

    } else {
        alert("Error Code");
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
                    ShowError("Response Error", e, loadlco);
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




function chooseType() {
    let id = $("#rec_type :selected").attr('id');
    if (id === "1") {
        loadInvoices(organs);
    } else if (id === "2") {
        loadAssess(organs);
    } else if (id === "3") {
        //loadAssess(organs);
    } else {
        alert("Wrong Payment Type");
    }
}



//Reciepts
function loadInvoices(input) {
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
                // $("#prop_body").html('<tr><td colspan="5" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#rec_choice").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.fin_invoice;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            e_data += '<option id="' + jdata.id + '" value="' + jdata.inv_id + '" ">';
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
                    $("#rec_choice").append(e_data);
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



function loadAssess(input) {
    try {
        $.ajax({
            //
            url: url + "fetch/assess_type/2/" + input,
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
                    $("#rec_choice").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.assessment;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            e_data += '<option id="' + jdata.id + '" value="' + jdata.asses_id + '" ">';
                            e_data += jdata.asses_id + " | " + jdata.passport + " | " + jdata.name;
                            e_data += '</option>';
                        } else {
                            $.each(data.assessment, function (index, value) {
                                //console.log(value.id);
                                e_data += '<option id="' + value.id + '" value="' + value.asses_id + '" ">';
                                e_data += value.asses_id + " | " + value.passport + " | " + value.name;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#rec_choice").append(e_data);
                    searchAssess();
                } catch (e) {
                    ShowError("Response Error", e, loadAssess);
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


function selDetails() {
    var type_id = $("#rec_type :selected").attr('id');
    if (type_id === "1") {
        searchInvoices();
    } else if (type_id === "2") {
        searchAssess();
    } else if (type_id === "3") {

    } else {
        alert("Wrong Payment Type");
    }
}


function searchInvoices() {
    let id = $("#rec_choice :selected").attr('id');
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

                            document.getElementById('rec_ref').value = jdata.inv_id;
                            document.getElementById('rec_amt').value = jdata.total;
                            document.getElementById('re_from').value = jdata.fname;
                            document.getElementById('rec_tin').value = jdata.fco;
                            document.getElementById('rec_tel').value = jdata.fdetail;

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



function searchAssess() {
    let id = $("#rec_choice :selected").attr('id');
    try {
        $.ajax({
            url: url + "fetch/assess/" + id + "/null",
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
                        var jdata = data.assessment;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            //console.log(jdata);asses_id
                            document.getElementById('rec_ref').value = jdata.asses_id;
                            document.getElementById('rec_amt').value = jdata.amount;
                            document.getElementById('rec_tin').value = jdata.mw_id;
                            document.getElementById('rec_det').value = "Passport: " + jdata.passport + " NIN No. :" + jdata.nin + "";
                            document.getElementById('tel').value = jdata.fdetail;
                            document.getElementById('re_from').value = jdata.name;


                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.assessment, function (index, value) {
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
                    //ShowError("Response Error", e, searchAssess);
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

document.getElementById('create_reciept').addEventListener('click', addReciept);
function addReciept(event) {
    event.preventDefault();
    let formData = new FormData();

    let ref_no = document.getElementById("rec_ref").value;
    let ref = document.getElementById("rec_choice").value; //$("#rec_choice :selected").attr('id');
    let lco = document.getElementById("lco").value;
    let fco = document.getElementById("rec_tin").value;
    let type = document.getElementById("rec_type").value;
    let ms = document.getElementById("re_from").value;
    let tel = document.getElementById("rec_tel").value;
    let details = document.getElementById("rec_det").value;
    let sale_date = document.getElementById("rec_date").value;
    let total = document.getElementById("rec_amt").value;
    let balance = document.getElementById("rec_balance").value;
    let cheque = document.getElementById("rec_cheq").value;
    let due = document.getElementById("rec_due").value;
    let drawer = document.getElementById("rec_drawer").value;
    let currency = document.getElementById("rec_cur").value;
    let method = document.getElementById("pay_method").value;
    let prepared = document.getElementById("username").value;


    formData.append('ref_no', ref_no);
    formData.append('ref', ref);
    formData.append('lco', lco);
    formData.append('fco', fco);
    formData.append('type', type);
    formData.append('ms', ms);
    formData.append('tel', tel);
    formData.append('details', details);
    formData.append('sale_date', sale_date);
    formData.append('total', total);
    formData.append('balance', balance);
    formData.append('cheque', cheque);
    formData.append('due', due);
    formData.append('drawer', drawer);
    formData.append('currency', currency);
    formData.append('method', method);
    formData.append('prepared', prepared);

    let acc = $("#rec_accounts option:selected").attr('id');
    let det = $("#rec_accounts option:selected").text();

    fetch(url + "create/reciept",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            recieptTran(total);
            plusAccount("0", acc, total);
            addTran(lco, fco, ref + " | " + ms, details, acc, det, details, total, "Reciept");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).then(function (data) {
        const obj = JSON.parse(data);
        base64toPDF_tran(obj.pdf, "Reciept");
        console.log(data);
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}

function recieptTran(amount) {
    var type = $("#rec_type :selected").attr('id');

    var id = $("#rec_choice :selected").attr('id');
    var gen = $("#rec_choice :selected").val();
    if (type === '1') {
        minusInvoice(id, gen, amount);
        alert("Reciept Created and Invoice Subtracted");
    } else if (type === '2') {
        minusAssess(id, gen, amount);
        alert("Reciept Created and Assessment Subtracted");
    } else {
        alert("Normal Reciept Created");
    }
}
//Invoice


function loadJO(input) {
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
                // $("#prop_body").html('<tr><td colspan="5" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                //console.log(data);
                try {
                    $("#inv_foreign").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.fin_jo;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            // console.log(value.id);
                            e_data += '<option id="' + jdata.id + '" value="' + jdata.job_id + '" ">';
                            e_data += jdata.job_id + " | " + jdata.fname + " | " + jdata.qty + " | " + jdata.total;
                            e_data += '</option>';
                        } else {
                            $.each(data.fin_jo, function (index, value) {
                                // console.log(value.id);
                                e_data += '<option id="' + value.id + '" value="' + value.job_id + '" ">';
                                e_data += value.job_id + " | " + value.fname + " | " + value.qty + " | " + value.total;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#inv_foreign").append(e_data);
                    selectJo();
                } catch (e) {
                    ShowError("Response Error", e, loadJO);
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



function selectJo() {
    let id = $("#inv_foreign :selected").attr('id');
    try {
        $.ajax({
            url: url + "fetch/fin_jo/" + id + "/null/null",
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
                        var jdata = data.fin_jo;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);inv_organid
                            //console.log(jdata);inv_jo_idinv_genid
                            document.getElementById('inv_genid').value = jdata.id;
                            document.getElementById('inv_jo_id').value = jdata.job_id;
                            document.getElementById('inv_organid').value = jdata.fco;
                            document.getElementById('inv_name').value = jdata.fname;
                            document.getElementById('inv_tel').value = jdata.fdetail;
                            document.getElementById('inv_mw_no').value = jdata.qty;
                            document.getElementById('inv_cost').value = jdata.cost;
                            document.getElementById('inv_total').value = jdata.total;
                            //document.getElementById('rec_amt').value = jdata.total;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.fin_jo, function (index, value) {
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
                    ShowError("Response Error", e, selectJo);
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


function calInvTotal() {
    var amt = document.getElementById('inv_cost').value;
    var qt = document.getElementById('inv_mw_no').value;
    var qty_amt = qt * amt;
    document.getElementById('inv_total').value = qty_amt;

}


document.getElementById('inv_create').addEventListener('click', addFin_Invoice);
function addFin_Invoice(event) {
    event.preventDefault();
    let formData = new FormData();

    let genid = document.getElementById("inv_genid").value;
    let ref_no = document.getElementById("inv_ref").value;
    let jo_id = document.getElementById("inv_jo_id").value;
    let fco = document.getElementById("inv_organid").value; //$("#rec_choice :selected").attr('id');
    let fname = document.getElementById("inv_name").value;
    let fdetail = document.getElementById("inv_tel").value + " / " + document.getElementById("inv_email").value;
    let lco = document.getElementById("lco").value;
    let lname = document.getElementById("lname").value;
    let ldetail = document.getElementById("ldetail").value;
    let qty = document.getElementById("inv_mw_no").value;
    let cost = document.getElementById("inv_cost").value;
    let total = document.getElementById("inv_total").value;
    let currency = document.getElementById("inv_cur").value;



    formData.append('ref_no', ref_no);
    formData.append('jo_id', jo_id);
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

    fetch(url + "create/fin_invoice",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Invoice Created");
            minusJo(genid, jo_id, qty, total);
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


//Assessment


document.getElementById('ass_btn_search').addEventListener('click', searchMW);
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
                            document.getElementById('ass_mw_gen_id').value = jdata.id;
                            document.getElementById('ass_mw_userid').value = jdata.userid;
                            document.getElementById('ass_mw_passport').value = jdata.passport;
                            document.getElementById('ass_mw_nin').value = jdata.nin;
                            document.getElementById('ass_mw_name').value = jdata.names;
                            document.getElementById('ass_name').value = jdata.names;
                            document.getElementById('ass_mw_lco').value = jdata.lcompany;
                            document.getElementById('ass_mw_fco').value = jdata.fcompany;

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


document.getElementById('ass_add_item').addEventListener('click', addItem);
function addItem(event) {
    event.preventDefault();
    $('#add_model_item').modal('show');

}

//nvoice Cart Management
// Next id for adding a new Product
var nextId = 1;
// ID of Product currently editing
var activeId = 0;
// Add product to <table>
document.getElementById('model_add_button').addEventListener('click', productAddToTable);
function productAddToTable() {
    // First check if a <tbody> tag exists, add one if not
    // if ($("#productTable tbody").length == 0) {
    //    $("#inv_item_table").append("<tbody></tbody>");
    //}
    // Append product to table
    $("#ass_table_item tbody").append(
            productBuildTableRow(nextId, $("#model_item_name").val(), $("#model_item_cost").val()));
    // Increment next ID to use
    formClear();
    //calTotal();
    nextId += 1;
}

// Build a <table> row of Product data
function productBuildTableRow(id, name, cost) {
    var ret =
            "<tr>" +
            "<td id='td_name'>" + name + "</td>" +
            "<td id='td_cost'>" + cost + "</td>" +
            "<td>" +
            "<button type='button' " +
            "onclick='ItemDelete(this);' " +
            "class='btn btn-default' " +
            "data-id='" + id + "'>" +
            "<span class='fa fa-trash' />" +
            "</button>" +
            "</td>" +
            "</tr>";
    return ret;
}

// Delete product from <table>
function ItemDelete(ctl) {
    $(ctl).parents("tr").remove();
    calTotal();
}

// Clear form fields
function formClear() {
    $("#model_item_name").val("");
    // $("#model_item_qty").val("");
    $("#model_item_cost").val("");
}

function calTotal() {
    var TotalValue = 0;
    $("tr #td_cost").each(function (index, value) {
        currentRow = parseFloat($(this).text().replace(/,/g, ''));
        TotalValue += currentRow;
    });
    document.getElementById('ass_total').value = TotalValue;
}

document.getElementById('ass_create').addEventListener('click', addAsses);
function addAsses(event) {
    event.preventDefault();
    let formData = new FormData();

    //let type = document.getElementById("ass_type").value;
    let type = $("#ass_type :selected").attr('id');
    let lco = document.getElementById("lco").value; //$("#rec_choice :selected").attr('id');
    let fco = document.getElementById("inv_name").value;
    let mw_id = document.getElementById("ass_mw_userid").value;
    let passport = document.getElementById("ass_mw_passport").value;
    let nin = document.getElementById("ass_mw_nin").value;
    let name = document.getElementById("ass_mw_name").value;
    let details = document.getElementById("ass_name").value;
    let amount = document.getElementById("ass_total").value;
    let currency = document.getElementById("ass_cur").value;



    formData.append('type', type);
    formData.append('lco', lco);
    formData.append('fco', "fco");
    formData.append('mw_id', mw_id);
    formData.append('passport', passport);
    formData.append('nin', nin);
    formData.append('name', name);
    formData.append('details', details);
    formData.append('amount', amount);
    formData.append('currency', currency);

    fetch(url + "create/assess",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            getlastAsses();
            alert("Assessment Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function getlastAsses() {
    //let id = $("#rec_choice :selected").attr('id');
    try {
        $.ajax({
            url: url + "fetch/last_assess",
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
                        var jdata = data.assessment;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;
                            //console.log(jdata)//
                            var TableData = new Array();
                            $('#ass_table_item tr').each(function (row, tr) {
                                TableData[row] = {
                                    "ass_id": jdata.asses_id
                                    , "mw_id": jdata.mw_id
                                    , "item": $(tr).find('td:eq(0)').text()
                                    , "amount": $(tr).find('td:eq(1)').text()
                                };
                            });
                            TableData.shift();  // first row is the table header - so remove
                            TableData.forEach(function (data) {
                                //console.log(data);
                                addParticulars(data.ass_id, data.mw_id, data.item, data.amount);
                            });
                            //console.log(jdata.asses_id);
                            genAssess_doc(jdata.asses_id);
                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.assessment, function (index, value) {
                                alert("Error while loading user data");
                                //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                                //++i;
                            });
                        }
                    } else {
                        alert("No Data to load");
                    }
                    //appending data
                    //$("#logs").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, searchAssess);
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


function addParticulars(asses_id, mw_id, item, amount) {
    let formData = new FormData();
    formData.append('payid', asses_id);
    formData.append('mw_id', mw_id);
    formData.append('item', item);
    formData.append('amount', amount);
    // formData.append('Fname', fname);
    fetch(url + 'create/part',
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Particulars have been added");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });

}



function genAssess_doc(gen_id) {
    let formData = new FormData();
    formData.append('gen_id', gen_id);
    fetch(url + "create/gen_assessment_doc",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Added & Generated Successfull");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).then(function (data) {
        //console.log(data);
        const obj = JSON.parse(data);
        base64toPDF_tran(obj.pdf, "Assessment");
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });

}



function choosepayType() {
    let id = $("#pay_type :selected").attr('id');
    if (id === '4') {
        //console.log(organs);
        loadAssess_expense();
    } else {
        // alert("Wrong Payment Type");
    }
}



function loadAssess_expense() {
    try {
        $.ajax({
            //
            url: url + "fetch/assess_type/1/" + organs,
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
                    $("#pay_choice").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.assessment;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            e_data += '<option id="' + jdata.id + '" value="' + jdata.asses_id + '" ">';
                            e_data += jdata.asses_id + " | " + jdata.passport + " | " + jdata.name;
                            e_data += '</option>';
                        } else {
                            $.each(data.assessment, function (index, value) {
                                //console.log(value.id);
                                e_data += '<option id="' + value.id + '" value="' + value.asses_id + '" ">';
                                e_data += value.asses_id + " | " + value.passport + " | " + value.name;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#pay_choice").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadAssess);
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

function setPayDetails() {
    var type_id = $("#pay_type :selected").attr('id');
    if (type_id === "4") {
        searchAssess_pay();
    } else {
        //alert("Wrong Payment Type");
    }
}



function searchAssess_pay() {
    let id = $("#pay_choice :selected").attr('id');
    try {
        $.ajax({
            url: url + "fetch/assess/" + id + "/null",
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
                        var jdata = data.assessment;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            //console.log(jdata);pay_ass_id
                            document.getElementById('pay_ass_id').value = jdata.id;
                            document.getElementById('pay_ref').value = jdata.asses_id;
                            document.getElementById('pay_id').value = jdata.asses_id;
                            document.getElementById('pay_total').value = jdata.amount;
                            //document.getElementById('rec_tin').value = jdata.mw_id;
                            document.getElementById('pay_det').value = "Userid: " + jdata.mw_id + "Passport: " + jdata.passport + " NIN No. :" + jdata.nin + "Name: " + jdata.name;
                            document.getElementById('tel').value = jdata.fdetail;


                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.assessment, function (index, value) {
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
                    ShowError("Response Error", e, searchAssess);
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



document.getElementById('pay_create').addEventListener('click', addPay);
function addPay(event) {
    event.preventDefault();
    let formData = new FormData();

    let ref_no = document.getElementById("pay_ref").value;
    let type = document.getElementById("pay_type").value; //$("#rec_choice :selected").attr('id');
    let lco = document.getElementById("lco").value;
    //let fco = document.getElementById("ass_mw_userid").value;
    let payto = document.getElementById("pay_to").value;
    let details = document.getElementById("pay_tel").value;
    let reason = document.getElementById("pay_reason").value;
    let amount = document.getElementById("pay_total").value;
    let date = document.getElementById("pay_date").value;
    let authe = document.getElementById("pay_by").value;
    let currency = document.getElementById("pay_cur").value;

    formData.append('ref_no', ref_no);
    formData.append('type', type);
    formData.append('lco', lco);
    formData.append('fco', "fco");
    formData.append('payto', payto);
    formData.append('details', details);
    formData.append('reason', reason);
    formData.append('amount', amount);
    formData.append('date', date);
    formData.append('authe', authe);
    formData.append('currency', currency);


    let acc = $("#pay_accounts option:selected").attr('id');
    let det = $("#pay_accounts option:selected").text();

    fetch(url + "create/payout",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            //getlastAsses();
            payTran(amount);
            minusAccount("0", acc, amount);
            addTran(lco, lco, acc, det, payto, reason, details, amount, "Payout");
            alert("Payout/Expense Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).then(function (data) {
        const obj = JSON.parse(data);
        base64toPDF_tran(obj.pdf, "Payout");
        console.log(data);
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}




document.getElementById('roll_create').addEventListener('click', addPayroll);
function addPayroll(event) {
    event.preventDefault();
    let formData = new FormData();

    let ref_no = document.getElementById("roll_ref").value;
    let lco = document.getElementById("lco").value;
    //let fco = document.getElementById("ass_mw_userid").value;
    let name = document.getElementById("roll_name").value;
    let tel = document.getElementById("roll_tel").value;
    let month = document.getElementById("roll_month").value;
    let net = document.getElementById("roll_net").value;
    let bonus = document.getElementById("roll_bonus").value;
    let amount = document.getElementById("roll_amount").value;
    let currency = document.getElementById("roll_cur").value;


    formData.append('ref_no', ref_no);
    formData.append('lco', lco);
    formData.append('fco', "fco");
    formData.append('name', name);
    formData.append('tel', tel);
    formData.append('month', month);
    formData.append('net', net);
    formData.append('bonus', bonus);
    formData.append('amount', amount);
    //formData.append('currency', currency);


    let acc = $("#roll_accounts option:selected").attr('id');
    let det = $("#roll_accounts option:selected").text();

    fetch(url + "create/payroll",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            //getlastAsses();
            alert("Payroll Created");

            minusAccount("0", acc, amount);
            addTran(lco, lco, acc, det, name, tel, name, amount, "Payroll");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function payTran(amount) {
    var type = $("#pay_type :selected").attr('id');

    var id = $("#pay_choice :selected").attr('id');
    var gen = $("#pay_choice :selected").val();

    if (type === '4') {
        minusAssess(id, gen, amount);
        alert("Expense Created and Assessment Subtracted");
    } else {
        //alert("Normal Ex Created");
    }
}


function minusAssess(id, ass_id, amount) {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('ass_id', ass_id);
    formData.append('amount', amount);
    fetch(url + "update/minus_assess",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Done Assessment");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function minusInvoice(id, inv, total) {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('inv', inv);
    formData.append('total', total);
    fetch(url + "update/minus_fin_invoice",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Done Invoice");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function minusJo(id, jo_id, qty, total) {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('jo_id', jo_id);
    formData.append('qty', qty);
    formData.append('total', total);
    fetch(url + "update/minus_fin_jo",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Done Job Order");
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

function addTran(lco, fco, acc_a, det_a, acc_b, det_b, des, amount, type) {
    let formData = new FormData();
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
            alert("Transaction Successfull");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}

function addLegder(genid, lco, fco, description, debt, credit, balance, cur) {
    let formData = new FormData();
    formData.append('genid', genid);
    formData.append('lco', lco);
    formData.append('fco', fco);
    formData.append('description', description);
    formData.append('debt', debt);
    formData.append('credit', credit);
    formData.append('balance', balance);
    formData.append('cur', cur);

    fetch(url + "create/transaction",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Transaction Successfull");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}




function base64toPDF_tran(data, name) {
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
