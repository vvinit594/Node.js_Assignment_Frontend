/**
 * Card Component
 * Reusable card container for stats and content
 */

const Card = ({
  title,
  value,
  icon: Icon,
  color = 'blue',
  trend,
  children,
  className = '',
}) => {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500',
  };

  if (children) {
    return (
      <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <div className="flex items-center">
        {Icon && (
          <div className={`${colors[color]} p-3 rounded-lg mr-4`}>
            <Icon className="text-white text-2xl" />
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
