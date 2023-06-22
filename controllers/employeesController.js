const data = {
    employees: require('../model/employees.json'),
    setEmployee: function (data) {this.employees = data}
};

const getAllEmployees = (req, res) => {
    res.json(data.employees)
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(404).json({'Message': 'First and Last name are required!'})
    }

    data.setEmployee([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(404).json({ "Message": `Employee ID of ${req.body.id} Not Found`})
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployee(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
};

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id !== parseInt(req.body.id));
    if (!employee) {
        return res.status(404).json({"Message": `Employee ID of ${req.body.id} Not Found`})
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployee([...filteredArray])
    res.json(data.employees);
};

const getAnEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id !== parseInt(req.body.id))
    if (!employee) {
        return res.status(404).json({"Message": `Employee of ID ${req.body.id} Not Found`})
    }
    res.json(employee);
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getAnEmployee
};
