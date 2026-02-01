import enum
from datetime import datetime
from app import db
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean, Enum
from flask import Blueprint, request, jsonify

# --- NOTIFICATION SCHEMAS ---

class PriorityLevel(enum.Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    URGENT = "Urgent"

class NotificationCategory(enum.Enum):
    ACADEMIC = "Academic"
    FINANCE = "Finance"
    ADMIN = "Administrative"
    SYSTEM = "System Update"

class Notification(db.Model):
    __tablename__ = 'notifications'
    id = Column(Integer, primary_key=True)
    recipient_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    title = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    category = Column(String(50), default="General")
    priority = Column(String(20), default="Medium")
    is_read = Column(Boolean, default=False)
    action_url = Column(String(255)) # Deep link to the specific page
    created_at = Column(DateTime, default=datetime.utcnow)

class UserNotificationPreference(db.Model):
    __tablename__ = 'user_notif_prefs'
    user_id = Column(Integer, primary_key=True, ForeignKey('users.id'))
    email_enabled = Column(Boolean, default=True)
    push_enabled = Column(Boolean, default=True)
    sms_enabled = Column(Boolean, default=False)

# --- COMMUNICATION SERVICE ENGINE ---

class NotificationService:
    @staticmethod
    def dispatch(recipient_id, title, message, category, priority=PriorityLevel.MEDIUM, url=None):
        """
        The central dispatch engine. 
        In a production environment, this would integrate with Celery/Redis
        for asynchronous worker execution.
        """
        # 1. Log to Database
        new_notif = Notification(
            recipient_id=recipient_id,
            title=title,
            message=message,
            category=category.value,
            priority=priority.value,
            action_url=url
        )
        db.session.add(new_notif)
        
        # 2. Check Preferences & Trigger External Adapters
        prefs = UserNotificationPreference.query.get(recipient_id)
        if prefs:
            if prefs.email_enabled:
                NotificationService._send_email_stub(recipient_id, title, message)
            if prefs.sms_enabled and priority == PriorityLevel.URGENT:
                NotificationService._send_sms_stub(recipient_id, message)
        
        db.session.commit()
        return True

    @staticmethod
    def _send_email_stub(uid, subject, body):
        """SMTP Integration logic stub for enterprise-grade training."""
        print(f"SMTP: Sending email to User {uid}...")
        pass

    @staticmethod
    def _send_sms_stub(uid, msg):
        """Twilio/SMS Gateway integration logic stub."""
        print(f"SMS: Sending urgent alert to User {uid}...")
        pass

# --- API CONTROLLER ---

notif_bp = Blueprint('notifications', __name__)

@notif_bp.route('/api/notifications/unread', methods=['GET'])
def get_unread():
    uid = request.args.get('user_id')
    notifs = Notification.query.filter_by(recipient_id=uid, is_read=False).order_by(Notification.created_at.desc()).all()
    return jsonify([{
        "id": n.id, "title": n.title, "msg": n.message, 
        "category": n.category, "time": n.created_at.isoformat()
    } for n in notifs])

@notif_bp.route('/api/notifications/mark-read', methods=['POST'])
def mark_read():
    notif_id = request.json.get('id')
    n = Notification.query.get(notif_id)
    if n:
        n.is_read = True
        db.session.commit()
    return jsonify({"status": "Updated"})
