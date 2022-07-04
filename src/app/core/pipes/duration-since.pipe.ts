import { Pipe, PipeTransform } from '@angular/core'
import {  intervalToDuration, Duration } from 'date-fns'


const getDuration = (time: Duration): string => {
    if (!time) {
        return '--'
    }

    const { days, hours, years } = time
    let result
    if (years && years > 0) {
        result = `${years} year${years > 1 ? 's' : ''}`
    } else if (days && days > 0) {
        result = `${days} day${days > 1 ? 's' : ''}`
    } else if (hours && hours > 0) {
        result = `${hours} hour${hours > 1 ? 's' : ''}`
    } else {
        result = 'less than an hour'
    }
    return `${result} ago`
}

@Pipe({name: 'durationSince'})
export class DurationSincePipe implements PipeTransform {
  transform(time: number): string {
    const currentTime = new Date().getTime()
    const duration = intervalToDuration({ start: time * 1000, end: currentTime })
    return getDuration(duration)
  }
}