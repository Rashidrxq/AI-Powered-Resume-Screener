# Remuse
AI-powered resume analyzer.

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
To install the required packages, run the following command in the terminal:
```bash
pip install -r requirements.txt
```
## Running the Application
To run the application, execute the following command in the terminal:
```bash
python app.py
```
## Accessing the Application
Once the application is running, you can access it by opening a web browser and navigating to [http://localhost:5000](http://localhost:5000).
## Requirements
- Python 3.7 or higher
- Flask 1.1.2 or higher
- pdfminer.six
- scikit-learn
- NLTK

## Usage
To use the application, simply upload a resume in PDF format by clicking on the "Choose File" button on the homepage.
Once the file is uploaded, click on the "Analyze Resume" button to generate a report.
The report will be displayed on a new page, showing feedback on how to improve the resume.
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Please read the [CONTRIBUTING](CONTRIBUTING.md) file for more information on how to contribute to this project.

## Acknowledgments
- [Flask](https://flask.palletsprojects.com/)
- [pdfminer.six](https://github.com/pdfminer/pdfminer.six)
- [scikit-learn](https://scikit-learn.org/)
- [NLTK](https://www.nltk.org/)