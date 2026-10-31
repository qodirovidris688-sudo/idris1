/* =========================================
   IDRIS CALENDAR
   JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const days = document.getElementById("days");

const monthTitle =
    document.getElementById("monthTitle");

const prevMonth =
    document.getElementById("prevMonth");

const nextMonth =
    document.getElementById("nextMonth");

const todayBtn =
    document.getElementById("todayBtn");

const selectedDateText =
    document.getElementById("selectedDate");

const eventNumber =
    document.getElementById("eventNumber");

const eventsContainer =
    document.getElementById("events");

const addEventBtn =
    document.getElementById("addEventBtn");

const modal =
    document.getElementById("modal");

const closeModal =
    document.getElementById("closeModal");

const saveEvent =
    document.getElementById("saveEvent");

const eventText =
    document.getElementById("eventText");

const eventTime =
    document.getElementById("eventTime");

const modalDate =
    document.getElementById("modalDate");

const searchBtn =
    document.getElementById("searchBtn");

const searchBox =
    document.getElementById("searchBox");

const searchInput =
    document.getElementById("searchInput");

const menuBtn =
    document.getElementById("menuBtn");

const sideMenu =
    document.getElementById("sideMenu");

const closeMenu =
    document.getElementById("closeMenu");

const overlay =
    document.getElementById("overlay");

const menuToday =
    document.getElementById("menuToday");

const menuAdd =
    document.getElementById("menuAdd");

const clearEvents =
    document.getElementById("clearEvents");


/* =========================================
   MONTHS
========================================= */

const months = [
    "ЯНВ.",
    "ФЕВ.",
    "МАРТ",
    "АПР.",
    "МАЙ",
    "ИЮН.",
    "ИЮЛ.",
    "АВГ.",
    "СЕНТ.",
    "ОКТ.",
    "НОЯБ.",
    "ДЕК."
];


const fullMonths = [
    "ЯНВАР",
    "ФЕВРАЛ",
    "МАРТ",
    "АПРЕЛ",
    "МАЙ",
    "ИЮН",
    "ИЮЛ",
    "АВГУСТ",
    "СЕНТЯБР",
    "ОКТЯБР",
    "НОЯБР",
    "ДЕКАБР"
];


/* =========================================
   DATE
========================================= */

let currentDate = new Date();

let selectedDate = new Date();


/* =========================================
   LOCAL STORAGE
========================================= */

let savedEvents =
    JSON.parse(
        localStorage.getItem(
            "idrisCalendarEvents"
        )
    ) || {};


/* =========================================
   DATE KEY
========================================= */

function dateKey(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(date) {

    return (
        date.getDate() +
        " " +
        fullMonths[date.getMonth()] +
        " " +
        date.getFullYear()
    );

}


/* =========================================
   RENDER CALENDAR
========================================= */

function renderCalendar() {

    days.innerHTML = "";


    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();


    monthTitle.textContent =
        months[month] + " " + year;


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const start =
        firstDay === 0
            ? 6
            : firstDay - 1;


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    const previousDays =
        new Date(
            year,
            month,
            0
        ).getDate();


    /* =====================================
       PREVIOUS MONTH
    ===================================== */

    for (
        let i = start - 1;
        i >= 0;
        i--
    ) {

        const number =
            previousDays - i;


        const date =
            new Date(
                year,
                month - 1,
                number
            );


        createDay(
            number,
            date,
            true
        );

    }


    /* =====================================
       CURRENT MONTH
    ===================================== */

    for (
        let i = 1;
        i <= daysInMonth;
        i++
    ) {

        const date =
            new Date(
                year,
                month,
                i
            );


        createDay(
            i,
            date,
            false
        );

    }


    /* =====================================
       NEXT MONTH
    ===================================== */

    const currentCells =
        start + daysInMonth;


    const remaining =
        currentCells <= 35
            ? 35 - currentCells
            : 42 - currentCells;


    for (
        let i = 1;
        i <= remaining;
        i++
    ) {

        const date =
            new Date(
                year,
                month + 1,
                i
            );


        createDay(
            i,
            date,
            true
        );

    }

}


/* =========================================
   CREATE DAY
========================================= */

function createDay(
    number,
    date,
    otherMonth
) {

    const day =
        document.createElement("div");


    day.className = "day";


    /* OTHER MONTH */

    if (otherMonth) {

        day.classList.add("other");

    }


    /* SUNDAY */

    if (
        date.getDay() === 0
    ) {

        day.classList.add("sunday");

    }


    /* TODAY */

    const now =
        new Date();


    if (
        date.getFullYear() ===
            now.getFullYear() &&

        date.getMonth() ===
            now.getMonth() &&

        date.getDate() ===
            now.getDate()
    ) {

        day.classList.add("today");

    }


    /* SELECTED */

    if (
        dateKey(date) ===
        dateKey(selectedDate)
    ) {

        day.classList.add("selected");

    }


    /* NUMBER */

    const numberElement =
        document.createElement("div");


    numberElement.className =
        "day-number";


    numberElement.textContent =
        number;


    day.appendChild(
        numberElement
    );


    /* =====================================
       EVENTS ON DAY
    ===================================== */

    const key =
        dateKey(date);


    if (
        savedEvents[key]
    ) {

        savedEvents[key]
            .slice(0, 3)
            .forEach(
                function(event) {

                    const eventElement =
                        document.createElement(
                            "div"
                        );


                    eventElement.className =
                        "day-event";


                    eventElement.textContent =
                        event.text;


                    day.appendChild(
                        eventElement
                    );

                }
            );

    }


    /* =====================================
       CLICK DAY
    ===================================== */

    day.addEventListener(
        "click",
        function() {

            selectedDate =
                new Date(date);


            /* агар моҳи дигар бошад */

            if (otherMonth) {

                currentDate =
                    new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        1
                    );

            }


            renderCalendar();

            renderEvents();

        }
    );


    days.appendChild(day);

}


/* =========================================
   RENDER EVENTS
========================================= */

function renderEvents() {

    const key =
        dateKey(selectedDate);


    const list =
        savedEvents[key] || [];


    selectedDateText.textContent =
        formatDate(selectedDate);


    modalDate.textContent =
        formatDate(selectedDate);


    eventNumber.textContent =
        list.length;


    eventsContainer.innerHTML = "";


    if (
        list.length === 0
    ) {

        return;

    }


    list.forEach(
        function(event, index) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "event-card";


            /* EVENT LEFT */

            const left =
                document.createElement(
                    "div"
                );


            left.className =
                "event-left";


            const icon =
                document.createElement(
                    "div"
                );


            icon.className =
                "event-icon";


            icon.textContent =
                "✓";


            const info =
                document.createElement(
                    "div"
                );


            const name =
                document.createElement(
                    "div"
                );


            name.className =
                "event-name";


            name.textContent =
                event.text;


            const time =
                document.createElement(
                    "div"
                );


            time.className =
                "event-time";


            time.textContent =
                event.time
                    ? "🕐 " + event.time
                    : "Ёддошт";


            info.appendChild(name);

            info.appendChild(time);

            left.appendChild(icon);

            left.appendChild(info);


            /* DELETE */

            const deleteBtn =
                document.createElement(
                    "button"
                );


            deleteBtn.className =
                "delete-event";


            deleteBtn.textContent =
                "🗑";


            deleteBtn.addEventListener(
                "click",
                function() {

                    deleteEvent(
                        key,
                        index
                    );

                }
            );


            card.appendChild(left);

            card.appendChild(deleteBtn);


            eventsContainer.appendChild(card);

        }
    );

}


/* =========================================
   DELETE EVENT
========================================= */

function deleteEvent(
    key,
    index
) {

    if (
        !savedEvents[key]
    ) {

        return;

    }


    savedEvents[key].splice(
        index,
        1
    );


    if (
        savedEvents[key].length === 0
    ) {

        delete savedEvents[key];

    }


    saveToStorage();

    renderCalendar();

    renderEvents();

}


/* =========================================
   SAVE STORAGE
========================================= */

function saveToStorage() {

    localStorage.setItem(
        "idrisCalendarEvents",
        JSON.stringify(savedEvents)
    );

}


/* =========================================
   OPEN MODAL
========================================= */

function openModal() {

    modal.classList.add("show");


    modalDate.textContent =
        formatDate(selectedDate);


    eventText.value = "";

    eventTime.value = "";


    setTimeout(
        function() {

            eventText.focus();

        },
        100
    );

}


/* =========================================
   CLOSE MODAL
========================================= */

function closeEventModal() {

    modal.classList.remove(
        "show"
    );

}


/* =========================================
   SAVE NEW EVENT
========================================= */

function saveNewEvent() {

    const text =
        eventText.value.trim();


    const time =
        eventTime.value;


    if (
        text === ""
    ) {

        alert(
            "⚠️ Номи ёддоштро навис!"
        );

        return;

    }


    const key =
        dateKey(selectedDate);


    if (
        !savedEvents[key]
    ) {

        savedEvents[key] = [];

    }


    savedEvents[key].push({

        text: text,

        time: time

    });


    saveToStorage();


    closeEventModal();


    renderCalendar();

    renderEvents();


    alert(
        "✅ Ёддошт бомуваффақият сабт шуд!"
    );

}


/* =========================================
   PREVIOUS MONTH
========================================= */

prevMonth.addEventListener(
    "click",
    function() {

        currentDate.setMonth(
            currentDate.getMonth() - 1
        );


        renderCalendar();

    }
);


/* =========================================
   NEXT MONTH
========================================= */

nextMonth.addEventListener(
    "click",
    function() {

        currentDate.setMonth(
            currentDate.getMonth() + 1
        );


        renderCalendar();

    }
);


/* =========================================
   TODAY
========================================= */

todayBtn.addEventListener(
    "click",
    function() {

        currentDate =
            new Date();

        selectedDate =
            new Date();


        renderCalendar();

        renderEvents();

    }
);

/* =====================================================
   QUICK ACTIONS
   ===================================================== */

const workoutBtn =
    document.getElementById("workoutBtn");

const workBtn =
    document.getElementById("workBtn");

const wakeBtn =
    document.getElementById("wakeBtn");

const quickModal =
    document.getElementById("quickModal");

const quickTitle =
    document.getElementById("quickTitle");

const quickDescription =
    document.getElementById("quickDescription");

const quickTime =
    document.getElementById("quickTime");

const quickNote =
    document.getElementById("quickNote");

const quickSave =
    document.getElementById("quickSave");

const quickClose =
    document.getElementById("quickClose");


let quickType = "";


/* =====================================================
   OPEN QUICK MODAL
   ===================================================== */

function openQuickModal(type) {

    quickType = type;

    quickModal.classList.add("show");

    quickTime.value = "";

    quickNote.value = "";


    if (type === "workout") {

        quickTitle.textContent =
            "🏋️ МАШҚ";

        quickDescription.textContent =
            "Вақти машқро интихоб кунед";

        quickNote.placeholder =
            "Масалан: Машқи саҳарӣ";

    }


    if (type === "work") {

        quickTitle.textContent =
            "💼 КОР";

        quickDescription.textContent =
            "Вақти корро интихоб кунед";

        quickNote.placeholder =
            "Масалан: Кор дар офис";

    }


    if (type === "wake") {

        quickTitle.textContent =
            "⏰ АЗ ХОБ ХЕСТАН";

        quickDescription.textContent =
            "Вақти бедоршавиро интихоб кунед";

        quickNote.placeholder =
            "Масалан: Соати 7 бедор шудан";

    }

}


/* =====================================================
   BUTTONS
========================================= */

if (workoutBtn) {

    workoutBtn.addEventListener(
        "click",
        function() {

            openQuickModal("workout");

        }
    );

}


if (workBtn) {

    workBtn.addEventListener(
        "click",
        function() {

            openQuickModal("work");

        }
    );

}


if (wakeBtn) {

    wakeBtn.addEventListener(
        "click",
        function() {

            openQuickModal("wake");

        }
    );

}


/* =====================================================
   CLOSE
========================================= */

if (quickClose) {

    quickClose.addEventListener(
        "click",
        function() {

            quickModal.classList.remove("show");

        }
    );

}
if (quickType === "game") {

    title = "🎮 FREE FIRE";

}

/* =====================================================
   SAVE QUICK ACTION
========================================= */

if (quickSave) {

    quickSave.addEventListener(
        "click",
        function() {

            const time =
                quickTime.value;

            const note =
                quickNote.value.trim();


            if (!time) {

                alert(
                    "⚠️ Аввал вақтро интихоб кун!"
                );

                return;

            }


            let title = "";


            if (quickType === "workout") {

                title = "🏋️ МАШҚ";

            }


            if (quickType === "work") {

                title = "💼 КОР";

            }


            if (quickType === "wake") {

                title = "⏰ АЗ ХОБ ХЕСТАН";

            }


            const key =
                dateKey(selectedDate);


            if (!savedEvents[key]) {

                savedEvents[key] = [];

            }


            savedEvents[key].push({

                text:
                    note
                    ? title + " — " + note
                    : title,

                time: time

            });


            saveToStorage();


            quickModal.classList.remove(
                "show"
            );


            renderCalendar();

            renderEvents();


            alert(
                "✅ " +
                title +
                " барои " +
                time +
                " сабт шуд!"
            );

        }
    );

}


/* =====================================================
   CLOSE QUICK MODAL OUTSIDE
========================================= */

if (quickModal) {

    quickModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                quickModal
            ) {

                quickModal.classList.remove(
                    "show"
                );

            }

        }
    );

}
/* =========================================
   PLUS
========================================= */

addEventBtn.addEventListener(
    "click",
    function() {

        openModal();

    }
);


/* =========================================
   SAVE BUTTON
========================================= */

saveEvent.addEventListener(
    "click",
    function() {

        saveNewEvent();

    }
);


/* =========================================
   CLOSE MODAL
========================================= */

closeModal.addEventListener(
    "click",
    function() {

        closeEventModal();

    }
);


/* =========================================
   CLICK OUTSIDE MODAL
========================================= */

modal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modal
        ) {

            closeEventModal();

        }

    }
);


/* =========================================
   ENTER KEY
========================================= */

eventText.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            saveNewEvent();

        }

    }
);


/* =========================================
   SEARCH BUTTON
========================================= */

searchBtn.addEventListener(
    "click",
    function() {

        searchBox.classList.toggle(
            "show"
        );


        if (
            searchBox.classList.contains(
                "show"
            )
        ) {

            searchInput.focus();

        }

    }
);


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    function() {

        const text =
            searchInput.value
                .toLowerCase()
                .trim();


        const cards =
            document.querySelectorAll(
                ".event-card"
            );


        cards.forEach(
            function(card) {

                const content =
                    card.textContent
                        .toLowerCase();


                if (
                    content.includes(text)
                ) {

                    card.style.display =
                        "flex";

                } else {

                    card.style.display =
                        "none";

                }

            }
        );

    }
);


/* =========================================
   OPEN MENU
========================================= */

menuBtn.addEventListener(
    "click",
    function() {

        sideMenu.classList.add(
            "show"
        );


        overlay.classList.add(
            "show"
        );

    }
);


/* =========================================
   CLOSE MENU
========================================= */

function closeSideMenu() {

    sideMenu.classList.remove(
        "show"
    );


    overlay.classList.remove(
        "show"
    );

}


closeMenu.addEventListener(
    "click",
    function() {

        closeSideMenu();

    }
);


overlay.addEventListener(
    "click",
    function() {

        closeSideMenu();

    }
);


/* =========================================
   MENU TODAY
========================================= */

menuToday.addEventListener(
    "click",
    function() {

        currentDate =
            new Date();

        selectedDate =
            new Date();


        renderCalendar();

        renderEvents();

        closeSideMenu();

    }
);


/* =========================================
   MENU ADD
========================================= */

menuAdd.addEventListener(
    "click",
    function() {

        closeSideMenu();

        openModal();

    }
);


/* =========================================
   CLEAR ALL EVENTS
========================================= */

clearEvents.addEventListener(
    "click",
    function() {

        const answer =
            confirm(
                "Оё ҳамаи ёддоштҳо нест карда шаванд?"
            );


        if (!answer) {

            return;

        }


        savedEvents = {};


        saveToStorage();


        renderCalendar();

        renderEvents();


        alert(
            "🗑️ Ҳамаи ёддоштҳо нест карда шуданд!"
        );

    }
);


/* =========================================
   START
========================================= */

renderCalendar();

renderEvents();/* =====================================================
   🎮 FREE FIRE
   ===================================================== */

const gameBtn = document.getElementById("gameBtn");

if (gameBtn) {

    gameBtn.addEventListener("click", function () {

        quickType = "game";

        if (quickModal) {
            quickModal.classList.add("show");
        }

        if (quickTime) {
            quickTime.value = "";
        }

        if (quickNote) {
            quickNote.value = "";
            quickNote.placeholder =
                "Масалан: 1 соат бо дӯстон";
        }

        if (quickTitle) {
            quickTitle.textContent =
                "🎮 FREE FIRE";
        }

        if (quickDescription) {
            quickDescription.textContent =
                "Вақти Free Fire бозӣ карданро интихоб кунед";
        }

    });

}


/* =====================================================
   🎮 FREE FIRE SAVE
   ===================================================== */

if (quickSave) {

    quickSave.addEventListener("click", function () {

        if (quickType !== "game") {
            return;
        }

        const time =
            quickTime.value;

        const note =
            quickNote.value.trim();


        if (!time) {

            alert(
                "⚠️ Аввал вақти Free Fire-ро интихоб кун!"
            );

            return;
        }


        const key =
            dateKey(selectedDate);


        if (!savedEvents[key]) {
            savedEvents[key] = [];
        }


        savedEvents[key].push({

            text:
                note
                    ? "🎮 FREE FIRE — " + note
                    : "🎮 FREE FIRE",

            time: time

        });


        saveToStorage();

        renderCalendar();

        renderEvents();


        if (quickModal) {
            quickModal.classList.remove("show");
        }


        alert(
            "🎮 FREE FIRE сабт шуд!\n\n" +
            "⏰ Вақт: " +
            time +
            (note
                ? "\n📝 " + note
                : "")
        );

    });

}


/* =====================================================
   🔔 FREE FIRE REMINDER
   ===================================================== */

setInterval(function () {

    const now =
        new Date();


    const currentTime =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");


    const todayKey =
        dateKey(now);


    const todayEvents =
        savedEvents[todayKey];


    if (!todayEvents) {
        return;
    }


    todayEvents.forEach(function (event) {

        if (
            event.time === currentTime &&
            event._alerted !== true
        ) {

            event._alerted = true;


            alert(
                "🎮 FREE FIRE!\n\n" +
                event.text +
                "\n⏰ Вақт расид!"
            );


            saveToStorage();

        }

    });

}, 30000);