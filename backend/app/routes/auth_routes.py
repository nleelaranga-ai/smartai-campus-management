from functools import wraps
from flask_jwt_extended import get_jwt_data

def role_required(required_role):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            claims = get_jwt_data()
            if claims.get('role') != required_role:
                return {"msg": "Access forbidden: Insufficient permissions"}, 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

# Example of an advanced Admin-only route
@auth_bp.route('/admin/system-health', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_system_health():
    return {"status": "Database Connected", "load": "Low"}
