/**
 * StudyQuest — Daily Planner & Quest Tracker
 * Main Application Logic
 */

// ==========================================
// 1. Data & State Management
// ==========================================

const SCHEDULE_DATA = {
  1: [ // Monday
    { start: "08:20", end: "09:10", name: "ประวัติฯ/หน้าที่ฯ" },
    { start: "09:10", end: "09:25", name: "พักระหว่างชั่วโมง", isBreak: true },
    { start: "09:25", end: "10:15", name: "ภาษาไทย" },
    { start: "10:15", end: "11:05", name: "อังกฤษเพื่อการสื่อสาร" },
    { start: "11:05", end: "11:55", name: "คณิตฯ เพิ่มเติม" },
    { start: "11:55", end: "12:45", name: "พักรับประทานอาหารกลางวัน", isBreak: true },
    { start: "12:45", end: "13:00", name: "นั่งสมาธิ", isBreak: true },
    { start: "13:00", end: "13:50", name: "ศิลปะ" },
    { start: "13:50", end: "14:40", name: "ฟิสิกส์" },
    { start: "14:40", end: "15:30", name: "แนะแนว/ต้านทุจริตฯ" }
  ],
  2: [ // Tuesday
    { start: "08:20", end: "09:10", name: "สังคมศึกษา" },
    { start: "09:10", end: "09:25", name: "พักระหว่างชั่วโมง", isBreak: true },
    { start: "09:25", end: "10:15", name: "ภาษาจีน" },
    { start: "10:15", end: "11:05", name: "ฟิสิกส์" },
    { start: "11:05", end: "11:55", name: "ฟิสิกส์" },
    { start: "11:55", end: "12:45", name: "พักรับประทานอาหารกลางวัน", isBreak: true },
    { start: "12:45", end: "13:00", name: "นั่งสมาธิ", isBreak: true },
    { start: "13:00", end: "13:50", name: "การงานอาชีพ" },
    { start: "13:50", end: "14:40", name: "วิทยาศาสตร์" },
    { start: "14:40", end: "15:30", name: "คณิตศาสตร์" }
  ],
  3: [ // Wednesday
    { start: "08:20", end: "09:10", name: "การนำเสนอสื่อประสม" },
    { start: "09:10", end: "09:25", name: "พักระหว่างชั่วโมง", isBreak: true },
    { start: "09:25", end: "10:15", name: "การนำเสนอสื่อประสม" },
    { start: "10:15", end: "11:05", name: "ภาษาอังกฤษ" },
    { start: "11:05", end: "11:55", name: "คณิตฯ เพิ่มเติม" },
    { start: "11:55", end: "12:45", name: "พักรับประทานอาหารกลางวัน", isBreak: true },
    { start: "12:45", end: "13:00", name: "นั่งสมาธิ", isBreak: true },
    { start: "13:00", end: "13:50", name: "วิทยาศาสตร์" },
    { start: "13:50", end: "14:40", name: "ชีววิทยา" },
    { start: "14:40", end: "15:30", name: "ชีววิทยา" }
  ],
  4: [ // Thursday
    { start: "08:20", end: "09:10", name: "เคมี" },
    { start: "09:10", end: "09:25", name: "พักระหว่างชั่วโมง", isBreak: true },
    { start: "09:25", end: "10:15", name: "ภาษาไทย" },
    { start: "10:15", end: "11:05", name: "เทคโนฯ/ออกแบบ" },
    { start: "11:05", end: "11:55", name: "คณิตศาสตร์" },
    { start: "11:55", end: "12:45", name: "พักรับประทานอาหารกลางวัน", isBreak: true },
    { start: "12:45", end: "13:00", name: "นั่งสมาธิ", isBreak: true },
    { start: "13:00", end: "13:50", name: "IS (การศึกษาค้นคว้าอิสระ)" },
    { start: "13:50", end: "14:40", name: "พลศึกษา" },
    { start: "14:40", end: "15:30", name: "อังกฤษเพื่อการสื่อสาร" }
  ],
  5: [ // Friday
    { start: "08:20", end: "09:10", name: "ชีววิทยา" },
    { start: "09:10", end: "09:25", name: "พักระหว่างชั่วโมง", isBreak: true },
    { start: "09:25", end: "10:15", name: "ภาษาอังกฤษ" },
    { start: "10:15", end: "11:05", name: "เคมี" },
    { start: "11:05", end: "11:55", name: "เคมี" },
    { start: "11:55", end: "12:45", name: "พักรับประทานอาหารกลางวัน", isBreak: true },
    { start: "12:45", end: "13:00", name: "นั่งสมาธิ", isBreak: true },
    { start: "13:00", end: "13:50", name: "สุขศึกษา" },
    { start: "13:50", end: "14:40", name: "สังคมศึกษา" },
    { start: "14:40", end: "15:30", name: "กิจกรรมชุมนุม" }
  ]
};

const DEFAULT_QUESTS = {
  morning: [],
  afternoon: [],
  evening: []
};

// Global App State
window.AppState = {
  user: null,
  activePage: 'home',
  clockInterval: null,
  pomodoro: {
    active: false,
    timer: null,
    timeLeft: 25 * 60,
    isWorkMode: true,
    taskId: null
  },
  
  // Data caches (offline first)
  data: {
    assignments: [],
    quests: JSON.parse(JSON.stringify(DEFAULT_QUESTS)),
    events: [],
    journal: [],
    notes: {} // Key: subject name, Value: text
  },
  
  // Daily progress
  daily: {
    dateStr: "", // YYYY-MM-DD
    morningDone: false,
    questStatus: {} // { questId: boolean }
  }
};

// ==========================================
// 2. Initialization & Core Functions
// ==========================================

const App = {
  
  init() {
    console.log("StudyQuest initializing...");
    this.checkSession();
    this.setupClock();
    this.setupSubjectSelects();
    
    // Check if new day
    this.checkDailyReset();
    
    // Auto cleanup old tasks
    this.cleanupOldTasks();
  },
  
  // Storage Utils
  saveLocal(key, value) {
    localStorage.setItem(`sq_${key}`, JSON.stringify(value));
  },
  
  loadLocal(key, defaultVal = null) {
    const data = localStorage.getItem(`sq_${key}`);
    return data ? JSON.parse(data) : defaultVal;
  },

  checkSession() {
    const user = this.loadLocal('user');
    if (user) {
      window.AppState.user = user;
      document.getElementById('header-user-name').innerText = user.displayName || user.username;
      this.loadData();
      
      // Routing
      if (!window.AppState.daily.morningDone && this.hasMorningQuests()) {
        this.navTo('morning');
        this.renderMorningQuests();
      } else {
        this.navTo('home');
      }
    } else {
      this.navTo('auth');
    }
  },
  
  async loadData() {
    const defaultData = {
      assignments: [],
      quests: [],
      events: [],
      journal: [],
      subjectNotes: {},
      exp: 0,
      level: 1,
      lastQuestGate: null
    };
    
    // First, try loading from local cache for speed
    const local = localStorage.getItem('sq_data_' + window.AppState.user.username);
    if(local) {
      try {
        window.AppState.data = { ...defaultData, ...JSON.parse(local) };
      } catch(e) {}
    } else {
      window.AppState.data = { ...defaultData };
    }
    
    // Then try to sync from cloud
    try {
      const res = await fetch('/api/data', {
        headers: { 'x-user-id': window.AppState.user.id }
      });
      const resData = await res.json();
      if (resData.success && resData.data && Object.keys(resData.data).length > 0) {
        window.AppState.data = { ...defaultData, ...resData.data };
        // Save to local cache
        localStorage.setItem('sq_data_' + window.AppState.user.username, JSON.stringify(window.AppState.data));
      }
    } catch(err) {
      console.warn('Offline mode: Could not fetch data from cloud.');
    }
  },
  
  saveData() {
    if(!window.AppState.user) return;
    
    // Save locally (Offline-first)
    localStorage.setItem('sq_data_' + window.AppState.user.username, JSON.stringify(window.AppState.data));
    
    // Sync to cloud in background
    fetch('/api/data', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-user-id': window.AppState.user.id
      },
      body: JSON.stringify({ data: window.AppState.data })
    }).catch(err => console.warn('Offline mode: Changes saved locally only.'));
  },
  
  renderAll() {
    this.renderHome();
    this.renderManage();
    this.renderJournal();
    this.renderAnalytics();
    this.renderAlerts();
  },

  checkDailyReset() {
    const today = new Date().toISOString().split('T')[0];
    const savedDaily = this.loadLocal('daily');
    
    if (!savedDaily || savedDaily.dateStr !== today) {
      window.AppState.daily = {
        dateStr: today,
        morningDone: false,
        questStatus: {}
      };
      this.saveLocal('daily', window.AppState.daily);
    } else {
      window.AppState.daily = savedDaily;
    }
  },
  
  // Navigation
  navTo(pageId, tab = null) {
    document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    
    // Update bottom nav
    const bottomNav = document.getElementById('bottom-nav');
    if (['home', 'manage', 'journal'].includes(pageId)) {
      bottomNav.classList.remove('hidden');
      document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
      const activeBtn = document.querySelector(`.nav-item[onclick*="${pageId}"]`);
      if(activeBtn) activeBtn.classList.add('active');
    } else {
      bottomNav.classList.add('hidden');
    }
    
    window.AppState.activePage = pageId;
    
    // Specific tab routing
    if (pageId === 'manage' && tab) {
      this.switchManageTab(tab);
    }
  },

  // ==========================================
  // 3. Authentication
  // ==========================================
  
  toggleAuthMode() {
    const isLogin = document.getElementById('auth-register-fields').classList.contains('hidden');
    if (isLogin) {
      document.getElementById('auth-register-fields').classList.remove('hidden');
      document.getElementById('auth-submit-btn').innerText = 'สมัครสมาชิก';
      document.getElementById('auth-toggle-text').innerText = 'มีบัญชีอยู่แล้ว?';
      document.querySelector('.auth-toggle a').innerText = 'เข้าสู่ระบบ';
    } else {
      document.getElementById('auth-register-fields').classList.add('hidden');
      document.getElementById('auth-submit-btn').innerText = 'เข้าสู่ระบบ';
      document.getElementById('auth-toggle-text').innerText = 'ยังไม่มีบัญชีใช่ไหม?';
      document.querySelector('.auth-toggle a').innerText = 'สมัครสมาชิก';
    }
  },
  
  async handleAuthSubmit() {
    const isRegister = document.getElementById('auth-register-fields').classList.contains('hidden') === false;
    const username = document.getElementById('auth-username').value.trim();
    const password = document.getElementById('auth-password').value.trim();
    const displayName = document.getElementById('auth-display-name').value.trim() || username;
    
    if(!username || !password) return;
    
    if (password.length < 4) {
      this.showToast('รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร', 'error');
      return;
    }
    
    const btn = document.getElementById('auth-submit-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="pulse-dot"></span> กำลังดำเนินการ...';
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isRegister ? 'register' : 'login',
          username,
          password,
          displayName
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        window.AppState.user = data.user;
        this.saveLocal('user', window.AppState.user);
        
        await this.loadData();
        
        this.showToast(isRegister ? 'สมัครสมาชิกสำเร็จ!' : `ยินดีต้อนรับกลับ, ${data.user.displayName}!`, 'success');
        this.init();
      } else {
        this.showToast('เกิดข้อผิดพลาด: ' + data.error, 'error');
        btn.disabled = false;
        btn.innerHTML = isRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ';
      }
    } catch (err) {
      console.error(err);
      this.showToast('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่', 'error');
      btn.disabled = false;
      btn.innerHTML = isRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ';
    }
  },
  
  logout() {
    this.confirm('ออกจากระบบ', 'คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?', () => {
      localStorage.removeItem('sq_user');
      window.AppState.user = null;
      this.navTo('auth');
    });
  },

  // ==========================================
  // 4. UI Utilities (Toast, Dialog, Utils)
  // ==========================================
  
  showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'ℹ️';
    if(type === 'success') icon = '✅';
    if(type === 'error') icon = '❌';
    if(type === 'warning') icon = '⚠️';
    
    toast.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
      if(toast.parentNode) toast.remove();
    }, 3000);
  },
  
  confirm(title, message, onOk) {
    const overlay = document.getElementById('confirm-overlay');
    document.getElementById('confirm-title').innerText = title;
    document.getElementById('confirm-message').innerText = message;
    
    overlay.classList.add('active');
    
    const onCancelClick = () => {
      overlay.classList.remove('active');
      cleanup();
    };
    
    const onOkClick = () => {
      overlay.classList.remove('active');
      onOk();
      cleanup();
    };
    
    const cleanup = () => {
      document.getElementById('confirm-cancel').removeEventListener('click', onCancelClick);
      document.getElementById('confirm-ok').removeEventListener('click', onOkClick);
    };
    
    document.getElementById('confirm-cancel').addEventListener('click', onCancelClick);
    document.getElementById('confirm-ok').addEventListener('click', onOkClick);
  },

  formatThaiDate(date) {
    const days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
    const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    return `วัน${days[date.getDay()]}ที่ ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear() + 543}`;
  },
  
  generateId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  },
  
  // Returns { text: "สวัสดีตอนเช้า", timeMode: "morning|afternoon|evening" }
  getGreeting(date) {
    const h = date.getHours();
    if (h >= 5 && h < 12) return { text: "อรุณสวัสดิ์", mode: "morning" };
    if (h >= 12 && h < 16) return { text: "สวัสดีตอนบ่าย", mode: "afternoon" };
    if (h >= 16 && h < 19) return { text: "สวัสดีตอนเย็น", mode: "evening" };
    if (h >= 19 && h < 23) return { text: "สวัสดีตอนค่ำ", mode: "evening" };
    return { text: "ดึกแล้ว อย่าลืมพักผ่อนนะ", mode: "evening" };
  },
  
  // Calculate days left to a date
  getDaysLeft(dateStr) {
    if(!dateStr) return 999;
    const target = new Date(dateStr);
    target.setHours(23, 59, 59, 999);
    const now = new Date();
    const diff = target - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  },
  
  getRiskClass(daysLeft, isDone) {
    if(isDone) return 'risk-green';
    if(daysLeft < 0) return 'risk-red'; // Overdue
    if(daysLeft <= 1) return 'risk-red';
    if(daysLeft <= 3) return 'risk-orange';
    if(daysLeft <= 7) return 'risk-yellow';
    return 'risk-green';
  },

  // ==========================================
  // 5. Morning Quest Gate
  // ==========================================
  
  hasMorningQuests() {
    // Generate auto quests from today's schedule
    const today = new Date().getDay();
    const schedule = SCHEDULE_DATA[today] || [];
    
    // Add custom quests
    const custom = window.AppState.data.quests.morning || [];
    return schedule.length > 0 || custom.length > 0;
  },
  
  getMergedMorningQuests() {
    const today = new Date().getDay();
    const schedule = SCHEDULE_DATA[today] || [];
    
    // Extract unique subjects
    const subjects = new Set();
    schedule.forEach(s => { if(!s.isBreak) subjects.add(s.name); });
    
    const autoQuests = Array.from(subjects).map(s => ({
      id: `auto_${s}`,
      name: `เตรียมอุปกรณ์วิชา ${s}`,
      isAuto: true
    }));
    
    const custom = window.AppState.data.quests.morning || [];
    return [...autoQuests, ...custom];
  },
  
  renderMorningQuests() {
    const container = document.getElementById('morning-quests-container');
    const quests = this.getMergedMorningQuests();
    container.innerHTML = '';
    
    let doneCount = 0;
    const total = quests.length;
    
    quests.forEach(q => {
      const isDone = window.AppState.daily.questStatus[q.id];
      if(isDone) doneCount++;
      
      const el = document.createElement('div');
      el.className = `quest-checkbox ${isDone ? 'checked' : ''}`;
      el.onclick = () => this.toggleMorningQuest(q.id);
      
      el.innerHTML = `
        <div class="checkbox-box">${isDone ? '✓' : ''}</div>
        <div class="checkbox-label">${q.name}</div>
        ${q.isAuto ? '<span class="section-badge" style="background:var(--bg-glass-strong)">Auto</span>' : ''}
      `;
      container.appendChild(el);
    });
    
    // Update progress
    const pct = total === 0 ? 100 : (doneCount / total) * 100;
    document.getElementById('morning-progress').style.width = `${pct}%`;
    document.getElementById('morning-progress-text').innerText = `ทำสำเร็จ ${doneCount}/${total}`;
    
    document.getElementById('morning-start-btn').disabled = (doneCount < total && total > 0);
  },
  
  toggleMorningQuest(id) {
    window.AppState.daily.questStatus[id] = !window.AppState.daily.questStatus[id];
    this.saveLocal('daily', window.AppState.daily);
    this.renderMorningQuests();
  },
  
  startDay(isSkip = false) {
    if(!isSkip) {
      this.playCelebration();
    }
    
    window.AppState.daily.morningDone = true;
    this.saveLocal('daily', window.AppState.daily);
    
    setTimeout(() => {
      this.navTo('home');
      this.renderHome();
    }, isSkip ? 0 : 2500);
  },
  
  playCelebration() {
    const overlay = document.getElementById('overlay-celebration');
    overlay.classList.add('active');
    
    // Create confetti
    for(let i=0; i<50; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.top = -10 + 'px';
      c.style.background = ['#3b82f6', '#8b5cf6', '#f97316', '#22c55e'][Math.floor(Math.random()*4)];
      c.style.animationDelay = Math.random() * 2 + 's';
      c.style.animationDuration = Math.random() * 2 + 1 + 's';
      overlay.appendChild(c);
    }
    
    setTimeout(() => {
      overlay.classList.remove('active');
      document.querySelectorAll('.confetti').forEach(e => e.remove());
    }, 2500);
  },

  // ==========================================
  // 6. Home Page
  // ==========================================
  
  setupClock() {
    if(this.clockInterval) clearInterval(this.clockInterval);
    
    const update = () => {
      const now = new Date();
      document.getElementById('clock-date').innerText = this.formatThaiDate(now);
      
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      document.getElementById('clock-time').innerText = `${h}:${m}:${s}`;
      
      const greeting = this.getGreeting(now);
      const name = window.AppState.user ? window.AppState.user.displayName : '';
      document.getElementById('clock-greeting').innerText = `${greeting.text}, ${name}!`;
      
      if(window.AppState.activePage === 'home') {
        this.updateCurrentClass(now);
      }
    };
    
    update();
    this.clockInterval = setInterval(update, 1000);
  },
  
  renderHome() {
    this.renderTodaySchedule();
    this.renderHomeAssignments();
    this.renderHomeQuests();
  },
  
  updateCurrentClass(now) {
    const today = now.getDay();
    const schedule = SCHEDULE_DATA[today];
    const card = document.getElementById('current-class-card');
    
    if(!schedule || schedule.length === 0) {
      card.innerHTML = `
        <div class="class-indicator-label">วันนี้ไม่มีเรียน</div>
        <div class="class-indicator-name">พักผ่อนให้เต็มที่! 🎮</div>
      `;
      card.style.background = 'var(--bg-card)';
      card.style.borderColor = 'var(--border-glass)';
      return;
    }
    
    const timeStr = String(now.getHours()).padStart(2,'0') + ":" + String(now.getMinutes()).padStart(2,'0');
    
    let current = null;
    let next = null;
    let isDone = true;
    
    for(let i = 0; i < schedule.length; i++) {
      const s = schedule[i];
      if(timeStr >= s.start && timeStr < s.end) {
        current = s;
        next = schedule[i+1] || null;
        isDone = false;
        break;
      }
      if(timeStr < s.start) {
        next = s;
        isDone = false;
        break;
      }
    }
    
    if(current) {
      if(current.isBreak) {
        card.innerHTML = `
          <div class="class-indicator-label">กำลังพัก</div>
          <div class="class-indicator-name">☕ ${current.name}</div>
          <div class="class-indicator-meta">ถึงเวลา ${current.end} น.</div>
        `;
        card.style.borderColor = 'var(--accent-orange)';
        card.style.boxShadow = 'var(--shadow-glow-orange)';
      } else {
        card.innerHTML = `
          <div class="class-indicator-label"><span class="pulse-dot"></span> กำลังเรียน</div>
          <div class="class-indicator-name">📖 ${current.name}</div>
          <div class="class-indicator-meta">เวลา: ${current.start} - ${current.end} น.</div>
          ${next ? `<div class="class-indicator-meta mt-4 text-xs">➡️ คาบต่อไป: ${next.name}</div>` : ''}
        `;
        card.style.borderColor = 'var(--accent-blue)';
        card.style.boxShadow = 'var(--shadow-glow-blue)';
      }
    } else if (next) {
      card.innerHTML = `
        <div class="class-indicator-label">คาบเรียนถัดไป</div>
        <div class="class-indicator-name">⏳ ${next.name}</div>
        <div class="class-indicator-meta">เริ่มเวลา ${next.start} น.</div>
      `;
      card.style.borderColor = 'var(--border-glass)';
      card.style.boxShadow = 'none';
    } else if (isDone) {
      card.innerHTML = `
        <div class="class-indicator-label">เลิกเรียนแล้ว!</div>
        <div class="class-indicator-name">🎉 เรียนครบหมดแล้ว</div>
        <div class="class-indicator-meta">อย่าลืมทำการบ้านและพักผ่อนนะ</div>
      `;
      card.style.borderColor = 'var(--accent-green)';
      card.style.boxShadow = '0 0 20px rgba(34,197,94,0.15)';
    }
  },
  
  renderTodaySchedule() {
    const today = new Date().getDay();
    const rawSchedule = SCHEDULE_DATA[today] || [];
    const container = document.getElementById('today-schedule-list');
    
    if(rawSchedule.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🎮</div><div class="empty-state-text">ไม่มีเรียน เย้!</div></div>`;
      return;
    }
    
    // Merge consecutive identical subjects
    const merged = [];
    let prev = null;
    rawSchedule.forEach(s => {
      if(prev && prev.name === s.name && !s.isBreak) {
        prev.end = s.end;
      } else {
        if(prev) merged.push(prev);
        prev = { ...s };
      }
    });
    if(prev) merged.push(prev);
    
    const now = new Date();
    const timeStr = String(now.getHours()).padStart(2,'0') + ":" + String(now.getMinutes()).padStart(2,'0');
    
    container.innerHTML = '';
    
    merged.forEach(s => {
      // Hide past subjects
      if(s.end < timeStr) return;
      
      const isCurrent = timeStr >= s.start && timeStr < s.end;
      
      // Check if there's assignment due today for this subject
      const hasAlert = this.getAssignmentsForSubject(s.name).some(a => this.getDaysLeft(a.date) === 0 && !a.done);
      
      const el = document.createElement('div');
      el.className = `schedule-item ${isCurrent ? 'current' : ''}`;
      el.onclick = () => { if(!s.isBreak) this.openSubjectModal(s.name); };
      
      el.innerHTML = `
        <div class="schedule-time">${s.start} - ${s.end}</div>
        <div class="schedule-name ${s.isBreak ? 'text-muted' : ''}">${s.name}</div>
        ${hasAlert ? `<div class="schedule-alert" title="มีงานต้องส่ง!">📢</div>` : ''}
      `;
      
      container.appendChild(el);
    });
    
    if(container.children.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-text text-sm">หมดคาบเรียนสำหรับวันนี้แล้ว!</div></div>`;
    }
  },
  
  renderHomeAssignments() {
    const container = document.getElementById('home-assignments-list');
    const badge = document.getElementById('assignment-count-badge');
    
    // Sort tasks: Undone first (by date), then Done
    let tasks = [...window.AppState.data.assignments];
    tasks.sort((a, b) => {
      if(a.done === b.done) {
        return new Date(a.date || '9999') - new Date(b.date || '9999');
      }
      return a.done ? 1 : -1;
    });
    
    // Only show top 5 on home, prioritize undone
    const undoneCount = tasks.filter(t => !t.done).length;
    badge.innerText = undoneCount;
    
    const displayTasks = tasks.slice(0, 5);
    
    if(displayTasks.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-text text-sm">สุดยอด! ไม่มีงานค้างเลย 🎉</div></div>`;
      return;
    }
    
    container.innerHTML = '';
    displayTasks.forEach(t => {
      container.appendChild(this.createAssignmentCard(t));
    });
  },
  
  renderHomeQuests() {
    const sec = document.getElementById('home-quests-section');
    const list = document.getElementById('home-quests-list');
    
    const greeting = this.getGreeting(new Date());
    const timeMode = greeting.mode; // 'morning', 'afternoon', 'evening'
    
    // On home page, we show afternoon and evening quests if it's the right time
    let quests = [];
    if(timeMode === 'afternoon') quests = window.AppState.data.quests.afternoon || [];
    if(timeMode === 'evening') {
      quests = [...(window.AppState.data.quests.afternoon || []), ...(window.AppState.data.quests.evening || [])];
    }
    
    if(quests.length === 0 || timeMode === 'morning') {
      sec.classList.add('hidden');
      return;
    }
    
    sec.classList.remove('hidden');
    list.innerHTML = '';
    
    quests.forEach(q => {
      const isDone = window.AppState.daily.questStatus[q.id];
      const el = document.createElement('div');
      el.className = `quest-checkbox ${isDone ? 'checked' : ''}`;
      el.onclick = () => {
        window.AppState.daily.questStatus[q.id] = !window.AppState.daily.questStatus[q.id];
        this.saveData();
      };
      
      el.innerHTML = `
        <div class="checkbox-box">${isDone ? '✓' : ''}</div>
        <div class="checkbox-label">${q.name}</div>
      `;
      list.appendChild(el);
    });
  },

  // ==========================================
  // 7. Manage Page
  // ==========================================
  
  switchManageTab(tab) {
    document.querySelectorAll('#page-manage .tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`#page-manage .tab-btn[onclick*="${tab}"]`).classList.add('active');
    
    document.querySelectorAll('#page-manage .tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`manage-tab-${tab}`).classList.add('active');
  },
  
  renderManage() {
    this.renderManageAssignments();
    this.renderManageSubjects();
    this.renderManageQuests();
    this.renderManageEvents();
  },
  
  // -- Assignments
  renderManageAssignments() {
    const container = document.getElementById('manage-assignments-list');
    container.innerHTML = '';
    
    let tasks = [...window.AppState.data.assignments];
    tasks.sort((a, b) => {
      if(a.done === b.done) {
        return new Date(a.date || '9999') - new Date(b.date || '9999');
      }
      return a.done ? 1 : -1;
    });
    
    if(tasks.length === 0) {
      container.innerHTML = `<div class="empty-state">ไม่มีรายการ</div>`;
      return;
    }
    
    tasks.forEach(t => container.appendChild(this.createAssignmentCard(t, true)));
  },
  
  createAssignmentCard(task, showDelete = false) {
    const daysLeft = this.getDaysLeft(task.date);
    const risk = this.getRiskClass(daysLeft, task.done);
    
    let badgeHtml = '';
    const dateStr = task.date ? ` (กำหนด: ${task.date})` : '';

    if (task.done) {
      if (task.completedAt && task.date) {
        const completeDate = new Date(task.completedAt).toISOString().split('T')[0];
        if (completeDate < task.date) {
          badgeHtml = `<span class="assignment-badge badge-done" style="background:rgba(59,130,246,0.15); color:var(--accent-blue)">✨ เสร็จก่อนกำหนด${dateStr}</span>`;
        } else if (completeDate === task.date) {
          badgeHtml = `<span class="assignment-badge badge-done">✓ เสร็จตรงเวลา${dateStr}</span>`;
        } else {
          badgeHtml = `<span class="assignment-badge badge-overdue" style="background:rgba(239,68,68,0.15); color:var(--accent-red)">⚠️ ส่งล่าช้า${dateStr}</span>`;
        }
      } else {
        badgeHtml = `<span class="assignment-badge badge-done">เสร็จแล้ว${dateStr}</span>`;
      }
    } else if (task.type === 'exam') {
      badgeHtml = `<span class="assignment-badge badge-exam">สอบ ${daysLeft === 0 ? 'วันนี้' : (daysLeft < 0 ? 'เลยกำหนด' : 'อีก ' + daysLeft + ' วัน')}</span>`;
    } else {
      if (daysLeft < 0) badgeHtml = `<span class="assignment-badge badge-overdue">เลยกำหนด${dateStr}</span>`;
      else if (daysLeft === 0) badgeHtml = `<span class="assignment-badge badge-due">ส่งวันนี้!</span>`;
      else badgeHtml = `<span class="assignment-badge badge-due">เหลือ ${daysLeft} วัน${dateStr}</span>`;
    }

    const el = document.createElement('div');
    el.className = 'assignment-card';
    
    const subjectHtml = task.subject ? `<span style="color: var(--accent-blue); font-weight: 700; margin-right: 4px;">[${task.subject}]</span>` : '';
    
    el.innerHTML = `
      <div class="assignment-risk ${risk}"></div>
      <div class="assignment-info" onclick="window.App.openPomodoro('${task.id}')" title="กดเพื่อเริ่มจับเวลา Pomodoro">
        <div class="assignment-name" style="${task.done ? 'text-decoration:line-through; color:var(--text-muted);' : ''}">${subjectHtml}${task.name}</div>
        <div class="assignment-meta">
          ${badgeHtml}
        </div>
      </div>
      <button class="assignment-complete-btn" onclick="window.App.toggleTaskComplete('${task.id}')" title="${task.done ? 'ยกเลิกสำเร็จ' : 'ทำเสร็จแล้ว'}">
        ${task.done ? '✓' : '○'}
      </button>
      ${showDelete ? `<button class="assignment-complete-btn" style="color:var(--accent-red); border-color:transparent;" onclick="window.App.deleteTask('${task.id}')" title="ลบ">🗑️</button>` : ''}
    `;
    return el;
  },
  
  handleNlpInput(val) {
    const sug = document.getElementById('nlp-suggestion');
    const dateInput = document.getElementById('add-task-date');
    const lowerVal = val.toLowerCase();
    
    let targetDate = new Date();
    let found = false;
    let label = '';
    
    if (lowerVal.includes('พรุ่งนี้')) {
      targetDate.setDate(targetDate.getDate() + 1);
      found = true; label = 'พรุ่งนี้';
    } else if (lowerVal.includes('มะรืน')) {
      targetDate.setDate(targetDate.getDate() + 2);
      found = true; label = 'มะรืน';
    } else if (lowerVal.includes('วันนี้')) {
      found = true; label = 'วันนี้';
    } else if (lowerVal.includes('อาทิตย์หน้า')) {
      targetDate.setDate(targetDate.getDate() + 7);
      found = true; label = 'สัปดาห์หน้า';
    }
    
    if (found) {
      const iso = targetDate.toISOString().split('T')[0];
      dateInput.value = iso;
      sug.innerText = `✨ ตั้งวันส่ง: ${label} (${iso})`;
      sug.classList.add('active');
    } else {
      sug.classList.remove('active');
    }
  },
  
  addAssignment() {
    const name = document.getElementById('add-task-name').value;
    const subject = document.getElementById('add-task-subject').value;
    const date = document.getElementById('add-task-date').value;
    const type = document.getElementById('add-task-type').value;
    
    if(!name) return;
    
    window.AppState.data.assignments.push({
      id: this.generateId(),
      name, subject, date, type, done: false,
      createdAt: new Date().toISOString()
    });
    
    this.saveData();
    document.getElementById('add-task-name').value = '';
    document.getElementById('nlp-suggestion').classList.remove('active');
    this.showToast('เพิ่มภารกิจสำเร็จ', 'success');
  },
  
  toggleTaskComplete(id) {
    const task = window.AppState.data.assignments.find(t => t.id === id);
    if(task) {
      task.done = !task.done;
      if (task.done) {
        task.completedAt = new Date().toISOString();
      } else {
        delete task.completedAt;
      }
      this.saveData();
      if(task.done) {
        let msg = 'ภารกิจสำเร็จ! 🎉';
        if(task.completedAt && task.date) {
          const completeDate = task.completedAt.split('T')[0];
          if(completeDate < task.date) msg = 'สุดยอด! เสร็จก่อนกำหนด ✨';
          else if(completeDate > task.date) msg = 'พยายามเข้านะ ส่งช้าดีกว่าไม่ส่ง ✌️';
        }
        this.showToast(msg, 'success');
      }
    }
  },
  
  deleteTask(id) {
    this.confirm('ลบภารกิจ', 'ต้องการลบภารกิจนี้ใช่หรือไม่?', () => {
      window.AppState.data.assignments = window.AppState.data.assignments.filter(t => t.id !== id);
      this.saveData();
    });
  },
  
  cleanupOldTasks() {
    const now = new Date();
    let changed = false;
    window.AppState.data.assignments = window.AppState.data.assignments.filter(t => {
      // Keep if not done
      if(!t.done) return true;
      // If done, remove if older than 7 days
      if(t.date) {
        const d = new Date(t.date);
        const diff = (now - d) / (1000 * 60 * 60 * 24);
        if(diff > 7) { changed = true; return false; }
      }
      return true;
    });
    if(changed) this.saveLocal('assignments', window.AppState.data.assignments);
  },

  // -- Subjects
  setupSubjectSelects() {
    const selects = [document.getElementById('add-task-subject')];
    const uniqueSubjects = new Set();
    Object.values(SCHEDULE_DATA).forEach(day => {
      day.forEach(s => { if(!s.isBreak) uniqueSubjects.add(s.name); });
    });
    
    const options = Array.from(uniqueSubjects).sort().map(s => `<option value="${s}">${s}</option>`).join('');
    
    selects.forEach(sel => {
      if(sel) sel.innerHTML = `<option value="">-- ไม่ระบุวิชา --</option>` + options;
    });
  },
  
  renderManageSubjects() {
    const container = document.getElementById('manage-subjects-list');
    container.innerHTML = '';
    
    const subjectsMap = {};
    Object.entries(SCHEDULE_DATA).forEach(([dayInt, dayList]) => {
      dayList.forEach(s => {
        if(s.isBreak) return;
        if(!subjectsMap[s.name]) subjectsMap[s.name] = { name: s.name, days: new Set() };
        subjectsMap[s.name].days.add(parseInt(dayInt));
      });
    });
    
    const subjects = Object.values(subjectsMap).sort((a, b) => a.name.localeCompare(b.name));
    
    const dayNames = ['จ', 'อ', 'พ', 'พฤ', 'ศ'];
    
    subjects.forEach(sub => {
      const el = document.createElement('div');
      el.className = 'manage-item';
      el.onclick = () => this.openSubjectModal(sub.name);
      el.style.cursor = 'pointer';
      
      let dotsHtml = dayNames.map((n, i) => {
        const isActive = sub.days.has(i+1);
        return `<span class="day-dot ${isActive ? 'active' : ''}">${n}</span>`;
      }).join('');
      
      el.innerHTML = `
        <div class="manage-item-info">
          <div class="manage-item-title">${sub.name}</div>
          <div class="flex gap-6 mt-8">${dotsHtml}</div>
        </div>
        <div class="text-xs text-muted">ดูรายละเอียด ➔</div>
      `;
      container.appendChild(el);
    });
  },
  
  // -- Quests
  renderManageQuests() {
    const container = document.getElementById('manage-quests-list');
    container.innerHTML = '';
    
    const { morning, afternoon, evening } = window.AppState.data.quests;
    
    const renderSection = (title, list, key) => {
      if(list.length === 0) return;
      const sec = document.createElement('div');
      sec.className = 'mb-12';
      sec.innerHTML = `<div class="text-xs font-bold text-muted uppercase mb-4">${title}</div>`;
      
      list.forEach(q => {
        const item = document.createElement('div');
        item.className = 'manage-item';
        item.innerHTML = `
          <div class="manage-item-info"><div class="manage-item-title">${q.name}</div></div>
          <button class="btn btn-icon-sm btn-outline" style="color:var(--accent-red); border:none;" onclick="window.App.deleteQuest('${key}', '${q.id}')">🗑️</button>
        `;
        sec.appendChild(item);
      });
      container.appendChild(sec);
    };
    
    renderSection('ตอนเช้า', morning, 'morning');
    renderSection('ระหว่างวัน', afternoon, 'afternoon');
    renderSection('ตอนเย็น', evening, 'evening');
    
    if(container.children.length === 0) {
      container.innerHTML = `<div class="empty-state">ไม่มีเควสเสริม</div>`;
    }
  },
  
  addQuest() {
    const name = document.getElementById('add-quest-name').value;
    const time = document.getElementById('add-quest-time').value;
    
    if(!name) return;
    
    if(!window.AppState.data.quests[time]) window.AppState.data.quests[time] = [];
    
    window.AppState.data.quests[time].push({
      id: this.generateId(),
      name
    });
    
    this.saveData();
    document.getElementById('add-quest-name').value = '';
    this.showToast('เพิ่มเควสสำเร็จ', 'success');
  },
  
  deleteQuest(time, id) {
    window.AppState.data.quests[time] = window.AppState.data.quests[time].filter(q => q.id !== id);
    this.saveData();
  },
  
  // -- Events
  renderManageEvents() {
    const container = document.getElementById('manage-events-list');
    container.innerHTML = '';
    
    let events = [...window.AppState.data.events];
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Filter out past events (> 1 day ago)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    events = events.filter(e => new Date(e.date) >= yesterday);
    
    if(events.length === 0) {
      container.innerHTML = `<div class="empty-state">ไม่มีเหตุการณ์เร็วๆ นี้</div>`;
      return;
    }
    
    events.forEach(e => {
      const days = this.getDaysLeft(e.date);
      const el = document.createElement('div');
      el.className = 'manage-item';
      el.innerHTML = `
        <div class="manage-item-info">
          <div class="manage-item-title">${e.name}</div>
          <div class="manage-item-sub">📅 ${e.date} (${days === 0 ? 'วันนี้' : `อีก ${days} วัน`})</div>
        </div>
        <button class="btn btn-icon-sm btn-outline" style="color:var(--accent-red); border:none;" onclick="window.App.deleteEvent('${e.id}')">🗑️</button>
      `;
      container.appendChild(el);
    });
  },
  
  addEvent() {
    const name = document.getElementById('add-event-name').value;
    const date = document.getElementById('add-event-date').value;
    
    if(!name || !date) return;
    
    window.AppState.data.events.push({
      id: this.generateId(),
      name, date
    });
    
    this.saveData();
    document.getElementById('add-event-name').value = '';
    this.showToast('เพิ่มเหตุการณ์สำเร็จ', 'success');
  },
  
  deleteEvent(id) {
    window.AppState.data.events = window.AppState.data.events.filter(e => e.id !== id);
    this.saveData();
  },

  // ==========================================
  // 8. Alerts
  // ==========================================
  
  renderAlerts() {
    const container = document.getElementById('alert-banner-container');
    container.innerHTML = '';
    if(window.AppState.activePage !== 'home') return;
    
    const dismissed = this.loadLocal('dismissed_alerts', {});
    
    // Check Events (<= 3 days)
    window.AppState.data.events.forEach(e => {
      const days = this.getDaysLeft(e.date);
      if(days >= 0 && days <= 3 && !dismissed[`event_${e.id}`]) {
        container.appendChild(this.createAlertBanner(
          `event_${e.id}`, 
          'alert-banner-event', 
          '📢', 
          `เหตุการณ์ใกล้ถึง: <b>${e.name}</b> ในอีก ${days === 0 ? 'วันนี้!' : days + ' วัน'}`
        ));
      }
    });
    
    // Check Tasks (<= 1 day)
    window.AppState.data.assignments.forEach(t => {
      if(t.done) return;
      const days = this.getDaysLeft(t.date);
      if(days >= 0 && days <= 1 && !dismissed[`task_${t.id}`]) {
        container.appendChild(this.createAlertBanner(
          `task_${t.id}`, 
          'alert-banner-urgent', 
          '⚠️', 
          `ต้องส่งด่วน: <b>${t.name}</b> ${days === 0 ? 'วันนี้!' : 'พรุ่งนี้'}`
        ));
      }
    });
  },
  
  createAlertBanner(id, className, icon, html) {
    const el = document.createElement('div');
    el.className = `alert-banner ${className}`;
    el.innerHTML = `
      <div class="alert-banner-icon">${icon}</div>
      <div class="alert-banner-text">${html}</div>
      <button class="alert-banner-dismiss" onclick="window.App.dismissAlert('${id}', this)">รับทราบ</button>
    `;
    return el;
  },
  
  dismissAlert(id, btnEl) {
    const dismissed = this.loadLocal('dismissed_alerts', {});
    dismissed[id] = true;
    this.saveLocal('dismissed_alerts', dismissed);
    
    const banner = btnEl.closest('.alert-banner');
    banner.classList.add('dismissing');
    setTimeout(() => { banner.remove(); }, 300);
  },

  // ==========================================
  // 9. Subject Detail Modal
  // ==========================================
  
  getAssignmentsForSubject(subjectName) {
    return window.AppState.data.assignments.filter(a => a.subject === subjectName);
  },
  
  openSubjectModal(subjectName) {
    document.getElementById('modal-subject-title').innerText = subjectName;
    document.getElementById('modal-subject-code').innerText = "---";
    document.getElementById('modal-subject-time').innerText = "ดูในตาราง";
    
    // Reset tabs
    this.switchModalTab('tasks');
    
    // Render tasks
    const tasks = this.getAssignmentsForSubject(subjectName);
    const list = document.getElementById('modal-subject-tasks-list');
    list.innerHTML = '';
    
    if(tasks.length === 0) {
      list.innerHTML = `<div class="empty-state">ไม่มีงานค้าง</div>`;
    } else {
      tasks.forEach(t => list.appendChild(this.createAssignmentCard(t)));
    }
    
    // Load Note
    document.getElementById('modal-subject-note').value = window.AppState.data.notes[subjectName] || '';
    
    // Store current subject reference
    document.getElementById('modal-subject').dataset.subject = subjectName;
    
    document.getElementById('modal-subject').classList.add('active');
  },
  
  switchModalTab(tab) {
    const modal = document.getElementById('modal-subject');
    modal.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    modal.querySelector(`.tab-btn[onclick*="${tab}"]`).classList.add('active');
    
    modal.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`modal-tab-${tab}`).classList.add('active');
  },
  
  closeModal(id) {
    document.getElementById(id).classList.remove('active');
  },
  
  quickAddSubjectTask() {
    const subject = document.getElementById('modal-subject').dataset.subject;
    this.closeModal('modal-subject');
    this.navTo('manage', 'assignments');
    setTimeout(() => {
      const sel = document.getElementById('add-task-subject');
      if(sel) sel.value = subject;
      document.getElementById('add-task-name').focus();
    }, 100);
  },
  
  saveSubjectNote() {
    const subject = document.getElementById('modal-subject').dataset.subject;
    const text = document.getElementById('modal-subject-note').value;
    
    window.AppState.data.notes[subject] = text;
    this.saveData();
    this.showToast('บันทึกโน้ตสำเร็จ', 'success');
  },

  // ==========================================
  // 10. Pomodoro Timer
  // ==========================================
  
  openPomodoro(taskId) {
    const task = window.AppState.data.assignments.find(t => t.id === taskId);
    if(!task || task.done) return;
    
    window.AppState.pomodoro.taskId = taskId;
    window.AppState.pomodoro.isWorkMode = true;
    window.AppState.pomodoro.timeLeft = 25 * 60;
    
    document.getElementById('pomodoro-task-name').innerText = task.name;
    this.updatePomodoroUI();
    
    document.getElementById('overlay-pomodoro').classList.add('active');
  },
  
  togglePomodoro() {
    const p = window.AppState.pomodoro;
    const btn = document.getElementById('pomo-play-btn');
    
    if(p.active) {
      clearInterval(p.timer);
      p.active = false;
      btn.innerText = '▶️';
    } else {
      p.active = true;
      btn.innerText = '⏸';
      p.timer = setInterval(() => {
        p.timeLeft--;
        if(p.timeLeft <= 0) {
          this.finishPomodoro();
        } else {
          this.updatePomodoroUI();
        }
      }, 1000);
    }
  },
  
  updatePomodoroUI() {
    const p = window.AppState.pomodoro;
    const m = String(Math.floor(p.timeLeft / 60)).padStart(2, '0');
    const s = String(p.timeLeft % 60).padStart(2, '0');
    document.getElementById('pomodoro-time-display').innerText = `${m}:${s}`;
    
    const total = p.isWorkMode ? 25 * 60 : 5 * 60;
    const pct = (p.timeLeft / total) * 283; // 283 is circle circumference
    document.getElementById('pomodoro-circle-progress').style.strokeDashoffset = 283 - pct;
    
    document.getElementById('pomodoro-status').innerText = p.isWorkMode ? '🔥 กำลังโฟกัส' : '☕ พักเบรก';
  },
  
  stopPomodoro() {
    const p = window.AppState.pomodoro;
    clearInterval(p.timer);
    p.active = false;
    document.getElementById('pomo-play-btn').innerText = '▶️';
    document.getElementById('overlay-pomodoro').classList.remove('active');
  },
  
  switchPomodoroMode() {
    const p = window.AppState.pomodoro;
    clearInterval(p.timer);
    p.active = false;
    document.getElementById('pomo-play-btn').innerText = '▶️';
    
    p.isWorkMode = !p.isWorkMode;
    p.timeLeft = p.isWorkMode ? 25 * 60 : 5 * 60;
    this.updatePomodoroUI();
  },
  
  finishPomodoro() {
    const p = window.AppState.pomodoro;
    clearInterval(p.timer);
    p.active = false;
    document.getElementById('pomo-play-btn').innerText = '▶️';
    
    if(p.isWorkMode) {
      this.playCelebration();
      this.showToast('หมดเวลาโฟกัส! พักเบรก 5 นาที', 'success');
      p.isWorkMode = false;
      p.timeLeft = 5 * 60;
    } else {
      this.showToast('หมดเวลาพัก! พร้อมลุยต่อมั้ย?', 'info');
      p.isWorkMode = true;
      p.timeLeft = 25 * 60;
    }
    this.updatePomodoroUI();
  },

  // ==========================================
  // 11. Journal & Analytics
  // ==========================================
  
  switchJournalTab(tab) {
    document.querySelectorAll('#page-journal .tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`#page-journal .tab-btn[onclick*="${tab}"]`).classList.add('active');
    
    document.querySelectorAll('#page-journal .tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`journal-tab-${tab}`).classList.add('active');
  },
  
  renderJournal() {
    const container = document.getElementById('journal-list');
    container.innerHTML = '';
    
    if(window.AppState.data.journal.length === 0) {
      container.innerHTML = `<div class="empty-state">ยังไม่มีบันทึก เริ่มเขียนเรื่องราวของวันนี้ได้เลย!</div>`;
      return;
    }
    
    // Group by date
    const groups = {};
    window.AppState.data.journal.forEach(entry => {
      const d = new Date(entry.createdAt);
      const key = this.formatThaiDate(d);
      if(!groups[key]) groups[key] = [];
      groups[key].push(entry);
    });
    
    // Sort descending
    const sortedKeys = Object.keys(groups).sort((a,b) => groups[b][0].createdAt.localeCompare(groups[a][0].createdAt));
    
    sortedKeys.forEach(k => {
      const gHeader = document.createElement('div');
      gHeader.className = 'journal-date-group';
      gHeader.innerText = k;
      container.appendChild(gHeader);
      
      groups[k].forEach(entry => {
        const d = new Date(entry.createdAt);
        const fullDate = this.formatThaiDate(d);
        const time = d.toLocaleTimeString('th-TH', {hour: '2-digit', minute:'2-digit'});
        const el = document.createElement('div');
        el.className = 'journal-entry';
        el.innerHTML = `
          <div class="journal-time" style="color: var(--accent-blue); font-weight: 600;">📅 ${fullDate} เวลา ${time} น.</div>
          <div class="journal-text" style="margin-top: 8px;">${entry.text}</div>
        `;
        container.appendChild(el);
      });
    });
  },
  
  addJournalEntry() {
    const text = document.getElementById('add-journal-text').value;
    if(!text) return;
    
    window.AppState.data.journal.unshift({
      id: this.generateId(),
      text,
      createdAt: new Date().toISOString()
    });
    
    this.saveData();
    document.getElementById('add-journal-text').value = '';
    this.showToast('บันทึกความทรงจำแล้ว 📖', 'success');
  },
  
  renderAnalytics() {
    // Basic stats
    const doneTasks = window.AppState.data.assignments.filter(t => t.done).length;
    const questsDoneCount = Object.values(window.AppState.daily.questStatus).filter(v => v).length;
    
    document.getElementById('stat-tasks').innerText = doneTasks;
    document.getElementById('stat-quests').innerText = questsDoneCount;
    
    // History list (Time Machine) - show done tasks
    const histContainer = document.getElementById('history-list');
    histContainer.innerHTML = '';
    
    const doneArr = window.AppState.data.assignments.filter(t => t.done);
    doneArr.sort((a,b) => new Date(b.date || '0') - new Date(a.date || '0')); // Latest first
    
    if(doneArr.length === 0) {
      histContainer.innerHTML = `<div class="empty-state">ยังไม่มีประวัติการทำภารกิจสำเร็จ</div>`;
      return;
    }
    
    doneArr.slice(0, 10).forEach(t => {
      const el = document.createElement('div');
      el.className = 'manage-item';
      
      let statusText = '✔️ สำเร็จเมื่อ';
      let dateDisplay = t.date || 'ไม่ระบุวัน';
      
      if(t.completedAt) {
         const completeDateStr = new Date(t.completedAt).toLocaleDateString('th-TH');
         dateDisplay = completeDateStr;
         
         if(t.date) {
           const completeDate = new Date(t.completedAt).toISOString().split('T')[0];
           if(completeDate < t.date) statusText = '✨ เสร็จก่อนกำหนดเมื่อ';
           else if (completeDate > t.date) statusText = '⚠️ ส่งล่าช้าเมื่อ';
         }
      }
      
      el.innerHTML = `
        <div class="manage-item-info">
          <div class="manage-item-title text-muted" style="text-decoration:line-through">${t.name}</div>
          <div class="manage-item-sub">${statusText} ${dateDisplay} ${t.subject ? `• ${t.subject}` : ''}</div>
        </div>
      `;
      histContainer.appendChild(el);
    });
  },
  
  showWeeklyRecap() {
    this.confirm('Weekly Recap 🏆', `สัปดาห์นี้คุณทำภารกิจสำเร็จ ${document.getElementById('stat-tasks').innerText} งาน\nและทำเควสเช้าผ่าน ${document.getElementById('stat-quests').innerText} ครั้ง\n\nพยายามได้ดีมาก! ลุยต่อไปนะผู้กล้า!`, () => {});
  },

  // ==========================================
  // 12. PWA & Calendar
  // ==========================================
  
  exportICal() {
    // Generate simple .ics format from assignments and events
    let ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//StudyQuest//App//EN\n`;

    // Tasks
    window.AppState.data.assignments.forEach(t => {
      if(!t.date || t.done) return;
      const d = t.date.replace(/-/g, '');
      ics += `BEGIN:VEVENT
SUMMARY:${t.name} ${t.subject ? '('+t.subject+')' : ''}
DTSTART;VALUE=DATE:${d}
DTEND;VALUE=DATE:${d}
DESCRIPTION:ประเภท: ${t.type}
END:VEVENT\n`;
    });
    
    // Events
    window.AppState.data.events.forEach(e => {
      const d = e.date.replace(/-/g, '');
      ics += `BEGIN:VEVENT
SUMMARY:✨ ${e.name}
DTSTART;VALUE=DATE:${d}
DTEND;VALUE=DATE:${d}
END:VEVENT\n`;
    });

    ics += `END:VCALENDAR`;
    
    // Create download link
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'studyquest.ics';
    link.click();
    
    this.showToast('ดาวน์โหลดปฏิทินแล้ว นำไป import ใน Google Calendar ได้เลย', 'success');
  }

};

// Initialize App
window.App = App;
document.addEventListener('DOMContentLoaded', () => App.init());
