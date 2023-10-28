var program_options = ["IT7993", "IT7999"]

function make_pdf()
{
    for (i = 0; i < all_course_data.length; i++)
    {
        var link = "./Viewer.html?course=" + all_course_data[i].Prefix + all_course_data[i].Course_Number;

        var prerequisite_element = "";

        if (all_course_data[i].Prerequisite.toLowerCase() != "none")
        {
            prerequisite_element = "<p class=\"zero_margin\">(" + all_course_data[i].Prerequisite + ")</p>"
        }

        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = "course" + i;

        html_obj.innerHTML = `
        <div class=\"solid_border flex_stack\">
            <a href=\"` + link + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
            ` + prerequisite_element + `
        </div>`;

        if (program_options.includes(all_course_data[i].Prefix + all_course_data[i].Course_Number))
        {    
            document.getElementById(all_course_data[i].Prefix + all_course_data[i].Course_Number).appendChild(html_obj);
        }
        else
        {
            document.getElementById(all_course_data[i].Track).appendChild(html_obj);
        }
    }
}



function check_key_highlight(event)
{
    if (event.key == "Enter")
    {
        higlight_course();
    }
}



function higlight_course()
{
    for (i = 0; i < all_course_data.length; i++)
    {
        if ((all_course_data[i].Course_Number.toLowerCase().includes(search_bar.value.toLowerCase()) == true ||
            all_course_data[i].Course_Name.toLowerCase().includes(search_bar.value.toLowerCase()) == true) &&
            (all_course_data[i].Prefix.toLowerCase().includes(prefix_selector.value.toLowerCase()) == true || prefix_selector.value == "All Prefixes")  &&
            (all_course_data[i].Degree.toLowerCase().includes(degree_selector.value.toLowerCase()) == true || degree_selector.value == "All Degrees") &&
            !(search_bar.value == "" && prefix_selector.value == "All Prefixes" && degree_selector.value == "All Degrees"))
        {
            document.getElementById("course" + i).style.backgroundColor = "#def434";
        }
        else
        {
            document.getElementById("course" + i).style.backgroundColor = "transparent ";
        }
    }
}



function reset_highlight()
{
    if (prefix_selector != null)
    {
        prefix_selector.selectedIndex = 0;
    }

    if (search_bar != null)
    {
        search_bar.value = "";
    }

    if (degree_selector != null)
    {
        degree_selector.selectedIndex = 0;
    }

    higlight_course();
}



function print_pdf()
{
    document.getElementById("print_button").style.display = "none";
    window.print();
    document.getElementById("print_button").style.display = "block";
}



// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    make_pdf();
}