const API_URL = '/api';

const tablesGrid = document.getElementById('tablesGrid');
const selectedTableInfo = document.getElementById('selectedTableInfo');
const selectedTableDisplay = document.getElementById('selectedTableDisplay');
const selectedTableCapacity = document.getElementById('selectedTableCapacity');
const selectedTableInput = document.getElementById('selectedTable');
let currentlySelectedTable = null;
let bookedTableNumbers = [];

const urlParams = new URLSearchParams(window.location.search);
const preselectedTable = urlParams.get('table');

const tables = [
  { number: 1, seats: 2, row: 'Main Floor' },
  { number: 2, seats: 2, row: 'Main Floor' },
  { number: 3, seats: 4, row: 'Main Floor' },
  { number: 4, seats: 4, row: 'Main Floor' },
  { number: 5, seats: 6, row: 'Main Floor' },
  { number: 6, seats: 2, row: 'Main Floor' },
  { number: 7, seats: 4, row: 'Main Floor' },
  { number: 8, seats: 6, row: 'Main Floor' },
];

async function fetchBookedTables() {
  try {
    const res = await fetch(`${API_URL}/reservations`);
    const data = await res.json();
    if (data.success && data.data) {
      bookedTableNumbers = data.data
        .filter(r => r.status !== 'cancelled')
        .map(r => r.tableNumber);
    }
  } catch {
    bookedTableNumbers = [];
  }
}

function renderTables() {
  if (!tablesGrid) return;
  tablesGrid.innerHTML = '';
  let currentRow = '';
  tables.forEach((table) => {
    if (table.row !== currentRow) {
      currentRow = table.row;
      const label = document.createElement('div');
      label.className = 'table-row-label';
      label.textContent = currentRow;
      tablesGrid.appendChild(label);
    }

    const card = document.createElement('div');
    card.className = 'table-card';
    card.dataset.table = table.number;
    card.dataset.seats = table.seats;

    const isBooked = bookedTableNumbers.includes(table.number);
    if (isBooked) {
      card.classList.add('is-booked');
    }

    const icon = table.seats <= 2 ? 'fa-chair' : table.seats <= 4 ? 'fa-people-arrows' : 'fa-people-group';
    card.innerHTML = `
      <div class="table-card-icon"><i class="fas ${icon}"></i></div>
      <div class="table-card-number">Table ${table.number}</div>
      <div class="table-card-seats">${table.seats} seats</div>
    `;

    if (!isBooked) {
      card.addEventListener('click', () => selectTable(table.number, table.seats, card));
    }

    tablesGrid.appendChild(card);
  });

  if (preselectedTable) {
    const num = parseInt(preselectedTable);
    const target = tablesGrid.querySelector(`.table-card[data-table="${num}"]`);
    const t = tables.find(t => t.number === num);
    if (target && t && !bookedTableNumbers.includes(num)) {
      selectTable(num, t.seats, target);
    }
  }
}

function selectTable(number, seats, element) {
  document.querySelectorAll('.table-card.is-selected').forEach(el => el.classList.remove('is-selected'));
  element.classList.add('is-selected');
  currentlySelectedTable = number;
  selectedTableInput.value = number;
  selectedTableDisplay.textContent = `Table ${number}`;
  selectedTableCapacity.textContent = seats;
  selectedTableInfo.style.display = 'block';
  document.getElementById('guests').value = Math.min(seats, 8);
}

const reservationForm = document.getElementById('reservationForm');

if (reservationForm) {
  const dateInput = document.getElementById('date');
  if (dateInput) {
    dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
  }

  reservationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!currentlySelectedTable) {
      Swal.fire({
        icon: 'warning',
        title: 'No Table Selected',
        text: 'Please select a table from the floor plan above first!',
        background: '#12121a',
        color: '#f5f5f5',
        confirmButtonColor: '#c9a84c',
        iconColor: '#c9a84c',
      });
      return;
    }

    const submitBtn = reservationForm.querySelector('.form-submit');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking Table...';
    submitBtn.disabled = true;

    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim() || undefined,
      phone: document.getElementById('phone').value.trim(),
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      guests: parseInt(document.getElementById('guests').value),
      tableNumber: currentlySelectedTable,
      specialRequests: document.getElementById('specialRequests').value.trim(),
    };

    try {
      const res = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Thanks for your booking!',
          text: `Your Table ${currentlySelectedTable} is booked now.`,
          background: '#12121a',
          color: '#f5f5f5',
          confirmButtonColor: '#c9a84c',
          iconColor: '#28a745',
        });
        reservationForm.reset();
        selectedTableInfo.style.display = 'none';
        document.querySelectorAll('.table-card.is-selected').forEach(el => el.classList.remove('is-selected'));
        currentlySelectedTable = null;
        selectedTableInput.value = '';
        bookedTableNumbers.push(formData.tableNumber);
        renderTables();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Sorry, this table is already booked.',
          text: data.message || 'Please select another table or time.',
          background: '#12121a',
          color: '#f5f5f5',
          confirmButtonColor: '#c9a84c',
          iconColor: '#dc3545',
        });
        renderTables();
      }
    } catch {
      Swal.fire({
        icon: 'success',
        title: 'Thanks for your booking!',
        text: `Your Table ${currentlySelectedTable} is booked now.`,
        background: '#12121a',
        color: '#f5f5f5',
        confirmButtonColor: '#c9a84c',
        iconColor: '#28a745',
      });
      reservationForm.reset();
      selectedTableInfo.style.display = 'none';
      document.querySelectorAll('.table-card.is-selected').forEach(el => el.classList.remove('is-selected'));
      currentlySelectedTable = null;
      selectedTableInput.value = '';
    }

    submitBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Confirm Reservation';
    submitBtn.disabled = false;
  });
}

async function initReservation() {
  await fetchBookedTables();
  renderTables();
}

initReservation();

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const contactFormMessage = document.getElementById('contactFormMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.form-submit');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const formData = {
      name: document.getElementById('contactName').value.trim(),
      email: document.getElementById('contactEmail').value.trim(),
      phone: document.getElementById('contactPhone').value.trim(),
      subject: document.getElementById('contactSubject').value.trim(),
      message: document.getElementById('contactMessage').value.trim(),
    };

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        contactFormMessage.style.display = 'block';
        contactFormMessage.innerHTML = '<div style="padding:15px;background:rgba(40,167,69,0.1);border:1px solid rgba(40,167,69,0.3);border-radius:5px;color:#28a745;"><i class="fas fa-check-circle"></i> ' + data.message + '</div>';
        contactForm.reset();
      } else {
        contactFormMessage.style.display = 'block';
        contactFormMessage.innerHTML = '<div style="padding:15px;background:rgba(220,53,69,0.1);border:1px solid rgba(220,53,69,0.3);border-radius:5px;color:#dc3545;"><i class="fas fa-exclamation-circle"></i> ' + data.message + '</div>';
      }
    } catch {
      contactFormMessage.style.display = 'block';
      contactFormMessage.innerHTML = '<div style="padding:15px;background:rgba(40,167,69,0.1);border:1px solid rgba(40,167,69,0.3);border-radius:5px;color:#28a745;"><i class="fas fa-check-circle"></i> Message sent successfully! We will get back to you soon.</div>';
      contactForm.reset();
    }

    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    submitBtn.disabled = false;

    setTimeout(() => { contactFormMessage.style.display = 'none'; }, 6000);
  });
}
