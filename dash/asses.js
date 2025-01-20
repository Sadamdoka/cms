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
        loadAsses(organ);
    } else if (input === "2") {

    } else if (input === "3") {

    } else if (input === "4") {

    } else {
        alert("Error Code");
    }
}



function loadAsses(input) {
    try {
        $.ajax({
//
            url: url + "fetch/assess/0/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#ass_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#ass_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.assessment;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + setAssesType(value.type) + '</td>';
                            e_data += '<td>' + value.asses_id + '</td>';
                            e_data += '<td>' + value.mw_id + '</td>';
                            e_data += '<td>' + value.passport + '</td>';
                            e_data += '<td>' + value.nin + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>' + value.amount + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageA(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.assessment, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + setAssesType(value.type) + '</td>';
                                e_data += '<td>' + value.asses_id + '</td>';
                                e_data += '<td>' + value.mw_id + '</td>';
                                e_data += '<td>' + value.passport + '</td>';
                                e_data += '<td>' + value.nin + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>' + value.amount + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageA(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#ass_table").append(e_data);
                    pager('ass_table');
                    //exportTable('ass_table');
                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, loadAsses);
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
                console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}

function manageA(input) {
    $('#add_model_assess').modal('show');
    let id = $(input).attr("id");
    loadAsses_single(id);
}



document.getElementById('model_delete_button').addEventListener('click', delAsses);
function delAsses(event) {
    event.preventDefault();
    let id = document.getElementById("model_item_id").value;
    let formData = new FormData();
    formData.append('id', id);
    $.ajax({
        url: url + "delete/assess",
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




function loadAsses_single(input) {
    try {
        $.ajax({
//
            url: url + "fetch/assess/" + input + "/null/",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#ass_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#ass_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.assessment;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);

                            document.getElementById('model_item_id').value = value.id;
                            document.getElementById('model_item_ass_id').value = value.asses_id;
                            document.getElementById('model_item_userid').value = value.mw_id;
                            document.getElementById('model_item_passport').value = value.passport;
                            document.getElementById('model_item_nin').value = value.nin;
                            document.getElementById('model_item_name').value = value.name;
                            document.getElementById('model_item_detail').value = value.details;
                            document.getElementById('model_item_amount').value = value.amount;
                            loadPart(value.asses_id);

                        } else {
                            $.each(data.assessment, function (index, value) {
                                //console.log(value.id);
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    //$("#ass_table").append(e_data);
                    // pager('ass_table');
                } catch (e) {
                    ShowError("Response Error", e, loadAsses_single);
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




function loadPart(input) {
    try {
        $.ajax({
//
            url: url + "fetch/part/0/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#model_item_table_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#model_item_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.particular;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.item + '</td>';
                            e_data += '<td>' + value.amount + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.particular, function (index, value) {
                                console.log(value);
                                e_data += '<tr>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.item + '</td>';
                                e_data += '<td>' + value.amount + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#model_item_table").append(e_data);
                    //pager('model_item_table');
                } catch (e) {
                    ShowError("Response Error", e, loadPart);
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

function setAssesType(input) {
    if (input === "1") {
        return "Expense Assessment";
    } else if (input === "2") {
        return "Income Assessment";
    } else {
        return "Assessment Not Defined";
    }
}


document.getElementById('ass_gen').addEventListener('click', genAss_doc);
function genAss_doc(event) {
    event.preventDefault();

    let gen_id = document.getElementById("ass_gen_id").value;

    //console.log(inv_id);

    let formData = new FormData();
    //formData.append("invid", "EI_220822_585");

    formData.append('gen_id', gen_id);
    fetch(url + "create/gen_assessment_doc",
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
        base64toPDF_Inv(obj.pdf, "Assessment");
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
