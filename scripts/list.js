fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-vbliq/endpoint/courses')
    .then(res => {
        if (res.ok == true)
        {
            console.log("We got the course data.")
        }
        else
        {
            console.log("Could not get course data.")
        }
        return res
    })
    .then(res => res.json())
    .then(data => 
    {
        desc_info_data = data;
    })
    .catch(error => console.log(error));

var desc_info_data = [];
var coord_info_data = [{
    "_id": {
      "$oid": "650b4afa49a0ccc435836842"
    },
    "Course_Number": "IT 5413",
    "First_Name": "Yixin",
    "Last_Name": "Xie",
    "Email": "yxie11@kennesaw.edu",
    "D2L_Master_Link": "https://kennesaw.view.usg.edu/d2l/home/2805854"
  }];
var ext_info_data = [{
    "_id": {
      "$oid": "650daf6df2a8e3746ec1b7e8"
    },
    "Course_Number": "IT 5413",
    "Syllabus_Link": "https://drive.google.com/file/d/1RbmuJMz8w-pOo3Bqjr7lf7FlBntqfFWx/view?usp=sharing",
    "Course_Learning_Outcomes": [
      "Analyze, design, develop and implement programs in an object oriented language to meet specific business requirements.",
      "Analyze the needs of an enterprise in relationship to programming applications.",
      "Conduct independent research on a subject related to the course material."
    ],
    "Offering_History": {
      "Fall_2023": "https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_disp_listcrse?term_in=202308&subj_in=IT&crse_in=5413&schd_in=A",
      "Summer_2023": "Not offered",
      "Spring_2023": "https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_disp_listcrse?term_in=202301&subj_in=IT&crse_in=5413&schd_in=A",
      "Fall_2022": "https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_disp_listcrse?term_in=202208&subj_in=IT&crse_in=5413&schd_in=A",
      "Summer_2022": "https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_disp_listcrse?term_in=202205&subj_in=IT&crse_in=5413&schd_in=A",
      "Spring_2022": "https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_disp_listcrse?term_in=202201&subj_in=IT&crse_in=5413&schd_in=A",
      "Fall_2021": "https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_disp_listcrse?term_in=202108&subj_in=IT&crse_in=5413&schd_in=A",
      "Summer_2021": "https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_disp_listcrse?term_in=202105&subj_in=IT&crse_in=5413&schd_in=A",
      "Spring_2021": "https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_disp_listcrse?term_in=202101&subj_in=IT&crse_in=5413&schd_in=A"
    },
    "Course_Catalog_Link": "https://catalog.kennesaw.edu/preview_course.php?catoid=67&coid=104084",
    "OwlExpress_Link": "https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_disp_course_detail?cat_term_in=202308&subj_code_in=IT&crse_numb_in=5413",
    "Curriculog_Link": "https://kennesaw.curriculog.com/proposal:11270/form"
  }];
var alg_info_data = [{
    "_id": {
      "$oid": "6503bbb2e225f40fd02b3edb"
    },
    "Course_Number": "IT 5413",
    "ALG_Eligible": "Yes",
    "History_Round_And_Developer": "R13-422",
    "ALG_Developer": "Meng Han",
    "Latest_ALG_Round": "R21",
    "Latest_Developer": "Meng Han",
    "Note": "None"
  }];

var desc_info_enum = 
[
    "description", "credit_hours", "prerequisite", "learning_outcomes", "schedule", "memo"
];
var coord_info_enum = 
[
    "coordinator_name", "coordinator_email", "d2l_master_link"
];
var ext_info_enum = 
[
    "syllabus_link", "offering_history", "catalog_link", "owlexpress_link", "curriculog_link"
];
var alg_info_enum = 
[
    "alg_eligibility", "alg_round_history", "alg_developer", "latest_alg_round", "latest_alg_developer"
];

var prefix_selector = document.getElementById("prefix_selector");
var offered_selector = document.getElementById("offered_selector");
var search_bar = document.getElementById("search_bar");
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



function sort_array(array)
{
    array.sort(
        function(in_1, in_2)
        {
            var check_1 = in_1.Course_Number.toLowerCase();
            var check_2 = in_2.Course_Number.toLowerCase();
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
    if (document.getElementById("tabs" + id).style.gridTemplateRows == "1fr")
    {
        document.getElementById("tabs" + id).style.gridTemplateRows = "0fr";
        document.getElementById("description" + id).style.gridTemplateRows = "0fr";
        document.getElementById("course_body" + id).style.gridTemplateRows = "0fr";
        await sleep(500);
        await swap_tab("desc_info", id, false)
        document.getElementById("description" + id).style.gridTemplateRows = "1fr";
    }
    else
    {
        document.getElementById("tabs" + id).style.gridTemplateRows = "1fr";
        document.getElementById("course_body" + id).style.gridTemplateRows = "1fr";
        await swap_tab("desc_info", id, false)
    }    
}



async function swap_tab(switch_tab, id, animate)
{
    var tabs = document.getElementById("tabs_row" + id).children;
    var body = document.getElementById("course_body" + id).children[0].children;
    var description = document.getElementById("description" + id);
    var description_row = document.getElementById("description_row" + id);

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
        description.style.gridTemplateRows = "0fr";
        await sleep(500);
    }

    if (switch_tab == "desc_info")
    {
        description_row.style.display = "block";

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
    else if (switch_tab == "coord_info")
    {
        description_row.style.display = "none";

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
    else if (switch_tab == "ext_info")
    {
        description_row.style.display = "none";

        for (i = 0; i < body.length; i++)
        {
            if (ext_info_enum.includes(body[i].getAttribute("id").replace(/[0-9]*$/g, "")))
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
        description_row.style.display = "none";

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
        description_row.style.display = "block";

        for (i = 0; i < body.length; i++)
        {
            body[i].style.display = "block";
        }
    }

    if (animate == true)
    {
        document.getElementById("course_body" + id).style.gridTemplateRows = "1fr";
        description.style.gridTemplateRows = "1fr";
    }
}



function filter_results()
{
    for (i = 0; i < document.getElementById("list_body").children.length; i++)
    {
        if ((prefix_selector.value == "All Prefixes" || document.getElementById("course_number" + i).textContent.includes(prefix_selector.value + " ") == true) &&
            (offered_selector.value == "All Semesters" || document.getElementById(offered_selector.value + "_value" + i).textContent.toLowerCase().includes("-") == false) &&
            (search_bar.value == "" || document.getElementById("course_number" + i).textContent.includes(search_bar.value) == true) &&
            (track_selector.value == "All Tracks" || document.getElementById("course" + i).value.includes(track_selector.value) == true))
        {
            document.getElementById("course" + i).style.gridTemplateRows = "1fr";
        }
        else
        {
            document.getElementById("course" + i).style.gridTemplateRows = "0fr";
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



function build_offering_history(semester, year)
{
    if (ext_info_data[0].Offering_History[semester + "_" + year].toLowerCase() == "not offered")
    {
        return `
        <div class=\"side_by_side\">
            <p class=\"list_indent list_pargraph_no_break\">` + semester + ` ` + year + `: </p>
            <p class=\"list_paragraph_spacer\">` + ext_info_data[0].Offering_History[semester + "_" + year] + `</p>
        </div>`;
    }
    else
    {
        return `
        <div class=\"side_by_side\">
            <p class=\"list_indent list_pargraph_no_break\">` + semester + ` ` + year + `: </p>
            <a class=\"list_paragraph_spacer list_link\" href=\"` + ext_info_data[0].Offering_History[semester + "_" + year] + `\" onclick=\"event.stopPropagation();\" target=\"_blank\">` + ext_info_data[0].Offering_History[semester + "_" + year] + `</a>
        </div>`;
    }
}



function load_list_element()
{
    var list_body = document.getElementById("list_body");

    sort_array_by_ind(desc_info_data);
    sort_array(coord_info_data);
    sort_array(ext_info_data);
    sort_array(alg_info_data);

    for (i = 0; i < desc_info_data.length; i++)
    {
        var learning_outcomes_list = ""
        var offering_history_list = ""

        if (ext_info_data[0].Course_Learning_Outcomes[0] == "None")
        {
            learning_outcomes_list = `
            <div class=\"side_by_side\">
                <p class=\"list_paragraph_spacer list_indent\">` + ext_info_data[0].Course_Learning_Outcomes[0] + `</p>
            </div>`
        }
        else
        {
            for (k = 0; k < ext_info_data[0].Course_Learning_Outcomes.length; k ++)
            {
                learning_outcomes_list += `
                <div class=\"side_by_side\">
                    <p class=\"list_indent\">` + (k + 1) + `. </p>
                    <p class=\"list_paragraph_spacer\">` + ext_info_data[0].Course_Learning_Outcomes[k] + `</p>
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

        htmlObj.classList.add("animate_open_default");
        htmlObj.id = "course" + i
        htmlObj.value = desc_info_data[i].Track

        htmlObj.innerHTML = `
        <div>
            <div onclick=\"open_course(` + i + `)\" class=\"list_element\">
                <div id=\"tabs` + i + `\" class=\"animate_open\">
                    <div>
                        <div id=\"tabs_row` + i + `\" class=\"list_tabs\">
                            <button id=\"all_info\" onclick=\"event.stopPropagation(); swap_tab('all_info', ` + i + `, true);\" class=\"tab_button\">All Information</button>
                            <button id=\"desc_info\" onclick=\"event.stopPropagation(); swap_tab('desc_info', ` + i + `, true);\" class=\"tab_button tab_active\">Course Description</button>
                            <button id=\"coord_info\" onclick=\"event.stopPropagation(); swap_tab('coord_info', ` + i + `, true);\" class=\"tab_button\">Coordinator</button>
                            <button id=\"ext_info\" onclick=\"event.stopPropagation(); swap_tab('ext_info', ` + i + `, true);\" class=\"tab_button\">External Resources</button>
                            <button id=\"alg_info\" onclick=\"event.stopPropagation(); swap_tab('alg_info', ` + i + `, true);\" class=\"tab_button\">ALG Information</button>
                        </div>
                        <p></p>
                    </div>
                </div>
                <p id=\"course_number` + i + `\" class=\"bold\">` + desc_info_data[i].Prefix + ` ` + desc_info_data[i].Course_Number + `</p>
                <p id=\"course_name` + i + `\" class=\"bold\">` + desc_info_data[i].Course_Name + `</p>
                <div id=\"description` + i + `\"  class=\"animate_open_default\">
                    <div>
                        <div id=\"description_row` + i +`\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>Description: </p>
                                <p class=\"list_paragraph_spacer\">` + desc_info_data[i].Description + `</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id=\"course_body` + i + `\" class=\"animate_open\">
                    <div>
                        <div id=\"credit_hours` + i + `\" class=\"list_fade_element\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>Credit Hours: </p>
                                <p class=\"list_paragraph_spacer\">` + desc_info_data[i].Credit_Hours + `</p>
                            </div>
                        </div>
                        <div id=\"prerequisite` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>Prerequisite: </p>
                                <p class=\"list_paragraph_spacer\">` + desc_info_data[i].Prerequisite + `</p>
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
                            <div class=\"side_by_side\">
                                <p>Course Permanent Schedule:</p>
                            </div>
                            <div class=\"side_by_side\">
                                <p class=\"list_indent\">Fall Odd: </p>
                                <p id=\"fall_odd_value` + i + `\" class=\"list_paragraph_spacer\">` + desc_info_data[i].Course_Schedule.Fall_Odd + `</p>
                            </div>
                            <div class=\"side_by_side\">
                                <p class=\"list_indent\">Summer Odd: </p>
                                <p id=\"summer_odd_value` + i + `\" class=\"list_paragraph_spacer\">` + desc_info_data[i].Course_Schedule.Summer_Odd + `</p>
                            </div>
                            <div class=\"side_by_side\">
                                <p class=\"list_indent\">Spring Odd: </p>
                                <p id=\"spring_odd_value` + i + `\" class=\"list_paragraph_spacer\">` + desc_info_data[i].Course_Schedule.Spring_Odd + `</p>
                            </div>
                            <div class=\"side_by_side\">
                                <p class=\"list_indent\">Fall Even: </p>
                                <p id=\"fall_even_value` + i + `\" class=\"list_paragraph_spacer\">` + desc_info_data[i].Course_Schedule.Fall_Even + `</p>
                            </div>
                            <div class=\"side_by_side\">
                                <p class=\"list_indent\">Summer Even: </p>
                                <p id=\"summer_even_value` + i + `\" class=\"list_paragraph_spacer\">` + desc_info_data[i].Course_Schedule.Summer_Even + `</p>
                            </div>
                            <div class=\"side_by_side\">
                                <p class=\"list_indent\">Spring Even: </p>
                                <p id=\"spring_even_value` + i + `\" class=\"list_paragraph_spacer\">` + desc_info_data[i].Course_Schedule.Spring_Even + `</p>
                            </div>
                        </div>
                        <div id=\"coordinator_name` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>Course Coordinator: </p>
                                <p class=\"list_paragraph_spacer\">` + coord_info_data[0].First_Name + ` ` + coord_info_data[0].Last_Name + `</p>
                            </div>
                        </div>
                        <div id=\"coordinator_email` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>Coordinator Email: </p>
                                <p class=\"list_paragraph_spacer\">` + coord_info_data[0].Email + `</p>
                            </div>
                        </div>
                        <div id=\"d2l_master_link` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>D2L Master Link: </p>
                                <a class=\"list_paragraph_spacer list_link\" href=\"` + coord_info_data[0].D2L_Master_Link + `\" onclick=\"event.stopPropagation();\" target=\"_blank\">` + coord_info_data[0].D2L_Master_Link + `</a>
                            </div>
                        </div>
                        <div id=\"syllabus_link` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>Syllabus Link: </p>
                                <a class=\"list_paragraph_spacer list_link\" href=\"` + ext_info_data[0].Syllabus_Link + `\" onclick=\"event.stopPropagation();\" target=\"_blank\">` + ext_info_data[0].Syllabus_Link + `</a>
                            </div>
                        </div>
                        <div id=\"offering_history` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>Offering History: </p>
                            </div>
                            ` + offering_history_list + `
                        </div>
                        <div id=\"catalog_link` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>Course Catalog Link: </p>
                                <a class=\"list_paragraph_spacer list_link\" href=\"` + ext_info_data[0].Course_Catalog_Link + `\" onclick=\"event.stopPropagation();\" target=\"_blank\">` + ext_info_data[0].Course_Catalog_Link + `</a>
                            </div>
                        </div>
                        <div id=\"owlexpress_link` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p class=\"list_pargraph_no_break\">OwlExpress Link: </p>
                                <a class=\"list_paragraph_spacer list_link\" href=\"` + ext_info_data[0].OwlExpress_Link + `\" onclick=\"event.stopPropagation();\" target=\"_blank\">` + ext_info_data[0].OwlExpress_Link + `</a>
                            </div>
                        </div>
                        <div id=\"curriculog_link` + i + `\">
                            <p></p>                
                            <div class=\"side_by_side\">
                                <p>Curriculog Link: </p>
                                <a class=\"list_paragraph_spacer list_link\" href=\"` + ext_info_data[0].Curriculog_Link + `\" onclick=\"event.stopPropagation();\" target=\"_blank\">` + ext_info_data[0].Curriculog_Link + `</a>
                            </div>
                        </div>
                        <div id=\"alg_eligibility` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>ALG Eligibility: </p>
                                <p class=\"list_paragraph_spacer\">` + alg_info_data[0].ALG_Eligible + `</p>
                            </div>
                        </div>
                        <div id=\"alg_round_history` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>ALG Round History: </p>
                                <p class=\"list_paragraph_spacer\">` + alg_info_data[0].History_Round_And_Developer + `</p>
                            </div>
                        </div>
                        <div id=\"alg_developer` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>ALG Developer: </p>
                                <p class=\"list_paragraph_spacer\">` + alg_info_data[0].ALG_Developer + `</p>
                            </div>
                        </div>
                        <div id=\"latest_alg_round` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>Latest ALG Round: </p>
                                <p class=\"list_paragraph_spacer\">` + alg_info_data[0].Latest_ALG_Round + `</p>
                            </div>
                        </div>
                        <div id=\"latest_alg_developer` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>Latest ALG Developer: </p>
                                <p class=\"list_paragraph_spacer\">` + alg_info_data[0].Latest_Developer + `</p>
                            </div>
                        </div>
                        <div id=\"memo` + i + `\">
                            <p></p>
                            <div class=\"side_by_side\">
                                <p>Memo: </p>
                                <p class=\"list_paragraph_spacer\">` + desc_info_data[0].Memo + `</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        for (j = 0; j < htmlObj.children[0].children[0].children[4].children[0].children.length; j++)
        {
            htmlObj.children[0].children[0].children[4].children[0].children[j].style.display = "none";
        }

        list_body.appendChild(htmlObj);
    }
}
