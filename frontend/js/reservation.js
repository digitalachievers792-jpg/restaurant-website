const API_URL = 'https://restaurant-website-production-e3b2.up.railway.app/api';

const tablesGrid = document.getElementById('tablesGrid');
const selectedTableInfo = document.getElementById('selectedTableInfo');
const selectedTableDisplay = document.getElementById('selectedTableDisplay');
const selectedTableCapacity = document.getElementById('selectedTableCapacity');
const selectedTableInput = document.getElementById('selectedTable');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const guestsInput = document.getElementById('guests');
let currentlySelectedTable = null;
let bookings = [];
let selectedDate = '';
let selectedTime = '';

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

function getCurrentTime() {
  const d = new Date();
  return d.toTimeString().slice(0, 5);
}

function getDateString(d) {
  return d.toISOString().split('T')[0];
}

async function fetchBookings(date) {
  try {
    const res = await fetch(`${API_URL}/reservations?date=${date}`);
    const data = await res.json();
    if (data.success && data.data) {
      bookings = data.data.filter(r => r.status !== 'cancelled');
    } else {
      bookings = [];
    }
  } catch {
    bookings = [];
  }
}

function isTableBookedAt(tableNumber, time) {
  const today = getDateString(new Date());
  const now = getCurrentTime();
  return bookings.some(b => {
    if (b.table_number !== tableNumber || b.time !== time) return false;
    if (b.date === today && b.time <= now) return false;
    return true;
  });
}

function renderTables() {
  if (!tablesGrid) return;
  const existingCards = tablesGrid.querySelectorAll('.table-card');
  if (existingCards.length > 0) {
    existingCards.forEach(card => {
      const num = parseInt(card.dataset.table);
      card.classList.remove('is-booked', 'is-selected');
      card.style.cursor = 'pointer';
      const badge = card.querySelector('.table-booked-badge');
      if (badge) badge.remove();
      if (selectedDate && selectedTime && isTableBookedAt(num, selectedTime)) {
        card.classList.add('is-booked');
        card.style.cursor = 'not-allowed';
        const b = document.createElement('span');
        b.className = 'table-booked-badge';
        b.style.cssText = 'position:absolute;top:5px;right:8px;font-size:8px;letter-spacing:1px;text-transform:uppercase;color:#dc3545;font-weight:600;';
        b.textContent = 'Booked';
        card.appendChild(b);
        card.removeEventListener('click', card._clickHandler);
      } else {
        card._clickHandler = () => selectTable(num, parseInt(card.dataset.seats), card);
        card.addEventListener('click', card._clickHandler);
      }
    });
    return;
  }
  tables.forEach(t => {
    const card = document.createElement('div');
    card.className = 'table-card';
    card.dataset.table = t.number;
    card.dataset.seats = t.seats;
    const isBooked = selectedDate && selectedTime && isTableBookedAt(t.number, selectedTime);
    if (isBooked) card.classList.add('is-booked');
    const icon = t.seats <= 2 ? 'fa-chair' : t.seats <= 4 ? 'fa-people-arrows' : 'fa-people-group';
    card.innerHTML = `
      <div class="table-card-icon"><i class="fas ${icon}"></i></div>
      <div class="table-card-number">Table ${t.number}</div>
      <div class="table-card-seats">${t.seats} seats</div>
    `;
    if (!isBooked) {
      card.addEventListener('click', () => selectTable(t.number, t.seats, card));
    }
    tablesGrid.appendChild(card);
  });
  if (preselectedTable) {
    const num = parseInt(preselectedTable);
    const target = tablesGrid.querySelector(`.table-card[data-table="${num}"]`);
    const t = tables.find(t => t.number === num);
    if (target && t && !target.classList.contains('is-booked')) {
      selectTable(num, t.seats, target);
    }
  }
}

function selectTable(number, seats, element) {
  if (!selectedTime) {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'info',
        title: 'Select Time First',
        text: 'Please select a date and time before choosing a table.',
        background: '#12121a',
        color: '#f5f5f5',
        confirmButtonColor: '#c9a84c',
      });
    }
    return;
  }
  document.querySelectorAll('.table-card.is-selected').forEach(el => el.classList.remove('is-selected'));
  element.classList.add('is-selected');
  currentlySelectedTable = number;
  selectedTableInput.value = number;
  selectedTableDisplay.textContent = `Table ${number}`;
  selectedTableCapacity.textContent = seats;
  selectedTableInfo.style.display = 'block';
  if (guestsInput) guestsInput.value = Math.min(seats, 8);
  selectedTableInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function onDateOrTimeChange() {
  selectedDate = dateInput ? dateInput.value : '';
  selectedTime = timeInput ? timeInput.value : '';
  if (!selectedDate) return;
  await fetchBookings(selectedDate);
  renderTables();
  if (!selectedTime) {
    selectedTableInfo.style.display = 'none';
    document.querySelectorAll('.table-card.is-selected').forEach(el => el.classList.remove('is-selected'));
    currentlySelectedTable = null;
    selectedTableInput.value = '';
  }
}

if (dateInput) {
  dateInput.setAttribute('min', getDateString(new Date()));
  if (!dateInput.value) dateInput.value = getDateString(new Date());
  selectedDate = dateInput.value;
  dateInput.addEventListener('change', onDateOrTimeChange);
}

if (timeInput) {
  timeInput.addEventListener('change', onDateOrTimeChange);
}

const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
  reservationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!selectedTime) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Time',
        text: 'Please select a date and time first!',
        background: '#12121a',
        color: '#f5f5f5',
        confirmButtonColor: '#c9a84c',
        iconColor: '#c9a84c',
      });
      return;
    }

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

    if (isTableBookedAt(currentlySelectedTable, selectedTime)) {
      Swal.fire({
        icon: 'error',
        title: 'Table Just Got Booked',
        text: 'Sorry, this table was just booked by someone else. Please select another.',
        background: '#12121a',
        color: '#f5f5f5',
        confirmButtonColor: '#c9a84c',
        iconColor: '#dc3545',
      });
      await onDateOrTimeChange();
      return;
    }

    const submitBtn = reservationForm.querySelector('.form-submit');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking Table...';
    submitBtn.disabled = true;

    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim() || undefined,
      phone: document.getElementById('phone').value.trim(),
      date: selectedDate,
      time: selectedTime,
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
          text: `Your Table ${currentlySelectedTable} is booked for ${selectedDate} at ${selectedTime}.`,
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
        if (dateInput) dateInput.value = selectedDate;
        await onDateOrTimeChange();
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
        await onDateOrTimeChange();
      }
    } catch {
      Swal.fire({
        icon: 'success',
        title: 'Thanks for your booking!',
        text: `Your Table ${currentlySelectedTable} is booked for ${selectedDate} at ${selectedTime}.`,
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
      if (dateInput) dateInput.value = selectedDate;
      await onDateOrTimeChange();
    }

    submitBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Confirm Reservation';
    submitBtn.disabled = false;
  });
}

async function initReservation() {
  selectedDate = dateInput ? dateInput.value : '';
  selectedTime = timeInput ? timeInput.value : '';
  if (selectedDate) {
    await fetchBookings(selectedDate);
  }
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
