import { Link } from "react-router-dom";
import { AccountAccessDemo } from "@/components/site/AccountAccessDemo";
import { CaseChapter, CaseStudy, DecisionList } from "@/components/site/CaseStudy";
import { TradeOrderDemo } from "@/components/site/TradeOrderDemo";
import { brokerCases } from "@/config/brokerCases";
import { brokerProjects, type BrokerCaseKind } from "@/config/projects";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const chapters = {
  scenario: "用户场景",
  decisions: "产品取舍",
  verification: "验证与交付",
};

export default function BrokerCase({ kind }: { kind: BrokerCaseKind }) {
  const trade = kind === "trade-order";
  const content = brokerCases[kind];
  const project = brokerProjects[kind];
  const related = brokerProjects[trade ? "device-authorization" : "trade-order"];
  useDocumentTitle(trade ? "tradeOrderCase" : "accountAccessCase");

  return (
    <CaseStudy
      key={kind}
      title={content.title}
      description={content.description}
      facts={["券商 App", project.status]}
      kind={kind}
      chapters={chapters}
      heroPreview={trade ? <TradeOrderDemo /> : <AccountAccessDemo />}
    >
      <CaseChapter id="scenario" title={chapters.scenario}>
        <p className="broker-case-paragraph">{content.scenario}</p>
      </CaseChapter>

      <CaseChapter id="decisions" title={chapters.decisions}>
        <DecisionList decisions={content.decisions} />
      </CaseChapter>

      <CaseChapter id="verification" title={chapters.verification}>
        <dl className="broker-case-checks">
          {content.checks.map((check) => (
            <div key={check.scenario}>
              <dt>{check.scenario}</dt>
              <dd>{check.expected}</dd>
            </div>
          ))}
        </dl>
        <p className="broker-case-paragraph">{content.contribution}</p>
        <p className="broker-case-paragraph">{content.delivery}</p>
        <Link className="site-text-link broker-case-related" to={related.casePath}>体验{related.name} →</Link>
      </CaseChapter>
    </CaseStudy>
  );
}
