function sort_array_by_alg(array)
{
    array.sort(
        function(in_1, in_2)
        {
            var check_1 = in_1.Latest_ALG_Round.toLowerCase() + " " + in_1.History_Round_And_Developer.toLowerCase() + " " + in_1.Prefix.toLowerCase() + " " + in_1.Course_Number.toLowerCase();
            var check_2 = in_2.Latest_ALG_Round.toLowerCase() + " " + in_2.History_Round_And_Developer.toLowerCase() + " " + in_2.Prefix.toLowerCase() + " " + in_2.Course_Number.toLowerCase();
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



function load_list_element()
{
    for (i = 0; i < all_course_data.length; i++)
    {
        var htmlObj = document.createElement('div');

        htmlObj.classList.add("animate_open_default");
        htmlObj.id = "course" + i;

        htmlObj.innerHTML = `
        <div>
            <div class=\"list_element\">  
                <a id=\"course_number` + i + `\" class=\"list_link size_to_content title_size\" href=\"./Viewer?course=` + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
                <div id=\"alg_eligibility` + i + `\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">ALG Eligibility: </p>
                        <p class=\"list_paragraph_spacer\">` + all_course_data[i].ALG_Eligible + `</p>
                    </div>
                </div>
                <div id=\"alg_round_history` + i + `\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">ALG Round History: </p>
                        <p class=\"list_paragraph_spacer\">` + all_course_data[i].History_Round_And_Developer + `</p>
                    </div>
                </div>
                <div id=\"alg_developer` + i + `\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">ALG Developer: </p>
                        <p class=\"list_paragraph_spacer\">` + all_course_data[i].ALG_Developer + `</p>
                    </div>
                </div>
                <div id=\"latest_alg_round` + i + `\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Latest ALG Round: </p>
                        <p class=\"list_paragraph_spacer\">` + all_course_data[i].Latest_ALG_Round + `</p>
                    </div>
                </div>
                <div id=\"latest_alg_developer` + i + `\">
                    <p></p>
                    <div class=\"side_by_side\">
                        <p class=\"bold\">Latest ALG Developer: </p>
                        <p class=\"list_paragraph_spacer\">` + all_course_data[i].Latest_Developer + `</p>
                    </div>
                </div
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