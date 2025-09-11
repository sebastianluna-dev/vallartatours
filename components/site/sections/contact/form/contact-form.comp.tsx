"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/site/shared/icon.comp";
import { SITE } from "@/constants/site.const";
import { buildMailtoUrl } from "@/lib/build-mailto-url";
import "./contact-form.comp.css";

// Name, email, subject and message. There is no server to receive it yet:
// sending opens the visitor's mail app with everything typed in, addressed
// to the crew. The browser validates the fields before that.
export function ContactForm() {
  const t = useTranslations("contact.form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const body = t("body", { name, email, message });
    window.location.href = buildMailtoUrl(SITE.email, subject, body);
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <h2 className="contact-form__title">{t("title")}</h2>
      <p className="contact-form__lead">{t("lead")}</p>
      <label className="contact-form__field">
        <span className="contact-form__label">{t("name")}</span>
        <input
          className="contact-form__input"
          type="text"
          name="name"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label className="contact-form__field">
        <span className="contact-form__label">{t("email")}</span>
        <input
          className="contact-form__input"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="contact-form__field">
        <span className="contact-form__label">{t("subject")}</span>
        <input
          className="contact-form__input"
          type="text"
          name="subject"
          required
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        />
      </label>
      <label className="contact-form__field">
        <span className="contact-form__label">{t("message")}</span>
        <textarea
          className="contact-form__input contact-form__input_kind_textarea"
          name="message"
          rows={5}
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>
      <button type="submit" className="button contact-form__submit">
        {t("submit")}
        <Icon name="arrowRight" size={20} />
      </button>
      <p className="contact-form__note">{t("note", { email: SITE.email })}</p>
    </form>
  );
}
