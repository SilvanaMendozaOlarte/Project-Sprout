let prevPage = "sign-in";

function changePage(page) {
    document.getElementById(prevPage).style.display = 'none';
    document.getElementById(page).style.display = 'block';
    prevPage = page;
}

export default changePage