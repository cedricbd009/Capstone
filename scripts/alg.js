function load_list_element()
{
    list_body.innerHTML = `
    <div id=\"coordinator_header\" class=\"list_header\">
        <div>
            <div class=\"table_base alg_row\">
                <p class=\"header_row table_data\">
                    Course
                    <button id=\"sort_course_arrow\" class=\"sort_arrow_button\" onclick=\"order_by('Arrow Course Number');\">
                        <img class=\"sort_arrow_button\" src=\"resources/triangle.webp\" alt=\"Sort\">
                    </button>
                </p>
                <p class=\"header_row table_data\">
                    Latest Grant
                    <button id=\"sort_round_arrow\" class=\"sort_arrow_button\" onclick=\"order_by('Arrow Round');\">
                        <img class=\"sort_arrow_button\" src=\"resources/triangle.webp\" alt=\"Sort\">
                    </button>
                </p>
                <p class=\"header_row table_data\">Latest Developer</p>
                <p class=\"header_row table_data\">OER Materials</p>
                <p class=\"header_row table_data\">Course Coordinator</p>
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

        var latest_developers = all_course_data[i].Latest_Developer.split(", ");
        var latest_developers_list = "";

        for (l = 0; l < latest_developers.length; l++)
        {
            latest_developers_list += `<a onclick=\"filter_by_faculty('` + latest_developers[l] + `');\" class=\"special_link\">` + latest_developers[l] + `</a>`;

            if (l < latest_developers.length - 1)
            {
                latest_developers_list += `<p class="inline_block zero_margin_with_space">,</p>`
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
                    <p class=\"data_row table_data\">` + generate_latest_round() + `</p>
                    <div class=\"data_row table_data side\">` + latest_developers_list + `</div>
                    <div class=\"data_row table_data\">
                        <div class=\"verticle_stack\">
                            ` + oer_links + `
                        </div>
                    </div>
                    <div class=\"data_row table_data side\">` + all_course_data[i].Coordinator_Name + `, ` + all_course_data[i].Co_Coordinator_Name + `</div>
                </div>
            </div>
        </div>`;

        list_body.appendChild(html_obj);
    }
}



function generate_latest_round()
{
    if (all_course_data[i].Latest_ALG_Round != "None")
    {
        var round = all_course_data[i].Latest_ALG_Round.split("-")[0].replace("R", "");
        var grant = all_course_data[i].Latest_ALG_Round.split("-")[1];
        var iterator = 0

        for (iterator = 0; iterator < all_grant_data.length; iterator++)
        {
            if (all_grant_data[iterator].Round == "R" + round)
            {
                break;
            }
        }

        return `Round ` + round + ` (` + all_grant_data[iterator].Year + `)<br># ` + grant;
    }
    else
    {
        return "None";
    }
}



function load_group_list_element()
{
    for (i = 0; i < all_course_data.length; i++)
    {
        var latest_developers = all_course_data[i].Latest_Developer.split(", ");
        var latest_developers_list = "";

        for (l = 0; l < latest_developers.length; l++)
        {
            latest_developers_list += `<a onclick=\"filter_by_faculty('` + latest_developers[l] + `');\" class=\"special_link tall_list_margin unbold\">` + latest_developers[l] + `</a>`;

            if (l < latest_developers.length - 1)
            {
                latest_developers_list += `<p class="tall_list_margin space_after">,</p>`
            }
        }


        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.classList.add("course" + i);

        html_obj.innerHTML = `
        <div>
            <div class=\"side_by_side list_indent\">
                <a class=\"unbold tall_list_margin\" href=\"` + link_list.Course_Information + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
                <p class=\"space_before unbold tall_list_margin\">(</p>
                ` + latest_developers_list + `
                <p class=\"unbold tall_list_margin\">)</p>
            </div>
        </div>`;

        var course_rounds = all_course_data[i].Latest_ALG_Round;
        var course_history = all_course_data[i].History;

        push_grant_information(course_rounds, html_obj);
        push_array_grant_information(course_history, html_obj);
    }
}



function push_grant_information(grant, html_obj)
{
    if (grant != "None")
    {
        if (grant.includes("-"))
        {
            document.getElementById(grant).appendChild(html_obj.cloneNode(true));
        }
        else
        {
            if (document.getElementById(grant + "no_grant_specified") != null)
            {
                document.getElementById(grant + "no_grant_specified").appendChild(html_obj.cloneNode(true));
            }
            else
            {
                empty_grant = document.createElement('div');
                empty_grant.classList.add("animate_open_default");
                
                empty_grant.innerHTML = `
                <div>
                    <p id=\"` + grant + `no_grant_specified\" class=\"bold\">Grant # Not Specified:</p>
                </div>`;

                document.getElementById(grant + "_grant_list").appendChild(empty_grant);
                document.getElementById(grant + "no_grant_specified").appendChild(html_obj.cloneNode(true));
            }
        }
    }
}



function push_array_grant_information(grants, html_obj)
{
    if (grants != undefined)
    {
        for (j = 0; j < grants.length; j++)
        {
            if (grants[j].Round.includes("-"))
            {
                document.getElementById(grants[j].Round).appendChild(html_obj.cloneNode(true));
            }
            else
            {
                if (document.getElementById(grants[j].Round + "no_grant_specified") != null)
                {
                    document.getElementById(grants[j].Round + "no_grant_specified").appendChild(html_obj.cloneNode(true));
                }
                else
                {
                    empty_grant = document.createElement('div');
                    empty_grant.classList.add("animate_open_default");
                    
                    empty_grant.innerHTML = `
                    <div>
                        <p id=\"` + grants[j].Round + `no_grant_specified\" class=\"bold\">Grant # Not Specified:</p>
                    </div>`;

                    document.getElementById(grants[j].Round + "_grant_list").appendChild(empty_grant);
                    document.getElementById(grants[j].Round + "no_grant_specified").appendChild(html_obj.cloneNode(true));
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
                    grant_line = `
                    <div id=\"` + all_grant_data[i].Round + `-` + round_grants[j].Grant + `\">
                        <a class=\"bold list_link black_text\" href=\"` + round_grants[j].OER_Repo + `\" target=\"_blank\">Grant # ` + round_grants[j].Grant + `: ` + round_grants[j].Value + `</a>
                    </div>`;
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