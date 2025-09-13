import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsGrid = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'mood-check',
      title: 'Mood Check-in',
      description: 'Track your emotional wellbeing',
      icon: 'Smile',
      color: 'bg-yellow-500/10 hover:bg-yellow-500/20',
      iconColor: 'text-yellow-500',
      action: () => navigate('/wellness-actions/mood-check'),
      duration: '1 min',
      category: 'Emotional'
    },
    {
      id: 'gratitude',
      title: 'Gratitude Journal',
      description: 'Record what you\'re thankful for',
      icon: 'Heart',
      color: 'bg-pink-500/10 hover:bg-pink-500/20',
      iconColor: 'text-pink-500',
      action: () => navigate('/wellness-actions/gratitude'),
      duration: '2 min',
      category: 'Mindfulness'
    },
    {
      id: 'hydration',
      title: 'Hydration Check',
      description: 'Track your water intake',
      icon: 'Droplet',
      color: 'bg-blue-500/10 hover:bg-blue-500/20',
      iconColor: 'text-blue-500',
      action: () => navigate('/wellness-actions/hydration'),
      duration: '1 min',
      category: 'Health'
    },
    {
      id: 'mini-workout',
      title: 'Mini Workout',
      description: 'Quick physical activity boost',
      icon: 'Activity',
      color: 'bg-green-500/10 hover:bg-green-500/20',
      iconColor: 'text-green-500',
      action: () => navigate('/wellness-actions/workout'),
      duration: '5 min',
      category: 'Movement'
    },
    {
      id: 'sleep-track',
      title: 'Sleep Check',
      description: 'Monitor your sleep quality',
      icon: 'Moon',
      color: 'bg-indigo-500/10 hover:bg-indigo-500/20',
      iconColor: 'text-indigo-500',
      action: () => navigate('/wellness-actions/sleep'),
      duration: '2 min',
      category: 'Rest'
    },
    {
      id: 'affirmation',
      title: 'Daily Affirmation',
      description: 'Boost your mindset',
      icon: 'Star',
      color: 'bg-purple-500/10 hover:bg-purple-500/20',
      iconColor: 'text-purple-500',
      action: () => navigate('/wellness-actions/affirmation'),
      duration: '1 min',
      category: 'Mindset'
    },
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      description: 'Guided breathing session',
      icon: 'Wind',
      color: 'bg-cyan-500/10 hover:bg-cyan-500/20',
      iconColor: 'text-cyan-500',
      action: () => navigate('/break-session?type=breathing'),
      duration: '2 min',
      category: 'Mindfulness'
    },
    {
      id: 'power-nap',
      title: 'Power Nap',
      description: 'Quick rejuvenating rest',
      icon: 'BedDouble',
      color: 'bg-orange-500/10 hover:bg-orange-500/20',
      iconColor: 'text-orange-500',
      action: () => navigate('/break-session?type=power-nap'),
      duration: '10 min',
      category: 'Energy'
    },
    {
      id: 'pomodoro',
      title: 'Focus Session',
      description: 'Start 25-minute Pomodoro timer',
      icon: 'Timer',
      color: 'bg-primary/10 hover:bg-primary/20',
      iconColor: 'text-primary',
      action: () => navigate('/pomodoro-timer'),
      duration: '25 min',
      category: 'Focus'
    },
    {
      id: 'quick-break',
      title: 'Quick Break',
      description: 'Take a 5-minute mindful pause',
      icon: 'Coffee',
      color: 'bg-accent/10 hover:bg-accent/20',
      iconColor: 'text-accent',
      action: () => navigate('/break-session?type=quick&duration=5'),
      duration: '5 min',
      category: 'Break'
    },
    {
      id: 'garden',
      title: 'Virtual Garden',
      description: 'Check your wellness progress',
      icon: 'Flower2',
      color: 'bg-success/10 hover:bg-success/20',
      iconColor: 'text-success',
      action: () => navigate('/virtual-garden'),
      duration: 'View',
      category: 'Progress'
    },
    {
      id: 'eye-rest',
      title: 'Eye Rest',
      description: 'Reduce eye strain with exercises',
      icon: 'Eye',
      color: 'bg-warning/10 hover:bg-warning/20',
      iconColor: 'text-warning',
      action: () => navigate('/break-session?type=eye-rest'),
      duration: '3 min',
      category: 'Health'
    },
    {
      id: 'stretch',
      title: 'Stretch Break',
      description: 'Quick posture and movement',
      icon: 'Move',
      color: 'bg-destructive/10 hover:bg-destructive/20',
      iconColor: 'text-destructive',
      action: () => navigate('/break-session?type=stretch'),
      duration: '5 min',
      category: 'Movement'
    }
  ];

  const handleQuickAction = (action) => {
    action?.action();
  };

  return (
    <div className="bg-card rounded-2xl shadow-organic p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Quick Actions
        </h2>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Zap" size={16} />
          <span className="text-sm font-caption">One-click wellness</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            className={`group relative p-4 rounded-xl border border-border/50 transition-all duration-300 cursor-pointer organic-hover ${action?.color}`}
            onClick={() => handleQuickAction(action)}
          >
            {/* Category Badge */}
            <div className="absolute top-3 right-3">
              <span className="text-xs font-caption px-2 py-1 bg-background/80 text-muted-foreground rounded-full">
                {action?.category}
              </span>
            </div>

            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-background/50 mb-4">
              <Icon 
                name={action?.icon} 
                size={24} 
                className={`${action?.iconColor} group-hover:scale-110 transition-transform duration-200`}
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="font-heading font-medium text-foreground group-hover:text-foreground/90">
                {action?.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {action?.description}
              </p>
              
              {/* Duration */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} className="text-muted-foreground" />
                  <span className="text-xs font-mono text-muted-foreground">
                    {action?.duration}
                  </span>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200"
                />
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-background/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
      {/* Quick Start Buttons */}
      <div className="mt-6 pt-6 border-t border-border/50">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/pomodoro-timer?quick=true')}
            iconName="Play"
            iconPosition="left"
            className="organic-hover"
          >
            Quick Focus (25m)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/break-session?type=breathing&quick=true')}
            iconName="Wind"
            iconPosition="left"
            className="organic-hover"
          >
            Quick Breathe (2m)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/break-session?type=meditation&duration=1')}
            iconName="Brain"
            iconPosition="left"
            className="organic-hover"
          >
            Micro Meditation (1m)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsGrid;