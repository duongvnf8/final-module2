function Scroll(contentHtml = '') {
  return `
    <div class="flex gap-6 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar">
      ${contentHtml}
    </div>
  `;
}

export default Scroll;
