'use strict'

// Функция для добавления строки в таблицу
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
        focusCell(newRow.querySelector('td:nth-child(2)')); // Активуємо другий стовпчик для вводу даних
    }, 10);
}

function focusCell(cell) {
    cell.focus();
}


// Функция для удаления строки из таблицы
function deleteRow(button) {
    var row = button.closest('tr');
    var tbody = row.parentNode;
    row.classList.add('fade-out');
    setTimeout(function () {
        row.remove();
        updateRowNumbers(tbody); // Обновление номеров строк после удаления
        updateTotal();
        updateTotalCell();
        calculateAverage(); // Вызываем функцию после удаления строки
    }, 500);
}

function updateRowNumbers(tbody) {
    var rows = tbody.querySelectorAll('tr');
    rows.forEach(function (row, index) {
        row.querySelector('th').textContent = index + 1;
    });
}

// Функция для обновления строки таблицы
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

// Функция для обновления общего дохода
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

// Функция для обновления общей суммы
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

    // Если новая сумма больше предыдущей, добавляем анимацию мигания
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

// Функция для обновления среднего чека
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

//Дата
document.addEventListener("DOMContentLoaded", function () {

    // Находим элемент с id "currentDate"
    var currentDateElement = document.getElementById('currentDate');

    // Создаем объект даты с текущей датой и временем
    var currentDate = new Date();

    // Получаем компоненты даты (день, месяц, год)
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
    var year = currentDate.getFullYear();

    if (month < 10) {
        month = '0' + month;
    }

    // Форматируем компоненты даты в строку
    var formattedDate = day + '.' + month + '.' + year;

    // Обновляем содержимое элемента с текущей датой
    currentDateElement.textContent += formattedDate;
});

