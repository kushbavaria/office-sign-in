export interface NDASignatureData {
  visitorName: string;
  visitorEmail: string;
  visitorCompany: string;
  visitPurpose: string;
  visitorCitizenship: string;
  visitDate: string;
  signatureDataUrl: string;
}

export function generateNDAText(data: {
  visitorName: string;
  visitorCompany: string;
  visitDate: string;
}): string {
  const { visitorName, visitorCompany, visitDate } = data;
  return `NON-DISCLOSURE AGREEMENT
(One-Way — Office Visitor)

This Non-Disclosure Agreement (this "Agreement") is entered into as of ${visitDate} by and between ORNN AI INC, a Delaware corporation ("Ornn" or the "Disclosing Party"), and ${visitorName}${visitorCompany ? `, visiting on behalf of ${visitorCompany}` : ''} (the "Visitor" or the "Receiving Party").

1. Purpose.
The Visitor will be visiting Ornn's office premises and may observe, access, or be exposed to Ornn's Confidential Information in connection with that visit (the "Purpose"). Ornn may disclose Confidential Information to the Visitor solely for the Purpose.

2. Definitions.
For purposes of this Agreement:
(a) "Affiliate" means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party, where "control" means ownership of more than fifty percent (50%) of the voting interests or the power to direct management or policies.
(b) "Confidential Information" means all non-public information disclosed or made available, directly or indirectly, in any form, by or on behalf of Ornn to the Visitor in connection with the Purpose, whether before or after the Effective Date, including business, financial, commercial, technical, product, model, software, source code, data, customer, supplier, investor, strategy, pricing, marketing, legal, compliance, operational, transaction, and other information, analyses, notes, summaries, extracts, compilations, studies, or other materials derived from or reflecting such information, and the existence, status, and terms of the Parties' discussions and the fact that information has been shared. Confidential Information includes information disclosed orally, visually, electronically, in writing, by inspection, or by access to systems, facilities, data rooms, repositories, APIs, models, or demonstrations.
(c) "Representatives" means, with respect to the Visitor, the Visitor's directors, officers, employees, managers, partners, members, professional advisers, and contractors who have a strict need to know the Confidential Information for the Purpose and who are bound by confidentiality obligations at least as protective as those in this Agreement or are otherwise subject to professional or fiduciary duties of confidentiality.

3. Use and Non-Disclosure Obligations.
(a) The Visitor shall use Confidential Information solely for the Purpose and for no other purpose. The Visitor shall not, directly or indirectly, use Confidential Information to compete with Ornn, to circumvent a contemplated transaction structure, to disadvantage Ornn in negotiations, or for any commercial or other purpose outside the Purpose.
(b) The Visitor shall hold Confidential Information in strict confidence and shall not disclose it to any person except to its Representatives who need to know it for the Purpose. Before any disclosure, the Visitor shall ensure that the applicable Representative is informed of the confidential nature of the information and the restrictions in this Agreement.
(c) The Visitor shall protect Confidential Information using at least the same degree of care it uses to protect its own confidential information of a similar nature, and in all events using not less than a reasonable degree of care. The Visitor is responsible for any breach of this Agreement by its Representatives.

4. Exclusions.
The obligations in this Agreement do not apply to information that the Visitor can demonstrate by contemporaneous written records: (a) was lawfully known to the Visitor without restriction on use or disclosure before receipt from Ornn; (b) is or becomes generally available to the public through no breach of this Agreement or other duty owed to Ornn; (c) is lawfully received from a third party not under a duty of confidentiality to Ornn and without breach of any other duty of non-use or non-disclosure; or (d) is independently developed by or for the Visitor without use of or reference to Ornn's Confidential Information. The combination of individual elements shall not be deemed to fall within the foregoing exclusions merely because individual elements are within an exclusion, unless the combination itself is within an exclusion.

5. Compelled Disclosure.
If the Visitor or any of its Representatives is required by law, regulation, legal process, stock exchange rule, or governmental or regulatory request to disclose Confidential Information, the Visitor shall, to the extent legally permitted, promptly notify Ornn in writing so that Ornn may seek a protective order or other appropriate remedy. The Visitor shall disclose only the portion of Confidential Information that it is legally required to disclose and shall use commercially reasonable efforts to obtain confidential treatment.

6. Ownership; No License; No Reliance.
(a) As between the Parties, all Confidential Information remains the property of Ornn. No right, title, license, or other interest in any intellectual property or other rights is granted or implied by this Agreement except the limited right to use Confidential Information solely for the Purpose.
(b) Neither this Agreement nor any disclosure obligates Ornn to proceed with any transaction, relationship, or further discussion. Ornn reserves the right to discontinue discussions at any time.
(c) All Confidential Information is provided "as is" without representation or warranty of any kind, except as expressly stated in a definitive written agreement executed by the Parties. The Visitor remains responsible for its own evaluation of the Confidential Information.

7. Return and Destruction.
Upon Ornn's written request, the Visitor shall promptly cease using the requested Confidential Information and, within ten (10) business days, return or destroy all copies of the requested Confidential Information in its possession or control, including materials derived from it, except that one archival copy may be retained solely for legal, regulatory, compliance, insurance, record-retention, or backup purposes, provided that such retained information remains subject to this Agreement for so long as retained. Information stored on routine backup systems need not be separately deleted so long as it is not readily accessible in the ordinary course and remains protected under this Agreement.

8. Term and Survival.
This Agreement begins on the Effective Date and continues for three (3) years unless earlier terminated by written agreement of the Parties. The confidentiality and non-use obligations under this Agreement survive for five (5) years after the last disclosure of Confidential Information under this Agreement; provided that obligations relating to trade secrets survive for so long as the applicable information remains a trade secret under applicable law, and obligations relating to personal data survive for so long as required by applicable law.

9. Data Protection; Export Controls; Sanctions.
If personal data is disclosed, the Visitor shall process it only as permitted by applicable law and only as reasonably necessary for the Purpose. The Visitor shall not export, re-export, transfer, or make available any Confidential Information or related items in violation of applicable export control, sanctions, or import laws. The Visitor represents that the Visitor is not a citizen or holder of any visa for: Cuba, Iran, North Korea, Ukraine, China.

10. Equitable Relief and Remedies.
The Visitor acknowledges that unauthorized use or disclosure of Confidential Information may cause irreparable harm to Ornn for which monetary damages may be an inadequate remedy. Accordingly, in addition to any other remedies available at law or in equity, Ornn is entitled to seek injunctive relief, specific performance, and other equitable relief, without the need to post bond where not required by law. Nothing in this Agreement limits Ornn's right to seek damages or other relief for breach.

11. General.
(a) Governing Law and Forum. This Agreement and any non-contractual claims arising out of or relating to it are governed by the laws of the State of New York, without regard to conflicts-of-law principles. Each Party irrevocably submits to the exclusive jurisdiction of the state and federal courts located in New York County, New York for any action arising out of or relating to this Agreement, and waives any objection based on forum non conveniens.
(b) Assignment. The Visitor may not assign this Agreement, in whole or in part, without the prior written consent of Ornn, except to an Affiliate or in connection with a merger, consolidation, reorganization, or sale of substantially all of its business or assets relating to the Purpose, provided the assignee agrees in writing to be bound by this Agreement. Any prohibited assignment is void.
(c) Notices. Notices under this Agreement must be in writing and sent by nationally recognized overnight courier or by email to the addresses set out below (or to such other address as a Party designates by notice). Questions relating to this Agreement, legal notices, and requests under this Agreement may be sent to legal@ornn.com for ORNN AI INC.
(d) Entire Agreement; Amendments; Waiver. This Agreement constitutes the entire agreement between the Parties with respect to its subject matter and supersedes prior or contemporaneous understandings on that subject. Any amendment must be in writing and signed by the Parties. No waiver is effective unless in writing, and no waiver is a continuing waiver.
(e) Severability. If any provision of this Agreement is held invalid or unenforceable, the remaining provisions remain in effect, and the invalid or unenforceable provision shall be enforced to the maximum extent permitted by law.
(f) Counterparts; Electronic Signatures. This Agreement may be executed in counterparts, each of which is deemed an original and all of which together constitute one instrument. Signatures exchanged by PDF or electronic signature platform are effective as originals.
(g) No Partnership. This Agreement does not create any joint venture, partnership, agency, fiduciary, or other similar relationship between the Parties.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.

ORNN AI INC (Disclosing Party)

____________________________________
By: Authorized Representative
Date: ${visitDate}

VISITOR (Receiving Party)

____________________________________
Name: ${visitorName}
Date: ${visitDate}`;
}
