import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanityClient";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2 className="mt-10 font-display text-3xl text-navy leading-tight">{children}</h2>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 font-display text-2xl md:text-3xl text-navy leading-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-xl md:text-2xl text-navy leading-snug">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 font-display text-lg text-navy">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-gold bg-secondary/50 px-6 py-4 italic text-foreground/80">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mt-5 text-base leading-relaxed text-foreground/80">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-foreground/80">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-foreground/80">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-navy">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">{children}</code>
    ),
    link: ({ children, value }) => {
      const href = (value?.href as string) ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-medium text-gold underline underline-offset-4 hover:text-navy"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8 overflow-hidden rounded-lg">
          <img
            src={urlFor(value).width(1200).fit("max").auto("format").url()}
            alt={(value.alt as string) ?? ""}
            className="h-auto w-full object-cover"
            loading="lazy"
          />
          {value.alt ? (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground">
              {value.alt as string}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

/** Drop empty spacer paragraphs so article spacing stays even. */
function isEmptyBlock(block: unknown) {
  const b = block as { _type?: string; children?: { text?: string }[] };
  if (b?._type !== "block") return false;
  return (b.children ?? []).every((child) => !child?.text?.trim());
}

export function PortableTextBody({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  const blocks = value.filter((block) => !isEmptyBlock(block));
  if (!blocks.length) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PortableText value={blocks as any} components={components} />;
}
