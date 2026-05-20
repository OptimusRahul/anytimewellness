export function initBlog() {
    const filterButtons = document.querySelectorAll('.blog-filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const modal = document.getElementById('blog-modal');
    const modalClose = modal ? modal.querySelector('.modal-close') : null;
    const modalContent = modal ? modal.querySelector('.modal-content-wrapper') : null;

    if (filterButtons.length === 0 || blogCards.length === 0) return;

    // 1. Category Filtering
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    // Show with a smooth transition
                    card.style.display = 'flex';
                    // Trigger reflow for CSS animation
                    void card.offsetHeight;
                    card.classList.remove('hidden-filter');
                } else {
                    // Hide with a smooth transition
                    card.classList.add('hidden-filter');
                    // Delay setting display none until opacity fade finishes
                    setTimeout(() => {
                        if (card.classList.contains('hidden-filter')) {
                            card.style.display = 'none';
                        }
                    }, 400); // matches the CSS transition length
                }
            });
        });
    });

    // 2. Interactive Modal Reading Overlay (Triggered by clicking anywhere on the blog card)
    blogCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // If the user clicks on a link or button that has its own logic (in case we add them), don't trigger the modal
            if (e.target.closest('a') && !e.target.closest('.read-blog-btn')) {
                return;
            }

            e.preventDefault();
            if (!modal) return;

            // Extract content from current card
            const title = card.querySelector('.blog-title')?.textContent || '';
            const categoryBadge = card.querySelector('.blog-badge')?.cloneNode(true);
            const date = card.querySelector('.blog-date')?.textContent || '';
            const readTime = card.querySelector('.blog-read-time')?.textContent || '';
            const fullContentHtml = card.querySelector('.blog-full-content')?.innerHTML || '';

            // Inject into modal elements
            const modalTitleEl = modal.querySelector('#modal-title');
            const modalCategoryContainer = modal.querySelector('#modal-category-container');
            const modalMetaEl = modal.querySelector('#modal-meta');
            const modalBodyEl = modal.querySelector('#modal-body');

            if (modalTitleEl) modalTitleEl.textContent = title;
            
            if (modalCategoryContainer && categoryBadge) {
                modalCategoryContainer.innerHTML = '';
                modalCategoryContainer.appendChild(categoryBadge);
            }

            if (modalMetaEl) {
                modalMetaEl.innerHTML = `<span>📅 ${date}</span> <span class="separator">•</span> <span>⚡ ${readTime}</span>`;
            }

            if (modalBodyEl) {
                modalBodyEl.innerHTML = fullContentHtml;
            }

            // Open modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // 3. Modal Close Logic
    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        // Close modal when clicking outside of the content container
        modal.addEventListener('click', (e) => {
            if (modalContent && !modalContent.contains(e.target)) {
                closeModal();
            }
        });
    }

    // Close on Escape key press
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
