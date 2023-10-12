var query = new URLSearchParams(window.location.search);
var query_prefix = ""
var query_course = ""
var course = ""

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

async function swap_tab(switch_tab, animate)
{
    var tabs = document.getElementById("tabs_row").children;
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
        if (document.getElementById("legend_table").style.gridTemplateRows == "1fr")
        {
            open_legend();
        }
        await sleep(500);
    }

    document.getElementById("coordinator_label").style.display = "block";

    if (switch_tab == "desc_info")
    {
        for (i = 0; i < body.length; i++)
        {
            if (desc_info_enum.includes(body[i].getAttribute("id"))) 
            {
                body[i].style.display = "block";
            }
            else
            {
                body[i].style.display = "none";
            }
        }
    }
    else if (switch_tab == "coord_info")
    {
        document.getElementById("coordinator_label").style.display = "none";
        
        for (i = 0; i < body.length; i++)
        {
            if (coord_info_enum.includes(body[i].getAttribute("id")))
            {
                body[i].style.display = "block";
            }
            else
            {
                body[i].style.display = "none";
            }
        }
    }
    else if (switch_tab == "ext_info")
    {
        for (i = 0; i < body.length; i++)
        {
            if (ext_info_enum.includes(body[i].getAttribute("id")))
            {
                body[i].style.display = "block";
            }
            else
            {
                body[i].style.display = "none";
            }
        }
    }
    else if (switch_tab == "alg_info")
    {
        for (i = 0; i < body.length; i++)
        {
            if (alg_info_enum.includes(body[i].getAttribute("id")))
            {
                body[i].style.display = "block";
            }
            else
            {
                body[i].style.display = "none";
            }
        }
    }
    else
    {
        for (i = 0; i < body.length; i++)
        {
            body[i].style.display = "block";
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



function build_offering_history(semester, year)
{
    if (course.Offering_History[semester + "_" + year].toLowerCase() == "not offered")
    {
        return `
        <div class=\"side_by_side\">
            <p class=\"list_indent list_pargraph_no_break\">` + semester + ` ` + year + `: </p>
            <p class=\"list_paragraph_spacer\">` + course.Offering_History[semester + "_" + year] + `</p>
        </div>`;
    }
    else
    {
        return `
        <div class=\"side_by_side\">
            <p class=\"list_indent list_pargraph_no_break\">` + semester + ` ` + year + `: </p>
            <a class=\"list_paragraph_spacer list_link\" href=\"` + course.Offering_History[semester + "_" + year] + `\" onclick=\"event.stopPropagation();\" target=\"_blank\">` + course.Offering_History[semester + "_" + year] + `</a>
        </div>`;
    }
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
    var course_page = document.getElementById("course_page");
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
    
    offering_history_list += build_offering_history("Fall", "2023");
    offering_history_list += build_offering_history("Summer", "2023");
    offering_history_list += build_offering_history("Spring", "2023");
    offering_history_list += build_offering_history("Fall", "2022");
    offering_history_list += build_offering_history("Summer", "2022");
    offering_history_list += build_offering_history("Spring", "2022");
    offering_history_list += build_offering_history("Fall", "2021");
    offering_history_list += build_offering_history("Summer", "2021");
    offering_history_list += build_offering_history("Spring", "2021");

    var htmlObj = document.createElement('div');

    htmlObj.id = "course"
    htmlObj.value = course.Track
    
    htmlObj.innerHTML = `
    <div class=\"list_element\">
        <div id=\"tabs\" class=\"animate_open_default\">
            <div>
                <div id=\"tabs_row\" class=\"list_tabs\">
                    <button id=\"all_info\" onclick=\"event.stopPropagation(); swap_tab('all_info', true);\" class=\"tab_button tab_active\">All Information</button>
                    <button id=\"desc_info\" onclick=\"event.stopPropagation(); swap_tab('desc_info', true);\" class=\"tab_button\">Course Description</button>
                    <button id=\"coord_info\" onclick=\"event.stopPropagation(); swap_tab('coord_info', true);\" class=\"tab_button\">Coordinator</button>
                    <button id=\"ext_info\" onclick=\"event.stopPropagation(); swap_tab('ext_info', true);\" class=\"tab_button\">External Resources</button>
                    <button id=\"alg_info\" onclick=\"event.stopPropagation(); swap_tab('alg_info', true);\" class=\"tab_button\">ALG Information</button>
                </div>
                <p></p>
            </div>
        </div>
        <p id=\"course_number\" class=\"bold\">` + course.Prefix + ` ` + course.Course_Number + `: ` + course.Course_Name + `</p>
        <div id=\"course_body\" class=\"animate_open_default\">
            <div>
                <div id=\"credit_hours\" class=\"list_fade_element\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p>Credit Hours: </p>
                        <p class=\"list_paragraph_spacer\">` + course.Credit_Hours + `</p>
                    </div>
                </div>
                <div id=\"prerequisite\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p>Prerequisite: </p>
                        <p class=\"list_paragraph_spacer\">` + course.Prerequisite + `</p>
                    </div>
                </div>
                <div id=\"description\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p>Description: </p>
                        <p class=\"list_paragraph_spacer\">` + course.Description + `</p>
                    </div>
                </div>
                <div id=\"learning_outcomes\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p>Learning Outcomes: </p>
                    </div>
                    ` + learning_outcomes_list + `
                </div>
                <div id=\"schedule\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p>Course Permanent Schedule:</p>
                    </div>
                    <div class=\"schedule_table\">
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
                    <button id=\"legend_button\" onclick=\"event.stopPropagation(); open_legend();\" class=\"legend_button\">Open Legend</button>
                    <div id=\"legend_table\" class=\"animate_open\">
                        <div>
                            <div class=\"legend_table\">
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
                    <div class=\"table_padder\">
                    </div>
                </div>
                <div id=\"coordinator_table\">
                    <p></p>
                    <div id=\"coordinator_label\" class=\"side_by_side\">
                        <p>Course Coordinator:</p>
                    </div>
                    <div class=\"coordinator_table_deco\">
                        <p class=\"header_row table_data\">Course Coordinator</p>
                        <p class=\"header_row table_data\">Coordinator Email</p>
                        <p class=\"header_row table_data\">D2L Master Link</p>
                        <p class=\"data_row table_data\">` + course.First_Name + ` ` + course.Last_Name + `</p>
                        <p class=\"data_row table_data\">` + course.Email + `</p>
                        <a class=\"data_row table_data list_link\" href=\"` + course.D2L_Master_Link + `\" onclick=\"event.stopPropagation();\" target=\"_blank\">` + course.D2L_Master_Link + `</a>
                    </div>
                </div>
                <div id=\"syllabus_link\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p>Syllabus Link: </p>
                        <a class=\"list_paragraph_spacer list_link\" href=\"` + course.Syllabus_Link + `\" onclick=\"event.stopPropagation();\" target=\"_blank\">` + course.Syllabus_Link + `</a>
                    </div>
                </div>
                <div id=\"offering_history\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p>Offering History: </p>
                    </div>
                    ` + offering_history_list + `
                </div>
                <div id=\"catalog_link\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p>Course Catalog Link: </p>
                        <a class=\"list_paragraph_spacer list_link\" href=\"` + course.Course_Catalog_Link + `\" onclick=\"event.stopPropagation();\" target=\"_blank\">` + course.Course_Catalog_Link + `</a>
                    </div>
                </div>
                <div id=\"owlexpress_link\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"list_pargraph_no_break\">OwlExpress Link: </p>
                        <a class=\"list_paragraph_spacer list_link\" href=\"` + course.OwlExpress_Link + `\" onclick=\"event.stopPropagation();\" target=\"_blank\">` + course.OwlExpress_Link + `</a>
                    </div>
                </div>
                <div id=\"curriculog_link\">
                    <p></p>                
                    <div class=\"side_by_side\">
                        <p>Curriculog Link: </p>
                        <a class=\"list_paragraph_spacer list_link\" href=\"` + course.Curriculog_Link + `\" onclick=\"event.stopPropagation();\" target=\"_blank\">` + course.Curriculog_Link + `</a>
                    </div>
                </div>
                <div id=\"alg_eligibility\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p>ALG Eligibility: </p>
                        <p class=\"list_paragraph_spacer\">` + course.ALG_Eligible + `</p>
                    </div>
                </div>
                <div id=\"alg_round_history\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p>ALG Round History: </p>
                        <p class=\"list_paragraph_spacer\">` + course.History_Round_And_Developer + `</p>
                    </div>
                </div>
                <div id=\"alg_developer\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p>ALG Developer: </p>
                        <p class=\"list_paragraph_spacer\">` + course.ALG_Developer + `</p>
                    </div>
                </div>
                <div id=\"latest_alg_round\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p>Latest ALG Round: </p>
                        <p class=\"list_paragraph_spacer\">` + course.Latest_ALG_Round + `</p>
                    </div>
                </div>
                <div id=\"latest_alg_developer\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p>Latest ALG Developer: </p>
                        <p class=\"list_paragraph_spacer\">` + course.Latest_Developer + `</p>
                    </div>
                </div>
                <div id=\"memo\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p>Memo: </p>
                        <p class=\"list_paragraph_spacer\">` + course.Memo + `</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    course_page.appendChild(htmlObj);
}

async function main()
{
    query_prefix = query.get("course").replace(/[0-9]*/g, "");
    query_course = query.get("course").replace(/[A-Z]*/g, "");

    await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-vbliq/endpoint/courses?p=' + query_prefix + '&n=' + query_course)
            .then(res => {
                if (res.ok == true)
                {
                    console.log("We got the course data from the data server.")
                }
                else
                {
                    console.log("There was a data server error.")
                }
                return res
            })
            .then(res => res.json())
            .then(data => 
                {
                    course = data;
                })
            .catch(error => console.log(error));

    load_page_element();
    
    
}

main();