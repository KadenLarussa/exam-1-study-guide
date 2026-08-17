export type StudyTerm = {
  term: string;
  definition: string;
  chapter: string;
  category: string;
};

const parseTerms = (chapter: string, category: string, rows: string): StudyTerm[] =>
  rows.trim().split("\n").map((row) => {
    const [term, definition] = row.split("\t");
    return { term: term.trim(), definition: definition.trim(), chapter, category };
  });

export const studyTerms: StudyTerm[] = [
  ...parseTerms("1", "Advanced prehospital care", `
advanced prehospital emergency medicine\tThe delivery of advanced assessment and treatment before a patient reaches definitive care.
ambulance Type I\tA modular ambulance body mounted on a conventional truck chassis with a separate cab.
ambulance Type II\tA van-style ambulance with a raised roof and an integrated patient compartment.
ambulance Type III\tA modular ambulance body mounted on a cutaway van chassis with cab access to the patient compartment.
medical terminology\tA standardized vocabulary used to describe anatomy, illness, injury, assessment, and treatment precisely.
  `),
  ...parseTerms("2", "EMS systems", `
accreditation\tFormal recognition that an educational program or institution meets established standards.
bystander\tA person present at an emergency who may activate EMS or provide immediate aid.
certification\tA credential showing that a person has met specified knowledge and skill requirements.
chain of survival\tA linked sequence of actions that improves survival from cardiac arrest.
clinical treatment guidelines\tEvidence-informed recommendations that guide patient assessment and care.
cognitive offloading\tUsing checklists, references, or devices to reduce demands on working memory.
continuous quality improvement (CQI)\tAn ongoing process of measuring performance and improving EMS care and systems.
Department of Homeland Security\tThe US federal department responsible for coordinating national security and emergency preparedness functions.
Emergency Medical Dispatcher (EMD)\tA trained dispatcher who prioritizes calls, gives prearrival instructions, and coordinates EMS response.
ethics\tPrinciples that guide judgments about right conduct and professional obligations.
evidence-based medicine (EBM)\tIntegrating the best research evidence with clinical expertise and patient needs.
helicopter air ambulances (HAA)\tRotor-wing aircraft configured to transport and provide care to patients.
interoperability\tThe ability of agencies, personnel, and systems to communicate and work together.
intervener physician\tAn on-scene physician who offers assistance but is not part of the responding EMS system.
licensure\tLegal authorization from a governmental body to practice within a defined scope.
medical director\tA physician responsible for clinical leadership and medical oversight of an EMS system.
National Highway Traffic Safety Administration (NHTSA)\tThe federal agency with a major role in national EMS system standards and development.
National Incident Management System (NIMS)\tA standardized national framework for managing incidents across agencies and jurisdictions.
National Transportation Safety Board (NTSB)\tAn independent federal agency that investigates transportation accidents and issues safety recommendations.
off-line medical oversight\tStanding clinical direction provided through protocols, policies, education, and quality review.
on-line medical direction\tReal-time clinical orders or consultation from an authorized physician or base station.
Ontario Prehospital Advanced Life Support (OPALS) study\tA major prehospital research program that evaluated system-level effects of advanced life support interventions.
peer review\tEvaluation of clinical work by qualified professional colleagues.
prearrival instruction\tEmergency care directions given by dispatchers before responders arrive.
profession\tAn occupation requiring specialized knowledge, standards, service, and accountability.
professionalism\tConsistent ethical, competent, respectful, and accountable behavior in practice.
prospective medical oversight\tClinical oversight performed before care through education, credentialing, protocols, and planning.
reciprocity\tRecognition of a credential or license issued by another jurisdiction.
registration\tPlacement of a qualified practitioner on an official roster or registry.
research\tSystematic investigation designed to develop or contribute to knowledge.
retrospective medical oversight\tClinical oversight after care through chart review, audit, feedback, and quality improvement.
rules of evidence\tStandards that determine what information may be admitted and considered in legal proceedings.
scope of practice\tThe legally permitted range of services and procedures for a licensed practitioner.
standing orders\tPreauthorized medical directions that permit specified care without real-time physician contact.
teachable moment\tA situation in which a learner is especially ready to understand and retain a lesson.
tiered response\tDispatching different levels or types of resources according to call need.
trauma\tPhysical injury caused by an external force or mechanism.
trauma center\tA hospital verified or designated to provide defined levels of specialized trauma care.
  `),
  ...parseTerms("3", "Roles and responsibilities", `
allied health professions\tHealth occupations that support diagnosis, treatment, rehabilitation, and prevention outside medicine and nursing.
clinician\tA health professional who directly assesses and treats patients.
EMS practitioner\tA credentialed professional who provides emergency medical assessment and care.
mechanism of injury (MOI)\tThe forces and events that caused a traumatic injury.
mentoring\tA developmental relationship in which an experienced practitioner guides another person.
nature of the illness (NOI)\tThe general type or cause of a patient's medical problem.
paramedicine\tThe profession and body of practice concerned with out-of-hospital emergency and mobile health care.
pathophysiology\tThe functional changes in the body produced by disease or injury.
primary care\tFirst-contact, continuing care that addresses common health needs and coordinates services.
  `),
  ...parseTerms("4", "Safety and wellness", `
burnout\tWork-related exhaustion, cynicism, and reduced sense of effectiveness caused by prolonged stress.
circadian rhythm\tThe approximately 24-hour biological cycle that regulates sleep, alertness, and other functions.
cleaning\tRemoval of visible soil and organic material from an object or surface.
Code Green Campaign\tA mental health advocacy and education initiative focused on first responders.
compassion fatigue\tEmotional and physical depletion associated with repeated exposure to others' suffering.
disinfection\tUse of physical or chemical means to destroy many pathogenic microorganisms on inanimate objects.
employee assistance program (EAP)\tEmployer-sponsored confidential services that help workers address personal or work-related problems.
exposure\tContact with a potentially harmful agent through a route capable of causing infection or injury.
incubation period\tThe time between exposure to an infectious agent and the appearance of symptoms.
infectious disease\tAn illness caused by a transmissible pathogenic organism or its products.
isometric exercise\tMuscle contraction without significant joint movement or change in muscle length.
isotonic exercise\tMuscle contraction that produces movement through a range of motion.
moral injury\tLasting distress after actions or events that violate a person's deeply held moral beliefs.
pathogen\tA microorganism or agent capable of causing disease.
peer support\tStructured or informal help provided by colleagues with shared professional experience.
personal protective equipment (PPE)\tWearable barriers used to reduce exposure to hazards.
post-traumatic stress disorder (PTSD)\tA trauma-related disorder involving intrusive symptoms, avoidance, mood changes, and heightened arousal.
resilience\tThe capacity to adapt, recover, and continue functioning after adversity.
sleep hygiene\tHabits and environmental practices that support consistent, restorative sleep.
Standard Precautions\tInfection-control practices applied to all patients based on anticipated exposure.
sterilization\tA process that destroys all microbial life, including bacterial spores.
stress\tThe physical and psychological response to demands or threats.
stressor\tAn event, condition, or stimulus that produces a stress response.
Tema Conter Memorial Trust\tA Canadian organization supporting research, education, and peer support for public-safety personnel mental health.
work-life balance\tA sustainable allocation of time and energy between work and personal life.
  `),
  ...parseTerms("5", "EMS research", `
abstract\tA brief summary of a study's purpose, methods, results, and conclusions.
analysis of variance (ANOVA)\tAn inferential test that compares means across three or more groups.
bench research\tLaboratory research performed under controlled conditions, often before clinical testing.
bias\tA systematic influence that distorts study design, measurement, analysis, or interpretation.
case report\tA detailed description of one patient or clinical event.
case series\tA descriptive report of several patients with a shared feature or exposure.
chi square test\tA test of association between categorical variables using observed and expected frequencies.
cohort study\tAn observational study that follows groups defined by exposure to compare outcomes.
confidence interval\tA range of plausible values for a population parameter at a stated confidence level.
control group\tA comparison group that does not receive the experimental intervention or receives usual care or placebo.
convenience sampling\tSelecting participants because they are readily available.
cross-sectional study\tAn observational study measuring exposure and outcome at one point or short period in time.
data dredging\tSearching many analyses for significant findings without a prespecified hypothesis.
data mining\tSystematically exploring large datasets to identify patterns or relationships.
dependent variable\tThe measured outcome expected to change in response to an independent variable.
descriptive statistics\tMethods that summarize and display the features of collected data.
double blind study\tA study in which participants and relevant investigators or assessors do not know group assignments.
experiment\tA controlled investigation in which a variable is manipulated to observe its effect.
experimental group\tThe group that receives the intervention being tested.
experimental study\tA study in which investigators assign an intervention and measure its effects.
external validity\tThe extent to which study findings generalize to other people, settings, or times.
hypothesis\tA specific, testable prediction about a relationship or effect.
in vitro\tPerformed outside a living organism in a controlled laboratory environment.
in vivo\tPerformed in or on a living organism.
independent variable\tThe factor manipulated or used to define groups as a possible cause or predictor.
inferential statistics\tMethods that use sample data to estimate, compare, or draw conclusions about a population.
institutional review board (IRB)\tA committee that reviews human-subject research for ethical and regulatory protection.
internal validity\tThe degree to which a study supports a trustworthy causal conclusion for its participants.
iterative process\tA repeated cycle of testing, feedback, revision, and refinement.
mean\tThe arithmetic average calculated by dividing the sum by the number of observations.
measures of central tendency\tStatistics describing the center of a distribution, commonly mean, median, and mode.
median\tThe middle value after observations are ordered.
meta-analysis\tA statistical synthesis that combines results from multiple compatible studies.
mixed research\tResearch that integrates quantitative and qualitative methods in one investigation.
mode\tThe most frequently occurring value or category.
morbidity\tIllness, injury, disability, or disease burden in a population.
mortality\tDeath or the frequency of death in a population.
National EMS Research Agenda\tA national framework that identifies priorities and infrastructure needs for EMS research.
nominal data\tCategorical data represented by names or labels with no inherent order.
nonrandomized controlled trial\tA controlled intervention study in which assignment is not determined by randomization.
null hypothesis\tThe default claim that no true difference or association exists.
observational study\tA study in which investigators measure variables without assigning an intervention.
odds ratio\tA ratio comparing the odds of an outcome or exposure between groups.
open access journals\tScholarly journals that make articles available to readers without a subscription paywall.
ordinal data\tCategorical data with a meaningful rank order but unequal or unknown spacing.
outcomes-based research\tResearch focused on the results of health care for patients or populations.
P value\tUnder the null hypothesis, the probability of results at least as extreme as those observed.
parameter\tA numerical characteristic of an entire population.
peer review\tEvaluation of scholarly work by experts before or after publication.
placebo\tAn inactive or sham intervention designed to resemble the treatment being studied.
population\tThe entire group about which a researcher wants to draw conclusions.
post hoc\tPlanned or conducted after results are known rather than specified in advance.
principal investigator (PI)\tThe person with primary responsibility for a research study.
prospective study\tA study that defines participants and then observes future exposures or outcomes.
PubMed\tA free database for searching biomedical and life-science literature.
qualitative research\tResearch that explores meaning, experience, or process using nonnumeric information.
qualitative statistics\tDescriptive handling or summarization of categorical or nonnumeric information.
quality of life\tA person's perceived physical, psychological, and social well-being.
quantitative research\tResearch that measures variables numerically and analyzes them statistically.
quantitative statistics\tNumerical methods used to summarize or infer patterns in measured data.
quasiexperimental study\tAn intervention study lacking random assignment or another feature of a true experiment.
random sampling\tSelecting members of a population so each has a known, often equal, chance of selection.
randomized controlled trial (RCT)\tAn experiment that randomly assigns participants to intervention and control groups.
research\tSystematic investigation designed to develop or contribute to generalizable knowledge.
retrospective study\tA study that examines existing records or past exposures and outcomes.
sampling error\tThe chance difference between a sample estimate and the true population value.
science\tAn organized method and body of knowledge based on observation, testing, and evidence.
scientific method\tA structured process of observation, question, hypothesis, testing, analysis, and revision.
single blind study\tA study in which one key party, usually the participants, does not know treatment assignment.
standard deviation (SD or sigma)\tA measure of how far observations typically spread around the mean.
statistics\tThe science of collecting, organizing, analyzing, and interpreting data.
systematic sampling\tSelecting every kth member after a starting point is chosen.
t test\tAn inferential test used to compare one or two means under specified assumptions.
time sampling\tCollecting observations at specified times or intervals.
treatment group\tThe study group that receives the intervention or exposure of interest.
validity\tThe degree to which a measure or conclusion accurately represents what it claims.
variance\tThe average squared deviation from the mean; the square of standard deviation.
  `),
  ...parseTerms("20", "Emergency pharmacology", `
active transport\tMovement across a membrane using cellular energy, often against a concentration gradient.
adjunct medication\tA drug given to support or enhance the effect of a primary treatment.
adrenergic\tRelating to receptors or effects activated by epinephrine or norepinephrine.
affinity\tThe strength with which a drug binds to its receptor.
agonist\tA substance that binds to a receptor and activates a response.
agonist-antagonist\tA drug that activates some receptor effects while blocking others.
analgesia\tAbsence or reduction of the sensation of pain.
analgesic\tA medication that relieves pain without necessarily causing loss of all sensation.
anesthesia\tLoss of sensation, which may include loss of consciousness.
anesthetic\tA medication or agent that produces loss of sensation.
antacid\tA medication that neutralizes or reduces gastric acidity.
antagonist\tA substance that binds to a receptor and blocks an agonist response.
antiarrhythmic\tA medication used to prevent or treat abnormal cardiac rhythms.
antibiotic\tA medication that kills or inhibits susceptible bacteria.
anticoagulant\tA medication that reduces formation or extension of blood clots by affecting coagulation.
antiemetic\tA medication used to prevent or treat nausea and vomiting.
antifibrinolytic\tA medication that slows clot breakdown by inhibiting fibrinolysis.
antihistamine\tA medication that blocks histamine receptors and reduces histamine-mediated effects.
antihyperlipidemic\tA medication used to lower abnormal blood lipid levels.
antihypertensive\tA medication used to lower elevated blood pressure.
antineoplastic agent\tA medication used to inhibit or destroy cancer cells.
antiplatelet\tA medication that reduces platelet activation or aggregation.
antitussive\tA medication used to suppress coughing.
assay\tA test used to determine the presence, amount, or activity of a substance.
autonomic ganglia\tClusters of nerve cell bodies where preganglionic and postganglionic autonomic neurons connect.
autonomic nervous system\tThe involuntary motor system controlling smooth muscle, cardiac muscle, and glands.
bioassay\tMeasurement of a substance's potency or concentration by its effect on living tissue.
bioavailability\tThe fraction of an administered dose that reaches systemic circulation unchanged.
bioequivalence\tComparable rate and extent of absorption between two drug products.
biologic half-life\tThe time required for the amount or concentration of a drug in the body to fall by half.
biotransformation\tChemical alteration of a drug by the body, usually through metabolism.
blood-brain barrier\tA selective barrier limiting passage of substances from blood into central nervous tissue.
carrier-mediated diffusion\tMovement across a membrane with a carrier protein and no direct energy expenditure.
cholinergic\tRelating to acetylcholine receptors, neurons, or effects.
competitive antagonism\tReversible competition between agonist and antagonist for the same receptor site.
diffusion\tPassive movement of particles from higher to lower concentration.
diuretic\tA medication that increases urine production and excretion.
dose packaging\tPreparation and labeling of medication in amounts intended for administration.
down-regulation\tA decrease in receptor number or responsiveness after sustained stimulation.
drug\tA chemical substance that alters a biological function.
medication-response relationship\tThe association between the dose or concentration of a medication and the effect it produces.
medication duration of action\tThe time from onset until a medication's clinically useful effect ends.
efficacy\tThe maximum effect a medication can produce.
enteral route\tAdministration through the gastrointestinal tract, such as oral or rectal delivery.
expectorant\tA medication that helps mobilize and expel respiratory secretions.
extrapyramidal symptoms\tDrug-related movement disorders such as dystonia, akathisia, or parkinsonism.
facilitated diffusion\tPassive carrier-assisted movement down a concentration gradient.
fibrinolytic\tA medication that promotes breakdown of fibrin within blood clots.
filtration\tMovement of water and small solutes across a membrane due to pressure differences.
first-pass effect\tMetabolism of an absorbed drug in the gut wall or liver before it reaches systemic circulation.
free drug availability\tThe unbound fraction of a drug available to cross membranes and act at receptors.
glucagon\tA pancreatic hormone and medication that raises blood glucose and can increase cardiac cyclic AMP.
hemostasis\tThe physiological process that stops bleeding.
histamine\tA mediator involved in allergic responses, gastric secretion, and local inflammation.
hydrolyze\tTo split a chemical bond through reaction with water.
hypnosis\tA drug-induced state resembling sleep.
immunity\tThe body's capacity to resist or respond to infection or foreign substances.
insulin\tA pancreatic hormone and medication that promotes cellular glucose uptake and lowers blood glucose.
ionize\tTo gain or lose charged particles and exist in an electrically charged form.
irreversible antagonism\tLong-lasting receptor blockade that cannot be overcome simply by adding more agonist.
laxative\tA medication that promotes bowel evacuation.
leukotrienes\tInflammatory lipid mediators that can cause bronchoconstriction and increase vascular permeability.
medications\tDrugs used to diagnose, prevent, treat, or relieve disease and symptoms.
metabolism\tEnzymatic chemical conversion of a drug, often to facilitate elimination.
minimum effective concentration\tThe lowest plasma concentration expected to produce the desired clinical effect.
mucolytic\tA medication that reduces the thickness or viscosity of mucus.
neuroeffector junction\tThe site where an autonomic nerve ending communicates with its target tissue.
neuroleptanesthesia\tAn anesthetic state produced by combining a neuroleptic with a potent opioid analgesic.
neuroleptic\tA medication that reduces psychotic symptoms, commonly an antipsychotic.
neuron\tA cell specialized to receive, process, and transmit nerve signals.
neurotransmitter\tA chemical messenger released by a neuron to signal another cell.
noncompetitive antagonism\tBlockade that reduces receptor response without competing reversibly at the agonist binding site.
onset of action\tThe time from administration until a medication first produces a measurable effect.
organic nitrates\tVasodilator medications that release nitric oxide, such as nitroglycerin.
osmosis\tPassive movement of water across a semipermeable membrane toward higher solute concentration.
oxidize\tTo chemically remove electrons or add oxygen during a reaction.
parasympatholytic\tA drug that blocks parasympathetic cholinergic effects.
parasympathomimetic\tA drug that stimulates or mimics parasympathetic cholinergic effects.
parenteral route\tAdministration outside the gastrointestinal tract, commonly by injection.
partial agonist\tA receptor agonist that produces less than the maximal response even with full receptor occupancy.
passive transport\tMovement across a membrane without cellular energy expenditure.
pathogen\tAn organism or agent capable of causing disease.
pharmacodynamics\tWhat a drug does to the body, including receptor effects and dose-response relationships.
pharmacokinetics\tWhat the body does to a drug through absorption, distribution, metabolism, and elimination.
pharmacology\tThe study of drugs and their interactions with living systems.
placental barrier\tThe selective interface that regulates transfer between maternal and fetal circulations.
plasma-level profile\tThe pattern of drug concentration in plasma over time.
platelet aggregation inhibitor\tA medication that reduces platelets sticking together to form a plug.
postganglionic nerves\tAutonomic fibers extending from a ganglion to an effector organ.
preganglionic nerves\tAutonomic fibers extending from the central nervous system to an autonomic ganglion.
prodrug\tAn inactive or less active substance converted in the body to an active drug.
prototype\tA representative medication used to illustrate the properties of a drug class.
psychotherapeutic medication\tA drug used to treat psychiatric or behavioral symptoms.
receptor\tA cellular target that binds a ligand and initiates or modifies a response.
second messenger\tAn intracellular signal molecule activated after a receptor is stimulated.
sedation\tA drug-induced reduction in anxiety, awareness, or responsiveness.
serum\tThe liquid portion of blood remaining after clotting factors are removed by clot formation.
side effect\tA secondary effect that occurs in addition to the intended therapeutic effect.
surfactant\tA substance that reduces surface tension; pulmonary surfactant helps keep alveoli open.
sympatholytic\tA drug that inhibits sympathetic nervous system effects.
sympathomimetic\tA drug that stimulates or mimics sympathetic adrenergic effects.
synapse\tA junction where one neuron communicates with another cell.
teratogenic medication\tA drug capable of disrupting embryonic or fetal development and causing birth defects.
termination of action\tThe ending of a drug effect through redistribution, metabolism, elimination, or receptor changes.
therapeutic index\tA comparison of toxic and effective doses that reflects a drug's safety margin.
up-regulation\tAn increase in receptor number or responsiveness after reduced stimulation or blockade.
vaccine\tA biological preparation that stimulates adaptive immunity against a specific disease.
  `),
];

export type DrugCard = {
  generic: string;
  brand: string;
  classification: string;
  action: string;
  indications: string;
  contraindications: string;
  dose: string;
  routes: string;
  adverse: string;
  note: string;
};

export const drugCards: DrugCard[] = [
  { generic:"Morphine", brand:"Duramorph", classification:"Opioid narcotic analgesic", action:"Binds opioid receptors to produce analgesia and sedation.", indications:"Moderate to severe pain", contraindications:"Hypotension; hypersensitivity", dose:"2-10 mg", routes:"IV, IO, IM, SQ, PO", adverse:"Hypotension, syncope, bradycardia or tachycardia, apnea, nausea, vomiting, respiratory depression", note:"Use appropriate monitoring; naloxone is an antagonist." },
  { generic:"Hydromorphone", brand:"Dilaudid", classification:"Opioid narcotic analgesic", action:"Binds opioid receptors to produce analgesia and sedation.", indications:"Moderate to severe pain", contraindications:"Hypersensitivity", dose:"0.5-2 mg", routes:"IV, IO, IM, SQ, PO", adverse:"Nausea, vomiting, cramps, respiratory depression", note:"Use appropriate monitoring; naloxone is an antagonist." },
  { generic:"Fentanyl", brand:"Sublimaze", classification:"Opioid narcotic analgesic", action:"Binds opioid receptors to produce analgesia.", indications:"Moderate to severe pain; anesthetic use", contraindications:"Hypersensitivity", dose:"50-100 mcg", routes:"IV, IO, IM, SQ, IN", adverse:"Nausea, vomiting, cramps, chest-wall rigidity, respiratory depression", note:"Use appropriate monitoring; naloxone is an antagonist." },
  { generic:"Meperidine", brand:"Demerol", classification:"Opioid narcotic analgesic", action:"Binds opioid receptors to produce analgesia.", indications:"Moderate to severe pain", contraindications:"Hypersensitivity; concurrent MAOI use", dose:"25-100 mg", routes:"IV, IO, IM, SQ, PO", adverse:"Nausea, vomiting, euphoria, dysphoria, respiratory depression", note:"Use appropriate monitoring; naloxone is an antagonist." },
  { generic:"Acetaminophen", brand:"Tylenol / OFIRMEV", classification:"Nonnarcotic analgesic and antipyretic", action:"Exact mechanism is uncertain; believed to inhibit cyclooxygenase.", indications:"Mild to moderate pain; fever", contraindications:"Hypersensitivity; alcoholism; chronic liver disease", dose:"325-650 mg", routes:"PO, IV", adverse:"Rare at therapeutic doses", note:"Can be hepatotoxic; use the minimum necessary dose." },
  { generic:"Ibuprofen", brand:"Motrin / Advil", classification:"NSAID", action:"Reduces inflammation and fever through prostaglandin inhibition.", indications:"Mild to moderate pain, fever, inflammation", contraindications:"Hypersensitivity; bronchospasm; angioedema", dose:"200-800 mg", routes:"PO", adverse:"Nausea, vomiting, GI bleeding, allergic reactions", note:"Commonly causes gastric upset." },
  { generic:"Ketorolac", brand:"Toradol", classification:"NSAID", action:"Reduces inflammation and fever through prostaglandin inhibition.", indications:"Mild to moderate pain, fever, inflammation, renal colic", contraindications:"Hypersensitivity; bronchospasm; angioedema", dose:"30 mg IV; 60 mg IM", routes:"IV, IM", adverse:"Nausea, vomiting, GI bleeding, allergic reactions", note:"May cause dizziness and headache." },
  { generic:"Aspirin", brand:"Aspirin", classification:"NSAID; antiplatelet", action:"Inhibits thromboxane A2 and platelet aggregation.", indications:"Mild to moderate pain, fever, platelet aggregation inhibition", contraindications:"Hypersensitivity; bronchospasm; angioedema; concurrent MAOI use", dose:"160-325 mg", routes:"PO", adverse:"Nausea, vomiting, GI bleeding, allergic reactions", note:"Avoid enteric-coated aspirin for acute chest pain." },
  { generic:"Naloxone", brand:"Narcan", classification:"Opioid antagonist", action:"Competitively blocks opioid receptors without agonist activity.", indications:"Partial reversal of opioid effects; opioid overdose", contraindications:"Hypersensitivity", dose:"0.4-2 mg", routes:"IV, IO, SQ, IN, nebulized", adverse:"Fever, chills, nausea, vomiting, diarrhea, acute opioid withdrawal", note:"Titrate to reverse respiratory depression while avoiding full withdrawal when possible." },
  { generic:"Nalmefene", brand:"Revex", classification:"Opioid antagonist", action:"Blocks opioid receptors without agonist activity.", indications:"Partial reversal of opioid effects; opioid overdose", contraindications:"Hypersensitivity", dose:"0.5-1 mg", routes:"IV, IM, SQ, IO", adverse:"Fever, chills, nausea, vomiting, diarrhea, opioid withdrawal", note:"Duration is substantially longer than naloxone." },
  { generic:"Nalbuphine", brand:"Nubain", classification:"Opioid agonist-antagonist", action:"Produces analgesia and sedation while antagonizing some opioid receptor effects.", indications:"Moderate to severe pain", contraindications:"Hypersensitivity; opioid dependence; respiratory depression", dose:"10-20 mg", routes:"IV, IO, SQ", adverse:"Sedation, dizziness, nausea, vomiting, opioid withdrawal", note:"Use caution in liver or renal disease." },
  { generic:"Butorphanol", brand:"Stadol", classification:"Opioid agonist-antagonist", action:"Produces analgesia and sedation while antagonizing some opioid receptor effects.", indications:"Moderate to severe pain", contraindications:"Hypersensitivity; opioid dependence; respiratory depression", dose:"1-4 mg", routes:"IV, IM, SQ, IO, IN", adverse:"Sedation, dizziness, nausea, vomiting, opioid withdrawal", note:"Use caution in liver or renal disease." },
  { generic:"Diazepam", brand:"Valium", classification:"Benzodiazepine", action:"Binds type A GABA receptors, producing sedation and muscle relaxation.", indications:"Anxiety, seizures, sedation, muscle relaxation", contraindications:"Hypersensitivity", dose:"2-10 mg", routes:"IV, IM, IO, PO, rectal", adverse:"Hypotension, sedation, amnesia, respiratory depression, nausea, vomiting", note:"Flumazenil is an antagonist; injection may irritate." },
  { generic:"Midazolam", brand:"Versed", classification:"Benzodiazepine", action:"Binds type A GABA receptors, producing sedation.", indications:"Anxiety, sedation, seizures", contraindications:"Hypersensitivity", dose:"1-5 mg", routes:"IV, IM, IO", adverse:"Hypotension, sedation, amnesia, respiratory depression, nausea, vomiting", note:"Flumazenil is an antagonist." },
  { generic:"Lorazepam", brand:"Ativan", classification:"Benzodiazepine", action:"Binds type A GABA receptors, producing sedation.", indications:"Anxiety, sedation, seizures", contraindications:"Hypersensitivity", dose:"1-4 mg", routes:"IV, IM, IO, PO, rectal", adverse:"Hypotension, sedation, amnesia, respiratory depression, nausea, vomiting", note:"Flumazenil is an antagonist." },
  { generic:"Ketamine", brand:"Ketalar", classification:"Dissociative anesthetic", action:"Produces dissociation between cortical and limbic systems.", indications:"Sedation and analgesia", contraindications:"Hypersensitivity; hypertension", dose:"0.5-1 mg/kg IV; 2-4 mg/kg IM; RSI 1-2 mg/kg IV", routes:"IV, IM", adverse:"Hallucinations", note:"Use full monitoring and have resuscitative equipment immediately available." },
  { generic:"Nitrous oxide", brand:"Nitrous oxide", classification:"Sedative/anesthetic gas", action:"Central nervous system depressant.", indications:"Pain and sedation", contraindications:"COPD, pneumothorax, bowel obstruction, inability to follow instructions, intoxication", dose:"Self-administered", routes:"Inhalation", adverse:"Dizziness, hallucinations, nausea, vomiting, altered mental status", note:"Requires a cooperative patient who can follow verbal instructions." },
  { generic:"Propofol", brand:"Diprivan", classification:"Nonbarbiturate, nonbenzodiazepine sedative", action:"Uncertain; appears to potentiate GABA receptors.", indications:"Sedation", contraindications:"Hypersensitivity; soy or egg product hypersensitivity", dose:"25-75 mcg/kg/min", routes:"IV", adverse:"Injection pain, nausea, vomiting, respiratory depression", note:"Use full monitoring and have resuscitative equipment available." },
  { generic:"Etomidate", brand:"Amidate", classification:"Nonbarbiturate, nonbenzodiazepine sedative-hypnotic", action:"Appears to modulate GABA receptors.", indications:"Sedation", contraindications:"Hypersensitivity", dose:"0.1-0.3 mg/kg", routes:"IV", adverse:"Myoclonic jerks, respiratory depression, laryngospasm", note:"Has no analgesic properties; calcium-channel blockers may prolong respiratory depression." },
];

export type Question = {
  id: string;
  chapter: string;
  category: string;
  prompt: string;
  options: string[];
  answer: string;
  hint: string;
  explanation: string;
};

const curatedQuestions: Question[] = [
  { id:"fentanyl-dose", chapter:"20", category:"Medication review", prompt:"What is the exam dose range for fentanyl?", options:["50-100 mcg","1-5 mg","0.4-2 mg","30 mg IV or 60 mg IM"], answer:"50-100 mcg", hint:"This potent opioid is dosed in micrograms, not milligrams.", explanation:"Fentanyl is given at 50-100 mcg by IV, IO, IM, SQ, or IN routes for this exam." },
  { id:"versed-profile", chapter:"20", category:"Medication review", prompt:"Which generic name and classification belong to Versed?", options:["Midazolam - benzodiazepine","Etomidate - opioid antagonist","Ketamine - NSAID","Naloxone - anesthetic"], answer:"Midazolam - benzodiazepine", hint:"Versed enhances GABA-mediated sedation.", explanation:"Versed is the brand name for midazolam, a benzodiazepine used for anxiety, sedation, and seizures." },
  { id:"versed-dose", chapter:"20", category:"Medication review", prompt:"What is the exam dose range for midazolam (Versed)?", options:["1-5 mg","50-100 mcg","0.1-0.3 mg/kg","10-20 mg"], answer:"1-5 mg", hint:"The range begins with the lowest whole-number option.", explanation:"Midazolam is given at 1-5 mg by IV, IM, or IO routes for this exam." },
  { id:"ketamine-dose", chapter:"20", category:"Medication review", prompt:"Which dose set is correct for ketamine?", options:["0.5-1 mg/kg IV; 2-4 mg/kg IM","0.1-0.3 mg/kg IV only","1-5 mg IV, IM, or IO","30 mg IV; 60 mg IM"], answer:"0.5-1 mg/kg IV; 2-4 mg/kg IM", hint:"The intramuscular dose is higher than the intravenous dose.", explanation:"Ketamine is given at 0.5-1 mg/kg IV or 2-4 mg/kg IM, with an RSI dose of 1-2 mg/kg IV for this exam." },
  { id:"ketamine-action", chapter:"20", category:"Medication review", prompt:"Ketamine produces dissociation between which systems?", options:["Cortical and limbic systems","Sympathetic and parasympathetic ganglia","Coagulation and fibrinolytic systems","Maternal and fetal circulations"], answer:"Cortical and limbic systems", hint:"Think higher cognition versus emotion and memory.", explanation:"Ketamine is a dissociative anesthetic that separates cortical and limbic system activity." },
  { id:"narcan-goal", chapter:"20", category:"Medication review", prompt:"What is the immediate treatment goal when naloxone is given for opioid overdose?", options:["Reverse respiratory depression while limiting abrupt withdrawal","Produce complete analgesia","Induce deep sedation","Increase platelet aggregation"], answer:"Reverse respiratory depression while limiting abrupt withdrawal", hint:"Treat ventilation, not a number on a consciousness scale.", explanation:"Naloxone should restore adequate ventilation; excessive reversal can precipitate acute opioid withdrawal." },
  { id:"narcan-dose", chapter:"20", category:"Medication review", prompt:"What is the exam dose range for naloxone?", options:["0.4-2 mg","1-5 mg","25-75 mcg/kg/min","160-325 mg"], answer:"0.4-2 mg", hint:"It begins with four-tenths of a milligram.", explanation:"Naloxone is given at 0.4-2 mg by IV, IO, SQ, IN, or nebulized routes for this exam." },
  { id:"etomidate-analgesia", chapter:"20", category:"Medication review", prompt:"What effect does etomidate have on pain?", options:["It provides no analgesia","It reverses opioid analgesia","It produces strong opioid analgesia","It reduces pain by inhibiting thromboxane A2"], answer:"It provides no analgesia", hint:"Sedation and pain control are not the same thing.", explanation:"Etomidate is a sedative-hypnotic that does not provide analgesia." },
  { id:"etomidate-dose", chapter:"20", category:"Medication review", prompt:"What is the exam dose and route for etomidate?", options:["0.1-0.3 mg/kg IV","2-4 mg/kg IM","50-100 mcg IN","10-20 mg SQ"], answer:"0.1-0.3 mg/kg IV", hint:"It is the smallest mg/kg range shown among the sedatives.", explanation:"Etomidate is given at 0.1-0.3 mg/kg by the IV route for this exam." },
  { id:"toradol", chapter:"20", category:"Medication review", prompt:"Which class and dose pairing is correct for Toradol?", options:["Ketorolac, NSAID: 30 mg IV or 60 mg IM","Midazolam, benzodiazepine: 30 mg IV","Naloxone, antagonist: 60 mg IM","Fentanyl, opioid: 30 mg IV"], answer:"Ketorolac, NSAID: 30 mg IV or 60 mg IM", hint:"Toradol is the nonopioid option associated with renal colic.", explanation:"Toradol is ketorolac, an NSAID given at 30 mg IV or 60 mg IM for this exam." },
  { id:"fentanyl-adverse", chapter:"20", category:"Medication review", prompt:"Which adverse effect is especially associated with fentanyl?", options:["Chest-wall rigidity","Myoclonic jerks","Acute opioid withdrawal","GI bleeding"], answer:"Chest-wall rigidity", hint:"This complication can directly impair ventilation mechanics.", explanation:"Fentanyl can cause chest-wall rigidity and respiratory depression." },
  { id:"routes-enteral", chapter:"20", category:"Medication routes", prompt:"Which route is enteral?", options:["Oral","Intravenous","Intramuscular","Intraosseous"], answer:"Oral", hint:"Enteral administration uses the gastrointestinal tract.", explanation:"Oral and rectal routes are enteral; IV, IM, and IO routes are parenteral." },
  { id:"routes-firstpass", chapter:"20", category:"Medication routes", prompt:"Which route is most directly affected by hepatic first-pass metabolism?", options:["Oral","Intravenous","Intraosseous","Intranasal"], answer:"Oral", hint:"The absorbed drug travels from the gut toward the liver before systemic circulation.", explanation:"Oral drugs may be metabolized in the gut wall and liver before reaching systemic circulation." },
  { id:"stats-anova", chapter:"5", category:"Statistics", prompt:"A researcher wants to compare mean response times across four EMS systems. Which test best fits?", options:["ANOVA","Chi square test","Odds ratio","Mode"], answer:"ANOVA", hint:"The outcome is numerical and there are more than two groups.", explanation:"Analysis of variance compares means across three or more groups." },
  { id:"stats-chi", chapter:"5", category:"Statistics", prompt:"Which test evaluates association between two categorical variables?", options:["Chi square test","t test","ANOVA","Standard deviation"], answer:"Chi square test", hint:"This test works with observed and expected counts.", explanation:"A chi square test compares observed and expected frequencies for categorical variables." },
  { id:"validity-internal", chapter:"5", category:"Study design", prompt:"A tightly controlled study supports a causal conclusion but may not generalize to rural EMS. Which validity is strong?", options:["Internal validity","External validity","Sampling error","Open access"], answer:"Internal validity", hint:"Focus on whether the result is trustworthy inside the study.", explanation:"Internal validity concerns causal trustworthiness within the study; external validity concerns generalizability." },
  { id:"study-rct", chapter:"5", category:"Study design", prompt:"Which design randomly assigns participants to treatment and control groups?", options:["Randomized controlled trial","Cohort study","Case series","Cross-sectional study"], answer:"Randomized controlled trial", hint:"Assignment, not sampling, is the key feature.", explanation:"An RCT is an experiment that uses random assignment to intervention and control conditions." },
  { id:"study-retro", chapter:"5", category:"Study design", prompt:"Investigators review existing patient records to compare past exposures and outcomes. What design is this?", options:["Retrospective study","Prospective study","In vitro study","Randomized controlled trial"], answer:"Retrospective study", hint:"The relevant events have already occurred.", explanation:"Retrospective studies look backward using existing data, records, exposures, or outcomes." },
  { id:"ems-online", chapter:"2", category:"Medical oversight", prompt:"A paramedic calls an authorized physician for a real-time medication order. This is what type of direction?", options:["On-line medical direction","Off-line medical oversight","Retrospective oversight","Peer review"], answer:"On-line medical direction", hint:"The consultation is happening during the call.", explanation:"On-line medical direction is real-time consultation or ordering; standing protocols are off-line direction." },
  { id:"ems-moi", chapter:"3", category:"Assessment", prompt:"The forces and events that produced a traumatic injury are called the:", options:["Mechanism of injury","Nature of illness","Pathophysiology","Scope of practice"], answer:"Mechanism of injury", hint:"This term is used for trauma rather than medical illness.", explanation:"Mechanism of injury describes how traumatic energy was transferred and injury occurred." },
  { id:"safety-levels", chapter:"4", category:"Infection control", prompt:"Which process destroys all microbial life, including bacterial spores?", options:["Sterilization","Disinfection","Cleaning","Standard Precautions"], answer:"Sterilization", hint:"This is the highest level among the listed decontamination processes.", explanation:"Cleaning removes soil, disinfection destroys many pathogens, and sterilization destroys all microbial life including spores." },
  { id:"ambulance-type2", chapter:"1", category:"Ambulance types", prompt:"Which ambulance configuration is built on a van body with an integrated patient compartment?", options:["Type II","Type I","Type III","Helicopter air ambulance"], answer:"Type II", hint:"It is the smallest common ground-ambulance body style.", explanation:"A Type II ambulance is van-based; Types I and III use modular patient compartments." },
];

const stableHash = (value: string) => [...value].reduce((n, ch) => ((n << 5) - n + ch.charCodeAt(0)) | 0, 0);

export const termQuestions: Question[] = studyTerms.map((item, itemIndex) => {
  const peers = studyTerms.filter((candidate) => candidate.chapter === item.chapter && candidate.term !== item.term);
  const start = Math.abs(stableHash(item.term)) % Math.max(peers.length, 1);
  const distractors = Array.from({ length: 3 }, (_, offset) => peers[(start + offset * 7) % peers.length]?.term)
    .filter(Boolean) as string[];
  const options = [item.term, ...distractors].sort((a, b) => stableHash(item.term + a) - stableHash(item.term + b));
  return {
    id: `term-${item.chapter}-${itemIndex}`,
    chapter: item.chapter,
    category: item.category,
    prompt: `Which term best matches this definition? ${item.definition}`,
    options,
    answer: item.term,
    hint: `It is a Chapter ${item.chapter} term beginning with “${item.term.charAt(0).toUpperCase()}.”`,
    explanation: `${item.term}: ${item.definition}`,
  };
});

const drugQuestions: Question[] = drugCards.flatMap((drug, index) => {
  const peerBrands = drugCards.filter((d) => d.generic !== drug.generic).slice((index + 3) % 10, (index + 3) % 10 + 3).map((d) => d.brand);
  const options = [drug.brand, ...peerBrands];
  while (options.length < 4) options.push(drugCards[(index + options.length) % drugCards.length].brand);
  return [{
    id: `drug-brand-${drug.generic}`,
    chapter: "20",
    category: "Medication review",
    prompt: `What is the brand name for ${drug.generic}?`,
    options: options.slice(0, 4),
    answer: drug.brand,
    hint: `The brand begins with “${drug.brand.charAt(0)}.”`,
    explanation: `${drug.generic} (${drug.brand}) is classified as ${drug.classification}. ${drug.note}`,
  }];
});

export const allQuestions: Question[] = [...curatedQuestions, ...drugQuestions, ...termQuestions];

export const chapterNames: Record<string, string> = {
  "1":"Advanced Prehospital Medicine",
  "2":"EMS Systems",
  "3":"EMS Practitioner",
  "4":"Safety & Wellness",
  "5":"EMS Research",
  "20":"Emergency Pharmacology",
};

