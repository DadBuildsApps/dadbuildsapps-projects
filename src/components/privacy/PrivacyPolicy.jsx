import React from "react";
import { useState } from "react";
import "./PrivacyPolicy.scss";

const PrivacyPolicy = () => {
  const [language, setLanguage] = useState("en");

  const renderEnglish = () => (
    <>
      <h1>Privacy Policy &amp; Safety Standards</h1>
      <p>
        This page describes our Privacy Policy and our publicly available Safety
        Standards (including our policy against Child Sexual Abuse and
        Exploitation, “CSAE”). By using our apps or websites (the “Service”),
        you agree to these terms.
      </p>

      <h2 id="information-we-collect">Information We Collect</h2>
      <ul>
        <li>
          <b>Personal Information:</b> Name, email address, profile photo, and
          any other details you provide during registration or when contacting
          us.
        </li>
        <li>
          <b>Usage Data:</b> App interactions, feature usage, diagnostics, crash
          logs, and basic analytics to improve the Service.
        </li>
        <li>
          <b>Device Information:</b> Device model, OS, language/region, and IP
          address.
        </li>
        <li>
          <b>Content You Share:</b> Posts, comments, images, and other
          user‑generated content you choose to upload.
        </li>
      </ul>

      <h2 id="how-we-use">How We Use Your Information</h2>
      <ul>
        <li>To provide, maintain, and improve the Service.</li>
        <li>To personalize features and communicate important updates.</li>
        <li>To respond to inquiries and provide customer support.</li>
        <li>
          To protect users and enforce our policies, including preventing abuse.
        </li>
      </ul>

      <h2 id="legal-bases">Legal Bases</h2>
      <p>
        Where applicable (e.g., in the EEA/UK), we process data based on one or
        more of: your consent; performance of a contract; legitimate interests
        (e.g., to secure and improve the Service); and/or legal obligation.
      </p>

      <h2 id="sharing">Sharing &amp; Third‑Party Services</h2>
      <p>
        We may use trusted providers for analytics, hosting, crash reporting,
        messaging (e.g., push notifications), and media storage. These partners
        process data only on our instructions and under appropriate safeguards.
      </p>

      <h2 id="security">Data Security</h2>
      <p>
        We use reasonable technical and organizational measures to protect your
        information. However, no method of transmission or storage is 100%
        secure.
      </p>

      <h2 id="retention">Data Retention</h2>
      <p>
        We retain personal data only as long as necessary to provide the Service
        or comply with legal obligations. You may request deletion (see{" "}
        <a href="#your-rights">Your Rights</a>).
      </p>

      <h2 id="your-rights">Your Rights</h2>
      <ul>
        <li>Access, correct, or delete your personal information.</li>
        <li>Object to or restrict processing in certain circumstances.</li>
        <li>Withdraw consent where processing is based on consent.</li>
      </ul>
      <p>
        Contact:{" "}
        <a href="mailto:hello@dadbuildsapps.com">hello@dadbuildsapps.com</a>
      </p>

      <h2 id="children">Children’s Privacy</h2>
      <p>
        Our Service is not directed to children under 13. We do not knowingly
        collect personal information from children under 13. If you believe a
        child has provided personal information, contact us and we will delete
        it.
      </p>

      <h2 id="content-standards">Safety Standards &amp; CSAE Policy</h2>
      <p>
        <b>This page is our publicly available Safety Standards URL</b> required
        by Google Play and other platforms. It applies to all users and content
        in our Service. We strictly prohibit any content that depicts, promotes,
        or attempts to facilitate Child Sexual Abuse and Exploitation (CSAE) or
        endangerment of children. This includes (but is not limited to):
      </p>
      <ul>
        <li>Sexual content involving minors (real or simulated).</li>
        <li>Sexualized imagery of minors, grooming, or predatory behavior.</li>
        <li>Links to, or instructions to obtain, such material.</li>
        <li>Any attempt to solicit or share CSAM (Child Sexual Abuse Material).</li>
      </ul>
      <p>
        We also prohibit hate speech, threats, harassment, non‑consensual
        intimate content, and other illegal or harmful activities. We may remove
        content, suspend accounts, and notify authorities where legally
        required.
      </p>

      <h3 id="reporting">Reporting &amp; Enforcement</h3>
      <ul>
        <li>
          <b>Report:</b> If you see content that may violate these standards,
          please email{" "}
          <a href="mailto:hello@dadbuildsapps.com">hello@dadbuildsapps.com</a>{" "}
          with details and links/screenshots.
        </li>
        <li>
          <b>Review:</b> We review reports promptly. Confirmed violations may
          lead to content removal, account action, and—where applicable—reports
          to relevant organizations or law enforcement.
        </li>
        <li>
          <b>Appeal:</b> You may contact us to appeal moderation actions.
        </li>
      </ul>

      <h3 id="platform-compliance">Platform Compliance</h3>
      <p>
        We follow Google Play’s Developer Program Policies and Families Policy
        Requirements. This page ({" "}
        <a
          href="https://dadbuildsapps.com/privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://dadbuildsapps.com/privacy-policy/
        </a>{" "}
        ) serves as the canonical URL for our privacy and CSAE standards.
      </p>

      <h2 id="changes">Updates to This Policy</h2>
      <p>
        We may update this page to reflect changes in law or our practices. The
        latest version is always available at this URL.
      </p>
      <p><i>Last Updated: 2025‑08‑23</i></p>

      <h2 id="contact">Contact</h2>
      <p>
        Email:{" "}
        <a href="mailto:hello@dadbuildsapps.com">hello@dadbuildsapps.com</a>
      </p>
    </>
  );

  const renderJapanese = () => (
    <>
      <h1>プライバシーポリシー・安全基準</h1>
      <p>
        本ページでは、当サービス（アプリ／ウェブサイト）のプライバシーポリシーと
        公開された安全基準（児童の性的虐待・搾取（CSAE）に関する方針を含む）を
        定めています。本サービスをご利用いただくことで、これらの条件に同意した
        ものとみなします。
      </p>

      <h2 id="jp-collect">収集する情報</h2>
      <ul>
        <li>
          <b>個人情報：</b> 氏名、メールアドレス、プロフィール写真、登録時やお問
          い合わせ時にご提供いただく情報。
        </li>
        <li>
          <b>利用状況データ：</b> 機能の利用状況、操作履歴、診断情報、クラッシュ
          ログ等。
        </li>
        <li>
          <b>端末情報：</b> 端末種別、OS、言語／地域、IPアドレス等。
        </li>
        <li>
          <b>ユーザー投稿：</b> 投稿、コメント、画像など、ユーザーが自らアップロー
          ドするコンテンツ。
        </li>
      </ul>

      <h2 id="jp-use">情報の利用目的</h2>
      <ul>
        <li>サービスの提供・維持・改善のため</li>
        <li>重要なお知らせの配信やサポート対応のため</li>
        <li>不正・濫用の防止等、ユーザー保護とポリシー遵守のため</li>
      </ul>

      <h2 id="jp-legal">法的根拠</h2>
      <p>
        EEA/UKなど該当地域においては、ユーザーの同意、契約の履行、正当な利益
        （サービスの安全確保・改善等）、法的義務のいずれかに基づいてデータを処
        理します。
      </p>

      <h2 id="jp-third">第三者サービスの利用</h2>
      <p>
        分析、ホスティング、障害解析、メッセージ配信（プッシュ通知等）、メディ
        ア保存のため、信頼できるパートナーを利用する場合があります。各パートナ
        ーは適切な保護措置の下、当社の指示に基づきのみ処理を行います。
      </p>

      <h2 id="jp-security">データの安全管理</h2>
      <p>
        合理的な技術的・組織的対策を講じて情報を保護しますが、インターネット通
        信や電子保管は100%の安全性を保証できません。
      </p>

      <h2 id="jp-retention">データの保存期間</h2>
      <p>
        サービス提供や法令順守に必要な期間のみ個人データを保持します。削除をご
        希望の場合は、下記「<a href="#jp-rights">ユーザーの権利</a>」をご確認
        ください。
      </p>

      <h2 id="jp-rights">ユーザーの権利</h2>
      <ul>
        <li>自身の個人情報へのアクセス、訂正、削除の請求</li>
        <li>一定の状況下での処理停止や異議申立て</li>
        <li>同意に基づく処理の同意撤回</li>
      </ul>
      <p>
        連絡先：<a href="mailto:hello@dadbuildsapps.com">hello@dadbuildsapps.com</a>
      </p>

      <h2 id="jp-children">13歳未満のユーザーについて</h2>
      <p>
        当サービスは13歳未満の児童を対象としていません。13歳未満から個人情報が
        収集されたことが判明した場合は、速やかに削除します。
      </p>

      <h2 id="jp-standards">安全基準・CSAEポリシー</h2>
      <p>
        <b>本ページは、Google Play等が要求する公開安全基準のURLです。</b>
        当サービスでは、児童に対する性的虐待・搾取（CSAE）や児童の危険を助長す
        るコンテンツを<strong>一切禁止</strong>します。以下を含みます（ただしこ
        れらに限りません）：
      </p>
      <ul>
        <li>未成年者に関する性的表現・描写（実在・仮想を問わず）</li>
        <li>未成年者を性的対象化する画像、グルーミング、誘引行為</li>
        <li>そのような素材へのリンクや取得方法の示唆</li>
        <li>CSAM（児童性的虐待資料）の取得・共有・所持・要求</li>
      </ul>
      <p>
        併せて、ヘイトスピーチ、脅迫、嫌がらせ、同意のない親密画像の共有、その
        他違法・有害行為も禁止します。違反が確認された場合は、コンテンツの削除、
        アカウント措置、必要に応じて関係機関への通報等を行うことがあります。
      </p>

      <h3 id="jp-report">通報・運用</h3>
      <ul>
        <li>
          <b>通報：</b> 違反の疑いがある内容を見つけた場合は、詳細（URLやスク
          リーンショット等）を添えて{" "}
          <a href="mailto:hello@dadbuildsapps.com">hello@dadbuildsapps.com</a>{" "}
          までお知らせください。
        </li>
        <li>
          <b>審査：</b> 通報内容は速やかに確認し、違反が認められた場合は適切な対
          応（削除、アカウント措置、必要に応じた通報等）を実施します。
        </li>
        <li>
          <b>不服申立て：</b> モデレーション結果についてはご連絡により異議申立て
          が可能です。
        </li>
      </ul>

      <h3 id="jp-platform">プラットフォーム準拠</h3>
      <p>
        Google Play デベロッパーポリシーおよび Families Policy に準拠します。
        本ページ（{" "}
        <a
          href="https://dadbuildsapps.com/privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://dadbuildsapps.com/privacy-policy/
        </a>{" "}
        ）が当社のプライバシーおよびCSAE安全基準の正式な公開URLです。
      </p>

      <h2 id="jp-changes">ポリシーの変更</h2>
      <p>
        法令や運用の変更に伴い本ページを更新することがあります。最新版は常に本
        URLで公開されます。
      </p>
      <p><i>最終更新日：2025‑08‑23</i></p>

      <h2 id="jp-contact">お問い合わせ</h2>
      <p>
        メール：<a href="mailto:hello@dadbuildsapps.com">hello@dadbuildsapps.com</a>
      </p>
    </>
  );

  return (
    <div className="privacy-policy">
      <div className="privacy-policy-card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
          }}
        >
          <div className="language-selector">
            <label
              htmlFor="language"
              style={{ color: "black", marginRight: "0.5rem" }}
            >
              Language:{" "}
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
        {language === "ja" ? renderJapanese() : renderEnglish()}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
