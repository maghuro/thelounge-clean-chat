# Codex full-repository audit request

This temporary file exists only to create a reviewable PR for the repository's first Codex pass.

Please audit the entire repository, not only this file or the PR diff.

Focus especially on:
- CSS selector correctness and unintended matches;
- DarkPeers website -> IRC -> The Lounge marker/sentinel contract;
- mobile/desktop parity;
- legacy URL-marker compatibility;
- split-message continuation handling;
- BON Pool / Rigged Taxes context detection;
- build/flat CSS consistency;
- dead, contradictory, or unreachable selectors;
- regressions caused by cascade/specificity/order;
- malformed CSS, brace/parenthesis balance, and maintainability hazards.

Do not treat the absence of a changed line as out of scope: this is intentionally a whole-repository audit.