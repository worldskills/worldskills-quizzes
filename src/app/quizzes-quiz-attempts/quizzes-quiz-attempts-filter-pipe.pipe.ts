import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attemptsFilter'
})
export class QuizzesQuizAttemptsFilterPipePipe implements PipeTransform {

  transform(reports: any[], filterPerson: string, filterPosition: string, filterMember: string): unknown {
    if (!reports || (!filterPerson && !filterPosition && !filterMember)) {
      return reports;
    }

    filterPerson = filterPerson || '';
    filterPosition = filterPosition || '';
    filterMember = filterMember || '';

    return reports
      .filter(report => (report.person.first_name + ' ' + report.person.last_name).toLowerCase().indexOf(filterPerson.toLowerCase()) > -1)
      .filter(report => report.position?.position.name.text.toLowerCase().indexOf(filterPosition.toLowerCase()) > -1)
      .filter(report => report.position?.member?.name.text.toLowerCase().indexOf(filterMember.toLowerCase()) > -1);
  }

}
