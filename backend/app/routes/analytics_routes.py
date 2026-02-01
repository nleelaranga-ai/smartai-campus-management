from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from sqlalchemy import func
from datetime import datetime, timedelta

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/student/performance-trend', methods=['GET'])
@jwt_required()
def get_performance_trend():
    student_id = get_jwt_identity()
    # Calculates average marks per month for the last 6 months
    results = db.session.query(
        func.to_char(Attendance.date, 'Mon').label('month'),
        func.avg(Grades.marks_obtained).label('avg_marks')
    ).join(Grades, Grades.student_id == student_id).group_by('month').all()
    
    return jsonify([{"month": r.month, "performance": float(r.avg_marks)} for r in results])
