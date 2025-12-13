// Example data for "Try Example" buttons

export const exampleEmail = `Subject: URGENT - Q3 Budget Review + Client Meeting

Hi,

I need you to look at the Q3 budget proposal before our meeting with Sarah tomorrow at 2pm.
There are some discrepancies in the marketing spend that don't match what we discussed last week.

Also, can you send me the updated revenue report by Friday? The board is asking for it and
I promised them we'd have final numbers.

One more thing - please schedule a follow-up call with the Acme team. They mentioned some
concerns about the delivery timeline and I want to address it before it becomes a bigger issue.

Let me know if you have questions.

Thanks,
John`

export const exampleMeetingTranscript = `[Meeting transcript - Weekly Team Sync - January 15, 2024]

Dan: Okay, let's get started. First item is the Q3 marketing budget. Sarah, where are we on that?

Sarah: So I talked to finance and they approved the $50K we requested. We can move forward with the campaign.

Dan: Great. That's confirmed then. Now, about the product launch - I know we were targeting February but given the delays...

Mike: Yeah, the development team needs at least 6 more weeks. We're dealing with some integration issues.

Dan: Okay, so we're looking at March then. Let's make that official - launch is postponed to March 15th.

Sarah: I'll update the timeline and send it to everyone by EOD tomorrow.

Dan: Perfect. Last thing - we need to start the hiring process for the two developer positions. Mike, can you draft the job posting?

Mike: Sure, I'll have it ready by Friday.

Dan: Great. Oh, one more thing - we still haven't decided on the vendor for the new CRM. Let's table that for next week. Also, we need to discuss Q4 targets but we're out of time. Let's add that to next week's agenda.

Sarah: Sounds good. Anything else?

Dan: That's it. Thanks everyone.`

export const exampleProposal = {
  clientName: 'Acme Corporation',
  contactName: 'John Smith',
  projectType: 'Consulting',
  description: 'Process automation audit and implementation for the operations department. Review current workflows, identify automation opportunities, and implement solutions to reduce manual data entry by 50%.',
  timeline: '1 month',
  price: 15000,
  currency: 'USD',
}

// Mock responses for when API is not available
export const mockDocumentResponse = {
  document_type: 'Invoice',
  confidence: 0.96,
  fields: {
    document_number: 'INV-2024-0847',
    date: '2024-01-15',
    due_date: '2024-02-15',
    vendor_name: 'Acme Supplies Ltd',
    vendor_address: '123 Industrial Ave, Tel Aviv',
    total_amount: 12450.00,
    currency: 'USD',
  },
  line_items: [
    { description: 'Widget A', quantity: 100, unit_price: 50, total: 5000 },
    { description: 'Widget B', quantity: 50, unit_price: 149, total: 7450 },
  ],
}

export const mockEmailResponse = {
  priority: 'HIGH',
  tags: ['urgent', 'client', 'finance', 'deadline'],
  tasks: [
    { task: 'Review Q3 budget proposal', deadline: 'Before tomorrow 2pm', assignee: null },
    { task: 'Send updated revenue report', deadline: 'Friday', assignee: null },
    { task: 'Schedule follow-up call with Acme team', deadline: 'ASAP', assignee: null },
  ],
  summary: 'John needs urgent review of Q3 budget before tomorrow\'s meeting with Sarah. Also requesting revenue report by Friday and a follow-up call with Acme regarding delivery concerns.',
  suggested_reply: `Hi John,

Thank you for the heads up. I'll review the Q3 budget proposal today and have my notes ready before tomorrow's 2pm meeting with Sarah.

I'll send the updated revenue report by Thursday to give you time to review before Friday.

I'll reach out to the Acme team today to schedule a call this week regarding the delivery timeline concerns.

Let me know if you need anything else before the meeting.

Best,
[Your name]`,
}

export const mockMeetingResponse = {
  summary: 'Weekly team sync covering Q3 marketing budget approval, product launch postponement to March 15th, and initiation of hiring process for two developer positions.',
  decisions: [
    { decision: 'Approved $50K marketing budget for Q3 campaign', owner: 'Finance/Sarah' },
    { decision: 'Product launch postponed from February to March 15th', owner: 'Team' },
    { decision: 'Proceed with hiring two developer positions', owner: 'Mike' },
  ],
  action_items: [
    { task: 'Update timeline and distribute to team', owner: 'Sarah', deadline: 'EOD tomorrow' },
    { task: 'Draft job posting for developer positions', owner: 'Mike', deadline: 'Friday' },
  ],
  open_questions: [
    { question: 'Vendor selection for new CRM', status: 'Tabled for next week' },
    { question: 'Q4 targets discussion', status: 'Added to next week\'s agenda' },
  ],
}

export const mockProposalResponse = {
  executive_summary: `This proposal outlines a comprehensive process automation engagement for Acme Corporation's operations department. Our approach combines thorough workflow analysis with practical automation implementation to achieve measurable efficiency gains.`,
  scope_of_work: [
    'Conduct detailed assessment of current operational workflows',
    'Document all manual processes and data entry points',
    'Identify high-impact automation opportunities',
    'Design and implement automation solutions',
    'Provide training and documentation for team adoption',
    'Deliver post-implementation support and optimization',
  ],
  deliverables: [
    'Comprehensive workflow audit report',
    'Automation opportunity matrix with ROI projections',
    'Implemented automation solutions (minimum 3 processes)',
    'User training materials and documentation',
    'Post-implementation performance report',
  ],
  timeline_breakdown: [
    { phase: 'Discovery & Assessment', duration: 'Week 1', description: 'Workflow mapping and opportunity identification' },
    { phase: 'Design & Planning', duration: 'Week 2', description: 'Solution architecture and implementation plan' },
    { phase: 'Implementation', duration: 'Week 3', description: 'Build and deploy automation solutions' },
    { phase: 'Training & Handoff', duration: 'Week 4', description: 'Team training and documentation delivery' },
  ],
  terms: [
    'Payment: 50% upon signing, 50% upon completion',
    'Changes to scope may affect timeline and pricing',
    'Client to provide access to relevant systems and stakeholders',
    'All deliverables remain property of client upon final payment',
  ],
}
