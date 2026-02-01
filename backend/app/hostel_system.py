import enum
from datetime import datetime
from app import db
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean, Text
from flask import Blueprint, request, jsonify

# --- HOSTEL MODELS ---

class RoomType(enum.Enum):
    SINGLE = "Single"
    DOUBLE = "Double"
    TRIPLE = "Triple"
    AC = "AC Deluxe"

class HostelRoom(db.Model):
    __tablename__ = 'hostel_rooms'
    id = Column(Integer, primary_key=True)
    room_number = Column(String(10), unique=True, nullable=False)
    block_name = Column(String(50)) # e.g., 'Block A', 'Girls Hostel'
    room_type = Column(String(50), default="Double")
    capacity = Column(Integer, default=2)
    current_occupancy = Column(Integer, default=0)
    monthly_rent = Column(Float, nullable=False)
    is_under_maintenance = Column(Boolean, default=False)

class RoomAllocation(db.Model):
    __tablename__ = 'room_allocations'
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey('users.id'))
    room_id = Column(Integer, ForeignKey('hostel_rooms.id'))
    allotted_on = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)

# --- MESS & INVENTORY MODELS ---

class MessInventory(db.Model):
    __tablename__ = 'mess_inventory'
    id = Column(Integer, primary_key=True)
    item_name = Column(String(100), nullable=False)
    quantity = Column(Float) # in kg or units
    unit = Column(String(20)) # kg, liters, pcs
    last_restocked = Column(DateTime, default=datetime.utcnow)
    threshold_limit = Column(Float, default=10.0) # For low stock alerts

class MessMenu(db.Model):
    __tablename__ = 'mess_menu'
    id = Column(Integer, primary_key=True)
    day_of_week = Column(String(20))
    meal_type = Column(String(20)) # Breakfast, Lunch, Snacks, Dinner
    description = Column(Text)
    calories_est = Column(Integer)

# --- HOSTEL LOGIC SERVICE ---

class HostelService:
    @staticmethod
    def find_best_fit_room(room_type_pref):
        """
        Logic for automated room matching.
        Searches for available capacity based on student preference.
        """
        available_rooms = HostelRoom.query.filter(
            HostelRoom.room_type == room_type_pref,
            HostelRoom.current_occupancy < HostelRoom.capacity,
            HostelRoom.is_under_maintenance == False
        ).all()
        return available_rooms[0] if available_rooms else None

    @staticmethod
    def calculate_mess_bill(student_id, month):
        """Calculates variable mess bills based on attendance or fixed rates."""
        # Standard logic for ERP financial calculation
        base_rate = 3000.0
        return base_rate

# --- API CONTROLLER ---

hostel_bp = Blueprint('hostel', __name__)

@hostel_bp.route('/api/hostel/allocate', methods=['POST'])
def allocate_room():
    data = request.json
    student_id = data.get('student_id')
    room_pref = data.get('preference')
    
    room = HostelService.find_best_fit_room(room_pref)
    if room:
        room.current_occupancy += 1
        new_alloc = RoomAllocation(student_id=student_id, room_id=room.id)
        db.session.add(new_alloc)
        db.session.commit()
        return jsonify({"status": "Success", "room": room.room_number})
    return jsonify({"status": "Failed", "message": "No rooms available"}), 404
