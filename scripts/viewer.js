var query = new URLSearchParams(window.location.search);
var query_prefix = ""
var query_course = ""
var course = ""
var course_page = document.getElementById("course_page");
var tabs = document.getElementById("tabs_row").children;
var course_selector = document.getElementById("course_selector");

var desc_info_enum = 
[
    "description", "credit_hours", "prerequisite", "learning_outcomes", "schedule", "memo"
];

var coord_info_enum = 
[
    "coordinator_table"
];

var ext_info_enum = 
[
    "syllabus_link", "offering_history", "catalog_link", "owlexpress_link", "curriculog_link"
];

var alg_info_enum = 
[
    "alg_eligibility", "alg_round_history", "alg_developer", "latest_alg_round", "latest_alg_developer"
];



function load_course_quick_select()
{
    var course_select_html = "<option value=\"none\" disabled selected>Select an Item</option>"

    for (i = 0; i < all_course_data.length; i++)
    {
        course_select_html += "<option value=\"" + i + "\">" + all_course_data[i].Prefix + " " + all_course_data[i].Course_Number + "</option>"
    }

    course_selector.innerHTML = course_select_html
}



function select_course()
{
    course_page.innerHTML = "";

    course = all_course_data[course_selector.value];

    window.history.replaceState(null, null, "?course=" + course.Prefix + course.Course_Number);
    
    load_page_element();
}



async function swap_tab(switch_tab, animate)
{
    var body = document.getElementById("course_body").children[0].children;

    for (j = 0; j < tabs.length; j ++)
    {
        tabs[j].className = tabs[j].className.replace(" tab_active", "");

        if (tabs[j].getAttribute("id") == switch_tab)
        {
            tabs[j].className += " tab_active";
        }
    }

    if (document.getElementById("legend_table").style.gridTemplateRows == "1fr")
    {
        open_legend();
    }

    if (animate == true)
    {
        document.getElementById("course_body").style.gridTemplateRows = "0fr";
        await sleep(500);
    }

    document.getElementById("coordinator_label").style.height = "auto";

    if (switch_tab == "desc_info")
    {
        for (i = 0; i < body.length; i++)
        {
            if (desc_info_enum.includes(body[i].getAttribute("id"))) 
            {
                body[i].style.height = "auto";
            }
            else
            {
                body[i].style.height = "0";
            }
        }
    }
    else if (switch_tab == "coord_info")
    {
        document.getElementById("coordinator_label").style.height = "0";
        
        for (i = 0; i < body.length; i++)
        {
            if (coord_info_enum.includes(body[i].getAttribute("id")))
            {
                body[i].style.height = "auto";
            }
            else
            {
                body[i].style.height = "0";
            }
        }
    }
    else if (switch_tab == "ext_info")
    {
        for (i = 0; i < body.length; i++)
        {
            if (ext_info_enum.includes(body[i].getAttribute("id")))
            {
                body[i].style.height = "auto";
            }
            else
            {
                body[i].style.height = "0";
            }
        }
    }
    else if (switch_tab == "alg_info")
    {
        for (i = 0; i < body.length; i++)
        {
            if (alg_info_enum.includes(body[i].getAttribute("id")))
            {
                body[i].style.height = "auto";
            }
            else
            {
                body[i].style.height = "0";
            }
        }
    }
    else
    {
        for (i = 0; i < body.length; i++)
        {
            body[i].style.height = "auto";
        }
    }

    if (animate == true)
    {
        document.getElementById("course_body").style.gridTemplateRows = "1fr";
    }
}



function open_legend()
{
    if (document.getElementById("legend_table").style.gridTemplateRows == "1fr")
    {
        document.getElementById("legend_table").style.gridTemplateRows = "0fr";
        document.getElementById("legend_button").innerHTML = "Open Legend";
    }
    else
    {
        document.getElementById("legend_table").style.gridTemplateRows = "1fr";
        document.getElementById("legend_button").innerHTML = "Close Legend";
    }    
}



function build_offering_history(year)
{
    var offering_history_fall
    var offering_history_summer
    var offering_history_spring

    if (course.Offering_History["Fall_" + year].toLowerCase() == "not offered")
    {
        offering_history_fall = `<p class=\"list_paragraph_spacer\">` + course.Offering_History["Fall_" + year] + `</p>`;
    }
    else
    {
        offering_history_fall = `<a class=\"list_paragraph_spacer list_link\" href=\"` + course.Offering_History["Fall_" + year] + `\" target=\"_blank\">Fall ` + year + `</a>`;
    }

    if (course.Offering_History["Summer_" + year].toLowerCase() == "not offered")
    {
        offering_history_summer = `<p class=\"list_paragraph_spacer\">` + course.Offering_History["Summer_" + year] + `,</p>`;
    }
    else
    {
        offering_history_summer = `<a class=\"list_paragraph_spacer list_link\" href=\"` + course.Offering_History["Summer_" + year] + `\" target=\"_blank\">Summer ` + year + `,</a>`;
    }

    if (course.Offering_History["Spring_" + year].toLowerCase() == "not offered")
    {
        offering_history_spring = `<p class=\"list_paragraph_spacer\">` + course.Offering_History["Spring_" + year] + `,</p>`;
    }
    else
    {
        offering_history_spring = `<a class=\"list_paragraph_spacer list_link\" href=\"` + course.Offering_History["Spring_" + year] + `\" target=\"_blank\">Spring ` + year + `,</a>`;
    }

    return `
    <div class=\"side_by_side list_indent\">
        <p class=\"bold\">` + year + `: </p>
        ` + offering_history_spring + `
        ` + offering_history_summer + `
        ` + offering_history_fall + `
    </div>`;
}



function sleep(miliseconds)
{
    return new Promise(timeout =>
        {
            setTimeout(timeout, miliseconds)
        });
}



function load_page_element()
{
    var learning_outcomes_list = ""
    var offering_history_list = ""

    if (course.Course_Learning_Outcomes[0] == "None")
    {
        learning_outcomes_list = `
        <div class=\"side_by_side\">
            <p class=\"list_paragraph_spacer list_indent\">` + course.Course_Learning_Outcomes[0] + `</p>
        </div>`
    }
    else
    {
        for (k = 0; k < course.Course_Learning_Outcomes.length; k ++)
        {
            learning_outcomes_list += `
            <div class=\"side_by_side\">
                <p class=\"list_indent\">` + (k + 1) + `. </p>
                <p class=\"list_paragraph_spacer\">` + course.Course_Learning_Outcomes[k] + `</p>
            </div>`
        }
    }
    
    offering_history_list += build_offering_history("2023");
    offering_history_list += build_offering_history("2022");
    offering_history_list += build_offering_history("2021");

    var htmlObj = document.createElement('div');

    htmlObj.id = "course"
    
    htmlObj.innerHTML = `
    <div class=\"list_element\">
        <p id=\"course_number\" class=\"bold title_size\">` + course.Prefix + ` ` + course.Course_Number + `: ` + course.Course_Name + `</p>
        <div id=\"course_body\" class=\"animate_open_default\">
            <div>
                <div id=\"credit_hours\" class=\"hide_overflow\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Credit Hours: </p>
                        <p class=\"list_paragraph_spacer\">` + course.Credit_Hours + `</p>
                    </div>
                </div>
                <div id=\"prerequisite\" class=\"hide_overflow\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Prerequisite: </p>
                        <p class=\"list_paragraph_spacer\">` + course.Prerequisite + `</p>
                    </div>
                </div>
                <div id=\"description\" class=\"hide_overflow\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Description: </p>
                        <p class=\"list_paragraph_spacer\">` + course.Description + `</p>
                    </div>
                </div>
                <div id=\"learning_outcomes\" class=\"hide_overflow\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Learning Outcomes: </p>
                    </div>
                    ` + learning_outcomes_list + `
                </div>
                <div id=\"schedule\" class=\"hide_overflow\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Course Permanent Schedule:</p>
                    </div>
                    <div class=\"table_padder_top\">
                    </div>
                    <div class=\"table_base six_row\">
                        <p class=\"header_row table_data\">Fall Odd</p>
                        <p class=\"header_row table_data\">Summer Odd</p>
                        <p class=\"header_row table_data\">Spring Odd</p>
                        <p class=\"header_row table_data\">Fall Even</p>
                        <p class=\"header_row table_data\">Summer Even</p>
                        <p class=\"header_row table_data\">Spring Even</p>
                        <p class=\"data_row table_data\">` + course.Course_Schedule.Fall_Odd + `</p>
                        <p class=\"data_row table_data\">` + course.Course_Schedule.Summer_Odd + `</p>
                        <p class=\"data_row table_data\">` + course.Course_Schedule.Spring_Odd + `</p>
                        <p class=\"data_row table_data\">` + course.Course_Schedule.Fall_Even + `</p>
                        <p class=\"data_row table_data\">` + course.Course_Schedule.Summer_Even + `</p>
                        <p class=\"data_row table_data\">` + course.Course_Schedule.Spring_Even + `</p>
                    </div>
                    <button id=\"legend_button\" onclick=\"open_legend();\" class=\"legend_button\">Open Legend</button>
                    <div id=\"legend_table\" class=\"animate_open\">
                        <div>
                            <div class=\"table_base two_row\">
                                <p class=\"header_row table_data\">Symbol</p>
                                <p class=\"header_row table_data\">Meaning</p>
                                <p class=\"data_row table_data\">D</p>
                                <p class=\"data_row table_data\">Offered during the day (8am-5pm)</p>
                                <p class=\"data_row table_data\">E</p>
                                <p class=\"data_row table_data\">Offered during the evening (5pm-10pm)</p>
                                <p class=\"data_row table_data\">O</p>
                                <p class=\"data_row table_data\">Offered online</p>
                                <p class=\"data_row table_data\">XY</p>
                                <p class=\"data_row table_data\">Offered both X and Y. E.g. "EO" means course is offered both evening and online</p>
                                <p class=\"data_row table_data\">X/Y</p>
                                <p class=\"data_row table_data\">Offered either X or Y with preference for X</p>
                                <p class=\"data_row table_data\">+</p>
                                <p class=\"data_row table_data\">Offered. Mode and time undetermined</p>
                                <p class=\"data_row table_data\">-</p>
                                <p class=\"data_row table_data\">Not guaranteed to be offered</p>
                            </div>
                        </div>
                    </div>
                    <div class=\"table_padder_bottom\">
                    </div>
                </div>
                <div id=\"coordinator_table\" class=\"hide_overflow\">
                    <p></p>
                    <div id=\"coordinator_label\" class=\"side_by_side\">
                        <p class=\"bold\">Course Coordinator:</p>
                    </div>
                    <div class=\"table_padder_top\">
                    </div>
                    <div class=\"table_base three_row\">
                        <p class=\"header_row table_data\">Course Coordinator</p>
                        <p class=\"header_row table_data\">Coordinator Email</p>
                        <p class=\"header_row table_data\">D2L Master Link</p>
                        <p class=\"data_row table_data\">` + course.First_Name + ` ` + course.Last_Name + `</p>
                        <p class=\"data_row table_data\">` + course.Email + `</p>
                        <a class=\"data_row table_data list_link\" href=\"` + course.D2L_Master_Link + `\" target=\"_blank\">` + course.D2L_Master_Link + `</a>
                    </div>
                    <div class=\"table_padder_bottom\">
                    </div>
                </div>
                <div id=\"syllabus_link\" class=\"hide_overflow\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Syllabus Link: </p>
                        <a class=\"list_paragraph_spacer list_link\" href=\"` + course.Syllabus_Link + `\" target=\"_blank\">` + course.Syllabus_Link + `</a>
                    </div>
                </div>
                <div id=\"offering_history\" class=\"hide_overflow\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Offering History: </p>
                    </div>
                    ` + offering_history_list + `
                </div>
                <div id=\"catalog_link\" class=\"hide_overflow\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Course Catalog Link: </p>
                        <a class=\"list_paragraph_spacer list_link\" href=\"` + course.Course_Catalog_Link + `\" target=\"_blank\">` + course.Course_Catalog_Link + `</a>
                    </div>
                </div>
                <div id=\"owlexpress_link\" class=\"hide_overflow\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"list_pargraph_no_break bold\">OwlExpress Link: </p>
                        <a class=\"list_paragraph_spacer list_link\" href=\"` + course.OwlExpress_Link + `\" target=\"_blank\">` + course.OwlExpress_Link + `</a>
                    </div>
                </div>
                <div id=\"curriculog_link\" class=\"hide_overflow\">
                    <p></p>                
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Curriculog Link: </p>
                        <a class=\"list_paragraph_spacer list_link\" href=\"` + course.Curriculog_Link + `\" target=\"_blank\">` + course.Curriculog_Link + `</a>
                    </div>
                </div>
                <div id=\"alg_eligibility\" class=\"hide_overflow\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">ALG Eligibility: </p>
                        <p class=\"list_paragraph_spacer\">` + course.ALG_Eligible + `</p>
                    </div>
                </div>
                <div id=\"alg_round_history\" class=\"hide_overflow\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">ALG Round History: </p>
                        <p class=\"list_paragraph_spacer\">` + course.History_Round_And_Developer + `</p>
                    </div>
                </div>
                <div id=\"alg_developer\" class=\"hide_overflow\">
                    <p></p>
                    <div class=\"side_by_side\" class=\"hide_overflow\">
                        <p class=\"bold\">ALG Developer: </p>
                        <p class=\"list_paragraph_spacer\">` + course.ALG_Developer + `</p>
                    </div>
                </div>
                <div id=\"latest_alg_round\" class=\"hide_overflow\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Latest ALG Round: </p>
                        <p class=\"list_paragraph_spacer\">` + course.Latest_ALG_Round + `</p>
                    </div>
                </div>
                <div id=\"latest_alg_developer\" class=\"hide_overflow\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Latest ALG Developer: </p>
                        <p class=\"list_paragraph_spacer\">` + course.Latest_Developer + `</p>
                    </div>
                </div>
                <div id=\"memo\" class=\"hide_overflow\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Memo: </p>
                        <p class=\"list_paragraph_spacer\">` + course.Memo + `</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    course_page.appendChild(htmlObj);
}



// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    sort_array_by_id(all_course_data);

    query_prefix = query.get("course").replace(/[0-9]*/g, "");
    query_course = query.get("course").replace(/[A-Z]*/g, "");

    if (sessionStorage.getItem("stored_course") == null || (JSON.parse(sessionStorage.getItem("stored_course")).Prefix + JSON.parse(sessionStorage.getItem("stored_course")).Course_Number) != (query_prefix + query_course))
    {
        for (id = 0; id < all_course_data.length; id++)
        {
            if (all_course_data[id].Prefix == query_prefix && all_course_data[id].Course_Number == query_course)
            {
                sessionStorage.setItem("stored_course", JSON.stringify(all_course_data[id]));
                break;
            }
        }
    }

    course = JSON.parse(sessionStorage.getItem("stored_course"));

    load_page_element();

    load_course_quick_select()
}