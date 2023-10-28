function load_list_element()
{
    if (document.getElementById(all_course_data[0].Track) == null)
    {    
        list_body.innerHTML = `
        <div id=\"schedule_header\" class=\"list_header contained\">
            <div>
                <div class=\"table_base seven_row\">
                    <p class=\"header_row table_data\">Course</p>
                    <p class=\"header_row table_data\">Fall Odd</p>
                    <p class=\"header_row table_data\">Summer Odd</p>
                    <p class=\"header_row table_data\">Spring Odd</p>
                    <p class=\"header_row table_data\">Fall Even</p>
                    <p class=\"header_row table_data\">Summer Even</p>
                    <p class=\"header_row table_data\">Spring Even</p>
                </div>
            </div>
        </div>`;
    }

    for (i = 0; i < all_course_data.length; i++)
    {
        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.classList.add("contained");
        html_obj.id = "course" + i;

        html_obj.innerHTML = `
        <div>
            <div id=\"schedule` + i + `\">
                <div class=\"table_base seven_row\">
                    <a class=\"data_row table_data\" href=\"` + link_list.Course_Information + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number +  `: ` + all_course_data[i].Course_Name + `</a>
                    <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Fall_Odd + `</p>
                    <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Summer_Odd + `</p>
                    <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Spring_Odd + `</p>
                    <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Fall_Even + `</p>
                    <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Summer_Even + `</p>
                    <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Spring_Even + `</p>
                </div>
            </div>
        </div>`;

        if (document.getElementById(all_course_data[0].Track) != null)
        {    
            document.getElementById(all_course_data[i].Track).appendChild(html_obj);
        }
        else
        {
            list_body.appendChild(html_obj);
        }
    }
}



function create_groups()
{
    for (i = 0; i < tracks.length; i++)
    {
        list_element = "list_element ";

        if (tracks_certificates.includes(tracks[i]))
        {
            list_element = "";
        }

        html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = tracks[i] + " top";

        html_obj.innerHTML = `
        <div>
            <div class=\"`+ list_element + `background_color\">  
                <p class=\"title_size bold\">` + tracks[i] + `:</p>
                <div id=\"schedule_header\" class=\"list_header contained\">
                    <div>
                        <div class=\"table_base seven_row\">
                            <p class=\"header_row table_data\">Course</p>
                            <p class=\"header_row table_data\">Fall Odd</p>
                            <p class=\"header_row table_data\">Summer Odd</p>
                            <p class=\"header_row table_data\">Spring Odd</p>
                            <p class=\"header_row table_data\">Fall Even</p>
                            <p class=\"header_row table_data\">Summer Even</p>
                            <p class=\"header_row table_data\">Spring Even</p>
                        </div>
                    </div>
                </div>
                <div id=\"` + tracks[i] + `\"></div>
            </div>
        </div>`;

        if  (tracks_certificates.includes(tracks[i])) 
        {
            if (document.getElementById("track_certificate_group") == null)
            {
                html_obj_tracks = document.createElement('div');

                html_obj_tracks.classList.add("animate_open_default");
                html_obj_tracks.id = "track_certificate_group_top";

                html_obj_tracks.innerHTML = `
                <div>
                    <div class=\"list_element background_color\">  
                        <p class=\"title_size bold\">Tracks:</p>
                        <div id=\"track_certificate_group\"></div>
                    </div>
                </div>`;

                list_body.appendChild(html_obj_tracks);
            }
            document.getElementById("track_certificate_group").appendChild(html_obj);
        }
        else
        {
            list_body.appendChild(html_obj);
        }
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