import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attemptsFilter'
})
export class QuizzesQuizAttemptsFilterPipePipe implements PipeTransform {

  transform(reports: any[], filterMember: string): unknown {
    if (!reports || !filterMember) {
      return reports;
    }

    return reports.filter(report => report.member?.name.text.toLowerCase().indexOf(filterMember.toLowerCase()) > -1);
  }

}
