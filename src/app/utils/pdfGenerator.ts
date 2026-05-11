import jsPDF from 'jspdf';
import type { ResourceData } from '@/app/data';

const COLORS = {
  // Guardrail brand colors - dark theme
  background: '#0a0a0a',
  cardBg: '#161616',
  primary: '#5b6ff5',
  textPrimary: '#ffffff',
  textSecondary: '#a0a0a0',
  textTertiary: '#666666',
  border: '#2a2a2a',
  accent: '#4a5ee0',
} as const;

export function generateResourcePDF(resource: ResourceData): void {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter', // 8.5" x 11"
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPosition = margin;

  // Helper function to add new page if needed
  const checkPageBreak = (spaceNeeded: number) => {
    if (yPosition + spaceNeeded > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Add branded header
  const addHeader = () => {
    // Guardrail logo text (simplified - no actual logo image)
    pdf.setFontSize(24);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Guardrail HR', margin, yPosition);
    
    yPosition += 8;
    pdf.setFontSize(10);
    pdf.setTextColor(160, 160, 160);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Compliance Diagnosis Platform', margin, yPosition);
    
    yPosition += 15;
    
    // Divider line
    pdf.setDrawColor(42, 42, 42);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    
    yPosition += 10;
  };

  // Add footer with disclaimer and page number
  const addFooter = (pageNum: number) => {
    const footerY = pageHeight - 15;
    
    pdf.setFontSize(8);
    pdf.setTextColor(102, 102, 102);
    pdf.setFont('helvetica', 'normal');
    
    // Disclaimer
    pdf.text('Educational information only. Not legal advice.', margin, footerY);
    
    // Page number (right-aligned)
    const pageText = `Page ${pageNum}`;
    const pageTextWidth = pdf.getTextWidth(pageText);
    pdf.text(pageText, pageWidth - margin - pageTextWidth, footerY);
  };

  // Add resource title and metadata
  addHeader();
  
  pdf.setFontSize(20);
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  const title = pdf.splitTextToSize(resource.title, contentWidth);
  pdf.text(title, margin, yPosition);
  yPosition += title.length * 8;
  
  yPosition += 5;
  pdf.setFontSize(12);
  pdf.setTextColor(160, 160, 160);
  pdf.setFont('helvetica', 'normal');
  const subtitle = pdf.splitTextToSize(resource.subtitle, contentWidth);
  pdf.text(subtitle, margin, yPosition);
  yPosition += subtitle.length * 6 + 10;
  
  // Metadata
  pdf.setFontSize(9);
  pdf.setTextColor(102, 102, 102);
  pdf.text(`Type: ${resource.type}  |  Last Updated: ${resource.lastUpdated}  |  Est. Time: ${resource.estimatedTime}  |  Format: ${resource.format}`, margin, yPosition);
  yPosition += 15;
  
  // Overview section
  checkPageBreak(30);
  pdf.setFontSize(14);
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Overview', margin, yPosition);
  yPosition += 8;
  
  pdf.setFontSize(10);
  pdf.setTextColor(160, 160, 160);
  pdf.setFont('helvetica', 'normal');
  const overview = pdf.splitTextToSize(resource.overview, contentWidth);
  pdf.text(overview, margin, yPosition);
  yPosition += overview.length * 5 + 10;
  
  // Sections
  resource.sections.forEach((section, sectionIndex) => {
    checkPageBreak(40);
    
    // Section header
    pdf.setFontSize(14);
    pdf.setTextColor(91, 111, 245); // Primary brand color
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${sectionIndex + 1}. ${section.title}`, margin, yPosition);
    yPosition += 7;
    
    pdf.setFontSize(9);
    pdf.setTextColor(102, 102, 102);
    pdf.setFont('helvetica', 'italic');
    const summary = pdf.splitTextToSize(section.summary, contentWidth);
    pdf.text(summary, margin, yPosition);
    yPosition += summary.length * 4 + 8;
    
    // Section content
    if (section.content) {
      if (section.content.overview) {
        checkPageBreak(20);
        pdf.setFontSize(10);
        pdf.setTextColor(160, 160, 160);
        pdf.setFont('helvetica', 'normal');
        const contentOverview = pdf.splitTextToSize(section.content.overview, contentWidth);
        pdf.text(contentOverview, margin, yPosition);
        yPosition += contentOverview.length * 5 + 8;
      }
      
      // Top-level items
      if (section.content.items && section.content.items.length > 0) {
        section.content.items.forEach((item) => {
          checkPageBreak(15);
          pdf.setFontSize(9);
          pdf.setTextColor(160, 160, 160);
          pdf.setFont('helvetica', 'normal');
          
          // Bullet point
          pdf.setTextColor(91, 111, 245);
          pdf.text('•', margin + 2, yPosition);
          
          pdf.setTextColor(160, 160, 160);
          const itemText = pdf.splitTextToSize(item, contentWidth - 8);
          pdf.text(itemText, margin + 6, yPosition);
          yPosition += itemText.length * 4 + 3;
        });
        yPosition += 5;
      }
      
      // Subsections
      if (section.content.subsections && section.content.subsections.length > 0) {
        section.content.subsections.forEach((subsection) => {
          checkPageBreak(25);
          
          // Subsection title
          pdf.setFontSize(11);
          pdf.setTextColor(200, 200, 200);
          pdf.setFont('helvetica', 'bold');
          pdf.text(subsection.title, margin + 3, yPosition);
          yPosition += 6;
          
          // Subsection content
          if (subsection.content) {
            pdf.setFontSize(9);
            pdf.setTextColor(160, 160, 160);
            pdf.setFont('helvetica', 'normal');
            const subContent = pdf.splitTextToSize(subsection.content, contentWidth - 6);
            pdf.text(subContent, margin + 3, yPosition);
            yPosition += subContent.length * 4 + 5;
          }
          
          // Subsection items
          if (subsection.items && subsection.items.length > 0) {
            subsection.items.forEach((item) => {
              checkPageBreak(12);
              pdf.setFontSize(9);
              
              // Arrow bullet
              pdf.setTextColor(91, 111, 245);
              pdf.text('▸', margin + 6, yPosition);
              
              pdf.setTextColor(140, 140, 140);
              pdf.setFont('helvetica', 'normal');
              const itemText = pdf.splitTextToSize(item, contentWidth - 12);
              pdf.text(itemText, margin + 10, yPosition);
              yPosition += itemText.length * 4 + 2.5;
            });
          }
          
          yPosition += 6;
        });
      }
    }
    
    yPosition += 5;
  });
  
  // Related resources section
  if (resource.relatedResources.length > 0) {
    checkPageBreak(40);
    
    pdf.setFontSize(14);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Related Resources', margin, yPosition);
    yPosition += 10;
    
    resource.relatedResources.forEach((related) => {
      checkPageBreak(15);
      
      pdf.setFontSize(10);
      pdf.setTextColor(91, 111, 245);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`• ${related.title}`, margin + 2, yPosition);
      yPosition += 5;
      
      pdf.setFontSize(9);
      pdf.setTextColor(140, 140, 140);
      pdf.setFont('helvetica', 'normal');
      const desc = pdf.splitTextToSize(related.description, contentWidth - 6);
      pdf.text(desc, margin + 4, yPosition);
      yPosition += desc.length * 4 + 6;
    });
  }
  
  // Add footer to all pages
  const totalPages = pdf.internal.pages.length - 1; // First page is blank
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    addFooter(i);
  }
  
  // Save the PDF
  const fileName = `guardrail-hr-${resource.slug}-${resource.lastUpdated.toLowerCase().replace(/\s+/g, '-')}.pdf`;
  pdf.save(fileName);
}
