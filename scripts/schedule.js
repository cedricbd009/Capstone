function open_legend(id)
{
    if (document.getElementById("legend_table" + id).style.gridTemplateRows == "1fr")
    {
        document.getElementById("legend_table" + id).style.gridTemplateRows = "0fr";
        document.getElementById("legend_button" + id).innerHTML = "Open Legend";
    }
    else
    {
        document.getElementById("legend_table" + id).style.gridTemplateRows = "1fr";
        document.getElementById("legend_button" + id).innerHTML = "Close Legend";
    }    
}



function load_list_element()
{
    for (i = 0; i < all_course_data.length; i++)
    {
        var htmlObj = document.createElement('div');

        htmlObj.classList.add("animate_open_default");
        htmlObj.id = "course" + i;

        htmlObj.innerHTML = `
        <div>
            <div class=\"list_element_no_bg\">  
                <div id=\"schedule` + i + `\">
                    <div class=\"table_base seven_row\">
                        <a class=\"data_row table_data\" href=\"./Viewer?course=` + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `</a>
                        <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Fall_Odd + `</p>
                        <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Summer_Odd + `</p>
                        <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Spring_Odd + `</p>
                        <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Fall_Even + `</p>
                        <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Summer_Even + `</p>
                        <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Spring_Even + `</p>
                    </div>
                </div>
            </div>
        </div>`;

        document.getElementById(all_course_data[i].Track).appendChild(htmlObj);
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
            <div class=\"list_element\">  
                <p class=\"title_size bold\">` + tracks[i] + `:</p>
                <div class=\"main_list\">
                    <div id=\"schedule_header\" class=\"list_element_no_bg\">
                        <div>
                            <div class=\"table_base seven_row\">
                                <p class=\"header_row table_data\">Course Number</p>
                                <p class=\"header_row table_data\">Fall Odd</p>
                                <p class=\"header_row table_data\">Summer Odd</p>
                                <p class=\"header_row table_data\">Spring Odd</p>
                                <p class=\"header_row table_data\">Fall Even</p>
                                <p class=\"header_row table_data\">Summer Even</p>
                                <p class=\"header_row table_data\">Spring Even</p>
                            </div>
                            <div class=\"list_size\">
                                <button id=\"legend_button` + i + `\" onclick=\"open_legend(` + i + `);\" class=\"legend_button\">Open Legend</button>
                                <div id=\"legend_table` + i + `\" class=\"animate_open\">
                                    <div>
                                        <div class=\"table_base two_row\">
                                            <p class=\"header_row table_data\">Symbol</p>
                                            <p class=\"header_row table_data\">Meaning</p>
                                            <p class=\"data_row table_data\">D</p>
                                            <p class=\"data_row table_data\">Offered during the day (8am-5pm)</p>
                                            <p class=\"data_row table_data\">E</p>
                                            <p class=\"data_row table_data\">Offered during the evening (5pm-10pm)</p>
                                            <p class=\"data_row table_data\">O</p>
                                            <p class=\"data_row table_data\">Offered online</p>
                                            <p class=\"data_row table_data\">XY</p>
                                            <p class=\"data_row table_data\">Offered both X and Y. E.g. \"EO\" means course is offered both evening and online</p>
                                            <p class=\"data_row table_data\">X/Y</p>
                                            <p class=\"data_row table_data\">Offered either X or Y with preference for X</p>
                                            <p class=\"data_row table_data\">+</p>
                                            <p class=\"data_row table_data\">Offered. Mode and time undetermined</p>
                                            <p class=\"data_row table_data\">-</p>
                                            <p class=\"data_row table_data\">Not guaranteed to be offered</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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