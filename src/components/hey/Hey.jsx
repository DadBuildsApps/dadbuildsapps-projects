import React, { useState } from "react";
import "./hey.scss";

const Hey = () => {
    const [language, setLanguage] = useState("ja");

    const renderEnglish = () => (
        <>
            <h1>👋 You scanned the shirt!</h1>
            <p>
                I'm an indie app developer based in Canada building tools to help people stay productive, connected, and inspired.
            </p>
            <p>
                This page will change often — so come back again sometime.
            </p>
            <p>
                Check out what I’m building 👉 <a href="https://dadbuildsapps.com" target="_blank" rel="noreferrer">dadbuildsapps.com</a>
            </p>
            <p>
                Contact: <a href="mailto:hello@dadbuildsapps.com">hello@dadbuildsapps.com</a>
            </p>
        </>
    );

    const renderJapanese = () => (
        <div className="hey-wrapper">
          <h1>👋 DadBuildsAppsへようこそ！</h1>
          <p>
            カナダ在住のインディーアプリ開発者です。<br />
            毎日の暮らしがちょっと楽しく、便利になるようなアプリを作っています。
          </p>
      
          <a
            href="https://apps.apple.com/ca/app/%E5%92%8C%E3%81%AE%E8%BC%AA-%E3%82%AB%E3%83%AB%E3%82%AC%E3%83%AA%E3%83%BC/id6745131764"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/images/pictures/wanowa.png"
              alt="Download Wanowa from App Store"
              className="app-image"
            />
          </a>
      
          <div>
            <a
              href="https://apps.apple.com/ca/app/%E5%92%8C%E3%81%AE%E8%BC%AA-%E3%82%AB%E3%83%AB%E3%82%AC%E3%83%AA%E3%83%BC/id6745131764"
              target="_blank"
              rel="noreferrer"
              className="download-link"
            >
              iOSアプリをダウンロード
            </a>
          </div>
          <div className="approval-code">
                登録時には以下の承認コードが必要です：<br />
                <span>wanowayyc1</span>
          </div>
      
          <div className="android-note">
            Androidをご利用の方は、<br />
            ご自身のメールアドレスを添えてご連絡ください！
          </div>
      
          <p>
            他の開発中アプリはこちら 👉{" "}
            <a href="https://dadbuildsapps.com" target="_blank" rel="noreferrer">
              dadbuildsapps.com
            </a>
          </p>
          <p>
            お問い合わせ ✉️{" "}
            <a href="mailto:hello@dadbuildsapps.com">hello@dadbuildsapps.com</a>
          </p>
        </div>
      );

    return (
        <div className="hey-landing">
            <div className="hey-landing-card">
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                    <div className="language-selector">
                        <label htmlFor="language" style={{ marginRight: '0.5rem' }}>Language: </label>
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

export default Hey;