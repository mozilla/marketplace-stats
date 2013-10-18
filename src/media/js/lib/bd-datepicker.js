define('bd-datepicker', ['format', 'l10n'], function(format, l10n) {
    if ("orientation" in window) return; // skip mobile and tablet browsers

    var gettext = l10n.gettext;
    var format = format.format;

    var STRINGS = {
        // days of week
        "calendar.weekday.1": gettext("Mon"),
        "calendar.weekday.2": gettext("Tue"),
        "calendar.weekday.3": gettext("Wed"),
        "calendar.weekday.4": gettext("Thu"),
        "calendar.weekday.5": gettext("Fri"),
        "calendar.weekday.6": gettext("Sat"),
        "calendar.weekday.7": gettext("Sun"),
        // months
        "calendar.month.0": gettext("January"),
        "calendar.month.1": gettext("February"),
        "calendar.month.2": gettext("March"),
        "calendar.month.3": gettext("April"),
        "calendar.month.4": gettext("May"),
        "calendar.month.5": gettext("June"),
        "calendar.month.6": gettext("July"),
        "calendar.month.7": gettext("August"),
        "calendar.month.8": gettext("September"),
        "calendar.month.9": gettext("October"),
        "calendar.month.10": gettext("November"),
        "calendar.month.11": gettext("December")
    };


    var DATEPICKER_TEMPLATE = DOM.template("div.%CLS%>p.%CLS%-header+a.%CLS%-prev+a.%CLS%-next+table.%CLS%-days>thead>tr>th[data-i18n=calendar.weekday.$]*7+tbody>tr*6>td*7".replace(/%CLS%/g, "better-dateinput-calendar"));

    DOM.extend("input[type=date]", {
        constructor: function() {
            var calendar = DOM.create(DATEPICKER_TEMPLATE).hide();

            this
                // remove legacy dateinput if it exists
                .set({type: "text", autocomplete: "off"})
                .addClass("better-dateinput")
                // sync value on click
                .on("focus", [], this, "_syncInputWithCalendar")
                // handle arrow keys, esc etc.
                .on("keydown", ["which", "shiftKey"], this, "handleCalendarKeyDown");

            calendar.findAll("a").on("click", this, "handleCalendarNavClick");
            calendar.on("click td", this, "handleCalendarDayClick");

            // hide calendar when a user clicks somewhere outside
            DOM.on("click", this, "handleDocumentClick");

            // append calendar to DOM and cache referencies to some queries
            this.data({
                calendar: calendar,
                calendarCaption: calendar.find(".better-dateinput-calendar-header"),
                calendarDays: calendar.findAll("td")
            });
            // TODO: remove the check in future
            if (this.parent().length) this.after(calendar);

            // display calendar for autofocused elements
            if (this.matches(":focus")) this.fire("focus");
        },
        getCalendarDate: function() {
            return this.data("calendarDate");
        },
        setCalendarDate: function(value) {
            var calendarCaption = this.data("calendarCaption"),
                calendarDays = this.data("calendarDays"),
                iterDate = new Date(value.getFullYear(), value.getMonth(), 0);
            // update caption
            calendarCaption.set("<span data-i18n='calendar.month." + value.getMonth() + "'> " + (isNaN(value.getFullYear()) ? "" : value.getFullYear()));

            if (!isNaN(iterDate.getTime())) {
                // move to begin of the start week
                iterDate.setDate(iterDate.getDate() - iterDate.getDay());

                calendarDays.each(function(day) {
                    iterDate.setDate(iterDate.getDate() + 1);

                    var mDiff = value.getMonth() - iterDate.getMonth(),
                        dDiff = value.getDate() - iterDate.getDate();

                    if (value.getFullYear() !== iterDate.getFullYear()) {
                        mDiff *= -1;
                    }

                    day.set("className", mDiff ?
                        (mDiff > 0 ? "prev-calendar-day" : "next-calendar-day") :
                        (dDiff ? "calendar-day" : "current-calendar-day")
                    );

                    day.set(iterDate.getDate().toString());
                });

                // update current date
                this.data("calendarDate", value);
            }

            return this;
        },
        handleCalendarDayClick: function(target) {
            var calendarDate = this.getCalendarDate(),
                currentYear = calendarDate.getFullYear(),
                currentMonth = calendarDate.getMonth(),
                targetDate = new Date(currentYear, currentMonth,
                    target.parent().get("rowIndex") * 7 + target.get("cellIndex") - 5 - new Date(currentYear, currentMonth, 1).getDay()
                );

            this.setCalendarDate(targetDate);
            this._syncCalendarWithInput();

            // prevent focusing after click if the input is inside of a label
            return false;
        },
        handleCalendarNavClick: function(target) {
            var isNext = target.hasClass("better-dateinput-calendar-next"),
                calendarDate = this.getCalendarDate(),
                targetDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + (isNext ? 1 : -1), 1);

            this.setCalendarDate(targetDate)._syncCalendarWithInput(true);
            this.fire("focus");

            return false;
        },
        handleCalendarKeyDown: function(which, shiftKey) {
            var calendar = this.data("calendar"),
                currentDate = this.getCalendarDate(),
                delta = 0;

            if (which === 13) {
                calendar.toggle(); // show/hide calendar on enter key
            } else if (which === 27 || which === 9) {
                calendar.hide(); // esc or tab key hides calendar
            } else if (which === 8 || which === 46) {
                this.set("")._syncInputWithCalendar(true); // backspace or delete clears the value
            } else {
                if (which === 74 || which === 40) { delta = 7; }
                else if (which === 75 || which === 38) { delta = -7; }
                else if (which === 76 || which === 39) { delta = 1; }
                else if (which === 72 || which === 37) { delta = -1; }

                if (delta) {
                    if (shiftKey && (which === 40 || which === 38)) {
                        currentDate.setFullYear(currentDate.getFullYear() + (delta > 0 ? 1 : -1));
                    } else if (shiftKey && (which === 37 || which === 39)) {
                        currentDate.setMonth(currentDate.getMonth() + (delta > 0 ? 1 : -1));
                    } else {
                        currentDate.setDate(currentDate.getDate() + delta);
                    }

                    this.setCalendarDate(currentDate)._syncCalendarWithInput(true);
                }
            }

            // prevent default action except if it was a TAB key
            // so do not allow to change the value via manual input
            return which === 9;
        },
        handleDocumentClick: function() {
            var calendar = this.data("calendar");

            if (!this.matches(":focus")) calendar.hide();
        },
        _syncInputWithCalendar: function(skipCalendar) {
            var calendar = this.data("calendar"),
                value = (this.get("value") || "").split("-");
            // switch calendar to the input value date
            this.setCalendarDate(value.length > 1 ? new Date( parseInt(value[0],10), parseInt(value[1],10) - 1, parseInt(value[2],10)) : new Date());

            if (!skipCalendar) calendar.show();
        },
        _syncCalendarWithInput: function(skipCalendar) {
            var calendar = this.data("calendar"),
                date = this.getCalendarDate(),
                zeroPadMonth = ("00" + (date.getMonth() + 1)).slice(-2),
                zeroPadDate = ("00" + date.getDate()).slice(-2);

            this.set(date.getFullYear() + "-" + zeroPadMonth + "-" + zeroPadDate);

            if (!skipCalendar) calendar.hide();
        }
    });
});
