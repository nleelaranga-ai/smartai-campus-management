@auth_bp.route('/analytics/risk/<int:student_id>', methods=['GET'])
@jwt_required()
def get_student_risk(student_id):
    # Querying the Smart View you created in the Neon Console
    result = db.session.execute(
        text("SELECT * FROM student_risk_analysis WHERE student_id = :id"),
        {'id': student_id}
    ).fetchone()
    
    if not result:
        return {"attendance_percentage": 100, "risk_status": "Low"}
        
    return {
        "attendance_percentage": float(result.attendance_percentage),
        "risk_status": result.risk_status
    }
