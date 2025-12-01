# AI-Powered Resume Screener

An intelligent resume screening application that uses AI to match resumes with job descriptions and provide a compatibility score.

## Features

- **Resume Upload**: Drag-and-drop interface for PDF and TXT resume files
- **Job Description Input**: Easy text area for pasting job requirements
- **AI-Powered Matching**: Uses TF-IDF and cosine similarity to calculate match scores
- **Keyword Extraction**: Identifies key matching keywords between resume and JD
- **Interactive UI**: Clean, modern interface with real-time results
- **Clear Functionality**: Quick reset button to start fresh

## Screenshots
<img width="1868" height="945" alt="Screenshot 2025-12-01 193144" src="https://github.com/user-attachments/assets/1408f218-2855-467b-9177-1ef158884942" />
<img width="883" height="784" alt="Screenshot 2025-12-01 193311" src="https://github.com/user-attachments/assets/96f1fd00-7a00-44df-ab68-ac2e01bf5331" />
<img width="1866" height="886" alt="Screenshot 2025-12-01 194417" src="https://github.com/user-attachments/assets/7f3e5614-62a3-4293-b4ac-41f2098f5d00" />


## Tech Stack

### Frontend
- HTML5
- CSS3 (Custom styling with Flexbox/Grid)
- Vanilla JavaScript

### Backend
- Python 3.x
- Flask (Web framework)
- pdfminer.six (PDF text extraction)
- scikit-learn (TF-IDF vectorization and similarity)
- NLTK (Natural language processing)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rashidrxq/AI-Powered-Resume-Screener.git
   cd AI-Powered-Resume-Screener
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # On Windows
   # source .venv/bin/activate  # On macOS/Linux
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. **Start the Flask server**
   ```bash
   cd frontend
   python app.py
   ```

2. **Open your browser**
   Navigate to `http://127.0.0.1:5000`

3. **Use the application**
   - Upload your resume (PDF or TXT)
   - Paste the job description
   - Click "Check Resume" to see the match score
   - View matching keywords
   - Use "Clear" to reset and try another resume

## Project Structure

```
remuse/
├── frontend/
│   ├── app.py              # Flask backend
│   ├── static/
│   │   ├── style.css       # Styling
│   │   └── javascript.js   # Frontend logic
│   └── templates/
│       └── index.html      # Main page
├── requirements.txt        # Python dependencies
└── README.md
```

## How It Works

1. **Text Extraction**: Extracts text from uploaded PDF resumes
2. **Preprocessing**: Cleans and tokenizes both resume and job description
3. **Vectorization**: Converts text to TF-IDF vectors
4. **Similarity Calculation**: Computes cosine similarity between vectors
5. **Keyword Matching**: Identifies common significant keywords
6. **Results Display**: Shows match percentage and keywords with animated UI

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Rashid - [GitHub](https://github.com/Rashidrxq)
