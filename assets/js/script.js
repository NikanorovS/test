'use strict';

// Функція для додавання нового рядка у таблицю
function addRow() {
    var tbody = document.querySelector('tbody');
    var lastRow = tbody.lastElementChild;
    var newRowNumber = parseInt(lastRow.firstElementChild.textContent) + 1;
    var newRow = document.createElement('tr');
    newRow.innerHTML = `
      <th scope="row">${newRowNumber}</th>
      <td contenteditable="true" onblur="updateRow(this)"></td>
      <td contenteditable="true" onblur="updateRow(this)" onclick="focusCell(this)"></td>
      <td></td>
      <td>
        <button class="btn btn-success" onclick="addRow()">+</button>
        <button class="btn btn-danger" onclick="deleteRow(this)">-</button>
      </td>
    `;
    newRow.classList.add('fade-in');
    tbody.appendChild(newRow);
    setTimeout(function () {
        newRow.classList.add('active');
        updateTotal();
        updateTotalCell();
        calculateAverage();
        focusCell(newRow.querySelector('td:nth-child(2)'));
    }, 10);
}

// Функція для фокусування на вибраній комірці
function focusCell(cell) {
    cell.focus();
}

// Функція для видалення рядка з таблиці
function deleteRow(button) {
    var row = button.closest('tr');
    var tbody = row.parentNode;
    row.classList.add('fade-out');
    setTimeout(function () {
        row.remove();
        updateRowNumbers(tbody);
        updateTotal();
        updateTotalCell();
        calculateAverage();
    }, 500);
}

// Функція для оновлення номерів рядків у таблиці
function updateRowNumbers(tbody) {
    var rows = tbody.querySelectorAll('tr');
    rows.forEach(function (row, index) {
        row.querySelector('th').textContent = index + 1;
    });
}

// Функція для оновлення даних рядка таблиці
function updateRow(cell) {
    var row = cell.closest('tr');
    var startPrice = parseInt(row.cells[1].textContent.trim());
    var amount = parseInt(row.cells[2].textContent.trim());
    var totalAmount;

    if (amount <= 400) {
        totalAmount = (amount - startPrice) * 0.06;
    } else if (amount >= 401 && amount <= 599) {
        totalAmount = (amount - startPrice) * 0.08;
    } else if (amount >= 600 && amount <= 899) {
        totalAmount = (amount - startPrice) * 0.12;
    } else if (amount >= 900 && amount <= 1399) {
        totalAmount = (amount - startPrice) * 0.14;
    } else {
        totalAmount = (amount - startPrice) * 0.16;
    }

    row.cells[3].textContent = totalAmount.toFixed(2);
    updateTotal();
    updateTotalCell();
    calculateAverage();
}

// Функція для оновлення загального доходу
function updateTotal() {
    var total = 0;
    var tbody = document.querySelector('tbody');
    var rows = tbody.querySelectorAll('tr');

    rows.forEach(function (row) {
        var totalCell = row.cells[3];
        if (totalCell.textContent) {
            total += parseFloat(totalCell.textContent);
        }
    });

    document.getElementById('total').textContent = 'Общий доход: $' + total.toFixed(2);
}

// Функція для оновлення загальної суми
function updateTotalCell() {
    var total = 0;
    var tbody = document.querySelector('tbody');
    var rows = tbody.querySelectorAll('tr');

    rows.forEach(function (row) {
        var totalCell = row.cells[2];
        if (totalCell.textContent) {
            total += parseFloat(totalCell.textContent);
        }
    });

    var totalCellElement = document.getElementById('totalCell');
    var currentTotal = parseFloat(totalCellElement.textContent.replace(/[^\d.-]/g, ''));
    var newTotal = total.toFixed(2);

    if (parseFloat(newTotal) > currentTotal) {
        totalCellElement.innerHTML = 'Общая сумма: $<span class="flash">' + newTotal + '</span>';
        setTimeout(() => {
            var flashElement = document.querySelector('.flash');
            flashElement.classList.remove('flash');
        }, 1000);
    } else {
        totalCellElement.textContent = 'Общая сумма: $' + newTotal;
    }
}

// Функція для оновлення середнього чека
function calculateAverage() {
    var total = 0;
    var count = 0;
    var tbody = document.querySelector('tbody');
    var rows = tbody.querySelectorAll('tr');

    rows.forEach(function (row) {
        var value = parseFloat(row.cells[2].textContent);
        if (!isNaN(value)) {
            total += value;
            count++;
        }
    });

    var average = count > 0 ? total / count : 0;
    var averageDisplay = document.getElementById('averagePrice');
    averageDisplay.textContent = 'Средний чек: $' + average.toFixed(2);
}

// Функция для генерации скриншота страницы и скачивания его
function downloadScreenshot() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
    var year = currentDate.getFullYear();

    if (month < 10) {
        month = '0' + month; // Добавляем ведущий ноль, если месяц меньше 10
    }
    if (day < 10) {
        day = '0' + day; // Добавляем ведущий ноль, если день меньше 10
    }

    var formattedDate = year + '-' + month + '-' + day;

    // Захватываем всю видимую область страницы
    html2canvas(document.body).then(function(canvas) {
        var link = document.createElement('a');
        link.download = 'screenshot_' + formattedDate + '.png'; // Добавляем текущую дату в название скриншота
        link.href = canvas.toDataURL();
        link.click();
    });
}

// Функція для ініціалізації
document.addEventListener("DOMContentLoaded", function () {
    var currentDateElement = document.getElementById('currentDate');
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }

    var formattedDate = day + '.' + month + '.' + year;
    currentDateElement.textContent += formattedDate;
});
