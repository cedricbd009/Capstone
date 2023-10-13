var all_course_data = [];

var desc_info_enum = 
[
    "description", "credit_hours", "prerequisite", "learning_outcomes"
];

var sched_info_enum = 
[
    "schedule"
];

var coord_info_enum = 
[
    "coordinator_table"
];

var alg_info_enum = 
[
    "alg_eligibility", "alg_round_history", "alg_developer", "latest_alg_round", "latest_alg_developer"
];

var prefix_selector = document.getElementById("prefix_selector");
var offered_selector = document.getElementById("offered_selector");
var search_bar = document.getElementById("search_bar");
var filter_coodinator = document.getElementById("filter_coodinator");
var degree_selector = document.getElementById("degree_selector");



function sort_array_by_ind(array)
{
    array.sort(
        function(in_1, in_2)
        {
            var check_1 = in_1.Prefix.toLowerCase() + " " + in_1.Course_Number.toLowerCase();
            var check_2 = in_2.Prefix.toLowerCase() + " " + in_2.Course_Number.toLowerCase();
            if (check_1 < check_2)
            {
                return -1;
            }
            if (check_1 > check_2)
            {
                return 1;
            }
        }
    );
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



function filter_results()
{
    for (i = 0; i < document.getElementById("list_body").children.length; i++)
    {
        if ((prefix_selector.value == "All Prefixes" || document.getElementById("course_number" + i).textContent.toLowerCase().includes(prefix_selector.value.toLowerCase() + " ") == true) &&
            (offered_selector.value == "All Semesters" ||  all_course_data[i].Course_Schedule[offered_selector.value].includes("-") == false) &&
            (search_bar.value == "" || document.getElementById("course_number" + i).textContent.includes(search_bar.value) == true) &&
            (filter_coodinator.value == "" || document.getElementById("coordinator_name" + i).textContent.toLowerCase().includes(filter_coodinator.value.toLowerCase()) == true) &&
            (degree_selector.value == "All Degrees" || all_course_data[i].Degree.toLowerCase().includes(degree_selector.value.toLowerCase()) == true))
        {
            document.getElementById("course" + i).style.gridTemplateRows = "1fr";
        }
        else
        {
            document.getElementById("course" + i).style.gridTemplateRows = "0fr";
        }
    }    
}



function would_pass_filter(id)
{
    if ((prefix_selector.value == "All Prefixes" || document.getElementById("course_number" + id).textContent.toLowerCase().includes(prefix_selector.value.toLowerCase() + " ") == true) &&
        (offered_selector.value == "All Semesters" ||  all_course_data[id].Course_Schedule[offered_selector.value].includes("-") == false) &&
        (search_bar.value == "" || document.getElementById("course_number" + id).textContent.includes(search_bar.value) == true) &&
        (filter_coodinator.value == "" || document.getElementById("coordinator_name" + id).textContent.toLowerCase().includes(filter_coodinator.value.toLowerCase()) == true) &&
        (degree_selector.value == "All Degrees" || all_course_data[i].Degree.toLowerCase().includes(degree_selector.value.toLowerCase()) == true))
    {
        return true
    }
    else
    {
        return false
    }    
}



async function swap_page(switch_tab, animate)
{
    for (id = 0; id < document.getElementById("list_body").children.length; id++)
    {
        if (animate == true)
        {
            document.getElementById("course" + id).style.gridTemplateRows = "0fr";
            document.getElementById("schedule_header").style.gridTemplateRows = "0fr";
            document.getElementById("coordinator_header").style.gridTemplateRows = "0fr";
        }
        else
        {
            document.getElementById("schedule_header").style.height = "0";
            document.getElementById("coordinator_header").style.height = "0";
        }

        if (document.getElementById("legend_table").style.gridTemplateRows == "1fr")
        {
            open_legend();
        }
    }

    if (animate == true)
    {
        await sleep(500);
    }

    for (id = 0; id < document.getElementById("list_body").children.length; id++)
    {
        var body = document.getElementById("course_body" + id).children;

        document.getElementById("course_number_hider" + id).style.height = "auto";

        if (switch_tab == "desc_info")
        {
            for (i = 0; i < body.length; i++)
            {
                if (desc_info_enum.includes(body[i].getAttribute("id").replace(/[0-9]*$/g, ""))) 
                {
                    body[i].style.height = "auto";
                }
                else
                {
                    body[i].style.height = "0";
                }
            }
        }
        else if (switch_tab == "sched_info")
        {
            document.getElementById("course_number_hider" + id).style.height = "0";
            if (animate == true)
            {
                document.getElementById("schedule_header").style.gridTemplateRows = "1fr";
            }
            else
            {
                document.getElementById("schedule_header").style.height = "auto";
            }

            for (i = 0; i < body.length; i++)
            {
                if (sched_info_enum.includes(body[i].getAttribute("id").replace(/[0-9]*$/g, "")))
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
            document.getElementById("course_number_hider" + id).style.height = "0";
            if (animate == true)
            {
                document.getElementById("coordinator_header").style.gridTemplateRows = "1fr";
            }
            else
            {
                document.getElementById("coordinator_header").style.height = "auto";
            }

            for (i = 0; i < body.length; i++)
            {
                if (coord_info_enum.includes(body[i].getAttribute("id").replace(/[0-9]*$/g, "")))
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
                if (alg_info_enum.includes(body[i].getAttribute("id").replace(/[0-9]*$/g, "")))
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
                body[i].style.height = "0";
            }
        }
    
        if (animate == true && would_pass_filter(id))
        {
            document.getElementById("course" + id).style.gridTemplateRows = "1fr";
        }
    }   
}



function sleep(miliseconds)
{
    return new Promise(timeout =>
        {
            setTimeout(timeout, miliseconds)
        });
}



function load_list_element()
{
    var list_body = document.getElementById("list_body");
    var learning_outcomes_list = ""

    sort_array_by_ind(all_course_data);

    for (i = 0; i < all_course_data.length; i++)
    {
        var learning_outcomes_list = ""
        if (all_course_data[i].Course_Learning_Outcomes[0] == "None")
        {
            learning_outcomes_list = `
            <div class=\"side_by_side\">
                <p class=\"list_paragraph_spacer list_indent\">` + all_course_data[i].Course_Learning_Outcomes[0] + `</p>
            </div>`
        }
        else
        {
            for (k = 0; k < all_course_data[i].Course_Learning_Outcomes.length; k ++)
            {
                learning_outcomes_list += `
                <div class=\"side_by_side\">
                    <p class=\"list_indent\">` + (k + 1) + `. </p>
                    <p class=\"list_paragraph_spacer\">` + all_course_data[i].Course_Learning_Outcomes[k] + `</p>
                </div>`
            }
        }

        var htmlObj = document.createElement('div');

        htmlObj.classList.add("animate_open_default");
        htmlObj.id = "course" + i

        htmlObj.innerHTML = `
        <div>
            <div class=\"list_element\">  
                <div id=\"course_number_hider` + i + `\" class=\"hide_overflow\">
                    <a id=\"course_number` + i + `\" class=\"bold list_link size_to_content\" href=\"./Viewer?course=` + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" target=\"_blank\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
                </div>
                <div id=\"course_body` + i + `\">
                    <div id=\"credit_hours` + i + `\" class=\"hide_overflow\">
                        <p></p>
                        <div class=\"side_by_side\">
                            <p>Credit Hours: </p>
                            <p class=\"list_paragraph_spacer\">` + all_course_data[i].Credit_Hours + `</p>
                        </div>
                    </div>
                    <div id=\"prerequisite` + i + `\" class=\"hide_overflow\">
                        <p></p>
                        <div class=\"side_by_side\">
                            <p>Prerequisite: </p>
                            <p class=\"list_paragraph_spacer\">` + all_course_data[i].Prerequisite + `</p>
                        </div>
                    </div>
                    <div id=\"description` + i +`\" class=\"hide_overflow\">
                        <p></p>
                        <div class=\"side_by_side\">
                            <p>Description: </p>
                            <p class=\"list_paragraph_spacer\">` + all_course_data[i].Description + `</p>
                        </div>
                    </div>
                    <div id=\"learning_outcomes` + i + `\" class=\"hide_overflow\">
                        <p></p>
                        <div class=\"side_by_side\">
                            <p>Learning Outcomes: </p>
                        </div>
                        ` + learning_outcomes_list + `
                    </div>
                    <div id=\"schedule` + i + `\" class=\"hide_overflow\">
                        <div class=\"table_base seven_row\">
                            <a class=\"data_row table_data\" href=\"./Viewer?course=` + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" target=\"_blank\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `</a>
                            <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Fall_Odd + `</p>
                            <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Summer_Odd + `</p>
                            <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Spring_Odd + `</p>
                            <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Fall_Even + `</p>
                            <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Summer_Even + `</p>
                            <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Spring_Even + `</p>
                        </div>
                    </div>
                    <div id=\"coordinator_table` + i + `\" class=\"hide_overflow\">
                        <div class=\"table_base four_row\">
                            <a class=\"data_row table_data\" href=\"./Viewer?course=` + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" target=\"_blank\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `</a>
                            <p id=\"coordinator_name` + i + `\" class=\"data_row table_data\">` + all_course_data[i].First_Name + ` ` + all_course_data[i].Last_Name + `</p>
                            <p class=\"data_row table_data\">` + all_course_data[i].Email + `</p>
                            <a class=\"data_row table_data list_link\" href=\"` + all_course_data[i].D2L_Master_Link + `\" target=\"_blank\">` + all_course_data[i].D2L_Master_Link + `</a>
                        </div>
                    </div>
                    <div id=\"alg_eligibility` + i + `\" class=\"hide_overflow\">
                        <p></p>
                        <div class=\"side_by_side\">
                            <p>ALG Eligibility: </p>
                            <p class=\"list_paragraph_spacer\">` + all_course_data[i].ALG_Eligible + `</p>
                        </div>
                    </div>
                    <div id=\"alg_round_history` + i + `\" class=\"hide_overflow\">
                        <p></p>
                        <div class=\"side_by_side\">
                            <p>ALG Round History: </p>
                            <p class=\"list_paragraph_spacer\">` + all_course_data[i].History_Round_And_Developer + `</p>
                        </div>
                    </div>
                    <div id=\"alg_developer` + i + `\" class=\"hide_overflow\">
                        <p></p>
                        <div class=\"side_by_side\">
                            <p>ALG Developer: </p>
                            <p class=\"list_paragraph_spacer\">` + all_course_data[i].ALG_Developer + `</p>
                        </div>
                    </div>
                    <div id=\"latest_alg_round` + i + `\" class=\"hide_overflow\">
                        <p></p>
                        <div class=\"side_by_side\">
                            <p>Latest ALG Round: </p>
                            <p class=\"list_paragraph_spacer\">` + all_course_data[i].Latest_ALG_Round + `</p>
                        </div>
                    </div>
                    <div id=\"latest_alg_developer` + i + `\" class=\"hide_overflow\">
                        <p></p>
                        <div class=\"side_by_side\">
                            <p>Latest ALG Developer: </p>
                            <p class=\"list_paragraph_spacer\">` + all_course_data[i].Latest_Developer + `</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        list_body.appendChild(htmlObj);
    }

    swap_page("simple_list", false);
}

async function main()
{
    await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-vbliq/endpoint/courses')
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
                all_course_data = data
            })
        .catch(error => console.log(error));
    
    load_list_element();
}

main();