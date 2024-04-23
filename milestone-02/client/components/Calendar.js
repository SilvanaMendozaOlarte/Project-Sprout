const buildCalendar = () => {
    // > placeholder, should be dynamic
    numRows = 8;
    days_of_week = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    ];
    calendar = document.getElementById("calendar");
  
    for (let i = 0; i < 7; i++){
        for (let j = 0; j < numRows; j++){

            // ? How do i declare w/o initializing?
            const day_item = document.createElement("div");
            const text = document.createTextNode("")

            // > creates a th if on first row, else creates a td
            if(j > 1){
                day_item = document.createElement("th");
                text = document.createTextNode(days_of_week[i]);
            }
            else{
                day_item = document.createElement("td");
                // > placeholder, will display day number, will do l8r
                text = document.createTextNode(0);
            }

            day_item.classList.add("day_item");
            calendar.appendChild(day_item);  
    
            //! adding click function to every day
            //square.addEventListener("click", onclick(i,j));

        }
    }
}
buildCalendar();