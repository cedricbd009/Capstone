var program_options = ["IT7993", "IT7999"]

function make_pdf()
{
    for (i = 0; i < all_course_data.length; i++)
    {
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
            <a href=\"` + link_list.Course_Information + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
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



function make_printable_pdf()
{
    for (i = 0; i < all_course_data.length; i++)
    {
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
            <p class=\"zero_margin\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</p>
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
            search_bar.value.toLowerCase() != "")
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
    if (search_bar != null)
    {
        search_bar.value = "";
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
    sort_array_by_id(all_course_data);
    
    if (document.getElementById("print_page_button") != null)
    {
        document.getElementById("print_page_button").href = link_list.MSIT_Flowchart_Printable;
        make_pdf();
    }
    else
    {
        make_printable_pdf();
    }
}