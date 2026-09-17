import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/enquiry-form";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

type Params = PageProps<"/[lang]/bulk-order">;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.bulk.title, description: dict.bulk.metaDescription };
}

export default async function BulkOrderPage({ params }: Params) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.bulk;

  return (
    <>
      <section className="border-b border-line bg-sand">
        <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-rise">
            <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
              {t.eyebrow}
              {t.eyebrowAccent ? (
                <span className="font-hindi tracking-normal normal-case">
                  {" "}
                  · {t.eyebrowAccent}
                </span>
              ) : null}
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
              {t.heading}
            </h1>
            {t.headingAccent ? (
              <p className="mt-3 font-hindi text-xl text-brand">{t.headingAccent}</p>
            ) : null}
            <p className="mt-4 max-w-2xl text-ink-soft">{t.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#bulk-enquiry"
                className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                {t.ctaPrimary}
              </Link>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-lg border border-ink px-6 py-3 text-sm font-semibold transition-colors hover:bg-ink hover:text-white"
              >
                {t.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-card border border-line bg-white shadow-sm">
            <Image
              src="/assets/Slide 6.jpg"
              alt="Sri Kanth Wholesale Master Cartons & Dhoop Boxes"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="font-display text-3xl font-semibold">{t.slabsTitle}</h2>
        <p className="mt-2 text-sm text-muted">{t.slabsNote}</p>

        <div className="mt-8 overflow-x-auto rounded-card border border-line">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="bg-ink text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">{t.tableHead.qty}</th>
                <th className="px-5 py-4 font-semibold">{t.tableHead.discount}</th>
                <th className="px-5 py-4 font-semibold">{t.tableHead.dispatch}</th>
                <th className="px-5 py-4 font-semibold">{t.tableHead.moq}</th>
              </tr>
            </thead>
            <tbody>
              {t.slabs.map((s) => (
                <tr key={s.qty} className="border-t border-line transition-colors hover:bg-sand">
                  <td className="px-5 py-4 font-medium">{s.qty}</td>
                  <td className="px-5 py-4 font-semibold text-brand">{s.discount}</td>
                  <td className="px-5 py-4 text-ink-soft">{s.dispatch}</td>
                  <td className="px-5 py-4 text-ink-soft">{s.moq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-y border-line bg-clay py-16">
        <div className="container-page">
          <h2 className="font-display text-3xl font-semibold">{t.servicesTitle}</h2>
          <div className="stagger mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {t.services.map((s) => (
              <div key={s.title} className="bg-white p-7">
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="bulk-enquiry"
        className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr]"
      >
        <div className="h-fit rounded-card border border-line bg-sand p-7">
          <h2 className="font-display text-xl font-semibold">{t.faqTitle}</h2>
          <dl className="mt-5 space-y-5 text-sm">
            {t.faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold">{f.q}</dt>
                <dd className="mt-1 text-ink-soft">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 border-t border-line pt-5 text-sm text-ink-soft">
            {t.talkLine}{" "}
            <a href={`tel:${site.phoneHref}`} className="font-semibold text-brand">
              {site.phone}
            </a>
          </p>
        </div>

        <EnquiryForm
          dict={dict}
          submitLabel={t.submit}
          successTitle={t.successTitle}
          successBody={t.successBody}
          fields={[
            { name: "name", label: t.fields.name, required: true },
            { name: "firm", label: t.fields.firm, required: true },
            { name: "phone", label: t.fields.phone, type: "tel", required: true, placeholder: "+91" },
            { name: "email", label: t.fields.email, type: "email" },
            { name: "city", label: t.fields.city, required: true },
            { name: "gst", label: t.fields.gst, placeholder: dict.common.optional },
            {
              name: "products",
              label: t.fields.products,
              type: "select",
              required: true,
              options: t.productOptions,
            },
            {
              name: "quantity",
              label: t.fields.quantity,
              type: "select",
              required: true,
              options: t.quantityOptions,
            },
            {
              name: "message",
              label: t.fields.message,
              type: "textarea",
              full: true,
              placeholder: t.fields.messagePlaceholder,
            },
          ]}
        />
      </section>
    </>
  );
}
