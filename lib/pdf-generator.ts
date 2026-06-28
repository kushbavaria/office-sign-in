import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { generateNDAText } from './nda-text';

export interface VisitorInfo {
  name: string;
  email: string;
  company: string;
  purpose: string;
  citizenship: string;
  timestamp: string;
  signature: string; // data URL (base64 PNG)
}

/**
 * Generate a signed NDA PDF for an office visitor.
 * Returns a Buffer containing the PDF.
 */
export async function generateNDAPdf(visitor: VisitorInfo): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 612; // Letter
  const pageHeight = 792;
  const margin = 50;
  const contentWidth = pageWidth - margin * 2;
  const fontSize = 9;
  const lineHeight = fontSize * 1.35;
  const titleFontSize = 16;
  const subtitleFontSize = 11;

  const visitDate = new Date(visitor.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const ndaText = generateNDAText({
    visitorName: visitor.name,
    visitorCompany: visitor.company,
    visitDate,
  });

  // Split into lines and paginate
  const rawLines = ndaText.split('\n');
  const lines: string[] = [];
  for (const raw of rawLines) {
    if (raw.trim() === '') {
      lines.push('');
      continue;
    }
    // Word-wrap long lines
    const words = raw.split(' ');
    let current = '';
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      const width = font.widthOfTextAtSize(test, fontSize);
      if (width > contentWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
  }

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  // Title
  page.drawText('NON-DISCLOSURE AGREEMENT', {
    x: margin,
    y: y,
    size: titleFontSize,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  y -= titleFontSize + 4;

  page.drawText('(One-Way — Office Visitor)', {
    x: margin,
    y: y,
    size: subtitleFontSize,
    font,
    color: rgb(0, 0, 0),
  });
  y -= subtitleFontSize + lineHeight + 4;

  // NDA body
  for (const line of lines) {
    if (y < margin + lineHeight * 3) {
      // New page
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    if (line.trim() === '') {
      y -= lineHeight * 0.5;
      continue;
    }

    // Detect headers (numbered sections or all-caps short lines)
    const isHeader = /^\d+\.\s/.test(line.trim()) ||
      (line === line.toUpperCase() && line.length > 5 && line.length < 80 && !line.includes('___'));

    const useFont = isHeader ? boldFont : font;

    try {
      page.drawText(line, {
        x: margin,
        y: y,
        size: fontSize,
        font: useFont,
        color: rgb(0, 0, 0),
      });
    } catch {
      // Skip characters that can't be encoded in standard font
      page.drawText(line.replace(/[^\x20-\x7E]/g, '?'), {
        x: margin,
        y: y,
        size: fontSize,
        font: useFont,
        color: rgb(0, 0, 0),
      });
    }
    y -= lineHeight;
  }

  // Embed the signature image
  const base64Match = visitor.signature.match(/^data:image\/png;base64,(.+)$/);
  if (base64Match) {
    const signatureBytes = Buffer.from(base64Match[1], 'base64');
    try {
      const signatureImage = await pdfDoc.embedPng(signatureBytes);
      const sigWidth = 250;
      const sigHeight = (signatureImage.height / signatureImage.width) * sigWidth;

      if (y < margin + sigHeight + lineHeight * 8) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }

      y -= lineHeight;
      page.drawText('Visitor Signature:', {
        x: margin,
        y: y,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      y -= 5;

      page.drawImage(signatureImage, {
        x: margin,
        y: y - sigHeight,
        width: sigWidth,
        height: sigHeight,
      });
      y -= sigHeight + lineHeight;
    } catch (imgError) {
      console.error('Error embedding signature image:', imgError);
    }
  }

  // Visitor info footer
  y -= lineHeight;
  const infoLines = [
    `Visitor: ${visitor.name}`,
    `Email: ${visitor.email}`,
    `Company: ${visitor.company}`,
    `Purpose of Visit: ${visitor.purpose}`,
    `Country of Citizenship: ${visitor.citizenship}`,
    `Date: ${visitDate}`,
  ];

  for (const infoLine of infoLines) {
    if (y < margin + lineHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    try {
      page.drawText(infoLine, {
        x: margin,
        y: y,
        size: 9,
        font,
        color: rgb(0, 0, 0),
      });
    } catch {
      page.drawText(infoLine.replace(/[^\x20-\x7E]/g, '?'), {
        x: margin,
        y: y,
        size: 9,
        font,
        color: rgb(0, 0, 0),
      });
    }
    y -= lineHeight;
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
