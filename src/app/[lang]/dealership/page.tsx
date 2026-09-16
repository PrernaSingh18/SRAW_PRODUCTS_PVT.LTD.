import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/enquiry-form";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";

type Params = PageProps<"/[lang]/dealership">;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.dealership.title, description: dict.dealership.metaDescription };
}

export default async function DealershipPage({ params }: Params) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.dealership;

  return (
    <>
      <section className="border-b border-line bg-sand">
        <div className="container-page py-16">
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {t.eyebrow}
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold sm:text-5xl">
            {t.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-ink-soft">{t.intro}</p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="stagger grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.benefits.map((b) => (
            <div key={b.title} className="bg-white p-7">
              <h2 className="font-display text-lg font-semibold">{b.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page grid gap-10 pb-20 lg:grid-cols-[1fr_1.4fr]">
        <div className="h-fit rounded-card border border-line bg-sand p-7">
          <h2 className="font-display text-xl font-semibold">{t.requirementsTitle}</h2>
          <ul className="mt-5 space-y-3 text-sm text-ink-soft">
            {t.requirements.map((r) => (
              <li key={r} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {r}
              </li>
            ))}
          </ul>
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
            { name: "state", label: t.fields.state, required: true },
            {
              name: "type",
              label: t.fields.type,
              type: "select",
              required: true,
              full: true,
              options: t.types,
            },
            {
              name: "experience",
              label: t.fields.experience,
              type: "textarea",
              required: true,
              full: true,
              placeholder: t.fields.experiencePlaceholder,
            },
          ]}
        />
      </section>
    </>
  );
}
