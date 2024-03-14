import { setCurrentDate } from "../js/dateModule.js";

document.addEventListener("DOMContentLoaded", function () {
    setCurrentDate();

    // Находим кнопки "Добавить" и "Удалить" и добавляем прослушиватели событий
    var addButton = document.querySelector('.btn-success');
    var deleteButton = document.querySelector('.btn-danger');

    addButton.addEventListener('click', addRow);
    deleteButton.addEventListener('click', function () {
        deleteRow(this);
    });


    // Функция для добавления строки в таблицу
    function addRow() {
        var tbody = document.querySelector('tbody');
        var lastRow = tbody.lastElementChild;
        var newRowNumber = parseInt(lastRow.firstElementChild.textContent) + 1;
        var newRow = document.createElement('tr');
        newRow.innerHTML = `
          <th scope="row">${newRowNumber}</th>
          <td contenteditable="true" onblur="updateRow(this)"></td>
          <td contenteditable="true" onblur="updateRow(this)"></td>
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
            calculateAverage(); // Вызываем функцию после добавления строки
            updateTotal();
            updateTotalCell();
        }, 10);
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
    function updateRow() {
        var row = this.closest('tr');
        var startPrice = parseInt(row.querySelector('#startPrice').textContent.trim());
        var amount = parseInt(row.querySelector('#amount').textContent.trim());
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

        document.getElementById('totalCell').textContent = 'Общая сумма: $' + total.toFixed(2);
    }

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

});