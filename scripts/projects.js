document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('project-modal');
  const modalTitle = modal.querySelector('#modal-title');
  const modalDesc = modal.querySelector('#modal-desc');
  const modalTags = modal.querySelector('#modal-tags');
  const modalLinks = modal.querySelector('#modal-links');
  const modalContent = modal.querySelector('.modal-content');
  const closeBtn = modal.querySelector('.modal-close');
  const screenshotsWrapper = modal.querySelector('.modal-screenshots-wrapper');

  const projects = {
    1: {
      title: 'Urban Fitness +',
      description: `This full-stack university project involved a team of seven where we followed the complete software engineering cycle: planning, development, and testing. I led the development of the real-time gym locator feature, working closely with a teammate on the frontend. Additionally, I contributed to the clubs feature, allowing users to create and join clubs, and participate in fitness challenges. We used feature branching in Git for collaborative development and implemented thorough Pytest testing to maintain code quality.`,
      screenshots: [
        'assets/projects/ufp/ufp_screenshot_1.png',
        'assets/projects/ufp/ufp_screenshot_2.png',
        'assets/projects/ufp/ufp_screenshot_3.png',
        'assets/projects/ufp/ufp_screenshot_4.png'
      ],
      tags: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Leaflet.js', 'OpenStreetMap API'],
      links: []
    },
    2: {
      title: 'celer.ai',
      description: 'celer.ai is a full-stack brand and interface design for an early-stage AI infrastructure startup. The project began from scratch — no logo, no content, no visual direction — and evolved into a fully realized identity and responsive landing page. The goal was to create a minimalist, developer-friendly brand that feels credible, green, and forward-looking. I designed the visual identity (logo, color system, typography), built the front-end architecture using Next.js, Tailwind CSS, and TypeScript, and designed the full UI/UX for a future dashboard app. The landing page includes a waitlist form, responsive layout, and SEO-friendly structure. I also explored dashboard wireframes and interface flows for future implementation, focusing on usability, clean UI, and efficient user journeys. The project is built to scale into a real SaaS product and serve as a visual proof-of-concept for investors, developers, and early adopters.',
      screenshots: ['assets/projects/celer/celer_screenshot_1.png', 'assets/projects/celer/celer_logo_2.png'],
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
      links: []
    },
  };

  function openModal(projectId) {
    const data = projects[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;

    // Clear old screenshots and add new ones
    screenshotsWrapper.innerHTML = '';
    if (data.screenshots && data.screenshots.length) {
      data.screenshots.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${data.title} screenshot`;
        screenshotsWrapper.appendChild(img);
      });
    }

    modalTags.innerHTML = '';
    data.tags.forEach(tag => {
      const span = document.createElement('span');
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    modalLinks.innerHTML = '';
    data.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      modalLinks.appendChild(a);
    });

    modal.setAttribute('aria-hidden', 'false');
    modalContent.classList.remove('animate__fadeOutDown');
    modalContent.classList.add('animate__fadeInDown');
    closeBtn.focus();
  }

  function closeModal() {
    modalContent.classList.remove('animate__fadeInDown');
    modalContent.classList.add('animate__fadeOutDown');
    modalContent.addEventListener('animationend', () => {
      modal.setAttribute('aria-hidden', 'true');
    }, { once: true });
  }

  document.querySelectorAll('.project-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      openModal(tile.getAttribute('data-project'));
    });
    tile.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        openModal(tile.getAttribute('data-project'));
        e.preventDefault();
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });
});