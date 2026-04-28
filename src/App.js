import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Scale, LayoutDashboard, FolderOpen, Calendar, List, FileText,
  FilePlus, Bot, BookOpen, CreditCard, Settings, LogOut, Search,
  Plus, X, ChevronRight, ChevronLeft, Bell, User, Shield,
  Briefcase, Clock, CheckCircle, AlertCircle, TrendingUp,
  Download, Upload, Eye, Edit, Trash2, Send, Menu, ChevronDown,
  Building, Phone, Mail, MapPin, Hash, DollarSign, Users, Star
} from 'lucide-react';

// ─── INITIAL DATA ────────────────────────────────────────────────────────────
const INITIAL_USERS = [
  { id: 1, name: 'Adv. Rahim Uddin', email: 'admin@lawbox.bd', password: 'admin123', role: 'admin', active: true, barId: 'BAR-2018-001' },
  { id: 2, name: 'Adv. Priya Sen', email: 'advocate@lawbox.bd', password: 'adv123', role: 'advocate', active: true, barId: 'BAR-2019-042' },
  { id: 3, name: 'Karim Hassan', email: 'clerk@lawbox.bd', password: 'clerk123', role: 'clerk', active: true, barId: null },
  { id: 4, name: 'Sara Ahmed', email: 'client@lawbox.bd', password: 'client123', role: 'client', active: true, barId: null },
];

const INITIAL_CASES = [
  { id: 'CS-2024-001', title: 'Rahman vs Bangladesh Bank', client: 'Mr. Karim Rahman', type: 'Civil', court: 'High Court Division', judge: 'Justice M. Islam', status: 'active', filed: '2024-01-15', nextHearing: '2025-05-10', advocate: 2, description: 'Property dispute regarding nationalized assets', amount: 50000 },
  { id: 'CS-2024-002', title: 'State vs Hossain', client: 'State', type: 'Criminal', court: 'Sessions Court Dhaka', judge: 'Judge S. Begum', status: 'active', filed: '2024-02-20', nextHearing: '2025-05-15', advocate: 2, description: 'Section 420 IPC - Fraud case', amount: 0 },
  { id: 'CS-2024-003', title: 'Akter Enterprises Ltd. vs Rahim Trading', client: 'Akter Enterprises Ltd.', type: 'Commercial', court: 'Commercial Court Dhaka', judge: 'Judge R. Chowdhury', status: 'pending', filed: '2024-03-05', nextHearing: '2025-05-20', advocate: 1, description: 'Contract breach - unpaid invoices worth BDT 2.5 Cr', amount: 250000 },
  { id: 'CS-2024-004', title: 'In re: Begum Estate', client: 'Sultana Begum', type: 'Family', court: 'Family Court Chittagong', judge: 'Judge T. Islam', status: 'closed', filed: '2023-11-10', nextHearing: null, advocate: 1, description: 'Succession and inheritance matter', amount: 15000 },
  { id: 'CS-2024-005', title: 'Ahmed vs City Corporation', client: 'Dr. Farid Ahmed', type: 'Writ', court: 'High Court Division', judge: 'Justice K. Rahman', status: 'active', filed: '2024-04-01', nextHearing: '2025-05-08', advocate: 2, description: 'Writ petition against arbitrary license cancellation', amount: 30000 },
  { id: 'CS-2025-001', title: 'Noor vs Noor', client: 'Ms. Razia Noor', type: 'Family', court: 'Family Court Dhaka', judge: 'Judge A. Khatun', status: 'active', filed: '2025-01-10', nextHearing: '2025-05-25', advocate: 2, description: 'Divorce and dower recovery proceedings', amount: 20000 },
];

const INITIAL_HEARINGS = [
  { id: 'H001', caseId: 'CS-2024-001', date: '2025-05-10', time: '10:30', court: 'High Court Division', room: 'Court Room 3', purpose: 'Argument', notes: 'Prepare written submission' },
  { id: 'H002', caseId: 'CS-2024-002', date: '2025-05-15', time: '11:00', court: 'Sessions Court Dhaka', room: 'Court Room 7', purpose: 'Hearing', notes: 'Witness examination' },
  { id: 'H003', caseId: 'CS-2024-003', date: '2025-05-20', time: '14:00', court: 'Commercial Court Dhaka', room: 'Court Room 1', purpose: 'Mediation', notes: 'Settlement conference' },
  { id: 'H004', caseId: 'CS-2024-005', date: '2025-05-08', time: '09:00', court: 'High Court Division', room: 'Court Room 5', purpose: 'Rule Hearing', notes: 'Rule returnable' },
  { id: 'H005', caseId: 'CS-2025-001', date: '2025-05-25', time: '10:00', court: 'Family Court Dhaka', room: 'Court Room 2', purpose: 'Hearing', notes: '' },
];

const INITIAL_DOCUMENTS = [
  { id: 'D001', caseId: 'CS-2024-001', name: 'Writ Petition.pdf', type: 'Petition', size: '245 KB', uploaded: '2024-01-16', by: 1 },
  { id: 'D002', caseId: 'CS-2024-001', name: 'Power of Attorney.pdf', type: 'Legal', size: '120 KB', uploaded: '2024-01-16', by: 1 },
  { id: 'D003', caseId: 'CS-2024-002', name: 'FIR Copy.pdf', type: 'Evidence', size: '89 KB', uploaded: '2024-02-21', by: 2 },
  { id: 'D004', caseId: 'CS-2024-003', name: 'Contract Agreement.pdf', type: 'Contract', size: '512 KB', uploaded: '2024-03-06', by: 1 },
  { id: 'D005', caseId: 'CS-2024-005', name: 'License Certificate.pdf', type: 'Evidence', size: '180 KB', uploaded: '2024-04-02', by: 2 },
];

const INITIAL_INVOICES = [
  { id: 'INV-2024-001', caseId: 'CS-2024-001', client: 'Mr. Karim Rahman', amount: 25000, paid: 25000, date: '2024-02-01', status: 'paid', method: 'Bank Transfer', items: [{ desc: 'Retainer Fee', amount: 25000 }] },
  { id: 'INV-2024-002', caseId: 'CS-2024-002', client: 'State', amount: 0, paid: 0, date: '2024-03-01', status: 'na', method: '', items: [] },
  { id: 'INV-2024-003', caseId: 'CS-2024-003', client: 'Akter Enterprises Ltd.', amount: 100000, paid: 50000, date: '2024-04-01', status: 'partial', method: 'Cheque', items: [{ desc: 'Retainer', amount: 50000 }, { desc: 'Filing Fees', amount: 50000 }] },
  { id: 'INV-2025-001', caseId: 'CS-2025-001', client: 'Ms. Razia Noor', amount: 15000, paid: 0, date: '2025-01-11', status: 'unpaid', method: '', items: [{ desc: 'Consultation + Filing', amount: 15000 }] },
];

const LEGAL_DB = [
  { id: 1, act: 'Code of Criminal Procedure 1898', section: '161', title: 'Examination of witnesses by police', text: 'Any police officer making an investigation may examine orally any person supposed to be acquainted with the facts and circumstances of the case.' },
  { id: 2, act: 'Penal Code 1860', section: '420', title: 'Cheating and dishonestly inducing delivery of property', text: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security...' },
  { id: 3, act: 'Evidence Act 1872', section: '3', title: 'Interpretation clause - Facts', text: '"Facts" means and includes: (1) any thing, state of things, or relation of things, capable of being perceived by the senses; (2) any mental condition of which any person is conscious.' },
  { id: 4, act: 'Contract Act 1872', section: '2(h)', title: 'Definition of Contract', text: 'An agreement enforceable by law is a contract. A contract is an agreement; an agreement is a promise; a promise is an accepted proposal.' },
  { id: 5, act: 'Family Courts Ordinance 1985', section: '5', title: 'Jurisdiction of Family Courts', text: 'Subject to the provisions of this Ordinance, a Family Court shall have exclusive jurisdiction to entertain, try and dispose of any suit relating to dissolution of marriage, dower, maintenance, restitution of conjugal rights, and guardianship.' },
  { id: 6, act: 'Negotiable Instruments Act 1881', section: '138', title: 'Dishonour of cheque', text: 'Where any cheque drawn by a person on an account maintained by him with a banker for payment of any amount of money to another person from out of that account is returned by the bank unpaid...' },
  { id: 7, act: 'Transfer of Property Act 1882', section: '54', title: 'Sale defined', text: '"Sale" is a transfer of ownership in exchange for a price paid or promised or part-paid and part-promised.' },
  { id: 8, act: 'Specific Relief Act 1877', section: '12', title: 'Specific performance of part of contract', text: 'The court shall not direct the specific performance of a part of a contract, except in cases coming under one of the three next following sections.' },
];

const CHAT_RESPONSES = {
  default: 'আপনার প্রশ্নের জন্য ধন্যবাদ। আইনি পরামর্শের জন্য সর্বদা একজন যোগ্য আইনজীবীর সাথে পরামর্শ করুন। I can help you with Bangladesh legal questions — case procedures, evidence rules, family law, criminal law, and more. What would you like to know?',
  bail: 'Bail under CrPC: A person accused of a bailable offence (Schedule I) is entitled to bail as of right under Section 436. For non-bailable offences, bail is discretionary under Section 497. Factors considered: nature of offence, previous criminal record, likelihood of fleeing, and danger to society. The Sessions Court and High Court Division have concurrent jurisdiction for bail matters.',
  vakalatnama: 'একটি ভকালতনামা হল একটি আইনি দলিল যার মাধ্যমে একজন পক্ষ তার মামলা পরিচালনার জন্য একজন আইনজীবীকে ক্ষমতা প্রদান করেন। এটি অবশ্যই স্ট্যাম্প পেপারে সম্পাদিত হতে হবে এবং সাক্ষী দ্বারা সত্যায়িত হতে হবে। A Vakalatnama authorizes an Advocate to appear and act in court proceedings.',
  evidence: 'Under the Evidence Act 1872 (applicable in Bangladesh): Primary evidence means the document itself. Secondary evidence includes certified copies, counterparts, and oral accounts. Electronic records are admissible under Section 65B. The burden of proof generally lies on the plaintiff.',
  family: 'Family law in Bangladesh is governed by personal law (Muslim Family Laws Ordinance 1961, Hindu Marriage Act) and the Family Courts Ordinance 1985. For divorce: Muslim women may seek Khul (judicial divorce). Dower (Mehr) is a right of the wife. Child custody is determined by the best interest of the child standard.',
};

// ─── UTILITIES ────────────────────────────────────────────────────────────────
function getStorage(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function setStorage(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

function useLocalState(key, init) {
  const [state, setState] = useState(() => getStorage(key, init));
  const set = useCallback((v) => {
    const next = typeof v === 'function' ? v(state) : v;
    setState(next);
    setStorage(key, next);
  }, [key, state]);
  return [state, set];
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  // Layout
  app: { display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--navy)' },
  sidebar: { width: 220, minWidth: 220, background: 'var(--surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  sidebarCollapsed: { width: 56, minWidth: 56 },
  main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  content: { flex: 1, overflow: 'auto', padding: 24 },
  topbar: { height: 52, borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12, background: 'var(--surface)', flexShrink: 0 },

  // Cards
  card: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 },
  cardGold: { background: 'var(--surface)', border: '1px solid var(--gold-dim)', borderRadius: 8, padding: 16 },

  // Buttons
  btn: { padding: '7px 14px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 },
  btnPrimary: { background: 'var(--gold)', color: 'var(--navy)', border: 'none' },
  btnSecondary: { background: 'transparent', color: 'var(--text)', border: '1px solid var(--border-mid)' },
  btnDanger: { background: 'transparent', color: 'var(--danger)', border: '1px solid rgba(224,82,82,0.3)' },
  btnGhost: { background: 'transparent', color: 'var(--text-muted)', border: 'none', padding: '5px 8px' },

  // Table
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { padding: '8px 12px', textAlign: 'left', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', fontWeight: 500, fontSize: 12 },
  td: { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--text)' },

  // Form
  formGroup: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 },
  input: { width: '100%', padding: '8px 12px', background: 'var(--surface-mid)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13 },

  // Modal
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 },
  modal: { background: 'var(--surface)', border: '1px solid var(--border-mid)', borderRadius: 10, padding: 24, width: '100%', maxWidth: 520, maxHeight: '85vh', overflow: 'auto' },

  // Badge
  badge: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 500 },

  // Grid
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  grid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 },
  grid4: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 },

  // Misc
  flex: { display: 'flex', alignItems: 'center' },
  flexBetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  gap8: { gap: 8 },
  gap12: { gap: 12 },
  gap16: { gap: 16 },
  mt8: { marginTop: 8 },
  mt16: { marginTop: 16 },
  mt24: { marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 16 },
};

// ─── BADGE HELPERS ────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    active: { bg: 'rgba(76,175,125,0.15)', color: '#4caf7d' },
    pending: { bg: 'rgba(201,168,76,0.15)', color: '#c9a84c' },
    closed: { bg: 'rgba(100,120,140,0.2)', color: '#8a9ab0' },
    paid: { bg: 'rgba(76,175,125,0.15)', color: '#4caf7d' },
    partial: { bg: 'rgba(201,168,76,0.15)', color: '#c9a84c' },
    unpaid: { bg: 'rgba(224,82,82,0.15)', color: '#e05252' },
    admin: { bg: 'rgba(201,168,76,0.2)', color: '#c9a84c' },
    advocate: { bg: 'rgba(74,158,218,0.15)', color: '#4a9eda' },
    clerk: { bg: 'rgba(150,100,200,0.15)', color: '#9664c8' },
    client: { bg: 'rgba(76,175,125,0.12)', color: '#4caf7d' },
  };
  const c = map[status] || { bg: 'rgba(100,120,140,0.2)', color: '#8a9ab0' };
  return <span style={{ ...S.badge, background: c.bg, color: c.color }}>{status}</span>;
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color = 'var(--gold)' }) {
  return (
    <div style={{ ...S.card, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ ...S.flex, ...S.gap8 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={16} style={{ color }} />
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--text)' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{sub}</div>}
    </div>
  );
}

// ─── MODAL WRAPPER ────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, wide }) {
  useEffect(() => {
    const fn = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);
  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ ...S.modal, maxWidth: wide ? 720 : 520 }}>
        <div style={{ ...S.flexBetween, marginBottom: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--gold-light)' }}>{title}</h3>
          <button onClick={onClose} style={{ ...S.btnGhost, borderRadius: 4 }}><X size={16} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('admin@lawbox.bd');
  const [pass, setPass] = useState('admin123');
  const [err, setErr] = useState('');
  const users = getStorage('lb_users', INITIAL_USERS);

  const handle = (e) => {
    e.preventDefault();
    const u = users.find(u => u.email === email && u.password === pass && u.active);
    if (u) { onLogin(u); } else { setErr('Invalid credentials or account disabled.'); }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--navy)' }}>
      <div style={{ width: 360 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
            <Scale size={28} style={{ color: 'var(--gold)' }} />
            <span style={{ fontSize: 26, fontWeight: 700, color: 'var(--gold-light)', letterSpacing: '0.05em' }}>LAWBOX</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Legal Practice Management System</p>
        </div>
        <div style={{ ...S.card, borderColor: 'var(--border-mid)' }}>
          <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={S.formGroup}>
              <label style={S.label}>Email</label>
              <input style={S.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Password</label>
              <input style={S.input} type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Enter password" />
            </div>
            {err && <p style={{ color: 'var(--danger)', fontSize: 12 }}>{err}</p>}
            <button type="submit" style={{ ...S.btn, ...S.btnPrimary, width: '100%', justifyContent: 'center', padding: '10px 14px', fontSize: 14 }}>
              Sign In
            </button>
          </form>
          <div style={{ marginTop: 16, padding: '12px', background: 'var(--navy)', borderRadius: 6, fontSize: 11, color: 'var(--text-dim)' }}>
            <strong style={{ color: 'var(--text-muted)' }}>Demo accounts:</strong><br />
            admin@lawbox.bd / admin123 (Admin)<br />
            advocate@lawbox.bd / adv123 (Advocate)<br />
            clerk@lawbox.bd / clerk123 (Clerk)<br />
            client@lawbox.bd / client123 (Client)
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'advocate', 'clerk', 'client'] },
  { id: 'cases', label: 'Cases', icon: FolderOpen, roles: ['admin', 'advocate', 'clerk', 'client'] },
  { id: 'calendar', label: 'Calendar', icon: Calendar, roles: ['admin', 'advocate', 'clerk'] },
  { id: 'causelist', label: 'Cause List', icon: List, roles: ['admin', 'advocate', 'clerk', 'client'] },
  { id: 'documents', label: 'Documents', icon: FileText, roles: ['admin', 'advocate', 'clerk'] },
  { id: 'docgen', label: 'Doc Generator', icon: FilePlus, roles: ['admin', 'advocate'] },
  { id: 'ai', label: 'AI Assistant', icon: Bot, roles: ['admin', 'advocate', 'clerk'] },
  { id: 'research', label: 'Legal Research', icon: BookOpen, roles: ['admin', 'advocate', 'clerk'] },
  { id: 'billing', label: 'Billing', icon: CreditCard, roles: ['admin', 'advocate'] },
  { id: 'admin', label: 'Admin Panel', icon: Settings, roles: ['admin'] },
];

function Sidebar({ active, onNav, user, onLogout, collapsed, onToggle }) {
  const items = NAV.filter(n => n.roles.includes(user.role));
  return (
    <div style={{ ...S.sidebar, ...(collapsed ? S.sidebarCollapsed : {}), transition: 'width 0.2s' }}>
      <div style={{ padding: collapsed ? '14px 12px' : '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, justifyContent: collapsed ? 'center' : 'flex-start' }}>
        <Scale size={20} style={{ color: 'var(--gold)', flexShrink: 0 }} />
        {!collapsed && <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--gold-light)', letterSpacing: '0.05em' }}>LAWBOX</span>}
      </div>

      <nav style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
        {items.map(n => {
          const Icon = n.icon;
          const isActive = active === n.id;
          return (
            <button key={n.id} onClick={() => onNav(n.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: collapsed ? '9px 0' : '9px 16px', justifyContent: collapsed ? 'center' : 'flex-start',
              background: isActive ? 'rgba(201,168,76,0.12)' : 'transparent',
              border: 'none', borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent',
              color: isActive ? 'var(--gold)' : 'var(--text-muted)', fontSize: 13, fontWeight: isActive ? 500 : 400, cursor: 'pointer',
            }}>
              <Icon size={16} style={{ flexShrink: 0 }} />
              {!collapsed && n.label}
            </button>
          );
        })}
      </nav>

      <div style={{ borderTop: '1px solid var(--border)', padding: collapsed ? '10px 8px' : '10px 12px' }}>
        {!collapsed && (
          <div style={{ fontSize: 12, marginBottom: 8, padding: '6px 8px', background: 'var(--navy)', borderRadius: 6 }}>
            <div style={{ fontWeight: 500, color: 'var(--text)' }}>{user.name}</div>
            <StatusBadge status={user.role} />
          </div>
        )}
        <div style={{ display: 'flex', gap: 4, justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <button onClick={onToggle} style={{ ...S.btnGhost, borderRadius: 4 }} title="Toggle sidebar">
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
          {!collapsed && (
            <button onClick={onLogout} style={{ ...S.btnGhost, borderRadius: 4, color: 'var(--danger)', fontSize: 12, gap: 4 }}>
              <LogOut size={14} /> Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
function Topbar({ title, user }) {
  return (
    <div style={S.topbar}>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{title}</h2>
      </div>
      <Bell size={16} style={{ color: 'var(--text-muted)' }} />
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: 'var(--gold)' }}>
        {user.name.charAt(0)}
      </div>
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────
function App() {
  const [user, setUser] = useLocalState('lb_session', null);
  const [page, setPage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  // Initialize data stores
  useEffect(() => {
    if (!localStorage.getItem('lb_users')) setStorage('lb_users', INITIAL_USERS);
    if (!localStorage.getItem('lb_cases')) setStorage('lb_cases', INITIAL_CASES);
    if (!localStorage.getItem('lb_hearings')) setStorage('lb_hearings', INITIAL_HEARINGS);
    if (!localStorage.getItem('lb_documents')) setStorage('lb_documents', INITIAL_DOCUMENTS);
    if (!localStorage.getItem('lb_invoices')) setStorage('lb_invoices', INITIAL_INVOICES);
  }, []);

  if (!user) return <LoginPage onLogin={setUser} />;

  const titles = { dashboard: 'Dashboard', cases: 'Case Management', calendar: 'Calendar & Hearings', causelist: 'Cause List', documents: 'Documents', docgen: 'Document Generator', ai: 'AI Legal Assistant', research: 'Legal Research', billing: 'Billing', admin: 'Admin Panel' };

  const pages = { dashboard: Dashboard, cases: Cases, calendar: CalendarModule, causelist: CauseList, documents: Documents, docgen: DocGenerator, ai: AIAssistant, research: LegalResearch, billing: Billing, admin: AdminPanel };
  const PageComp = pages[page] || Dashboard;

  return (
    <div style={S.app}>
      <Sidebar active={page} onNav={setPage} user={user} onLogout={() => setUser(null)} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div style={S.main}>
        <Topbar title={titles[page]} user={user} />
        <div style={S.content}>
          <PageComp user={user} />
        </div>
      </div>
    </div>
  );
}
// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ user }) {
  const cases = getStorage('lb_cases', INITIAL_CASES);
  const hearings = getStorage('lb_hearings', INITIAL_HEARINGS);
  const invoices = getStorage('lb_invoices', INITIAL_INVOICES);

  const active = cases.filter(c => c.status === 'active').length;
  const upcoming = hearings.filter(h => new Date(h.date) >= new Date()).length;
  const billed = invoices.reduce((s, i) => s + i.amount, 0);
  const collected = invoices.reduce((s, i) => s + i.paid, 0);

  const recent = [...cases].sort((a, b) => b.filed > a.filed ? 1 : -1).slice(0, 5);
  const nextHearings = hearings.filter(h => new Date(h.date) >= new Date()).sort((a, b) => a.date > b.date ? 1 : -1).slice(0, 5);

  const typeCount = cases.reduce((acc, c) => { acc[c.type] = (acc[c.type] || 0) + 1; return acc; }, {});

  return (
    <div>
      <div style={{ ...S.grid4, marginBottom: 20 }}>
        <StatCard icon={FolderOpen} label="Active Cases" value={active} sub={`${cases.length} total`} color="var(--gold)" />
        <StatCard icon={Calendar} label="Upcoming Hearings" value={upcoming} sub="next 30 days" color="var(--info)" />
        <StatCard icon={DollarSign} label="Total Billed" value={`৳${(billed / 1000).toFixed(0)}K`} sub="this year" color="var(--success)" />
        <StatCard icon={Users} label="Clients" value={new Set(cases.map(c => c.client)).size} sub="active matters" color="#9664c8" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginBottom: 20 }}>
        <div style={S.card}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 12 }}>Recent Cases</div>
          <table style={S.table}>
            <thead><tr>
              <th style={S.th}>Case ID</th>
              <th style={S.th}>Title</th>
              <th style={S.th}>Type</th>
              <th style={S.th}>Status</th>
            </tr></thead>
            <tbody>{recent.map(c => (
              <tr key={c.id}>
                <td style={{ ...S.td, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gold-dim)' }}>{c.id}</td>
                <td style={{ ...S.td, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</td>
                <td style={S.td}>{c.type}</td>
                <td style={S.td}><StatusBadge status={c.status} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <div style={S.card}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 12 }}>Upcoming Hearings</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {nextHearings.map(h => {
              const c = cases.find(c => c.id === h.caseId);
              return (
                <div key={h.id} style={{ padding: '8px 10px', background: 'var(--navy)', borderRadius: 6, borderLeft: '3px solid var(--gold-dim)' }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{c?.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{h.date} · {h.time} · {h.court}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={S.card}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 12 }}>Cases by Type</div>
          {Object.entries(typeCount).map(([type, count]) => (
            <div key={type} style={{ marginBottom: 8 }}>
              <div style={{ ...S.flexBetween, marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{type}</span>
                <span style={{ fontSize: 12, color: 'var(--text)' }}>{count}</span>
              </div>
              <div style={{ height: 4, background: 'var(--navy)', borderRadius: 2 }}>
                <div style={{ height: '100%', borderRadius: 2, background: 'var(--gold)', width: `${(count / cases.length) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div style={S.card}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 12 }}>Financial Summary</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Total Billed', val: billed, color: 'var(--gold)' },
              { label: 'Collected', val: collected, color: 'var(--success)' },
              { label: 'Outstanding', val: billed - collected, color: 'var(--danger)' },
            ].map(r => (
              <div key={r.label} style={{ ...S.flexBetween, padding: '8px 10px', background: 'var(--navy)', borderRadius: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: r.color }}>৳{r.val.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CASES ────────────────────────────────────────────────────────────────────
function Cases({ user }) {
  const [cases, setCases] = useLocalState('lb_cases', INITIAL_CASES);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ id: '', title: '', client: '', type: 'Civil', court: '', judge: '', status: 'active', filed: new Date().toISOString().split('T')[0], nextHearing: '', description: '', amount: 0 });

  const types = [...new Set(cases.map(c => c.type))];
  const filtered = cases.filter(c => {
    if (filterStatus !== 'all' && c.status !== filterStatus) return false;
    if (filterType !== 'all' && c.type !== filterType) return false;
    if (search) {
      const q = search.toLowerCase();
      return c.title.toLowerCase().includes(q) || c.client.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
    }
    return true;
  });

  const save = () => {
    if (!form.title || !form.client) return;
    const id = form.id || `CS-${new Date().getFullYear()}-${String(cases.length + 1).padStart(3, '0')}`;
    setCases(prev => {
      const existing = prev.findIndex(c => c.id === id);
      if (existing >= 0) { const n = [...prev]; n[existing] = { ...form, id }; return n; }
      return [...prev, { ...form, id, advocate: user.id }];
    });
    setShowAdd(false);
    setForm({ id: '', title: '', client: '', type: 'Civil', court: '', judge: '', status: 'active', filed: new Date().toISOString().split('T')[0], nextHearing: '', description: '', amount: 0 });
  };

  const del = (id) => { if (window.confirm('Delete this case?')) setCases(p => p.filter(c => c.id !== id)); };
  const edit = (c) => { setForm(c); setShowAdd(true); };

  if (selected) {
    const c = cases.find(c => c.id === selected);
    if (!c) { setSelected(null); return null; }
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ ...S.btn, ...S.btnSecondary, marginBottom: 16 }}><ChevronLeft size={14} /> Back</button>
        <div style={{ ...S.card, marginBottom: 16, borderColor: 'var(--border-mid)' }}>
          <div style={{ ...S.flexBetween, marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--gold-dim)', marginBottom: 4 }}>{c.id}</div>
              <h2 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)' }}>{c.title}</h2>
            </div>
            <StatusBadge status={c.status} />
          </div>
          <div style={{ ...S.grid2, gap: 12 }}>
            {[
              { label: 'Client', val: c.client },
              { label: 'Case Type', val: c.type },
              { label: 'Court', val: c.court },
              { label: 'Presiding Judge', val: c.judge },
              { label: 'Filed On', val: c.filed },
              { label: 'Next Hearing', val: c.nextHearing || 'Not scheduled' },
            ].map(r => (
              <div key={r.label} style={{ padding: '10px 12px', background: 'var(--navy)', borderRadius: 6 }}>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 2 }}>{r.label}</div>
                <div style={{ fontSize: 13, color: 'var(--text)' }}>{r.val}</div>
              </div>
            ))}
          </div>
          {c.description && (
            <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--navy)', borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 4 }}>Description</div>
              <div style={{ fontSize: 13, color: 'var(--text)' }}>{c.description}</div>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => edit(c)} style={{ ...S.btn, ...S.btnPrimary }}><Edit size={13} /> Edit Case</button>
          <button onClick={() => del(c.id)} style={{ ...S.btn, ...S.btnDanger }}><Trash2 size={13} /> Delete</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ ...S.flexBetween, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, flex: 1 }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 280 }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: 9, color: 'var(--text-dim)' }} />
            <input style={{ ...S.input, paddingLeft: 32 }} placeholder="Search cases..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select style={{ ...S.input, width: 'auto' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>
          <select style={{ ...S.input, width: 'auto' }} value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        {['admin', 'advocate'].includes(user.role) && (
          <button onClick={() => { setForm({ id: '', title: '', client: '', type: 'Civil', court: '', judge: '', status: 'active', filed: new Date().toISOString().split('T')[0], nextHearing: '', description: '', amount: 0 }); setShowAdd(true); }} style={{ ...S.btn, ...S.btnPrimary }}>
            <Plus size={14} /> Add Case
          </button>
        )}
      </div>

      <div style={S.card}>
        <table style={S.table}>
          <thead><tr>
            <th style={S.th}>Case ID</th>
            <th style={S.th}>Title</th>
            <th style={S.th}>Client</th>
            <th style={S.th}>Type</th>
            <th style={S.th}>Court</th>
            <th style={S.th}>Next Hearing</th>
            <th style={S.th}>Status</th>
            <th style={S.th}>Actions</th>
          </tr></thead>
          <tbody>{filtered.map(c => (
            <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(c.id)}>
              <td style={{ ...S.td, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gold-dim)' }}>{c.id}</td>
              <td style={{ ...S.td, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</td>
              <td style={{ ...S.td, color: 'var(--text-muted)' }}>{c.client}</td>
              <td style={S.td}>{c.type}</td>
              <td style={{ ...S.td, color: 'var(--text-muted)', fontSize: 12 }}>{c.court}</td>
              <td style={{ ...S.td, color: 'var(--text-muted)', fontSize: 12 }}>{c.nextHearing || '—'}</td>
              <td style={S.td}><StatusBadge status={c.status} /></td>
              <td style={S.td} onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => edit(c)} style={{ ...S.btnGhost, color: 'var(--gold-dim)' }}><Edit size={13} /></button>
                  {['admin'].includes(user.role) && <button onClick={() => del(c.id)} style={{ ...S.btnGhost, color: 'var(--danger)' }}><Trash2 size={13} /></button>}
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-dim)' }}>No cases found</div>}
      </div>

      {showAdd && (
        <Modal title={form.id ? 'Edit Case' : 'New Case'} onClose={() => setShowAdd(false)} wide>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Case Title', key: 'title', span: 2 },
              { label: 'Client Name', key: 'client' },
              { label: 'Case Type', key: 'type', type: 'select', opts: ['Civil', 'Criminal', 'Family', 'Commercial', 'Writ', 'Labour', 'Tax', 'Other'] },
              { label: 'Court', key: 'court' },
              { label: 'Presiding Judge', key: 'judge' },
              { label: 'Filing Date', key: 'filed', type: 'date' },
              { label: 'Next Hearing', key: 'nextHearing', type: 'date' },
              { label: 'Status', key: 'status', type: 'select', opts: ['active', 'pending', 'closed'] },
              { label: 'Fee (BDT)', key: 'amount', type: 'number' },
            ].map(f => (
              <div key={f.key} style={{ ...S.formGroup, gridColumn: f.span === 2 ? '1 / -1' : 'auto' }}>
                <label style={S.label}>{f.label}</label>
                {f.type === 'select' ? (
                  <select style={S.input} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}>
                    {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input style={S.input} type={f.type || 'text'} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))} />
                )}
              </div>
            ))}
            <div style={{ ...S.formGroup, gridColumn: '1 / -1' }}>
              <label style={S.label}>Description</label>
              <textarea style={{ ...S.input, minHeight: 70, resize: 'vertical' }} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'flex-end' }}>
            <button onClick={() => setShowAdd(false)} style={{ ...S.btn, ...S.btnSecondary }}>Cancel</button>
            <button onClick={save} style={{ ...S.btn, ...S.btnPrimary }}>Save Case</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
// ─── CALENDAR ─────────────────────────────────────────────────────────────────
function CalendarModule({ user }) {
  const [hearings, setHearings] = useLocalState('lb_hearings', INITIAL_HEARINGS);
  const cases = getStorage('lb_cases', INITIAL_CASES);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ id: '', caseId: '', date: '', time: '', court: '', room: '', purpose: 'Hearing', notes: '' });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const hearingDates = hearings.reduce((acc, h) => {
    const d = new Date(h.date);
    if (d.getMonth() === month && d.getFullYear() === year) acc[d.getDate()] = true;
    return acc;
  }, {});

  const save = () => {
    if (!form.caseId || !form.date) return;
    const id = form.id || `H${Date.now()}`;
    setHearings(prev => {
      const ei = prev.findIndex(h => h.id === id);
      if (ei >= 0) { const n = [...prev]; n[ei] = { ...form, id }; return n; }
      return [...prev, { ...form, id }];
    });
    setShowAdd(false);
  };

  const del = (id) => setHearings(p => p.filter(h => h.id !== id));

  const upcoming = hearings.filter(h => new Date(h.date) >= new Date()).sort((a, b) => a.date > b.date ? 1 : -1);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 16 }}>
      <div>
        <div style={S.card}>
          <div style={{ ...S.flexBetween, marginBottom: 12 }}>
            <button onClick={() => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); }} style={S.btnGhost}><ChevronLeft size={14} /></button>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)' }}>{monthNames[month]} {year}</span>
            <button onClick={() => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); }} style={S.btnGhost}><ChevronRight size={14} /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, textAlign: 'center' }}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} style={{ fontSize: 10, color: 'var(--text-dim)', padding: '4px 0' }}>{d}</div>
            ))}
            {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
            {Array(daysInMonth).fill(null).map((_, i) => {
              const day = i + 1;
              const hasHearing = hearingDates[day];
              const today = new Date();
              const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
              return (
                <div key={day} style={{ padding: '5px 2px', fontSize: 12, borderRadius: 4, position: 'relative', background: isToday ? 'rgba(201,168,76,0.2)' : 'transparent', color: isToday ? 'var(--gold)' : 'var(--text)' }}>
                  {day}
                  {hasHearing && <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', margin: '2px auto 0' }} />}
                </div>
              );
            })}
          </div>
        </div>

        {['admin', 'advocate', 'clerk'].includes(user.role) && (
          <button onClick={() => { setForm({ id: '', caseId: '', date: '', time: '', court: '', room: '', purpose: 'Hearing', notes: '' }); setShowAdd(true); }} style={{ ...S.btn, ...S.btnPrimary, width: '100%', justifyContent: 'center', marginTop: 12 }}>
            <Plus size={14} /> Schedule Hearing
          </button>
        )}
      </div>

      <div style={S.card}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 12 }}>Upcoming Hearings</div>
        <table style={S.table}>
          <thead><tr>
            <th style={S.th}>Case</th>
            <th style={S.th}>Date</th>
            <th style={S.th}>Time</th>
            <th style={S.th}>Court</th>
            <th style={S.th}>Purpose</th>
            <th style={S.th}>Action</th>
          </tr></thead>
          <tbody>{upcoming.map(h => {
            const c = cases.find(c => c.id === h.caseId);
            return (
              <tr key={h.id}>
                <td style={S.td}><div style={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c?.title || h.caseId}</div></td>
                <td style={{ ...S.td, fontFamily: 'var(--mono)', fontSize: 12 }}>{h.date}</td>
                <td style={S.td}>{h.time}</td>
                <td style={{ ...S.td, fontSize: 12, color: 'var(--text-muted)' }}>{h.court}</td>
                <td style={S.td}><span style={{ ...S.badge, background: 'rgba(74,158,218,0.12)', color: 'var(--info)' }}>{h.purpose}</span></td>
                <td style={S.td}>
                  <button onClick={() => del(h.id)} style={{ ...S.btnGhost, color: 'var(--danger)' }}><Trash2 size={13} /></button>
                </td>
              </tr>
            );
          })}</tbody>
        </table>
        {upcoming.length === 0 && <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-dim)' }}>No upcoming hearings</div>}
      </div>

      {showAdd && (
        <Modal title="Schedule Hearing" onClose={() => setShowAdd(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={S.formGroup}>
              <label style={S.label}>Case</label>
              <select style={S.input} value={form.caseId} onChange={e => setForm(p => ({ ...p, caseId: e.target.value }))}>
                <option value="">Select case...</option>
                {cases.filter(c => c.status !== 'closed').map(c => <option key={c.id} value={c.id}>{c.id} — {c.title}</option>)}
              </select>
            </div>
            <div style={S.grid2}>
              <div style={S.formGroup}><label style={S.label}>Date</label><input style={S.input} type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} /></div>
              <div style={S.formGroup}><label style={S.label}>Time</label><input style={S.input} type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} /></div>
            </div>
            <div style={S.formGroup}><label style={S.label}>Court</label><input style={S.input} value={form.court} onChange={e => setForm(p => ({ ...p, court: e.target.value }))} /></div>
            <div style={S.grid2}>
              <div style={S.formGroup}><label style={S.label}>Room/Bench</label><input style={S.input} value={form.room} onChange={e => setForm(p => ({ ...p, room: e.target.value }))} /></div>
              <div style={S.formGroup}><label style={S.label}>Purpose</label>
                <select style={S.input} value={form.purpose} onChange={e => setForm(p => ({ ...p, purpose: e.target.value }))}>
                  {['Hearing', 'Argument', 'Evidence', 'Mediation', 'Rule Hearing', 'Judgment', 'Misc'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div style={S.formGroup}><label style={S.label}>Notes</label><textarea style={{ ...S.input, minHeight: 60, resize: 'vertical' }} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} /></div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
              <button onClick={() => setShowAdd(false)} style={{ ...S.btn, ...S.btnSecondary }}>Cancel</button>
              <button onClick={save} style={{ ...S.btn, ...S.btnPrimary }}>Save</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── CAUSE LIST ───────────────────────────────────────────────────────────────
function CauseList({ user }) {
  const cases = getStorage('lb_cases', INITIAL_CASES);
  const hearings = getStorage('lb_hearings', INITIAL_HEARINGS);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [court, setCourt] = useState('all');

  const courts = [...new Set(hearings.map(h => h.court))];
  const filtered = hearings.filter(h => {
    if (h.date !== date) return false;
    if (court !== 'all' && h.court !== court) return false;
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
        <div style={S.formGroup}>
          <label style={S.label}>Date</label>
          <input style={{ ...S.input, width: 160 }} type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div style={S.formGroup}>
          <label style={S.label}>Court</label>
          <select style={{ ...S.input, width: 240 }} value={court} onChange={e => setCourt(e.target.value)}>
            <option value="all">All Courts</option>
            {courts.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div style={{ ...S.card, borderColor: 'var(--border-mid)' }}>
        <div style={{ ...S.flexBetween, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--gold-light)' }}>DAILY CAUSE LIST</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{date} · {court === 'all' ? 'All Courts' : court}</div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{filtered.length} matters listed</div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-dim)' }}>No matters listed for this date/court</div>
        ) : (
          <table style={S.table}>
            <thead><tr>
              <th style={S.th}>Sl.</th>
              <th style={S.th}>Case No.</th>
              <th style={S.th}>Case Title</th>
              <th style={S.th}>Time</th>
              <th style={S.th}>Court Room</th>
              <th style={S.th}>Purpose</th>
              <th style={S.th}>Advocate</th>
            </tr></thead>
            <tbody>{filtered.map((h, i) => {
              const c = cases.find(c => c.id === h.caseId);
              const isMine = c?.advocate === user.id || user.role === 'admin';
              return (
                <tr key={h.id} style={{ background: isMine ? 'rgba(201,168,76,0.06)' : 'transparent' }}>
                  <td style={S.td}>{i + 1}</td>
                  <td style={{ ...S.td, fontFamily: 'var(--mono)', fontSize: 11 }}>
                    {h.caseId}
                    {isMine && <span style={{ ...S.badge, background: 'rgba(201,168,76,0.2)', color: 'var(--gold)', marginLeft: 6, fontSize: 10 }}>Mine</span>}
                  </td>
                  <td style={S.td}>{c?.title || '—'}</td>
                  <td style={S.td}>{h.time}</td>
                  <td style={S.td}>{h.room}</td>
                  <td style={S.td}><span style={{ ...S.badge, background: 'rgba(74,158,218,0.12)', color: 'var(--info)' }}>{h.purpose}</span></td>
                  <td style={{ ...S.td, color: 'var(--text-muted)', fontSize: 12 }}>{c?.advocate ? 'Adv. on record' : '—'}</td>
                </tr>
              );
            })}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── DOCUMENTS ────────────────────────────────────────────────────────────────
function Documents({ user }) {
  const [documents, setDocuments] = useLocalState('lb_documents', INITIAL_DOCUMENTS);
  const cases = getStorage('lb_cases', INITIAL_CASES);
  const [search, setSearch] = useState('');
  const [filterCase, setFilterCase] = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const [form, setForm] = useState({ caseId: '', name: '', type: 'Petition' });

  const docTypes = ['Petition', 'Legal', 'Evidence', 'Contract', 'Court Order', 'Affidavit', 'Other'];
  const typeIcons = { Petition: '📄', Legal: '⚖️', Evidence: '🔍', Contract: '📋', 'Court Order': '🏛️', Affidavit: '✍️', Other: '📁' };

  const filtered = documents.filter(d => {
    if (filterCase !== 'all' && d.caseId !== filterCase) return false;
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const upload = () => {
    if (!form.caseId || !form.name) return;
    setDocuments(p => [...p, {
      id: `D${Date.now()}`, ...form,
      size: `${Math.floor(Math.random() * 900 + 100)} KB`,
      uploaded: new Date().toISOString().split('T')[0],
      by: user.id
    }]);
    setShowUpload(false);
    setForm({ caseId: '', name: '', type: 'Petition' });
  };

  const del = (id) => setDocuments(p => p.filter(d => d.id !== id));

  return (
    <div>
      <div style={{ ...S.flexBetween, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: 9, color: 'var(--text-dim)' }} />
            <input style={{ ...S.input, paddingLeft: 32, width: 220 }} placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select style={{ ...S.input, width: 'auto' }} value={filterCase} onChange={e => setFilterCase(e.target.value)}>
            <option value="all">All Cases</option>
            {cases.map(c => <option key={c.id} value={c.id}>{c.id}</option>)}
          </select>
        </div>
        <button onClick={() => setShowUpload(true)} style={{ ...S.btn, ...S.btnPrimary }}><Upload size={14} /> Upload Document</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {filtered.map(d => {
          const c = cases.find(c => c.id === d.caseId);
          return (
            <div key={d.id} style={{ ...S.card, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 28, textAlign: 'center', padding: '8px 0' }}>{typeIcons[d.type] || '📄'}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', textAlign: 'center', wordBreak: 'break-word' }}>{d.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>{d.type} · {d.size}</div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)', textAlign: 'center' }}>{c?.id || '—'}</div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)', textAlign: 'center' }}>{d.uploaded}</div>
              <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 4 }}>
                <button style={{ ...S.btn, ...S.btnSecondary, padding: '4px 10px', fontSize: 11 }}><Download size={11} /> Download</button>
                <button onClick={() => del(d.id)} style={{ ...S.btnGhost, color: 'var(--danger)' }}><Trash2 size={13} /></button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 48, color: 'var(--text-dim)' }}>No documents found</div>}
      </div>

      {showUpload && (
        <Modal title="Upload Document" onClose={() => setShowUpload(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={S.formGroup}>
              <label style={S.label}>Case</label>
              <select style={S.input} value={form.caseId} onChange={e => setForm(p => ({ ...p, caseId: e.target.value }))}>
                <option value="">Select case...</option>
                {cases.map(c => <option key={c.id} value={c.id}>{c.id} — {c.title}</option>)}
              </select>
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Document Name</label>
              <input style={S.input} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g., Petition_Draft_v2.pdf" />
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Document Type</label>
              <select style={S.input} value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                {docTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ border: '2px dashed var(--border-mid)', borderRadius: 8, padding: 24, textAlign: 'center', color: 'var(--text-dim)', fontSize: 13 }}>
              📂 Drag & drop files here or click to browse<br />
              <span style={{ fontSize: 11 }}>PDF, DOCX, JPG up to 20MB</span>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowUpload(false)} style={{ ...S.btn, ...S.btnSecondary }}>Cancel</button>
              <button onClick={upload} style={{ ...S.btn, ...S.btnPrimary }}>Upload</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
// ─── DOCUMENT GENERATOR ───────────────────────────────────────────────────────
function DocGenerator({ user }) {
  const cases = getStorage('lb_cases', INITIAL_CASES);
  const [template, setTemplate] = useState('legal_notice');
  const [fields, setFields] = useState({});
  const [preview, setPreview] = useState('');

  const templates = {
    legal_notice: {
      label: 'Legal Notice',
      fields: ['clientName', 'respondentName', 'respondentAddress', 'subject', 'demandAmount', 'deadline', 'advocateName'],
      generate: (f) => `LEGAL NOTICE

Date: ${new Date().toLocaleDateString('en-BD')}

To,
${f.respondentName || '[Respondent Name]'}
${f.respondentAddress || '[Respondent Address]'}

Sub: ${f.subject || '[Subject]'}

Under instruction from my client ${f.clientName || '[Client Name]'}, I hereby serve upon you this legal notice:

You are hereby called upon to ${f.subject || 'fulfil your legal obligation'} within ${f.deadline || '15'} days from receipt of this notice, failing which my client shall be constrained to initiate appropriate legal proceedings against you without further notice.

The amount in dispute is BDT ${f.demandAmount || '0'} (in figures) only.

This notice is without prejudice to any other rights or remedies available to my client.

Yours faithfully,
${f.advocateName || '[Advocate Name]'}
Advocate
Bangladesh Bar Council`
    },
    bail_petition: {
      label: 'Bail Petition',
      fields: ['accusedName', 'caseNo', 'court', 'offence', 'advocateName', 'grounds'],
      generate: (f) => `IN THE ${(f.court || '[COURT NAME]').toUpperCase()}
CRIMINAL MISCELLANEOUS CASE NO. ${f.caseNo || '___/2025'}

IN THE MATTER OF:
An application for bail under Section 497 of the Code of Criminal Procedure, 1898.

AND

IN THE MATTER OF:
${f.accusedName || '[Accused Name]'} ... Petitioner/Accused

PETITION FOR BAIL

Most respectfully showeth:

1. That the petitioner ${f.accusedName || '[Name]'} has been arrested in connection with Case No. ${f.caseNo || '___'} for the alleged offence of ${f.offence || '[Offence]'}.

2. GROUNDS FOR BAIL:
${f.grounds || '(a) The petitioner is innocent and falsely implicated.\n(b) The petitioner has deep roots in the community.\n(c) The petitioner will not flee or obstruct justice.'}

3. That in the circumstances stated above, it is prayed that this Honourable Court may be pleased to admit the petitioner to bail on such terms and conditions as this Court deems fit and proper.

AND FOR THIS ACT OF KINDNESS, the petitioner, as in duty bound, shall ever pray.

${f.advocateName || '[Advocate Name]'}
Advocate for the Petitioner`
    },
    vakalatnama: {
      label: 'Vakalatnama',
      fields: ['clientName', 'clientAddress', 'advocateName', 'caseNo', 'court'],
      generate: (f) => `VAKALATNAMA

I, ${f.clientName || '[Client Full Name]'}, son/daughter of _______________, residing at ${f.clientAddress || '[Client Address]'}, do hereby appoint and retain ${f.advocateName || '[Advocate Name]'}, Advocate, High Court of Bangladesh, to appear, plead, and act for me in Case No. ${f.caseNo || '___'} in the ${f.court || '[Court Name]'} and in all proceedings connected therewith including appeals, revisions, and applications.

I hereby authorize my Advocate to do all things necessary and proper in the conduct of the said case.

Dated this ___ day of ___________ 2025.

_______________________        _______________________
(Signature of Client)           (Signature of Advocate)
${f.clientName || '[Client Name]'}       ${f.advocateName || '[Advocate Name]'}

Witnesses:
1. _______________
2. _______________`
    },
    plaint: {
      label: 'Plaint (Civil Suit)',
      fields: ['plaintiffName', 'plaintiffAddress', 'defendantName', 'defendantAddress', 'court', 'subject', 'reliefSought', 'advocateName'],
      generate: (f) => `IN THE ${(f.court || '[COURT NAME]').toUpperCase()}
TITLE SUIT NO. ___/2025

${f.plaintiffName || '[Plaintiff Name]'}
${f.plaintiffAddress || '[Address]'}          ... Plaintiff

-VERSUS-

${f.defendantName || '[Defendant Name]'}
${f.defendantAddress || '[Address]'}           ... Defendant

PLAINT

The plaintiff states as follows:

1. The plaintiff is a citizen of Bangladesh residing at the address mentioned above.

2. The defendant is liable to the plaintiff on account of ${f.subject || '[cause of action]'}.

3. RELIEF SOUGHT:
${f.reliefSought || 'The plaintiff prays for a decree against the defendant for the amount due along with interest and costs of the suit.'}

4. The cause of action arose within the jurisdiction of this Court.

5. The suit is valued at BDT _______________ and proper court fee has been affixed.

VERIFICATION:
I, ${f.plaintiffName || '[Plaintiff Name]'}, do hereby verify that the contents of this plaint are true to my knowledge.

${f.advocateName || '[Advocate Name]'}
Advocate for the Plaintiff`
    }
  };

  const tmpl = templates[template];

  const generate = () => {
    setPreview(tmpl.generate(fields));
  };

  const fieldLabels = {
    clientName: 'Client Name', respondentName: 'Respondent Name', respondentAddress: 'Respondent Address',
    subject: 'Subject / Demand', demandAmount: 'Demand Amount (BDT)', deadline: 'Deadline (days)',
    advocateName: 'Advocate Name', accusedName: 'Accused Name', caseNo: 'Case Number', court: 'Court',
    offence: 'Offence / Charge', grounds: 'Grounds for Bail', clientAddress: 'Client Address',
    plaintiffName: 'Plaintiff Name', plaintiffAddress: 'Plaintiff Address', defendantName: 'Defendant Name',
    defendantAddress: 'Defendant Address', reliefSought: 'Relief Sought',
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16 }}>
      <div style={S.card}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 12 }}>Document Template</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {Object.entries(templates).map(([key, t]) => (
            <button key={key} onClick={() => { setTemplate(key); setFields({}); setPreview(''); }} style={{
              ...S.btn, justifyContent: 'flex-start', width: '100%',
              background: template === key ? 'rgba(201,168,76,0.12)' : 'transparent',
              border: template === key ? '1px solid var(--gold-dim)' : '1px solid var(--border)',
              color: template === key ? 'var(--gold)' : 'var(--text-muted)',
            }}>{t.label}</button>
          ))}
        </div>

        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10 }}>Fill Fields</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {tmpl.fields.map(f => (
            <div key={f} style={S.formGroup}>
              <label style={S.label}>{fieldLabels[f] || f}</label>
              {f === 'grounds' || f === 'reliefSought' ? (
                <textarea style={{ ...S.input, minHeight: 70, resize: 'vertical', fontSize: 12 }} value={fields[f] || ''} onChange={e => setFields(p => ({ ...p, [f]: e.target.value }))} />
              ) : (
                <input style={{ ...S.input, fontSize: 12 }} value={fields[f] || ''} onChange={e => setFields(p => ({ ...p, [f]: e.target.value }))} />
              )}
            </div>
          ))}
        </div>
        <button onClick={generate} style={{ ...S.btn, ...S.btnPrimary, width: '100%', justifyContent: 'center', marginTop: 12 }}>
          <Eye size={14} /> Generate Preview
        </button>
      </div>

      <div style={S.card}>
        <div style={{ ...S.flexBetween, marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)' }}>Document Preview</div>
          {preview && <button style={{ ...S.btn, ...S.btnSecondary, fontSize: 12 }}><Download size={12} /> Export</button>}
        </div>
        {preview ? (
          <pre style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text)', whiteSpace: 'pre-wrap', lineHeight: 1.7, padding: 16, background: 'var(--navy)', borderRadius: 6, border: '1px solid var(--border)' }}>
            {preview}
          </pre>
        ) : (
          <div style={{ textAlign: 'center', padding: 64, color: 'var(--text-dim)' }}>
            <FilePlus size={32} style={{ marginBottom: 12, opacity: 0.3 }} /><br />
            Fill in the fields and click Generate Preview
          </div>
        )}
      </div>
    </div>
  );
}

// ─── AI ASSISTANT ─────────────────────────────────────────────────────────────
function AIAssistant({ user }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'আস্সালামুয়ালাইকুম! আমি LawBox AI Assistant। আমি বাংলাদেশের আইন সম্পর্কিত প্রশ্নের উত্তর দিতে পারি। How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const getResponse = (q) => {
    const lq = q.toLowerCase();
    if (lq.includes('bail')) return CHAT_RESPONSES.bail;
    if (lq.includes('vakalatnama') || lq.includes('vokalatnama')) return CHAT_RESPONSES.vakalatnama;
    if (lq.includes('evidence') || lq.includes('সাক্ষ্য')) return CHAT_RESPONSES.evidence;
    if (lq.includes('family') || lq.includes('divorce') || lq.includes('পারিবারিক') || lq.includes('তালাক')) return CHAT_RESPONSES.family;
    return CHAT_RESPONSES.default;
  };

  const send = () => {
    if (!input.trim() || loading) return;
    const q = input.trim();
    setInput('');
    setMessages(p => [...p, { role: 'user', text: q }]);
    setLoading(true);
    setTimeout(() => {
      setMessages(p => [...p, { role: 'assistant', text: getResponse(q) }]);
      setLoading(false);
    }, 800 + Math.random() * 600);
  };

  const quickPrompts = ['Bail procedure in Bangladesh', 'Vakalatnama requirements', 'Evidence Act basics', 'Family court jurisdiction'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {quickPrompts.map(p => (
          <button key={p} onClick={() => { setInput(p); }} style={{ ...S.btn, ...S.btnSecondary, fontSize: 12 }}>{p}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12, padding: '4px 0' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '72%', padding: '10px 14px', borderRadius: 10, fontSize: 13, lineHeight: 1.6,
              background: m.role === 'user' ? 'rgba(201,168,76,0.15)' : 'var(--surface)',
              border: m.role === 'user' ? '1px solid var(--gold-dim)' : '1px solid var(--border)',
              color: 'var(--text)',
              borderBottomRightRadius: m.role === 'user' ? 2 : 10,
              borderBottomLeftRadius: m.role === 'assistant' ? 2 : 10,
            }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '10px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, borderBottomLeftRadius: 2, color: 'var(--text-muted)', fontSize: 13 }}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          style={{ ...S.input, flex: 1 }}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask a legal question in English or বাংলায় জিজ্ঞাসা করুন..."
        />
        <button onClick={send} style={{ ...S.btn, ...S.btnPrimary }}><Send size={14} /></button>
      </div>
    </div>
  );
}

// ─── LEGAL RESEARCH ───────────────────────────────────────────────────────────
function LegalResearch({ user }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = LEGAL_DB.filter(l => {
    if (!search) return true;
    const q = search.toLowerCase();
    return l.act.toLowerCase().includes(q) || l.section.includes(q) || l.title.toLowerCase().includes(q) || l.text.toLowerCase().includes(q);
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div>
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: 9, color: 'var(--text-dim)' }} />
          <input style={{ ...S.input, paddingLeft: 32, width: '100%' }} placeholder="Search acts, sections, keywords..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(l => (
            <div key={l.id} onClick={() => setSelected(l)} style={{
              ...S.card, cursor: 'pointer',
              borderColor: selected?.id === l.id ? 'var(--gold-dim)' : 'var(--border)',
              background: selected?.id === l.id ? 'rgba(201,168,76,0.05)' : 'var(--surface)',
            }}>
              <div style={{ fontSize: 11, color: 'var(--gold-dim)', marginBottom: 2 }}>{l.act} · §{l.section}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{l.title}</div>
            </div>
          ))}
          {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-dim)' }}>No results found</div>}
        </div>
      </div>

      <div style={S.card}>
        {selected ? (
          <div>
            <div style={{ fontSize: 11, color: 'var(--gold-dim)', marginBottom: 4 }}>{selected.act}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold-light)', marginBottom: 4 }}>Section {selected.section}</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', marginBottom: 16 }}>{selected.title}</div>
            <div style={{ padding: 14, background: 'var(--navy)', borderRadius: 6, borderLeft: '3px solid var(--gold-dim)', fontSize: 13, lineHeight: 1.8, color: 'var(--text)' }}>
              {selected.text}
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <button style={{ ...S.btn, ...S.btnSecondary, fontSize: 12 }}><BookOpen size={12} /> Full Act</button>
              <button style={{ ...S.btn, ...S.btnSecondary, fontSize: 12 }}><Download size={12} /> Export</button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 64, color: 'var(--text-dim)' }}>
            <BookOpen size={32} style={{ marginBottom: 12, opacity: 0.3 }} /><br />
            Select a provision to view details
          </div>
        )}
      </div>
    </div>
  );
}

// ─── BILLING ──────────────────────────────────────────────────────────────────
function Billing({ user }) {
  const [invoices, setInvoices] = useLocalState('lb_invoices', INITIAL_INVOICES);
  const cases = getStorage('lb_cases', INITIAL_CASES);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ caseId: '', client: '', amount: 0, paid: 0, date: new Date().toISOString().split('T')[0], status: 'unpaid', method: '', items: [] });

  const billed = invoices.reduce((s, i) => s + i.amount, 0);
  const collected = invoices.reduce((s, i) => s + i.paid, 0);
  const outstanding = billed - collected;

  const save = () => {
    if (!form.caseId) return;
    const id = `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`;
    setInvoices(p => [...p, { ...form, id }]);
    setShowAdd(false);
  };

  const markPaid = (id) => {
    setInvoices(p => p.map(i => i.id === id ? { ...i, paid: i.amount, status: 'paid' } : i));
  };

  return (
    <div>
      <div style={{ ...S.grid3, marginBottom: 20 }}>
        <StatCard icon={DollarSign} label="Total Billed" value={`৳${billed.toLocaleString()}`} color="var(--gold)" />
        <StatCard icon={CheckCircle} label="Collected" value={`৳${collected.toLocaleString()}`} color="var(--success)" />
        <StatCard icon={AlertCircle} label="Outstanding" value={`৳${outstanding.toLocaleString()}`} color="var(--danger)" />
      </div>

      <div style={{ ...S.flexBetween, marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)' }}>Invoices</div>
        <button onClick={() => setShowAdd(true)} style={{ ...S.btn, ...S.btnPrimary }}><Plus size={14} /> New Invoice</button>
      </div>

      <div style={S.card}>
        <table style={S.table}>
          <thead><tr>
            <th style={S.th}>Invoice #</th>
            <th style={S.th}>Case</th>
            <th style={S.th}>Client</th>
            <th style={S.th}>Date</th>
            <th style={S.th}>Amount</th>
            <th style={S.th}>Paid</th>
            <th style={S.th}>Status</th>
            <th style={S.th}>Action</th>
          </tr></thead>
          <tbody>{invoices.map(inv => (
            <tr key={inv.id}>
              <td style={{ ...S.td, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gold-dim)' }}>{inv.id}</td>
              <td style={{ ...S.td, fontSize: 12 }}>{inv.caseId}</td>
              <td style={S.td}>{inv.client}</td>
              <td style={{ ...S.td, fontSize: 12 }}>{inv.date}</td>
              <td style={{ ...S.td, fontWeight: 500 }}>৳{inv.amount.toLocaleString()}</td>
              <td style={{ ...S.td, color: 'var(--success)' }}>৳{inv.paid.toLocaleString()}</td>
              <td style={S.td}><StatusBadge status={inv.status} /></td>
              <td style={S.td}>
                {inv.status !== 'paid' && inv.status !== 'na' && (
                  <button onClick={() => markPaid(inv.id)} style={{ ...S.btn, ...S.btnSecondary, fontSize: 11, padding: '3px 8px' }}>Mark Paid</button>
                )}
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      {showAdd && (
        <Modal title="New Invoice" onClose={() => setShowAdd(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={S.formGroup}>
              <label style={S.label}>Case</label>
              <select style={S.input} value={form.caseId} onChange={e => {
                const c = cases.find(c => c.id === e.target.value);
                setForm(p => ({ ...p, caseId: e.target.value, client: c?.client || '' }));
              }}>
                <option value="">Select case...</option>
                {cases.map(c => <option key={c.id} value={c.id}>{c.id} — {c.client}</option>)}
              </select>
            </div>
            <div style={S.formGroup}><label style={S.label}>Client</label><input style={S.input} value={form.client} onChange={e => setForm(p => ({ ...p, client: e.target.value }))} /></div>
            <div style={S.grid2}>
              <div style={S.formGroup}><label style={S.label}>Total Amount (BDT)</label><input style={S.input} type="number" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: Number(e.target.value) }))} /></div>
              <div style={S.formGroup}><label style={S.label}>Date</label><input style={S.input} type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} /></div>
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Payment Method</label>
              <select style={S.input} value={form.method} onChange={e => setForm(p => ({ ...p, method: e.target.value }))}>
                <option value="">Select...</option>
                {['Bank Transfer', 'Cheque', 'Cash', 'bKash', 'Nagad'].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowAdd(false)} style={{ ...S.btn, ...S.btnSecondary }}>Cancel</button>
              <button onClick={save} style={{ ...S.btn, ...S.btnPrimary }}>Create Invoice</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({ user }) {
  const [users, setUsers] = useLocalState('lb_users', INITIAL_USERS);
  const [tab, setTab] = useState('users');
  const [settings, setSettings] = useLocalState('lb_settings', { firmName: 'LawBox Legal Associates', jurisdiction: 'Bangladesh', language: 'en' });
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'clerk', active: true, barId: '' });

  const toggleUser = (id) => setUsers(p => p.map(u => u.id === id ? { ...u, active: !u.active } : u));
  const delUser = (id) => { if (window.confirm('Remove this user?')) setUsers(p => p.filter(u => u.id !== id)); };

  const addUser = () => {
    if (!form.name || !form.email || !form.password) return;
    setUsers(p => [...p, { ...form, id: Date.now() }]);
    setShowAdd(false);
    setForm({ name: '', email: '', password: '', role: 'clerk', active: true, barId: '' });
  };

  const PERMISSIONS = {
    admin: { cases: '✓', documents: '✓', billing: '✓', users: '✓', settings: '✓', causelist: '✓' },
    advocate: { cases: '✓', documents: '✓', billing: '✓', users: '✗', settings: '✗', causelist: '✓' },
    clerk: { cases: 'View', documents: '✓', billing: '✗', users: '✗', settings: '✗', causelist: '✓' },
    client: { cases: 'Own', documents: 'Own', billing: '✗', users: '✗', settings: '✗', causelist: '✓' },
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
        {['users', 'settings', 'roles'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            ...S.btn, fontSize: 12,
            background: tab === t ? 'rgba(201,168,76,0.12)' : 'transparent',
            border: tab === t ? '1px solid var(--gold-dim)' : '1px solid transparent',
            color: tab === t ? 'var(--gold)' : 'var(--text-muted)',
          }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
        ))}
      </div>

      {tab === 'users' && (
        <div>
          <div style={{ ...S.flexBetween, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)' }}>System Users</div>
            <button onClick={() => setShowAdd(true)} style={{ ...S.btn, ...S.btnPrimary }}><Plus size={14} /> Add User</button>
          </div>
          <div style={S.card}>
            <table style={S.table}>
              <thead><tr>
                <th style={S.th}>Name</th>
                <th style={S.th}>Email</th>
                <th style={S.th}>Role</th>
                <th style={S.th}>Bar ID</th>
                <th style={S.th}>Status</th>
                <th style={S.th}>Actions</th>
              </tr></thead>
              <tbody>{users.map(u => (
                <tr key={u.id}>
                  <td style={S.td}>{u.name}</td>
                  <td style={{ ...S.td, fontSize: 12, color: 'var(--text-muted)' }}>{u.email}</td>
                  <td style={S.td}><StatusBadge status={u.role} /></td>
                  <td style={{ ...S.td, fontFamily: 'var(--mono)', fontSize: 11 }}>{u.barId || '—'}</td>
                  <td style={S.td}><span style={{ ...S.badge, background: u.active ? 'rgba(76,175,125,0.15)' : 'rgba(224,82,82,0.15)', color: u.active ? 'var(--success)' : 'var(--danger)' }}>{u.active ? 'Active' : 'Disabled'}</span></td>
                  <td style={S.td}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button onClick={() => toggleUser(u.id)} style={{ ...S.btn, ...S.btnSecondary, fontSize: 11, padding: '3px 8px' }}>{u.active ? 'Disable' : 'Enable'}</button>
                      {u.id !== user.id && <button onClick={() => delUser(u.id)} style={{ ...S.btnGhost, color: 'var(--danger)' }}><Trash2 size={13} /></button>}
                    </div>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'settings' && (
        <div style={{ maxWidth: 480 }}>
          <div style={S.card}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 16 }}>System Settings</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={S.formGroup}>
                <label style={S.label}>Firm Name</label>
                <input style={S.input} value={settings.firmName} onChange={e => setSettings(p => ({ ...p, firmName: e.target.value }))} />
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Jurisdiction</label>
                <select style={S.input} value={settings.jurisdiction} onChange={e => setSettings(p => ({ ...p, jurisdiction: e.target.value }))}>
                  <option>Bangladesh</option>
                  <option>India</option>
                  <option>Pakistan</option>
                  <option>UK</option>
                </select>
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Language</label>
                <select style={S.input} value={settings.language} onChange={e => setSettings(p => ({ ...p, language: e.target.value }))}>
                  <option value="en">English</option>
                  <option value="bn">বাংলা</option>
                </select>
              </div>
              <button style={{ ...S.btn, ...S.btnPrimary }}><CheckCircle size={13} /> Save Settings</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'roles' && (
        <div style={S.card}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 16 }}>Role Permissions Matrix</div>
          <table style={S.table}>
            <thead><tr>
              <th style={S.th}>Permission</th>
              {Object.keys(PERMISSIONS).map(r => <th key={r} style={S.th}><StatusBadge status={r} /></th>)}
            </tr></thead>
            <tbody>{Object.keys(PERMISSIONS.admin).map(perm => (
              <tr key={perm}>
                <td style={{ ...S.td, textTransform: 'capitalize', fontWeight: 500 }}>{perm}</td>
                {Object.keys(PERMISSIONS).map(r => (
                  <td key={r} style={{ ...S.td, textAlign: 'center', color: PERMISSIONS[r][perm] === '✓' ? 'var(--success)' : PERMISSIONS[r][perm] === '✗' ? 'var(--danger)' : 'var(--gold-dim)' }}>
                    {PERMISSIONS[r][perm]}
                  </td>
                ))}
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {showAdd && (
        <Modal title="Add User" onClose={() => setShowAdd(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={S.formGroup}><label style={S.label}>Full Name</label><input style={S.input} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
            <div style={S.formGroup}><label style={S.label}>Email</label><input style={S.input} type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} /></div>
            <div style={S.formGroup}><label style={S.label}>Password</label><input style={S.input} type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} /></div>
            <div style={S.grid2}>
              <div style={S.formGroup}>
                <label style={S.label}>Role</label>
                <select style={S.input} value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}>
                  {['admin', 'advocate', 'clerk', 'client'].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div style={S.formGroup}><label style={S.label}>Bar ID (optional)</label><input style={S.input} value={form.barId} onChange={e => setForm(p => ({ ...p, barId: e.target.value }))} /></div>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowAdd(false)} style={{ ...S.btn, ...S.btnSecondary }}>Cancel</button>
              <button onClick={addUser} style={{ ...S.btn, ...S.btnPrimary }}>Add User</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
