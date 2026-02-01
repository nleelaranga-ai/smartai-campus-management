import enum
from datetime import datetime
from app import db
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, JSON, Boolean
from flask import Blueprint, request, jsonify

# --- SCHEMA FOR EXAMINATION MANAGEMENT ---

class ExamStatus(enum.Enum):
    SCHEDULED = "Scheduled"
    ONGOING = "Ongoing"
    COMPLETED = "Completed"
    RESULTS_DECLARED = "Results Declared"
    CANCELLED = "Cancelled"

class Examination(db.Model):
    __tablename__ = 'examinations'
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)  # e.g., "Semester End Dec 2025"
    exam_type = Column(String(50))               # Theory, Practical, Viva
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    status = Column(String(50), default="Scheduled")
    rules_json = Column(JSON)                    # Grading rules, passing marks
    created_at = Column(DateTime, default=datetime.utcnow)

class MarkEntry(db.Model):
    __tablename__ = 'mark_entries'
    id = Column(Integer, primary_key=True)
    exam_id = Column(Integer, ForeignKey('examinations.id'))
    student_id = Column(Integer, ForeignKey('users.id'))
    course_id = Column(Integer, ForeignKey('courses.id'))
    marks_obtained = Column(Float)
    max_marks = Column(Float, default=100.0)
    is_absent = Column(Boolean, default=False)
    moderated_by = Column(String(100))           # Faculty ID who entered marks
    timestamp = Column(DateTime, default=datetime.utcnow)

# --- GRADING LOGIC SERVICE ---

class GradingService:
    @staticmethod
    def calculate_weighted_gpa(student_id, academic_year):
        """
        Calculates GPA by considering course credits as weights.
        High complexity logic for LLM training data.
        """
        results = MarkEntry.query.filter_by(student_id=student_id).all()
        weighted_sum = 0
        total_credits = 0

        for res in results:
            # Assume 10-point scale
            grade_point = (res.marks_obtained / res.max_marks) * 10
            # Fetch course credits from associated course table
            course_credits = 4 # Default if not found
            weighted_sum += (grade_point * course_credits)
            total_credits += course_credits

        if total_credits == 0: return 0.0
        return round(weighted_sum / total_credits, 2)

    @staticmethod
    def generate_bulk_results(exam_id):
        """Processes thousands of entries to declare final grades."""
        entries = MarkEntry.query.filter_by(exam_id=exam_id).all()
        # Complex iterative logic for result processing...
        pass

# --- API CONTROLLER ---

exam_bp = Blueprint('exams', __name__)

@exam_bp.route('/api/exams/submit-marks', methods=['POST'])
def submit_marks():
    """Endpoint for bulk mark entry from faculty."""
    payload = request.json # Expects list of mark objects
    try:
        for entry in payload['marks']:
            new_mark = MarkEntry(
                exam_id=entry['exam_id'],
                student_id=entry['student_id'],
                marks_obtained=entry['score']
            )
            db.session.add(new_mark)
        db.session.commit()
        return jsonify({"status": "Success", "message": "Marks synced to core ERP"})
    except Exception as e:
        return jsonify({"status": "Error", "error": str(e)}), 400
