function main()
{
    document.getElementById("banner_container").innerHTML = `
    <img class=\"page_image\" src=\"resources/ksu_banner.png\" alt=\"KSU Banner\">
    <p class=\"page_title bold list_pargraph_no_break\">IT Curriculum Portal</p>
    <div class=\"banner_tabs\">
        <a href=\"` + link_list.Course_List + `\" class=\"page_button center_text\">
            Course List
        </a>
        <a href=\"` + link_list.Course_Description + `\" class=\"page_button center_text\">
            Course Description
        </a>
        <a href=\"` + link_list.Permanent_Schedule + `\" class=\"page_button center_text\">
            Permanent Schedule
        </a>
        <a href=\"` + link_list.Course_Coordinator + `\" class=\"page_button center_text\">
            Course Coordinator
        </a>
        <a href=\"` + link_list.ALG_Information + `\" class=\"page_button center_text\">
            ALG Information
        </a>
        <a href=\"` + link_list.Curriculum_Resources + `\" class=\"page_button center_text\">
            Curriculum Resources
        </a>
        <a href=\"` + link_list.MSIT_Flowchart + `\" class=\"page_button center_text\">
            MSIT Flowchart
        </a>
    </div>`;
}

main();