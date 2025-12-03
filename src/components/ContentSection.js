function ContentSection(title = '', content = '') {
  if (!content) return '';

  return `
    <section class="mt-8">
      <h2 class="text-[24px] text-white font-bold mb-4">
        ${title}
      </h2>
      ${content}
    </section>
  `;
}

export default ContentSection;
