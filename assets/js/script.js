// Функция для добавления строки в таблицу
function addRow() {
    var tbody = document.querySelector('tbody');
    var lastRow = tbody.lastElementChild;
    var newRowNumber = parseInt(lastRow.firstElementChild.textContent) + 1;
    var newRow = document.createElement('tr');
    newRow.innerHTML = `
      <th scope="row">${newRowNumber}</th>
      <td contenteditable="true" onblur="updateRow(this)">0</td>
      <td contenteditable="true" onblur="updateRow(this)">0</td>
      <td></td>
      <td>
        <button class="btn btn-success" onclick="addRow()">+</button>
        <button class="btn btn-danger" onclick="deleteRow(this)">-</button>
      </td>
    `;
    tbody.appendChild(newRow);
  }
  
  // Функция для удаления строки из таблицы
  function deleteRow(button) {
    var row = button.closest('tr');
    row.remove();
    updateTotal();
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
  }
  
  // Функция для обновления общей суммы
  function updateTotal() {
    var total = 0;
    var tbody = document.querySelector('tbody');
    var rows = tbody.querySelectorAll('tr');
  
    rows.forEach(function(row) {
      var totalCell = row.cells[3];
      if (totalCell.textContent) {
        total += parseFloat(totalCell.textContent);
      }
    });
  
    document.getElementById('total').textContent = 'Общая сумма: $' + total.toFixed(2);
  }
  