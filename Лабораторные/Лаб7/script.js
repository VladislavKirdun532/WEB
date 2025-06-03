// Часть 1: Расчет минут с начала занятия

function updateCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('currentTime').value = `${hours}:${minutes}`;
}

function calculateMinutes() {
    const startTimeStr = document.getElementById('startTime').value;
    const currentTimeStr = document.getElementById('currentTime').value;
    
    if (!startTimeStr || !currentTimeStr) {
        alert('Пожалуйста, введите время начала занятия и обновите текущее время');
        return;
    }
    
    try {
        const [startHours, startMinutes] = startTimeStr.split(':').map(Number);
        const [currentHours, currentMinutes] = currentTimeStr.split(':').map(Number);
        
        const startDate = new Date();
        startDate.setHours(startHours, startMinutes, 0, 0);
        
        const currentDate = new Date();
        currentDate.setHours(currentHours, currentMinutes, 0, 0);
        
        if (currentDate < startDate) {
            alert('Текущее время не может быть раньше времени начала занятия');
            return;
        }
        
        const diffMs = currentDate - startDate;
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        
        document.getElementById('minutesResult').innerHTML = `
            <p>С начала занятия прошло: <strong>${diffMinutes}</strong> минут</p>
        `;
    } catch (e) {
        alert('Ошибка в формате времени. Используйте формат ЧЧ:ММ');
    }
}

// Часть 2: Учет сотрудников

function addEmployee() {
    const name = document.getElementById('employeeName').value.trim();
    const hourlyRate = document.getElementById('hourlyRate').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (!name || !hourlyRate || !startDate || !endDate) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    
    if (new Date(endDate) < new Date(startDate)) {
        alert('Дата окончания не может быть раньше даты начала');
        return;
    }
    
    const employee = {
        name,
        hourlyRate: parseFloat(hourlyRate),
        startDate,
        endDate
    };
    
    let employees = JSON.parse(localStorage.getItem('employees') || '[]');
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
    
    document.getElementById('employeeName').value = '';
    document.getElementById('hourlyRate').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    
    displayEmployees();
}

function displayEmployees() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const container = document.getElementById('employeesList');
    
    if (employees.length === 0) {
        container.innerHTML = '<p>Нет данных о сотрудниках</p>';
        return;
    }
    
    let html = '<h3>Список сотрудников:</h3>';
    employees.forEach((emp, index) => {
        html += `
            <div class="employee-item">
                <p><strong>${emp.name}</strong></p>
                <p>Оплата за час: ${emp.hourlyRate} руб</p>
                <p>Период работы: ${emp.startDate} - ${emp.endDate}</p>
                <button onclick="calculateForEmployee(${index})">Рассчитать</button>
                <button onclick="deleteEmployee(${index})" style="background-color: #f44336;">Удалить</button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function deleteEmployee(index) {
    let employees = JSON.parse(localStorage.getItem('employees') || '[]');
    if (index >= 0 && index < employees.length) {
        employees.splice(index, 1);
        localStorage.setItem('employees', JSON.stringify(employees));
        displayEmployees();
    }
}

function calculateForEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    if (index < 0 || index >= employees.length) return;
    
    const emp = employees[index];
    const result = calculateEmployeeStats(emp);
    
    document.getElementById('employeesResult').innerHTML = `
        <h3>Результаты для ${emp.name}:</h3>
        <p>Количество рабочих дней: ${result.workingDays}</p>
        <p>Количество выходных дней: ${result.weekendDays}</p>
        <p>Размер гонорара: ${result.salary.toFixed(2)} руб</p>
    `;
}

function calculateAll() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    if (employees.length === 0) {
        alert('Нет данных о сотрудниках');
        return;
    }
    
    let html = '<h3>Результаты для всех сотрудников:</h3>';
    
    employees.forEach(emp => {
        const result = calculateEmployeeStats(emp);
        html += `
            <div class="employee-result">
                <p><strong>${emp.name}</strong></p>
                <p>Рабочих дней: ${result.workingDays}</p>
                <p>Выходных дней: ${result.weekendDays}</p>
                <p>Гонорар: ${result.salary.toFixed(2)} руб</p>
                <hr>
            </div>
        `;
    });
    
    document.getElementById('employeesResult').innerHTML = html;
}

function calculateEmployeeStats(employee) {
    const startDate = new Date(employee.startDate);
    const endDate = new Date(employee.endDate);
    
    // Устанавливаем время на 00:00:00 для точного подсчета дней
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    
    let workingDays = 0;
    let weekendDays = 0;
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            weekendDays++;
        } else {
            workingDays++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    const salary = workingDays * 8 * employee.hourlyRate;
    
    return {
        workingDays,
        weekendDays,
        salary
    };
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentTime();
    displayEmployees();
});