function load_list_element()
{
    for (i = 0; i < all_course_data.length; i++)
    {
        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = "course" + i;

        html_obj.innerHTML = `
        <div>
            <div class=\"list_element\">
                <a id=\"course_number` + i + `\" class=\"title_size space_before\" href=\"./Viewer.html?course=` + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
            </div>        
        </div>`;

        if (document.getElementById(all_course_data[0].Track) != null)
        {    
            document.getElementById(all_course_data[i].Track).appendChild(html_obj);
        }
        else
        {
            html_obj.classList.add("background_color");
            list_body.appendChild(html_obj);
        }
    }
}


function create_groups()
{
    for (i = 0; i < tracks.length; i++)
    {
        html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = tracks[i] + " top";

        html_obj.innerHTML = `
        <div>
            <div class=\"list_element background_color\">  
                <p class=\"title_size bold\">` + tracks[i] + `:</p>
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