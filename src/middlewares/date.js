// ================== get reg date ========================

const d = new Date();
let day = d.getDate();
let month = d.getMonth();
let year = d.getFullYear();

let today = `${day}-${month}-${year}`

let h = d.getHours();
let hour = h % 12 || 12; // handle midnight and noon
let minute = d.getMinutes();

let format = h < 12 ? "am" : "pm";

if (hour < 10) hour = "0" + hour;
if (minute < 10) minute = "0" + minute;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
month = months[month];

if (day < 10) day = `0${day}`;

const regDate = `${day} ${month}, ${year}`;
const time = `${hour}:${minute} ${format}`;

export { regDate, time, today };
