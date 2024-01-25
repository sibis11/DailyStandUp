window.onload = function () {
    // Initialize each comment history section
    var textareas = document.querySelectorAll('textarea[id^="textareaComment"]');
    textareas.forEach((textarea, index) => {
        let historyId = "commentHistory" + (index + 1);
        document.getElementById(historyId).innerHTML = localStorage.getItem(historyId) || 'No history yet';
    });
};

function updateHistory(index) {
    var textareaId = "textareaComment" + index;
    var historyId = "commentHistory" + index;

    var currentComment = document.getElementById(textareaId).value;
    var history = localStorage.getItem(historyId) || '';
    history = currentComment + '<br><br><br>' + history;
    localStorage.setItem(historyId, history);
    document.getElementById(historyId).innerHTML = history;
    document.getElementById(textareaId).value = '';
}

function clearHistory(index) {
    var historyId = "commentHistory" + index;
    localStorage.removeItem(historyId);
    document.getElementById(historyId).innerHTML = '';
}

//function exportHistoryPDF() {
    // Export logic
    //var now = new Date();
    //var dateString = now.toLocaleString();
   // html2canvas(document.querySelector("table, body")).then(canvas => {
       // const imgData = canvas.toDataURL('image/png');
        //const pdf = new jspdf.jsPDF();
        //pdf.addImage(imgData, 'PNG', 10, 10);
        //pdf.setFontSize(10);
        //pdf.text('Exported on: ' + dateString, 10, 10);
        //pdf.save('comment-history.pdf');

function exportHistoryPDF() {
    const pdf = new jspdf.jsPDF();
    let currentY = 10; // Starting Y position
    let headerX = 10; // X position for headers
    let commentX = 10; // X position for comments, adjust as needed
    let sectionSpacing = 10; // Space between sections

    // Function to add text from a specific element to the PDF
    function addTextFromElement(elementId, x, y) {
        const element = document.getElementById(elementId);
        if (element && element.textContent.trim() !== '') {
            pdf.text(element.textContent.trim(), x, y);
        }
    }

    // Add Chair text
    const selectedChair = document.querySelector("#chair option:checked")?.textContent;
    if (selectedChair) {
        pdf.text(`Chair: ${selectedChair}`, headerX, currentY);
        currentY += sectionSpacing; // Increment Y-axis position
    }

    // Iterate through each comment history section
    for (let i = 1; i <= 7; i++) { // Assuming 7 sections
        let headerId = `header${i}`;
        let commentId = `commentHistory${i}`;

        // Add the header
        addTextFromElement(headerId, headerX, currentY);

        // Increment Y-axis position for comment
        currentY += 6; // Slightly lower than the header for readability

        // Add the corresponding comment history text next to the header
        addTextFromElement(commentId, commentX, currentY);

        // Increment Y-axis position for the next section with additional spacing
        currentY += sectionSpacing + 4;
    }

    // Add the date and time stamp at the end
    var now = new Date();
    var dateString = now.toLocaleString();
    pdf.text('Exported on: ' + dateString, headerX, currentY);

    // Save the PDF
    pdf.save('comment-history.pdf');
}
