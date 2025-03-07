// Service data for modals
const serviceData = {
    'gnosis': {
        title: 'Gnosis',
        description: `<p>Our Gnosis platform provides interactive document analysis with AI-powered insights for policy professionals and researchers.</p>
        <p>Key features:</p>
        <ul>
            <li>Real-time analysis of complex policy documents and research papers</li>
            <li>AI-powered summarization and key point extraction</li>
            <li>Policy implications detection and analysis</li>
            <li>Interactive query interface to explore document contents</li>
            <li>Expert-in-the-loop refinement for highest accuracy</li>
        </ul>
        <p>Gnosis helps policy professionals, researchers, and organizations quickly understand and extract value from lengthy policy documents, technical papers, and regulatory frameworks.</p>`,
        link: 'gnosis.html'
    },
    'agents': {
        title: 'AI Agents',
        description: `<p>Our specialized AI agents provide tailored assistance for various aspects of policy analysis, ethics evaluation, and regulatory compliance.</p>
        <p>Available agents include:</p>
        <ul>
            <li>Policy Analyst: Analyzes and explains complex regulatory documents</li>
            <li>Research Assistant: Finds and synthesizes academic literature on AI ethics</li>
            <li>Ethics Advisor: Provides ethical assessments for AI implementation scenarios</li>
            <li>Data Scientist: Analyzes datasets for bias detection and mitigation</li>
            <li>Legal Expert: Guidance on AI regulations across jurisdictions</li>
            <li>Education Guide: Interactive learning about AI ethics and governance</li>
        </ul>
        <p>Our agents combine cutting-edge AI with domain expertise to deliver specialized insights and guidance for your AI governance needs.</p>`,
        link: 'agents.html'
    },
    'insights': {
        title: 'Policy Insights',
        description: `<p>Our Policy Insights provide industry analysis, trend reports, and expert commentary to help you understand the implications of AI policy developments.</p>
        <p>Our insights include:</p>
        <ul>
            <li>AI regulatory trend forecasting and analysis</li>
            <li>Sector-specific impact assessments for emerging AI regulations</li>
            <li>Expert commentary from policy specialists and ethicists</li>
            <li>Strategic recommendations for AI governance compliance</li>
            <li>Regular briefings on global AI policy developments</li>
        </ul>
        <p>Policy Insights help organizations anticipate regulatory changes in the AI landscape, allowing for proactive governance rather than reactive compliance.</p>`,
        link: 'insights.html'
    },
    'data': {
        title: 'Policy Data',
        description: `<p>Access curated datasets for AI governance and policy analysis to inform your research and compliance strategies.</p>
        <p>Our data offerings include:</p>
        <ul>
            <li>Comprehensive collections of AI regulations across jurisdictions</li>
            <li>Annotated policy documents with implementation guidance</li>
            <li>Benchmark datasets for fairness and bias testing</li>
            <li>Historical tracking of AI policy developments</li>
            <li>Structured data on ethical frameworks and standards</li>
        </ul>
        <p>Our data services enable organizations to perform evidence-based analysis and develop robust AI governance strategies grounded in comprehensive information.</p>`,
        link: 'data.html'
    },
    'publications': {
        title: 'Publications',
        description: `<p>Access our research publications, policy papers, and technical reports on AI ethics, governance, and regulatory compliance.</p>
        <p>Our publication types include:</p>
        <ul>
            <li>Policy Analysis Reports: Comprehensive analysis of AI governance frameworks</li>
            <li>Technical White Papers: Emerging techniques for fairness assessment in ML models</li>
            <li>Research Papers: Ethical considerations for LLMs in public services</li>
            <li>Policy Briefs: Key recommendations for AI regulation in specific industries</li>
            <li>Case Studies: Implementation challenges of ethical AI principles</li>
            <li>Annual Reports: State of AI policy and governance trends</li>
        </ul>
        <p>Our publications provide authoritative insights from experts at the intersection of technology policy, ethics, and governance.</p>`,
        link: 'publications.html'
    },
    'consult': {
        title: 'Consultation Services',
        description: `<p>Get personalized expert guidance on AI policy, ethics, and governance tailored to your organization's specific needs.</p>
        <p>Our consultation services include:</p>
        <ul>
            <li>AI Ethics Audits: Comprehensive assessment of AI systems for ethical considerations</li>
            <li>Regulatory Compliance Reviews: Ensuring AI implementations meet current and emerging regulations</li>
            <li>Policy Development Workshops: Collaborative sessions to develop internal AI governance policies</li>
            <li>Executive Briefings: Strategic insights for leadership on AI policy implications</li>
            <li>Risk Assessment & Mitigation: Identifying and addressing AI implementation risks</li>
            <li>Customized Training Programs: Building organizational capacity for ethical AI governance</li>
        </ul>
        <p>Our consultation services connect you with leading experts in AI policy, ethics, and governance to address your specific challenges and opportunities.</p>`,
        link: 'consult.html'
    }
};

document.addEventListener("DOMContentLoaded", function() {
    // Navigation functionality
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileNav = document.querySelector(".mobile-nav");
    
    // Toggle mobile menu on click
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener("click", function() {
            mobileMenuButton.classList.toggle("active");
            mobileNav.classList.toggle("active");
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener("click", function(e) {
        if (mobileMenuButton && !mobileMenuButton.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileMenuButton.classList.remove("active");
            mobileNav.classList.remove("active");
        }
    });
    
    // Close mobile menu when window resizes above mobile breakpoint
    window.addEventListener("resize", function() {
        if (mobileMenuButton && window.innerWidth > 768) {
            mobileMenuButton.classList.remove("active");
            mobileNav.classList.remove("active");
        }
    });
    
    // Modal functionality
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalButton = document.getElementById('modalButton');
    const closeModal = document.getElementById('closeModal');
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Open modal when a service card is clicked
    if (serviceCards.length > 0 && modal) {
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceId = card.getAttribute('data-service');
                const service = serviceData[serviceId];
                
                modalTitle.textContent = service.title;
                modalBody.innerHTML = service.description;
                modalButton.href = service.link;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
        
        // Close modal when the close button is clicked
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
        
        // Close modal when clicking outside the modal content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
        
        // Close modal when ESC key is pressed
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    }
    
    // Careers page role filtering
    const roleSearchInput = document.getElementById('roleSearch');
    if (roleSearchInput) {
        roleSearchInput.addEventListener('keyup', filterRoles);
    }

    // Check if we're on the consulting page by looking for specific elements
    if (document.querySelector('.contact-form') && document.getElementById('serviceModal')) {
        initConsultPage();
    }
});

// Function to filter roles on the careers page
function filterRoles() {
    const searchInput = document.getElementById('roleSearch').value.toLowerCase();
    const internshipRoles = document.getElementById('internshipRoles').getElementsByClassName('section-card');
    const fullTimeRoles = document.getElementById('fullTimeRoles').getElementsByClassName('section-card');
    
    filterSection(internshipRoles, searchInput);
    filterSection(fullTimeRoles, searchInput);
}

function filterSection(roles, searchInput) {
    for (let i = 0; i < roles.length; i++) {
        const roleText = roles[i].innerText.toLowerCase();
        if (roleText.includes(searchInput)) {
            roles[i].style.display = '';
        } else {
            roles[i].style.display = 'none';
        }
    }
}

// Function to initialize the consult page functionality
function initConsultPage() {
    // Service details content for consultation modals
    const consultServiceData = {
        policy: {
            title: "Policy Analysis",
            content: `<p>Comprehensive evaluation of regulatory frameworks and policy implications.</p>
            <ul>
                <li>Regulatory impact assessments</li>
                <li>Policy trend forecasting</li>
                <li>Compliance strategy</li>
            </ul>`
        },
        strategy: {
            title: "Strategic Planning",
            content: `<p>Roadmaps for sustainable growth through market intelligence and analysis.</p>
            <ul>
                <li>Market analysis</li>
                <li>Vision refinement</li>
                <li>Objective setting</li>
            </ul>`
        },
        risk: {
            title: "Risk Assessment",
            content: `<p>Advanced methodologies to identify and mitigate potential business threats.</p>
            <ul>
                <li>Risk identification</li>
                <li>AI-powered analysis</li>
                <li>Mitigation strategies</li>
            </ul>`
        },
        custom: {
            title: "Custom Solutions",
            content: `<p>Tailored consulting engagements designed specifically for your organization's needs.</p>
            <ul>
                <li>Diagnostic assessment</li>
                <li>Collaborative solution development</li>
                <li>Implementation support</li>
            </ul>`
        }
    };

    // Form validation for the consultation request form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically handle the form submission
            alert('Thank you for your interest. Our team will contact you shortly.');
            
            // Reset form after submission
            this.reset();
        });
    }

    // Modal functionality for Learn More buttons on the consult page
    const modal = document.getElementById("serviceModal");
    const modalTitle = document.querySelector(".modal-title");
    const modalBody = document.querySelector(".modal-body");
    const closeBtn = document.querySelector(".close-modal");
    const contactBtn = document.getElementById("contactBtn");
    
    // Open modal with appropriate content when Learn More is clicked
    document.querySelectorAll('.section-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const service = this.getAttribute('data-service');
            const details = consultServiceData[service];
            
            if (details) {
                modalTitle.textContent = details.title;
                modalBody.innerHTML = details.content;
                modal.style.display = "block";
            } else if (service === "custom") {
                // For "Inquire" button, scroll to contact form
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Contact button in modal scrolls to contact form
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            modal.style.display = "none";
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            
            // Optional: pre-select the service in the dropdown
            const serviceSelect = document.getElementById('service');
            const currentService = modalTitle.textContent;
            
            for(let option of serviceSelect.options) {
                if(option.text.includes(currentService)) {
                    serviceSelect.value = option.value;
                    break;
                }
            }
        });
    }
}

// Filter for Publications
// Initialize filter dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButton = document.getElementById('filterButton');
    const filterDropdown = document.getElementById('filterDropdown');
    const filterOptions = document.querySelectorAll('.filter-option');
    const publicationSearch = document.getElementById('publicationSearch');
    const publicationCards = document.querySelectorAll('.publication-card');
    
    // Toggle filter dropdown
    filterButton.addEventListener('click', function() {
        filterDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!filterButton.contains(e.target) && !filterDropdown.contains(e.target)) {
            filterDropdown.classList.remove('show');
        }
    });
    
    // Filter publications by category
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Update active state
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Get selected filter
            const filter = this.getAttribute('data-filter');
            
            // Filter publications
            publicationCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Close dropdown
            filterDropdown.classList.remove('show');
        });
    });
    
    // Search publications
    publicationSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        publicationCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.getAttribute('data-category').toLowerCase();
            
            // Check if any active category filter
            const activeFilter = document.querySelector('.filter-option.active').getAttribute('data-filter');
            
            if ((title.includes(searchTerm) || description.includes(searchTerm)) && 
                (activeFilter === 'all' || category === activeFilter)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});