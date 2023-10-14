var prefix_selector = document.getElementById("prefix_selector");
var offered_selector = document.getElementById("offered_selector");
var search_bar = document.getElementById("search_bar");
var filter_coodinator = document.getElementById("filter_coodinator");
var degree_selector = document.getElementById("degree_selector");
var order_by_selector = document.getElementById("order_by_selector");


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



function order_by()
{
    document.getElementById("list_body").innerHTML = ""

    if (order_by_selector.value == "Coordinator")
    {  
        sort_array_by_coordinator(all_course_data);
    }
    else
    {
        sort_array_by_id(all_course_data);
    }

    load_list_element();

    filter_results();
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