const shimmerClass = "animate-pulse rounded-md bg-muted";

export const TrustSkeleton = () => (
  <section className="py-16 px-6">
    <div className="max-w-6xl mx-auto text-center space-y-8">
      <div className={`${shimmerClass} h-8 w-64 mx-auto`} />
      <div className="flex justify-center gap-8 flex-wrap">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`${shimmerClass} h-16 w-28`} />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2 flex flex-col items-center">
            <div className={`${shimmerClass} h-10 w-20`} />
            <div className={`${shimmerClass} h-4 w-24`} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ContentSkeleton = () => (
  <section className="py-20 px-6">
    <div className="max-w-6xl mx-auto space-y-6">
      <div className={`${shimmerClass} h-8 w-72 mx-auto`} />
      <div className={`${shimmerClass} h-4 w-96 mx-auto max-w-full`} />
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4 p-6 rounded-lg border border-border">
            <div className={`${shimmerClass} h-12 w-12 rounded-full`} />
            <div className={`${shimmerClass} h-6 w-40`} />
            <div className={`${shimmerClass} h-4 w-full`} />
            <div className={`${shimmerClass} h-4 w-3/4`} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const CTASkeleton = () => (
  <section className="py-20 px-6">
    <div className="max-w-4xl mx-auto text-center space-y-6">
      <div className={`${shimmerClass} h-10 w-80 mx-auto`} />
      <div className={`${shimmerClass} h-4 w-96 mx-auto max-w-full`} />
      <div className={`${shimmerClass} h-12 w-40 mx-auto rounded-lg`} />
    </div>
  </section>
);
