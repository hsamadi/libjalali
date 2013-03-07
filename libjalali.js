var g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

var j_month_names = ["", 
"فروردین", "اردیبهشت", "خرداد",
"تیر", "مرداد", "شهریور",
"مهر", "آبان", "آذر",
"دی", "بهمن", "اسفند"
]

function JalaliDate(y, m, d) {
    this.year = y;
    this.month = m;
    this.date = d;
}

JalaliDate.prototype.getFullYear = function() {
    return this.year;
};

JalaliDate.prototype.getMonth = function() {
    return this.month;
};

JalaliDate.prototype.getDate = function() {
    return this.date;
};

Date.prototype.toJalali = function() {
    var gy, gm, gd;
    var jy, jm, jd;
    var g_day_no, j_day_no;
    var j_np;

    var i;

    gy = this.getFullYear() - 1600;
    gm = (this.getMonth() + 1) - 1;
    gd = this.getDate() - 1;

    g_day_no = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);
    for (i = 0;i < gm; ++i)
        g_day_no += g_days_in_month[i];

    if (gm > 1 && ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0))) {
        /* leap and after Feb */
        ++g_day_no;
    }
    g_day_no += gd;


    j_day_no = g_day_no - 79;

    j_np = Math.floor(j_day_no / 12053);
    j_day_no %= 12053;

    jy = 979 + 33 * j_np + 4 * Math.floor((j_day_no / 1461));
    j_day_no %= 1461;


    if (j_day_no >= 366) {
        jy += Math.floor((j_day_no - 1) / 365);
        j_day_no = (j_day_no - 1) % 365;
    }

    for (i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i) {
        j_day_no -= j_days_in_month[i];
    }

    jm = i + 1;
    jd = j_day_no + 1;

    this.jalaliDate = new JalaliDate(jy, jm - 1, jd);
    return this;
};

Date.prototype.getJalaliYear = function() {
    this.toJalali();
    return this.jalaliDate.getFullYear();
};

Date.prototype.getJalaliMonth = function() {
    this.toJalali();
    return this.jalaliDate.getMonth();
};

Date.prototype.getJalaliDate = function() {
    this.toJalali();
    return this.jalaliDate.getDate();
};

Date.prototype.getJalaliMonthLength = function() {
    this.toJalali();
    return j_days_in_month[this.getJalaliMonth()];
};