from flask import Flask, request, jsonify, render_template
import os
import tempfile
from pdfminer.high_level import extract_text
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords

# -----------------------------------------------------------
# 1. FLASK INITIALIZATION
# -----------------------------------------------------------

app = Flask(__name__, template_folder='templates')

# Download stopwords once
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

stop_words = set(stopwords.words('english'))

# -----------------------------------------------------------
# 2. HELPER FUNCTIONS
# -----------------------------------------------------------

def extract_text_from_file(uploaded_file):
    """Extract text from uploaded PDF file safely."""
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            temp_file.write(uploaded_file.read())
            temp_path = temp_file.name

        text = extract_text(temp_path)
        os.remove(temp_path)
        return text

    except Exception as e:
        print("Error extracting PDF:", e)
        return None


def calculate_similarity(resume_text, job_description):
    """Calculate TF-IDF cosine similarity (0–100%)."""
    documents = [resume_text, job_description]
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(documents)
    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    return round(similarity[0][0] * 100, 2)


# -----------------------------------------------------------
# 3. ROUTES
# -----------------------------------------------------------

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/process', methods=['POST'])
def process_resume():
    job_description = request.form.get('job_description')
    uploaded_file = request.files.get('resume_file')

    if not job_description or not uploaded_file:
        return jsonify({'error': 'Please provide both a resume and a job description'}), 400

    resume_text = extract_text_from_file(uploaded_file)
    if not resume_text:
        return jsonify({'error': 'Could not read PDF file'}), 400

    score = calculate_similarity(resume_text, job_description)

    # extract keywords
    jd_words = set(job_description.lower().split())
    resume_words = set(resume_text.lower().split())

    common = jd_words.intersection(resume_words)
    significant_keywords = [
        w for w in common if len(w) > 3 and w not in stop_words
    ]

    return jsonify({
        'score': score,
        'keywords': significant_keywords[:10]
    })


# -----------------------------------------------------------
# 4. RUN APP
# -----------------------------------------------------------

if __name__ == '__main__':
    app.run(debug=True)
