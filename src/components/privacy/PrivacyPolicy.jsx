import React from "react";
import { useState } from "react";
import "./PrivacyPolicy.scss";

const PrivacyPolicy = () => {
    const [language, setLanguage] = useState("en");

    const renderEnglish = () => (
        <div className="privacy-policy-card">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <div className="language-selector">
                    <label htmlFor="language" style={{ color: 'white', marginRight: '0.5rem' }}>Language: </label>
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
            <h1>Privacy Policy</h1>
            <p>
                Your privacy is important to us. This Privacy Policy explains how we handle, store, and use your information when you use our app or website.
                By using our app, you agree to the terms outlined in this Privacy Policy.
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
                <li>
                    <b>Personal Information:</b> Information you provide, such as your name, email address, and other details you submit through forms or account registration.
                </li>
                <li>
                    <b>Usage Data:</b> Details about how you use the app, including interactions, preferences, and app performance metrics.
                </li>
                <li>
                    <b>Device Information:</b> Information about your device, such as device type, operating system, and IP address.
                </li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>The information we collect is used to:</p>
            <ul>
                <li>Provide, maintain, and improve the functionality of our app.</li>
                <li>Respond to inquiries, feedback, or customer support requests.</li>
                <li>Analyze usage patterns to enhance user experience.</li>
                <li>Send updates, notifications, or promotional content (if you opt-in).</li>
            </ul>

            <h2>Third-Party Services</h2>
            <p>
                Our app may use third-party services to enhance functionality, such as analytics or payment processing. These services have their own privacy policies,
                and we recommend reviewing them to understand how they handle your data.
            </p>

            <h2>Data Security</h2>
            <p>
                We are committed to protecting your information and employ reasonable security measures to safeguard it. However, no method of transmission over the internet
                or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>Your Rights</h2>
            <p>
                You have the right to:
            </p>
            <ul>
                <li>Access the personal information we have collected about you.</li>
                <li>Request correction or deletion of your data.</li>
                <li>Withdraw consent to data collection or processing where applicable.</li>
            </ul>
            <p>
                To exercise your rights, contact us at <a href="mailto:hello@dadbuildsapps.com">hello@dadbuildsapps.com</a>.
            </p>

            <h2>Children's Privacy</h2>
            <p>
                Our app is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe
                a child has provided us with personal information, please contact us to have the data removed.
            </p>

            <h2>Updates to This Policy</h2>
            <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements. Updates will be posted
                on this page, and the "Last Updated" date will be revised accordingly.
            </p>

            <h2>Contact Us</h2>
            <p>
                If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at <a href="mailto:hello@dadbuildsapps.com">hello@dadbuildsapps.com</a>.
            </p>
        </div>
    );

    const renderJapanese = () => (
        <div className="privacy-policy-card">
            <h1>プライバシーポリシー</h1>
            <p>
                当アプリでは、ユーザーのプライバシーを尊重し、個人情報の取扱いについて最大限の注意を払っています。本ポリシーでは、当アプリが収集する情報、その利用方法、およびユーザーの権利について説明します。
            </p>

            <h2>収集する情報</h2>
            <ul>
                <li><b>個人情報：</b> 氏名、メールアドレス、登録時に入力されたその他の情報</li>
                <li><b>利用状況データ：</b> アプリの使用方法、操作履歴、利用傾向など</li>
                <li><b>端末情報：</b> デバイスの種類、OS、IPアドレスなど</li>
            </ul>

            <h2>情報の利用目的</h2>
            <ul>
                <li>アプリの機能提供・改善</li>
                <li>問い合わせやサポート対応</li>
                <li>利用傾向の分析とユーザー体験の向上</li>
                <li>通知・アップデート・プロモーションの送信（同意がある場合）</li>
            </ul>

            <h2>第三者サービスの利用</h2>
            <p>
                アプリの機能向上のため、分析や決済処理などに外部サービスを利用する場合があります。それぞれのサービスのプライバシーポリシーをご確認ください。
            </p>

            <h2>データの安全管理</h2>
            <p>
                ユーザー情報の保護のために合理的な安全対策を講じますが、インターネット通信や電子保存において絶対的な安全性は保証できません。
            </p>

            <h2>ユーザーの権利</h2>
            <ul>
                <li>自身の個人情報の閲覧</li>
                <li>訂正または削除の依頼</li>
                <li>同意の撤回（適用される場合）</li>
            </ul>
            <p>ご希望の際は <a href="mailto:hello@dadbuildsapps.com">hello@dadbuildsapps.com</a> までご連絡ください。</p>

            <h2>13歳未満のユーザーについて</h2>
            <p>
                当アプリは13歳未満の子供を対象としていません。13歳未満のユーザーから個人情報を収集したことが判明した場合は、速やかに削除いたします。
            </p>

            <h2>ポリシーの変更について</h2>
            <p>
                本ポリシーは、運営方針や法令の変更に応じて随時改訂されることがあります。変更内容はこのページにてお知らせします。
            </p>

            <h2>お問い合わせ</h2>
            <p>
                本ポリシーに関するご質問は、<a href="mailto:hello@dadbuildsapps.com">hello@dadbuildsapps.com</a> までお気軽にお問い合わせください。
            </p>
        </div>
    );

    return (
        <div className="privacy-policy">
            {language === "ja" ? renderJapanese() : renderEnglish()}
        </div>
    );
};

export default PrivacyPolicy;
