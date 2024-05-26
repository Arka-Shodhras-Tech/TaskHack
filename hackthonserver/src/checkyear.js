export const Validyear=async(id)=>{
    const date1 = new Date(`20${id}-07-10`);
    const date2 = new Date();
    const date3 = new Date(`${2025}-07-10`);
    const year1 = date1.getFullYear();
    const year2 = date2.getFullYear();
    const year3 = date3.getFullYear();
    const month1 = date1.getMonth();
    const month2 = date2.getMonth();
    const month3 = date3.getMonth();
    const day1 = date1.getDate();
    const day2 = date2.getDate();
    const day3 = date3.getDate();
    let yearDifference = year2 - year1;
    let yearDifference1 = year3 - year2;
    if (month2 < month1 || (month2 === month1 && day2 < day1)) {
        yearDifference--;
    }
    if (month3 < month2 || (month3 === month2 && day3 < day2)) {
        yearDifference1--;
    }
    return (yearDifference + yearDifference1)
}