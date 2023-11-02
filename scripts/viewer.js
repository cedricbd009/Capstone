var query = new URLSearchParams(window.location.search);
var query_prefix = ""
var query_course = ""
var course = ""
var course_page = document.getElementById("course_page");
var tabs = document.getElementById("tabs_row").children;
var course_selector = document.getElementById("course_selector");

var essential_info_enum = 
[
    "description", "credit_hours", "prerequisite", "learning_outcomes", "syllabus_link", "catalog_link", "memo"
];

var offering_info_enum = 
[
    "schedule", "offering_history", "owlexpress_link"
];

var development_info_enum = 
[
    "coordinator_table", "curriculog_link", "alg_info"
];



function load_course_quick_select()
{
    var course_select_html = "<option value=\"none\" disabled selected>Select an Item</option>"

    for (i = 0; i < all_course_data.length; i++)
    {
        course_select_html += "<option value=\"" + i + "\">" + all_course_data[i].Prefix + " " + all_course_data[i].Course_Number + ": " + all_course_data[i].Course_Name + "</option>"
    }

    course_selector.innerHTML = course_select_html
}



function select_course()
{
    course_page.innerHTML = "";

    course = all_course_data[course_selector.value];

    set_site_title_course("Course Profile " + course.Prefix + " " +  course.Course_Number + " " + course.Course_Name);

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

    if (animate == true)
    {
        document.getElementById("course_body").style.gridTemplateRows = "0fr";
        await sleep(500);
    }


    if (switch_tab == "essential_info")
    {
        for (i = 0; i < body.length; i++)
        {
            if (essential_info_enum.includes(body[i].getAttribute("id"))) 
            {
                body[i].style.height = "auto";
            }
            else
            {
                body[i].style.height = "0";
            }
        }
    }
    else if (switch_tab == "offering_info")
    {
        for (i = 0; i < body.length; i++)
        {
            if (offering_info_enum.includes(body[i].getAttribute("id")))
            {
                body[i].style.height = "auto";
            }
            else
            {
                body[i].style.height = "0";
            }
        }
    }
    else if (switch_tab == "development_info")
    {
        for (i = 0; i < body.length; i++)
        {
            if (development_info_enum.includes(body[i].getAttribute("id")))
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
    <div class=\"side_by_side\">
        <p class=\"bold\">` + year + `: </p>
        ` + offering_history_spring + `
        ` + offering_history_summer + `
        ` + offering_history_fall + `
    </div>`;
}



function generate_latest_round_info()
{
    var round_split = course.Latest_ALG_Round.split("-");
    var round = "";
    var grant = "";
    var grant_type = "";
    var round_year = "";

    for (i = 0; i < all_grant_data.length; i++)
    {
        if (all_grant_data[i].Round == round_split[0])
        {
            round = all_grant_data[i];

            if (round_split.length > 1)
            {
                for (j = 0; j < round.Grants.length; j++)
                {
                    if (round.Grants[j].Grant == round_split[1])
                    {
                        grant = round.Grants[j];
                        grant_type = ` `+ grant.Type + ` Grant`;
                        break;
                    }
                }
            }
            break;
        }
    }

    if (round_split[0] != "None")
    {
        round_year = ` (` + round.Year + `)`;
    }

    return `
    <li class="table_base list_element_row">
        <p class=\"bold tall_list_margin\">Latest Round:</p>
        <p class="tall_list_margin">` + course.Latest_ALG_Round + round_year + grant_type + `</p>
    </li>`;
}



function generate_history_info()
{
    var history = course.History_Round_And_Developer.split("/");
    var history_list = ""; 

    for (k = 0; k < history.length; k++)
    {
        var round_split = history[k].split("-");
        var round = "";
        var grant = "";
        var grant_repo = "";
        var developer = "";

        for (i = 0; i < all_grant_data.length; i++)
        {
            if (all_grant_data[i].Round == round_split[0])
            {
                round = all_grant_data[i];

                if (round_split.length > 1)
                {
                    for (j = 0; j < round.Grants.length; j++)
                    {
                        if (round.Grants[j].Grant == round_split[1])
                        {
                            grant = round.Grants[j];
                            grant_repo = grant.OER_Repo;
                            break;
                        }
                    }
                }
                break;
            }
        }

        if (history[k] != "None")
        {
            developer = ` (` + course.ALG_Developer + `)`;
        }

        if (grant_repo == "" || grant_repo == "Not Provided")
        {
            history_list += `<p class="tall_list_margin">` + history[k] + developer + `</p>`
        }
        else
        {
            history_list += `<a class="tall_list_margin black_text" href=\"` + grant_repo + `\" target=\"_blank\">` + history[k] + developer + `</a>`
        }
        
        if (history.length > 1 && k < (history.length - 1))
        {
            history_list += `<p class="tall_list_margin space_after">,</p>`
        }
    }
    
    return `
    <li class="table_base list_element_row">
        <p class=\"bold tall_list_margin\">History:</p>
        <div class=\"side_by_side\">
            ` + history_list + `
        </div>
    </li>`;
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
            <p class=\"inner_list_margin\">` + course.Course_Learning_Outcomes[0] + `</p>
        </div>`
    }
    else
    {
        for (k = 0; k < course.Course_Learning_Outcomes.length; k ++)
        {
            learning_outcomes_list += `
            <div class=\"side_by_side\">
                <p class=\"inner_list_margin\">` + (k + 1) + `. </p>
                <p class=\"list_paragraph_spacer inner_list_margin\">` + course.Course_Learning_Outcomes[k] + `</p>
            </div>`
        }
    }

    var oer_links = `<p class=\"tall_list_margin\">None</p>`

    if (course.OER_Links.Website != "None")
    {
        oer_links = `<a class=\"tall_list_margin\" href=\"` + course.OER_Links.Website + `\" target=\"_blank\">Website</a>`
    }

    if (course.OER_Links.OpenALG != "None")
    {
        if (oer_links == `<p class=\"tall_list_margin\">None</p>`)
        {
            oer_links = `<a class=\"tall_list_margin\" href=\"` + course.OER_Links.OpenALG + `\" target=\"_blank\">OpenALG</a>`;
        }
        else
        {
            oer_links += `<p class=\"tall_list_margin\">, </p>`;
            oer_links += `<a class=\"tall_list_margin space_before\" href=\"` + course.OER_Links.OpenALG + `\" target=\"_blank\">OpenALG</a>`;
        }
    }
    
    offering_history_list += build_offering_history("2023");
    offering_history_list += build_offering_history("2022");
    offering_history_list += build_offering_history("2021");

    var html_obj = document.createElement('div');

    html_obj.classList.add("animate_open_default");

    html_obj.id = "course"
    
    html_obj.innerHTML = `
    <div class=\"list_element background_color\">
        <p id=\"course_number\" class=\"bold title_size\">` + course.Prefix + ` ` + course.Course_Number + `: ` + course.Course_Name + `</p>
        <div id=\"course_body\" class=\"animate_open_default contained\">
            <div>
                <div id=\"credit_hours\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Credit Hours: </p>
                        <p>` + course.Credit_Hours + `</p>
                    </div>
                </div>
                <div id=\"description\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Description: </p>
                        <p>` + course.Description + `</p>
                    </div>
                </div>
                <div id=\"learning_outcomes\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Learning Outcomes: </p>
                        <div class=\"outter_list_margin\">
                            ` + learning_outcomes_list + `
                        </div>
                    </div>
                </div>
                <div id=\"prerequisite\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Prerequisite: </p>
                        <p>` + course.Prerequisite + `</p>
                    </div>
                </div>
                <div id=\"syllabus_link\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Syllabus Link: </p>
                        <a class=\"list_link\" href=\"` + link_list.Syllabus_Repository + course.Prefix + course.Course_Number + `-Syllabus.pdf\" target=\"_blank\">` + course.Prefix + course.Course_Number + `-Syllabus.pdf</a>
                    </div>
                </div>
                <div id=\"catalog_link\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Course Catalog Link: </p>
                        <a class=\"list_link\" href=\"` + course.Course_Catalog_Link + `\" target=\"_blank\">` + course.Course_Catalog_Link + `</a>
                    </div>
                </div>
                <div id=\"memo\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Memo: </p>
                        <p>` + course.Memo + `</p>
                    </div>
                </div>
                <div id=\"schedule\" class=\"hide_overflow\">
                    <div>
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
                    <div class=\"table_padder_bottom\">
                    </div>
                </div>
                <div id=\"offering_history\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Offering History: </p>
                        <div>
                            ` + offering_history_list + `
                        </div>
                    </div>
                </div>
                <div id=\"owlexpress_link\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">OwlExpress Link: </p>
                        <a class=\"list_link\" href=\"` + course.OwlExpress_Link + `\" target=\"_blank\">` + course.OwlExpress_Link + `</a>
                    </div>
                </div>
                <div id=\"coordinator_table\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Course Coordinator:</p>
                        <p>` + course.Coordinator_Name + `, ` + course.Co_Coordinator_Name +`</p>
                        <p class=\"bold\">D2L Master Shell:</p>
                        <a class=\"list_link\" href=\"` + course.D2L_Master_Link + `\" target=\"_blank\">` + course.D2L_Master_Link + `</a>
                </div>
                <div id=\"curriculog_link\" class=\"hide_overflow\">             
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Curriculog Link: </p>
                        <a class=\"list_link\" href=\"` + course.Curriculog_Link + `\" target=\"_blank\">` + course.Curriculog_Link + `</a>
                    </div>
                </div>
                <div id=\"alg_info\" class=\"hide_overflow\">
                    <p class="bold list_header_margin">ALG Grants:</p>
                    <ul>
                        ` + generate_latest_round_info() + `
                        <li class="table_base list_element_row">
                            <p class=\"bold tall_list_margin\">Developer:</p>
                            <p class="tall_list_margin">` + course.Latest_Developer + `</p>
                        </li>
                        <li class="table_base list_element_row">
                            <p class="bold tall_list_margin">OER Links:</p>
                            <div class=\"side_by_side\">
                                `+ oer_links + `
                            </div>
                        </li>
                        ` + generate_history_info() + `
                    </ul>
                </div>
            </div>
        </div>
    </div>`;

    course_page.appendChild(html_obj);
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

    set_site_title_course("Course Profile " + course.Prefix + " " +  course.Course_Number + " " + course.Course_Name);

    load_page_element();

    load_course_quick_select()
}