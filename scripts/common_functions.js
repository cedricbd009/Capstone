var prefix_selector = document.getElementById("prefix_selector");
var offered_selector = document.getElementById("offered_selector");
var search_bar = document.getElementById("search_bar");
var degree_selector = document.getElementById("degree_selector");
var order_by_course = document.getElementById("order_by_course");
var order_by_coordinator = document.getElementById("order_by_coordinator");
var order_by_alg = document.getElementById("order_by_alg");
var group_selector = document.getElementById("group_selector");
var list_body = document.getElementById("list_body");
var left_sidebar = document.getElementById("left_sidebar");
var right_sidebar = document.getElementById("right_sidebar");
var no_group = document.getElementById("no_group");
var track_group = document.getElementById("track_group");
var no_group_img = document.getElementById("no_group_img");
var track_group_img = document.getElementById("track_group_img");
var alg_group_img = document.getElementById("alg_group_img");
var coord_group_img = document.getElementById("coord_group_img");
var program_catalogs_table = document.getElementById("program_catalogs_table");
var sort_course_arrow = document.getElementById("sort_course_arrow");
var sort_round_arrow = document.getElementById("sort_round_arrow");

var site_title = "KSU IT Curriculum Portal";
var alg_sort = false;

var link_list =
{
    Syllabus_Repository: "https://cedricbd009.github.io/Capstone/Syllabus/",
    Course_List: "./index.html",
    Course_Description: "./Description.html",
    Permanent_Schedule: "./Schedule.html",
    Course_Coordinator: "./Coordinator.html",
    ALG_Information: "./ALG.html",
    Curriculum_Resources: "./Curriculum.html",
    MSIT_Flowchart: "./Flowchart.html",
    MSIT_Flowchart_Printable: "./Print_Flowchart.html",
    Course_Information: "./Viewer.html?course=",
    About_Page: "./About.html"
};

var tracks = 
    ["IT Foundation Courses", "Required Core Courses",
    "Data Analytics and Intelligent Technology", "Enterprise IT Management", "Health Information Technology", "Information Technology Security",
    "Common Electives"];

var tracks_certificates = 
    ["Data Analytics and Intelligent Technology", "Enterprise IT Management", "Health Information Technology", "Information Technology Security"];



function set_site_title(title_extension)
{
    document.title = site_title + title_extension;
}



function set_site_title_course(title_extension)
{
    document.title = title_extension;
}



function store_course(id)
{
    sessionStorage.setItem("stored_course", JSON.stringify(all_course_data[id]))
}



function check_key(event)
{
    if (event.key == "Enter")
    {
        filter_results();
    }
}



function hide_sidebar(side, displacement)
{
    if (side == "left")
    {
        if (left_sidebar.style.left >= "0px" || left_sidebar.style.left == "")
        {
            left_sidebar.style.left = "-" + displacement + "px";
        }
        else
        {
            left_sidebar.style.left = "0px";
        }
    }
    
    if (side == "right")
    {
        if (right_sidebar.style.right >= "0px" || right_sidebar.style.right == "")
        {
            right_sidebar.style.right = "-" + displacement + "px";
        }
        else
        {
            right_sidebar.style.right = "0px";
        }
    }
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



function sort_array_by_full_round(array)
{
    array.sort(
        function(in_1, in_2)
        {
            var check_1 = in_1.Latest_ALG_Round.toLowerCase() + " " + in_1.Prefix.toLowerCase() + " " + in_1.Course_Number.toLowerCase();
            var check_2 = in_2.Latest_ALG_Round.toLowerCase() + " " + in_2.Prefix.toLowerCase() + " " + in_2.Course_Number.toLowerCase();
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



function sort_array_by_round(array)
{
    array.sort(
        function(in_1, in_2)
        {
            var check_1 = in_1.Round.toLowerCase();
            var check_2 = in_2.Round.toLowerCase();
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



function sort_array_by_grant(array)
{
    array.sort(
        function(in_1, in_2)
        {
            var check_1 = in_1.Grant.toLowerCase();
            var check_2 = in_2.Grant.toLowerCase();
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

    return array;
}



function order_by(order_style)
{
    if (order_style == "Coordinator" && order_by_course.className.includes("tab_active"))
    {  
        list_body.innerHTML = "";

        order_by_course.className = order_by_course.className.replace(" tab_active", "");
        coord_group_img.className = coord_group_img.className.replace(" hidden", "");
        order_by_coordinator.className += " tab_active";
        no_group_img.className += " hidden";
        
        sort_array_by_coordinator(all_course_data);

        load_list_element();
        filter_results();
    }
    else if (order_style == "Course Number" && order_by_coordinator.className.includes("tab_active"))
    {
        list_body.innerHTML = "";

        order_by_coordinator.className = order_by_coordinator.className.replace(" tab_active", "");
        no_group_img.className = no_group_img.className.replace(" hidden", "");
        order_by_course.className += " tab_active";
        coord_group_img.className += " hidden";

        sort_array_by_id(all_course_data);

        load_list_element();
        filter_results();
    }
    else if (order_style == "Arrow Round")
    {
        list_body.innerHTML = "";

        sort_array_by_full_round(all_course_data)

        load_list_element();
        filter_results();
    }
    else if (order_style == "Arrow Course Number")
    {
        list_body.innerHTML = "";

        sort_array_by_id(all_course_data)

        load_list_element();
        filter_results();
    }
}



function group_by(type)
{
    sort_array_by_id(all_course_data);

    if (type == "track" && document.getElementById(tracks[0]) == null)
    {
        list_body.innerHTML = ""

        no_group.className = no_group.className.replace(" tab_active", "");
        track_group_img.className = track_group_img.className.replace(" hidden", "");
        track_group.className += " tab_active";
        no_group_img.className += " hidden";

        create_groups();
        load_list_element();
        filter_results();
    }
    else if (type == "alg" && alg_sort == false)
    {
        list_body.innerHTML = ""
        alg_sort = true;

        order_by_course.className = order_by_course.className.replace(" tab_active", "");
        alg_group_img.className = alg_group_img.className.replace(" hidden", "");
        order_by_alg.className += " tab_active";
        no_group_img.className += " hidden";

        create_groups();
        load_group_list_element();
        filter_results();
    }
    else if (type == "none" && (document.getElementById(tracks[0]) != null || alg_sort == true))
    {
        list_body.innerHTML = "";
        alg_sort = false;

        if (track_group != null)
        {
            track_group.className = track_group.className.replace(" tab_active", "");
            no_group_img.className = no_group_img.className.replace(" hidden", "");
            no_group.className += " tab_active";
            track_group_img.className += " hidden";
        }
        else if (order_by_alg != null)
        {
            order_by_alg.className = order_by_alg.className.replace(" tab_active", "");
            no_group_img.className = no_group_img.className.replace(" hidden", "");
            order_by_course.className += " tab_active";
            alg_group_img.className += " hidden";
        }

        load_list_element();
        filter_results();
    }
}



function reset_filters()
{
    if (prefix_selector != null)
    {
        prefix_selector.selectedIndex = 0;
    }

    if (offered_selector != null)
    {
        offered_selector.selectedIndex = 0;
    }

    if (search_bar != null)
    {
        search_bar.value = "";
    }

    if (degree_selector != null)
    {
        degree_selector.selectedIndex = 0;
    }

    filter_results();
}



function filter_results()
{
    for (i = 0; i < all_course_data.length; i++)
    {
        if ((prefix_selector == null || prefix_selector.value == "All Prefixes" || all_course_data[i].Prefix.toLowerCase().includes(prefix_selector.value.toLowerCase()) == true) &&
            (offered_selector == null || offered_selector.value == "All Semesters" ||  all_course_data[i].Course_Schedule[offered_selector.value].includes("-") == false) &&
            (search_bar == null || search_bar.value == "" || all_course_data[i].Course_Number.toLowerCase().includes(search_bar.value.toLowerCase()) == true ||
            all_course_data[i].Course_Name.toLowerCase().includes(search_bar.value.toLowerCase()) == true || (all_course_data[i].Description.toLowerCase().includes(search_bar.value.toLowerCase()) == true && order_by_alg == null && order_by_coordinator == null) ||
            (all_course_data[i].Latest_Developer.toLowerCase().includes(search_bar.value.toLowerCase()) == true && order_by_alg != null) || 
            ((all_course_data[i].Coordinator_Name.toLowerCase().includes(search_bar.value.toLowerCase()) == true  || all_course_data[i].Co_Coordinator_Name.toLowerCase().includes(search_bar.value.toLowerCase()) == true) && order_by_alg == null)) &&
            (degree_selector == null || degree_selector.value == "All Degrees" || all_course_data[i].Degree.toLowerCase().includes(degree_selector.value.toLowerCase()) == true))
        {
            if (document.getElementById("course" + i) != null)
            {
                document.getElementById("course" + i).style.gridTemplateRows = "1fr";
            }
            else if (document.getElementsByClassName("course" + i).length > 0)
            {
                for (j = 0; j < document.getElementsByClassName("course" + i).length; j++)
                {
                    document.getElementsByClassName("course" + i)[j].style.gridTemplateRows = "1fr";
                }
            }
        }
        else
        {
            if (document.getElementById("course" + i) != null)
            {
                document.getElementById("course" + i).style.gridTemplateRows = "0fr";
            }
            else if (document.getElementsByClassName("course" + i).length > 0)
            {
                for (j = 0; j < document.getElementsByClassName("course" + i).length; j++)
                {
                    document.getElementsByClassName("course" + i)[j].style.gridTemplateRows = "0fr";
                }
            }
        }
    }

    if (document.getElementById(tracks[0]) != null)
    {
        hide_empty_tracks();
    }

    if (alg_sort == true)
    {
        hide_empty_rounds_and_grants();
    }
}



function filter_by_faculty(name)
{
    search_bar.value = name;

    filter_results()
}



function hide_empty_tracks()
{
    for (i = 0; i < tracks.length; i++)
    {
        var hide = true;
        
        for (j = 0; j < document.getElementById(tracks[i]).children.length; j++)
        {
            if (document.getElementById(tracks[i]).children[j].style.gridTemplateRows == "1fr")
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

    for (i = 0; i < tracks_certificates.length; i++)
    {
        var hide = true;
        
        for (j = 0; j < document.getElementById("track_certificate_group").children.length; j++)
        {
            if (document.getElementById("track_certificate_group").children[j].style.gridTemplateRows == "1fr")
            {
                hide = false;
            }
        }

        if (hide == true)
        {
            document.getElementById("track_certificate_group_top").style.gridTemplateRows = "0fr";
        }
        else
        {
            document.getElementById("track_certificate_group_top").style.gridTemplateRows = "1fr";
        }
    }
}



function hide_empty_rounds_and_grants()
{
    for (i = 0; i < list_body.children.length; i++)
    {
        var hide_round = true;
        var round = list_body.children[i];
        var round_number = round.id.replace(" top", "");
        var grants = document.getElementById(round_number + "_grant_list").children;
        
        for (j = 0; j < grants.length; j++)
        {
            var hide_grant = true;
            var grant = grants[j].children[0].children[0].children;

            for (k = 0; k < grant.length; k++)
            {
                if (grant[k].style.gridTemplateRows === "1fr")
                {
                    hide_round = false;
                    hide_grant = false;
                }
            }

            if (hide_grant == true)
            {
                grants[j].style.gridTemplateRows = "0fr";
            }
            else
            {
                grants[j].style.gridTemplateRows = "1fr";
            }
        }

        if (hide_round == true)
        {
            round.style.gridTemplateRows = "0fr";
        }
        else
        {
            round.style.gridTemplateRows = "1fr";
        }
    }
}