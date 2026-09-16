"use client"

import React, { useEffect, useRef } from 'react';
import './PillNav.css';

export interface PillNavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  trackBg?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  pillTextColor = '#ede1c5',
}) => {
  const navItemsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeHref || !navItemsRef.current) return;
    const container = navItemsRef.current;
    const activeLink = container.querySelector<HTMLElement>('.simple-link.is-active');
    if (activeLink) {
      const containerRect = container.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const targetScrollLeft =
        container.scrollLeft +
        (linkRect.left - containerRect.left) -
        containerRect.width / 2 +
        linkRect.width / 2;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeHref]);

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();

      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const target = href === '#home' ? document.getElementById('home') : document.querySelector(href);
        target?.scrollIntoView();
        window.history.pushState(null, '', href);
        return;
      }

      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const headerOffset = isMobile ? 64 : 80;

      if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', href);
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
        window.history.pushState(null, '', href);
      } else {
        window.location.hash = href;
      }
    }
  };

  const cssVars = {
    '--pill-text': pillTextColor,
  } as React.CSSProperties;

  return (
    <div className={`simple-nav-container ${className}`.trim()}>
      <nav className="simple-nav" aria-label="Primary" style={cssVars}>
        {logo && (
          <a
            className="simple-logo"
            href={items?.[0]?.href || '#home'}
            aria-label="Home"
            onClick={(e) => handleItemClick(e, items?.[0]?.href || '#home')}
          >
            <img src={logo} alt={logoAlt} />
          </a>
        )}

        <div className="simple-nav-items" ref={navItemsRef}>
          <ul className="simple-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href || `item-${i}`} role="none">
                <a
                  role="menuitem"
                  href={item.href}
                  className={`simple-link${activeHref === item.href ? ' is-active' : ''}`}
                  aria-label={item.ariaLabel || item.label}
                  onClick={(e) => handleItemClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default PillNav;
