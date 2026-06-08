'use client';

interface NDAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

const NDA_TEXT = `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of the date signed below, by and between the visitor signing below ("Visitor") and ORNN AI INC, a Delaware corporation ("Company").

1. CONFIDENTIAL INFORMATION

"Confidential Information" means any and all non-public information, trade secrets, proprietary information, intellectual property, technical data, or business information disclosed to, observed by, or accessed by Visitor during the visit to Company's premises, including but not limited to: (a) business plans, strategies, financial information, budgets, projections, and financial performance; (b) customer lists, client relationships, contracts, and pricing information; (c) product designs, specifications, prototypes, research and development, algorithms, software code, technical documentation, and patent applications; (d) marketing strategies, advertising plans, and competitive intelligence; (e) operational processes, internal policies, procedures, and manuals; (f) information about Company's employees, contractors, and business partners; (g) any other information related to Company's business operations, technologies, or affairs that is not generally known to the public; and (h) the existence and terms of this Agreement itself.

2. OBLIGATIONS OF VISITOR

Visitor agrees to: (a) hold all Confidential Information in strict confidence and take all reasonable precautions to protect such information from unauthorized disclosure or use; (b) not use Confidential Information for any purpose other than the intended purpose of the visit; (c) not disclose, disseminate, or make available Confidential Information to any third party without Company's prior written consent; (d) not copy, reproduce, reverse engineer, decompile, or create derivative works from any Confidential Information; (e) limit access to Confidential Information solely to those individuals who have a legitimate need to know and who are bound by confidentiality obligations no less restrictive than those contained herein; (f) immediately notify Company in writing of any unauthorized use or disclosure of Confidential Information; and (g) comply with all applicable laws and regulations regarding the protection of confidential and proprietary information.

3. EXCLUSIONS FROM CONFIDENTIAL INFORMATION

Confidential Information does not include information that: (a) is or becomes generally available to the public other than as a result of a disclosure by Visitor or its representatives in violation of this Agreement; (b) was in Visitor's possession or known to Visitor on a non-confidential basis prior to disclosure by Company, as evidenced by Visitor's written records; (c) becomes available to Visitor on a non-confidential basis from a source other than Company, provided that such source is not bound by a confidentiality agreement with or other obligation of confidentiality to Company; (d) is independently developed by Visitor without reference to or reliance upon any Confidential Information, as evidenced by Visitor's written records; or (e) is disclosed by Visitor pursuant to a court order, subpoena, or other legal requirement, provided that Visitor provides Company with prompt written notice of such requirement to allow Company to seek a protective order or other appropriate remedy.

4. PROTECTION OF COMPANY PROPERTY

Visitor acknowledges that all equipment, materials, documents, and other property provided by or observed during the visit remain the exclusive property of Company. Visitor agrees not to remove, copy, or reproduce any such property without Company's prior written consent, except as necessary for the intended purpose of the visit. Upon Company's request or at the conclusion of the visit, Visitor shall promptly return or destroy all materials containing Confidential Information.

5. NO LICENSE OR RIGHTS

Nothing in this Agreement is intended to grant Visitor any rights, licenses, or interests in any Confidential Information or any intellectual property of Company, whether by implication, estoppel, or otherwise. All Confidential Information and intellectual property remain the exclusive property of Company.

6. TERM AND TERMINATION

This Agreement shall become effective upon Visitor's signature and shall remain in effect indefinitely from the date of signature. The obligations of confidentiality and non-use set forth in this Agreement shall survive the termination of this Agreement and continue indefinitely.

7. REMEDIES

Visitor acknowledges that any unauthorized disclosure or use of Confidential Information may cause irreparable harm to Company for which monetary damages may be inadequate. Accordingly, Company shall be entitled to seek injunctive relief and other equitable remedies to prevent or stop any actual or threatened breach of this Agreement, in addition to any other rights and remedies available at law or in equity, including recovery of damages and attorneys' fees.

8. GOVERNING LAW AND VENUE

This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles. Any action or proceeding arising out of or relating to this Agreement shall be brought exclusively in the federal or state courts located in Delaware, and the parties hereby irrevocably consent to the personal jurisdiction and venue therein.

9. ENTIRE AGREEMENT

This Agreement constitutes the entire agreement between the parties regarding the subject matter hereof and supersedes all prior discussions, negotiations, agreements, and understandings, whether written or oral. This Agreement may not be modified or amended except by a written instrument signed by both parties. If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

10. ACKNOWLEDGMENT

Visitor acknowledges that Visitor has read and understood this Agreement, that Visitor has had the opportunity to consult with legal counsel of Visitor's choice, and that Visitor agrees to be bound by its terms and conditions.

Company: ORNN AI INC`;

export default function NDAModal({ isOpen, onClose, onAgree }: NDAModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Non-Disclosure Agreement</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="prose max-w-none">
            <p className="text-sm text-gray-600 mb-4">
              Please read the following Non-Disclosure Agreement carefully. By signing in to ORNN AI INC, you agree to be bound by its terms.
            </p>
            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
              {NDA_TEXT}
            </pre>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Decline
          </button>
          <button
            onClick={onAgree}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
}