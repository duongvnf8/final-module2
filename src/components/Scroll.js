function Scroll(itemsHtml) {
  return `
    <div class="flex gap-6 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar">
      ${itemsHtml}
    </div>
  `;
}

export default Scroll;
