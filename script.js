// Tab functionality for app features
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - initializing tabs and FAQs");
    
    // Initialize tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    console.log(`Found ${tabButtons.length} tab buttons and ${tabContents.length} tab contents`);
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                console.log(`Tab clicked: ${tabId}`);
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                
                // Activate the corresponding content
                const tabContent = document.getElementById(tabId);
                
                if (tabContent) {
                    tabContent.classList.add('active');
                    console.log(`Activated tab content: ${tabId}`);
                } else {
                    console.error(`Tab content with ID ${tabId} not found`);
                }
            });
        });
        
        // Ensure the first tab is active by default
        if (!document.querySelector('.tab-content.active')) {
            tabButtons[0].click();
        }
    }
    
    // FAQ Functionality
    function initializeFAQs() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length === 0) {
            console.warn('No FAQ items found');
            return;
        }

        console.log(`Initializing ${faqItems.length} FAQ items`);

        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (!question || !answer) {
                console.warn(`FAQ item ${index + 1} is missing question or answer elements`);
                return;
            }

            // Add click handler
            question.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Log the click
                console.log(`FAQ ${index + 1} clicked`);

                // Close other FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        if (otherQuestion) {
                            otherQuestion.classList.remove('active');
                            otherQuestion.setAttribute('aria-expanded', 'false');
                        }
                    }
                });

                // Toggle current FAQ
                const isExpanded = !question.classList.contains('active');
                question.classList.toggle('active');
                question.setAttribute('aria-expanded', isExpanded);

                // Log the state
                console.log(`FAQ ${index + 1} ${isExpanded ? 'expanded' : 'collapsed'}`);
            });

            // Add keyboard handler
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });

            // Set initial state
            question.setAttribute('aria-expanded', 'false');
            answer.setAttribute('role', 'region');
            answer.setAttribute('aria-labelledby', question.id || `faq-q-${index + 1}`);
            
            // If question doesn't have an ID, add one
            if (!question.id) {
                question.id = `faq-q-${index + 1}`;
            }
        });

        // Add global click handler to close FAQs when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.faq-item')) {
                faqItems.forEach(item => {
                    const question = item.querySelector('.faq-question');
                    if (question) {
                        question.classList.remove('active');
                        question.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        });
    }

    // Initialize FAQs
    initializeFAQs();
    
    // Footer accordion for mobile view
    const footerButtons = document.querySelectorAll('.fooComBtn, .fooComBtn02');
    
    console.log(`Found ${footerButtons.length} footer accordion buttons`);
    
    if (footerButtons.length > 0) {
        footerButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('data-id');
                console.log(`Footer accordion clicked: ${targetId}`);
                
                const targetElement = document.getElementById(targetId);
                
                // Toggle display
                if (targetElement) {
                    const isVisible = targetElement.style.display === 'block';
                    
                    // Hide all expanded lists first
                    const allLists = document.querySelectorAll('.expanedList, .expanedListop');
                    allLists.forEach(list => {
                        list.style.display = 'none';
                    });
                    
                    // Toggle current element
                    targetElement.style.display = isVisible ? 'none' : 'block';
                    
                    // Update arrow icons
                    const allArrows = document.querySelectorAll('.arrowlist');
                    allArrows.forEach(arrow => {
                        arrow.classList.remove('fa-angle-down');
                        arrow.classList.add('fa-angle-right');
                    });
                    
                    if (!isVisible) {
                        const arrow = this.querySelector('.arrowlist');
                        if (arrow) {
                            arrow.classList.remove('fa-angle-right');
                            arrow.classList.add('fa-angle-down');
                        }
                    }
                } else {
                    console.error(`Target element with ID ${targetId} not found`);
                }
            });
        });
    }
}); 