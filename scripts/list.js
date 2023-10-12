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
var track_selector = document.getElementById("track_selector");



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



async function open_course(id)
{
    if (document.getElementById("course_body" + id).style.gridTemplateRows == "1fr")
    {
        document.getElementById("course_body" + id).style.gridTemplateRows = "0fr";
        document.getElementById("tabs" + id).style.gridTemplateRows = "0fr";
        await sleep(500);
    }
    else
    {
        swap_tab('desc_info', id, false);
        document.getElementById("course_body" + id).style.gridTemplateRows = "1fr";
        document.getElementById("tabs" + id).style.gridTemplateRows = "1fr";
    }    
}



function open_legend(id)
{
    if (document.getElementById("legend_table" + id).style.gridTemplateRows == "1fr")
    {
        document.getElementById("legend_table" + id).style.gridTemplateRows = "0fr";
        document.getElementById("legend_button" + id).innerHTML = "Open Legend";
    }
    else
    {
        document.getElementById("legend_table" + id).style.gridTemplateRows = "1fr";
        document.getElementById("legend_button" + id).innerHTML = "Close Legend";
    }    
}



function filter_results()
{
    for (i = 0; i < document.getElementById("list_body").children.length; i++)
    {
        if ((prefix_selector.value == "All Prefixes" || document.getElementById("course_number" + i).textContent.toLowerCase().includes(prefix_selector.value.toLowerCase() + " ") == true) &&
            (offered_selector.value == "All Semesters" ||  all_course_data[i].Course_Schedule[offered_selector.value].includes("-") == false) &&
            (search_bar.value == "" || document.getElementById("course_number" + i).textContent.includes(search_bar.value) == true) &&
            (filter_coodinator.value == "" || (all_course_data[i].First_Name + " " + all_course_data[i].Last_Name).toLowerCase().includes(filter_coodinator.value.toLowerCase()) == true) &&
            (track_selector.value == "All Tracks" || document.getElementById("course" + i).value.toLowerCase().includes(track_selector.value.toLowerCase()) == true))
        {
            document.getElementById("course" + i).style.gridTemplateRows = "1fr";
        }
        else
        {
            document.getElementById("course" + i).style.gridTemplateRows = "0fr";
        }
    }    
}



async function swap_tab(switch_tab, id, animate)
{
    var tabs = document.getElementById("tabs_row" + id).children;
    var body = document.getElementById("course_body" + id).children[0].children;

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
        document.getElementById("course_body" + id).style.gridTemplateRows = "0fr";
        await sleep(500);
    }

    if (switch_tab == "sched_info")
    {
        for (i = 0; i < body.length; i++)
        {
            if (sched_info_enum.includes(body[i].getAttribute("id").replace(/[0-9]*$/g, "")))
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
        for (i = 0; i < body.length; i++)
        {
            if (coord_info_enum.includes(body[i].getAttribute("id").replace(/[0-9]*$/g, "")))
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
            if (alg_info_enum.includes(body[i].getAttribute("id").replace(/[0-9]*$/g, "")))
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
            if (desc_info_enum.includes(body[i].getAttribute("id").replace(/[0-9]*$/g, ""))) 
            {
                body[i].style.display = "block";
            }
            else
            {
                body[i].style.display = "none";
            }
        }
    }

    if (animate == true)
    {
        document.getElementById("course_body" + id).style.gridTemplateRows = "1fr";
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
        htmlObj.value = all_course_data[i].Track

        htmlObj.innerHTML = `
        <div>
            <div onclick=\"open_course(` + i + `)\" class=\"list_element show_pointer\">  
                <div id=\"tabs` + i + `\" class=\"animate_open\">
                    <div>
                        <div id=\"tabs_row` + i + `\" class=\"list_tabs\">
                            <button id=\"desc_info\" onclick=\"event.stopPropagation(); swap_tab('desc_info', ` + i + `, true);\" class=\"tab_button tab_active\">Course Description</button>
                            <button id=\"sched_info\" onclick=\"event.stopPropagation(); swap_tab('sched_info', ` + i + `, true);\" class=\"tab_button\">Schedule Information</button>
                            <button id=\"coord_info\" onclick=\"event.stopPropagation(); swap_tab('coord_info', ` + i + `, true);\" class=\"tab_button\">Coordinator Information</button>
                            <button id=\"alg_info\" onclick=\"event.stopPropagation(); swap_tab('alg_info', ` + i + `, true);\" class=\"tab_button\">ALG Information</button>
                        </div>
                        <p></p>
                    </div>
                </div>
                <a id=\"course_number` + i + `\" class=\"bold list_link size_to_content\" href=\"./Viewer?course=` + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"event.stopPropagation();\" target=\"_blank\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
                <div id=\"course_body` + i + `\" class=\"animate_open\">
                    <div>
                        <div id=\"credit_hours` + i + `\" class=\"list_fade_element\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>Credit Hours: </p>
                                <p class=\"list_paragraph_spacer\">` + all_course_data[i].Credit_Hours + `</p>
                            </div>
                        </div>
                        <div id=\"prerequisite` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>Prerequisite: </p>
                                <p class=\"list_paragraph_spacer\">` + all_course_data[i].Prerequisite + `</p>
                            </div>
                        </div>
                        <div id=\"description` + i +`\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>Description: </p>
                                <p class=\"list_paragraph_spacer\">` + all_course_data[i].Description + `</p>
                            </div>
                        </div>
                        <div id=\"learning_outcomes` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>Learning Outcomes: </p>
                            </div>
                            ` + learning_outcomes_list + `
                        </div>
                        <div id=\"schedule` + i + `\">
                          <p></p>
                          <div class=\"schedule_table\">
                              <p class=\"header_row table_data\">Fall Odd</p>
                              <p class=\"header_row table_data\">Summer Odd</p>
                              <p class=\"header_row table_data\">Spring Odd</p>
                              <p class=\"header_row table_data\">Fall Even</p>
                              <p class=\"header_row table_data\">Summer Even</p>
                              <p class=\"header_row table_data\">Spring Even</p>
                              <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Fall_Odd + `</p>
                              <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Summer_Odd + `</p>
                              <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Spring_Odd + `</p>
                              <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Fall_Even + `</p>
                              <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Summer_Even + `</p>
                              <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Spring_Even + `</p>
                          </div>
                          <button id=\"legend_button` + i + `\" onclick=\"event.stopPropagation(); open_legend(` + i + `);\" class=\"legend_button\">Open Legend</button>
                          <div id=\"legend_table` + i + `\" class=\"animate_open\">
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
                      <div id=\"coordinator_table` + i + `\">
                          <p></p>
                          <div class=\"coordinator_table_deco\">
                              <p class=\"header_row table_data\">Course Coordinator</p>
                              <p class=\"header_row table_data\">Coordinator Email</p>
                              <p class=\"header_row table_data\">D2L Master Link</p>
                              <p class=\"data_row table_data\">` + all_course_data[i].First_Name + ` ` + all_course_data[i].Last_Name + `</p>
                              <p class=\"data_row table_data\">` + all_course_data[i].Email + `</p>
                              <a class=\"data_row table_data list_link\" href=\"` + all_course_data[i].D2L_Master_Link + `\" onclick=\"event.stopPropagation();\" target=\"_blank\">` + all_course_data[i].D2L_Master_Link + `</a>
                          </div>
                      </div>
                      <div id=\"alg_eligibility` + i + `\">
                          <p></p>
                          <div class=\"side_by_side\">
                              <p>ALG Eligibility: </p>
                              <p class=\"list_paragraph_spacer\">` + all_course_data[i].ALG_Eligible + `</p>
                          </div>
                      </div>
                      <div id=\"alg_round_history` + i + `\">
                          <p></p>
                          <div class=\"side_by_side\">
                              <p>ALG Round History: </p>
                              <p class=\"list_paragraph_spacer\">` + all_course_data[i].History_Round_And_Developer + `</p>
                          </div>
                      </div>
                      <div id=\"alg_developer` + i + `\">
                          <p></p>
                          <div class=\"side_by_side\">
                              <p>ALG Developer: </p>
                              <p class=\"list_paragraph_spacer\">` + all_course_data[i].ALG_Developer + `</p>
                          </div>
                      </div>
                      <div id=\"latest_alg_round` + i + `\">
                          <p></p>
                          <div class=\"side_by_side\">
                              <p>Latest ALG Round: </p>
                              <p class=\"list_paragraph_spacer\">` + all_course_data[i].Latest_ALG_Round + `</p>
                          </div>
                      </div>
                      <div id=\"latest_alg_developer` + i + `\">
                          <p></p>
                          <div class=\"side_by_side\">
                              <p>Latest ALG Developer: </p>
                              <p class=\"list_paragraph_spacer\">` + all_course_data[i].Latest_Developer + `</p>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>`;

        list_body.appendChild(htmlObj);
    }
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