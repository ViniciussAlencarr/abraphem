export const getFormatDate = (): string => {
    let date = new Date()
    let current_date = `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`
    let current_time = `${date.getHours()}H${date.getMinutes()}`
    return `${current_date} ás ${current_time}`
}