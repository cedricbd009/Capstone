var program_information = document.getElementById("program_information");
var apps_information = document.getElementById("apps_information");



function sort_array_by_year(array)
{
    array.sort(
        function(in_1, in_2)
        {
            var check_1 = in_1.Catalog_Year;
            var check_2 = in_2.Catalog_Year;
            if (check_1 > check_2)
            {
                return -1;
            }
            if (check_1 < check_2)
            {
                return 1;
            }
        }
    );
}



function load_list_element()
{
    var years = [all_catalog_data.filter(catalog => catalog.Catalog_Year == "2023-2024"), 
    all_catalog_data.filter(catalog => catalog.Catalog_Year == "2022-2023"), 
    all_catalog_data.filter(catalog => catalog.Catalog_Year == "2021-2022")];

    for (i = 0; i < years.length; i++)
    {
        var bsit = years[i].find(catalog => catalog.Program_Short_Name == "BSIT");
        var msit = years[i].find(catalog => catalog.Program_Short_Name == "MSIT");
        var foundation = years[i].find(catalog => catalog.Program_Short_Name == "Foundations");
        var enterprise = years[i].find(catalog => catalog.Program_Short_Name == "Enterprise");
        var health = years[i].find(catalog => catalog.Program_Short_Name == "Health");
        var security = years[i].find(catalog => catalog.Program_Short_Name == "Security");
        var analytics = years[i].find(catalog => catalog.Program_Short_Name == "Analytics");

        var html_obj = document.createElement('div');

        html_obj.classList.add("table_base");
        html_obj.classList.add("eight_row");
        html_obj.id = "catalog" + i;

        html_obj.innerHTML = `
        <a class="data_row table_data">` + msit.Catalog_Year + `</a>
        <a class="data_row table_data list_link" href="https://catalog.kennesaw.edu/preview_program.php?catoid=` + bsit.Catalog_Id + `&poid=` + bsit.Program_Id + `" target="_blank">` + bsit.Program_Short_Name + `</a>
        <a class="data_row table_data list_link" href="https://catalog.kennesaw.edu/preview_program.php?catoid=` + msit.Catalog_Id + `&poid=` + msit.Program_Id + `" target="_blank">` + msit.Program_Short_Name + `</a>
        <a class="data_row table_data list_link" href="https://catalog.kennesaw.edu/preview_program.php?catoid=` + foundation.Catalog_Id + `&poid=` + foundation.Program_Id + `" target="_blank">` + foundation.Program_Short_Name + `</a>
        <a class="data_row table_data list_link" href="https://catalog.kennesaw.edu/preview_program.php?catoid=` + enterprise.Catalog_Id + `&poid=` + enterprise.Program_Id + `" target="_blank">` + enterprise.Program_Short_Name + `</a>
        <a class="data_row table_data list_link" href="https://catalog.kennesaw.edu/preview_program.php?catoid=` + health.Catalog_Id + `&poid=` + health.Program_Id + `" target="_blank">` + health.Program_Short_Name + `</a>
        <a class="data_row table_data list_link" href="https://catalog.kennesaw.edu/preview_program.php?catoid=` + security.Catalog_Id + `&poid=` + security.Program_Id + `" target="_blank">` + security.Program_Short_Name + `</a>
        <a class="data_row table_data list_link" href="https://catalog.kennesaw.edu/preview_program.php?catoid=` + analytics.Catalog_Id + `&poid=` + analytics.Program_Id + `" target="_blank">` + analytics.Program_Short_Name + `</a>`;

        program_catalogs_table.appendChild(html_obj);
    }
}



function filter_curr_page()
{
    for (i = 0; i < program_information.children.length; i++)
    {
        if (program_information.children[i].children[0].children[0].innerHTML.toLowerCase().includes(search_bar.value.toLowerCase()) == true)
        {
            program_information.children[i].style.gridTemplateRows = "1fr";
        }
        else
        {
            program_information.children[i].style.gridTemplateRows = "0fr";
        }
    }

    for (i = 0; i < apps_information.children.length; i++)
    {
        if (apps_information.children[i].children[0].children[0].innerHTML.toLowerCase().includes(search_bar.value.toLowerCase()) == true)
        {
            apps_information.children[i].style.gridTemplateRows = "1fr";
        }
        else
        {
            apps_information.children[i].style.gridTemplateRows = "0fr";
        }
    }
}



function check_key_curr(event)
{
    if (event.key == "Enter")
    {
        filter_curr_page();
    }
}



function reset_curr_filters()
{
    if (search_bar != null)
    {
        search_bar.value = "";
    }

    filter_curr_page();
}



// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    set_site_title(" - Curriculum Resources");

    sort_array_by_year(all_catalog_data);

    load_list_element();
}