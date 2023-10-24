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
                <a id=\"course_number` + i + `\" class=\"title_size space_before\" href=\"./Viewer.html?course=` + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
            </div>        
        </div>`;

        if (document.getElementById(all_course_data[0].Track) != null)
        {    
            document.getElementById(all_course_data[i].Track).appendChild(htmlObj);
        }
        else
        {
            htmlObj.classList.add("background_color");
            list_body.appendChild(htmlObj);
        }
    }
}


function create_groups()
{
    for (i = 0; i < tracks.length; i++)
    {
        htmlObj = document.createElement('div');

        htmlObj.classList.add("animate_open_default");
        htmlObj.id = tracks[i] + " top";

        htmlObj.innerHTML = `
        <div>
            <div class=\"list_element background_color\">  
                <p class=\"title_size bold\">` + tracks[i] + `:</p>
                <div id=\"` + tracks[i] + `\"></div>
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

    create_groups();

    load_list_element();
}