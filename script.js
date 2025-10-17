// Menú móvil
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('nav-links');
menuBtn?.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    menuBtn.setAttribute('aria-expanded', String(!open));
});

// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Toggle tema (oscuro/claro sencillo)
const themeBtn = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const root = document.documentElement;

const light = {
    '--bg': '#f7f8fc', '--elev': '#ffffff', '--text': '#10131c', '--muted': '#495067',
    '--brand': '#2563eb', '--brand2': '#7c3aed', '--line': '#e7e9f3',
    '--card': '#ffffff', '--card-b': '#f2f5ff'
};
const dark = {
    '--bg': '#0b0f1a', '--elev': '#0f1524', '--text': '#eef2ff', '--muted': '#aab2cf',
    '--brand': '#6ee7ff', '--brand2': '#b794f4', '--line': '#1b2540',
    '--card': '#121a2e', '--card-b': '#1a2340'
};

function setTheme(mode) {
    const map = mode === 'light' ? light : dark;
    Object.entries(map).forEach(([k, v]) => root.style.setProperty(k, v));
    localStorage.setItem('theme', mode);
    themeLabel.textContent = mode === 'light' ? 'Claro' : 'Oscuro';
}
setTheme(localStorage.getItem('theme') ?? 'dark');
themeBtn?.addEventListener('click', () => {
    const mode = (localStorage.getItem('theme') ?? 'dark') === 'dark' ? 'light' : 'dark';
    setTheme(mode);
});
