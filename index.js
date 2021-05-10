const { prompt } = require('inquirer');
const db = require('./db')
require('console.table');


const start = async () => {
    const { wyd } = await prompt({
        name: 'wyd',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Jobs', 'View All Departments', 'Add Employee', 'Add Job', 'Add Department', 'Update Employee Role', 'Exit'],
    })
    switch (wyd) {
        case 'View All Employees':
            // calls the function below
            viewAllEmp();
            break;
        case 'View All Jobs':
            viewAllJobs();
            break;
        case 'View All Departments':
            viewAllDept();
            break;
        case 'Add Employee':
            addEmp();
            break;
        case 'Add Job':
            addJob();
            break;
        case 'Add Department':
            addDept();
            break;
        case 'Update Employee Role':
            updateEmp();
            break;
        default:
            return quit();
    };
};

const viewAllEmp = async () => {
    const employees = await db.viewAllEmp();
    // db.viewAllEmp() calls function in db index.js file
    console.log('\n');
    console.table(employees);
    start();
};

const viewAllJobs = async () => {
    const jobs = await db.viewAllJobs();
    console.log('\n');
    console.table(jobs);
    start();
};

const viewAllDept = async () => {
    const departments = await db.viewAllDept();
    console.log('\n');
    console.table(departments);
    start();
};

const addEmp = async () => {
    const jobs = await db.viewAllJobs();
    const employees = await db.viewAllEmp();

    const employee = await prompt([
        {
            name: 'first_name',
            message: "What is the new employee's first name?",
        },
        {
            name: 'last_name',
            message: "What is the new employee's last name?",
        },
    ]);

    const jobChoices = jobs.map(({ id, title }) => ({
        name: title,
        value: id,
    }));

    const { jobId } = await prompt({
        type: "list",
        name: "jobId",
        message: "What is the new employee's job?",
        choices: jobChoices,
    });

    employee.job_id = jobId;

    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }));

    managerChoices.unshift({ name: 'None', value: null })

    const { managerId } = await prompt({
        type: "list",
        name: "managerId",
        message: "Who is the new employee's manager?",
        choices: managerChoices,
    });

    employee.manager_id = managerId;

    await db.addEmp(employee);
    console.log(`added ${employee.first_name} ${employee.last_name} as new employee`);

    start();
};

const addJob = async () => {
    const dept = await db.viewAllDept();

    const job = await prompt([
        {
            name: 'title',
            message: "What is the title of the new job?",
        },
        {
            name: 'salary',
            message: "How much does the new job make?",
            validate: answer => {
                const pass = answer.match(/^[1-9]\d*$/);
                if (pass) {
                    return true
                }
                return "please enter a number greater than 0"
            },
        }
    ]);

    const deptChoices = dept.map(({ id, name }) => ({
        name: name,
        value: id,
    }));

    deptChoices.unshift({ name: 'None', value: null })

    const { deptId } = await prompt({
        type: "list",
        name: "deptId",
        message: "What department does the new job belong to?",
        choices: deptChoices,
    });

    job.department_id = deptId;

    await db.addJob(job);
    console.log(`added ${job.title} as a new job`);

    start();
}

const addDept = async () => {
    const department = await prompt({
        name: 'name',
        message: "What is the name of the new department?",
    });

    await db.addDept(department);
    console.log(`added ${department.name} as new department`);

    start();
}

const updateEmp = async () => {
    const employees = await db.viewAllEmp();
    const jobs = await db.viewAllJobs();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name},${last_name}`,
        value: id,
    }));
    
    const { employeeId } = await prompt({
        type: 'list',
        name: 'employeeId',
        message: 'What employee do you want to update?',
        choices: employeeChoices,
    });

    const jobChoices = jobs.map(({ id, title }) => ({
        name: title,
        value: id,
    }));

    const { jobId } = await prompt({
        type: "list",
        name: "jobId",
        message: "What is the employee's new job?",
        choices: jobChoices,
    });

    await db.updateEmp(employeeId, jobId);
    console.log('employee has been updated');
    start();
}

const quit = () => {
    console.log('Goodbye')
    process.exit();
}

start();
