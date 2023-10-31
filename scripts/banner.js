function main()
{
    document.getElementById("banner_container").innerHTML = `
    <img class=\"page_image\" src=\"resources/ksu_banner.png\" alt=\"KSU Banner\">
    <div class=\"banner_tabs\">
        <a href=\"` + link_list.Course_List + `\" class=\"page_button center_text\">
            Course<br>List
        </a>
        <a href=\"` + link_list.Course_Description + `\" class=\"page_button center_text\">
            Course<br>Description
        </a>
        <a href=\"` + link_list.Permanent_Schedule + `\" class=\"page_button center_text\">
            Permanent<br>Schedule
        </a>
        <a href=\"` + link_list.Course_Coordinator + `\" class=\"page_button center_text\">
            Course<br>Coordinator
        </a>
        <a href=\"` + link_list.ALG_Information + `\" class=\"page_button center_text\">
            ALG<br>Information
        </a>
        <a href=\"` + link_list.Curriculum_Resources + `\" class=\"page_button center_text\">
            Curriculum<br>Resources
        </a>
        <a href=\"` + link_list.MSIT_Flowchart + `\" class=\"page_button center_text\">
            MSIT<br>Flowchart
        </a>
    </div>`;
}

main();