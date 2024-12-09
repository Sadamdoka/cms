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
var organ = '';
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
                            user = value.resid;
                            
                            document.getElementById('user_name').innerHTML = value.name;
                            act_name = value.name;
                            type = value.type;
                            organ = value.organ;
                            setAdmin_role(value.role);
                            setType(value.type);
                            loadCaseAll(value.type, value.organ);
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


function loadCaseAll(input, organs) {
    if (input === "1") {
        loadCasesLocal(organs);
        //loadEmergenciesAgency(organs);
    } else if (input === "2") {
        loadCasesForeign(organs);
        //loadEmergenciesAgency(organs);
    } else if (input === "3") {
        loadCases(1);
        //loadEmergencies();
    } else if (input === "4") {
        loadCases(1);
        //loadEmergencies();
    } else {
        alert("Error Code");
    }
}



function loadCases(input) {
    try {
        $.ajax({
            url: url + "fetch/case_ticket_high/" + input + "/UG",
            dataType: 'json',
            type: 'get',
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $("#mw_case_table_body").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            success: function (data) {
                try {
                    $("#mw_case_table_body").empty();

                    if (!isEmpty(data)) {
                        // Save data globally for filtering
                        window.caseData = data.Case_ticket;

                        // Populate the Category filter dynamically
                        const categories = [...new Set(caseData.map(row => row.comp_category))];
                        categories.forEach(category => {
                            $("#categoryFilter").append(
                                    `<option value="${category}">${category}</option>`
                                    );
                        });


                        // Populate table with initial data
                        populateCaseTable(caseData);

                    } else {
                        $("#mw_case_table_body").html('<tr><td colspan="13" align="center">No data available</td></tr>');
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            error: function (d) {
                alert("Error", "Unable to fetch case data. Please try again.");
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}


function loadCasesForeign(input) {
    try {
        $.ajax({
//
            url: url + "fetch/case_ticket_agency_status/null/" + input + "/0",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#mw_case_table_body").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#mw_case_table_body").empty();
                    if (!isEmpty(data)) {
                        // Save data globally for filtering
                        window.caseData = data.Case_ticket;

                        // Populate the Category filter dynamically
                        const categories = [...new Set(caseData.map(row => row.comp_category))];
                        categories.forEach(category => {
                            $("#categoryFilter").append(
                                    `<option value="${category}">${category}</option>`
                                    );
                        });


                        // Populate table with initial data
                        populateCaseTable(caseData);

                    } else {
                        $("#mw_case_table_body").html('<tr><td colspan="13" align="center">No data available</td></tr>');
                    }
                } catch (e) {
                    ShowError("Response Error", e, loadCases);
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



function loadCasesLocal(input) {
    try {
        $.ajax({
//
            url: url + "fetch/case_ticket_agency_status/" + input + "/null/0",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#mw_case_table_body").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#mw_case_table_body").empty();
                    if (!isEmpty(data)) {
                        // Save data globally for filtering
                        window.caseData = data.Case_ticket;

                        // Populate the Category filter dynamically
                        const categories = [...new Set(caseData.map(row => row.comp_category))];
                        categories.forEach(category => {
                            $("#categoryFilter").append(
                                    `<option value="${category}">${category}</option>`
                                    );
                        });


                        // Populate table with initial data
                        populateCaseTable(caseData);

                    } else {
                        $("#mw_case_table_body").html('<tr><td colspan="13" align="center">No data available</td></tr>');
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            error: function (d) {
                console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}





// Apply filters
document.getElementById("applyFilters").addEventListener("click", () => {
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);
    const selectedCategory = document.getElementById("categoryFilter").value;
    const selectedStatus = document.getElementById("statusFilter").value;

    const filteredData = window.caseData.filter(row => {
        const rowDate = new Date(row.datereg);
        const matchesCategory = selectedCategory ? row.comp_category === selectedCategory : true;
        const matchesStatus = selectedStatus ? row.case_status === selectedStatus : true;
        const matchesDate = (!isNaN(startDate) ? rowDate >= startDate : true) &&
                (!isNaN(endDate) ? rowDate <= endDate : true);

        return matchesCategory && matchesStatus && matchesDate;
    });

    populateCaseTable(filteredData);
});


function populateCaseTable(data) {
    // Clear existing table rows
    $("#mw_case_table").innerHTML = "";
    $("#mw_case_table_body").empty();

    if (data.length === 0) {
        // Show "No data" message if the array is empty
        $("#mw_case_table").innerHTML = '<tr><td colspan="13" align="center">No data</td></tr>';
        return;
    }

    // Loop through the data array and create table rows
    data.forEach((caseItem, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><button id="${caseItem.id}" onclick="manageCase(this)" value="2" name="${caseItem.case_id}" class="btn btn-primary">Manage</button></td>
            <td style="font-size: 30px; text-align:center;">${dayCounter(getDate_formart(caseItem.datereg))} Days</td>
            <td>${getDate_formart(caseItem.datereg)}</td>
            <td>${getStatus(caseItem.case_status)}</td>
            <td>${caseItem.case_id}</td>
            <td>${caseItem.mw_name}</td>
            <td>${caseItem.mw_passport_no}</td>
            <td>${caseItem.comp_category}</td>
            <td>${caseItem.mw_location || ''} OR ${caseItem.mw_loca || ''}</td>
            <td>${caseItem.local_agency}</td>
            <td>${caseItem.foreign_agency}</td>
            <td>${caseItem.who_name}</td>
            <td>${caseItem.who_phone}</td>
        `;

        $("#mw_case_table").append(row);
    });
    pager('mw_case_table');
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


function manageCase(input) {
    //loadItem();


    let case_type = $(input).attr("value");
    let nam = $(input).attr("name");
    window.groupID = nam;
    if (case_type === '1') {
        document.getElementById('model_t_type').value = '1';
        getCaseShort(input);
    } else if (case_type === '2') {
        document.getElementById('model_c_type').value = '2';
        getCaseDet(input);
    } else {
        alert('Case has no type');
    }

    loadLogsTimelime(input, 'timeline');
    loadAttachment(input, 'model_att_table', 'model_attach_table_body');
    loadMsg(nam);
    document.getElementById('officer_div').style.visibility = "hidden";
    $('#manage_case').modal('show');

}

function setOfficer() {
    let s = $("#model_c_status :selected").attr('id');
    if (s === "2") {
        document.getElementById('officer_div').style.visibility = "visible";
        //document.getElementById('officer_div').style.display = 'show';
        loadOrganOfficers(organ);
    } else {
        document.getElementById('officer_div').style.visibility = "hidden";
        //document.getElementById('officer_div').style.display = 'none';
    }
}



function getCaseDet(input) {
    // let id = $(input).attr("id");

    let id = $(input).attr("id");
    try {
        $.ajax({
            url: url + "fetch/case_ticket/" + id + "/null/null",
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
                            getCaseMgt(jdata.case_id);
                            document.getElementById('model_t_id').value = jdata.id;
                            document.getElementById('model_t_ticket').value = jdata.case_id;
                            document.getElementById('model_t_cat').value = jdata.comp_category;
                            document.getElementById('model_t_det').value = jdata.mw_assistance;
                            document.getElementById('model_t_loca').value = jdata.mw_loca;
                            document.getElementById('model_c_id').value = jdata.case_id;
                            document.getElementById('model_c_cc').value = jdata.comp_category;
                            document.getElementById('model_c_det').value = jdata.mw_assistance;
                            document.getElementById('model_att_id').value = jdata.case_id;

                            if (jdata.mw_passport_no === "NA" || jdata.mw_passport_no === "Unknown") {
                                document.getElementById('model_t_mwname').value = jdata.mw_name;
                                document.getElementById('model_t_pass').value = jdata.mw_passport_no;
                            } else {
                                getMW_Details_Case(jdata.mw_sys_id, 'model_t_mwname', 'model_t_pass', '0', 'model_t_lco', 'model_t_lco_con', 'model_t_lco_email', 'model_t_fco', 'model_t_fco_con', 'model_t_fco_email');

                            }

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


function getCaseMgt(input) {
    // let id = $(input).attr("id");

    //let id = $(input).attr("id");
    console.log(input);
    try {
        $.ajax({
            url: url + "fetch/case_mgt/0/null/" + input,
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
                            document.getElementById('model_t_officer_id').value = jdata.officer;
                            document.getElementById('model_t_officer').value = jdata.officerId;

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
                        document.getElementById('model_t_officer_id').value = "No Officer Assigned";
                        document.getElementById('model_t_officer').value = "No Officer Assigned";
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

document.getElementById('model_att_button').addEventListener('click', attachDocu);
function attachDocu(event) {
    event.preventDefault();
    let caseticket = document.getElementById("model_att_id").value;
    let caseDetails = document.getElementById("model_att_det").value;
    let caseAttach = document.getElementById("model_att_file");//.value;

    addAttachment(caseticket, caseDetails, caseAttach);
}

document.getElementById('model_c_button').addEventListener('click', assignOfficer);
function assignOfficer(event) {
    event.preventDefault();
    let formData = new FormData();

    let caseticket = document.getElementById("model_c_id").value;
    let caseType = document.getElementById("model_c_type").value;
    let caseDetails = document.getElementById("model_c_det").value;
    let assigneeId = document.getElementById("model_c_assignid").value;
    let assignee = document.getElementById("model_c_assignee").value;
    let officerId = $("#model_c_officer :selected").attr('id');
    let officer = document.getElementById("model_c_officer").value;
    //let recommendation = document.getElementById("model_m_fco").value;
    //let followUp = document.getElementById("model_m_remark").value;
    //let remarks = document.getElementById("model_m_officer").value;

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

    fetch(url + "create/case_mgt",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Case Assigned Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


const chatContainer = document.querySelector('#chat_div');

// Helper function to create a message element
function createMessageElement(sender, by, text, timestamp) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender === 'User' ? 'user' : 'bot'}`;

    const textDiv = document.createElement('div');
    textDiv.className = 'text';
    textDiv.textContent = text;

    const metadataDiv = document.createElement('div');
    metadataDiv.className = 'metadata';

    const usernameSpan = document.createElement('span');
    usernameSpan.className = 'username';
    usernameSpan.textContent = by;

    const timestampSpan = document.createElement('span');
    timestampSpan.className = 'timestamp';
    timestampSpan.textContent = timestamp;

    metadataDiv.appendChild(usernameSpan);
    metadataDiv.appendChild(timestampSpan);

    messageDiv.appendChild(textDiv);
    messageDiv.appendChild(metadataDiv);

    return messageDiv;
}


// Populate the chat with messages
// Function to populate messages into the chat
function populateMsg(data) {
    // Sort the messages by date in descending order
    //data.sort((a, b) => new Date(b.datereg) - new Date(a.datereg));

    // Sort the messages by date in ascending order
    data.sort((a, b) => new Date(a.datereg) - new Date(b.datereg));

    // Clear the chat container before populating
    chatContainer.innerHTML = '';

    // Loop through the sorted messages and append them
    data.forEach(message => {
        const sender = message.senderid.startsWith('U') ? 'User' : 'Bot';
        const text = message.msgtext;
        const by = message.msgby;
        const timestamp = new Date(message.datereg).toLocaleString();

        const messageElement = createMessageElement(sender, by, text, timestamp);
        chatContainer.appendChild(messageElement);
    });
}



function loadMsg(input) {
    //https://esafeafrica.com/api.monitoring_mglsd/service/fetch/message/MGLSD8471215/1/2/OU18746550
    try {
        $.ajax({
            url: url + "fetch/message/" + input + "/1/2/" + user,
            dataType: 'json',
            type: 'get',
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $("#chat_div").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            success: function (data) {
                try {
                    $("#chat_div").empty();

                    if (!isEmpty(data)) {
                        // Save data globally for filtering
                        window.msgData = data.message;
                        // Populate table with initial data
                        populateMsg(data.message);

                    } else {
                        $("#chat_div").html('<tr><td colspan="13" align="center">No data available</td></tr>');
                    }
                } catch (e) {
                    console.error("Error processing data:", e);
                }
            },
            error: function (d) {
                alert("Error", "Unable to fetch case data. Please try again.");
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}





function setTextOfficer() {
    let s = document.getElementById("messageType").value;
    //let s = $("#messageType :selected").value;
    //console.log(s);
    if (s === "officer") {
        document.getElementById('officer_sel').style.display = 'block';
        //document.getElementById('officer_div').style.display = 'show';
        getTextOfficer(organ);
    } else {
        document.getElementById('officer_sel').style.display = 'none';
    }
}


function getTextOfficer(input) {
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
                var e_data = '';
                try {
                    $("#officer_sel").empty();
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
                    $("#officer_sel").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadOrganOfficers);
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


document.getElementById('chat_btn_send').addEventListener('click', caseChat);
function caseChat(event) {
    event.preventDefault();
    let formdata = new FormData();

    let caseticket = document.getElementById("model_c_id").value;
    let msgtext = document.getElementById("messageInput").value;
    let statu = $("#messageType :selected").attr('id');
    let msgto = $("#officer_sel :selected").attr('id');
    //const msgto = document.getElementById('officer_sel');
    let username = document.getElementById('user_name').innerHTML;


    formdata.append("groupid", caseticket);
    formdata.append("senderid", user);
    formdata.append("msgtext", msgtext);
    formdata.append("msgto", msgto);
    formdata.append("msgby", username);
    formdata.append("status", statu);


    fetch(url + "create/message",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            loadMsg(window.groupID);
            alert("Message Sent");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


