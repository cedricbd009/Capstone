function sort_array_by_coordinator(array)
{
    array.sort(
        function(in_1, in_2)
        {
            var check_1 = in_1.Last_Name.toLowerCase() + " " + in_1.First_Name.toLowerCase() + " " + in_1.Prefix.toLowerCase() + " " + in_1.Course_Number.toLowerCase();
            var check_2 = in_2.Last_Name.toLowerCase() + " " + in_2.First_Name.toLowerCase() + " " + in_2.Prefix.toLowerCase() + " " + in_2.Course_Number.toLowerCase();
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
            <div class=\"list_element_no_bg\">  
                <div id=\"coordinator_table` + i + `\">
                    <div class=\"table_base four_row\">
                        <a class=\"data_row table_data\" href=\"./Viewer?course=` + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `</a>
                        <p id=\"coordinator_name` + i + `\" class=\"data_row table_data\">` + all_course_data[i].First_Name + ` ` + all_course_data[i].Last_Name + `</p>
                        <p class=\"data_row table_data\">` + all_course_data[i].Email + `</p>
                        <a class=\"data_row table_data list_link\" href=\"` + all_course_data[i].D2L_Master_Link + `\" target=\"_blank\">` + all_course_data[i].D2L_Master_Link + `</a>
                    </div>
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