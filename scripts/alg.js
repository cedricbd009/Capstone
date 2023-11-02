function load_list_element()
{
    list_body.innerHTML = `
    <div id=\"coordinator_header\" class=\"list_header\">
        <div>
            <div class=\"table_base alg_row\">
                <p class=\"header_row table_data\">Course</p>
                <p class=\"header_row table_data\">Latest Round</p>
                <p class=\"header_row table_data\">Latest Developer</p>
                <p class=\"header_row table_data\">OER Materials</p>
                <p class=\"header_row table_data\">History</p>
            </div>
        </div>
    </div>`;

    for (i = 0; i < all_course_data.length; i++)
    {
        var oer_links = `<p class=\"zero_margin\">None</p>`

        if (all_course_data[i].OER_Links.Website != "None")
        {
            oer_links = `<a href=\"` + all_course_data[i].OER_Links.Website + `\" target=\"_blank\">Website</a>`
        }

        if (all_course_data[i].OER_Links.OpenALG != "None")
        {
            if (oer_links == `<p class=\"zero_margin\">None</p>`)
            {
                oer_links = `<a href=\"` + all_course_data[i].OER_Links.OpenALG + `\" target=\"_blank\">OpenALG</a>`;
            }
            else
            {
                oer_links += `<a class=\"list_stack_margin\" href=\"` + all_course_data[i].OER_Links.OpenALG + `\" target=\"_blank\">OpenALG</a>`;
            }
        }

        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = "course" + i;

        html_obj.innerHTML = `
        <div>
            <div id=\"coordinator_table` + i + `\">
                <div class=\"table_base alg_row\">
                    <a class=\"data_row table_data\" href=\"` + link_list.Course_Information + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
                    <p class=\"data_row table_data\">` + all_course_data[i].Latest_ALG_Round + `</p>
                    <p class=\"data_row table_data\">` + all_course_data[i].Latest_Developer + `</p>
                    <div class=\"data_row table_data\">
                        <div class=\"verticle_stack\">
                            ` + oer_links + `
                        </div>
                    </div>
                    <p class=\"data_row table_data\">` + all_course_data[i].History_Round_And_Developer + `</p>   
                </div>
            </div>
        </div>`;

        list_body.appendChild(html_obj);
    }
}



function load_group_list_element()
{
    for (i = 0; i < all_course_data.length; i++)
    {
        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.classList.add("course" + i);

        html_obj.innerHTML = `
        <div>
            <div class=\"side_by_side list_indent\">
                <a class=\"unbold tall_list_margin\" href=\"` + link_list.Course_Information + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
                <p class=\"space_before unbold tall_list_margin\">(` + all_course_data[i].Latest_Developer + `)</p>
            </div>
        </div>`;

        var course_rounds = all_course_data[i].Latest_ALG_Round.split("/");
        var course_history = all_course_data[i].History_Round_And_Developer.split("/");

        push_grant_information(course_rounds, html_obj);
        push_grant_information(course_history, html_obj);
    }
}



function push_grant_information(grants, html_obj)
{
    if (grants != "None")
    {
        for (j = 0; j < grants.length; j++)
        {
            if (grants[j].includes("-"))
            {
                document.getElementById(grants[j]).appendChild(html_obj.cloneNode(true));
            }
            else
            {
                if (document.getElementById(grants[j] + "no_grant_specified") != null)
                {
                    document.getElementById(grants[j] + "no_grant_specified").appendChild(html_obj.cloneNode(true));
                }
                else
                {
                    empty_grant = document.createElement('div');
                    empty_grant.classList.add("animate_open_default");
                    
                    empty_grant.innerHTML = `
                    <div>
                        <p id=\"` + grants[j] + `no_grant_specified\" class=\"bold\">Grant # Not Specified:</p>
                    </div>`;

                    document.getElementById(grants[j] + "_grant_list").appendChild(empty_grant);
                    document.getElementById(grants[j] + "no_grant_specified").appendChild(html_obj.cloneNode(true));
                }
            }
        }
    }
}



function create_groups()
{
    for (i = 0; i < all_grant_data.length; i++)
    {
        var grants_list = ""

        var round_grants = [];

        if (all_grant_data[i].Grants != undefined)
        {
            round_grants = sort_array_by_grant(all_grant_data[i].Grants);

            for (j = 0; j < round_grants.length; j++)
            {
                var grant_line = ""

                if (round_grants[j].OER_Repo == "Not Provided")
                {
                    grant_line = `<p id=\"` + all_grant_data[i].Round + `-` + round_grants[j].Grant + `\" class=\"bold\">Grant # ` + round_grants[j].Grant + `: ` + round_grants[j].Value + `</p>`
                }
                else
                {
                    grant_line = `<a id=\"` + all_grant_data[i].Round + `-` + round_grants[j].Grant + `\" class=\"bold list_link black_text\" href=\"` + round_grants[j].OER_Repo + `\" target=\"_blank\">Grant # ` + round_grants[j].Grant + `: ` + round_grants[j].Value + `</a>`
                }

                grants_list += `
                <div class=\"animate_open_default\">
                    <div>    
                        ` + grant_line + `
                    </div>
                </div>`;
            }
        }

        html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = all_grant_data[i].Round + " top";

        html_obj.innerHTML = `
        <div>
            <div class=\"list_element background_color table_base list_element_row\">  
                <p class=\"bold\">Round ` + all_grant_data[i].Round.replace("R", "") + `<br>` + all_grant_data[i].Year + `</p>
                <div id=\"` + all_grant_data[i].Round + `_grant_list\">
                    ` + grants_list + `
                </div>
            </div>
        </div>`;

        list_body.appendChild(html_obj);
    }
}

// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    set_site_title(" - ALG Information");

    sort_array_by_id(all_course_data);
    sort_array_by_round(all_grant_data);

    load_list_element();
}