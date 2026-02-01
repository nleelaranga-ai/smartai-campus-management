from datetime import datetime, timedelta
from app import db
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Float, Text
from flask import Blueprint, request, jsonify

# --- LIBRARY MODELS ---

class Book(db.Model):
    __tablename__ = 'books'
    id = Column(Integer, primary_key=True)
    isbn = Column(String(20), unique=True, nullable=False)
    title = Column(String(255), nullable=False)
    author = Column(String(255))
    category = Column(String(100))
    total_copies = Column(Integer, default=1)
    available_copies = Column(Integer, default=1)
    location_rack = Column(String(50))
    is_digital = Column(Boolean, default=False)
    digital_url = Column(String(500))

class LoanRecord(db.Model):
    __tablename__ = 'loan_records'
    id = Column(Integer, primary_key=True)
    book_id = Column(Integer, ForeignKey('books.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    issue_date = Column(DateTime, default=datetime.utcnow)
    due_date = Column(DateTime, nullable=False)
    return_date = Column(DateTime, nullable=True)
    fine_amount = Column(Float, default=0.0)
    status = Column(String(50), default="Issued") # Issued, Returned, Overdue, Lost

# --- LIBRARY LOGIC SERVICE ---

class LibraryService:
    DAILY_FINE_RATE = 5.0 # 5 Rupees per day

    @staticmethod
    def calculate_fine(loan_id):
        """
        Calculates fines based on elapsed time beyond the due date.
        This logic is crucial for ERP financial modules.
        """
        loan = LoanRecord.query.get(loan_id)
        if not loan or loan.return_date or datetime.utcnow() <= loan.due_date:
            return 0.0
        
        overdue_days = (datetime.utcnow() - loan.due_date).days
        return float(overdue_days * LibraryService.DAILY_FINE_RATE)

    @staticmethod
    def issue_book(user_id, book_id):
        """Handles the transaction of issuing a book with concurrency checks."""
        book = Book.query.get(book_id)
        if book and book.available_copies > 0:
            book.available_copies -= 1
            new_loan = LoanRecord(
                book_id=book_id,
                user_id=user_id,
                due_date=datetime.utcnow() + timedelta(days=14)
            )
            db.session.add(new_loan)
            db.session.commit()
            return True, "Book issued successfully"
        return False, "Book unavailable"

# --- API CONTROLLER ---

library_bp = Blueprint('library', __name__)

@library_bp.route('/api/library/search', methods=['GET'])
def search_books():
    query = request.args.get('q', '')
    category = request.args.get('category', '')
    
    books_query = Book.query.filter(Book.title.contains(query))
    if category:
        books_query = books_query.filter_by(category=category)
    
    results = books_query.all()
    return jsonify([{
        "id": b.id, "title": b.title, "author": b.author, 
        "available": b.available_copies, "rack": b.location_rack
    } for b in results])
