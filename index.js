// I used destructuring for the array to make the object/record
const createEmployeeRecord = function(arry){
     const [firstName,familyName,title,payPerHour] = arry
        return{
            firstName:firstName,
            familyName:familyName,
            title:title,
            payPerHour:payPerHour,
            timeInEvents:[],
            timeOutEvents:[]
        }
}
// passing in more than one array(s), we now have to iterate with map(returns array) and call our createEmployeeRecord function inside for each array.
const createEmployeeRecords = function(arrays){
   const employeeRecords = arrays.map((obj)=>{
      return createEmployeeRecord(obj)
   })
   return employeeRecords
}

const createTimeInEvent = function(employee, clockIn){
    let [date,hour] = clockIn.split(" ")

    employee.timeInEvents.push({
        type:"TimeIn",
        hour: parseInt(hour,10),
        date
    })
    return employee
}

const createTimeOutEvent = function(employee, clockOut){
    let [date,hour] = clockOut.split(" ")

    employee.timeOutEvents.push({
        type:"TimeOut",
        hour: parseInt(hour,10),
        date
    })
    return employee
}

const hoursWorkedOnDate = function(employee, dateWorked ){
let timeIn = employee.timeInEvents.find((e)=> {
    return e.date === dateWorked
})
let timeOut = employee.timeOutEvents.find((e)=> {
    return e.date === dateWorked
})
return (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = function(employee, dateWorked){
return hoursWorkedOnDate(employee, dateWorked) * employee.payPerHour
}

const allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

const calculatePayroll = function(employees){
  return  employees.reduce((m, e) => m + allWagesFor(e), 0)
}

const findEmployeeByFirstName = function(employees, name){
return employees.find((e)=>{
return e.firstName === name
})
}