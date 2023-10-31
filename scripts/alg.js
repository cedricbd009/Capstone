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
        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = "course" + i;

        html_obj.innerHTML = `
        <div>
            <div id=\"coordinator_table` + i + `\">
                <div class=\"table_base alg_row\">
                    <a class=\"data_row table_data\" href=\"` + link_list.Course_Information + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
                    <p class=\"data_row table_data\">` + all_course_data[i].ALG_Eligible + `</p>
                    <p class=\"data_row table_data\">` + all_course_data[i].History_Round_And_Developer + `</p>
                    <p class=\"data_row table_data\">` + all_course_data[i].ALG_Developer + `</p>
                    <p class=\"data_row table_data\">` + all_course_data[i].Latest_ALG_Round + `</p>
                    <p class=\"data_row table_data\">` + all_course_data[i].Latest_Developer + `</p>
                </div>
            </div>
        </div>`;

        list_body.appendChild(html_obj);
    }
}

// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    set_site_title(" - ALG Information");

    sort_array_by_id(all_course_data);

    load_list_element();
}