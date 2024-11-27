document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById("calendar");
    const currentMonth = document.getElementById("current-month");
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");

    let date = new Date();

    function updateCalendar() {
        calendar.innerHTML = "";
        const year = date.getFullYear();
        const month = date.getMonth();
        const today = new Date();

        currentMonth.textContent = date.toLocaleString("default", { month: "long", year: "numeric" });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < (firstDay || 7) - 1; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.classList.add("empty");
            calendar.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = day;

            if (
                year === today.getFullYear() &&
                month === today.getMonth() &&
                day === today.getDate()
            ) {
                dayDiv.classList.add("today");
            }

            calendar.appendChild(dayDiv);
        }
    }

    prevMonthButton.addEventListener("click", () => {
        date.setMonth(date.getMonth() - 1);
        updateCalendar();
    });

    nextMonthButton.addEventListener("click", () => {
        date.setMonth(date.getMonth() + 1);
        updateCalendar();
    });

    updateCalendar();
});
