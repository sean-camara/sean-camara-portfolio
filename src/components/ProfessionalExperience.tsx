export function ProfessionalExperience() {
  return (
    <section className="editorial-section page-shell professional-experience-section" id="experience">
      <div className="section-heading" data-reveal="split">
        <div>
          <p className="section-kicker">[ Professional Experience ]</p>
          <h2>Complex cases.<br /><em>Clear next steps.</em></h2>
        </div>
        <p className="section-intro">
          Formal customer-support experience built around careful listening, structured troubleshooting, and clear guidance.
        </p>
      </div>

      <article className="professional-record" data-reveal="row">
        <aside className="professional-record-rail" aria-label="Employment details">
          <span className="professional-record-number" aria-hidden="true">01</span>
          <div className="professional-record-meta">
            <span>Employment period</span>
            <time dateTime="2024-03">Mar 2024 — Sep 2024</time>
          </div>
          <div className="professional-record-meta">
            <span>Company</span>
            <strong>Concentrix</strong>
          </div>
        </aside>

        <div className="professional-record-main">
          <header className="professional-record-header">
            <div>
              <p>Customer operations</p>
              <h3>Customer Service Representative</h3>
            </div>
            <span className="professional-record-account">Amazon Selling Partner Support</span>
          </header>

          <ol className="professional-record-notes">
            <li><span>01</span><p>Supported Amazon selling partners with account and platform concerns through clear, case-based troubleshooting and guidance.</p></li>
            <li><span>02</span><p>Documented customer interactions, followed support procedures, and coordinated issue resolution across support channels.</p></li>
            <li><span>03</span><p>Applied structured problem-solving and professional communication while handling detailed platform concerns.</p></li>
          </ol>
        </div>
      </article>
    </section>
  );
}
