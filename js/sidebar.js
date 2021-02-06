const sidebarToggle = document.getElementsByClassName('sidebar-toggle')[0];
const header = document.getElementsByClassName('header')[0];
const sidebarDisable = document.getElementsByClassName('sidebar-disable')[0];

sidebarToggle.addEventListener('click', () => {
    header.classList.toggle('active');
    sidebarToggle.classList.toggle('active');
    sidebarToggle.addEventListener('click', () => {
        header.classList.toggle('disable');
        sidebarToggle.classList.toggle('disable');
    });
    sidebarDisable.addEventListener('mouseleave', () => {
        header.classList.toggle('disable');
        sidebarToggle.classList.toggle('disable');
    });
});