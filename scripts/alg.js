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



function sort_array_by_alg(array)
{
    console.log("check")
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



function order_by()
{
    document.getElementById("list_body").innerHTML = ""

    if (order_by_selector.value == "ALG")
    {  
        sort_array_by_alg(all_course_data);
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