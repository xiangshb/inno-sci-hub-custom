import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Target, Users, Clock, CheckCircle, AlertCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BaseCrudService } from '@/integrations';
import { ResearchPlans } from '@/entities';

export default function ResearchPlansPage() {
  const [plans, setPlans] = useState<ResearchPlans[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { items } = await BaseCrudService.getAll<ResearchPlans>('researchplans');
        setPlans(items);
      } catch (error) {
        console.error('Error fetching research plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const filteredPlans = selectedStatus === 'all' 
    ? plans 
    : plans.filter(plan => plan.status?.toLowerCase() === selectedStatus.toLowerCase());

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'in progress':
        return <Play className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'planning':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'in progress':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateProgress = (startDate?: Date | string, endDate?: Date | string) => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = Date.now();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    return Math.round(((now - start) / (end - start)) * 100);
  };

  const uniqueStatuses = Array.from(new Set(plans.map(plan => plan.status).filter(Boolean)));

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="w-full bg-primary border-b border-subtleborder">
        <div className="max-w-[100rem] mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-primary-foreground font-paragraph text-sm tracking-wider hover:text-secondary transition-colors">
              ← SCIENTIFIC DISCOVERY PLATFORM
            </Link>
            <div className="hidden md:flex space-x-8 text-primary-foreground font-paragraph text-sm">
              <Link to="/insights" className="hover:text-secondary transition-colors">Insights</Link>
              <Link to="/research-plans" className="text-secondary">Research Plans</Link>
              <Link to="/agents" className="hover:text-secondary transition-colors">AI Agents</Link>
              <Link to="/tools" className="hover:text-secondary transition-colors">Tools</Link>
              <Link to="/knowledge" className="hover:text-secondary transition-colors">Knowledge Network</Link>
              <Link to="/visualizations" className="hover:text-secondary transition-colors">Visualizations</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="w-full bg-primary">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-heading text-6xl text-primary-foreground mb-6">Research Plans</h1>
            <p className="font-paragraph text-primary-foreground/80 text-lg max-w-3xl mx-auto">
              Strategic research initiatives designed by AI-driven planning systems to maximize scientific breakthrough potential and optimize resource allocation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="w-full bg-background border-b border-subtleborder">
        <div className="max-w-[100rem] mx-auto px-8 py-8">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="font-paragraph text-darktext/60 text-sm">Filter by status:</span>
            <Button
              variant={selectedStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus('all')}
              className={selectedStatus === 'all' ? 'bg-secondary text-secondary-foreground' : 'border-subtleborder text-darktext hover:bg-secondary hover:text-secondary-foreground'}
            >
              All Plans
            </Button>
            {uniqueStatuses.map(status => (
              <Button
                key={status}
                variant={selectedStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus(status || '')}
                className={selectedStatus === status ? 'bg-secondary text-secondary-foreground' : 'border-subtleborder text-darktext hover:bg-secondary hover:text-secondary-foreground'}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Research Plans Grid */}
      <section className="w-full">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-background border-subtleborder p-8 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-6">
                    <Badge className={`${getStatusColor(plan.status)} flex items-center gap-2`}>
                      {getStatusIcon(plan.status)}
                      {plan.status || 'Unknown'}
                    </Badge>
                    <Target className="w-5 h-5 text-secondary" />
                  </div>

                  <h3 className="font-heading text-2xl text-darktext mb-4 leading-tight">
                    {plan.planTitle}
                  </h3>

                  <p className="font-paragraph text-darktext/80 text-sm leading-relaxed mb-6">
                    {plan.goal}
                  </p>

                  {/* Progress Bar */}
                  {plan.startDate && plan.endDate && (
                    <div className="mb-6">
                      <div className="flex justify-between text-xs text-darktext/60 mb-2">
                        <span>Progress</span>
                        <span>{calculateProgress(plan.startDate, plan.endDate)}%</span>
                      </div>
                      <Progress 
                        value={calculateProgress(plan.startDate, plan.endDate)} 
                        className="h-2"
                      />
                    </div>
                  )}

                  {/* Methodology Preview */}
                  {plan.methodology && (
                    <div className="mb-6">
                      <h4 className="font-paragraph text-darktext font-semibold text-sm mb-2">Methodology</h4>
                      <p className="font-paragraph text-darktext/70 text-xs leading-relaxed">
                        {plan.methodology.length > 150 
                          ? `${plan.methodology.slice(0, 150)}...` 
                          : plan.methodology
                        }
                      </p>
                    </div>
                  )}

                  {/* Key Milestones */}
                  {plan.keyMilestones && (
                    <div className="mb-6">
                      <h4 className="font-paragraph text-darktext font-semibold text-sm mb-2">Key Milestones</h4>
                      <p className="font-paragraph text-darktext/70 text-xs leading-relaxed">
                        {plan.keyMilestones.length > 100 
                          ? `${plan.keyMilestones.slice(0, 100)}...` 
                          : plan.keyMilestones
                        }
                      </p>
                    </div>
                  )}

                  {/* Timeline */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-darktext/60">
                        <Calendar className="w-4 h-4 mr-2" />
                        Start Date
                      </div>
                      <span className="font-paragraph text-darktext">
                        {plan.startDate ? new Date(plan.startDate).toLocaleDateString() : 'TBD'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-darktext/60">
                        <Calendar className="w-4 h-4 mr-2" />
                        End Date
                      </div>
                      <span className="font-paragraph text-darktext">
                        {plan.endDate ? new Date(plan.endDate).toLocaleDateString() : 'TBD'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                      <Users className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPlans.length === 0 && (
            <div className="text-center py-16">
              <Target className="w-16 h-16 text-darktext/20 mx-auto mb-4" />
              <h3 className="font-heading text-2xl text-darktext/60 mb-2">No research plans found</h3>
              <p className="font-paragraph text-darktext/40">
                Try adjusting your filters or check back later for new research initiatives.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Statistics */}
      <section className="w-full bg-mutedolive/10">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">{plans.length}</div>
              <div className="font-paragraph text-darktext/80">Total Research Plans</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">
                {plans.filter(p => p.status?.toLowerCase() === 'active' || p.status?.toLowerCase() === 'in progress').length}
              </div>
              <div className="font-paragraph text-darktext/80">Active Projects</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">
                {plans.filter(p => p.status?.toLowerCase() === 'completed').length}
              </div>
              <div className="font-paragraph text-darktext/80">Completed Studies</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">
                {Math.round(plans.reduce((acc, plan) => {
                  const progress = calculateProgress(plan.startDate, plan.endDate);
                  return acc + progress;
                }, 0) / plans.length) || 0}%
              </div>
              <div className="font-paragraph text-darktext/80">Average Progress</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-primary">
        <div className="max-w-[100rem] mx-auto px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl text-primary-foreground mb-6">
              Collaborate on Breakthrough Research
            </h2>
            <p className="font-paragraph text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Join our network of AI agents and researchers to contribute to cutting-edge scientific discoveries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agents">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Meet AI Agents
                </Button>
              </Link>
              <Link to="/insights">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Explore Insights
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}