import jsPDF from 'jspdf';
import type { EstimateResult, LeadData } from './types';
import { PROPERTY_TYPES, SCOPE_OPTIONS, FINISH_GRADES, formatINR } from './estimator';

export function generatePDFQuote(data: LeadData, estimate: EstimateResult): void {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;

  const property = PROPERTY_TYPES.find((p) => p.id === data.propertyType);
  const scope = SCOPE_OPTIONS.find((s) => s.id === data.scopeOfWork);
  const finish = FINISH_GRADES.find((f) => f.id === data.finishGrade);

  doc.setFillColor(26, 26, 26);
  doc.rect(0, 0, pageWidth, 120, 'F');

  doc.setTextColor(212, 175, 55);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('AURELIA INTERIORS', margin, 50);

  doc.setTextColor(245, 235, 224);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Premium Interior Design Studio', margin, 68);

  doc.setFontSize(9);
  doc.setTextColor(180, 180, 180);
  doc.text('Cost Estimation Report', margin, 85);

  doc.setFontSize(9);
  doc.setTextColor(212, 175, 55);
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, pageWidth - margin - 100, 50);

  let y = 155;

  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Client Details', margin, y);
  y += 10;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 22;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(70, 70, 70);

  const clientRows = [
    ['Name', data.name],
    ['WhatsApp', data.phone],
    ['City', data.city],
    ['Property Type', property?.label || data.propertyType],
    ['Carpet Area', `${data.carpetArea} sq.ft`],
    ['Scope of Work', scope?.label || data.scopeOfWork],
    ['Finish Grade', finish?.label || data.finishGrade],
  ] as const;

  for (const [label, value] of clientRows) {
    doc.setTextColor(130, 130, 130);
    doc.text(label, margin, y);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text(String(value), margin + 130, y);
    doc.setFont('helvetica', 'normal');
    y += 20;
  }

  y += 15;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(40, 40, 40);
  doc.text('Estimated Cost Summary', margin, y);
  y += 10;
  doc.setDrawColor(212, 175, 55);
  doc.line(margin, y, pageWidth - margin, y);
  y += 25;

  doc.setFillColor(26, 26, 26);
  doc.roundedRect(margin, y - 5, pageWidth - margin * 2, 50, 6, 6, 'F');
  doc.setTextColor(212, 175, 55);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Estimated Project Cost', margin + 20, y + 18);
  doc.setFontSize(16);
  doc.text(`${formatINR(estimate.min)} – ${formatINR(estimate.max)}`, margin + 20, y + 38);
  doc.setFontSize(9);
  doc.setTextColor(180, 180, 180);
  doc.setFont('helvetica', 'normal');
  doc.text(finish?.perSqft || '', pageWidth - margin - 20, y + 18, { align: 'right' });
  y += 65;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text('Itemized Cost Breakdown', margin, y);
  y += 8;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  const breakdownItems: [string, number][] = [
    ['Woodwork & Carpentry', estimate.breakdown.woodwork],
    ['Modular Kitchen', estimate.breakdown.kitchen],
    ['Painting & Wall Finish', estimate.breakdown.painting],
    ['Decor & Furnishings', estimate.breakdown.decor],
    ['Electrical & Lighting', estimate.breakdown.electrical],
  ];

  doc.setFontSize(10);
  for (const [label, amount] of breakdownItems) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(70, 70, 70);
    doc.text(String(label), margin, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text(formatINR(amount), pageWidth - margin, y, { align: 'right' });
    doc.setDrawColor(235, 235, 235);
    doc.setLineWidth(0.5);
    doc.line(margin, y + 4, pageWidth - margin, y + 4);
    y += 22;
  }

  y += 5;
  doc.setFillColor(245, 235, 224);
  doc.roundedRect(margin, y - 5, pageWidth - margin * 2, 30, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(26, 26, 26);
  doc.text('Approximate Total', margin + 15, y + 15);
  doc.text(formatINR(estimate.breakdown.total), pageWidth - margin - 15, y + 15, { align: 'right' });

  y += 55;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(140, 140, 140);
  doc.text(
    'This is a preliminary estimate based on the details provided. Final quotation may vary based on site',
    margin,
    y,
  );
  y += 12;
  doc.text('conditions, material selection, and design complexity. Please contact us for a detailed consultation.', margin, y);
  y += 25;

  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(212, 175, 55);
  doc.text('AURELIA INTERIORS', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text('contact@aureliainteriors.in  |  +91 98765 43210  |  www.aureliainteriors.in', pageWidth - margin, y, { align: 'right' });

  doc.save(`Aurelia_Quote_${data.name.replace(/\s+/g, '_')}.pdf`);
}

export function buildWhatsAppMessage(data: LeadData, estimate: EstimateResult): string {
  const property = PROPERTY_TYPES.find((p) => p.id === data.propertyType);
  const scope = SCOPE_OPTIONS.find((s) => s.id === data.scopeOfWork);
  const finish = FINISH_GRADES.find((f) => f.id === data.finishGrade);

  const lines = [
    "*AURELIA INTERIORS — New Lead*",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `City: ${data.city}`,
    "",
    "*Project Details*",
    `Property: ${property?.label}`,
    `Carpet Area: ${data.carpetArea} sq.ft`,
    `Scope: ${scope?.label}`,
    `Finish: ${finish?.label}`,
    "",
    "*Estimated Budget*",
    `${formatINR(estimate.min)} – ${formatINR(estimate.max)}`,
    "",
    "*Cost Breakdown*",
    `Woodwork: ${formatINR(estimate.breakdown.woodwork)}`,
    `Kitchen: ${formatINR(estimate.breakdown.kitchen)}`,
    `Painting: ${formatINR(estimate.breakdown.painting)}`,
    `Decor: ${formatINR(estimate.breakdown.decor)}`,
    `Electrical: ${formatINR(estimate.breakdown.electrical)}`,
    "",
    "I'd like to schedule a consultation.",
  ];

  return encodeURIComponent(lines.join('\n'));
}

export function getWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const formattedPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  return `https://wa.me/${formattedPhone}?text=${message}`;
}
