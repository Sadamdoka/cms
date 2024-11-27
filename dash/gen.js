/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var url = "https:esafeafrica.com/api.monitoring_mglsd/service/";
//var url = "http://localhost:8080/api.esafe/service/";
var user = '';
var role = '';
$(document).ready(function () {
//getting email in url
    /*
     var queryString = decodeURIComponent(window.location.search);
     queryString = queryString.substring(1);
     var queries = queryString.split("&");
     for (var i = 0; i < queries.length; i++)
     {
     // user = queries[i];
     }
     user = queryString.substring(0, queryString.length);
     idle_timeout();
     document.addEventListener('contextmenu', event => event.preventDefault());
     */

// init();
//
//getUser(user);
//getAccount(user);
    /*
     navLink(document.getElementById('nav_home'));
     navLink(document.getElementById('nav_case_my'));
     navLink(document.getElementById('nav_acc'));
     navLink(document.getElementById('nav_case_s'));
     navLink(document.getElementById('nav_mw_app'));
     navLink(document.getElementById('nav_mw_check'));
     navLink(document.getElementById('nav_mw_medical'));
     navLink(document.getElementById('nav_mw_map'));
     navLink(document.getElementById('nav_mw_follow'));
     navLink(document.getElementById('nav_mw_asses'));
     navLink(document.getElementById('nav_mw_tran'));
     navLink(document.getElementById('nav_mw_report'));
     navLink(document.getElementById('nav_mw_inv'));
     navLink(document.getElementById('nav_mw_status'));
     */
    document.addEventListener('contextmenu', event => event.preventDefault());
});
function sessionEmpty(input) {
    if (input === null) {
        // ...
        //console.log("No Session Logged In");
        window.location.href = 'index.html';
        //location.location.href = 'index.html';
        //Alert("");
    }
}

function navLink(input) {
    var usr = '?' + user;
    input.href += input;
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
                            var value = jdata;
                            console.log(value.email);
                            console.log(value.role);
                            setRole(value.role);
                            setType(value.type);
                            //role = value.role;
                            //console.log(value.name);
                            //alert(value.role);
                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.Users, function (index, value) {
                                alert("Error while loading user data(Gen_Acc)");
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

function setType(input) {
    if (input === '2') {
        document.getElementById('nav_order').style.display = 'block';
    } else {
//document.getElementById('nav_order').style.visibility = 'hidden';
    }
}

function setAdmin_role(input) {
    if (input === '2') {
        //document.getElementById('gen_case').style.display = 'none';
        document.getElementById('gen_co').style.display = 'none';
        //document.getElementById('nav_man').style.display = 'none';
    }
}

// Set timeout variables.
var timoutWarning = 840000; // Display warning in 14 Mins.
var timoutNow = 60000; // Warning has been shown, give the user 1 minute to interact
var logoutUrl = 'index.html'; // URL to logout page.

var warningTimer;
var timeoutTimer;
// Start warning timer.
function StartWarningTimer() {
    warningTimer = setTimeout("IdleWarning()", timoutWarning);
}

// Reset timers.
function ResetTimeOutTimer() {
    clearTimeout(timeoutTimer);
    StartWarningTimer();
    $("#timeout").dialog('close');
}

// Show idle timeout warning dialog.
function IdleWarning() {
    clearTimeout(warningTimer);
    timeoutTimer = setTimeout("IdleTimeout()", timoutNow);
    $("#timeout").dialog({
        modal: true
    });
    // Add code in the #timeout element to call ResetTimeOutTimer() if
    // the "Stay Logged In" button is clicked
}

// Logout the user.
function IdleTimeout() {
    window.location = logoutUrl;
}

function setSearch(input) {
    $(input).selectpicker();
}

//Printing Tables
function printTable(input) {
    var divToPrint = document.getElementById(input);
    var htmlToPrint = '' +
            '<style type="text/css">' +
            'table th, table td {' +
            'border:0.5px solid #000;' +
            'padding:0.5em;' +
            '}' +
            '</style>';
    htmlToPrint += divToPrint.outerHTML;
    newWin = window.open("");
    newWin.document.write(htmlToPrint);
    newWin.print();
    newWin.close();
}

function exportTable(tableId) {
    let tableData = document.getElementById(tableId).outerHTML;
    tableData = tableData.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
    tableData = tableData.replace(/<input[^>]*>|<\/input>/gi, ""); //remove input params
    tableData = tableData + '<br /><br />Genereated from Esafe Portal<br />';

    let a = document.createElement('a');
    a.href = `data:application/vnd.ms-excel, ${encodeURIComponent(tableData)}`;
    a.download = 'downloaded_file_' + getRandomNumbers() + '.xls';
    a.click();

}

function exportToExcel(input) {
    $('#' + input).tableHTMLExport({
        type: 'csv',
        filename: 'excel_export.csv'
    });
}
function getRandomNumbers() {
    let dateObj = new Date()
    let dateTime = `${dateObj.getHours()}${dateObj.getMinutes()}${dateObj.getSeconds()}`

    return `${dateTime}${Math.floor((Math.random().toFixed(2) * 100))}`
}

function pager(input) {
    $('#' + input).DataTable({
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        autoWidth: false,
        scrollY: true,
        scrollX: true,
        responsive: false,
        ordering: true,
        info: true,
        bDestroy: true,
        destroy: true
    });
}

function idle_timeout() {
    const idleDurationSecs = 60; // X number of seconds
    const redirectUrl = 'index.html'; // Redirect idle users to this URL
    let idleTimeout; // variable to hold the timeout, do not modify

    const resetIdleTimeout = function () {

        // Clears the existing timeout
        if (idleTimeout)
            clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => location.href = redirectUrl, idleDurationSecs * 10000);
    };
    // Init on page load
    resetIdleTimeout();
    // Reset the idle timeout on any of the events listed below
    ['click', 'touchstart', 'mousemove'].forEach(evt =>
        document.addEventListener(evt, resetIdleTimeout, false)
    );
}

function disableRight() {
//edit this message to say what you want

    var message = "Function Disabled!";
///////////////////////////////////
    function clickIE4() {
        if (event.button === 2) {
            alert(message);
            return false;
        }
    }

    function clickNS4(e) {
        if (document.layers || document.getElementById && !document.all) {
            if (e.which === 2 || e.which === 3) {
                alert(message);
                return false;
            }
        }
    }

    if (document.layers) {
        document.captureEvents(Event.MOUSEDOWN);
        document.onmousedown = clickNS4;
    } else if (document.all && !document.getElementById) {
        document.onmousedown = clickIE4;
    }

    document.oncontextmenu = new Function("alert(message);return false");
}

function touchHandler(event)
{
    var touches = event.changedTouches,
            first = touches[0],
            type = "";
    switch (event.type)
    {
        case "touchstart":
            type = "mousedown";
            break;
        case "touchmove":
            type = "mousemove";
            break;
        case "touchend":
            type = "mouseup";
            break;
        default:
            return;
    }

// initMouseEvent(type, canBubble, cancelable, view, clickCount, 
//                screenX, screenY, clientX, clientY, ctrlKey, 
//                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
            first.screenX, first.screenY,
            first.clientX, first.clientY, false,
            false, false, false, 0/*left*/, null);
    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function init()
{
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}

function datepicker(input) {
    $('#' + input).pickadate();
}



function getDate_formart(input) {
    var date = new Date(input).toISOString().slice(0, 10);
    //var date = input.getHours() + ":" + input.getMinutes() + ", " + input.toDateString();
    return date;
}

function dayCounter(input) {
    let today = new Date().toISOString().slice(0, 10);
    const endDate = today;
    const diffInMs = new Date(endDate) - new Date(input);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays;
}




function addAttachment(ref, det, item) {
    let formData = new FormData();
    formData.append('ref', ref);
    formData.append('det', det);
    formData.append('item', item.files[0]);
    fetch(url + "create/file",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Attachment Uploaded");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}

function openImage(data) {
    //var name = $(data).attr("name");
    var value = $(data).attr("value");

    console.log(name + " | " + value);
    var image = new Image();
    image.src = "data:image/jpg;base64," + value;
    var w = window.open("");
    w.document.write(image.outerHTML);
}
function getMimeType(base64String) {
    const match = base64String.match(/^data:(.*?);base64,/);
    return match ? match[1] : null;
}

function openFile(data) {
    var value = $(data).attr("value");
    console.log(getMimeType(data));
    var mimeType = getMimeType(data); // Assume `type` attribute is added to specify content type

    console.log("Content Type: " + mimeType + " | Value: " + value);

    if (!value || !mimeType) {
        console.error("Invalid file data or type");
        return;
    }

    var w = window.open("");
    if (!w) {
        console.error("Failed to open a new window");
        return;
    }

    if (mimeType.startsWith("image/")) {
        // Handle image
        var image = new Image();
        image.src = `data:${mimeType};base64,${value}`;
        w.document.write(image.outerHTML);
    } else if (mimeType === "application/pdf") {
        // Handle PDF
        w.document.write(
                `<iframe src="data:${mimeType};base64,${value}" width="100%" height="100%" style="border:none;"></iframe>`
                );
    } else if (mimeType.startsWith("video/")) {
        // Handle video
        w.document.write(
                `<video controls style="max-width:100%; max-height:100%;">` +
                `<source src="data:${mimeType};base64,${value}" type="${mimeType}">` +
                `Your browser does not support the video tag.` +
                `</video>`
                );
    } else {
        console.error("Unsupported file type");
        w.document.write("<p>Unsupported file type</p>");
    }
}



function loadAttachment(input, tbl, tbbody) {

    //console.log("Attachments");
    var name = $(input).attr("name");

    try {
        $.ajax({
//
            url: url + "fetch/file/0/" + name,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#" + tbbody).html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#" + tbbody).empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        //console.log(data);
                        row += "";
                        var value = data.files;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);

                            e_data += '<tr>';
                            e_data += '<td>' + value.ref + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.ref + '" onclick="openImage(this)" value = "' + value.item + '"  type = "button"  class = "btn btn-info" > View File </button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.datereg + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.files, function (index, value) {
                                //console.log(value);

                                e_data += '<tr>';
                                e_data += '<td>' + value.ref + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.ref + '" onclick="openImage(this)" value = "' + value.item + '"  type="button"  class="btn btn-info" >View File</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.datereg + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#" + tbl).append(e_data);

                    pager(tbl);
                } catch (e) {
                    ShowError("Response Error", e, loadAttachment);
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


function loadLogs(input, tbl, tbbody) {
    //console.log("Logs");
    var name = $(input).attr("name");
    try {
        $.ajax({
            url: url + "fetch/log/0/" + name + "/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#" + tbbody).html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#" + tbbody).empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        console.log(data);
                        populateTimeline(logData);
                        //populateTimeline(data);
                        row += "";
                        var value = data.log;
                        if (!isJsonArray(value)) {
                            //console.log(value.id); 

                            e_data += '<tr>';
                            e_data += '<td>' + value.ref + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>' + value.act_by + '</td>';
                            e_data += '<td>' + value.datereg + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.log, function (index, value) {
                                //console.log(value);

                                e_data += '<tr>';
                                e_data += '<td>' + value.ref + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>' + value.act_by + '</td>';
                                e_data += '<td>' + value.datereg + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#" + tbl).append(e_data);
                    pager(tbl);
                } catch (e) {
                    ShowError("Response Error", e, loadLogs);
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

function loadLogsTimelime(input, elm) {
    var name = $(input).attr("name");
    console.log(name);
    try {
        $.ajax({
            url: url + "fetch/log/0/" + name + "/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#" + elm).html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#" + elm).empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        console.log(data);
                        loadTimeline(elm, data);

                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    //$("#" + tbl).append(e_data);
                    //pager(tbl);
                } catch (e) {
                    console.log(e);
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

// Function to populate timeline
// Function to populate timeline with JSON object array
function loadTimeline(elm, logData) {
    const timeline = document.getElementById(elm);  // Ensure elm is passed and used to select the container

    // Check if logData has a 'log' key
    if (!logData || !logData.log || !Array.isArray(logData.log)) {
        console.error("Invalid log data structure");
        return;
    }

    logData.log.forEach(entry => {
        // Create timeline event container
        const timelineEvent = document.createElement("li");
        timelineEvent.classList.add("timeline-event");

        // Create date element (ensure entry.datereg exists)
        const timelineDate = document.createElement("div");
        timelineDate.classList.add("timeline-date");
        timelineDate.textContent = entry.datereg || "No date available";  // Fallback if no date

        // Create dot
        const timelineDot = document.createElement("div");
        timelineDot.classList.add("timeline-dot");

        // Create event content
        const timelineContent = document.createElement("div");
        timelineContent.classList.add("timeline-event-content");

        // Safely insert content by checking if the properties exist
        const name = entry.name ? escapeHTML(entry.name) : "Unknown Name";
        const id = entry.id ? escapeHTML(entry.id) : "No ID";
        const status = entry.status ? escapeHTML(entry.status) : "No Status";
        const actedBy = entry.act_by ? escapeHTML(entry.act_by) : "No actor";
        const ref = entry.ref ? escapeHTML(entry.ref) : "No reference";
        const details = entry.details ? escapeHTML(entry.details) : "No details";

        timelineContent.innerHTML = `
            <strong>${name}</strong><br>
            <span class="event-snippet">Reference: ${ref}</span><br>
            <span class="event-snippet">Action: ${details}</span>
            <span class="event-snippet">Acted by: ${actedBy}</span><br>
        `;

        // Append elements to the timeline event
        timelineEvent.appendChild(timelineDate);
        timelineEvent.appendChild(timelineDot);
        timelineEvent.appendChild(timelineContent);

        // Append the event to the timeline container
        timeline.appendChild(timelineEvent);
    });
}

// Helper function to escape HTML characters to prevent XSS
function escapeHTML(str) {
    return str.replace(/[&<>"'`=\/]/g, (match) => {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
            '`': '&#096;',
            '=': '&#61;',
            '/': '&#47;'
        };
        return escapeMap[match];
    });
}


function loadLogDiv(input, elm) {
    //console.log("Logs");
    //var id = $(input).attr("id");
    let name = $(input).attr("name");

    try {
        $.ajax({
            url: url + "fetch/log/0/" + name + "/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $('#' + elm).html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $('#' + elm).empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        console.log(data);
                        row += "";
                        var value = data.log;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);    

                            e_data += '<div class="d-flex justify-content-between">'
                                    + ' <p class="small mb-1">Initiated By: ' + value.act_by + '</p>'
                                    + '<p class="small mb-1 text-muted">' + getDate_formart(value.datereg) + '</p>'
                                    + ' </div>'
                                    + '<div class="d-flex flex-row justify-content-start mb-4">'
                                    + ' <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(116,118,244,.2);">'
                                    + '    <p class="small mb-0">Ref ID: ' + value.ref + '<br>Activity Name: ' + value.name + ' ,<br>Details: ' + value.details + '</p>'
                                    + ' </div>'
                                    + '</div>';


                        } else {
                            $.each(data.log, function (index, value) {
                                //console.log(value);
                                e_data += '<div class="d-flex justify-content-between">'
                                        + ' <p class="small mb-1">Initiated By: ' + value.act_by + '</p>'
                                        + '<p class="small mb-1 text-muted">' + getDate_formart(value.datereg) + '</p>'
                                        + ' </div>'
                                        + '<div class="d-flex flex-row justify-content-start mb-4">'
                                        + ' <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(116,118,244,.2);">'
                                        + '    <p class="small mb-0">Ref ID: ' + value.ref + '<br>Activity Name: ' + value.name + ' ,<br>Details: ' + value.details + '</p>'
                                        + ' </div>'
                                        + '</div>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $('#' + elm).append(e_data);
                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, loadLogs);
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



function candidatPhoto(input, pic) {
    try {
        $.ajax({
            url: url + "fetch/candidate_nin/" + input,
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
                        var jdata = data.candidate;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;
                            //console.log(jdata);
                            // console.log(jdata.candidate_frontphoto);
                            getURL(jdata.candidate_photo, jdata.lcompany, pic);

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.candidate, function (index, value) {
                                //alert("Error while loading user data(Photo)");
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
                    ShowError("Response Error", e, candidatPhoto);
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

function getURL(img, organ, pic) {
    let url; // "http://stuffing.esafeafrica.com/yodlesuite/uploads/candidates/" + img;
    if (organ === 'Og251121_650') {
        url = "http://stuffing.esafeafrica.com/yodlesuite/uploads/candidates/" + img;
        console.log(url);
        console.log(pic);
        $('#' + pic).attr("src", url);
    } else if (organ === 'Og251121_890') {
        url = "http://ez.esafeafrica.com/yodlesuite/uploads/candidates/" + img;
        //console.log(url);
        $('#' + pic).attr("src", url);
    } else if (organ === 'Og40822_415') {
        url = "http://derm.esafeafrica.com/yodlesuite/uploads/candidates/" + img;
        //console.log(url);
        $('#' + pic).attr("src", url);
    } else if (organ === 'Og240222_50') {
        url = "http://mafaz.esafeafrica.com/yodlesuite/uploads/candidates/" + img;
        //console.log(url);
        $('#' + pic).attr("src", url);
    } else {
    }
//console.log(img);
    let code = document.getElementById("ec_company").value + img; //"http://stuffing.esafeafrica.com/yodlesuite/uploads/candidates/" + img;
    console.log(code);
}






function logger(ref, nam, det, by, status) {
    let formData = new FormData();


    //console.log(officer);
    formData.append('ref', ref);
    formData.append('name', nam);
    formData.append('det', det);
    formData.append('by', by);
    formData.append('status', status);

    fetch(url + "create/logger",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            //alert("Case Logger Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function gotoPdfView(input) {
    console.log(input);
    let pdf = $(input).attr("value");
    sessionStorage.setItem('pdf', pdf);
    //var queryString = "?" + email;
    window.open('../pdf/pdf_view.html', '_blank');
}



function base64ToArrayBuffer_file(data) {
    var bString = window.atob(data);
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
        var ascii = bString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

function base64toPDF_file(input) {
    let pdf = $(input).attr("value");
    //let name = $(input).attr("name");

    var bufferArray = base64ToArrayBuffer_file(pdf);
    var blobStore = new Blob([bufferArray], {type: "application/pdf"});
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobStore);
        return;
    }

    var data = window.URL.createObjectURL(blobStore);
    var link = document.createElement('a');
    document.body.appendChild(link);
    link.href = data;
    link.download = "embassy_es.pdf";
    //link.open = "lemax_file.pdf";
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
}




function valForm(x, msg) {
    //let x = document.getElementById(input).value;
    if (!x) {
        alert(msg);
        return false;
    }
}


function valNumber(x, msg) {
    //event.preventDefault();
    //let x = document.getElementById(input).value;
    if (isNaN(x)) {
        alert(msg);
        return false;
    }
}

function valEmail(x, msg) {
    //let x = document.getElementById(input).value;
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!x.match(mailformat)) {
        alert(msg);
        return false;
    }
}

function valTel(x, msg) {
    var telFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (x.match(telFormat)) {
        alert(msg);
        return false;
    }
}

function valImg(x, msg) {
    if (!x.files.length) {
        alert(msg);
        return false;
    }
}


function valEmail_x(elm) {
    //let x = document.getElementById(input).value;
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    document.querySelector('[id="' + elm + '"]').addEventListener("keyup", function (ev) {
        if (mailformat.test(document.querySelector('[id="' + elm + '"]').value) === false)
            return this.style.backgroundColor = "#FF5733";
        this.style.backgroundColor = "#fff";
    });
}


function valTel_x(elm) {
    var format_1 = /^[+]{1}[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{3}$/;
    var format_2 = /^[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{3}$/;
    var format_3 = /^[0-9]{4}[0-9]{3}[0-9]{3}$/;
    document.querySelector('[id="' + elm + '"]').addEventListener("keyup", function (ev) {
        if (format_3.test(document.querySelector('[id="' + elm + '"]').value) === false)
            return this.style.backgroundColor = "#FF5733";
        this.style.backgroundColor = "#fff";
    });
}

function valMail_x(x, msg) {
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!x.match(mailformat)) {
        alert(msg);
        return false;
    }
}

function valPhone_x(x, msg) {
    var format_1 = /^[+]{1}[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{3}$/;
    var format_2 = /^[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{3}$/;
    var format_3 = /^[0-9]{4}[0-9]{3}[0-9]{3}$/;
    if (!x.match(format_3)) {
        alert(msg);
        return false;
    }
}



function sendCompose(to, cc, bb, sub, body) {
    var formdata = new FormData();
    formdata.append("to", to);
    formdata.append("cc", cc);
    formdata.append("bb", bb);
    formdata.append("sub", sub);
    formdata.append("body", body);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };


    fetch(url + "create/send_email", requestOptions)
            .then(function (response) {
                //console.log('Response: ' + response.text);
                return response.text();
            }).then(function (data) {
        const obj = JSON.parse(data);
        // console.log(obj);
        if (obj.status === true) {
            alert("Email Sent");
        } else {

            alert("Email Not Sent");
        }
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function getMW_Details_Case(val, el_name, el_pass, status, lco1, lco2, lco3, fco1, fco2, fco3, pic) {
    try {
        $.ajax({
            url: url + "fetch/workers/" + val,
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

                            document.getElementById(pic).src = "data:image/png;base64," + jdata.pic;
                            document.getElementById(el_name).value = jdata.names;
                            document.getElementById(el_pass).value = jdata.passport;
                            if (status === '1') {
                                getMW_Organs(jdata.lcompany, lco1, lco2, lco3);
                                getMW_Organs(jdata.fcompany, fco1, fco2, fco3);
                            }
                            //document.getElementById(el_lco).value = jdata.phone;
                            //document.getElementById(el_lco).value = jdata.phone;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            $.each(data.user_worker, function (index, value) {
                                alert("Error while loading MW data");
                                //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                                //++i;
                            });
                        }
                    } else {
                        //console.log("Your Not Registered With US");
                        alert("NO INFORMATION");
                    }
                    //appending data
                    //$("#logs").append(e_data);
                } catch (e) {
                    console.log(e);
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


function getMW_Organs(input, elem1, elem2, elem3) {
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
                try {
                    //$("#" + elem).empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.organ;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            document.getElementById(elem1).value = jdata.names;
                            document.getElementById(elem2).value = jdata.phone;
                            document.getElementById(elem3).value = jdata.email;

                        } else {
                            $.each(data.organ, function (index, value) {
                                //console.log(value.id);
                                alert("Error while loading user data");

                                // ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#" + elem).append(opt);
                    //$("#" + elem).append(e_data);
                    //console.log(e_data);
                    //setSearch(elem);
                } catch (e) {
                    ShowError("Response Error", e, getMW_Organs);
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

function uniqueid() {
    // always start with a letter (for DOM friendlyness)
    var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
        var ascicode = Math.floor((Math.random() * 42) + 48);
        if (ascicode < 58 || ascicode > 64) {
            // exclude all chars between : (58) and @ (64)
            idstr += String.fromCharCode(ascicode);
        }
    } while (idstr.length < 10);

    return (idstr);
}


function getCtyCode(id) {
    if (id === "1") {
        return "SA";
    } else if (id === "2") {
        return "OM";
    } else if (id === "3") {
        return "UAE";
    } else if (id === "4") {
        return "QA";
    } else if (id === "5") {
        return "BH";
    } else if (id === "6") {
        return "YEM";
    } else if (id === "7") {
        return "EG";
    } else if (id === "8") {
        return "UG";
    } else if (id === "9") {
        return "KE";
    } else if (id === "10") {
        return "BU";
    } else if (id === "11") {
        return "JO";
    } else if (id === "12") {
        return "TR";
    } else if (id === "13") {
        return "SD";
    } else if (id === "14") {
        return "LB";
    } else if (id === "15") {
        return "LY";
    } else if (id === "16") {
        return "IR";
    } else if (id === "17") {
        return "UG";
    } else if (id === "18") {
        return "IN";
    } else if (id === "19") {
        return "TZ";
    } else if (id === "20") {
        return "ET";
    } else if (id === "21") {
        return "SL";
    }
}


const countryMap = {
    "AF": "Afghanistan",
    "AL": "Albania",
    "DZ": "Algeria",
    "AD": "Andorra",
    "AO": "Angola",
    "AG": "Antigua and Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BT": "Bhutan",
    "BO": "Bolivia",
    "BA": "Bosnia and Herzegovina",
    "BW": "Botswana",
    "BR": "Brazil",
    "BN": "Brunei",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "CV": "Cape Verde",
    "CF": "Central African Republic",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CO": "Colombia",
    "KM": "Comoros",
    "CG": "Congo (Congo-Brazzaville)",
    "CD": "Congo (DRC)",
    "CR": "Costa Rica",
    "HR": "Croatia",
    "CU": "Cuba",
    "CY": "Cyprus",
    "CZ": "Czechia (Czech Republic)",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "SZ": "Eswatini (Swaziland)",
    "ET": "Ethiopia",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GR": "Greece",
    "GD": "Grenada",
    "GT": "Guatemala",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HN": "Honduras",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Laos",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "MX": "Mexico",
    "FM": "Micronesia",
    "MD": "Moldova",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar (Burma)",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "KP": "North Korea",
    "MK": "North Macedonia",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestine",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PL": "Poland",
    "PT": "Portugal",
    "QA": "Qatar",
    "RO": "Romania",
    "RU": "Russia",
    "RW": "Rwanda",
    "KN": "Saint Kitts and Nevis",
    "LC": "Saint Lucia",
    "VC": "Saint Vincent and the Grenadines",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "Sao Tome and Principe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "KR": "South Korea",
    "SS": "South Sudan",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Suriname",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syria",
    "TJ": "Tajikistan",
    "TZ": "Tanzania",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TO": "Tonga",
    "TT": "Trinidad and Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "US": "United States",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VA": "Vatican City",
    "VE": "Venezuela",
    "VN": "Vietnam",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
};


// Populate the dropdown
function populateCountrySelect(elm) {
    const select = document.getElementById(elm);

    for (const isoCode in countryMap) {
        const option = document.createElement("option");
        option.id = isoCode; // Set ISO 2 code as the ID
        option.value = isoCode; // ISO 2 country code
        option.textContent = countryMap[isoCode]; // Full country name
        select.appendChild(option);
    }
}




// Sample JSON data
const logData = [
    {
        "datereg": "2024-11-20 05:27:22.0",
        "id": "107",
        "status": "0",
        "act_by": "System",
        "details": "Document Attached",
        "name": "Attachment",
        "ref": "MGLSD3292942"
    },
    {
        "datereg": "2024-11-20 05:02:12.0",
        "id": "106",
        "status": "0",
        "act_by": "System",
        "details": "Login Action",
        "name": "User Login",
        "ref": "test@user.com"
    }, {},
    {
        "datereg": "2024-10-31 14:48:08.0",
        "id": "104",
        "status": "0",
        "act_by": "System",
        "details": "Login Action",
        "name": "User Login",
        "ref": "test@user.com"
    },
    {
        "datereg": "2024-10-24 12:08:52.0",
        "id": "103",
        "status": "0",
        "act_by": "System",
        "details": "8HPQ+M3P, Acacia Avenue, Kampala, Uganda,Kampala,8HPQ+M3P",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-10-24 12:02:59.0",
        "id": "102",
        "status": "0",
        "act_by": "System",
        "details": "8HPQ+M3P, Acacia Avenue, Kampala, Uganda,Kampala,8HPQ+M3P",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-10-24 12:02:17.0",
        "id": "101",
        "status": "0",
        "act_by": "System",
        "details": "8a Kawalya Kaggwa Cl, Kampala, Uganda,Kampala,8a",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-10-24 12:01:33.0",
        "id": "100",
        "status": "0",
        "act_by": "System",
        "details": "9a Kawalya Kaggwa Cl, Kampala, Uganda,Kampala,9a",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-10-24 11:59:46.0",
        "id": "99",
        "status": "0",
        "act_by": "System",
        "details": "8HPQ+M3P, Acacia Avenue, Kampala, Uganda,Kampala,8HPQ+M3P",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-10-24 11:59:16.0",
        "id": "98",
        "status": "0",
        "act_by": "System",
        "details": "8HPQ+M2J, John Babiha (Acacia) Ave, Kampala, Uganda,Kampala,8HPQ+M2J",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-10-24 11:59:16.0",
        "id": "97",
        "status": "0",
        "act_by": "System",
        "details": "8HPQ+M2J, John Babiha (Acacia) Ave, Kampala, Uganda,Kampala,8HPQ+M2J",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-10-24 11:59:11.0",
        "id": "96",
        "status": "0",
        "act_by": "System",
        "details": "Esafe Login",
        "name": "Login",
        "ref": "AX3000"
    },
    {
        "datereg": "2024-10-24 11:42:45.0",
        "id": "95",
        "status": "0",
        "act_by": "System",
        "details": "Login Action",
        "name": "User Login",
        "ref": "test@user.com"
    },
    {
        "datereg": "2024-10-10 12:35:27.0",
        "id": "94",
        "status": "0",
        "act_by": "System",
        "details": "Login Action",
        "name": "User Login",
        "ref": "test@user.com"
    },
    {
        "datereg": "2024-10-07 14:20:05.0",
        "id": "93",
        "status": "0",
        "act_by": "System",
        "details": "7JW6+V8W, Kampala, Uganda,Kampala,7JW6+V8W",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-10-07 14:20:04.0",
        "id": "92",
        "status": "0",
        "act_by": "System",
        "details": "7JW6+V8W, Kampala, Uganda,Kampala,7JW6+V8W",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-09-27 09:04:40.0",
        "id": "91",
        "status": "0",
        "act_by": "System",
        "details": "14 Buziga 7491, Kampala, Uganda,Kampala,14",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-09-26 11:50:04.0",
        "id": "90",
        "status": "0",
        "act_by": "System",
        "details": "7JX4+VWP, Kampala, Uganda,Kampala,7JX4+VWP",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-09-26 11:50:03.0",
        "id": "89",
        "status": "0",
        "act_by": "System",
        "details": "7JX4+VWP, Kampala, Uganda,Kampala,7JX4+VWP",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-09-26 11:48:44.0",
        "id": "88",
        "status": "0",
        "act_by": "System",
        "details": "7JX4+VWP, Kampala, Uganda,Kampala,7JX4+VWP",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-09-26 11:48:44.0",
        "id": "87",
        "status": "0",
        "act_by": "System",
        "details": "7JX4+VWP, Kampala, Uganda,Kampala,7JX4+VWP",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-09-26 11:36:19.0",
        "id": "86",
        "status": "0",
        "act_by": "System",
        "details": "7JX4+RWV, Kampala, Uganda,Kampala,7JX4+RWV",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-09-26 11:36:19.0",
        "id": "85",
        "status": "0",
        "act_by": "System",
        "details": "7JX4+RWV, Kampala, Uganda,Kampala,7JX4+RWV",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-09-26 11:31:21.0",
        "id": "84",
        "status": "0",
        "act_by": "System",
        "details": "7JX4+VWP, Kampala, Uganda,Kampala,7JX4+VWP",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-09-26 11:31:21.0",
        "id": "83",
        "status": "0",
        "act_by": "System",
        "details": "7JX4+VWP, Kampala, Uganda,Kampala,7JX4+VWP",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-09-26 11:22:10.0",
        "id": "82",
        "status": "0",
        "act_by": "System",
        "details": "7JX4+RWV, Kampala, Uganda,Kampala,7JX4+RWV",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-09-26 11:22:09.0",
        "id": "81",
        "status": "0",
        "act_by": "System",
        "details": "7JX4+RWV, Kampala, Uganda,Kampala,7JX4+RWV",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-09-26 11:21:24.0",
        "id": "80",
        "status": "0",
        "act_by": "System",
        "details": "7JX4+RWV, Kampala, Uganda,Kampala,7JX4+RWV",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-09-26 11:20:02.0",
        "id": "79",
        "status": "0",
        "act_by": "System",
        "details": "7JX4+VWP, Kampala, Uganda,Kampala,7JX4+VWP",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-09-26 11:20:02.0",
        "id": "78",
        "status": "0",
        "act_by": "System",
        "details": "7JX4+VWP, Kampala, Uganda,Kampala,7JX4+VWP",
        "name": "Location Update",
        "ref": "NA"
    },
    {
        "datereg": "2024-09-26 11:19:56.0",
        "id": "77",
        "status": "0",
        "act_by": "System",
        "details": "Esafe Login",
        "name": "Login",
        "ref": "B2000"
    },
    {
        "datereg": "2024-09-24 11:39:47.0",
        "id": "76",
        "status": "0",
        "act_by": "System",
        "details": "Document Attached",
        "name": "Attachment",
        "ref": "MGLSD3292942"
    },
    {
        "datereg": "2024-09-20 06:56:14.0",
        "id": "75",
        "status": "0",
        "act_by": "System",
        "details": "Login Action",
        "name": "User Login",
        "ref": "test@user.com"
    },
    {
        "datereg": "2024-09-17 12:20:53.0",
        "id": "74",
        "status": "0",
        "act_by": "System",
        "details": "Login Action",
        "name": "User Login",
        "ref": "test@user.com"
    },
            // Add more objects as needed
];

// Function to populate timeline
function populateTimeline(logData) {
    const timeline = document.getElementById("timeline");

    logData.forEach((entry, index) => {
        // Create timeline event container
        const timelineEvent = document.createElement("li");
        timelineEvent.classList.add("timeline-event");

        // Create date element
        const timelineDate = document.createElement("div");
        timelineDate.classList.add("timeline-date");
        timelineDate.textContent = entry.datereg;

        // Create dot
        const timelineDot = document.createElement("div");
        timelineDot.classList.add("timeline-dot");

        // Create event content
        const timelineContent = document.createElement("div");
        timelineContent.classList.add("timeline-event-content");
        timelineContent.innerHTML = `
                    <strong>${entry.name}</strong><br>
                    <span class="event-snippet">ID: ${entry.id}</span><br>
                    <span class="event-snippet">Status: ${entry.status}</span><br>
                    <span class="event-snippet">Acted by: ${entry.act_by}</span><br>
                    <span class="event-snippet">Reference: ${entry.ref}</span><br>
                    <span class="event-snippet">${entry.details}</span>
                `;

        // Append elements
        timelineEvent.appendChild(timelineDate);
        timelineEvent.appendChild(timelineDot);
        timelineEvent.appendChild(timelineContent);

        // Append event to timeline
        timeline.appendChild(timelineEvent);
    });
}



