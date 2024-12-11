/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var url = "https:esafeafrica.com/api.monitoring_mglsd/service/";
//var url = "https://avienseconsults.com/api.monitoring_mglsd/service/";
//var url = "http://localhost:8080/api.esafe/service/";
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
    count();
    loadCases_Chart();
    loadCasesMgt_Chart();
    loadCasesSubMgt_Chart();
    //colorPrint();
    //console.log('Email:' + mode);
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
                            //console.log(value);
                            // document.getElementById('pro_userid').innerHTML = value.resid;
                            // document.getElementById('user_name').innerHTML = value.name;
                            //document.getElementById('pro_name').innerHTML = value.name;
                            document.getElementById('user_name').innerHTML = value.name;
                            act_name = value.name;
                            //document.getElementById('user_email').innerHTML = value.email;
                            //document.getElementById('pro_email').innerHTML = value.email;
                            //document.getElementById('pro_phone').innerHTML = value.phone;
                            //document.getElementById('pro_role').innerHTML = roleSetter(value.role);
                            //role = value.role;

                            type = value.type;
                            organ = value.organ;
                            userid = value.resid;
                            res_name = value.name;
                            act_name = value.name;
                            
                            
                            setAdmin_role(value.role);
                            roleSetter(value.role);

                            setType(value.type);
                            type = value.type;
                            //loadCases();
                            loadCaseAll_home(value.type, value.organ);
                            loadCases(type, value.resid, organ);
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



function roleSetter(input) {
    console.log(input);
    if (input === "1") {
        document.getElementById('div_admin').style.display = 'block';
    } else if (input === "2") {
        document.getElementById('div_normal').style.display = 'block';
    } else {
        return "Role Not Defined";
    }
}



function loadCaseAll_home(input, organ) {
    if (input === "1") {
//loadCasesLocal(organ);
//loadEmergenciesAgency(organ);
        loadUsers(organ);
    } else if (input === "2") {
//loadCasesLocal(organ);
//loadEmergenciesAgency(organ);
        loadUsers(organ);
    } else if (input === "3") {
// loadCases();
//loadEmergencies();
        loadUsers(organ);
    } else if (input === "4") {
//loadCases();
//loadEmergencies();
        loadUsers(organ);
    } else {
        alert("Error Code");
    }
}


function loadUsers(input) {
    try {
        $.ajax({
//
            url: url + "fetch/users/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#user_table_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#user_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        //console.log(data);
                        row += "";
                        var value = data.user;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);

                            e_data += '<tr>';
                            e_data += '<td>' + value.resid + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.phone + '</td>';
                            e_data += '<td>' + value.email + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.user, function (index, value) {
                                //console.log(value);

                                e_data += '<tr>';
                                e_data += '<td>' + value.resid + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.phone + '</td>';
                                e_data += '<td>' + value.email + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#user_table").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadUsers);
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



//loadCases_Chart(ctx);

function loadCases_Chart() {
    var ctx = document.getElementById('myChart'); //.getContext('2d');
    try {
        $.ajax({
//
            url: url + "fetch/case_ticket_cty/UG",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#bar_Chart").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
                $("#pie_Chart").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                // $("#pie_body").html("<i class = 'fa fa-spinner spin'></i> Please Wait.." + JSON.stringify(data));
                //$("#bar_body").html("<i class = 'fa fa-spinner spin'></i> Please Wait.." + JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                //console.log(data);
                try {
                    //$("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        var value = data.Case_ticket;
                        //console.log("1: "+value.length);
                        //console.log("2: "+Object.keys(value).length);
                        case_Status(value);
                        case_Category(value);
                    } else {
                        //row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#mw_case_table").append(e_data);
                    //pager('mw_case_table');

                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, loadCases);
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

function case_Category(input) {

    var occurences = input.reduce(function (r, row) {
        r[row.comp_category] = ++r[row.comp_category] || 1;
        return r;
    }, {});
    var result = Object.keys(occurences).map(function (key) {
        return {key: key, value: occurences[key]};
    });
    //console.log(result);
    //result.JSON.parse(this.responseText);
    var labels = result.map(function (e) {
        return e.key;
    });
    var data_x = result.map(function (e) {
        return e.value;
    });
    new Chart("bar_Chart", {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                    backgroundColor: colorPrint(result),
                    data: data_x
                }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Case Category"
            }
        }
    });
}


function case_Status(input) {

    var occurences = input.reduce(function (r, row) {
        r[row.case_status] = ++r[row.case_status] || 1;
        return r;
    }, {});
    var result = Object.keys(occurences).map(function (key) {
        return {key: key, value: occurences[key]};
    });
    var labels = result.map(function (e) {
        return e.key;
    });
    var data_x = result.map(function (e) {
        return e.value;
    });
    var leb = ["New Cases", "Confirmed", "Being Solved", "Government Involved", "Cleared", "Compliments"];
    new Chart("pie_chart", {
        type: "bar",
        data: {
            labels: leb,
            datasets: [{
                    backgroundColor: colorPrint(result),
                    data: data_x
                }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Case Status"
            }

        }
    });
}

function generateRandomColor(input) {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
}

function colorPrint(input) {
    const col = [];
    for (let i = 0; i < input.length; i++) {
        col.push(generateRandomColor());
    }
    return col;
}



/**
 var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
 var yValues = [55, 49, 44, 24, 15];
 var barColors = ["red", "green", "blue", "orange", "brown"];
 
 new Chart("myChart", {
 type: "bar",
 data: {
 labels: xValues,
 datasets: [{
 backgroundColor: barColors,
 data: yValues
 }]
 },
 options: {
 legend: {display: false},
 title: {
 display: true,
 text: "World Wine Production 2018"
 }
 }
 });
 * 
 * @returns {undefined}**
 */




function count() {
    countCases();
    countCases_handled(4, 'count_case_handled');
    countCases_handled(0, 'count_case_pend');
    countCases_handled(3, 'count_case_refer');
    countCandidate();
    countMW();
}

function countCases() {
    try {
        $.ajax({
//
            url: url + "counter/cases",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#mw_case_table_body").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        var value = data.count;
                        document.getElementById('count_case_total').innerHTML = value.number;
                    } else {
                        //row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#mw_case_table").append(e_data);
                    //pager('mw_case_table');

                } catch (e) {
                    //ShowError("Response Error", e, loadCases);
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



function countCases_handled(input, cout) {
    try {
        $.ajax({
//
            url: url + "counter/cases/null/null/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#mw_case_table_body").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        var value = data.count;
                        document.getElementById(cout).innerHTML = value.number;
                    } else {
                        //row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#mw_case_table").append(e_data);
                    //pager('mw_case_table');

                } catch (e) {
                    //ShowError("Response Error", e, loadCases);
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


function countMW() {
    try {
        $.ajax({
//
            url: url + "counter/mw",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#mw_case_table_body").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        var value = data.count;
                        document.getElementById('count_mw_saudi').innerHTML = parseInt(110000) + parseInt(value.number);
                    } else {
                        //row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#mw_case_table").append(e_data);
                    //pager('mw_case_table');

                } catch (e) {
                    //ShowError("Response Error", e, loadCases);
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


function countCandidate() {
    try {
        $.ajax({
//
            url: url + "counter/candidates",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#mw_case_table_body").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        var value = data.count;
                        document.getElementById('count_mw').innerHTML = parseInt(110000) + parseInt(value.number);
                    } else {
                        //row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#mw_case_table").append(e_data);
                    //pager('mw_case_table');

                } catch (e) {
                    //ShowError("Response Error", e, loadCases);
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



function loadCasesMgt_Chart() {
    //var ctx = document.getElementById('myChart'); //.getContext('2d');
    try {
        $.ajax({
//
            url: url + "fetch/case_mgt_emb/1/UG",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#user_bar_Chart").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
                //$("#pie_Chart").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                // $("#pie_body").html("<i class = 'fa fa-spinner spin'></i> Please Wait.." + JSON.stringify(data));
                //$("#bar_body").html("<i class = 'fa fa-spinner spin'></i> Please Wait.." + JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                //console.log(data);
                try {
                    //$("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        var value = data.case_mgt;
                        //console.log("1: "+value.length);
                        //console.log("2: "+Object.keys(value).length);
                        //case_Status(value);
                        case_mgt_bar(value);
                    } else {
                        //row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#mw_case_table").append(e_data);
                    //pager('mw_case_table');

                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, loadCases);
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


function case_mgt_bar(input) {

    var occurences = input.reduce(function (r, row) {
        r[row.officerId] = ++r[row.officerId] || 1;
        return r;
    }, {});
    var result = Object.keys(occurences).map(function (key) {
        return {key: key, value: occurences[key]};
    });
    //console.log(result);
    //result.JSON.parse(this.responseText);
    var labels = result.map(function (e) {
        return e.key;
    });
    var data_x = result.map(function (e) {
        return e.value;
    });
    new Chart("user_bar_Chart", {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                    backgroundColor: colorPrint(result),
                    data: data_x
                }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Cases Per Officers"
            }
        }
    });
}





function loadCasesSubMgt_Chart() {
    //var ctx = document.getElementById('myChart'); //.getContext('2d');
    try {
        $.ajax({
//
            url: url + "fetch/subcase_mgt_emb/1",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#user_sub_bar_Chart").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
                //$("#pie_Chart").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                // $("#pie_body").html("<i class = 'fa fa-spinner spin'></i> Please Wait.." + JSON.stringify(data));
                //$("#bar_body").html("<i class = 'fa fa-spinner spin'></i> Please Wait.." + JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                //console.log(data);
                try {
                    //$("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        var value = data.sub_case_mgt;
                        //console.log("1: "+value.length);
                        //console.log("2: "+Object.keys(value).length);
                        //case_Status(value);
                        case_sub_mgt_bar(value);
                    } else {
                        //row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#mw_case_table").append(e_data);
                    //pager('mw_case_table');

                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, loadCases);
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


function case_sub_mgt_bar(input) {

    var occurences = input.reduce(function (r, row) {
        r[row.officerId] = ++r[row.officerId] || 1;
        return r;
    }, {});
    var result = Object.keys(occurences).map(function (key) {
        return {key: key, value: occurences[key]};
    });
    //console.log(result);
    //result.JSON.parse(this.responseText);
    var labels = result.map(function (e) {
        return e.key;
    });
    var data_x = result.map(function (e) {
        return e.value;
    });
    new Chart("user_sub_bar_Chart", {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                    backgroundColor: colorPrint(result),
                    data: data_x
                }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Sub Cases Per Officers"
            }
        }
    });
}





function loadCases(input, userid, organs) {
    if (input === "1") {
        loadMyCases_Officer(userid);
        loadMySubCases_Officer(userid);
    } else if (input === "2") {
        loadMyCases_Officer(userid);
        loadMySubCases_Officer(userid);
    } else if (input === "3") {
        loadMyCases_Officer(userid);
        loadMySubCases_Officer(userid);
    } else if (input === "4") {
        loadCheck_ups();
    } else {
        alert("Error Code");
    }
}


function getStatus(input) {
    if (input === '0') {
        return '<span class="badge badge-danger">New Case</span>';
    } else if (input === '1' || input === '2') {
        return '<span class="badge badge-info">In-Progress</span>';
    } else if (input === '3') {
        return '<span class="badge badge-info">Refered to Us</span>';
    } else if (input === '4') {
        return '<span class="badge badge-success">Closed Case</span>';
    } else if (input === '5') {
        return '<span class="badge badge-success">Compliment</span>';
    } else {
        return '<span class="badge badge-sucess">Unclear Status</span>';
    }
}

function getCaseType(input) {
    if (input === "1") {
        return "Short Case";
    } else if (input === "2") {
        return "Detailed Case";
    } else {
        return "Error";
    }
}

//document.getElementById('all_mw').addEventListener('click', allCase);
function allCase(event) {
    event.preventDefault();
    loadCases(type, userid, organ);
}

function loadMyCases() {
    try {
        $.ajax({
//
            url: url + "fetch/case_mgt",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#case_mgt_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#case_mgt_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.case_mgt;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';

                            e_data += '<td>' + value.caseTicket + '</td>';
                            e_data += '<td>' + getCaseType(value.caseType) + '</td>';
                            e_data += '<td>' + value.caseDetails + '</td>';
                            e_data += '<td>' + value.followUp + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.case_mgt, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';

                                e_data += '<td>' + value.caseTicket + '</td>';
                                e_data += '<td>' + getCaseType(value.caseType) + '</td>';
                                e_data += '<td>' + value.caseDetails + '</td>';
                                e_data += '<td>' + value.followUp + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#case_mgt_table").append(e_data);
                    pager('case_mgt_table');
                } catch (e) {
                    ShowError("Response Error", e, loadMyCases);
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



function loadMyCases_Officer(input) {
    try {
        $.ajax({
//
            url: url + "fetch/case_mgt_officer/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#case_mgt_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#case_mgt_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.case_mgt;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                            e_data += '<td>' + value.caseTicket + '</td>';
                            e_data += '<td>' + value.caseType + '</td>';
                            e_data += '<td>' + value.caseDetails + '</td>';
                            e_data += '<td>' + value.followUp + '</td>';
                            e_data += '<td>' + value.remarks + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.case_mgt, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                                e_data += '<td>' + value.caseTicket + '</td>';
                                e_data += '<td>' + value.caseType + '</td>';
                                e_data += '<td>' + value.caseDetails + '</td>';
                                e_data += '<td>' + value.followUp + '</td>';
                                e_data += '<td>' + value.remarks + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#case_mgt_table").append(e_data);
                    pager('case_mgt_table');
                } catch (e) {
                    ShowError("Response Error", e, loadMyCases);
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


function loadMySubCases() {
    try {
        $.ajax({
//
            url: url + "fetch/subcase_mgt",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#subcase_mgt_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#subcase_mgt_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.sub_case_mgt;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageSubCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';

                            e_data += '<td>' + value.caseTicket + '</td>';
                            e_data += '<td>' + value.caseType + '</td>';
                            e_data += '<td>' + value.caseDetails + '</td>';
                            e_data += '<td>' + value.followUp + '</td>';
                            e_data += '<td>' + value.remarks + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.sub_case_mgt, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageSubCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                                e_data += '<td>' + value.caseTicket + '</td>';
                                e_data += '<td>' + value.caseType + '</td>';
                                e_data += '<td>' + value.caseDetails + '</td>';
                                e_data += '<td>' + value.followUp + '</td>';
                                e_data += '<td>' + value.remarks + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#subcase_mgt_table").append(e_data);
                    pager('subcase_mgt_table');
                } catch (e) {
                    ShowError("Response Error", e, loadMyCases);
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



function loadMySubCases_Officer(input) {
    try {
        $.ajax({
//
            url: url + "fetch/subcase_mgt_officer/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#subcase_mgt_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#subcase_mgt_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.sub_case_mgt;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageSubCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                            e_data += '<td>' + value.caseTicket + '</td>';
                                e_data += '<td>' + value.caseType + '</td>';
                            e_data += '<td>' + value.caseDetails + '</td>';
                            e_data += '<td>' + value.followUp + '</td>';
                            e_data += '<td>' + value.remarks + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.sub_case_mgt, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageSubCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                                e_data += '<td>' + value.caseTicket + '</td>';
                                e_data += '<td>' + value.caseType + '</td>';
                                e_data += '<td>' + value.caseDetails + '</td>';
                                e_data += '<td>' + value.followUp + '</td>';
                                e_data += '<td>' + value.remarks + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#subcase_mgt_table").append(e_data);
                    pager('subcase_mgt_table');
                } catch (e) {
                    ShowError("Response Error", e, loadMyCases);
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


//document.getElementById('search_mw').addEventListener('click', SearchCases);
function SearchCases(event) {
    event.preventDefault();

    var id = document.getElementById('mw_id').value;
    try {
        $.ajax({
//
            url: url + "fetch/case_mgt/0/null/" + id,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#case_mgt_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#case_mgt_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.case_mgt;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.genid + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.genid + '</td>';
                            e_data += '<td>' + value.caseTicket + '</td>';
                            e_data += '<td>' + getCaseType(value.caseType) + '</td>';
                            e_data += '<td>' + value.caseDetails + '</td>';
                            e_data += '<td>' + value.recommendation + '</td>';
                            e_data += '<td>' + value.followUp + '</td>';
                            e_data += '<td>' + value.remarks + '</td>';
                            e_data += '<td>' + getStatus(value.status) + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.case_mgt, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.genid + '" name="' + value.caseTicket + '" value="' + value.caseType + '"  onclick="manageCase(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '<td style="background-color:#0A0D71; font-size: 30px; text-align:center; color: #0A0D71">' + dayCounter(getDate_formart(value.datereg)) + ' Days </td>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.genid + '</td>';
                                e_data += '<td>' + value.caseTicket + '</td>';
                                e_data += '<td>' + getCaseType(value.caseType) + '</td>';
                                e_data += '<td>' + value.caseDetails + '</td>';
                                e_data += '<td>' + value.recommendation + '</td>';
                                e_data += '<td>' + value.followUp + '</td>';
                                e_data += '<td>' + value.remarks + '</td>';
                                e_data += '<td>' + getStatus(value.status) + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#case_mgt_table").append(e_data);
                    pager('case_mgt_table');
                } catch (e) {
                    ShowError("Response Error", e, loadMyCases);
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


function manageCase(input) {
    //loadItem();
    getCases(input);
    getCaseMgt(input);
    loadLogs(input, 'act_mw_table', 'act_mw_table_body');
    loadAttachment(input, 'model_att_table', 'model_attach_table_body');
    loadSubcaseCat(input);
    loadSubcaseCatTable(input);
    loadSubCaseOfficer_ticket(input);
    //document.getElementById('officer_div').style.visibility = "hidden";
    $('#manage_case').modal('show');

}


function manageSubCase(input) {
    console.log(input);
    //loadItem();
    getSubCases(input);
    getSubCaseMgt(input);
    loadLogs(input, 'sub_act_mw_table', 'sub_act_mw_table_body');
    loadAttachment(input, 'sub_model_att_table', 'sub_model_attach_table_body');
    $('#manage_sub_case').modal('show');
}


function getCases(input) {
    let x = $(input).attr("value");
    console.log(x);
    getCaseDet(input);
    //if (x === '1') {
    // getSubCaseShort(input);
    // } else if (x === '2') {
    // } else {
    //     alert('Case has no type');
    // }
}


function getSubCases(input) {
    let x = $(input).attr("value");
    console.log(x);
    getSubCaseDet(input);
    //if (x === '1') {
    // getSubCaseShort(input);
    // } else if (x === '2') {
    // } else {
    //     alert('Case has no type');
    // }
}


document.getElementById('model_att_button').addEventListener('click', attachDocu);
function attachDocu(event) {
    event.preventDefault();
    let caseticket = document.getElementById("model_att_id").value;
    let caseDetails = document.getElementById("model_att_det").value;
    let caseAttach = document.getElementById("model_att_file");//.value;

    addAttachment(caseticket, caseDetails, caseAttach);
}

function getCaseShort(input) {
    // let id = $(input).attr("id");

    let id = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/emergencybi/0/" + id + "/null/null/null",
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
                        var jdata = data.emergency;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            console.log(jdata.who_name);
                            document.getElementById('model_t_id').value = jdata.id;
                            document.getElementById('model_t_ticket').value = jdata.emerid;
                            document.getElementById('model_t_mwname').value = jdata.name;
                            document.getElementById('model_t_pass').value = jdata.passport;
                            document.getElementById('model_t_cat').value = jdata.topic;
                            document.getElementById('model_t_reporter').value = jdata.who_name;
                            document.getElementById('model_t_r_cont').value = jdata.who_phone;
                            //document.getElementById('model_t_cat').value = jdata.topic;
                            document.getElementById('model_t_det').value = jdata.details;
                            document.getElementById('model_t_loca').value = jdata.location;
                            //document.getElementById('model_c_id').value = jdata.emerid;
                            document.getElementById('model_c_cc').value = jdata.topic;
                            document.getElementById('model_c_det').value = jdata.details;
                            document.getElementById('model_att_id').value = jdata.emerid;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.emergency, function (index, value) {
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
                    ShowError("Response Error", e, getCaseShort);
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


function getCaseDet(input) {
    // let id = $(input).attr("id");

    let id = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/case_ticket/0/" + id + "/null",
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
                        var jdata = data.Case_ticket;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            document.getElementById('model_counter').innerHTML = dayCounter(getDate_formart(jdata.datereg)) + " Days";
                            ageColor(dayCounter(getDate_formart(jdata.datereg)));
                            if (jdata.mw_passport_no === "NA" || jdata.mw_passport_no === "Unknown") {
                                document.getElementById('model_t_mwname').value = jdata.mw_name;
                                document.getElementById('model_tmw_userid').value = jdata.mw_sys_id;
                                document.getElementById('model_t_pass').value = jdata.mw_passport_no;
                                document.getElementById('model_t_lco').value = jdata.local_agency;
                                document.getElementById('model_t_lco_con').value = jdata.local_phone;
                                document.getElementById('model_t_lco_email').value = jdata.local_email;
                                document.getElementById('model_t_fco').value = jdata.foreign_agency;
                                document.getElementById('model_t_fco_con').value = jdata.foreign_phone;
                                document.getElementById('model_t_fco_email').value = jdata.foreign_email;
                            } else {
                                getMW_Details_Case(jdata.mw_sys_id, 'model_t_mwname', 'model_t_pass', '1', 'model_t_lco', 'model_t_lco_con', 'model_t_lco_email', 'model_t_fco', 'model_t_fco_con', 'model_t_fco_email', 'model_mw_pic');

                            }
                            document.getElementById('model_t_id').value = jdata.id;
                            document.getElementById('model_t_ticket').value = jdata.case_id;
                            document.getElementById('model_tmw_userid').value = jdata.mw_sys_id;
                            document.getElementById('model_t_cat').value = jdata.comp_category;
                            document.getElementById('model_t_det').value = jdata.mw_assistance;
                            document.getElementById('model_t_loca').value = jdata.mw_loca;
                            document.getElementById('model_t_reporter').value = jdata.who_name;
                            document.getElementById('model_t_r_cont').value = jdata.who_phone;
                            //document.getElementById('model_c_id').value = jdata.case_id;
                            //document.getElementById('model_c_cc').value = jdata.comp_category;
                            // document.getElementById('model_c_det').value = jdata.mw_assistance;
                            document.getElementById('model_att_id').value = jdata.case_id;



                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.Case_ticket, function (index, value) {
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
                    //ShowError("Response Error", e, getCaseShort);
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



function getSubCaseShort(input) {
    // let id = $(input).attr("id");

    let id = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/emergencybi/0/" + id + "/null/null/null",
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
                        var jdata = data.emergency;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            document.getElementById('sub_model_t_id').value = jdata.id;
                            document.getElementById('sub_model_t_ticket').value = jdata.emerid;
                            document.getElementById('sub_model_t_mwname').value = jdata.name;
                            document.getElementById('sub_model_t_pass').value = jdata.passport;
                            document.getElementById('sub_model_t_cat').value = jdata.topic;
                            document.getElementById('sub_model_t_det').value = jdata.details;
                            document.getElementById('sub_model_t_loca').value = jdata.location;
                            //document.getElementById('model_c_id').value = jdata.emerid;
                            document.getElementById('sub_model_c_cc').value = jdata.topic;
                            document.getElementById('sub_model_c_det').value = jdata.details;
                            document.getElementById('sub_model_att_id').value = jdata.emerid;



                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.emergency, function (index, value) {
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
                    ShowError("Response Error", e, getCaseShort);
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


function getSubCaseDet(input) {
    // let id = $(input).attr("id");

    let id = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/case_ticket/0/" + id + "/null",
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
                        var jdata = data.Case_ticket;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            document.getElementById('sub_model_counter').innerHTML = dayCounter(getDate_formart(jdata.datereg)) + " Days";
                            ageColor(dayCounter(getDate_formart(jdata.datereg)));
                            document.getElementById('sub_model_t_id').value = jdata.id;
                            document.getElementById('sub_model_t_ticket').value = jdata.case_id;
                            document.getElementById('sub_model_t_cat').value = jdata.comp_category;
                            document.getElementById('sub_model_t_det').value = jdata.mw_assistance;
                            document.getElementById('sub_model_t_loca').value = jdata.mw_loca;
                            document.getElementById('sub_model_t_mwname').value = jdata.mw_name;
                            document.getElementById('sub_model_t_pass').value = jdata.mw_passport_no;
                            //document.getElementById('model_c_id').value = jdata.case_id;
                            //document.getElementById('model_c_cc').value = jdata.comp_category;
                            // document.getElementById('model_c_det').value = jdata.mw_assistance;
                            document.getElementById('sub_model_att_id').value = jdata.case_id;



                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.Case_ticket, function (index, value) {
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
                    //ShowError("Response Error", e, getCaseShort);
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



function getCaseMgt(input) {
    let id = $(input).attr("id");
    //let id = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/case_mgt/" + id + "/null/null",
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
                        var jdata = data.case_mgt;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            document.getElementById('model_m_id').value = jdata.genid;
                            document.getElementById('model_t_type').value = jdata.caseType;
                            //document.getElementById('model_c_id').value = jdata.caseTicket;
                            //document.getElementById('model_c_cc').value = jdata.topic;
                            //document.getElementById('model_c_det').value = jdata.caseDetails;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.case_mgt, function (index, value) {
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
                    //pager('logs');
                } catch (e) {
                    ShowError("Response Error", e, getCaseShort);
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


function getSubCaseMgt(input) {
    let id = $(input).attr("id");
    //let id = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/case_mgt/" + id + "/null/null",
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
                        var jdata = data.case_mgt;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;

                            // console.log(value.email);
                            document.getElementById('sub_model_m_id').value = jdata.genid;
                            document.getElementById('sub_model_t_type').value = jdata.caseType;
                            //document.getElementById('model_c_id').value = jdata.caseTicket;
                            //document.getElementById('model_c_cc').value = jdata.topic;
                            //document.getElementById('model_c_det').value = jdata.caseDetails;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.case_mgt, function (index, value) {
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
                    pager('logs');
                } catch (e) {
                    ShowError("Response Error", e, getCaseShort);
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



document.getElementById('model_c_button').addEventListener('click', manageCases);
function manageCases(event) {
    event.preventDefault();
    var x = document.getElementById("model_t_type").value;
    updateCaseMgt();
    updateCaseDet();
}


function updateCaseMgt() {
    let formData = new FormData();

    let ticket_id = document.getElementById("model_m_id").value;
    let reco = document.getElementById("model_c_reco").value;
    let remarks = document.getElementById("model_c_rema").value;
    let action = document.getElementById("model_c_action").value;
    //let dates = document.getElementById("model_c_date").value;
    let status = $("#model_c_status :selected").attr('id');
    let id = document.getElementById("model_t_id").value;
    //let followUp = document.getElementById("model_m_remark").value;
    //let remarks = document.getElementById("model_m_officer").value;

    //console.log(officer);
    formData.append('id', id);
    formData.append('genid', ticket_id);
    formData.append('recommendation', reco);
    formData.append('remarks', remarks);
    //formData.append('action', action);
    formData.append('followUp', "NA");
    formData.append('status', status);


    fetch(url + "update/case_mgt_status",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Case Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



function updateCaseShort() {
    let formData = new FormData();


    let id = document.getElementById("model_t_id").value;
    let ticket_id = document.getElementById("model_t_ticket").value;
    let reco = document.getElementById("model_c_reco").value;
    let remarks = document.getElementById("model_c_rema").value;
    let action = document.getElementById("model_c_action").value;
    let dates = document.getElementById("model_c_date").value;
    let status = $("#model_c_status :selected").attr('id');
    //let followUp = document.getElementById("model_m_remark").value;
    //let remarks = document.getElementById("model_m_officer").value;

    //console.log(officer);
    formData.append('id', id);
    //formData.append('genid', "null");
    formData.append('emerid', ticket_id);
    formData.append('details', remarks);
    formData.append('status', status);
    //formData.append('action', action);
    //formData.append('followUp', dates);
    //formData.append('status', "1");

    fetch(url + "update/emergency_status",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Case Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}




function updateCaseDet() {
    let formData = new FormData();

    let ticket_id = document.getElementById("model_t_ticket").value;
    let reco = document.getElementById("model_c_reco").value;
    let remarks = document.getElementById("model_c_rema").value;
    let action = document.getElementById("model_c_action").value;
    let dates = document.getElementById("model_c_date").value;
    let status = $("#model_c_status :selected").attr('id');
    let id = document.getElementById("model_t_id").value;
    //let followUp = document.getElementById("model_m_remark").value;
    //let remarks = document.getElementById("model_m_officer").value;

    //console.log(officer);
    formData.append('id', id);
    formData.append('case_id', ticket_id);
    formData.append('observation', remarks);
    formData.append('recommendation', reco);
    formData.append('action', action);
    formData.append('status', status);
    //formData.append('followUp', dates);
    //formData.append('status', "1");


    fetch(url + "update/case_status",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Case Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}

function ageColor(input) {
    //console.log(input);
    //document.getElementById('model_counter').style.color = 'red';
    if (parseInt(input) > 0 && parseInt(input) <= 14) {
        document.getElementById('model_counter').style.color = 'green';
        document.getElementById('sub_model_counter').style.color = 'green';
    } else if (parseInt(input) >= 15 && parseInt(input) <= 30) {
        document.getElementById('model_counter').style.color = 'orange';
        document.getElementById('sub_model_counter').style.color = 'orange';
    } else {
        document.getElementById('model_counter').style.color = 'red';
        document.getElementById('sub_model_counter').style.color = 'red';
    }
}


function setOfficerby() {
    let s = $("#model_c_status :selected").attr('id');
    if (s === "2") {
        document.getElementById('officer_div').style.display = 'block';
        //document.getElementById('officer_div').style.visibility = "visible";
        //document.getElementById('officer_div').style.display = 'show';
        loadOrganOfficers(organ);
    } else {
        document.getElementById('officer_div').style.display = 'none';
        //document.getElementById('officer_div').style.visibility = "hidden";
        //document.getElementById('officer_div').style.display = 'none';
    }
}


function loadOrganOfficers(input) {
    try {
        $.ajax({
            //
            url: url + "fetch/users/" + input,
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
                //console.log(data);
                var e_data = '';
                try {
                    $("#model_c_officer").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.user;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            e_data += '<option id="' + jdata.resid + '" ">';
                            e_data += jdata.name;
                            e_data += '</option>';
                        } else {
                            $.each(data.user, function (index, value) {
                                //console.log(value.id);
                                e_data += '<option id="' + value.resid + '"">';
                                e_data += value.name;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#model_c_officer").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadOrganOfficers);
                }
            },
            error: function (d) {
                console.log(d);
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


document.getElementById('model_c_assign').addEventListener('click', subassignOfficer);
function subassignOfficer(event) {
    event.preventDefault();
    let formData = new FormData();

    let caseticket = document.getElementById("model_t_ticket").value;
    let caseType = document.getElementById("model_t_type").value;
    let caseDetails = document.getElementById("model_t_det").value;
    let assigneeId = document.getElementById("model_c_assignid").value;
    let assignee = document.getElementById("model_c_assignee").value;
    let officerId = $("#model_c_officer :selected").attr('id');
    let officer = document.getElementById("model_c_officer").value;


    //console.log(officer);
    formData.append('caseticket', caseticket);
    formData.append('caseType', caseType);
    formData.append('caseDetails', caseDetails);
    formData.append('assigneeId', assigneeId);
    formData.append('assignee', assignee);
    formData.append('officerId', officerId);
    formData.append('officer', officer);
    formData.append('recommendation', "NA");
    formData.append('followUp', "NA");
    formData.append('remarks', "NA");
    formData.append('emb', "1");

    fetch(url + "create/subcase_mgt",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            logger(caseticket, "Instructions", officer, act_name);
            logger(officer, "Instructions", caseticket + " | " + caseDetails, act_name);
            alert("Case SubAssigment Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}





function loadSubCaseOfficer_ticket(input) {
    var name = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/subcase_mgt/0/null/" + name,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#subcase_mw_table_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                console.log(data);
                try {
                    $("#subcase_mw_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.sub_case_mgt;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.officer + '</td>';
                            e_data += '<td>' + value.officerId + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="deleteSub(this)"  type="button"  class="btn btn-primary" >Remove</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.sub_case_mgt, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.officer + '</td>';
                                e_data += '<td>' + value.officerId + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="deleteSub(this)"  type="button"  class="btn btn-primary" >Remove</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#subcase_mw_table").append(e_data);
                    pager('subcase_mw_table');
                } catch (e) {
                    ShowError("Response Error", e, loadMyCases);
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

function deleteSub(input) {
    let formData = new FormData();

    let id = $(input).attr("id");
    formData.append('id', id);
    $.ajax({
        url: url + "delete/subcase_mgt",
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



document.getElementById('model_c_subcase_btn').addEventListener('click', addsubCase_cat);
function addsubCase_cat(event) {
    event.preventDefault();
    let formData = new FormData();

    let caseticket = document.getElementById("model_t_ticket").value;
    let name = document.getElementById("mw_comp_category").value;

    //console.log(officer);
    formData.append('caseid', caseticket);
    formData.append('name', name);

    fetch(url + "create/subcat",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            logger(caseticket, "Subcategory Added", name, act_name);
            //logger(officer, "Instructions", caseticket + " | " + caseDetails);
            alert("Sub Category Added");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function deletesubCase_cat(input) {
    let formData = new FormData();

    let id = $(input).attr("id");
    formData.append('id', id);
    $.ajax({
        url: url + "delete/subcat",
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




function loadSubcaseCat(input) {
    var caseid = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/subcat/0/" + caseid,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#sub_list").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                console.log(data);
                try {
                    $("#sub_list").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.sub_case_cat;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<li style="display:inline">&bull;' + value.name + ' &nbsp;&nbsp;&nbsp;</li>';
                        } else {
                            $.each(data.sub_case_cat, function (index, value) {
                                //console.log(value.id);
                                e_data += '<li style="display:inline">&bull;' + value.name + ' &nbsp;&nbsp;&nbsp;</li>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#sub_list").append(e_data);
                    //pager('subcase_mw_table');
                } catch (e) {
                    ShowError("Response Error", e, loadSubcaseCat);
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



function loadSubcaseCatTable(input) {
    var caseid = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/subcat/0/" + caseid,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#cat_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                console.log(data);
                try {
                    $("#cat_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.sub_case_cat;
                        if (!isJsonArray(value)) {
                            // console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="deletesubCase_cat(this)"  type="button"  class="btn btn-primary" >Remove</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.sub_case_cat, function (index, value) {
                                //console.log(value.id);

                                e_data += '<tr>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="deletesubCase_cat(this)"  type="button"  class="btn btn-primary" >Remove</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#cat_table").append(e_data);
                    pager('cat_table');
                } catch (e) {
                    ShowError("Response Error", e, loadSubcaseCatTable);
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


document.getElementById('m_btn_Send').addEventListener('click', composeEmail);
function composeEmail(event) {
    event.preventDefault();

    let to = document.getElementById("m_to").value;
    let cc = 'esafealliance@gmail.com';//document.getElementById("m_cc").value;
    let bb = 'consular.helpdesk@ugandaembassyriyadh.com';//document.getElementById("m_bb").value;
    let sub = document.getElementById("m_sub").value;
    let body = document.getElementById("m_txt_bd").value;

    sendCompose(to, cc, bb, sub, body);

}




document.getElementById('model_comment_btn').addEventListener('click', commentCase);
function commentCase(event) {
    event.preventDefault();
    let formData = new FormData();

    let caseticket = document.getElementById("model_t_ticket").value;
    let com = document.getElementById("model_comment").value;
    let ctype = $("#model_comment_type :selected").attr('id');

    //console.log(officer);
    formData.append('ref', caseticket);
    formData.append('name', "Case Comment");
    formData.append('det', com);
    formData.append('by', act_name);
    formData.append('status', ctype);

    fetch(url + "create/logger",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Comment Update Added");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



document.getElementById('sub_model_c_button').addEventListener('click', SubcommentCase);
function SubcommentCase(event) {
    event.preventDefault();
    let formData = new FormData();

    let caseticket = document.getElementById("sub_model_t_ticket").value;
    let com = document.getElementById("model_comment").value;
    let ctype = $("#sub_model_comment_type :selected").attr('id');

    //console.log(officer);
    formData.append('ref', caseticket);
    formData.append('name', "Case Comment");
    formData.append('det', com);
    formData.append('by', act_name);
    formData.append('status', ctype);

    fetch(url + "create/logger",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Comment Update Added");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}
