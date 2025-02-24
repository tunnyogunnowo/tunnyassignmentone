// Wait for the DOM to fully load before running scripts
document.addEventListener("DOMContentLoaded", function () {

    //Show image name of image after 10 seconds
    const myProfilePic = document.getElementById("myProfilePic");
    if (myProfilePic) {
        setTimeout(() => {
            const imageName = myProfilePic.getAttribute("src").split('/').pop();
            const imageLabel = document.createElement("p");
            imageLabel.textContent = `Name of image is: ${imageName}`;
            myProfilePic.after(imageLabel);
        }, 10000);
    }

    // This is the Mark to Grade Converter 
    const gradeForm = document.getElementById("gradeForm");
    if (gradeForm) {
        gradeForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const markInput = document.getElementById("markInput").value.trim();
            const errorMsg = document.getElementById("errorMsg");
            const gradeOutput = document.getElementById("gradeOutput");

            let mark = parseInt(markInput, 10);
            if (isNaN(mark)) {
                errorMsg.textContent = "❌ Please enter a valid number.";
                gradeOutput.textContent = "";
                return;
            } else if (mark < 0 || mark > 100) {
                errorMsg.textContent = "❌ Mark must be between 0 and 100.";
                gradeOutput.textContent = "";
                return;
            }

            errorMsg.textContent = "";
            let grade = mark >= 90 ? "A" :
                        mark >= 80 ? "B" :
                        mark >= 70 ? "C" :
                        mark >= 50 ? "D" : "F";
            gradeOutput.textContent = `✅ Grade: ${grade}`;
        });
    }

    // Load and Sort Staff Information
    const staffTable = document.getElementById("staffTable");
    if (staffTable) {
        var dataSet = [   
            [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
    [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
    [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
    [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
    [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
    [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
    [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
    [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
    [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
    [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
    [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
    [ "Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600" ],
    [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
    [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
    [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
    [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
    [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
    [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
    [ "Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400" ],
    [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
    [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
    [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
    [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
    [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]
    ];

        let staffRecords = dataSet.map((staff) => ({
            name: staff[0],
            role: staff[1],
            location: staff[2],
            salary: parseInt(staff[5].replace(/[$,]/g, "")) // Convert salary string to number for sorting
        }));

        function loadStaffTable(data) {
            let tbody = staffTable.querySelector("tbody");
            tbody.innerHTML = ""; // Clear existing rows
            data.forEach(staff => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${staff.name}</td>
                    <td>${staff.role}</td>
                    <td>${staff.location}</td>
                    <td>$${staff.salary.toLocaleString()}</td>
                `;
                tbody.appendChild(row);
            });
        }

        document.getElementById("sortByName").addEventListener("click", function () {
            staffRecords.sort((a, b) => a.name.localeCompare(b.name));
            loadStaffTable(staffRecords);
        });

        document.getElementById("sortBySalary").addEventListener("click", function () {
            staffRecords.sort((a, b) => b.salary - a.salary);
            loadStaffTable(staffRecords);
        });

        loadStaffTable(staffRecords);
    }
    
    
    // Weather Converter COde

$(document).ready(function () {
    if ($("#tempForm").length) {
        $("#convertToCelsius").click(function () {
            let fahrenheit = parseFloat($("#tempInput").val());
            if (isNaN(fahrenheit)) {
                $("#tempOutput").text("❌ Enter a valid temperature.");
                return;
            }
            let celsius = ((fahrenheit - 32) * 5 / 9).toFixed(2);
            $("#tempOutput").text(`✅ ${fahrenheit}°F = ${celsius}°C`);
        });

        $("#convertToKelvin").click(function () {
            let fahrenheit = parseFloat($("#tempInput").val());
            if (isNaN(fahrenheit)) {
                $("#tempOutput").text("❌ Enter a valid temperature.");
                return;
            }
            let celsius = (fahrenheit - 32) * 5 / 9;
            let kelvin = (celsius + 273.15).toFixed(2);
            $("#tempOutput").text(`✅ ${fahrenheit}°F = ${kelvin}K`);
        });
    }
});



    // The footer

    document.addEventListener('DOMContentLoaded', function() {
        let footerYear = document.getElementById("footerYear");
        if (footerYear) {
          footerYear.textContent = new Date().getFullYear();
        }
      });


});
