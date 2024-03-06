import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attemptsFilter'
})
export class QuizzesQuizAttemptsFilterPipePipe implements PipeTransform {

  transform(reports: any[], filterPerson: string, filterMember: string): unknown {
    if (!reports || (!filterPerson && !filterMember)) {
      return reports;
    }

    filterPerson = filterPerson || '';
    filterMember = filterMember || '';

    return reports
      .filter(report => (report.person.firstName + ' ' + report.person.lastName).toLowerCase().indexOf(filterPerson.toLowerCase()) > -1)
      .filter(report => report.member?.name.text.toLowerCase().indexOf(filterMember.toLowerCase()) > -1);
  }

}
