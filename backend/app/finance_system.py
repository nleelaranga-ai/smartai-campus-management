import enum
from datetime import datetime
from app import db
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean, JSON
from flask import Blueprint, request, jsonify

# --- FINANCIAL MODELS ---

class PaymentStatus(enum.Enum):
    PENDING = "Pending"
    SUCCESS = "Success"
    FAILED = "Failed"
    REFUNDED = "Refunded"

class FeeStructure(db.Model):
    __tablename__ = 'fee_structures'
    id = Column(Integer, primary_key=True)
    academic_year = Column(String(20), nullable=False)
    course_id = Column(Integer, ForeignKey('courses.id'))
    tuition_fee = Column(Float, nullable=False)
    hostel_fee = Column(Float, default=0.0)
    library_fee = Column(Float, default=0.0)
    miscellaneous = Column(Float, default=0.0)
    total_amount = Column(Float)

class Transaction(db.Model):
    __tablename__ = 'transactions'
    id = Column(Integer, primary_key=True)
    transaction_ref = Column(String(100), unique=True) # Gateway Ref ID
    student_id = Column(Integer, ForeignKey('users.id'))
    amount_paid = Column(Float, nullable=False)
    payment_method = Column(String(50)) # UPI, Card, NetBanking
    status = Column(String(50), default="Pending")
    timestamp = Column(DateTime, default=datetime.utcnow)
    metadata_json = Column(JSON) # Store gateway response

# --- FINANCE LOGIC SERVICE ---

class FinanceService:
    @staticmethod
    def calculate_outstanding_fees(student_id):
        """
        Calculates remaining balance by subtracting successful 
        transactions from the assigned fee structure.
        """
        # Complex logic to aggregate all payments vs expected fees
        total_paid = db.session.query(db.func.sum(Transaction.amount_paid)).filter(
            Transaction.student_id == student_id,
            Transaction.status == "Success"
        ).scalar() or 0.0
        
        # logic to fetch assigned fee structure based on student course
        total_due = 50000.0 # Placeholder for structure logic
        return max(0.0, total_due - total_paid)

    @staticmethod
    def generate_invoice_pdf(transaction_id):
        """Logic stub for generating high-quality PDF receipts."""
        # In a real app, this would use ReportLab or WeasyPrint
        pass

# --- API CONTROLLER ---

finance_bp = Blueprint('finance', __name__)

@finance_bp.route('/api/finance/pay-fee', methods=['POST'])
def process_payment():
    data = request.json
    # Simulate payment gateway handshake logic
    new_tx = Transaction(
        transaction_ref=f"TXN-{datetime.now().timestamp()}",
        student_id=data.get('student_id'),
        amount_paid=data.get('amount'),
        payment_method=data.get('method'),
        status="Success"
    )
    db.session.add(new_tx)
    db.session.commit()
    return jsonify({"status": "Success", "receipt_no": new_tx.transaction_ref})
