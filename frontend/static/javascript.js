document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('resume-upload');
    const fileNameDisplay = document.getElementById('file-name');
    const clearBtn = document.getElementById('clear-btn');
    const checkBtn = document.getElementById('check-btn');

    // Trigger file input when clicking the drop zone
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file selection via input
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    // Drag and Drop events
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            handleFile(e.dataTransfer.files[0]);
        }
    });

    function handleFile(file) {
        fileNameDisplay.textContent = `Selected: ${file.name}`;
    }

    // Clear button functionality
    clearBtn.addEventListener('click', () => {
        fileInput.value = '';
        fileNameDisplay.textContent = '';
        document.getElementById('jd-input').value = '';
        document.getElementById('result-section').classList.add('hidden');
    });

    // Check button functionality
    checkBtn.addEventListener('click', async () => {
        const jdText = document.getElementById('jd-input').value;
        const resultSection = document.getElementById('result-section');
        const keywordsList = document.querySelector('.keywords-list');

        if (fileInput.files.length === 0 || !jdText) {
            alert("Please upload a resume and enter a job description.");
            return;
        }

        const formData = new FormData();
        formData.append('resume_file', fileInput.files[0]);
        formData.append('job_description', jdText);

        // Show 'Loading...' state
        resultSection.classList.remove('hidden');
        keywordsList.innerHTML = '<li>Analyzing...</li>';

        try {
            const response = await fetch('/process', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error("Analysis failed");

            const data = await response.json();

            animateScore(data.score);
            updateKeywords(data.keywords);

        } catch (error) {
            console.error(error);
            alert("An error occurred while analyzing the resume.");
        }
    });

    // Helper: Animate Score
    function animateScore(targetScore) {
        let progress = 0;
        const circularProgress = document.querySelector('.circular-progress');
        const scoreValue = document.querySelector('.score-value');

        const interval = setInterval(() => {
            progress++;
            circularProgress.style.setProperty('--progress', `${progress * 3.6}deg`);
            scoreValue.textContent = `${progress}%`;
            if (progress >= Math.floor(targetScore)) clearInterval(interval);
        }, 20);
    }

    // Helper: Update Keywords
    function updateKeywords(keywords) {
        const keywordsList = document.querySelector('.keywords-list');
        keywordsList.innerHTML = '';
        if (keywords.length === 0) {
            keywordsList.innerHTML = '<li>No specific keywords matched</li>';
            return;
        }
        keywords.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word;
            keywordsList.appendChild(li);
        });
    }
});