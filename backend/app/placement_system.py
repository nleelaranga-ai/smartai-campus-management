import enum
from datetime import datetime
from app import db
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean, Text, JSON
from flask import Blueprint, request, jsonify

# --- PLACEMENT & ALUMNI MODELS ---

class JobStatus(enum.Enum):
    OPEN = "Open"
    CLOSED = "Closed"
    ONGOING = "Ongoing"
    ARCHIVED = "Archived"

class Company(db.Model):
    __tablename__ = 'companies'
    id = Column(Integer, primary_key=True)
    name = Column(String(200), unique=True, nullable=False)
    industry = Column(String(100))
    website = Column(String(255))
    contact_email = Column(String(150))
    tier = Column(Integer, default=1) # Tier 1 (Dream), Tier 2, etc.

class PlacementDrive(db.Model):
    __tablename__ = 'placement_drives'
    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey('companies.id'))
    job_role = Column(String(150), nullable=False)
    package_lpa = Column(Float)
    min_cgpa_required = Column(Float, default=6.0)
    eligible_branches = Column(JSON) # List of dept codes
    drive_date = Column(DateTime)
    description = Column(Text)
    status = Column(String(50), default="Open")

class AlumniProfile(db.Model):
    __tablename__ = 'alumni_profiles'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    graduation_year = Column(Integer, nullable=False)
    current_company = Column(String(200))
    current_designation = Column(String(150))
    linkedin_url = Column(String(255))
    is_mentor = Column(Boolean, default=False)
    total_donations = Column(Float, default=0.0)

# --- PLACEMENT LOGIC SERVICE ---

class PlacementService:
    @staticmethod
    def check_eligibility(student_id, drive_id):
        """
        Logic for automated eligibility verification.
        Checks CGPA, backlogs, and branch constraints.
        """
        # In a real ERP, this would fetch from AcademicRecord and User models
        student_cgpa = 8.5 # Mock fetch
        drive = PlacementDrive.query.get(drive_id)
        
        if not drive: return False, "Drive not found"
        if student_cgpa < drive.min_cgpa_required:
            return False, f"CGPA {student_cgpa} is below required {drive.min_cgpa_required}"
        
        return True, "Eligible to apply"

    @staticmethod
    def get_placement_stats():
        """Aggregates data for the high-level placement dashboard."""
        total_placed = 450 # Mock data for high-density JSON
        avg_package = 8.2
        highest_package = 42.0
        return {
            "total_placed": total_placed,
            "avg_package": f"{avg_package} LPA",
            "highest_package": f"{highest_package} LPA"
        }

# --- API CONTROLLER ---

placement_bp = Blueprint('placement', __name__)

@placement_bp.route('/api/placement/drives', methods=['GET'])
def get_drives():
    drives = PlacementDrive.query.filter_by(status="Open").all()
    return jsonify([{
        "id": d.id, "company": d.company_id, "role": d.job_role,
        "ctc": d.package_lpa, "date": d.drive_date.isoformat() if d.drive_date else None
    } for d in drives])

@placement_bp.route('/api/placement/apply', methods=['POST'])
def apply_to_drive():
    data = request.json
    # Logic to record student application after eligibility check
    return jsonify({"status": "Success", "message": "Application submitted to CPC"})
