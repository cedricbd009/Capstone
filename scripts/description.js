function load_list_element()
{
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