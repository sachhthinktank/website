document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }
    
    // Sidebar toggle on mobile
    const sidebarToggleBtn = document.createElement('button');
    sidebarToggleBtn.classList.add('sidebar-toggle');
    sidebarToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.chat-header').prepend(sidebarToggleBtn);
    
    const sidebar = document.querySelector('.sidebar');
    sidebarToggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking on any clickable element inside it on mobile
    const sidebarClickableElements = sidebar.querySelectorAll('.chat-history li, .policy-domains li, .new-chat-button, .settings-button, .help-button');
    
    sidebarClickableElements.forEach(element => {
        element.addEventListener('click', function() {
            if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // SIMPLIFIED CONTEXT PANEL TOGGLE USING A FLAG
    const contextPanel = document.querySelector('.context-panel');
    const closeContextButton = document.querySelector('.close-context');
    const chatMain = document.querySelector('.chat-main');

    // Create (or get) the toggle button with an arrow icon.
    let contextToggleBtn = document.querySelector('.context-toggle');
    if (!contextToggleBtn) {
        contextToggleBtn = document.createElement('button');
        contextToggleBtn.classList.add('context-toggle');
        document.querySelector('.chat-actions').prepend(contextToggleBtn);
    }

    // Create a button to bring back the context panel when it is closed
    let bringBackContextBtn = document.querySelector('.bring-back-context');
    if (!bringBackContextBtn) {
        bringBackContextBtn = document.createElement('button');
        bringBackContextBtn.classList.add('bring-back-context');
        bringBackContextBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
        document.body.appendChild(bringBackContextBtn);
        bringBackContextBtn.style.display = 'none'; // Hide initially
    }

    // Use a flag to track panel state (for small screens only)
    let panelOpen = true; // Assume panel is open by default on larger screens

    // For screens ≤1200px, start with panel closed.
    if (window.innerWidth <= 1200) {
        panelOpen = false;
        contextPanel.style.transform = 'translateX(100%)';
        chatMain.classList.add('context-hidden');
        contextToggleBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
        bringBackContextBtn.style.display = 'block'; // Show bring back button
    } else {
        contextToggleBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
    }

    // Toggle function to update state
    function toggleContextPanel(open) {
        if (open) {
            contextPanel.style.transform = 'translateX(0)';
            chatMain.classList.remove('context-hidden');
            chatMain.classList.remove('context-full'); // Remove the class when opening
            contextToggleBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
            bringBackContextBtn.style.display = 'none'; // Hide bring back button
        } else {
            contextPanel.style.transform = 'translateX(100%)';
            chatMain.classList.add('context-hidden');
            chatMain.classList.add('context-full'); // Add the class when closing
            contextToggleBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
            bringBackContextBtn.style.display = 'block'; // Show bring back button
        }
        panelOpen = open;
    }

    // Toggle button event
    contextToggleBtn.addEventListener('click', function() {
        toggleContextPanel(!panelOpen);
    });

    // Close button event uses the same toggle function (set to closed)
    closeContextButton.addEventListener('click', function() {
        toggleContextPanel(false);
    });

    // Bring back button event uses the same toggle function (set to open)
    bringBackContextBtn.addEventListener('click', function() {
        toggleContextPanel(true);
    });

    // Auto-resize textarea
    const textarea = document.querySelector('.chat-input textarea');
    
    textarea.addEventListener('input', function() {
        this.style.height = '45px';
        this.style.height = (this.scrollHeight > 150 ? 150 : this.scrollHeight) + 'px';
    });
    
    // Send message functionality
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.querySelector('.chat-messages');
    
    sendButton.addEventListener('click', sendMessage);
    textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = textarea.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage('user', message);
        
        // Clear input
        textarea.value = '';
        textarea.style.height = '45px';
        
        // Simulate AI response after a short delay
        setTimeout(simulateResponse, 1000);
        
        // Scroll to bottom
        scrollToBottom();
    }
    
    function addMessage(sender, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
        
        const avatar = document.createElement('div');
        avatar.classList.add('message-avatar');
        avatar.innerHTML = `<i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>`;
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble');
        messageBubble.innerHTML = `<p>${content}</p>`;
        
        const messageInfo = document.createElement('div');
        messageInfo.classList.add('message-info');
        messageInfo.innerHTML = '<span class="timestamp">Just now</span>';
        
        messageContent.appendChild(messageBubble);
        messageContent.appendChild(messageInfo);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
    }
    
    function simulateResponse() {
        // Example responses for simulation
        const responses = [
            "I've analyzed the policy implications and found three key areas that need attention...",
            "Based on regulatory frameworks across jurisdictions, the most effective approach would be...",
            "The comparative analysis shows significant divergence in policy implementation between...",
            "Looking at historical data and policy outcomes, I recommend considering these factors..."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage('ai', randomResponse);
        
        // Scroll to bottom
        scrollToBottom();
    }
    
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Handle policy domain selection
    const policyDomains = document.querySelectorAll('.policy-domains li');
    
    policyDomains.forEach(domain => {
        domain.addEventListener('click', function() {
            const domainName = this.textContent.trim();
            textarea.value = `I need policy analysis on ${domainName} issues.`;
            textarea.focus();
            textarea.dispatchEvent(new Event('input'));
        });
    });
    
    // Handle chat history selection
    const chatHistoryItems = document.querySelectorAll('.chat-history li');
    
    chatHistoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real app, this would load the selected chat history
            const chatName = this.textContent.trim();
            alert(`Loading chat: ${chatName}`);
        });
    });
    
    // Clear chat functionality
    const clearChatButton = document.querySelector('.clear-chat');
    
    clearChatButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear this chat?')) {
            // Remove all messages except the first (welcome) message
            const messages = document.querySelectorAll('.chat-messages .message');
            for (let i = 1; i < messages.length; i++) {
                messages[i].remove();
            }
        }
    });
    
    // Export chat functionality
    const exportChatButton = document.querySelector('.export-chat');
    
    exportChatButton.addEventListener('click', function() {
        // In a real app, this would generate a PDF or text file
        alert('Exporting chat transcript...');
    });
    
    // Policy tools buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.policy-tools button')) {
            const buttonText = e.target.closest('button').textContent.trim();
            alert(`Feature: ${buttonText}`);
        }
    });
    
    // New chat button
    const newChatButton = document.querySelector('.new-chat-button');
    
    newChatButton.addEventListener('click', function() {
        // Clear all messages except the first (welcome) message
        const messages = document.querySelectorAll('.chat-messages .message');
        for (let i = 1; i < messages.length; i++) {
            messages[i].remove();
        }
        
        // Clear textarea
        textarea.value = '';
        textarea.style.height = '45px';
    });
    
    // Attach document button
    const attachButton = document.querySelector('.attach-button');
    
    attachButton.addEventListener('click', function() {
        // In a real app, this would open a file picker
        alert('Attach a policy document or data file');
    });
    
    // Template button
    const templateButton = document.querySelector('.template-button');
    
    templateButton.addEventListener('click', function() {
        const templates = [
            "Please analyze the economic impact of [policy].",
            "Compare the regulatory frameworks for [topic] in [region1] versus [region2].",
            "Summarize the key provisions of [legislation].",
            "What are the policy implications of [event/trend] for [sector]?",
            "Draft a policy brief on [issue] addressing [specific aspects]."
        ];
        
        // Create a simple dropdown for templates
        const dropdown = document.createElement('div');
        dropdown.classList.add('template-dropdown');
        
        templates.forEach(template => {
            const item = document.createElement('div');
            item.classList.add('template-item');
            item.textContent = template;
            item.addEventListener('click', function() {
                textarea.value = this.textContent;
                textarea.focus();
                textarea.dispatchEvent(new Event('input'));
                dropdown.remove();
            });
            dropdown.appendChild(item);
        });
        
        // Position and show the dropdown
        document.body.appendChild(dropdown);
        const rect = templateButton.getBoundingClientRect();
        dropdown.style.top = (rect.bottom + 5) + 'px';
        dropdown.style.left = rect.left + 'px';
        
        // Close dropdown when clicking outside
        function closeDropdown(e) {
            if (!dropdown.contains(e.target) && e.target !== templateButton) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        }
        
        setTimeout(() => {
            document.addEventListener('click', closeDropdown);
        }, 0);
    });
    
    // Update timestamps periodically
    function updateTimestamps() {
        const timestamps = document.querySelectorAll('.timestamp');
        timestamps.forEach(timestamp => {
            if (timestamp.textContent === 'Just now') {
                // Keep as is
            } else {
                // In a real app, this would calculate the actual time elapsed
                const minutes = parseInt(timestamp.dataset.minutes || 0) + 1;
                timestamp.dataset.minutes = minutes;
                timestamp.textContent = minutes < 60 
                    ? `${minutes}m ago` 
                    : `${Math.floor(minutes/60)}h ${minutes%60}m ago`;
            }
        });
    }
    
    setInterval(updateTimestamps, 60000); // Update every minute
    
    // Add CSS for newly created elements
    const style = document.createElement('style');
    style.textContent = `
        .sidebar-toggle, .context-toggle {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: #666;
            padding: 5px;
            border-radius: 4px;
            margin-right: 10px;
        }
        
        .sidebar-toggle:hover, .context-toggle:hover {
            color: #333;
            background-color: #f0f0f0;
        }
        
        @media (min-width: 769px) {
            .sidebar-toggle {
                display: none;
            }
        }
        
        @media (min-width: 1201px) {
            .context-toggle {
                display: none;
            }
        }
        
        .context-full {
            width: 100%;
        }

        .template-dropdown {
            position: absolute;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 10px 0;
            min-width: 250px;
            z-index: 100;
        }
        
        .template-item {
            padding: 8px 15px;
            cursor: pointer;
            transition: background-color 0.2s;
            font-size: 0.9rem;
        }
        
        .template-item:hover {
            background-color: #f5f5f5;
        }
    `;
    document.head.appendChild(style);
});
