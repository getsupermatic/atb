# AI Transparency Policy

_Effective: 8 May 2026 · Version: 1.0_

## 1. Introduction

At Beyond Limited (trading as Beyond — "we", "us", "our") is an AI-native company. We design, build, deploy, operate, and continuously improve AI systems for ourselves and for our clients. Because AI is at the centre of what we do, we hold ourselves to a high standard of transparency about how we use it.

This Policy explains:

- How Beyond uses AI in our own operations and on our website;
- How we design, build, deploy, and operate AI systems for clients;
- What our AI Blueprints — including Frontline OS, Generative Commerce, and Marketing OS — and our Infinity Engine do and how they are governed;
- How we handle data, capabilities, and limitations in AI contexts;
- How we apply ethical principles, governance, and human oversight;
- How regulatory requirements such as the EU AI Act, UK GDPR, the Data (Use and Access) Act 2025, and applicable US state AI laws are reflected in our approach.

Read this Policy together with our Privacy Policy, Cookie Policy, Website Terms and Conditions, and Responsible AI Policy.

## 2. Why transparency matters

AI systems can be opaque, unpredictable, and easy to misunderstand. Organisations deploying AI have a responsibility to be clear about:

- What AI can and cannot do in a given context;
- How AI systems make or influence decisions, at the right level of detail for the audience;
- What data they use, why, and where it goes;
- Who is accountable when something goes wrong;
- How systems are governed, monitored, evaluated, and improved over time.

We design our work so that these questions can always be answered — for ourselves, for our clients, for end-users, and for regulators.

## 3. Our approach to AI

### 3.1 What we mean by "AI"

We use the terms "AI" and "intelligent systems" to describe a range of technologies, including:

- Large language models (LLMs) used for natural language understanding and generation;
- Multi-agent systems and agentic workflows that orchestrate tasks across tools, data, and APIs;
- Machine-learning models for pattern recognition, classification, prediction, and ranking;
- Computer vision for image, video, and document analysis;
- Speech-to-text, text-to-speech, and voice interaction systems;
- Retrieval-augmented generation (RAG) over enterprise and operational knowledge;
- Decision-support systems combining rules, retrieval, and machine learning.

We distinguish between:

- **Generative AI** — systems that create content (text, images, audio, code).
- **Analytical AI** — systems that analyse, classify, predict, or rank.
- **Agentic systems** — systems that take actions in software environments using tools, APIs, and orchestration logic.
- **Automation** — rule-based or scripted systems that execute defined tasks deterministically.

### 3.2 Our philosophy

- **AI-native, not AI-flavoured.** AI is the centre of how Beyond works, not a feature bolted onto a traditional consultancy.
- **Practical over theoretical.** We focus on what works reliably today and ship production-grade systems quickly. We don't deploy experimental approaches in business-critical functions without appropriate controls and explicit agreement.
- **Augmentation, not unsupervised replacement.** AI amplifies human capability. For consequential decisions, accountability and judgement remain with people.
- **Honest about limitations.** We are explicit about what AI cannot do reliably, and we don't oversell certainty.
- **Governed by design.** Governance, evaluation, monitoring, security, and human oversight are designed in from day one — not bolted on later.

## 4. How Beyond uses AI

Because we are AI-native, AI is woven through Beyond's own operations as well as the work we deliver. Here is what we use it for, and how we govern it.

### 4.1 Internal productivity and operations

**What we use AI for:**

- Drafting and refining proposals, decks, reports, and documentation;
- Analysing requirements, structuring problem statements, and producing first-cut diagrams;
- Prototyping and exploring technical approaches, including agent and workflow design;
- Coding assistance, code review, and developer productivity (always with human review for any code that ships);
- Research, information synthesis, and competitive scans;
- Content ideation, editing, and quality control;
- Internal knowledge management, note-taking, and meeting summarisation.

**How we govern internal use:**

- We do not put client confidential information into general-purpose, public AI tools without explicit permission and appropriate safeguards;
- AI-assisted outputs are reviewed by humans before they go to clients or are published externally;
- Tools are approved through a defined process that considers data handling, training-data use, security posture, and contractual terms;
- Staff are trained on appropriate AI use, prompt and data hygiene, limitations, and incident handling.

**How we choose tools:**

- Data protection and security posture;
- Whether the provider uses inputs to train its models, and whether that can be turned off;
- Contractual terms (data processing agreements, sub-processors, retention, deletion);
- Vendor stability, reliability, and reputation;
- Practical productivity benefit and integration with the rest of our stack.

Specific tools change as the field evolves. You can request details of current tool categories at privacy@atbeyond.com.

### 4.2 Website and communications

**AI-assisted content**

- Website copy, design briefs, and marketing materials may be drafted or refined using AI tools, with human review.
- Email drafting may be AI-assisted, with human review.
- Internal research and analysis used to inform content may be AI-assisted, with human verification of facts and sources.

**What we don't do**

- Impersonate humans using AI in direct one-to-one client communications;
- Run hidden chatbots that pretend to be people;
- Generate fake testimonials, case studies, or reviews;
- Pass off AI-generated work as fully human-created where that would materially mislead a reader.

**Website AI features**

At the time of writing, our public website does not provide interactive AI features such as customer-facing chatbots, autonomous agents, or AI-driven personalisation. If we add such features, we will:

- Update this Policy to describe them;
- Disclose clearly when you are interacting with AI, in line with the EU AI Act's transparency obligations and applicable UK and US rules;
- Mark AI-generated synthetic content (for example, AI-generated images or audio) as artificially generated where required;
- Provide a route to a human or a fallback channel where appropriate.

### 4.3 Client engagement process

**During discovery, design, and delivery:**

- We may use AI internally to analyse client-provided information where that has been agreed and is appropriate;
- AI accelerates prototyping, exploration of solution options, and architecture work;
- All outputs are validated by human experts.

**Client data protection:**

- Client data is processed only under formal agreements and documented instructions;
- We do not use client data to train Beyond, third-party, or public AI models without explicit written agreement;
- Confidential information is processed in appropriate environments with agreed controls — for example, dedicated tenants, isolated workspaces, or model providers with no-train, no-retain configurations;
- AI processing of client data is documented within engagement design materials and DPAs.

## 5. The Infinity Engine and AI Blueprints

Beyond brings two interconnected layers of intellectual property to its work.

### 5.1 The Infinity Engine

The Infinity Engine is Beyond's internal agentic operating system — a coordinated set of specialised AI agents that we use to deliver client work and to power our own products. The Engine accelerates research, design, build, deployment, and ongoing operation of AI systems.

How we govern the Infinity Engine:

- Agent definitions, prompts, tool permissions, and guardrails are version-controlled and reviewed before changes are released into client-impacting environments;
- High-impact actions (for example, sending external communications, deploying code, or modifying production systems) are gated by human approval, defined permissions, or both;
- Inputs and outputs are logged so we can investigate behaviour and continuously improve safety and quality;
- Sensitive client data is handled within engagement-specific environments, not pooled across clients.

### 5.2 Beyond AI Blueprints

Beyond develops AI Blueprints — production-ready AI platforms designed for frontline workers and the teams that support them. Currently published Blueprints include:

- **Frontline OS** — an AI-native operating layer for frontline teams (voice-first guidance, real-time knowledge, and connection to back-office and contact centre teams).
- **Generative Commerce** — AI-native commerce experiences that bridge frontline staff, contact-centre agents, and customers through conversational and generative UX.
- **Marketing OS** — a unified marketing intelligence and experience layer covering strategy, campaign, creative, and communications.

Blueprints are deployed in dedicated, per-client environments under separate agreements. They are not run as a multi-tenant service from the public Beyond website. For each Blueprint we maintain documentation that describes the intended purpose, capabilities, known limitations, data flows, controls, and human-oversight points appropriate to the use case.

### 5.3 Engagement models

Beyond offers three primary engagement models. The transparency, governance, and AI-disclosure expectations described in this Policy apply across all three:

- **Subscribe & Deploy** — we host and run an AI Blueprint for the client, with continuous improvement.
- **Forward Deploy** — we customise a Blueprint to the client's specific frontline reality, brand, and workflows.
- **Frontier Advisory** — we co-innovate with clients to create new AI capabilities at the frontier.

## 6. How we build AI systems for clients

### 6.1 Design principles

- **Fit for purpose.** We match the solution to the problem. If a deterministic, rules-based, or simpler approach is better, we use it.
- **Human-in-the-loop where it matters.** For consequential decisions (for example, those affecting employment, credit, health, safety, or legal status), we design systems that support human decision-makers rather than replacing them.
- **Explainable and evaluable.** We define what "good" looks like up-front and use evaluation harnesses, tests, and observability to keep behaviour within bounds.
- **Secure and private by design.** Security, data protection, and AI-specific risks (for example, prompt injection and data exfiltration) are considered from the outset.
- **Governed from day one.** Operational governance, change control, and incident response are part of the design, not an afterthought.

### 6.2 Our delivery approach

Beyond delivers in compressed, weeks-not-quarters cycles, supported by the Infinity Engine. Across those cycles we move through, in some form:

- **Frame & Assess** — understand the problem, the people, the data, and the constraints; identify where AI adds genuine value and where it doesn't; surface risks and ethical considerations.
- **Design & Prototype** — define target outcomes and success metrics; design system architecture, data flows, and human-oversight points; select technologies and vendors; prototype to de-risk.
- **Build & Deploy** — engineer production-grade systems with security, logging, evaluation, and monitoring built in; integrate with existing systems and workflows; train operators on use, oversight, and limitations.
- **Operate & Evolve** — run the system, monitor performance and behaviour against agreed metrics, capture feedback and failure modes, and iterate on prompts, models, tools, and controls.

### 6.3 Technologies and vendors

We work with a range of providers, choosing the right combination per engagement. These typically include:

- Frontier model providers (for example, Anthropic, OpenAI, Google, Microsoft / Azure OpenAI, AWS Bedrock partners);
- Open-weight and self-hosted models (for example, Llama, Mistral, and similar) where data sensitivity, latency, or cost requires it;
- Cloud and edge platforms (for example, AWS, GCP, Azure, Vercel) for application hosting, data, and observability;
- Open-source AI tooling (for example, evaluation, retrieval, and orchestration libraries);
- Specialist APIs for vision, speech, search, and document processing.

**Vendor independence.** We maintain vendor independence and recommend technologies based on client needs, risk profile, regulatory context, and operational fit — not commissions.

### 6.4 What we tell end-users

When a system we build interacts with end-users (for example, frontline staff, customers, or contact-centre agents), we design — together with our clients — for:

- Clear AI disclosure, so users know when they are interacting with an AI system rather than a person;
- Plain-language explanation of what the system does, the kinds of input it accepts, and known limitations;
- Marking of AI-generated synthetic content (for example, AI-generated text, images, or voice) where required by law or where it would otherwise be misleading;
- Routes to human escalation where appropriate to the use case;
- Feedback mechanisms so users can flag issues and trigger review;
- Opt-out where practical (for example, alternative channels for users who prefer not to interact with AI).

## 7. AI capabilities and limitations

### 7.1 What AI is good at today

- Pattern recognition and summarisation across large volumes of structured and unstructured data;
- Drafting and transforming content at scale (with human review);
- Classification, routing, triage, and prioritisation;
- Augmenting humans on repetitive, high-volume tasks;
- Identifying anomalies and inconsistencies;
- Acting through tools to complete well-scoped tasks within defined permissions.

### 7.2 What AI is not good at

- Genuine understanding of context, intent, and nuance in the way humans do;
- Reliable common sense across novel situations;
- Ethical and value-laden judgement;
- Taking accountability for outcomes;
- Consistent performance in edge cases far from training data;
- Reliable, faithful explanations of its own reasoning (for many models).

### 7.3 Known risks

- Hallucinations and confidently-wrong outputs;
- Bias and unfair outcomes that reflect training data and design choices;
- Data dependency, drift, and degradation as the world changes;
- Security risks (prompt injection, jailbreaks, exfiltration, supply-chain risk);
- Privacy risks and accidental data exposure;
- Opaqueness and difficulty in explaining behaviour;
- Over-reliance and automation bias by human operators.

For critical use cases we design controls — including evaluation harnesses, guardrails, retrieval-grounding, output validators, redaction, and human review — to reduce these risks to a level appropriate for the context.

## 8. Data and privacy in AI systems

### 8.1 Client data

We apply:

- **Data minimisation** — only the data needed for the agreed purpose.
- **Purpose limitation** — used only for what has been agreed.
- **Retention and deletion** — defined per system, documented, and enforceable.

Security measures typically include:

- Encryption in transit and at rest;
- Authentication, authorisation, and access controls (including least privilege and SSO/MFA where possible);
- Audit logs and monitoring;
- Tenant or workspace isolation;
- Regular reviews proportionate to the risk of the system.

### 8.2 Training data vs inference data

- **Training data** is data used to build, fine-tune, or align models. We do not use sensitive client data to train Beyond, public, or third-party models without explicit, written consent.
- **Inference data** is data sent into a system at run-time (prompts, queries, uploads). For each system we document handling, retention, and the providers it touches.

### 8.3 Data processing agreements and sub-processors

Where vendors process personal data on behalf of Beyond or our clients, we ensure:

- Appropriate data processing terms are in place (UK GDPR Article 28 / EU GDPR Article 28 obligations, plus UK transfer safeguards as needed);
- Sub-processors are documented and made available to clients on request;
- Data flows are mapped and reviewed when material changes occur;
- Retention, deletion, and audit rights are clearly defined.

### 8.4 Personal data and high-stakes contexts

For special category data, children's data, or high-stakes decisions, we additionally require:

- A clear lawful basis and any required additional condition;
- Data Protection Impact Assessments (DPIAs) where required;
- Algorithmic Impact / AI risk assessments aligned to the EU AI Act risk tiers and ICO guidance;
- Human oversight, review processes, and override mechanisms;
- Regular testing for accuracy, fairness, and robustness.

## 9. Ethical principles and governance

### 9.1 Our ethical commitments

- **Fairness** — design to avoid discrimination and harmful bias.
- **Transparency** — clear disclosure and honest limitations.
- **Accountability** — humans remain accountable for outcomes.
- **Privacy** — privacy-by-design, data minimisation, and proportionate controls.
- **Safety and security** — safeguards against misuse, harm, and abuse.
- **Real value** — solve real problems for real people, not AI theatre.

### 9.2 Governance framework

For each client implementation, proportionate to risk, we establish:

- Named owners (business and technical) on Beyond and client sides;
- Acceptable use, change-control, and incident-response policies for the system;
- Evaluation and monitoring (performance, accuracy, bias, security, abuse) with thresholds and alerts;
- Documentation: architecture, data flows, model and tool inventory, risks and mitigations, runbooks;
- Periodic governance reviews appropriate to the system's risk and the regulatory context.

### 9.3 Risk management

We assess and manage:

- Operational risk (failure, downtime, drift, abuse);
- Ethical risk (bias, discrimination, harmful or misleading outputs);
- Legal and regulatory risk (UK GDPR / DUAA, EU GDPR, EU AI Act, sector-specific rules, IP);
- Reputational risk (trust, public perception, customer harm);
- Security risk (breach, manipulation, prompt injection, supply chain).

## 10. Human oversight and accountability

### 10.1 Human-in-the-loop where stakes require it

- AI provides recommendations or drafts; humans make final decisions for consequential actions;
- Clear escalation paths exist for uncertain or out-of-scope cases;
- Override capability is provided, logged, and reviewed;
- Sampling, review, and audit of outputs continues during operation.

### 10.2 Accountability structures

Every AI system we deliver has named owners responsible for:

- Performance and reliability;
- Compliance and governance;
- Handling user concerns and incidents;
- Continuous improvement.

### 10.3 No "the algorithm decided"

AI is a tool. Beyond and our clients remain responsible for the choice to deploy it, the way it is configured, the way it is monitored, and the way failures are handled. "The algorithm decided" is not an acceptable answer for harm or unfairness.

## 11. Transparency with clients and end-users

### 11.1 Client transparency

We provide, as appropriate to the engagement:

- System documentation, including data flows, model and tool inventory, and known limitations;
- Evaluation results, monitoring dashboards, and incident processes;
- Governance materials and operator training;
- Support for the client's own regulatory obligations (DPIAs, AI risk assessments, EU AI Act conformity work, ICO/UK regulator engagement).

### 11.2 End-user transparency

Where end-users interact with systems we have helped build, they receive — designed jointly with the client — clear AI disclosure, plain-language explanation, information about how their data is used, support routes, and (where applicable) human review.

### 11.3 Regulatory alignment

We design systems with the following frameworks in mind, and adapt our approach as guidance and law develop:

- UK GDPR, the Data Protection Act 2018, and the Data (Use and Access) Act 2025 (DUAA);
- PECR (and ICO guidance, including updated cookie guidance issued in April 2026);
- EU GDPR and ePrivacy rules where they apply;
- EU AI Act — including general-purpose AI obligations, transparency obligations, and prohibitions, applied per the Act's risk tiering and timetable;
- UK government and ICO guidance on AI;
- US state privacy laws (CCPA/CPRA and equivalents) and emerging state AI laws (for example, Colorado AI Act);
- Sector-specific rules where they apply to a client's context.

## 12. Intellectual property and AI

### 12.1 AI-generated content

- AI-generated outputs may have unclear copyright status in some jurisdictions; we navigate this with our clients on a per-engagement basis;
- We document where content is AI-assisted, where that materially affects how it should be used or interpreted;
- We do not claim purely human authorship for AI-generated work where doing so would mislead;
- Where required by the EU AI Act or other law, AI-generated synthetic content is marked as artificially generated.

### 12.2 Training data and IP

- Client data remains client property;
- We don't use client data to train Beyond, third-party, or public AI models without permission;
- Beyond's methodologies, frameworks, Blueprints, prompts, agent designs, and the Infinity Engine remain Beyond's IP — see our Website Terms and Conditions for the relevant boundaries.

## 13. Continuous improvement

We improve systems and our own practice through:

- Monitoring, evaluation, and feedback loops;
- Incident tracking, root cause analysis, and lessons learned;
- Testing changes before rollout to production-impacting environments;
- Updating models and tools as providers evolve them, with appropriate change control;
- Sharing internal learnings across engagements within the bounds of confidentiality.

We review this Policy at least annually, and sooner if our AI use changes materially, new regulations take effect, significant incidents occur, or industry best practice shifts.

## 14. Limitations of this Policy

This Policy describes our approach and commitments. It:

- Does not override specific contractual agreements with clients;
- Is not legal advice;
- Does not guarantee outcomes — AI systems can fail despite best practice.

Warranties, service levels, indemnities, and similar commitments are defined in client contracts, not in this Policy.

## 15. Questions, concerns, and feedback

- **General policy questions:** ai@atbeyond.com — Subject: AI Transparency Policy.
- **Concerns about a specific Beyond AI implementation:** ai@atbeyond.com — Subject: AI Implementation Concern.

If you are an end-user of a system Beyond has helped build, please contact the organisation operating the system in the first instance. If you cannot get an answer, contact us and we will direct you appropriately.

## 16. Useful resources

- ICO AI guidance: [ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/)
- EU AI Act resources: [artificialintelligenceact.eu](https://artificialintelligenceact.eu)
- UK Government AI publications: [gov.uk/government/publications](https://www.gov.uk/government/publications)
- Alan Turing Institute: [turing.ac.uk](https://www.turing.ac.uk)

## 17. Contact

- **Email:** ai@atbeyond.com
- **Company:** At Beyond Limited (Company No. 17146628)
- **Registered office:** 71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ

For AI-specific queries, please mark your email "Attention: AI Transparency".
