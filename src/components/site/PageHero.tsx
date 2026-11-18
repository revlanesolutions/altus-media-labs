import { Media } from "./Media";
import type { SiteImage } from "@/data/imagery";
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: SiteImage;
  children?: React.ReactNode;
}) {
  return (
    <section className="pt-12 pb-14 md:pt-[72px] md:pb-20">
      <div
        className={`site-container ${image ? "grid items-center gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-10 wide:gap-16" : ""}`}
      >
        <div>
          <span className="text-eyebrow mb-5">{eyebrow}</span>
          <h1 className="heading-display">{title}</h1>
          <p className="text-lead mt-7">{description}</p>
          {children}
        </div>
        {image && <Media image={image} priority aspectRatio="landscape" />}
      </div>
    </section>
  );
}
