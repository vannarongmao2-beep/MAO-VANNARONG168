/**
 * Business Family — Core Application Engine & Data Controller
 */

// Initial Seed Data (Saved to localStorage if not existing)
const DEFAULT_STATE = {
  members: [
    { id: 'm1', name: 'Mao Mon', branch: 'Main Household', role: 'FAMILY_LEADER', occupation: 'Group Chairman', phone: '+1 (555) 019-2831', status: 'ACTIVE', color: '#4f46e5', email: 'Mao Mon@nguyenempire.com', joinYear: '1998' },
    { id: 'm2', name: 'Khit Sopheak', branch: 'Main Household', role: 'ADMIN', occupation: 'Chief Investment Officer', phone: '+1 (555) 019-8822', status: 'ACTIVE', color: '#10b981', email: 'Khit Sopheak@nguyenempire.com', joinYear: '2005' },
    { id: 'm3', name: 'Eam Raksmey', branch: 'Real Estate Branch', role: 'FAMILY_LEADER', occupation: 'Managing Partner', phone: '+1 (555) 014-9931', status: 'ACTIVE', color: '#f59e0b', email: 'Eam Raksmey@nguyenrealty.com', joinYear: '2010' },
    { id: 'm4', name: 'Lokpu Kheang', branch: 'Tech & Logistics Branch', role: 'MEMBER', occupation: 'VP of Technology', phone: '+1 (555) 018-2234', status: 'ACTIVE', color: '#06b6d4', email: 'Lokpu Kheang@vanguardlogistics.com', joinYear: '2018' },
    { id: 'm5', name: 'Pu Ben', branch: 'Heritage & Hospitality Branch', role: 'MEMBER', occupation: 'Hotel Chain Director', phone: '+1 (555) 012-7711', status: 'ACTIVE', color: '#8b5cf6', email: 'Pu Ben@heritageresorts.com', joinYear: '2022' }
  ],
  transactions: [
    { id: 't1', title: 'Q1 Real Estate Dividend Distribution', memberId: 'm3', memberName: 'Mao Mon', category: 'Real Estate Dividend', type: 'INCOME', amount: 120000, date: '2026-06-15', status: 'COMPLETED' },
    { id: 't2', title: 'Tech Logistics Fleet Maintenance', memberId: 'm4', memberName: 'Khit Sopheak', category: 'Operations', type: 'EXPENSE', amount: 18500, date: '2026-06-18', status: 'COMPLETED' },
    { id: 't3', title: 'Heritage Resort Expansion Reserve', memberId: 'm5', memberName: 'Eam Raksmey', category: 'CapEx', type: 'EXPENSE', amount: 45000, date: '2026-06-22', status: 'COMPLETED' },
    { id: 't4', title: 'Global Equity Portfolio Quarterly Payout', memberId: 'm2', memberName: 'Lokpu Kheang', category: 'Investment Payout', type: 'INCOME', amount: 85000, date: '2026-07-01', status: 'COMPLETED' },
    { id: 't5', title: 'Annual Family Scholarship Endowment', memberId: 'm1', memberName: 'Pu Ben', category: 'Education Trust', type: 'EXPENSE', amount: 25000, date: '2026-07-10', status: 'COMPLETED' }
  ],
  businesses: [
    { id: 'b1', name: 'Nguyen Real Estate Group', sector: 'Commercial Property & Land Trust', share: 100, valuation: 8500000, revenue: 1450000, growth: '+14.2%', icon: 'fa-building-user' },
    { id: 'b2', name: 'Vanguard Family Logistics Co.', sector: 'Cold Chain Supply & Transport', share: 75, valuation: 4200000, revenue: 890000, growth: '+9.8%', icon: 'fa-truck-fast' },
    { id: 'b3', name: 'Heritage Boutique Hotels & Resorts', sector: 'Luxury Hospitality', share: 90, valuation: 3100000, revenue: 620000, growth: '+6.5%', icon: 'fa-hotel' },
    { id: 'b4', name: 'Aether Capital Venture Fund', sector: 'Early Stage Tech Investments', share: 60, valuation: 2500000, revenue: 410000, growth: '+22.1%', icon: 'fa-chart-candlestick' }
  ],
  branches: [
    { id: 'node-root', name: 'Nguyen Big Family Council', type: 'BIG_FAMILY', leader: 'Mao Mon', netWorth: '$18,300,000' },
    { id: 'node-b1', name: 'Real Estate Branch', type: 'SMALL_FAMILY', leader: 'Khit Sopheak', netWorth: '$8,500,000' },
    { id: 'node-b2', name: 'Tech & Logistics Branch', type: 'SMALL_FAMILY', leader: 'Lokpu Kheang', netWorth: '$4,200,000' },
    { id: 'node-b3', name: 'Heritage & Hospitality', type: 'SMALL_FAMILY', leader: 'Eam Raksmey', netWorth: '$3,100,000' }
  ]
};

// Application State
let appData = { ...DEFAULT_STATE };
let cashflowChartInstance = null;
let allocationChartInstance = null;
let incomeChartInstance = null;
let expenseChartInstance = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupNavigation();
  setupTheme();
  renderDashboard();
  renderMemberSelects();
});

// Load / Save Data from Local Storage
function loadData() {
  const saved = localStorage.getItem('business_family_app_data');
  if (saved) {
    try {
      appData = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved data, resetting to default.');
    }
  } else {
    saveData();
  }
}

function saveData() {
  localStorage.setItem('business_family_app_data', JSON.stringify(appData));
}

// Data Export & Import Handlers
function exportAppData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `BusinessFamily_Backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Backup data file downloaded successfully!');
}

function importAppData(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.members && imported.transactions) {
        appData = imported;
        saveData();
        showToast('Data imported successfully!');
        renderDashboard();
        renderMemberSelects();
        renderDirectory();
        renderFamilyTree();
      } else {
        alert('Invalid data format.');
      }
    } catch (err) {
      alert('Failed to parse JSON backup file.');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Navigation Tabs Handler
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = item.getAttribute('data-tab');
      switchTab(tabId);
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));

  const selectedNav = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
  const selectedPane = document.getElementById(`tab-${tabId}`);

  if (selectedNav) selectedNav.classList.add('active');
  if (selectedPane) selectedPane.classList.add('active');

  const titles = {
    dashboard: 'Executive Overview',
    tree: 'Family Tree & Node Hierarchy',
    finances: 'Family Financial Management (P&L)',
    portfolio: 'Business Portfolio Holdings',
    directory: 'Family Member Roster',
    timeline: 'Family Empire Timeline & History',
    documents: 'Family Charter & Legal Vault'
  };
  document.getElementById('page-title').innerText = titles[tabId] || 'Business Family';

  if (tabId === 'dashboard') renderDashboard();
  if (tabId === 'tree') renderFamilyTree();
  if (tabId === 'finances') renderFinances();
  if (tabId === 'portfolio') renderPortfolio();
  if (tabId === 'directory') renderDirectory();
}

// Render Dashboard View
function renderDashboard() {
  const totalIncome = appData.transactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = appData.transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  document.getElementById('metric-income').innerText = `$${(totalIncome + 150000).toLocaleString()}`;
  document.getElementById('metric-expenses').innerText = `$${totalExpense.toLocaleString()}`;
  document.getElementById('metric-members').innerText = `${appData.members.length} Members`;

  const recentTable = document.getElementById('recent-transactions-list');
  recentTable.innerHTML = appData.transactions.slice(0, 5).map(t => `
    <tr>
      <td><strong>${t.memberName || 'Family Member'}</strong></td>
      <td>
        <span class="status-pill ${t.type === 'INCOME' ? 'status-active' : 'status-pending'}">
          ${t.type}
        </span>
      </td>
      <td>${t.category}</td>
      <td style="font-weight:700; color: ${t.type === 'INCOME' ? '#10b981' : '#ef4444'}">
        ${t.type === 'INCOME' ? '+' : '-'}$${Number(t.amount).toLocaleString()}
      </td>
      <td>${t.date}</td>
      <td><span class="status-pill status-active">Verified</span></td>
    </tr>
  `).join('');

  initCashflowChart();
  initAllocationChart();
}

// Charts Initialization
function initCashflowChart() {
  const ctx = document.getElementById('cashflow-chart');
  if (!ctx) return;
  if (cashflowChartInstance) cashflowChartInstance.destroy();

  cashflowChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Business Revenues ($)',
          data: [180000, 195000, 210000, 225000, 240000, 245800, 260000],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Family Operating Expenses ($)',
          data: [38000, 41000, 39500, 44000, 42000, 42300, 41000],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#9ca3af' } } },
      scales: {
        x: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });
}

function initAllocationChart() {
  const ctx = document.getElementById('allocation-chart');
  if (!ctx) return;
  if (allocationChartInstance) allocationChartInstance.destroy();

  allocationChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Commercial Real Estate', 'Tech Logistics', 'Hospitality & Resorts', 'Venture Capital', 'Cash Reserves'],
      datasets: [{
        data: [45, 22, 16, 12, 5],
        backgroundColor: ['#4f46e5', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af', font: { size: 11 } } } }
    }
  });
}

// Family Tree Visualizer Render
function renderFamilyTree() {
  const treeContainer = document.getElementById('tree-canvas');
  if (!treeContainer) return;

  treeContainer.innerHTML = `
    <div style="width:100%; text-align:center; padding:10px;">
      
      <!-- Root Node (Big Family) -->
      <div class="tree-level">
        <div class="tree-node-card" style="border: 2px solid var(--accent-gold); box-shadow: 0 0 25px rgba(245, 158, 11, 0.3);" onclick="inspectMember('m1')">
          <span class="tree-node-badge badge-big">Big Family Council</span>
          <div class="node-avatar" style="background:linear-gradient(135deg, #f59e0b, #d97706);"><i class="fa-solid fa-crown"></i></div>
          <div class="node-name">មេធំ</div>
          <div class="node-role">Head: Vathanoch</div>
          <div class="node-networth">Combined Assets: $18,300,000</div>
        </div>
      </div>

      <!-- Connecting Vertical Line -->
      <div style="width:2px; height:35px; background:var(--accent-primary); margin: -30px auto 20px auto;"></div>

      <!-- Branch Level Nodes -->
      <div class="tree-level">
        ${appData.branches.filter(b => b.type === 'SMALL_FAMILY').map(b => `
          <div class="tree-node-card">
            <span class="tree-node-badge badge-small">Family Branch</span>
            <div class="node-avatar" style="background:linear-gradient(135deg, #4f46e5, #06b6d4);"><i class="fa-solid fa-house-flag"></i></div>
            <div class="node-name">${b.name}</div>
            <div class="node-role">Leader: ${b.leader}</div>
            <div class="node-networth">Net Worth: ${b.netWorth}</div>
          </div>
        `).join('')}
      </div>

      <!-- Members Level -->
      <div style="width:85%; height:2px; background:rgba(255,255,255,0.1); margin: -30px auto 20px auto;"></div>
      
      <div class="tree-level">
        ${appData.members.map(m => `
          <div class="tree-node-card" onclick="inspectMember('${m.id}')">
            <span class="tree-node-badge badge-indiv">${m.role}</span>
            <div class="node-avatar" style="background:${m.color || '#4f46e5'};">
              ${m.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div class="node-name">${m.name}</div>
            <div class="node-role">${m.occupation}</div>
            <div class="node-networth" style="color:var(--text-muted); font-size:0.75rem;">${m.branch}</div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

// Member Inspection Modal
function inspectMember(id) {
  const member = appData.members.find(m => m.id === id);
  if (!member) return;

  const memberTxs = appData.transactions.filter(t => t.memberId === id);
  const totalInc = memberTxs.filter(t => t.type === 'INCOME').reduce((s, t) => s + Number(t.amount), 0);
  const totalExp = memberTxs.filter(t => t.type === 'EXPENSE').reduce((s, t) => s + Number(t.amount), 0);

  document.getElementById('inspect-member-name').innerText = member.name;
  document.getElementById('inspect-member-body').innerHTML = `
    <div style="text-align:center; margin-bottom:1.5rem;">
      <div class="user-avatar" style="width:64px; height:64px; font-size:1.5rem; margin: 0 auto 10px auto; background:${member.color || '#4f46e5'};">
        ${member.name.split(' ').map(n=>n[0]).join('')}
      </div>
      <h3 style="font-size:1.3rem; font-weight:700;">${member.name}</h3>
      <p style="color:var(--accent-gold); font-size:0.85rem; font-weight:600;">${member.role} — ${member.branch}</p>
    </div>

    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; font-size:0.88rem; margin-bottom:1.5rem;">
      <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:8px;">
        <span style="color:var(--text-muted); display:block; font-size:0.75rem;">Occupation</span>
        <strong>${member.occupation}</strong>
      </div>
      <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:8px;">
        <span style="color:var(--text-muted); display:block; font-size:0.75rem;">Phone Number</span>
        <strong>${member.phone}</strong>
      </div>
      <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:8px;">
        <span style="color:var(--text-muted); display:block; font-size:0.75rem;">Email Address</span>
        <strong>${member.email || 'N/A'}</strong>
      </div>
      <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:8px;">
        <span style="color:var(--text-muted); display:block; font-size:0.75rem;">Join / Tenure</span>
        <strong>Since ${member.joinYear || '2020'}</strong>
      </div>
    </div>

    <div style="border-top:1px solid var(--border-color); padding-top:1rem;">
      <h4 style="font-size:0.9rem; font-weight:700; margin-bottom:10px;">Financial Ledger Summary</h4>
      <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:6px;">
        <span>Total Logged Income:</span>
        <strong style="color:var(--accent-emerald);">+$${totalInc.toLocaleString()}</strong>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
        <span>Total Logged Expenses:</span>
        <strong style="color:var(--accent-rose);">-$${totalExp.toLocaleString()}</strong>
      </div>
    </div>
  `;

  openModal('member-detail-modal');
}

// Financial P&L Tab Render
function renderFinances() {
  const ledgerTable = document.getElementById('full-ledger-list');
  ledgerTable.innerHTML = appData.transactions.map(t => `
    <tr>
      <td><strong>${t.title}</strong></td>
      <td>${t.memberName || 'N/A'}</td>
      <td>${t.category}</td>
      <td>
        <span class="status-pill ${t.type === 'INCOME' ? 'status-active' : 'status-pending'}">
          ${t.type}
        </span>
      </td>
      <td style="font-weight:700; color: ${t.type === 'INCOME' ? '#10b981' : '#ef4444'}">
        ${t.type === 'INCOME' ? '+' : '-'}$${Number(t.amount).toLocaleString()}
      </td>
      <td>${t.date}</td>
      <td>
        <button class="icon-btn" style="width:30px; height:30px; font-size:0.8rem;" onclick="deleteTransaction('${t.id}')">
          <i class="fa-solid fa-trash" style="color:#ef4444;"></i>
        </button>
      </td>
    </tr>
  `).join('');

  initFinanceCharts();
}

function initFinanceCharts() {
  const ctxIncome = document.getElementById('income-chart');
  const ctxExpense = document.getElementById('expense-chart');

  if (ctxIncome) {
    if (incomeChartInstance) incomeChartInstance.destroy();
    incomeChartInstance = new Chart(ctxIncome, {
      type: 'bar',
      data: {
        labels: ['Real Estate', 'Logistics', 'Hospitality', 'Venture Dividends'],
        datasets: [{
          label: 'Monthly Income ($)',
          data: [120000, 45000, 35000, 45800],
          backgroundColor: '#10b981',
          borderRadius: 8
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#9ca3af' } } } }
    });
  }

  if (ctxExpense) {
    if (expenseChartInstance) expenseChartInstance.destroy();
    expenseChartInstance = new Chart(ctxExpense, {
      type: 'doughnut',
      data: {
        labels: ['CapEx & Fleet', 'Property Maintenance', 'Education Trust', 'Tax & Legal', 'Household'],
        datasets: [{
          data: [18500, 12000, 25000, 8500, 4500],
          backgroundColor: ['#ef4444', '#f59e0b', '#4f46e5', '#8b5cf6', '#06b6d4']
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af' } } } }
    });
  }
}

// Business Portfolio Render
function renderPortfolio() {
  const portfolioGrid = document.getElementById('business-portfolio-list');
  portfolioGrid.innerHTML = appData.businesses.map(b => `
    <div class="business-card">
      <div>
        <div class="business-head">
          <div class="business-icon"><i class="fa-solid ${b.icon || 'fa-building'}"></i></div>
          <span class="status-pill status-active">${b.share}% Family Owned</span>
        </div>
        <div class="business-title">
          <h3>${b.name}</h3>
          <p>${b.sector}</p>
        </div>
        <div style="margin-top:1.2rem; display:flex; justify-content:space-between; font-size:0.85rem;">
          <span style="color:var(--text-muted);">Valuation:</span>
          <strong>$${Number(b.valuation).toLocaleString()}</strong>
        </div>
        <div style="margin-top:0.4rem; display:flex; justify-content:space-between; font-size:0.85rem;">
          <span style="color:var(--text-muted);">Annual Revenue:</span>
          <strong style="color:var(--accent-emerald);">$${Number(b.revenue).toLocaleString()}</strong>
        </div>
        
        <div class="progress-bar">
          <div class="progress-fill" style="width:${b.share}%;"></div>
        </div>
      </div>
      <button class="btn btn-secondary" style="margin-top:1.2rem; width:100%;" onclick="showToast('${b.name} financial report loaded.')">
        View Financial Cap Table
      </button>
    </div>
  `).join('');
}

// Directory Render
function renderDirectory() {
  const memberTable = document.getElementById('member-directory-list');
  memberTable.innerHTML = appData.members.map(m => `
    <tr style="cursor:pointer;" onclick="inspectMember('${m.id}')">
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="user-avatar" style="width:34px; height:34px; font-size:0.8rem; background:${m.color || '#4f46e5'};">
            ${m.name.split(' ').map(n=>n[0]).join('')}
          </div>
          <strong>${m.name}</strong>
        </div>
      </td>
      <td>${m.branch}</td>
      <td><span class="status-pill status-leader">${m.role}</span></td>
      <td>${m.occupation}</td>
      <td>${m.phone}</td>
      <td><span class="status-pill status-active">${m.status}</span></td>
      <td onclick="event.stopPropagation()">
        <button class="icon-btn" style="width:30px; height:30px; font-size:0.8rem;" onclick="deleteMember('${m.id}')">
          <i class="fa-solid fa-trash" style="color:#ef4444;"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// Global Search Filter Handler
function handleGlobalSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  if (!query) {
    renderDashboard();
    renderDirectory();
    renderFinances();
    return;
  }

  // Filter Members
  const filteredMembers = appData.members.filter(m => 
    m.name.toLowerCase().includes(query) || 
    m.branch.toLowerCase().includes(query) || 
    m.occupation.toLowerCase().includes(query)
  );

  const memberTable = document.getElementById('member-directory-list');
  if (memberTable) {
    memberTable.innerHTML = filteredMembers.map(m => `
      <tr style="cursor:pointer;" onclick="inspectMember('${m.id}')">
        <td><strong>${m.name}</strong></td>
        <td>${m.branch}</td>
        <td><span class="status-pill status-leader">${m.role}</span></td>
        <td>${m.occupation}</td>
        <td>${m.phone}</td>
        <td><span class="status-pill status-active">${m.status}</span></td>
        <td onclick="event.stopPropagation()">
          <button class="icon-btn" style="width:30px; height:30px; font-size:0.8rem;" onclick="deleteMember('${m.id}')"><i class="fa-solid fa-trash" style="color:#ef4444;"></i></button>
        </td>
      </tr>
    `).join('');
  }
}

// Role Selector Switcher
function handleRoleChange(role) {
  showToast(`Switched active portal view to ${role}`);
}

// Helper: Populate member dropdowns
function renderMemberSelects() {
  const txMemberSelect = document.getElementById('tx-member');
  if (!txMemberSelect) return;
  txMemberSelect.innerHTML = appData.members.map(m => `
    <option value="${m.id}">${m.name} (${m.branch})</option>
  `).join('');
}

// Form Handlers
function handleCreateTransaction(e) {
  e.preventDefault();
  const title = document.getElementById('tx-title').value;
  const type = document.getElementById('tx-type').value;
  const memberId = document.getElementById('tx-member').value;
  const category = document.getElementById('tx-category').value;
  const amount = document.getElementById('tx-amount').value;

  const memberObj = appData.members.find(m => m.id === memberId);

  const newTx = {
    id: 't_' + Date.now(),
    title,
    type,
    memberId,
    memberName: memberObj ? memberObj.name : 'Family Member',
    category,
    amount: parseFloat(amount),
    date: new Date().toISOString().split('T')[0],
    status: 'COMPLETED'
  };

  appData.transactions.unshift(newTx);
  saveData();
  closeModal('transaction-modal');
  showToast('New transaction logged successfully!');
  renderDashboard();
  renderFinances();
  document.getElementById('form-transaction').reset();
}

function handleCreateMember(e) {
  e.preventDefault();
  const name = document.getElementById('mem-name').value;
  const branch = document.getElementById('mem-node').value;
  const role = document.getElementById('mem-role').value;
  const occupation = document.getElementById('mem-occ').value || 'Member';
  const phone = document.getElementById('mem-phone').value || '+1 (555) 000-0000';

  const newMember = {
    id: 'm_' + Date.now(),
    name,
    branch,
    role,
    occupation,
    phone,
    status: 'ACTIVE',
    color: '#06b6d4',
    email: name.toLowerCase().replace(' ', '.') + '@nguyenempire.com',
    joinYear: new Date().getFullYear().toString()
  };

  appData.members.push(newMember);
  saveData();
  closeModal('member-modal');
  showToast(`Added ${name} to Family Registry!`);
  renderMemberSelects();
  renderDirectory();
  renderFamilyTree();
  document.getElementById('form-member').reset();
}

function handleCreateBusiness(e) {
  e.preventDefault();
  const name = document.getElementById('biz-name').value;
  const sector = document.getElementById('biz-sector').value;
  const share = document.getElementById('biz-share').value;
  const valuation = document.getElementById('biz-valuation').value;

  const newBiz = {
    id: 'b_' + Date.now(),
    name,
    sector,
    share: parseInt(share),
    valuation: parseFloat(valuation),
    revenue: parseFloat(valuation) * 0.15,
    growth: '+10.0%',
    icon: 'fa-briefcase'
  };

  appData.businesses.push(newBiz);
  saveData();
  closeModal('business-modal');
  showToast(`Created entity ${name}`);
  renderPortfolio();
  document.getElementById('form-business').reset();
}

function deleteTransaction(id) {
  if (confirm('Delete this transaction record?')) {
    appData.transactions = appData.transactions.filter(t => t.id !== id);
    saveData();
    showToast('Transaction removed.');
    renderFinances();
    renderDashboard();
  }
}

function deleteMember(id) {
  if (confirm('Remove member from registry?')) {
    appData.members = appData.members.filter(m => m.id !== id);
    saveData();
    showToast('Member removed.');
    renderDirectory();
    renderFamilyTree();
  }
}

// Modal Toggle Utilities
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

// Toast Notifications
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// Theme Toggle
function setupTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;
  toggleBtn.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', nextTheme);
    toggleBtn.innerHTML = nextTheme === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    showToast(`Switched to ${nextTheme} theme`);
  });
}
