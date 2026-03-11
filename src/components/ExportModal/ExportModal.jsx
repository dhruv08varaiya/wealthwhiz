import { downloadCSV } from '../../utils/helpers';
import './ExportModal.css';

export default function ExportModal({ data, filename, onClose, onExported }) {

  const handleCSV = () => {
    downloadCSV(data, `${filename}.csv`);
    onExported('csv');
    onClose();
  };

  const handlePDF = () => {
    // Build a printable HTML page and open it in a new tab for printing
    const headers = Object.keys(data[0] || {});
    const rows = data.map((row) =>
      `<tr>${headers.map((h) => `<td>${row[h] ?? ''}</td>`).join('')}</tr>`
    ).join('');

    const html = `<!DOCTYPE html>
<html>
<head>
  <title>${filename}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; }
    h2 { color: #2D6A4F; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th { background: #2D6A4F; color: #fff; padding: 8px 12px; text-align: left; }
    td { padding: 7px 12px; border-bottom: 1px solid #e2e8f0; }
    tr:nth-child(even) td { background: #f8faf9; }
    .footer { margin-top: 16px; font-size: 11px; color: #8896a6; }
  </style>
</head>
<body>
  <h2>💸 WealthWhiz — Expense Report</h2>
  <table>
    <thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p class="footer">Generated on ${new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
  <script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`;

    const win = window.open('', '_blank');
    win.document.open();
    win.document.write(html);
    win.document.close();
    onExported('pdf');
    onClose();
  };

  return (
    <div className="export-modal-overlay" onClick={onClose}>
      <div className="export-modal" onClick={(e) => e.stopPropagation()}>
        <div className="export-modal__header">
          <h5>📥 Export Expenses</h5>
          <button className="btn-close" onClick={onClose} />
        </div>
        <p className="export-modal__subtitle">Choose your preferred format to download</p>
        <div className="export-modal__options">
          <button className="export-option" onClick={handleCSV}>
            <span className="export-option__icon">📊</span>
            <span className="export-option__label">CSV</span>
            <span className="export-option__desc">Spreadsheet — open in Excel or Google Sheets</span>
          </button>
          <button className="export-option" onClick={handlePDF}>
            <span className="export-option__icon">📄</span>
            <span className="export-option__label">PDF</span>
            <span className="export-option__desc">Print-ready report — save as PDF from browser</span>
          </button>
        </div>
        <button className="btn btn-outline-secondary btn-sm w-100 mt-3" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
