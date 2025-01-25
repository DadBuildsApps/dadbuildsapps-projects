import React from "react";
import "./PrivacyPolicy.scss";

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy">
            <div className="privacy-policy-card">
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
        </div>
    );
};

export default PrivacyPolicy;
