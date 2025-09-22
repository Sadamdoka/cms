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
                            // console.log(value.email);
                            // console.log(value.email);
                            // document.getElementById('pro_userid').innerHTML = value.resid;
                            // document.getElementById('user_name').innerHTML = value.name;
                            //document.getElementById('user_organ_id') = value.organ;
                            document.getElementById('user_name').innerHTML = jdata.name;
                            act_name = jdata.name;
                            //document.getElementById('user_email').innerHTML = value.email;
                            //document.getElementById('pro_email').innerHTML = value.email;
                            //document.getElementById('pro_phone').innerHTML = value.phone;
                            //document.getElementById('pro_role').innerHTML = roleSetter(value.role);
                            type = jdata.type;
                            organs = jdata.organ;
                            setType(jdata.type);

                            setAdmin_role(jdata.role);
                            loadCategory();
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




document.getElementById('model_add_button').addEventListener('click', addCategory);
function addCategory() {

    let name = document.getElementById("cat_name").value;
    let des = document.getElementById("cat_des").value;

    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", des);

    fetch(url + "create/category",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Category Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}






function loadCategory() {
    try {
        $.ajax({
//
            url: url + "fetch/category/",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#cat_table_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#cat_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        //console.log(data);
                        row += "";
                        var value = data.category;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);

                            e_data += '<tr>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.description + '</td>';
                            e_data += '<td>' + value.datereg + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageCat(this)"     type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '</tr>';

                        } else {
                            $.each(data.category, function (index, value) {
                                //console.log(value);

                                e_data += '<tr>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.description + '</td>';
                                e_data += '<td>' + value.datereg + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageCat(this)"     type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#cat_table").append(e_data);
                    paginateTable('cat_table');
                } catch (e) {
                    ShowError("Response Error", e, loadCategory);
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




function manageCat(input) {
    //loadItem();
    let id = $(input).attr("id");
    getCatDetail(id);
    $('#manage_User').modal('show');
}

document.getElementById('model_add_new').addEventListener('click', add_new);
function add_new() {
    $('#manage_User').modal('show');
}


function getCatDetail(input) {
    ///let id = $(input).attr("id");
    try {
        $.ajax({
            url: url + "fetch/category/" + input,
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
                        var jdata = data.category;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            console.log(jdata.organ);
                            document.getElementById("cat_id").value = jdata.id;
                            document.getElementById("cat_name").value = jdata.name;
                            document.getElementById("cat_des").value = jdata.description;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.category, function (index, value) {
                                alert("Error while loading user data");
                                //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                                //++i;
                            });
                        }
                    } else {
                        alert("No Data to load");
                    }
                } catch (e) {
                    ShowError("Response Error", e, getCatDetail);
                }
            },
            error: function (d) {
                //$("#id").html()
               console.log(d);
            }});
    } catch (ex) {
        ShowError("Exception", ex);
    }
}


document.getElementById('model_del_button').addEventListener('click', delCat);
function delCat() {
    let id = document.getElementById("cat_id").value;
    var formdata = new FormData();
    formdata.append("id", id);

    fetch(url + "delete/category",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Category Deleted");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


