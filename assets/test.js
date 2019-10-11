const testDate = new Date();
testDate.setDate(12);
console.log(testDate);
console.log(testDate.getDate());
console.log(testDate.getDay());
const t = testDate.getDate() + (-5 - testDate.getDay() -1) -7;
console.log("t: ", t);
const lastMonday = new Date();
lastMonday.setDate(t);
console.log(`Last Monday: ${lastMonday}`);
const lastSunday = lastMonday;
lastSunday.setDate(t+6);
const t2 = testDate.getDate() + (8 - testDate.getDay() -1) -7;
//lastSunday.setDate(t2);
console.log(`Last Sunday: ${lastSunday}`);
console.log(new Date().getDay())

if (new Date().getDay() == 5) {
    let date = new Date();
    lastWeek = date.getFullYear() + "" + (date.getMonth() + 1) + "" + (date.getDate());
} 
console.log(`lastWeek ${lastWeek}`);