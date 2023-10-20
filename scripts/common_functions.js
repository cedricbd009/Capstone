var prefix_selector = document.getElementById("prefix_selector");
var offered_selector = document.getElementById("offered_selector");
var search_bar = document.getElementById("search_bar");
var filter_coodinator = document.getElementById("filter_coodinator");
var degree_selector = document.getElementById("degree_selector");
var order_by_selector = document.getElementById("order_by_selector");
var list_body = document.getElementById("list_body");

var tracks = 
    ["IT Foundation Courses", "Required Core Courses", "Common Electives",
    "Data Analytics and Intelligent Technology", "Information Technology Security",
    "Health Information Technology", "Enterprise IT Management"];



function store_course(id)
{
    sessionStorage.setItem("stored_course", JSON.stringify(all_course_data[id]))
}



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



function order_by()
{
    list_body.innerHTML = ""

    if (order_by_selector.value == "Coordinator")
    {  
        sort_array_by_coordinator(all_course_data);
    }
    else if (order_by_selector.value == "ALG")
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



function filter_results()
{
    for (i = 0; i < all_course_data.length; i++)
    {
        if ((prefix_selector == null || prefix_selector.value == "All Prefixes" || all_course_data[i].Prefix.toLowerCase().includes(prefix_selector.value.toLowerCase()) == true) &&
            (offered_selector == null || offered_selector.value == "All Semesters" ||  all_course_data[i].Course_Schedule[offered_selector.value].includes("-") == false) &&
            (search_bar == null || search_bar.value == "" || all_course_data[i].Course_Number.includes(search_bar.value) == true) &&
            (filter_coodinator == null || filter_coodinator.value == "" || (all_course_data[i].First_Name.toLowerCase()  + " " + all_course_data[i].Last_Name.toLowerCase()).includes(filter_coodinator.value.toLowerCase()) == true) &&
            (degree_selector == null || degree_selector.value == "All Degrees" || all_course_data[i].Degree.toLowerCase().includes(degree_selector.value.toLowerCase()) == true))
        {
            document.getElementById("course" + i).style.gridTemplateRows = "1fr";
        }
        else
        {
            document.getElementById("course" + i).style.gridTemplateRows = "0fr";
        }
    }

    if (document.getElementById(tracks[0]) != null)
    {
        hide_empty_tracks();
    }
}



function hide_empty_tracks()
{
    for (i = 0; i < tracks.length; i++)
    {
        var hide = true;
        
        for (j = 0; j < document.getElementById(tracks[i]).children.length; j++)
        {
            if (document.getElementById(tracks[i]).children[j].style.gridTemplateRows === "1fr")
            {
                hide = false;
            }
        }

        if (hide == true)
        {
            document.getElementById(tracks[i] + " top").style.gridTemplateRows = "0fr";
        }
        else
        {
            document.getElementById(tracks[i] + " top").style.gridTemplateRows = "1fr";
        }
    }
}