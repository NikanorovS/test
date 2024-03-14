import { setCurrentDate } from "../js/dateModule.js";

document.addEventListener("DOMContentLoaded", function () {
    setCurrentDate();

    // Находим кнопку "Добавить" и добавляем прослушиватель событий
    var addButton = document.querySelector('.addRowButton');
    addButton.addEventListener('click', addRow);

    function addRow() {
        var tbody = document.getElementById('orderTableBody');
        var lastRow = tbody.lastElementChild;
        var newRowNumber = parseInt(lastRow.firstElementChild.textContent) + 1;
        var newRow = document.createElement('tr');
        newRow.innerHTML = `
          <th scope="row">${newRowNumber}</th>
          <td contenteditable="true" class="startPrice"></td>
          <td contenteditable="true" class="amount"></td>
          <td></td>
          <td>
            <button class="btn btn-success addRowButton">+</button>
            <button class="btn btn-danger deleteRowButton">-</button>
          </td>
        `;
        newRow.classList.add('fade-in');
        tbody.appendChild(newRow);

        // Находим кнопки в добавленной строке и назначаем им обработчики событий
        var addButtons = document.querySelectorAll('.addRowButton');
        var deleteButtons = document.querySelectorAll('.deleteRowButton');
        addButtons.forEach(button => button.addEventListener('click', addRow));
        deleteButtons.forEach(button => button.addEventListener('click', function () {
            deleteRow(this);
        }));

        setTimeout(function () {
            newRow.classList.add('active');
            calculateAverage();
            updateTotal();
            updateTotalCell();
        }, 10);
    }

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

    function updateRowNumbers(tbody) {
        var rows = tbody.querySelectorAll('tr');
        rows.forEach(function (row, index) {
            row.querySelector('th').textContent = index + 1;
        });
    }

    function updateTotal() {
        var total = 0;
        var tbody = document.getElementById('orderTableBody');
        var rows = tbody.querySelectorAll('tr');

        rows.forEach(function (row) {
            var totalCell = row.cells[3];
            if (totalCell.textContent) {
                total += parseFloat(totalCell.textContent);
            }
        });

        document.getElementById('total').textContent = 'Общий доход: $' + total.toFixed(2);
    }

    function updateTotalCell() {
        var total = 0;
        var tbody = document.getElementById('orderTableBody');
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
        var tbody = document.getElementById('orderTableBody');
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
