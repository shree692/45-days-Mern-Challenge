
   
        const quoteText = document.getElementById('quote-text');
        const quoteAuthor = document.getElementById('quote-author');
        const newQuoteBtn = document.getElementById('new-quote-btn');
        const copyBtn = document.getElementById('copy-btn');
        const loadingElement = document.getElementById('loading');
        const errorElement = document.getElementById('error');
        const linkedinBtn = document.getElementById('linkedin-btn');
        
        let recentQuotes = [];
        const MAX_RECENT_QUOTES = 10;
        
        function showLoading() {
            loadingElement.style.display = 'block';
            errorElement.style.display = 'none';
            quoteText.style.opacity = '0.3';
            quoteAuthor.style.opacity = '0.3';
        }
        
        function hideLoading() {
            loadingElement.style.display = 'none';
            quoteText.style.opacity = '1';
            quoteAuthor.style.opacity = '1';
        }
        
        function showError() {
            loadingElement.style.display = 'none';
            errorElement.style.display = 'block';
            quoteText.style.opacity = '1';
            quoteAuthor.style.opacity = '1';
        }
        
        function getQuote() {
            showLoading();
            
            fetch('https://dummyjson.com/quotes/random')
                .then(response => {
                    if (!response.ok) throw new Error('Failed to fetch quote');
                    return response.json();
                })
                .then(data => {
                    if (recentQuotes.includes(data.id)) {
                        getQuote();
                        return;
                    }
                    
                    recentQuotes.push(data.id);
                    if (recentQuotes.length > MAX_RECENT_QUOTES) recentQuotes.shift();
                    
                    quoteText.textContent = `"${data.quote}"`;
                    quoteAuthor.textContent = `— ${data.author}`;
                    
                    quoteText.classList.add('fade-in');
                    quoteAuthor.classList.add('fade-in');
                    
                    setTimeout(() => {
                        quoteText.classList.remove('fade-in');
                        quoteAuthor.classList.remove('fade-in');
                    }, 1000);
                    
                    changeBackground();
                    hideLoading();
                })
                .catch(error => {
                    console.error('Error fetching quote:', error);
                    showError();
                });
        }
        
        function copyQuote() {
            const textToCopy = `${quoteText.textContent} ${quoteAuthor.textContent}`;
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    const originalText = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    setTimeout(() => { copyBtn.innerHTML = originalText; }, 2000);
                })
                .catch(err => console.error('Failed to copy: ', err));
        }
        
        function shareOnLinkedIn() {
            const quote = `"${quoteText.textContent}" ${quoteAuthor.textContent}`;
            const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href + "?quote=" + quote)}`;
            window.open(shareUrl, '_blank');
        }

        function changeBackground() {
            const images = [
                "https://source.unsplash.com/1600x900/?nature",
                "https://source.unsplash.com/1600x900/?inspiration",
                "https://source.unsplash.com/1600x900/?motivation"
            ];
            const randomImage = images[Math.floor(Math.random() * images.length)];
            document.body.style.backgroundImage = `url(${randomImage})`;
        }
        
        newQuoteBtn.addEventListener('click', getQuote);
        copyBtn.addEventListener('click', copyQuote);
        linkedinBtn.addEventListener('click', shareOnLinkedIn);
        
        getQuote();
    