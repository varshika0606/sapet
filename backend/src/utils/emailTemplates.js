const violationReported = ({ studentName, policyTitle }) => `
  <h2>Violation Reported</h2>
  <p>A violation was reported for ${studentName} regarding policy: ${policyTitle}.</p>
`;

const responseSubmitted = ({ studentName }) => `
  <h2>Response Submitted</h2>
  <p>${studentName} submitted a response.</p>
`;

const decisionMade = ({ decision, action }) => `
  <h2>Decision Updated</h2>
  <p>Decision: ${decision}</p>
  <p>Action: ${action || "N/A"}</p>
`;

module.exports = { violationReported, responseSubmitted, decisionMade };
