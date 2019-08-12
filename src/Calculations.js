

export function calcMacroData(data) {
    let pCap = data.set_protein
    let pTotal = 0
    let pConsume = 0
    let pRemain = 0
    let pExceed = 0

    let cCap = data.set_carbs
    let cTotal = 0
    let cConsume = 0
    let cRemain = 0
    let cExceed = 0

    let fCap = data.set_fat
    let fTotal = 0
    let fConsume = 0
    let fRemain = 0
    let fExceed = 0

    data.meals.map(meal => {
        console.log(meal)
        let p = meal.protein
        let c = meal.carbs
        let f = meal.fat

        pTotal += p
        cTotal += c
        fTotal += f
    })

    if (pTotal >= pCap) {
        pRemain = 0
        pConsume = pCap
        pExceed = pTotal - pCap
    } else {
        pConsume = pTotal
        pRemain = pCap - pTotal
        pExceed = 0
    };


    if (cTotal >= cCap) {
        cRemain = 0
        cConsume = cCap
        cExceed = cTotal - cCap
    } else {
        cConsume = cTotal
        cRemain = cCap - cTotal
        cExceed = 0
    };


    if (fTotal >= fCap) {
        fRemain = 0
        fConsume = fCap
        fExceed = fTotal - fCap
    } else {
        fConsume = fTotal
        fRemain = fCap - fTotal
        fExceed = 0
    };

    let seriesData = [{name: "Consumed (g)", data: [ pConsume, cConsume, fConsume ] },{name: "Remaining (g)", data: [ pRemain, cRemain, fRemain ] },{name: "Exceeded (g)", data: [ pExceed, cExceed, fExceed ] }]
    return seriesData

}

export function calcCaloriesData(data) {
    let target = data.set_calories
    let currentCount = 0
    let exceeded = 0
    let currentPercent = 0
    let exceedPercent = 0

    data.meals.map(meal => {
        currentCount += meal.calories
    })

    if (target === null || target === 0) {
        currentPercent = 0
        exceedPercent = 0
    } else if (currentCount > target) {
        exceeded = currentCount - target
        currentPercent = 100
        exceedPercent = Math.round(exceeded/target * 100)
    } else {
        currentPercent = Math.round(currentCount/target * 100)
        exceedPercent = 0
    };

    let seriesData = [currentPercent, exceedPercent]

    return seriesData
}

export function generateHistorySeries(data) {
    let series = {}
    data.meals.map(meal => 
        (formatDate(meal.date) in series) ? 
        (series[formatDate(meal.date)].calories += meal.calories,
        series[formatDate(meal.date)].protein += meal.protein,
        series[formatDate(meal.date)].carbs += meal.carbs,
        series[formatDate(meal.date)].fat += meal.fat
        )
        : 
        series[formatDate(meal.date)] = {calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fat: meal.fat},
    )
    return series;
  }

export function formatDate(string) {
    let year = string.slice(0,4)
    let month = string.slice(5,7)
    let day = string.slice(8,10)
    if (parseInt(month) < 10) {
        month = month.replace(/0/g,'')
    };
    if (parseInt(day) < 10) {
        day = day.replace(/0/g,'')
    };

    return year + '-' + month + '-' + day
}

export function formatTime(string) {
    let time = string.slice(11,19)
    let hour = parseInt(time.slice(0,2))
    let newHour
    if (hour > 12) {
        newHour = (hour - 12).toString()
        return newHour + time.slice(2) + ' PM'
    };
    return time + ' AM'
}