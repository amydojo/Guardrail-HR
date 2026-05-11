/**
 * HTML to DOCX Converter
 * Converts HTML DOM nodes to docx library elements
 * 
 * Supported HTML tags:
 * - H1, H2, H3 -> Heading levels 1, 2, 3
 * - P -> Paragraph with inline formatting
 * - STRONG, B -> Bold text
 * - EM, I -> Italic text
 * - BR -> Line break
 * - UL -> Bulleted list
 * - OL -> Numbered list
 * - LI -> List item
 * - DIV, SPAN -> Container (recurse into children)
 * - Text nodes -> Plain text
 * 
 * Extension guide:
 * - Add new block elements: Add case in convertNodeToParagraphs()
 * - Add new inline elements: Add case in processInlineNodes()
 * - Add styling: Modify the options in TextRun() or Paragraph()
 */

import {
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  convertInchesToTwip,
} from 'docx';

// ============================================================================
// TYPES
// ============================================================================

interface ConversionOptions {
  /** Current list level (for nested lists) */
  listLevel?: number;
  /** Whether we're inside a list */
  inList?: boolean;
}

// ============================================================================
// MAIN CONVERSION FUNCTION
// ============================================================================

/**
 * Convert HTML string to array of docx Paragraphs
 */
export function htmlToDocxParagraphs(html: string): Paragraph[] {
  // Parse HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Sanitize: remove scripts and styles
  const scripts = doc.querySelectorAll('script, style');
  scripts.forEach(el => el.remove());
  
  // Convert body content
  return convertNodeToParagraphs(doc.body);
}

// ============================================================================
// NODE CONVERSION
// ============================================================================

/**
 * Convert a DOM node and its children to docx Paragraphs
 */
function convertNodeToParagraphs(
  node: Node,
  options: ConversionOptions = {}
): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  
  if (node.nodeType === Node.TEXT_NODE) {
    // Text nodes should be handled by parent
    const text = node.textContent?.trim() || '';
    if (text) {
      paragraphs.push(new Paragraph({ children: [new TextRun(text)] }));
    }
    return paragraphs;
  }
  
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return paragraphs;
  }
  
  const element = node as HTMLElement;
  const tagName = element.tagName.toLowerCase();
  
  // Skip certain elements
  if (shouldSkipElement(element)) {
    return paragraphs;
  }
  
  switch (tagName) {
    case 'h1':
      paragraphs.push(createHeading(element, HeadingLevel.HEADING_1));
      break;
      
    case 'h2':
      paragraphs.push(createHeading(element, HeadingLevel.HEADING_2));
      break;
      
    case 'h3':
      paragraphs.push(createHeading(element, HeadingLevel.HEADING_3));
      break;
      
    case 'p':
      const pParagraph = createParagraph(element);
      if (pParagraph) {
        paragraphs.push(pParagraph);
      }
      break;
      
    case 'ul':
      paragraphs.push(...convertList(element, 'bullet', options.listLevel || 0));
      break;
      
    case 'ol':
      paragraphs.push(...convertList(element, 'number', options.listLevel || 0));
      break;
      
    case 'div':
    case 'section':
    case 'article':
      // Container elements - recurse into children
      Array.from(element.childNodes).forEach(child => {
        paragraphs.push(...convertNodeToParagraphs(child, options));
      });
      break;
      
    case 'br':
      // Standalone line breaks become empty paragraphs
      paragraphs.push(new Paragraph({ children: [] }));
      break;
      
    case 'span':
      // Inline element - create paragraph if it has text
      const spanText = element.textContent?.trim();
      if (spanText) {
        paragraphs.push(createParagraph(element));
      }
      break;
      
    default:
      // Unknown block element - try to extract text
      const hasBlockChildren = Array.from(element.children).some(child =>
        isBlockElement(child as HTMLElement)
      );
      
      if (hasBlockChildren) {
        // Has block children - recurse
        Array.from(element.childNodes).forEach(child => {
          paragraphs.push(...convertNodeToParagraphs(child, options));
        });
      } else {
        // Treat as inline/text
        const text = element.textContent?.trim();
        if (text) {
          paragraphs.push(createParagraph(element));
        }
      }
  }
  
  return paragraphs;
}

// ============================================================================
// ELEMENT CREATORS
// ============================================================================

/**
 * Create a heading paragraph
 */
function createHeading(element: HTMLElement, level: HeadingLevel): Paragraph {
  const runs = processInlineNodes(element);
  
  return new Paragraph({
    heading: level,
    children: runs,
    spacing: {
      before: convertInchesToTwip(0.15),
      after: convertInchesToTwip(0.1),
    },
  });
}

/**
 * Create a regular paragraph
 */
function createParagraph(element: HTMLElement): Paragraph | null {
  const runs = processInlineNodes(element);
  
  if (runs.length === 0) {
    return null;
  }
  
  return new Paragraph({
    children: runs,
    spacing: {
      after: convertInchesToTwip(0.08),
    },
  });
}

/**
 * Convert a list (UL or OL) to paragraphs
 */
function convertList(
  listElement: HTMLElement,
  type: 'bullet' | 'number',
  level: number
): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const items = Array.from(listElement.children).filter(
    child => child.tagName.toLowerCase() === 'li'
  );
  
  items.forEach((li) => {
    const runs = processInlineNodes(li as HTMLElement);
    
    if (runs.length > 0) {
      paragraphs.push(
        new Paragraph({
          children: runs,
          bullet: type === 'bullet' ? { level } : undefined,
          numbering: type === 'number' ? { reference: 'default-numbering', level } : undefined,
          spacing: {
            after: convertInchesToTwip(0.05),
          },
        })
      );
    }
    
    // Handle nested lists
    const nestedLists = Array.from(li.children).filter(child =>
      child.tagName.toLowerCase() === 'ul' || child.tagName.toLowerCase() === 'ol'
    );
    
    nestedLists.forEach(nestedList => {
      const nestedType = nestedList.tagName.toLowerCase() === 'ul' ? 'bullet' : 'number';
      paragraphs.push(...convertList(nestedList as HTMLElement, nestedType, level + 1));
    });
  });
  
  return paragraphs;
}

// ============================================================================
// INLINE TEXT PROCESSING
// ============================================================================

/**
 * Process inline nodes (text, strong, em, br, etc.) into TextRuns
 */
function processInlineNodes(element: HTMLElement): TextRun[] {
  const runs: TextRun[] = [];
  
  function processNode(node: Node, formatting: {
    bold?: boolean;
    italic?: boolean;
  } = {}): void {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      if (text) {
        runs.push(
          new TextRun({
            text: text,
            bold: formatting.bold,
            italics: formatting.italic,
          })
        );
      }
      return;
    }
    
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    
    const el = node as HTMLElement;
    const tagName = el.tagName.toLowerCase();
    
    switch (tagName) {
      case 'strong':
      case 'b':
        Array.from(el.childNodes).forEach(child =>
          processNode(child, { ...formatting, bold: true })
        );
        break;
        
      case 'em':
      case 'i':
        Array.from(el.childNodes).forEach(child =>
          processNode(child, { ...formatting, italic: true })
        );
        break;
        
      case 'br':
        runs.push(new TextRun({ text: '', break: 1 }));
        break;
        
      case 'span':
      case 'a':
      case 'code':
        // Just extract text content, preserve formatting
        Array.from(el.childNodes).forEach(child =>
          processNode(child, formatting)
        );
        break;
        
      default:
        // For unknown inline elements, try to extract text
        if (!isBlockElement(el)) {
          Array.from(el.childNodes).forEach(child =>
            processNode(child, formatting)
          );
        }
    }
  }
  
  Array.from(element.childNodes).forEach(child => processNode(child));
  
  return runs;
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Check if element should be skipped
 */
function shouldSkipElement(element: HTMLElement): boolean {
  const tagName = element.tagName.toLowerCase();
  
  // Skip scripts, styles, hidden elements
  if (tagName === 'script' || tagName === 'style') {
    return true;
  }
  
  // Skip elements with display: none or visibility: hidden
  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden') {
    return true;
  }
  
  return false;
}

/**
 * Check if element is a block-level element
 */
function isBlockElement(element: HTMLElement): boolean {
  const blockTags = [
    'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'blockquote', 'pre', 'hr',
    'table', 'thead', 'tbody', 'tr', 'td', 'th',
    'section', 'article', 'aside', 'header', 'footer', 'nav',
  ];
  
  return blockTags.includes(element.tagName.toLowerCase());
}
