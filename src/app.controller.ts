/* eslint-disable prettier/prettier */
import { Controller, Get, UnprocessableEntityException } from '@nestjs/common';
import { AppService } from './app.service';
import { Employee } from './employee';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): { name: string } {
  //   return { name: 'christopher' };
  // }

  @Get('succeswithobject')
  getSuccessWithObject(): { data: any } {
    return {
      data: {
        name: 'Donald Trump',
        age: 99,
        color: 'orange',
        isStupid: true,
      },
    };
  }

  @Get('error')
  getErrorresponse(): { data: any } {
    throw new UnprocessableEntityException('4 student acsl;kd;lk;d');
  }
  @Get('succeswithlist')
  getSuccessWithList(): { data: any } {
    return {
      data: [
        {
          name: 'maths',
          completed: false,
          somedata: 'somedata',
        },
        {
          name: 'maths',
          completed: false,
          somedata: 'somedata',
        },
        {
          name: 'maths',
          completed: false,
          somedata: 'somedata',
        },
        {
          name: 'maths',
          completed: false,
          somedata: 'somedata',
        },
        {
          name: 'maths',
          completed: false,
          somedata: 'somedata',
        },
      ],
    };
  }
  @Get('succeswithlistp')
  getSuccessWithListp(): { data: any; pagination: any } {
    return {
      data: [
        {
          name: 'maths',
          completed: false,
          somedata: 'somedata',
        },
        {
          name: 'maths',
          completed: false,
          somedata: 'somedata',
        },
        {
          name: 'maths',
          completed: false,
          somedata: 'somedata',
        },
        {
          name: 'maths',
          completed: false,
          somedata: 'somedata',
        },
        {
          name: 'maths',
          completed: false,
          somedata: 'somedata',
        },
      ],
      pagination: {
        current_page: 1,
        next_page: 2,
        previous_page: null,
        total_pages: 50,
        per_page: 10,
        total_entries: 500,
      },
    };
  }
  @Get('employee')
  getEmployee(): { data: Employee } {
    const emp = new Employee(12, 'sammy');
    const serialno = emp.getSalary();
    return {
      data: emp,
    };
  }
  @Get('employees')
  getEmployees(): { data: Employee[] } {
    const emp = new Employee(12, 'sammy');
    const serialno = emp.getSalary();
    return {
      data: [emp, emp, emp, new Employee(300, 'leonidas')],
    };
  }
}
