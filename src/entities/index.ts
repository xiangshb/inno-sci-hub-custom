/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: intelligentagents
 * Interface for IntelligentAgents
 */
export interface IntelligentAgents {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  specialization?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  agentImage?: string;
  /** @wixFieldType date */
  creationDate?: Date | string;
}


/**
 * Collection ID: intelligenttools
 * Interface for IntelligentTools
 */
export interface IntelligentTools {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  toolName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  integrationDetails?: string;
  /** @wixFieldType text */
  toolType?: string;
  /** @wixFieldType text */
  developer?: string;
  /** @wixFieldType url */
  documentationUrl?: string;
  /** @wixFieldType text */
  version?: string;
}


/**
 * Collection ID: knowledgenetworkconcepts
 * Interface for KnowledgeNetworkConcepts
 */
export interface KnowledgeNetworkConcepts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  conceptName?: string;
  /** @wixFieldType text */
  definition?: string;
  /** @wixFieldType text */
  relatedConcepts?: string;
  /** @wixFieldType text */
  conceptType?: string;
  /** @wixFieldType text */
  keywords?: string;
  /** @wixFieldType url */
  sourceUrl?: string;
}


/**
 * Collection ID: researchplans
 * Interface for ResearchPlans
 */
export interface ResearchPlans {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  planTitle?: string;
  /** @wixFieldType text */
  goal?: string;
  /** @wixFieldType text */
  methodology?: string;
  /** @wixFieldType text */
  keyMilestones?: string;
  /** @wixFieldType date */
  startDate?: Date | string;
  /** @wixFieldType date */
  endDate?: Date | string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType text */
  planSummary?: string;
}


/**
 * Collection ID: scientificinsights
 * Interface for ScientificInsights
 */
export interface ScientificInsights {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  summary?: string;
  /** @wixFieldType text */
  detailedExplanation?: string;
  /** @wixFieldType date */
  discoveryDate?: Date | string;
  /** @wixFieldType text */
  aiModelUsed?: string;
  /** @wixFieldType number */
  relevanceScore?: number;
  /** @wixFieldType text */
  keywords?: string;
}


/**
 * Collection ID: visualizationanalysis
 * Interface for VisualizationAnalysis
 */
export interface VisualizationAnalysis {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType image */
  visualizationImage?: string;
  /** @wixFieldType text */
  summary?: string;
  /** @wixFieldType date */
  analysisDate?: Date | string;
  /** @wixFieldType url */
  sourceUrl?: string;
  /** @wixFieldType text */
  keyMetrics?: string;
}
