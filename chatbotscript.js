 let isOpen = false;
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const typingIndicator = document.getElementById('typingIndicator');

        // Portfolio data - customize this with actual portfolio information
        const portfolioData = {
            projects: [
                "E-commerce Platform with React & Node.js",
                "Mobile App Development with React Native",
                "Machine Learning Data Analysis Dashboard",
                "Real-time Chat Application with Socket.io",
                "Portfolio Website with Modern UI/UX"
            ],
            skills: [
                "JavaScript", "React", "Node.js", "Python", "MongoDB", 
                "PostgreSQL", "AWS", "Docker", "Git", "UI/UX Design"
            ],
            experience: "3+ years of full-stack development with expertise in modern web technologies",
            contact: "Available for freelance projects and full-time opportunities",
            education: "Computer Science degree with focus on software engineering"
        };

        function toggleChat() {
            const widget = document.getElementById('chatWidget');
            const toggle = document.querySelector('.chatbot-toggle');
            
            isOpen = !isOpen;
            widget.classList.toggle('active', isOpen);
            toggle.classList.toggle('active', isOpen);
            
            if (isOpen) {
                chatInput.focus();
            }
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;

            addMessage(message, 'user');
            chatInput.value = '';
            
            // Show typing indicator
            showTyping();
            
            // Simulate AI response delay
            setTimeout(() => {
                hideTyping();
                const response = generateResponse(message);
                addMessage(response, 'bot');
            }, 1000 + Math.random() * 1000);
        }

        function sendSuggestion(suggestion) {
            chatInput.value = suggestion;
            sendMessage();
        }

        function addMessage(content, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.innerHTML = content;
            
            messageDiv.appendChild(contentDiv);
            chatMessages.appendChild(messageDiv);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showTyping() {
            typingIndicator.classList.add('active');
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function hideTyping() {
            typingIndicator.classList.remove('active');
        }

        function generateResponse(message) {
            const msg = message.toLowerCase();
            
            if (msg.includes('project') || msg.includes('work') || msg.includes('built')) {
                return `🚀 Here are some recent projects:<br><br>
                    • <strong>E-commerce Platform</strong> - Full-stack React & Node.js application<br>
                    • <strong>Mobile App</strong> - React Native with real-time features<br>
                    • <strong>ML Dashboard</strong> - Python-based data visualization tool<br><br>
                    Would you like to know more about any specific project?`;
            }
            
            if (msg.includes('skill') || msg.includes('technology') || msg.includes('tech')) {
                return `💻 <strong>Technical Skills:</strong><br><br>
                    <strong>Frontend:</strong> React, JavaScript, HTML5, CSS3<br>
                    <strong>Backend:</strong> Node.js, Python, Express<br>
                    <strong>Database:</strong> MongoDB, PostgreSQL<br>
                    <strong>Cloud:</strong> AWS, Docker, Git<br><br>
                    I'm always learning new technologies!`;
            }
            
            if (msg.includes('experience') || msg.includes('background')) {
                return `👨‍💻 I have <strong>3+ years</strong> of full-stack development experience, specializing in:<br><br>
                    • Modern web applications<br>
                    • API development & integration<br>
                    • Database design & optimization<br>
                    • Cloud deployment & DevOps<br><br>
                    I love creating efficient, scalable solutions!`;
            }
            
            if (msg.includes('contact') || msg.includes('hire') || msg.includes('work together')) {
                return `📬 <strong>Let's connect!</strong><br><br>
                    I'm available for:<br>
                    • Freelance projects<br>
                    • Full-time opportunities<br>
                    • Consulting & mentoring<br><br>
                    Feel free to reach out through the contact form on this portfolio!`;
            }
            
            if (msg.includes('about') || msg.includes('who')) {
                return `👋 I'm a passionate full-stack developer who loves creating innovative web solutions. 
                    I combine technical expertise with creative problem-solving to build applications that make a difference.<br><br>
                    What specific aspect would you like to know more about?`;
            }
            
            // Default response
            return `Thanks for your question! I can help you learn about:<br><br>
                🚀 Recent projects and portfolio work<br>
                💻 Technical skills and technologies<br>
                👨‍💻 Professional experience<br>
                📬 Contact information<br><br>
                What interests you most?`;
        }

        // Initialize chat
        document.addEventListener('DOMContentLoaded', function() {
            // Auto-focus input when chat opens
            chatInput.addEventListener('focus', function() {
                this.parentElement.style.borderColor = '#667eea';
            });
            
            chatInput.addEventListener('blur', function() {
                this.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            });
        });

        document.querySelectorAll('.star-rating').forEach(rating => {
            const stars = rating.querySelectorAll('.star');
            let currentRating = 0;

            stars.forEach((star, index) => {
                star.addEventListener('mouseenter', () => {
                    highlightStars(stars, index + 1);
                });

                star.addEventListener('click', () => {
                    currentRating = index + 1;
                    setRating(stars, currentRating);
                    rating.setAttribute('data-value', currentRating);
                });
            });

            rating.addEventListener('mouseleave', () => {
                setRating(stars, currentRating);
            });
        });

        function highlightStars(stars, count) {
            stars.forEach((star, index) => {
                star.classList.toggle('active', index < count);
            });
        }

        function setRating(stars, count) {
            stars.forEach((star, index) => {
                star.classList.toggle('active', index < count);
            });
        }

        // Form validation and submission
        document.getElementById('feedbackForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });

        function validateForm() {
            let isValid = true;
            const requiredFields = ['name', 'email', 'category', 'feedback'];
            
            requiredFields.forEach(fieldName => {
                const field = document.getElementById(fieldName);
                const formGroup = field.closest('.form-group');
                
                if (!field.value.trim()) {
                    formGroup.classList.add('error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('error');
                }
            });

            // Email validation
            const emailField = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailField.value && !emailRegex.test(emailField.value)) {
                emailField.closest('.form-group').classList.add('error');
                isValid = false;
            }

            return isValid;
        }

        function submitForm() {
            const submitBtn = document.querySelector('.btn-primary');
            const successMessage = document.getElementById('successMessage');
            
            // Add loading state
            submitBtn.classList.add('loading');
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                successMessage.classList.add('show');
                document.getElementById('feedbackForm').style.display = 'none';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }, 2000);
        }

        function resetForm() {
            document.getElementById('feedbackForm').reset();
            
            // Clear error states
            document.querySelectorAll('.form-group.error').forEach(group => {
                group.classList.remove('error');
            });
            
            // Reset star ratings
            document.querySelectorAll('.star-rating').forEach(rating => {
                rating.querySelectorAll('.star').forEach(star => {
                    star.classList.remove('active');
                });
                rating.setAttribute('data-value', '0');
            });
        }

        // Real-time validation
        document.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(field => {
            field.addEventListener('blur', function() {
                const formGroup = this.closest('.form-group');
                if (this.hasAttribute('required') && !this.value.trim()) {
                    formGroup.classList.add('error');
                } else {
                    formGroup.classList.remove('error');
                }
            });

            field.addEventListener('input', function() {
                const formGroup = this.closest('.form-group');
                if (this.value.trim()) {
                    formGroup.classList.remove('error');
                }
            });
        });

          window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.getElementById('progressBar').style.width = scrolled + '%';
        });


        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href').substring(1);
                    const target = document.getElementById(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        });