export function ProfessionalExperience() {
  return (
    <section
      className="editorial-section page-shell professional-experience-section"
      id="experience"
    >
      <div className="section-heading" data-reveal="split">
        <div>
          <p className="section-kicker">04 / Background</p>
          <h2>
            Experience that
            <br />
            shapes the work.
          </h2>
        </div>
        <p className="section-intro">
          Experience in real estate sales, CRM development, and customer
          support.
        </p>
      </div>

      <article className="professional-record">
        <aside
          className="professional-record-rail"
          aria-label="Employment details"
        >
          <span className="professional-record-number" aria-hidden="true">
            01
          </span>
          <div className="professional-record-meta">
            <span>Employment period</span>
            <strong><time dateTime="2026-08">Aug 2026</time> — Present</strong>
          </div>
          <div className="professional-record-meta">
            <span>Company</span>
            <strong>Primehomes</strong>
          </div>
        </aside>

        <div className="professional-record-main">
          <header className="professional-record-header">
            <div>
              <p>Real estate sales</p>
              <h3>Property Executive Specialist</h3>
            </div>
          </header>

          <ol className="professional-record-notes">
            <li>
              <span>01</span>
              <p>
                Sell high-end condominiums priced from ₱9 million to ₱30 million,
                communicate with prospective buyers, and manage my Meta ad campaigns.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                Built a CRM to track unit availability and inventory, automatically
                calculate costs based on payment terms, and save and export reports
                as PDFs.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                Integrated the Meta Ads API to import leads automatically. The CRM
                also lets me add, view, update, and delete lead records.
              </p>
            </li>
          </ol>
          <a className="text-link" href="/work/reserve/">
            View the Reserve Desk case study <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>

      <article className="professional-record" data-reveal="row">
        <aside
          className="professional-record-rail"
          aria-label="Employment details"
        >
          <span className="professional-record-number" aria-hidden="true">
            02
          </span>
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
            <span className="professional-record-account">
              Amazon Selling Partner Support
            </span>
          </header>

          <ol className="professional-record-notes">
            <li>
              <span>01</span>
              <p>
                Supported Amazon selling partners with account and platform
                concerns through clear, case-based troubleshooting and guidance.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                Documented customer interactions, followed support procedures,
                and coordinated issue resolution across support channels.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                Applied structured problem-solving and professional
                communication while handling detailed platform concerns.
              </p>
            </li>
          </ol>
        </div>
      </article>
    </section>
  );
}
