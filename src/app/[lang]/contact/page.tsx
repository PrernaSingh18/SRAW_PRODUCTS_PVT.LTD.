import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/enquiry-form";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

type Params = PageProps<"/[lang]/contact">;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.contact.title, description: dict.contact.metaDescription };
}

export default async function ContactPage({ params }: Params) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.contact;

  const channels = [
    { label: dict.common.callUs, value: site.phone, href: `tel:${site.phoneHref}` },
    { label: dict.common.email, value: site.email, href: `mailto:${site.email}` },
    { label: t.whatsapp, value: site.phone, href: site.whatsapp },
  ];

  return (
    <>
      <section className="border-b border-line bg-sand">
        <div className="container-page py-16">
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {t.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
            {t.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-ink-soft">{t.intro}</p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          <div className="rounded-card border border-line bg-white p-7">
            <h2 className="font-display text-lg font-semibold">{t.officeTitle}</h2>
            <address className="mt-3 text-sm leading-relaxed not-italic text-ink-soft">
              {lang === "hi" ? site.addressHi : site.address}
            </address>
            <p className="mt-4 text-xs tracking-[0.14em] text-muted uppercase">{t.hours}</p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="bg-white p-5 transition-colors hover:bg-sand"
              >
                <span className="text-xs tracking-[0.14em] text-muted uppercase">
                  {c.label}
                </span>
                <span className="mt-1 block text-sm font-semibold">{c.value}</span>
              </a>
            ))}
          </div>
        </div>

        <EnquiryForm
          dict={dict}
          submitLabel={t.submit}
          successTitle={t.successTitle}
          successBody={t.successBody}
          footer={t.consent}
          fields={[
            {
              name: "name",
              label: t.fields.name,
              required: true,
              placeholder: t.fields.namePlaceholder,
            },
            { name: "phone", label: t.fields.phone, type: "tel", required: true, placeholder: "+91" },
            { name: "email", label: t.fields.email, type: "email", placeholder: "you@example.com" },
            { name: "city", label: t.fields.city, placeholder: t.fields.cityPlaceholder },
            {
              name: "topic",
              label: t.fields.topic,
              type: "select",
              required: true,
              full: true,
              options: t.topics,
            },
            {
              name: "message",
              label: t.fields.message,
              type: "textarea",
              required: true,
              full: true,
              placeholder: t.fields.messagePlaceholder,
            },
          ]}
        />
      </section>
    </>
  );
}
