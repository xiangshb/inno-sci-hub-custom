import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Network, Microscope, BarChart3, Lightbulb, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { ScientificInsights, ResearchPlans, IntelligentAgents } from '@/entities';

export default function HomePage() {
  const [insights, setInsights] = useState<ScientificInsights[]>([]);
  const [plans, setPlans] = useState<ResearchPlans[]>([]);
  const [agents, setAgents] = useState<IntelligentAgents[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [insightsData, plansData, agentsData] = await Promise.all([
          BaseCrudService.getAll<ScientificInsights>('scientificinsights'),
          BaseCrudService.getAll<ResearchPlans>('researchplans'),
          BaseCrudService.getAll<IntelligentAgents>('intelligentagents')
        ]);
        
        setInsights(insightsData.items.slice(0, 3));
        setPlans(plansData.items.slice(0, 2));
        setAgents(agentsData.items.slice(0, 4));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      {/* Navigation */}
      <nav className="w-full max-w-[120rem] mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="text-primary-foreground font-paragraph text-sm tracking-wider">
            SCIENTIFIC DISCOVERY PLATFORM
          </div>
          <div className="hidden md:flex space-x-8 text-primary-foreground font-paragraph text-sm">
            <Link to="/insights" className="hover:text-secondary transition-colors">Insights</Link>
            <Link to="/research-plans" className="hover:text-secondary transition-colors">Research Plans</Link>
            <Link to="/agents" className="hover:text-secondary transition-colors">AI Agents</Link>
            <Link to="/tools" className="hover:text-secondary transition-colors">Tools</Link>
            <Link to="/knowledge" className="hover:text-secondary transition-colors">Knowledge Network</Link>
            <Link to="/visualizations" className="hover:text-secondary transition-colors">Visualizations</Link>
          </div>
          <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            Dashboard
          </Button>
        </div>
      </nav>

      {/* Hero Section - Inspired by museum layout */}
      <section className="w-full max-w-[120rem] mx-auto px-8 py-20 relative">
        <div className="grid grid-cols-12 gap-8 min-h-[80vh] relative">
          {/* Floating insight cards - positioned like artifacts */}
          {insights.map((insight, index) => (
            <motion.div
              key={insight._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`absolute ${
                index === 0 ? 'top-16 left-8 w-64' :
                index === 1 ? 'top-32 right-16 w-72' :
                'bottom-24 left-32 w-56'
              }`}
            >
              <Card className="bg-background/10 backdrop-blur-sm border-subtleborder/30 p-6">
                <div className="text-primary-foreground/60 text-xs font-paragraph mb-2">
                  [ {String(index + 1).padStart(2, '0')} ]
                </div>
                <h3 className="text-primary-foreground font-heading text-lg mb-3">
                  {insight.title}
                </h3>
                <p className="text-primary-foreground/80 font-paragraph text-sm leading-relaxed">
                  {insight.summary?.slice(0, 120)}...
                </p>
                <div className="mt-4 flex items-center text-primary-foreground/60 text-xs">
                  <Brain className="w-3 h-3 mr-2" />
                  {insight.aiModelUsed}
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Central title - inspired by "ORIGINS" */}
          <div className="col-span-12 flex items-center justify-center relative z-10">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="font-heading text-8xl md:text-9xl text-primary-foreground leading-none mb-6"
              >
                DISCOVERY
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-primary-foreground/80 font-paragraph text-lg tracking-wider"
              >
                AI-DRIVEN SCIENTIFIC RESEARCH
                <br />
                NEXT GENERATION PLATFORM
              </motion.div>
            </div>
          </div>

          {/* Floating agent cards */}
          {agents.slice(0, 2).map((agent, index) => (
            <motion.div
              key={agent._id}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.2 }}
              className={`absolute ${
                index === 0 ? 'bottom-16 right-8 w-48' : 'top-48 left-16 w-52'
              }`}
            >
              <Card className="bg-mutedolive/20 backdrop-blur-sm border-subtleborder/30 p-4">
                <div className="text-primary-foreground/60 text-xs font-paragraph mb-2">
                  [ AI-{String(index + 1).padStart(2, '0')} ]
                </div>
                {agent.agentImage && (
                  <div className="w-full h-24 mb-3 rounded overflow-hidden">
                    <Image 
                      src={agent.agentImage} 
                      alt={agent.name || 'AI Agent'}
                      className="w-full h-full object-cover"
                      width={200}
                    />
                  </div>
                )}
                <h4 className="text-primary-foreground font-heading text-sm mb-2">
                  {agent.name}
                </h4>
                <p className="text-primary-foreground/70 font-paragraph text-xs">
                  {agent.specialization}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Features Section */}
      <section className="w-full bg-background">
        <div className="max-w-[100rem] mx-auto px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="font-heading text-2xl text-darktext mb-4">Scientific Insights Engine</h3>
              <p className="font-paragraph text-darktext/80 leading-relaxed">
                Advanced AI algorithms generate breakthrough scientific discoveries by analyzing vast datasets and identifying novel patterns across disciplines.
              </p>
              <Link to="/insights">
                <Button className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Explore Insights
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Microscope className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="font-heading text-2xl text-darktext mb-4">Research Planning System</h3>
              <p className="font-paragraph text-darktext/80 leading-relaxed">
                Intelligent research path planning that optimizes study methodologies and predicts breakthrough opportunities in scientific exploration.
              </p>
              <Link to="/research-plans">
                <Button className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  View Plans
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Network className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="font-heading text-2xl text-darktext mb-4">Collaborative AI Network</h3>
              <p className="font-paragraph text-darktext/80 leading-relaxed">
                Interconnected intelligent agents working together to solve complex scientific challenges through distributed knowledge processing.
              </p>
              <Link to="/agents">
                <Button className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Meet Agents
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Plans Preview */}
      <section className="w-full bg-mutedolive/10">
        <div className="max-w-[100rem] mx-auto px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl text-darktext mb-6">Active Research Initiatives</h2>
            <p className="font-paragraph text-darktext/80 text-lg max-w-3xl mx-auto">
              Ongoing research plans powered by AI-driven methodology optimization and cross-disciplinary knowledge integration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {plans.map((plan, index) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="bg-background border-subtleborder p-8 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-secondary font-paragraph text-sm font-semibold">
                      {plan.status?.toUpperCase()}
                    </span>
                    <Zap className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-heading text-2xl text-darktext mb-4">
                    {plan.planTitle}
                  </h3>
                  <p className="font-paragraph text-darktext/80 mb-6 leading-relaxed">
                    {plan.goal}
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="font-paragraph text-darktext/60">Start Date</span>
                      <span className="font-paragraph text-darktext">
                        {plan.startDate ? new Date(plan.startDate).toLocaleDateString() : 'TBD'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-paragraph text-darktext/60">End Date</span>
                      <span className="font-paragraph text-darktext">
                        {plan.endDate ? new Date(plan.endDate).toLocaleDateString() : 'TBD'}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                    View Full Plan
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-primary">
        <div className="max-w-[100rem] mx-auto px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-5xl text-primary-foreground mb-6">
              Accelerate Scientific Discovery
            </h2>
            <p className="font-paragraph text-primary-foreground/80 text-lg mb-12 max-w-3xl mx-auto">
              Join the next generation of researchers leveraging AI-driven insights, collaborative intelligence, and advanced visualization tools to push the boundaries of human knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Start Exploring
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-background border-t border-subtleborder">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h4 className="font-heading text-lg text-darktext mb-4">Platform</h4>
              <ul className="space-y-2 font-paragraph text-darktext/70">
                <li><Link to="/insights" className="hover:text-secondary transition-colors">Scientific Insights</Link></li>
                <li><Link to="/research-plans" className="hover:text-secondary transition-colors">Research Plans</Link></li>
                <li><Link to="/agents" className="hover:text-secondary transition-colors">AI Agents</Link></li>
                <li><Link to="/tools" className="hover:text-secondary transition-colors">Intelligent Tools</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg text-darktext mb-4">Knowledge</h4>
              <ul className="space-y-2 font-paragraph text-darktext/70">
                <li><Link to="/knowledge" className="hover:text-secondary transition-colors">Knowledge Network</Link></li>
                <li><Link to="/visualizations" className="hover:text-secondary transition-colors">Visualizations</Link></li>
                <li><Link to="/dashboard" className="hover:text-secondary transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg text-darktext mb-4">Resources</h4>
              <ul className="space-y-2 font-paragraph text-darktext/70">
                <li><a href="#" className="hover:text-secondary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Research Papers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg text-darktext mb-4">Contact</h4>
              <ul className="space-y-2 font-paragraph text-darktext/70">
                <li><a href="#" className="hover:text-secondary transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Collaboration</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Partnerships</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-subtleborder mt-12 pt-8 text-center">
            <p className="font-paragraph text-darktext/60">
              © 2024 Scientific Discovery Platform. Advancing human knowledge through artificial intelligence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}