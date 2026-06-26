const API_URL = 'http://localhost:5000/api';

const AdminPanel = {
  init() {
    this.cacheDOM();
    this.bindEvents();
    this.loadItems();
  },

  cacheDOM() {
    this.tableBody = document.getElementById('menuTableBody');
    this.itemForm = document.getElementById('itemForm');
    this.formContainer = document.getElementById('formContainer');
    this.items = [];
    this.editingId = null;
  },

  bindEvents() {
    if (this.itemForm) {
      this.itemForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }
  },

  async loadItems() {
    try {
      const res = await fetch(`${API_URL}/menu`);
      const data = await res.json();
      this.items = data.success && data.data.length ? data.data : this.getLocalItems();
    } catch {
      this.items = this.getLocalItems();
    }
    this.renderTable();
  },

  getLocalItems() {
    return JSON.parse(localStorage.getItem('adminMenuItems')) || [];
  },

  saveLocalItems() {
    localStorage.setItem('adminMenuItems', JSON.stringify(this.items));
  },

  renderTable() {
    if (!this.tableBody) return;
    if (!this.items.length) {
      this.tableBody.innerHTML = '<tr><td colspan="6" class="empty"><i class="fas fa-utensils" style="font-size:30px;margin-bottom:10px;color:#c9a84c;"></i><br>No menu items yet.</td></tr>';
      return;
    }
    this.tableBody.innerHTML = this.items.map(item => `
      <tr>
        <td><img src="${item.image}" alt="" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80'"></td>
        <td>${item.name}</td>
        <td><span class="badge badge-success">${item.category}</span></td>
        <td>$${item.price}</td>
        <td><span class="badge badge-warning">Active</span></td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="AdminPanel.editItem('${item._id}')"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-danger" onclick="AdminPanel.deleteItem('${item._id}')"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  },

  async deleteItem(id) {
    if (!confirm('Delete this menu item?')) return;
    try {
      await fetch(`${API_URL}/menu/${id}`, { method: 'DELETE' });
    } catch {
      this.items = this.items.filter(i => i._id !== id);
      this.saveLocalItems();
    }
    this.renderTable();
  },

  editItem(id) {
    const item = this.items.find(i => i._id === id);
    if (!item) return;
    this.editingId = id;
    document.getElementById('formTitle').textContent = 'Edit Menu Item';
    document.getElementById('name').value = item.name;
    document.getElementById('category').value = item.category;
    document.getElementById('price').value = item.price;
    document.getElementById('image').value = item.image || '';
    document.getElementById('description').value = item.description;
    this.formContainer.style.display = 'block';
    window.scrollTo({ top: this.formContainer.offsetTop - 100, behavior: 'smooth' });
  },

  async handleFormSubmit(e) {
    e.preventDefault();
    const data = {
      name: document.getElementById('name').value,
      category: document.getElementById('category').value,
      price: parseFloat(document.getElementById('price').value),
      image: document.getElementById('image').value || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
      description: document.getElementById('description').value,
    };
    try {
      const url = this.editingId ? `${API_URL}/menu/${this.editingId}` : `${API_URL}/menu`;
      const method = this.editingId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await res.json();
      if (!result.success) throw new Error();
    } catch {
      if (this.editingId) {
        const idx = this.items.findIndex(i => i._id === this.editingId);
        if (idx > -1) this.items[idx] = { ...this.items[idx], ...data };
      } else {
        data._id = Date.now().toString();
        this.items.push(data);
      }
      this.saveLocalItems();
    }
    this.editingId = null;
    this.itemForm.reset();
    this.formContainer.style.display = 'none';
    this.renderTable();
  },
};

document.addEventListener('DOMContentLoaded', () => AdminPanel.init());
