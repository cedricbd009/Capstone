var prefix_selector = document.getElementById("prefix_selector");
var offered_selector = document.getElementById("offered_selector");
var search_bar = document.getElementById("search_bar");
var filter_coodinator = document.getElementById("filter_coodinator");
var degree_selector = document.getElementById("degree_selector");



function sort_array_by_id(array)
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
        if ((prefix_selector.value == "All Prefixes" || all_course_data[i].Prefix.toLowerCase().includes(prefix_selector.value.toLowerCase()) == true) &&
            (offered_selector.value == "All Semesters" ||  all_course_data[i].Course_Schedule[offered_selector.value].includes("-") == false) &&
            (search_bar.value == "" || all_course_data[i].Course_Number.includes(search_bar.value) == true) &&
            (filter_coodinator.value == "" || (all_course_data[i].First_Name.toLowerCase()  + " " + all_course_data[i].Last_Name.toLowerCase()).includes(filter_coodinator.value.toLowerCase()) == true) &&
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



function store_course(id)
{
    sessionStorage.setItem("stored_course", JSON.stringify(all_course_data[id]))
}



function load_list_element()
{
    var list_body = document.getElementById("list_body");
    var learning_outcomes_list = ""

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
        htmlObj.id = "course" + i;

        htmlObj.innerHTML = `
        <div>
            <div class=\"list_element\"> 
                <a id=\"course_number` + i + `\" class=\"list_link size_to_content title_size\" href=\"./Viewer?course=` + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
                <div id=\"credit_hours` + i + `\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Credit Hours: </p>
                        <p class=\"list_paragraph_spacer\">` + all_course_data[i].Credit_Hours + `</p>
                    </div>
                </div>
                <div id=\"prerequisite` + i + `\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Prerequisite: </p>
                        <p class=\"list_paragraph_spacer\">` + all_course_data[i].Prerequisite + `</p>
                    </div>
                </div>
                <div id=\"description` + i +`\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Description: </p>
                        <p class=\"list_paragraph_spacer\">` + all_course_data[i].Description + `</p>
                    </div>
                </div>
                <div id=\"learning_outcomes` + i + `\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Learning Outcomes: </p>
                    </div>
                    ` + learning_outcomes_list + `
                </div>
            </div>
        </div>`;

        list_body.appendChild(htmlObj);
    }
}

// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    sort_array_by_id(all_course_data);

    load_list_element();
}