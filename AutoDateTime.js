
    function updateDateTime() {
            var now = new Date();
    var dateString = now.toLocaleString();
    document.getElementById('currentDateTime').innerHTML = dateString;
        }

    // Update the date/time every second
    setInterval(updateDateTime, 1000);

    // Initialize with current date/time on page load
    window.onload = updateDateTime;
