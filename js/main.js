// Add smooth scroll behavior for the join button
document.querySelector('.join-button').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: document.querySelector('.categories').offsetTop,
        behavior: 'smooth'
    });
});

// Add hover effect for category cards
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}); 