import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className = "" }: PageHeaderProps) {
  return (
    <section className={`bg-brand-navy bg-texture pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}