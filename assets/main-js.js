function insertLastModifiedIntoDOM() {
    const lastUpdatedDataSpan = document.getElementById('lastUpdatedData');
    lastUpdatedDataSpan.innerHTML = document.lastModified;
}
function insertYearIntoDOM() {
    const date = new Date();
    const yearDataSpan = document.getElementById('yearData');
    yearDataSpan.innerHTML = date.getFullYear();
}
document.addEventListener('DOMContentLoaded', () => {
    insertYearIntoDOM();
    insertLastModifiedIntoDOM();
});