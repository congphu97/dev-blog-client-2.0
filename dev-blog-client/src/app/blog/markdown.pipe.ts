import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked, RendererObject } from 'marked';
import hljs from 'highlight.js';

const alertConfig: Record<string, { title: string; icon: string; className: string }> = {
  NOTE: { title: 'Lưu ý', icon: 'ℹ️', className: 'markdown-alert-note' },
  TIP: { title: 'Mẹo hữu ích', icon: '💡', className: 'markdown-alert-tip' },
  IMPORTANT: { title: 'Quan trọng', icon: '💬', className: 'markdown-alert-important' },
  WARNING: { title: 'Cảnh báo', icon: '⚠️', className: 'markdown-alert-warning' },
  CAUTION: { title: 'Chú ý rủi ro', icon: '🛑', className: 'markdown-alert-caution' }
};

const customRenderer: RendererObject = {
  code({ text, lang }: { text: string; lang?: string }) {
    if (lang === 'mermaid') {
      return `<div class="mermaid-block-wrapper">
        <div class="mermaid-block-header">
          <span class="mermaid-tag">📊 Sơ đồ quy trình (Mermaid Diagram)</span>
        </div>
        <div class="mermaid-render-area">
          <pre class="mermaid">${text}</pre>
        </div>
      </div>`;
    }

    const validLang = lang && hljs.getLanguage(lang) ? lang : undefined;
    const highlighted = validLang
      ? hljs.highlight(text, { language: validLang }).value
      : (lang ? hljs.highlightAuto(text).value : text);
    const langDisplay = validLang || lang || 'code';

    return `<div class="gh-code-block">
      <div class="gh-code-header">
        <span class="gh-code-lang">${langDisplay}</span>
        <button type="button" class="gh-copy-btn" onclick="navigator.clipboard.writeText(this.closest('.gh-code-block').querySelector('code').innerText).then(() => { this.innerText = 'Đã chép! ✓'; setTimeout(() => this.innerText = 'Sao chép', 2000); })">
          📋 Sao chép
        </button>
      </div>
      <pre><code class="hljs ${validLang ? 'language-' + validLang : ''}">${highlighted}</code></pre>
    </div>`;
  },
  blockquote(token: any) {
    const firstToken = token.tokens && token.tokens[0];
    if (firstToken && firstToken.type === 'paragraph') {
      const text = firstToken.text || '';
      const match = text.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s*\n)?([\s\S]*)$/i);
      if (match) {
        const type = match[1].toUpperCase();
        const restText = match[2];
        const conf = alertConfig[type] || alertConfig['NOTE'];

        firstToken.text = restText;
        if (firstToken.tokens && firstToken.tokens.length > 0) {
          firstToken.tokens[0].text = firstToken.tokens[0].text.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, '');
        }

        const bodyHtml = (this as any).parser.parse(token.tokens);
        return `<div class="markdown-alert ${conf.className}">
          <p class="markdown-alert-title"><span class="alert-icon">${conf.icon}</span> ${conf.title}</p>
          <div class="markdown-alert-content">${bodyHtml}</div>
        </div>`;
      }
    }
    return `<blockquote>${(this as any).parser.parse(token.tokens)}</blockquote>`;
  }
};

marked.use({
  gfm: true,
  breaks: true,
  renderer: customRenderer
});

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined): SafeHtml {
    if (!value) return '';
    try {
      const html = marked.parse(value, { async: false }) as string;
      return this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (err) {
      console.error('Markdown parse error:', err);
      return value;
    }
  }
}
